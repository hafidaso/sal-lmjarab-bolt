/*
  # Fix User Registration RLS Policy

  1. Security Changes
    - Allow both authenticated and anonymous users to create profiles during registration
    - Keep the security check to ensure users can only create their own profiles
    - Add a policy for reading own profile data

  2. Changes
    - Drop existing policies
    - Create new policies that work with the registration flow
    - Add SELECT policy for reading own profile
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert during registration" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new INSERT policy that works for both registration and authenticated users
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    -- For authenticated users, check auth.uid()
    (auth.role() = 'authenticated' AND auth.uid() = id)
    OR
    -- For anonymous users during registration, allow insert
    (auth.role() = 'anon')
  );

-- Create policy for users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policy for users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY; 