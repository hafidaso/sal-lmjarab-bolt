import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { config } from '../config/environment';

const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

// Debug environment variables
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Key exists' : 'Key missing');

if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
  console.error('Missing or invalid Supabase URL. Please set VITE_SUPABASE_URL in your .env file');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key-here') {
  console.error('Missing or invalid Supabase Anon Key. Please set VITE_SUPABASE_ANON_KEY in your .env file');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('health_metrics').select('count').limit(1);
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    console.log('Database connection successful');
    return true;
  } catch (err) {
    console.error('Database connection test error:', err);
    return false;
  }
};

export type PatientProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  phone_number: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  insurance_provider: string | null;
  insurance_id: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  blood_type: string | null;
  allergies: string[] | null;
  chronic_conditions: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string | null;
  preferred_language: string | null;
  profile_completed: boolean | null;
};

export type PatientAppointment = {
  id: string;
  patient_id: string | null;
  provider_id: string;
  appointment_date: string;
  duration_minutes: number | null;
  status: string | null;
  type: string | null;
  reason: string | null;
  notes: string | null;
  location: string | null;
  created_at: string | null;
  updated_at: string | null;
  reminder_sent: boolean | null;
  telehealth: boolean | null;
};

export type PatientMedicalRecord = {
  id: string;
  patient_id: string | null;
  record_type: string;
  title: string;
  date: string;
  provider_id: string | null;
  provider_name: string | null;
  facility: string | null;
  description: string | null;
  file_url: string | null;
  file_type: string | null;
  tags: string[] | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type PatientReview = {
  id: string;
  patient_id: string | null;
  provider_id: string;
  appointment_id: string | null;
  overall_rating: number;
  wait_time_rating: number | null;
  staff_rating: number | null;
  communication_rating: number | null;
  cleanliness_rating: number | null;
  comment: string | null;
  pros: string[] | null;
  cons: string[] | null;
  tips: string | null;
  anonymous: boolean | null;
  verified: boolean | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type PatientNotification = {
  id: string;
  patient_id: string | null;
  title: string;
  message: string;
  type: string;
  read: boolean | null;
  created_at: string | null;
  action_url: string | null;
};

export type PatientNotificationPreferences = {
  patient_id: string;
  appointment_reminders: boolean | null;
  appointment_changes: boolean | null;
  new_messages: boolean | null;
  new_medical_records: boolean | null;
  marketing_communications: boolean | null;
  email_notifications: boolean | null;
  sms_notifications: boolean | null;
  push_notifications: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type PatientSavedProvider = {
  id: string;
  patient_id: string | null;
  provider_id: string;
  created_at: string | null;
  notes: string | null;
};