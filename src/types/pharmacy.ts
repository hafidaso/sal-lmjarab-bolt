// Enhanced Pharmacy Types with all requested features

export interface Pharmacy {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    phone: string;
    email?: string;
    website?: string;
  };
  hours: {
    [key: string]: string;
  };
  services: PharmacyService[];
  features: string[];
  description: string;
  pharmacist: {
    name: string;
    license: string;
    experience: number;
    specialization?: string;
    languages: string[];
  };
  staff: PharmacyStaff[];
  is24Hours: boolean;
  type: 'pharmacy';
  emergencyServices?: boolean;
  accessibility?: boolean;
  insurance?: string[];
  languages?: string[];
  
  // New enhanced features
  safetyRating: SafetyRating;
  stockAvailability: StockAvailability;
  deliveryServices: DeliveryService[];
  nightDuty: NightDutyInfo;
  security: SecurityInfo;
  certifications: string[];
  awards: string[];
}

export interface PharmacyService {
  id: string;
  name: string;
  description: string;
  category: 'vaccination' | 'prescription' | 'consultation' | 'testing' | 'equipment' | 'delivery' | 'emergency';
  available: boolean;
  price?: number;
  requiresPrescription?: boolean;
  ageRestriction?: {
    minAge?: number;
    maxAge?: number;
  };
  availability: 'available' | 'limited' | 'unavailable';
  waitTime?: string; // e.g., "15 minutes", "1 hour"
  specialNotes?: string;
}

export interface PharmacyStaff {
  id: string;
  name: string;
  role: 'pharmacist' | 'pharmacy_technician' | 'security_guard' | 'delivery_driver' | 'cashier' | 'manager';
  license?: string;
  experience: number;
  specialization?: string;
  languages: string[];
  availability: {
    [key: string]: { start: string; end: string; available: boolean };
  };
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  certifications: string[];
  image?: string;
}

export interface SafetyRating {
  overall: number; // 1-5 stars
  categories: {
    medicationSafety: number;
    staffTraining: number;
    securityMeasures: number;
    emergencyResponse: number;
    cleanliness: number;
    accessibility: number;
  };
  lastUpdated: string;
  totalReviews: number;
  safetyCertifications: string[];
  incidentReports: number;
  safetyFeatures: string[];
}

export interface StockAvailability {
  lastUpdated: string;
  categories: {
    [category: string]: {
      available: number;
      total: number;
      lowStock: string[];
      outOfStock: string[];
    };
  };
  commonMedications: MedicationStock[];
  urgentMedications: MedicationStock[];
  vaccines: VaccineStock[];
  overTheCounter: OTCStock[];
  medicalEquipment: EquipmentStock[];
}

export interface MedicationStock {
  id: string;
  name: string;
  genericName?: string;
  strength: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'inhaler';
  quantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'on_order';
  price: number;
  requiresPrescription: boolean;
  expiryDate?: string;
  manufacturer: string;
  specialHandling?: string;
}

export interface VaccineStock {
  id: string;
  name: string;
  type: 'flu' | 'covid' | 'travel' | 'pediatric' | 'adult' | 'pneumonia' | 'hepatitis' | 'other';
  available: boolean;
  quantity: number;
  ageRange: string;
  price: number;
  requiresPrescription: boolean;
  specialNotes?: string;
  nextShipment?: string;
}

export interface OTCStock {
  id: string;
  name: string;
  category: 'pain_relief' | 'cold_flu' | 'vitamins' | 'first_aid' | 'personal_care' | 'baby_care';
  quantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  price: number;
  brand: string;
  size: string;
}

export interface EquipmentStock {
  id: string;
  name: string;
  category: 'mobility' | 'monitoring' | 'respiratory' | 'diabetes' | 'wound_care';
  available: boolean;
  quantity: number;
  rentalAvailable: boolean;
  rentalPrice?: number;
  purchasePrice?: number;
  requiresPrescription: boolean;
}

export interface DeliveryService {
  id: string;
  type: 'home_delivery' | 'same_day' | 'express' | 'scheduled' | 'drive_through' | 'curbside';
  available: boolean;
  coverage: {
    radius: number; // in kilometers
    areas: string[];
    restrictions?: string[];
  };
  pricing: {
    basePrice: number;
    perKmPrice?: number;
    freeDeliveryThreshold?: number;
    rushFee?: number;
  };
  timeSlots: {
    [day: string]: string[];
  };
  restrictions: {
    medicationTypes: string[];
    deliveryTimes: string[];
    specialHandling?: string[];
  };
  drivers: DeliveryDriver[];
}

export interface DeliveryDriver {
  id: string;
  name: string;
  vehicle: {
    type: string;
    licensePlate: string;
    capacity: string;
  };
  availability: {
    [day: string]: { start: string; end: string; available: boolean };
  };
  rating: number;
  languages: string[];
  specializations: string[];
}

export interface NightDutyInfo {
  available: boolean;
  schedule: {
    [day: string]: {
      start: string;
      end: string;
      available: boolean;
      staffOnDuty: string[];
    };
  };
  services: string[];
  restrictions: string[];
  emergencyContact: {
    phone: string;
    email?: string;
  };
  securityMeasures: string[];
}

export interface SecurityInfo {
  guards: SecurityGuard[];
  cameras: boolean;
  alarmSystem: boolean;
  accessControl: string[];
  emergencyProcedures: string[];
  incidentResponse: {
    phone: string;
    responseTime: string;
  };
  safetyFeatures: string[];
  lastSecurityAudit: string;
  securityRating: number;
}

export interface SecurityGuard {
  id: string;
  name: string;
  license: string;
  experience: number;
  shift: 'day' | 'night' | '24h';
  languages: string[];
  specializations: string[];
  contactInfo: {
    phone: string;
    radioChannel?: string;
  };
}

// Review types for pharmacy
export interface PharmacyReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  category: 'service_quality' | 'medication_availability' | 'staff_friendliness' | 'delivery_service' | 'safety' | 'cleanliness';
  aspects: {
    medicationSafety: number;
    staffProfessionalism: number;
    waitTime: number;
    cleanliness: number;
    overallExperience: number;
  };
  helpful: number;
  photos?: string[];
}

// Search and filter types
export interface PharmacySearchFilters {
  city?: string;
  services?: string[];
  is24Hours?: boolean;
  hasDelivery?: boolean;
  safetyRating?: number;
  stockAvailability?: string[];
  insurance?: string[];
  languages?: string[];
  accessibility?: boolean;
  nightDuty?: boolean;
}

// API response types
export interface PharmacySearchResponse {
  pharmacies: Pharmacy[];
  total: number;
  page: number;
  limit: number;
  filters: PharmacySearchFilters;
}

// Stock update types
export interface StockUpdateRequest {
  pharmacyId: string;
  updates: {
    medicationId: string;
    quantity: number;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
  }[];
}

// Service booking types
export interface ServiceBooking {
  id: string;
  pharmacyId: string;
  customerId: string;
  serviceId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  prescriptionRequired?: boolean;
  prescriptionId?: string;
} 