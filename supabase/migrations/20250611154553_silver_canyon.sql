/*
  # Fix Users Table RLS Policy

  1. Security Updates
    - Update INSERT policy for users table to allow authenticated users to create their own profile
    - Ensure the policy allows users to insert rows where auth.uid() matches the id field
  
  2. Changes
    - Drop existing INSERT policy if it exists
    - Create new INSERT policy that properly allows profile creation during registration
*/

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create a new INSERT policy that allows authenticated users to create their own profile
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure RLS is enabled on the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;