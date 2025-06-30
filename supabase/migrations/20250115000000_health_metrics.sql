-- Create health_metrics table
CREATE TABLE IF NOT EXISTS health_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blood_pressure TEXT DEFAULT '120/80',
  heart_rate TEXT DEFAULT '72 bpm',
  weight TEXT DEFAULT '70 kg',
  last_checkup TEXT DEFAULT '2 weeks ago',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(patient_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_health_metrics_patient_id ON health_metrics(patient_id);

-- Enable Row Level Security
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Patients can view their own health metrics" ON health_metrics
  FOR SELECT USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert their own health metrics" ON health_metrics
  FOR INSERT WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can update their own health metrics" ON health_metrics
  FOR UPDATE USING (auth.uid() = patient_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_health_metrics_updated_at
  BEFORE UPDATE ON health_metrics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 