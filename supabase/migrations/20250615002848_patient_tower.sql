/*
  # Fix for patient_saved_providers policies

  1. Changes
     - Add IF NOT EXISTS checks for the table and policies
     - Use DO blocks with conditional logic to create policies only if they don't exist
  
  2. Security
     - Maintains the same RLS policies with auth.uid() checks
*/

-- Create patient_saved_providers table if it doesn't exist
CREATE TABLE IF NOT EXISTS patient_saved_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  notes text,
  UNIQUE(patient_id, provider_id)
);

-- Enable Row Level Security if not already enabled
DO $$ 
BEGIN
  -- Check if RLS is already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'patient_saved_providers' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE patient_saved_providers ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for patient_saved_providers if they don't exist
DO $$ 
BEGIN
  -- Check if the SELECT policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'patient_saved_providers' 
    AND policyname = 'Users can view own saved providers'
  ) THEN
    CREATE POLICY "Users can view own saved providers" 
      ON patient_saved_providers 
      FOR SELECT 
      TO public
      USING (auth.uid() = patient_id);
  END IF;

  -- Check if the INSERT policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'patient_saved_providers' 
    AND policyname = 'Users can insert own saved providers'
  ) THEN
    CREATE POLICY "Users can insert own saved providers" 
      ON patient_saved_providers 
      FOR INSERT 
      TO public
      WITH CHECK (auth.uid() = patient_id);
  END IF;

  -- Check if the DELETE policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'patient_saved_providers' 
    AND policyname = 'Users can delete own saved providers'
  ) THEN
    CREATE POLICY "Users can delete own saved providers" 
      ON patient_saved_providers 
      FOR DELETE 
      TO public
      USING (auth.uid() = patient_id);
  END IF;
END $$;