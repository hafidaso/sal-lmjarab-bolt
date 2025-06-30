/*
  # Fix user registration RLS policy

  1. Security Changes
    - Update INSERT policy on `users` table to allow authenticated users to insert their own profile
    - The policy now checks that the user ID matches the authenticated user's ID from auth.uid()
    - This allows users to create their profile immediately after signing up

  2. Policy Updates
    - Replace existing INSERT policy with one that properly handles the registration flow
    - Ensure users can only insert records with their own user ID
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Create a new INSERT policy that allows authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);