/*
  # Demo User Setup Instructions

  This migration provides instructions for setting up demo users.
  It does NOT attempt to create users directly in auth.users as this
  requires admin privileges and must be done through the Supabase UI or API.

  Instead, it creates a function that can be called to set up the user profiles
  once the auth users have been created.
*/

-- Add a comment explaining how to properly create demo users
COMMENT ON TABLE users IS 'To create demo users, use the Supabase Auth UI or API to register:
- patient@demo.com / password: demo123
- doctor@demo.com / password: demo123
- admin@demo.com / password: demo123

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
  
  -- Create or update users table entries
  IF patient_id IS NOT NULL THEN
    INSERT INTO users (id, email, username, role, profile_completed)
    VALUES (patient_id, 'patient@demo.com', 'Demo Patient', 'patient', true)
    ON CONFLICT (id) DO UPDATE SET 
      role = 'patient',
      profile_completed = true;
    
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
        profile_completed
      ) VALUES (
        patient_id,
        'Demo',
        'Patient',
        '1990-01-01',
        'Male',
        '+212 555-1234',
        '123 Main Street',
        'Casablanca',
        true
      );
    END IF;
    
    -- Create notification preferences if they don't exist
    IF NOT EXISTS (SELECT 1 FROM patient_notification_preferences WHERE patient_id = patient_id) THEN
      INSERT INTO patient_notification_preferences (patient_id)
      VALUES (patient_id);
    END IF;
  END IF;
  
  IF doctor_id IS NOT NULL THEN
    INSERT INTO users (id, email, username, role, profile_completed)
    VALUES (doctor_id, 'doctor@demo.com', 'Dr. Demo', 'provider', true)
    ON CONFLICT (id) DO UPDATE SET 
      role = 'provider',
      profile_completed = true;
  END IF;
  
  IF admin_id IS NOT NULL THEN
    INSERT INTO users (id, email, username, role, profile_completed)
    VALUES (admin_id, 'admin@demo.com', 'Admin Demo', 'admin', true)
    ON CONFLICT (id) DO UPDATE SET 
      role = 'admin',
      profile_completed = true;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add a comment explaining how to use the function
COMMENT ON FUNCTION setup_demo_users IS 'Call this function after creating users through Supabase Auth:
SELECT setup_demo_users();';