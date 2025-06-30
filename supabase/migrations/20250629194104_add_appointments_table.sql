-- Add appointments table for doctor interface functionality
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  patient_name text NOT NULL,
  specialty text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  duration integer NOT NULL DEFAULT 30,
  type text CHECK (type IN ('in-person', 'telehealth')),
  status text CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no-show')) DEFAULT 'scheduled',
  location text,
  telehealth_url text,
  reason text NOT NULL,
  notes text,
  reminder_sent boolean DEFAULT false,
  reminder_preferences jsonb DEFAULT '{"email": true, "sms": true, "push": false, "timing": "24h"}'::jsonb,
  can_reschedule boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctor availability table
CREATE TABLE IF NOT EXISTS doctor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  working_hours jsonb NOT NULL,
  breaks jsonb DEFAULT '[]'::jsonb,
  holidays text[] DEFAULT '{}',
  max_patients_per_day integer DEFAULT 20,
  appointment_duration integer DEFAULT 30,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scheduled reminders table
CREATE TABLE IF NOT EXISTS scheduled_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid REFERENCES appointments(id) ON DELETE CASCADE,
  type text CHECK (type IN ('email', 'sms', 'push')),
  scheduled_time timestamptz NOT NULL,
  status text CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')) DEFAULT 'pending',
  recipient_email text,
  recipient_phone text,
  recipient_id uuid,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for appointments
CREATE POLICY "Doctors can view their appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = doctor_id);

CREATE POLICY "Patients can view their appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can insert appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Doctors can update their appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = doctor_id);

CREATE POLICY "Patients can update their appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = patient_id);

-- RLS Policies for doctor availability
CREATE POLICY "Doctors can manage their availability"
  ON doctor_availability FOR ALL
  USING (auth.uid() = doctor_id);

-- RLS Policies for scheduled reminders
CREATE POLICY "System can manage reminders"
  ON scheduled_reminders FOR ALL
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_doctor_availability_doctor_id ON doctor_availability(doctor_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_reminders_appointment_id ON scheduled_reminders(appointment_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_reminders_status ON scheduled_reminders(status);
CREATE INDEX IF NOT EXISTS idx_scheduled_reminders_scheduled_time ON scheduled_reminders(scheduled_time);

-- Triggers for updated_at
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctor_availability_updated_at
  BEFORE UPDATE ON doctor_availability
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
