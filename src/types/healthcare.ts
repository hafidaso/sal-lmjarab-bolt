export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  experience: number;
  languages: string[];
  insurance: string[];
  location: {
    city: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  availability: {
    nextAvailable: string;
    acceptingNew: boolean;
  };
  fees: {
    consultation: number;
    currency: string;
  };
  verified: boolean;
  badges: string[];
  type: 'doctor';
  emergencyServices?: boolean;
  accessibility?: boolean;
}

export interface Hospital {
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
    email: string;
    website: string;
  };
  hours: {
    [key: string]: string;
  };
  awards: string[];
  specialtyAwards: string[];
  safetyScore: number;
  qualityMetrics: {
    patientSatisfaction: number;
    mortalityRate: number;
    complicationRate: number;
    readmissionRate: number;
  };
  amenities: string[];
  departments: string[];
  description: string;
  emergencyServices: boolean;
  type: 'hospital';
  accessibility?: boolean;
  insurance?: string[];
  languages?: string[];
}

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
  };
  hours: {
    [key: string]: string;
  };
  services: string[];
  features: string[];
  description: string;
  pharmacist: {
    name: string;
    license: string;
    experience: number;
  };
  is24Hours: boolean;
  type: 'pharmacy';
  emergencyServices?: boolean;
  accessibility?: boolean;
  insurance?: string[];
  languages?: string[];
}

type HealthcareFacility = Doctor | Hospital | Pharmacy;