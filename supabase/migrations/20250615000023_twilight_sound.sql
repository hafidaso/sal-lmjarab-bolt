/*
  # Create Patient Accounts Schema

  1. New Tables
    - `patient_profiles` - Stores patient-specific profile information
    - `patient_appointments` - Stores appointment data for patients
    - `patient_medical_records` - Stores medical history records
    - `patient_reviews` - Stores reviews submitted by patients
    - `patient_notifications` - Stores notification preferences and history

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Create patient_profiles table
CREATE TABLE IF NOT EXISTS patient_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  date_of_birth date,
  gender text,
  phone_number text,
  address text,
  city text,
  state text,
  postal_code text,
  insurance_provider text,
  insurance_id text,
  emergency_contact_name text,
  emergency_contact_phone text,
  blood_type text,
  allergies text[],
  chronic_conditions text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  avatar_url text,
  preferred_language text DEFAULT 'en',
  profile_completed boolean DEFAULT false
);

-- Create patient_appointments table
CREATE TABLE IF NOT EXISTS patient_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL,
  appointment_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 30,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show')),
  type text DEFAULT 'consultation' CHECK (type IN ('consultation', 'follow-up', 'emergency')),
  reason text,
  notes text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  reminder_sent boolean DEFAULT false,
  telehealth boolean DEFAULT false
);

-- Create patient_medical_records table
CREATE TABLE IF NOT EXISTS patient_medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  record_type text NOT NULL CHECK (record_type IN ('lab-result', 'prescription', 'visit-summary', 'imaging', 'vaccination', 'referral')),
  title text NOT NULL,
  date timestamptz NOT NULL,
  provider_id uuid,
  provider_name text,
  facility text,
  description text,
  file_url text,
  file_type text,
  tags text[],
  status text DEFAULT 'normal' CHECK (status IN ('normal', 'abnormal', 'critical', 'pending')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient_reviews table
CREATE TABLE IF NOT EXISTS patient_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL,
  appointment_id uuid REFERENCES patient_appointments(id),
  overall_rating integer NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  wait_time_rating integer CHECK (wait_time_rating BETWEEN 1 AND 5),
  staff_rating integer CHECK (staff_rating BETWEEN 1 AND 5),
  communication_rating integer CHECK (communication_rating BETWEEN 1 AND 5),
  cleanliness_rating integer CHECK (cleanliness_rating BETWEEN 1 AND 5),
  comment text,
  pros text[],
  cons text[],
  tips text,
  anonymous boolean DEFAULT false,
  verified boolean DEFAULT false,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient_notifications table
CREATE TABLE IF NOT EXISTS patient_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('appointment', 'medical-record', 'message', 'system')),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  action_url text
);

-- Create patient_notification_preferences table
CREATE TABLE IF NOT EXISTS patient_notification_preferences (
  patient_id uuid PRIMARY KEY REFERENCES patient_profiles(id) ON DELETE CASCADE,
  appointment_reminders boolean DEFAULT true,
  appointment_changes boolean DEFAULT true,
  new_messages boolean DEFAULT true,
  new_medical_records boolean DEFAULT true,
  marketing_communications boolean DEFAULT false,
  email_notifications boolean DEFAULT true,
  sms_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient_saved_providers table
CREATE TABLE IF NOT EXISTS patient_saved_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  notes text,
  UNIQUE(patient_id, provider_id)
);

-- Enable Row Level Security
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_saved_providers ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Patient Profiles: Users can only view and edit their own profiles
CREATE POLICY "Users can view own profile"
  ON patient_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON patient_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON patient_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Patient Appointments: Users can only view and manage their own appointments
CREATE POLICY "Users can view own appointments"
  ON patient_appointments FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own appointments"
  ON patient_appointments FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own appointments"
  ON patient_appointments FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can delete own appointments"
  ON patient_appointments FOR DELETE
  USING (auth.uid() = patient_id);

-- Patient Medical Records: Users can only view their own medical records
CREATE POLICY "Users can view own medical records"
  ON patient_medical_records FOR SELECT
  USING (auth.uid() = patient_id);

-- Patient Reviews: Users can view, create, and manage their own reviews
CREATE POLICY "Users can view own reviews"
  ON patient_reviews FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own reviews"
  ON patient_reviews FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own reviews"
  ON patient_reviews FOR UPDATE
  USING (auth.uid() = patient_id);

-- Patient Notifications: Users can only view their own notifications
CREATE POLICY "Users can view own notifications"
  ON patient_notifications FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can update own notifications"
  ON patient_notifications FOR UPDATE
  USING (auth.uid() = patient_id);

-- Patient Notification Preferences: Users can only view and update their own preferences
CREATE POLICY "Users can view own notification preferences"
  ON patient_notification_preferences FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can update own notification preferences"
  ON patient_notification_preferences FOR UPDATE
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own notification preferences"
  ON patient_notification_preferences FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

-- Patient Saved Providers: Users can only view and manage their own saved providers
CREATE POLICY "Users can view own saved providers"
  ON patient_saved_providers FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own saved providers"
  ON patient_saved_providers FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can delete own saved providers"
  ON patient_saved_providers FOR DELETE
  USING (auth.uid() = patient_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_patient_profiles_updated_at
BEFORE UPDATE ON patient_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_appointments_updated_at
BEFORE UPDATE ON patient_appointments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_medical_records_updated_at
BEFORE UPDATE ON patient_medical_records
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_reviews_updated_at
BEFORE UPDATE ON patient_reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_notification_preferences_updated_at
BEFORE UPDATE ON patient_notification_preferences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();