-- Fix RLS policies for users table
-- This migration updates the policies to allow proper user creation and updates

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Service role can manage all users" ON users;

-- Create comprehensive policies for users table

-- Allow authenticated users to view their own data
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow authenticated users to insert their own data
CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow service role to manage all users (for admin operations and setup)
CREATE POLICY "Service role can manage all users"
  ON users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to upsert their own data (for login/registration)
CREATE POLICY "Users can upsert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Additional policy for email-based operations (for demo accounts)
CREATE POLICY "Users can manage by email"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = id::text OR email = auth.jwt() ->> 'email')
  WITH CHECK (auth.uid()::text = id::text OR email = auth.jwt() ->> 'email'); 