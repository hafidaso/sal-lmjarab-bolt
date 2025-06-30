-- Complete Supabase Synchronization Migration
-- This migration adds all missing tables for full data synchronization

-- ========================================
-- PHARMACY TABLES
-- ========================================

-- Create pharmacies table
CREATE TABLE IF NOT EXISTS pharmacies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  phone text NOT NULL,
  email text,
  website text,
  hours jsonb,
  services text[],
  insurance text[],
  is_24_hour boolean DEFAULT false,
  has_delivery boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  safety_rating integer DEFAULT 3 CHECK (safety_rating BETWEEN 1 AND 5),
  staff jsonb DEFAULT '{"pharmacists": 1, "security": false}'::jsonb,
  stock_availability jsonb DEFAULT '[]'::jsonb,
  location jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  generic_name text,
  description text,
  dosage text[],
  form text[],
  requires_prescription boolean DEFAULT false,
  price numeric(10,2),
  availability text DEFAULT 'in-stock' CHECK (availability IN ('in-stock', 'low-stock', 'out-of-stock')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL,
  doctor_name text NOT NULL,
  date timestamptz NOT NULL,
  expiry_date timestamptz,
  medications jsonb NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'filled', 'expired', 'rejected')),
  pharmacy_id uuid REFERENCES pharmacies(id),
  filled_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pharmacy_orders table
CREATE TABLE IF NOT EXISTS pharmacy_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  pharmacy_id uuid REFERENCES pharmacies(id),
  prescription_id uuid REFERENCES prescriptions(id),
  items jsonb NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'delivered', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_method text CHECK (payment_method IN ('card', 'cash', 'insurance')),
  delivery_address text,
  delivery_fee numeric(10,2) DEFAULT 0,
  estimated_delivery timestamptz,
  tracking_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- PROVIDER TABLES
-- ========================================

-- Create providers table (doctors, hospitals, etc.)
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('doctor', 'hospital', 'clinic', 'pharmacy')),
  specialty text,
  description text,
  address text,
  city text,
  phone text,
  email text,
  website text,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  image_url text,
  services text[],
  insurance_accepted text[],
  hours jsonb,
  location jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- CART FUNCTIONALITY
-- ========================================

-- Create shopping_carts table
CREATE TABLE IF NOT EXISTS shopping_carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  items jsonb DEFAULT '[]'::jsonb,
  total_amount numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(patient_id)
);

-- ========================================
-- ENABLE ROW LEVEL SECURITY
-- ========================================

ALTER TABLE pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacy_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_carts ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RLS POLICIES
-- ========================================

-- Pharmacies: Public read access, admin write access
CREATE POLICY "Anyone can view pharmacies"
  ON pharmacies FOR SELECT
  USING (true);

-- Medications: Public read access, admin write access
CREATE POLICY "Anyone can view medications"
  ON medications FOR SELECT
  USING (true);

-- Prescriptions: Users can only access their own prescriptions
CREATE POLICY "Users can view own prescriptions"
  ON prescriptions FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own prescriptions"
  ON prescriptions FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own prescriptions"
  ON prescriptions FOR UPDATE
  USING (auth.uid() = patient_id);

-- Pharmacy Orders: Users can only access their own orders
CREATE POLICY "Users can view own orders"
  ON pharmacy_orders FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own orders"
  ON pharmacy_orders FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own orders"
  ON pharmacy_orders FOR UPDATE
  USING (auth.uid() = patient_id);

-- Providers: Public read access, admin write access
CREATE POLICY "Anyone can view providers"
  ON providers FOR SELECT
  USING (true);

-- Shopping Carts: Users can only access their own cart
CREATE POLICY "Users can view own cart"
  ON shopping_carts FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert own cart"
  ON shopping_carts FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own cart"
  ON shopping_carts FOR UPDATE
  USING (auth.uid() = patient_id);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_pharmacies_city ON pharmacies(city);
CREATE INDEX IF NOT EXISTS idx_pharmacies_services ON pharmacies USING GIN(services);
CREATE INDEX IF NOT EXISTS idx_medications_name ON medications(name);
CREATE INDEX IF NOT EXISTS idx_medications_generic_name ON medications(generic_name);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescriptions(status);
CREATE INDEX IF NOT EXISTS idx_pharmacy_orders_patient_id ON pharmacy_orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_pharmacy_orders_status ON pharmacy_orders(status);
CREATE INDEX IF NOT EXISTS idx_providers_type ON providers(type);
CREATE INDEX IF NOT EXISTS idx_providers_specialty ON providers(specialty);
CREATE INDEX IF NOT EXISTS idx_providers_city ON providers(city);

-- ========================================
-- TRIGGERS FOR UPDATED_AT
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER update_pharmacies_updated_at
  BEFORE UPDATE ON pharmacies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON medications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at
  BEFORE UPDATE ON prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pharmacy_orders_updated_at
  BEFORE UPDATE ON pharmacy_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopping_carts_updated_at
  BEFORE UPDATE ON shopping_carts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA INSERTION
-- ========================================

-- Insert sample pharmacies
INSERT INTO pharmacies (name, address, city, phone, services, is_24_hour, has_delivery, rating, review_count, safety_rating, staff, stock_availability) VALUES
('Pharmacie Centrale', '123 Avenue Hassan II', 'Casablanca', '+212 522 345 678', ARRAY['Prescription Filling', 'Vaccinations', 'Blood Pressure Monitoring', 'Home Delivery'], true, true, 4.5, 120, 4, '{"pharmacists": 3, "security": true}'::jsonb, '[{"name": "Paracetamol", "status": "in-stock"}, {"name": "Ibuprofen", "status": "in-stock"}, {"name": "Aspirin", "status": "low-stock"}]'::jsonb),
('Pharmacie Al Shifa', '456 Rue Mohammed V', 'Rabat', '+212 537 123 456', ARRAY['Prescription Filling', 'Medication Counseling', 'Diabetes Testing'], false, true, 4.2, 85, 3, '{"pharmacists": 2, "security": false}'::jsonb, '[{"name": "Paracetamol", "status": "in-stock"}, {"name": "Ibuprofen", "status": "out-of-stock"}, {"name": "Aspirin", "status": "in-stock"}]'::jsonb),
('Pharmacie Atlas', '789 Boulevard Mohammed VI', 'Marrakech', '+212 524 567 890', ARRAY['Prescription Filling', 'Compounding', 'Durable Medical Equipment'], false, false, 4.0, 65, 4, '{"pharmacists": 1, "security": true}'::jsonb, '[{"name": "Paracetamol", "status": "low-stock"}, {"name": "Ibuprofen", "status": "in-stock"}, {"name": "Aspirin", "status": "in-stock"}]'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert sample medications
INSERT INTO medications (name, generic_name, description, dosage, form, requires_prescription, price, availability) VALUES
('Paracetamol', 'Acetaminophen', 'Pain reliever and fever reducer', ARRAY['500mg', '1000mg'], ARRAY['Tablet', 'Syrup'], false, 15.50, 'in-stock'),
('Ibuprofen', 'Ibuprofen', 'Anti-inflammatory pain reliever', ARRAY['200mg', '400mg', '600mg'], ARRAY['Tablet', 'Capsule'], false, 18.75, 'in-stock'),
('Aspirin', 'Acetylsalicylic acid', 'Pain reliever and blood thinner', ARRAY['81mg', '325mg'], ARRAY['Tablet'], false, 12.00, 'low-stock'),
('Lisinopril', 'Lisinopril', 'ACE inhibitor for high blood pressure', ARRAY['5mg', '10mg', '20mg'], ARRAY['Tablet'], true, 45.00, 'in-stock'),
('Metformin', 'Metformin', 'Oral diabetes medication', ARRAY['500mg', '850mg', '1000mg'], ARRAY['Tablet'], true, 38.50, 'in-stock')
ON CONFLICT DO NOTHING;

-- Insert sample providers
INSERT INTO providers (name, type, specialty, description, address, city, phone, rating, review_count) VALUES
('Dr. Ahmed Bennani', 'doctor', 'Cardiology', 'Experienced cardiologist specializing in heart disease treatment', '123 Medical Center', 'Casablanca', '+212 522 111 222', 4.8, 156),
('Dr. Fatima Alaoui', 'doctor', 'Dermatology', 'Board-certified dermatologist with expertise in skin conditions', '456 Health Plaza', 'Rabat', '+212 537 333 444', 4.6, 89),
('Dr. Omar Idrissi', 'doctor', 'General Medicine', 'Primary care physician with 15 years of experience', '789 Medical Complex', 'Marrakech', '+212 524 555 666', 4.7, 234),
('CHU Ibn Rochd', 'hospital', 'General', 'University hospital providing comprehensive medical care', 'Avenue Hassan II', 'Casablanca', '+212 522 777 888', 4.5, 445),
('Clinique Al Andalous', 'clinic', 'General', 'Private clinic offering specialized medical services', 'Boulevard Mohammed V', 'Rabat', '+212 537 999 000', 4.3, 178)
ON CONFLICT DO NOTHING; 