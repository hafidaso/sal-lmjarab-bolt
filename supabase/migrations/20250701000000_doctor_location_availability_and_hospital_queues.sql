-- Migration: Doctor Location Availability & Hospital Queues

-- Table for doctor availability per hospital/location
CREATE TABLE IF NOT EXISTS doctor_location_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  hospital_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  working_hours jsonb NOT NULL, -- e.g. {"Monday": {"start": "08:00", "end": "16:00", "available": true}, ...}
  breaks jsonb DEFAULT '[]'::jsonb,
  holidays text[] DEFAULT '{}',
  max_patients_per_day integer DEFAULT 20,
  appointment_duration integer DEFAULT 30,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table for real-time hospital queue info
CREATE TABLE IF NOT EXISTS hospital_queues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  current_queue_length integer DEFAULT 0,
  estimated_wait_time integer DEFAULT 0, -- in minutes
  last_updated timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE doctor_location_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_queues ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read, admin write)
CREATE POLICY "Anyone can view doctor_location_availability"
  ON doctor_location_availability FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view hospital_queues"
  ON hospital_queues FOR SELECT
  USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_doctor_location_availability_updated_at
  BEFORE UPDATE ON doctor_location_availability
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hospital_queues_updated_at
  BEFORE UPDATE ON hospital_queues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 