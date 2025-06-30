import { supabase } from './supabaseClient';

export interface HealthMetrics {
  id: string;
  patient_id: string;
  blood_pressure: string | null;
  heart_rate: string | null;
  weight: string | null;
  last_checkup: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface PatientProfile {
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
}

export interface PatientAppointment {
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
}

export interface PatientMedicalRecord {
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
}

export interface PatientReview {
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
}

export interface PatientNotification {
  id: string;
  patient_id: string | null;
  title: string;
  message: string;
  type: string;
  read: boolean | null;
  created_at: string | null;
  action_url: string | null;
}

export interface PatientNotificationPreferences {
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
}

export interface PatientSavedProvider {
  id: string;
  patient_id: string | null;
  provider_id: string;
  created_at: string | null;
  notes: string | null;
}

export interface HealthcareProvider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  distance?: number;
  availability?: string;
  image?: string;
}

class PatientService {
  // Health Metrics
  async getHealthMetrics(patientId: string): Promise<HealthMetrics | null> {
    const { data, error } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('patient_id', patientId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching health metrics:', error);
      throw error;
    }
    
    return data;
  }

  async createHealthMetrics(patientId: string, metrics: Omit<HealthMetrics, 'id' | 'patient_id' | 'created_at' | 'updated_at'>): Promise<HealthMetrics> {
    const { data, error } = await supabase
      .from('health_metrics')
      .insert({
        patient_id: patientId,
        ...metrics
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating health metrics:', error);
      throw error;
    }
    
    return data;
  }

  async updateHealthMetrics(patientId: string, updates: Partial<HealthMetrics>): Promise<HealthMetrics> {
    const { data, error } = await supabase
      .from('health_metrics')
      .update(updates)
      .eq('patient_id', patientId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating health metrics:', error);
      throw error;
    }
    
    return data;
  }

  async upsertHealthMetrics(patientId: string, metrics: Omit<HealthMetrics, 'id' | 'patient_id' | 'created_at' | 'updated_at'>): Promise<HealthMetrics> {
    const existing = await this.getHealthMetrics(patientId);
    
    if (existing) {
      return await this.updateHealthMetrics(patientId, metrics);
    } else {
      return await this.createHealthMetrics(patientId, metrics);
    }
  }

  // Patient Profile
  async getPatientProfile(patientId: string): Promise<PatientProfile | null> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('id', patientId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching patient profile:', error);
      throw error;
    }
    
    return data;
  }

  async updatePatientProfile(patientId: string, updates: Partial<PatientProfile>): Promise<PatientProfile> {
    const { data, error } = await supabase
      .from('patient_profiles')
      .update(updates)
      .eq('id', patientId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating patient profile:', error);
      throw error;
    }
    
    return data;
  }

  // Patient Appointments
  async getPatientAppointments(patientId: string): Promise<PatientAppointment[]> {
    const { data, error } = await supabase
      .from('patient_appointments')
      .select('*')
      .eq('patient_id', patientId)
      .order('appointment_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching patient appointments:', error);
      throw error;
    }
    
    return data || [];
  }

  async createAppointment(appointment: Omit<PatientAppointment, 'id' | 'created_at' | 'updated_at'>): Promise<PatientAppointment> {
    const { data, error } = await supabase
      .from('patient_appointments')
      .insert(appointment)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
    
    return data;
  }

  async updateAppointment(appointmentId: string, updates: Partial<PatientAppointment>): Promise<PatientAppointment> {
    const { data, error } = await supabase
      .from('patient_appointments')
      .update(updates)
      .eq('id', appointmentId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
    
    return data;
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    const { error } = await supabase
      .from('patient_appointments')
      .delete()
      .eq('id', appointmentId);
    
    if (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }

  // Patient Medical Records
  async getPatientMedicalRecords(patientId: string): Promise<PatientMedicalRecord[]> {
    const { data, error } = await supabase
      .from('patient_medical_records')
      .select('*')
      .eq('patient_id', patientId)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching medical records:', error);
      throw error;
    }
    
    return data || [];
  }

  async createMedicalRecord(record: Omit<PatientMedicalRecord, 'id' | 'created_at' | 'updated_at'>): Promise<PatientMedicalRecord> {
    const { data, error } = await supabase
      .from('patient_medical_records')
      .insert(record)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating medical record:', error);
      throw error;
    }
    
    return data;
  }

  // Patient Reviews
  async getPatientReviews(patientId: string): Promise<PatientReview[]> {
    const { data, error } = await supabase
      .from('patient_reviews')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching patient reviews:', error);
      throw error;
    }
    
    return data || [];
  }

  async createReview(review: Omit<PatientReview, 'id' | 'created_at' | 'updated_at'>): Promise<PatientReview> {
    const { data, error } = await supabase
      .from('patient_reviews')
      .insert(review)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }
    
    return data;
  }

  async updateReview(reviewId: string, updates: Partial<PatientReview>): Promise<PatientReview> {
    const { data, error } = await supabase
      .from('patient_reviews')
      .update(updates)
      .eq('id', reviewId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating review:', error);
      throw error;
    }
    
    return data;
  }

  // Patient Notifications
  async getPatientNotifications(patientId: string): Promise<PatientNotification[]> {
    const { data, error } = await supabase
      .from('patient_notifications')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
    
    return data || [];
  }

  async markNotificationAsRead(notificationId: string): Promise<PatientNotification> {
    const { data, error } = await supabase
      .from('patient_notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single();
    
    if (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
    
    return data;
  }

  // Patient Notification Preferences
  async getNotificationPreferences(patientId: string): Promise<PatientNotificationPreferences | null> {
    const { data, error } = await supabase
      .from('patient_notification_preferences')
      .select('*')
      .eq('patient_id', patientId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }
    
    return data;
  }

  async updateNotificationPreferences(patientId: string, updates: Partial<PatientNotificationPreferences>): Promise<PatientNotificationPreferences> {
    const { data, error } = await supabase
      .from('patient_notification_preferences')
      .update(updates)
      .eq('patient_id', patientId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
    
    return data;
  }

  // Patient Saved Providers
  async getSavedProviders(patientId: string): Promise<PatientSavedProvider[]> {
    const { data, error } = await supabase
      .from('patient_saved_providers')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching saved providers:', error);
      throw error;
    }
    
    return data || [];
  }

  async saveProvider(savedProvider: Omit<PatientSavedProvider, 'id' | 'created_at'>): Promise<PatientSavedProvider> {
    const { data, error } = await supabase
      .from('patient_saved_providers')
      .insert(savedProvider)
      .select()
      .single();
    
    if (error) {
      console.error('Error saving provider:', error);
      throw error;
    }
    
    return data;
  }

  async removeSavedProvider(savedProviderId: string): Promise<void> {
    const { error } = await supabase
      .from('patient_saved_providers')
      .delete()
      .eq('id', savedProviderId);
    
    if (error) {
      console.error('Error removing saved provider:', error);
      throw error;
    }
  }

  // Provider Directory
  async searchProviders(query: string, filters?: any): Promise<HealthcareProvider[]> {
    // In a real implementation, this would search the providers table
    // For now, we'll return mock data
    return [
      {
        id: 'provider-1',
        name: 'Dr. Ahmed Bennani',
        specialty: 'Cardiology',
        rating: 4.8,
        location: 'Casablanca',
        distance: 2.3,
        availability: 'Next available: Tomorrow',
        image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'provider-2',
        name: 'Dr. Fatima Alaoui',
        specialty: 'Dermatology',
        rating: 4.9,
        location: 'Rabat',
        distance: 15.7,
        availability: 'Next available: Today',
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'provider-3',
        name: 'Dr. Omar Idrissi',
        specialty: 'General Medicine',
        rating: 4.6,
        location: 'Marrakech',
        distance: 245.8,
        availability: 'Next available: Today',
        image: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ].filter(provider => 
      provider.name.toLowerCase().includes(query.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(query.toLowerCase()) ||
      provider.location.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Dashboard Summary
  async getDashboardSummary(patientId: string): Promise<any> {
    try {
      const [appointments, records, reviews] = await Promise.all([
        this.getPatientAppointments(patientId),
        this.getPatientMedicalRecords(patientId),
        this.getPatientReviews(patientId)
      ]);

      return {
        upcomingAppointments: appointments.length,
        recentRecords: records.length,
        totalReviews: reviews.length,
        lastAppointment: appointments[0] || null,
        lastRecord: records[0] || null
      };
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      return null;
    }
  }
}

export const patientService = new PatientService();