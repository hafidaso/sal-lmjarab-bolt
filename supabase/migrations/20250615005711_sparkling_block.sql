/*
  # Demo Data Setup Migration

  1. Explanation
    - This migration adds a comment explaining how to create demo users
    - It does NOT attempt to create users directly due to auth constraints
    - Instead, it provides instructions for manually creating users

  2. Important Note
    - The users table has a foreign key constraint to auth.users
    - We cannot directly insert into users table without corresponding auth.users entries
    - Users must be created through Supabase Auth UI or API first
*/

-- Add a comment explaining how to properly create demo users
COMMENT ON TABLE users IS 'To create demo users, use the Supabase Auth UI or API to register:
- patient@demo.com / password
- doctor@demo.com / password
- admin@demo.com / password

Then the users will automatically have records created in this table via triggers.';

-- Create a function that can be called manually after auth users are created
CREATE OR REPLACE FUNCTION setup_demo_data(
  patient_id uuid,
  doctor_id uuid,
  admin_id uuid
) RETURNS void AS $$
BEGIN
  -- Update roles for the users (assuming they exist in auth.users and users table)
  UPDATE users SET role = 'patient', profile_completed = true WHERE id = patient_id;
  UPDATE users SET role = 'provider', profile_completed = true WHERE id = doctor_id;
  UPDATE users SET role = 'admin', profile_completed = true WHERE id = admin_id;

  -- Create patient profile for the demo patient if it doesn't exist
  IF NOT EXISTS(SELECT 1 FROM patient_profiles WHERE id = patient_id) THEN
    INSERT INTO patient_profiles (
      id,
      first_name,
      last_name,
      phone_number,
      preferred_language,
      profile_completed,
      created_at,
      updated_at
    ) VALUES (
      patient_id,
      'Demo',
      'Patient',
      '+1234567890',
      'en',
      true,
      now(),
      now()
    );
  END IF;

  -- Create notification preferences for the demo patient if they don't exist
  IF NOT EXISTS(SELECT 1 FROM patient_notification_preferences WHERE patient_id = patient_id) THEN
    INSERT INTO patient_notification_preferences (
      patient_id,
      created_at,
      updated_at
    ) VALUES (
      patient_id,
      now(),
      now()
    );
  END IF;

  -- Create a sample appointment
  INSERT INTO patient_appointments (
    id,
    patient_id,
    provider_id,
    appointment_date,
    duration_minutes,
    status,
    type,
    reason,
    location,
    telehealth,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    patient_id,
    doctor_id,
    (now() + interval '2 days')::timestamp,
    30,
    'scheduled',
    'consultation',
    'Annual checkup',
    'Main Clinic, Floor 2',
    false,
    now(),
    now()
  ) ON CONFLICT DO NOTHING;

  -- Create a sample medical record
  INSERT INTO patient_medical_records (
    id,
    patient_id,
    record_type,
    title,
    date,
    provider_id,
    provider_name,
    facility,
    description,
    tags,
    status,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    patient_id,
    'lab-result',
    'Complete Blood Count',
    now()::timestamp,
    doctor_id,
    'Dr. Demo',
    'Central Laboratory',
    'Routine blood work including CBC, lipid panel, and metabolic panel',
    ARRAY['blood', 'routine', 'annual'],
    'normal',
    now(),
    now()
  ) ON CONFLICT DO NOTHING;

  -- Create a sample notification
  INSERT INTO patient_notifications (
    id,
    patient_id,
    title,
    message,
    type,
    read,
    created_at,
    action_url
  ) VALUES (
    gen_random_uuid(),
    patient_id,
    'Welcome to Sal-lmjarab',
    'Thank you for joining our healthcare platform. Complete your profile to get personalized care.',
    'system',
    false,
    now(),
    '/patient/dashboard'
  ) ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Add a comment explaining how to use the function
COMMENT ON FUNCTION setup_demo_data IS 'Call this function after creating users through Supabase Auth:
SELECT setup_demo_data(
  ''patient-auth-id-here'',
  ''doctor-auth-id-here'',
  ''admin-auth-id-here''
);';