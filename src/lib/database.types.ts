export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      health_metrics: {
        Row: {
          id: string
          patient_id: string
          blood_pressure: string | null
          heart_rate: string | null
          weight: string | null
          last_checkup: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id: string
          blood_pressure?: string | null
          heart_rate?: string | null
          weight?: string | null
          last_checkup?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          blood_pressure?: string | null
          heart_rate?: string | null
          weight?: string | null
          last_checkup?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      pharmacies: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          phone: string
          email: string | null
          website: string | null
          hours: Json | null
          services: string[] | null
          insurance: string[] | null
          is_24_hour: boolean
          has_delivery: boolean
          rating: number
          review_count: number
          safety_rating: number
          staff: Json
          stock_availability: Json
          location: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          phone: string
          email?: string | null
          website?: string | null
          hours?: Json | null
          services?: string[] | null
          insurance?: string[] | null
          is_24_hour?: boolean
          has_delivery?: boolean
          rating?: number
          review_count?: number
          safety_rating?: number
          staff?: Json
          stock_availability?: Json
          location?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          phone?: string
          email?: string | null
          website?: string | null
          hours?: Json | null
          services?: string[] | null
          insurance?: string[] | null
          is_24_hour?: boolean
          has_delivery?: boolean
          rating?: number
          review_count?: number
          safety_rating?: number
          staff?: Json
          stock_availability?: Json
          location?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      medications: {
        Row: {
          id: string
          name: string
          generic_name: string | null
          description: string | null
          dosage: string[] | null
          form: string[] | null
          requires_prescription: boolean
          price: number | null
          availability: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          generic_name?: string | null
          description?: string | null
          dosage?: string[] | null
          form?: string[] | null
          requires_prescription?: boolean
          price?: number | null
          availability?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          generic_name?: string | null
          description?: string | null
          dosage?: string[] | null
          form?: string[] | null
          requires_prescription?: boolean
          price?: number | null
          availability?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          doctor_name: string
          date: string
          expiry_date: string | null
          medications: Json
          status: string
          pharmacy_id: string | null
          filled_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          doctor_name: string
          date: string
          expiry_date?: string | null
          medications: Json
          status?: string
          pharmacy_id?: string | null
          filled_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          doctor_name?: string
          date?: string
          expiry_date?: string | null
          medications?: Json
          status?: string
          pharmacy_id?: string | null
          filled_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          }
        ]
      }
      pharmacy_orders: {
        Row: {
          id: string
          patient_id: string
          pharmacy_id: string
          prescription_id: string | null
          items: Json
          total_amount: number
          status: string
          payment_status: string
          payment_method: string | null
          delivery_address: string | null
          delivery_fee: number
          estimated_delivery: string | null
          tracking_code: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id: string
          pharmacy_id: string
          prescription_id?: string | null
          items: Json
          total_amount: number
          status?: string
          payment_status?: string
          payment_method?: string | null
          delivery_address?: string | null
          delivery_fee?: number
          estimated_delivery?: string | null
          tracking_code?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          pharmacy_id?: string
          prescription_id?: string | null
          items?: Json
          total_amount?: number
          status?: string
          payment_status?: string
          payment_method?: string | null
          delivery_address?: string | null
          delivery_fee?: number
          estimated_delivery?: string | null
          tracking_code?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_orders_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_orders_pharmacy_id_fkey"
            columns: ["pharmacy_id"]
            referencedRelation: "pharmacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_orders_prescription_id_fkey"
            columns: ["prescription_id"]
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          }
        ]
      }
      providers: {
        Row: {
          id: string
          name: string
          type: string
          specialty: string | null
          description: string | null
          address: string | null
          city: string | null
          phone: string | null
          email: string | null
          website: string | null
          rating: number
          review_count: number
          image_url: string | null
          services: string[] | null
          insurance_accepted: string[] | null
          hours: Json | null
          location: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          specialty?: string | null
          description?: string | null
          address?: string | null
          city?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          rating?: number
          review_count?: number
          image_url?: string | null
          services?: string[] | null
          insurance_accepted?: string[] | null
          hours?: Json | null
          location?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          specialty?: string | null
          description?: string | null
          address?: string | null
          city?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          rating?: number
          review_count?: number
          image_url?: string | null
          services?: string[] | null
          insurance_accepted?: string[] | null
          hours?: Json | null
          location?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      shopping_carts: {
        Row: {
          id: string
          patient_id: string
          items: Json
          total_amount: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id: string
          items?: Json
          total_amount?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          items?: Json
          total_amount?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_carts_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      patient_appointments: {
        Row: {
          id: string
          patient_id: string | null
          provider_id: string
          appointment_date: string
          duration_minutes: number | null
          status: string | null
          type: string | null
          reason: string | null
          notes: string | null
          location: string | null
          created_at: string | null
          updated_at: string | null
          reminder_sent: boolean | null
          telehealth: boolean | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          provider_id: string
          appointment_date: string
          duration_minutes?: number | null
          status?: string | null
          type?: string | null
          reason?: string | null
          notes?: string | null
          location?: string | null
          created_at?: string | null
          updated_at?: string | null
          reminder_sent?: boolean | null
          telehealth?: boolean | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          provider_id?: string
          appointment_date?: string
          duration_minutes?: number | null
          status?: string | null
          type?: string | null
          reason?: string | null
          notes?: string | null
          location?: string | null
          created_at?: string | null
          updated_at?: string | null
          reminder_sent?: boolean | null
          telehealth?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_appointments_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      patient_medical_records: {
        Row: {
          id: string
          patient_id: string | null
          record_type: string
          title: string
          date: string
          provider_id: string | null
          provider_name: string | null
          facility: string | null
          description: string | null
          file_url: string | null
          file_type: string | null
          tags: string[] | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          record_type: string
          title: string
          date: string
          provider_id?: string | null
          provider_name?: string | null
          facility?: string | null
          description?: string | null
          file_url?: string | null
          file_type?: string | null
          tags?: string[] | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          record_type?: string
          title?: string
          date?: string
          provider_id?: string | null
          provider_name?: string | null
          facility?: string | null
          description?: string | null
          file_url?: string | null
          file_type?: string | null
          tags?: string[] | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_medical_records_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      patient_notification_preferences: {
        Row: {
          patient_id: string
          appointment_reminders: boolean | null
          appointment_changes: boolean | null
          new_messages: boolean | null
          new_medical_records: boolean | null
          marketing_communications: boolean | null
          email_notifications: boolean | null
          sms_notifications: boolean | null
          push_notifications: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          patient_id: string
          appointment_reminders?: boolean | null
          appointment_changes?: boolean | null
          new_messages?: boolean | null
          new_medical_records?: boolean | null
          marketing_communications?: boolean | null
          email_notifications?: boolean | null
          sms_notifications?: boolean | null
          push_notifications?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          patient_id?: string
          appointment_reminders?: boolean | null
          appointment_changes?: boolean | null
          new_messages?: boolean | null
          new_medical_records?: boolean | null
          marketing_communications?: boolean | null
          email_notifications?: boolean | null
          sms_notifications?: boolean | null
          push_notifications?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_notification_preferences_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      patient_notifications: {
        Row: {
          id: string
          patient_id: string | null
          title: string
          message: string
          type: string
          read: boolean | null
          created_at: string | null
          action_url: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          title: string
          message: string
          type: string
          read?: boolean | null
          created_at?: string | null
          action_url?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          title?: string
          message?: string
          type?: string
          read?: boolean | null
          created_at?: string | null
          action_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_notifications_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      patient_profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          date_of_birth: string | null
          gender: string | null
          phone_number: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          insurance_provider: string | null
          insurance_id: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          blood_type: string | null
          allergies: string[] | null
          chronic_conditions: string[] | null
          created_at: string | null
          updated_at: string | null
          avatar_url: string | null
          preferred_language: string | null
          profile_completed: boolean | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          gender?: string | null
          phone_number?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          insurance_provider?: string | null
          insurance_id?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          blood_type?: string | null
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          avatar_url?: string | null
          preferred_language?: string | null
          profile_completed?: boolean | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          gender?: string | null
          phone_number?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          insurance_provider?: string | null
          insurance_id?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          blood_type?: string | null
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          created_at?: string | null
          updated_at?: string | null
          avatar_url?: string | null
          preferred_language?: string | null
          profile_completed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      patient_reviews: {
        Row: {
          id: string
          patient_id: string | null
          provider_id: string
          appointment_id: string | null
          overall_rating: number
          wait_time_rating: number | null
          staff_rating: number | null
          communication_rating: number | null
          cleanliness_rating: number | null
          comment: string | null
          pros: string[] | null
          cons: string[] | null
          tips: string | null
          anonymous: boolean | null
          verified: boolean | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          provider_id: string
          appointment_id?: string | null
          overall_rating: number
          wait_time_rating?: number | null
          staff_rating?: number | null
          communication_rating?: number | null
          cleanliness_rating?: number | null
          comment?: string | null
          pros?: string[] | null
          cons?: string[] | null
          tips?: string | null
          anonymous?: boolean | null
          verified?: boolean | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          provider_id?: string
          appointment_id?: string | null
          overall_rating?: number
          wait_time_rating?: number | null
          staff_rating?: number | null
          communication_rating?: number | null
          cleanliness_rating?: number | null
          comment?: string | null
          pros?: string[] | null
          cons?: string[] | null
          tips?: string | null
          anonymous?: boolean | null
          verified?: boolean | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            referencedRelation: "patient_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_reviews_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      patient_saved_providers: {
        Row: {
          id: string
          patient_id: string | null
          provider_id: string
          created_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          patient_id?: string | null
          provider_id: string
          created_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          patient_id?: string | null
          provider_id?: string
          created_at?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_saved_providers_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patient_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          username: string
          created_at: string | null
          updated_at: string | null
          role: string
          profile_completed: boolean | null
        }
        Insert: {
          id: string
          email: string
          username: string
          created_at?: string | null
          updated_at?: string | null
          role: string
          profile_completed?: boolean | null
        }
        Update: {
          id?: string
          email?: string
          username?: string
          created_at?: string | null
          updated_at?: string | null
          role?: string
          profile_completed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}