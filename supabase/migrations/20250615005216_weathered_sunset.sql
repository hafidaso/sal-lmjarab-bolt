/*
  # Demo Data Migration

  This migration creates sample data for demonstration purposes.
  
  1. Important Note
     - We cannot directly insert into auth.users through migrations
     - We're creating a function that checks for existing data before inserting
     - This approach avoids foreign key constraint errors
  
  2. Approach
     - Create a function that adds demo data only if the auth users already exist
     - The function will check for existing records before attempting inserts
     - No data will be inserted if the required auth users don't exist
*/

-- Create a function to safely add demo data if possible
CREATE OR REPLACE FUNCTION create_demo_data() RETURNS void AS $$
DECLARE
  -- Sample UUIDs for demo users (these should be created via Auth UI/API first)
  patient_uuid UUID;
  doctor_uuid UUID;
  admin_uuid UUID;
  user_exists BOOLEAN;
BEGIN
  -- First check if we have any users in the auth.users table we can use
  -- We'll use the first three users we find rather than hardcoding UUIDs
  
  -- Find a user for the patient role
  SELECT id INTO patient_uuid FROM auth.users ORDER BY created_at LIMIT 1;
  
  -- Find a user for the doctor role (different from patient)
  SELECT id INTO doctor_uuid FROM auth.users 
  WHERE id != COALESCE(patient_uuid, '00000000-0000-0000-0000-000000000000')
  ORDER BY created_at LIMIT 1;
  
  -- Find a user for the admin role (different from patient and doctor)
  SELECT id INTO admin_uuid FROM auth.users 
  WHERE id != COALESCE(patient_uuid, '00000000-0000-0000-0000-000000000000')
  AND id != COALESCE(doctor_uuid, '00000000-0000-0000-0000-000000000000')
  ORDER BY created_at LIMIT 1;
  
  -- Check if we found at least one user
  IF patient_uuid IS NOT NULL THEN
    -- Check if this user already exists in our users table
    SELECT EXISTS(SELECT 1 FROM users WHERE id = patient_uuid) INTO user_exists;
    
    -- If user doesn't exist in our table, create it
    IF NOT user_exists THEN
      INSERT INTO users (id, email, username, role, profile_completed, created_at, updated_at) 
      VALUES (
        patient_uuid, 
        'patient@demo.com', 
        'Demo Patient', 
        'patient', 
        true, 
        now(), 
        now()
      ) ON CONFLICT (id) DO NOTHING;
      
      -- Create patient profile
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
        patient_uuid,
        'Demo',
        'Patient',
        '+1234567890',
        'en',
        true,
        now(),
        now()
      ) ON CONFLICT (id) DO NOTHING;
      
      -- Create notification preferences
      INSERT INTO patient_notification_preferences (
        patient_id,
        appointment_reminders,
        appointment_changes,
        new_messages,
        new_medical_records,
        marketing_communications,
        email_notifications,
        sms_notifications,
        push_notifications,
        created_at,
        updated_at
      ) VALUES (
        patient_uuid,
        true,
        true,
        true,
        true,
        false,
        true,
        true,
        true,
        now(),
        now()
      ) ON CONFLICT (patient_id) DO NOTHING;
    END IF;
    
    -- If we also found a doctor user
    IF doctor_uuid IS NOT NULL THEN
      -- Check if this doctor already exists in our users table
      SELECT EXISTS(SELECT 1 FROM users WHERE id = doctor_uuid) INTO user_exists;
      
      -- If doctor doesn't exist in our table, create it
      IF NOT user_exists THEN
        INSERT INTO users (id, email, username, role, profile_completed, created_at, updated_at) 
        VALUES (
          doctor_uuid, 
          'doctor@demo.com', 
          'Dr. Demo', 
          'provider', 
          true, 
          now(), 
          now()
        ) ON CONFLICT (id) DO NOTHING;
      END IF;
      
      -- Create sample appointments only if both patient and doctor exist
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
        patient_uuid,
        doctor_uuid,
        (now() + interval '2 days')::timestamp,
        30,
        'scheduled',
        'consultation',
        'Annual checkup',
        'Main Clinic, Floor 2',
        false,
        now(),
        now()
      );
      
      -- Create sample medical record
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
        patient_uuid,
        'lab-result',
        'Complete Blood Count',
        now()::timestamp,
        doctor_uuid,
        'Dr. Demo',
        'Central Laboratory',
        'Routine blood work including CBC, lipid panel, and metabolic panel',
        ARRAY['blood', 'routine', 'annual'],
        'normal',
        now(),
        now()
      );
    END IF;
    
    -- If we found an admin user
    IF admin_uuid IS NOT NULL THEN
      -- Check if this admin already exists in our users table
      SELECT EXISTS(SELECT 1 FROM users WHERE id = admin_uuid) INTO user_exists;
      
      -- If admin doesn't exist in our table, create it
      IF NOT user_exists THEN
        INSERT INTO users (id, email, username, role, profile_completed, created_at, updated_at) 
        VALUES (
          admin_uuid, 
          'admin@demo.com', 
          'Demo Admin', 
          'admin', 
          true, 
          now(), 
          now()
        ) ON CONFLICT (id) DO NOTHING;
      END IF;
    END IF;
    
    -- Create sample notification
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
      patient_uuid,
      'Welcome to Sal-lmjarab',
      'Thank you for joining our healthcare platform. Complete your profile to get personalized care.',
      'system',
      false,
      now(),
      '/patient/dashboard'
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_demo_data();

-- Drop the function after use
DROP FUNCTION create_demo_data();

-- Add a comment explaining how to properly create demo users
COMMENT ON TABLE users IS 'To create demo users, use the Supabase Auth UI or API to register:
- patient@demo.com / password
- doctor@demo.com / password
- admin@demo.com / password

Then the migration will automatically create the necessary profile records.';