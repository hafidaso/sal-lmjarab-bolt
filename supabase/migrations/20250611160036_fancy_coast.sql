/*
  # Fix user registration RLS policy

  1. Security Changes
    - Add policy to allow user profile creation during registration
    - The existing INSERT policy requires authentication but registration happens before full auth
    - Add policy for anon role to insert user profiles where the ID matches the auth user ID

  2. Changes Made
    - Create new INSERT policy for anon role during registration
    - Keep existing policies for authenticated users
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create a new INSERT policy that allows both anon (during registration) and authenticated users
CREATE POLICY "Users can insert own profile" 
  ON users 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the existing policies remain intact
-- (SELECT and UPDATE policies should already exist and work correctly)