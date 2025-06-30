/*
  # Demo accounts setup

  1. New Content
    - Add comments explaining the authentication limitation
    - Modify approach to work with Supabase's auth system
  2. Security
    - Ensure proper error handling with conditional checks
*/

-- IMPORTANT: This migration only creates database records for users
-- The actual authentication accounts must be created manually through the Supabase dashboard
-- or using the Supabase Auth API before these records will work properly

-- Create a function to safely insert demo data
DO $$
BEGIN
  -- Check if we can create the demo patient profile
  IF EXISTS (
    SELECT 1 FROM auth.users WHERE id = '11111111-1111-1111-1111-111111111111'
  ) THEN
    -- Insert demo patient user
    INSERT INTO public.users (id, email, username, role, profile_completed) 
    VALUES (
      '11111111-1111-1111-1111-111111111111',
      'patient@demo.com',
      'Demo Patient',
      'patient',
      true
    ) ON CONFLICT (id) DO NOTHING;
    
    -- Create patient profile for demo patient
    INSERT INTO patient_profiles (
      id,
      first_name,
      last_name,
      phone_number,
      preferred_language,
      profile_completed
    ) VALUES (
      '11111111-1111-1111-1111-111111111111',
      'Demo',
      'Patient',
      '+1234567890',
      'en',
      true
    ) ON CONFLICT (id) DO NOTHING;
    
    -- Create notification preferences for demo patient
    INSERT INTO patient_notification_preferences (patient_id)
    VALUES ('11111111-1111-1111-1111-111111111111')
    ON CONFLICT (patient_id) DO NOTHING;
  END IF;

  -- Check if we can create the demo doctor user
  IF EXISTS (
    SELECT 1 FROM auth.users WHERE id = '22222222-2222-2222-2222-222222222222'
  ) THEN
    -- Insert demo doctor user
    INSERT INTO public.users (id, email, username, role, profile_completed)
    VALUES (
      '22222222-2222-2222-2222-222222222222', 
      'doctor@demo.com',
      'Dr. Demo',
      'provider',
      true
    ) ON CONFLICT (id) DO NOTHING;
  END IF;

  -- Check if we can create the demo admin user
  IF EXISTS (
    SELECT 1 FROM auth.users WHERE id = '33333333-3333-3333-3333-333333333333'
  ) THEN
    -- Insert demo admin user
    INSERT INTO public.users (id, email, username, role, profile_completed)
    VALUES (
      '33333333-3333-3333-3333-333333333333',
      'admin@demo.com', 
      'Demo Admin',
      'admin',
      true
    ) ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;