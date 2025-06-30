-- Fix missing SELECT policy for users table
-- This migration adds the missing policy that allows users to read their own data

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON users;

-- Create the missing SELECT policy
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Also ensure we have the correct policies for demo accounts
-- Allow service role to manage all users (for demo account setup)
DROP POLICY IF EXISTS "Service role can manage all users" ON users;

CREATE POLICY "Service role can manage all users"
  ON users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true); 