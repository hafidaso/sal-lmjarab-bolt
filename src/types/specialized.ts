// Specialized appointment types for psychologists and sexologists
export interface SpecializedAppointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  specialty: 'Psychiatry' | 'Sexology';
  date: string;
  time: string;
  duration: number;
  type: 'in-person' | 'telehealth';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  location?: string;
  telehealthUrl?: string;
  reason: string;
  notes?: string;
  reminderSent: boolean;
  reminderPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    timing: '24h' | '2h' | '30m' | '15m';
  };
  canReschedule: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Specialized features
  isAnonymous: boolean;
  anonymousDisplayName?: string;
  therapyType: string;
  sensitiveIssues: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  crisisSupport: boolean;
  urgency: 'low' | 'medium' | 'high' | 'crisis';
  preferredContactMethod: 'email' | 'phone' | 'secure-message';
  insuranceInfo?: string;
  previousTherapy: boolean;
  currentMedications: string[];
  consentToAnonymous: boolean;
}

// Specialized review types
export interface SpecializedReview {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  specialty: 'Psychiatry' | 'Sexology';
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  aspects: {
    professionalism: number;
    waitTime: number;
    communication: number;
    satisfaction: number;
  };
  
  // Specialized features
  isAnonymous: boolean;
  anonymousDisplayName?: string;
  therapyType?: string;
  sensitiveIssues?: string[];
  consentToAnonymous: boolean;
}

// Crisis support resources
export interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  available: string;
  specialty?: 'Psychiatry' | 'Sexology' | 'general';
}

// Therapy types
export interface TherapyType {
  name: string;
  description: string;
  specialty: 'Psychiatry' | 'Sexology';
  duration?: string;
  intensity?: 'low' | 'medium' | 'high';
}

// Sensitive issues
export interface SensitiveIssue {
  name: string;
  category: string;
  specialty: 'Psychiatry' | 'Sexology';
  crisisLevel?: 'low' | 'medium' | 'high' | 'crisis';
  requiresImmediate?: boolean;
}

// Specialized doctor features
export interface SpecializedDoctorFeatures {
  supportsAnonymousBooking: boolean;
  therapyTypes: string[];
  sensitiveIssues: string[];
  crisisSupport: boolean;
  emergencyContactRequired: boolean;
  anonymousReviewEnabled: boolean;
}

// Specialized booking data
export interface SpecializedBookingData {
  doctorId: string;
  patientName: string;
  isAnonymous: boolean;
  contactEmail: string;
  contactPhone: string;
  therapyType: string;
  sensitiveIssues: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  crisisSupport: boolean;
  notes: string;
  preferredContactMethod: 'email' | 'phone' | 'secure-message';
  insuranceInfo?: string;
  previousTherapy: boolean;
  currentMedications: string[];
  urgency: 'low' | 'medium' | 'high' | 'crisis';
  anonymousDisplayName?: string;
  consentToAnonymous: boolean;
} 