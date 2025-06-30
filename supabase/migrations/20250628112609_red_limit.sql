/*
  # Fix Registration RLS Policy

  1. Problem:
    - Users cannot complete registration because the RLS policy prevents profile creation
    - The current policy requires authentication, but users aren't authenticated during registration
    - This creates a catch-22 situation

  2. Solution:
    - Allow both authenticated and anonymous users to create profiles
    - Keep the security check to ensure users can only create their own profiles
    - Simplify the policy to handle the registration flow correctly
    - Drop and recreate policies only if they don't exist
*/

-- Drop existing policies that we want to replace
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert during registration" ON users;
DROP POLICY IF EXISTS "Allow profile creation during registration" ON users;

-- Check if the read policy exists before trying to create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can read own data'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id)';
    END IF;
END $$;

-- Check if the update policy exists before trying to create it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can update own data'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id)';
    END IF;
END $$;

-- Create new INSERT policy that works for both registration and authenticated users
CREATE POLICY "Allow profile creation during registration"
  ON users
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    -- During registration, the user will be anonymous but will have a matching ID
    -- After registration, the user will be authenticated and the ID must match
    auth.uid() = id
  );

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;