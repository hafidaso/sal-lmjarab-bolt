-- Fix RLS Policies for Users Table
-- Run these commands in your Supabase SQL Editor

-- Step 1: Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Service role can manage all users" ON users;

-- Step 2: Create new, more permissive policies

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

-- Allow service role to manage all users (for admin operations)
CREATE POLICY "Service role can manage all users"
  ON users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to manage by email (for demo accounts)
CREATE POLICY "Users can manage by email"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = id::text OR email = auth.jwt() ->> 'email')
  WITH CHECK (auth.uid()::text = id::text OR email = auth.jwt() ->> 'email');

-- Step 3: Verify the policies are working
-- You can test this by running:
-- SELECT * FROM users WHERE email = 'patient@demo.com'; 