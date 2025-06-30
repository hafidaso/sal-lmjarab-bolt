/*
  # Add INSERT policy for users table

  1. Security Changes
    - Add policy to allow authenticated users to insert their own profile data
    - This enables user registration to work properly with RLS enabled

  The policy ensures users can only create profiles for themselves by matching auth.uid() with the id being inserted.
*/

CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);