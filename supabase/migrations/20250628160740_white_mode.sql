/*
  # Demo Data Migration - Fixed Foreign Key Constraint

  This migration adds a comment explaining how to properly create demo users
  rather than trying to insert them directly, which would violate foreign key constraints.
  
  The users table has a foreign key constraint to auth.users, so we cannot
  directly insert records without corresponding auth.users entries.
*/

-- Add a comment explaining how to properly create demo users
COMMENT ON TABLE users IS 'To create demo users, use the Supabase Auth UI or API to register:
- patient@demo.com / password
- doctor@demo.com / password
- admin@demo.com / password

Then the users will automatically have records created in this table via triggers.';

-- Create a function that can be called manually after auth users are created
CREATE OR REPLACE FUNCTION setup_demo_users() RETURNS void AS $$
DECLARE
  patient_id uuid;
  doctor_id uuid;
  admin_id uuid;
BEGIN
  -- Get IDs from existing auth users (if they exist)
  SELECT id INTO patient_id FROM auth.users WHERE email = 'patient@demo.com' LIMIT 1;
  SELECT id INTO doctor_id FROM auth.users WHERE email = 'doctor@demo.com' LIMIT 1;
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@demo.com' LIMIT 1;
  
  -- Update roles for existing users
  IF patient_id IS NOT NULL THEN
    UPDATE users SET role = 'patient', profile_completed = true WHERE id = patient_id;
    
    -- Create patient profile if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM patient_profiles WHERE id = patient_id) THEN
      INSERT INTO patient_profiles (
        id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        phone_number,
        address,
        city,
        profile_completed,
        created_at,
        updated_at
      ) VALUES (
        patient_id,
        'Demo',
        'Patient',
        '1990-01-01',
        'Male',
        '+212 555-1234',
        '123 Main Street',
        'Casablanca',
        true,
        now(),
        now()
      );
    END IF;
    
    -- Create notification preferences if they don't exist
    IF NOT EXISTS (SELECT 1 FROM patient_notification_preferences WHERE patient_id = patient_id) THEN
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
  END IF;
  
  IF doctor_id IS NOT NULL THEN
    UPDATE users SET role = 'provider', profile_completed = true WHERE id = doctor_id;
  END IF;
  
  IF admin_id IS NOT NULL THEN
    UPDATE users SET role = 'admin', profile_completed = true WHERE id = admin_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add a comment explaining how to use the function
COMMENT ON FUNCTION setup_demo_users IS 'Call this function after creating users through Supabase Auth:
SELECT setup_demo_users();';