import { Pharmacy, PharmacyService, PharmacyStaff, SafetyRating, StockAvailability, DeliveryService, NightDutyInfo, SecurityInfo } from '../types/pharmacy';

export const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Pharmacie Al Andalous',
    image: 'https://images.pexels.com/photos/5910955/pexels-photo-5910955.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviewCount: 324,
    location: {
      city: 'Casablanca',
      address: '123 Boulevard Mohammed V, Casablanca 20000',
      coordinates: {
        latitude: 33.5731,
        longitude: -7.5898
      },
      phone: '+212 522 123 789',
      email: 'contact@pharmacie-alandalous.ma',
      website: 'https://pharmacie-alandalous.ma'
    },
    hours: {
      'Monday': '8:00 AM - 10:00 PM',
      'Tuesday': '8:00 AM - 10:00 PM',
      'Wednesday': '8:00 AM - 10:00 PM',
      'Thursday': '8:00 AM - 10:00 PM',
      'Friday': '8:00 AM - 10:00 PM',
      'Saturday': '9:00 AM - 9:00 PM',
      'Sunday': '9:00 AM - 6:00 PM'
    },
    services: [
      {
        id: 's1',
        name: 'Prescription Refills',
        description: 'Quick and convenient prescription refill service with automatic reminders',
        category: 'prescription',
        available: true,
        price: 5,
        requiresPrescription: true,
        availability: 'available',
        waitTime: '15 minutes'
      },
      {
        id: 's2',
        name: 'Flu Vaccination',
        description: 'Annual flu shots for adults and children',
        category: 'vaccination',
        available: true,
        price: 80,
        requiresPrescription: false,
        availability: 'available',
        waitTime: '30 minutes',
        ageRestriction: { minAge: 6 }
      },
      {
        id: 's3',
        name: 'COVID-19 Vaccination',
        description: 'COVID-19 vaccine doses and boosters',
        category: 'vaccination',
        available: true,
        price: 0,
        requiresPrescription: false,
        availability: 'available',
        waitTime: '45 minutes',
        ageRestriction: { minAge: 12 }
      },
      {
        id: 's4',
        name: 'Blood Pressure Monitoring',
        description: 'Free blood pressure checks and monitoring services',
        category: 'testing',
        available: true,
        price: 0,
        requiresPrescription: false,
        availability: 'available',
        waitTime: '10 minutes'
      },
      {
        id: 's5',
        name: 'Diabetes Testing',
        description: 'Blood glucose testing and diabetes management support',
        category: 'testing',
        available: true,
        price: 25,
        requiresPrescription: false,
        availability: 'available',
        waitTime: '20 minutes'
      },
      {
        id: 's6',
        name: 'Home Delivery',
        description: 'Convenient home delivery service for your medications',
        category: 'delivery',
        available: true,
        price: 15,
        requiresPrescription: false,
        availability: 'available',
        waitTime: '2-4 hours'
      },
      {
        id: 's7',
        name: 'Medication Consultation',
        description: 'Professional consultation on medication usage, interactions, and side effects',
        category: 'consultation',
        available: true,
        price: 0,
        requiresPrescription: false,
        availability: 'available',
        waitTime: '20 minutes'
      },
      {
        id: 's8',
        name: 'Travel Vaccines',
        description: 'Vaccines for international travel including yellow fever, hepatitis, and typhoid',
        category: 'vaccination',
        available: true,
        price: 150,
        requiresPrescription: false,
        availability: 'limited',
        waitTime: '1 hour',
        specialNotes: 'Appointment required 2 weeks in advance'
      }
    ],
    features: [
      'Drive-Through Service',
      'Wheelchair Accessible',
      'Free Parking',
      'Online Ordering',
      'Mobile App',
      'Insurance Accepted',
      'Multilingual Staff',
      'Emergency Services',
      '24/7 Security',
      'Night Duty Available'
    ],
    description: 'Pharmacie Al Andalous has been serving the Casablanca community for over 20 years. We are committed to providing exceptional pharmaceutical care with a focus on patient health and wellness. Our experienced pharmacists are available to answer your questions and provide personalized medication counseling.',
    pharmacist: {
      name: 'Dr. Youssef Benali',
      license: 'PharmD License #MA-2003-1234',
      experience: 18,
      specialization: 'Clinical Pharmacy',
      languages: ['Arabic', 'French', 'English']
    },
    staff: [
      {
        id: 'st1',
        name: 'Dr. Youssef Benali',
        role: 'pharmacist',
        license: 'PharmD License #MA-2003-1234',
        experience: 18,
        specialization: 'Clinical Pharmacy',
        languages: ['Arabic', 'French', 'English'],
        availability: {
          'Monday': { start: '08:00', end: '18:00', available: true },
          'Tuesday': { start: '08:00', end: '18:00', available: true },
          'Wednesday': { start: '08:00', end: '18:00', available: true },
          'Thursday': { start: '08:00', end: '18:00', available: true },
          'Friday': { start: '08:00', end: '16:00', available: true },
          'Saturday': { start: '09:00', end: '17:00', available: true },
          'Sunday': { start: '09:00', end: '14:00', available: true }
        },
        certifications: ['Board Certified Pharmacist', 'Immunization Certification', 'MTM Certification'],
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 'st2',
        name: 'Fatima Alami',
        role: 'pharmacy_technician',
        experience: 8,
        specialization: 'Compounding',
        languages: ['Arabic', 'French'],
        availability: {
          'Monday': { start: '08:00', end: '20:00', available: true },
          'Tuesday': { start: '08:00', end: '20:00', available: true },
          'Wednesday': { start: '08:00', end: '20:00', available: true },
          'Thursday': { start: '08:00', end: '20:00', available: true },
          'Friday': { start: '08:00', end: '20:00', available: true },
          'Saturday': { start: '09:00', end: '18:00', available: true },
          'Sunday': { start: '09:00', end: '16:00', available: true }
        },
        certifications: ['Pharmacy Technician Certification', 'Compounding Certification']
      },
      {
        id: 'st3',
        name: 'Ahmed Tazi',
        role: 'security_guard',
        license: 'Security License #SEC-2020-5678',
        experience: 5,
        specialization: 'Pharmacy Security',
        languages: ['Arabic', 'French'],
        availability: {
          'Monday': { start: '20:00', end: '08:00', available: true },
          'Tuesday': { start: '20:00', end: '08:00', available: true },
          'Wednesday': { start: '20:00', end: '08:00', available: true },
          'Thursday': { start: '20:00', end: '08:00', available: true },
          'Friday': { start: '20:00', end: '08:00', available: true },
          'Saturday': { start: '18:00', end: '09:00', available: true },
          'Sunday': { start: '16:00', end: '09:00', available: true }
        },
        certifications: ['Security Guard License', 'First Aid Certification', 'CPR Certification'],
        contactInfo: {
          phone: '+212 522 123 790',
          radioChannel: 'Channel 5'
        }
      },
      {
        id: 'st4',
        name: 'Karim Mansouri',
        role: 'delivery_driver',
        experience: 3,
        specialization: 'Medication Delivery',
        languages: ['Arabic', 'French'],
        availability: {
          'Monday': { start: '09:00', end: '19:00', available: true },
          'Tuesday': { start: '09:00', end: '19:00', available: true },
          'Wednesday': { start: '09:00', end: '19:00', available: true },
          'Thursday': { start: '09:00', end: '19:00', available: true },
          'Friday': { start: '09:00', end: '19:00', available: true },
          'Saturday': { start: '10:00', end: '18:00', available: true },
          'Sunday': { start: '10:00', end: '16:00', available: true }
        },
        certifications: ['Driver License', 'Safe Driving Certification']
      }
    ],
    is24Hours: false,
    type: 'pharmacy',
    emergencyServices: true,
    accessibility: true,
    insurance: ['CNSS', 'RAMED', 'Private Insurance'],
    languages: ['Arabic', 'French', 'English'],
    
    // Enhanced features
    safetyRating: {
      overall: 4.8,
      categories: {
        medicationSafety: 5.0,
        staffTraining: 4.9,
        securityMeasures: 4.7,
        emergencyResponse: 4.8,
        cleanliness: 4.9,
        accessibility: 4.6
      },
      lastUpdated: '2025-06-15',
      totalReviews: 324,
      safetyCertifications: [
        'ISO 9001:2015 Quality Management',
        'Good Pharmacy Practice (GPP)',
        'Patient Safety Certification',
        'Medication Safety Certification'
      ],
      incidentReports: 2,
      safetyFeatures: [
        'Automated medication dispensing systems',
        'Barcode scanning for all medications',
        'Temperature-controlled storage',
        '24/7 security monitoring',
        'Emergency response protocols',
        'Staff safety training programs'
      ]
    },
    
    stockAvailability: {
      lastUpdated: '2025-01-15T10:30:00Z',
      categories: {
        'Pain Relief': { available: 45, total: 50, lowStock: ['Ibuprofen 400mg'], outOfStock: [] },
        'Antibiotics': { available: 38, total: 40, lowStock: ['Amoxicillin 500mg'], outOfStock: [] },
        'Diabetes': { available: 42, total: 45, lowStock: [], outOfStock: [] },
        'Hypertension': { available: 35, total: 40, lowStock: ['Lisinopril 10mg'], outOfStock: [] },
        'Vaccines': { available: 28, total: 30, lowStock: ['Flu Vaccine'], outOfStock: [] }
      },
      commonMedications: [
        {
          id: 'med1',
          name: 'Paracetamol',
          genericName: 'Acetaminophen',
          strength: '500mg',
          form: 'tablet',
          quantity: 150,
          status: 'in_stock',
          price: 8.50,
          requiresPrescription: false,
          manufacturer: 'PharmaCorp',
          expiryDate: '2025-12-31'
        },
        {
          id: 'med2',
          name: 'Ibuprofen',
          genericName: 'Ibuprofen',
          strength: '400mg',
          form: 'tablet',
          quantity: 12,
          status: 'low_stock',
          price: 12.00,
          requiresPrescription: false,
          manufacturer: 'MediPharm',
          expiryDate: '2025-06-30'
        },
        {
          id: 'med3',
          name: 'Amoxicillin',
          genericName: 'Amoxicillin',
          strength: '500mg',
          form: 'capsule',
          quantity: 8,
          status: 'low_stock',
          price: 45.00,
          requiresPrescription: true,
          manufacturer: 'AntibioPharm',
          expiryDate: '2025-08-15'
        }
      ],
      urgentMedications: [
        {
          id: 'urg1',
          name: 'EpiPen',
          genericName: 'Epinephrine',
          strength: '0.3mg',
          form: 'injection',
          quantity: 5,
          status: 'in_stock',
          price: 350.00,
          requiresPrescription: true,
          manufacturer: 'EmergencyPharm',
          expiryDate: '2025-10-31',
          specialHandling: 'Refrigerated storage required'
        },
        {
          id: 'urg2',
          name: 'Nitroglycerin',
          genericName: 'Nitroglycerin',
          strength: '0.4mg',
          form: 'tablet',
          quantity: 25,
          status: 'in_stock',
          price: 28.00,
          requiresPrescription: true,
          manufacturer: 'CardioPharm',
          expiryDate: '2025-03-15'
        }
      ],
      vaccines: [
        {
          id: 'vac1',
          name: 'Flu Vaccine 2025',
          type: 'flu',
          available: true,
          quantity: 8,
          ageRange: '6 months and older',
          price: 80.00,
          requiresPrescription: false,
          specialNotes: 'Annual vaccination recommended',
          nextShipment: '2025-02-01'
        },
        {
          id: 'vac2',
          name: 'COVID-19 Booster',
          type: 'covid',
          available: true,
          quantity: 15,
          ageRange: '12 years and older',
          price: 0.00,
          requiresPrescription: false,
          specialNotes: 'Free vaccination program'
        }
      ],
      overTheCounter: [
        {
          id: 'otc1',
          name: 'Vitamin C',
          category: 'vitamins',
          quantity: 45,
          status: 'in_stock',
          price: 25.00,
          brand: 'HealthPlus',
          size: '100 tablets'
        },
        {
          id: 'otc2',
          name: 'Band-Aids',
          category: 'first_aid',
          quantity: 30,
          status: 'in_stock',
          price: 15.00,
          brand: 'MediCare',
          size: '50 pieces'
        }
      ],
      medicalEquipment: [
        {
          id: 'eq1',
          name: 'Blood Pressure Monitor',
          category: 'monitoring',
          available: true,
          quantity: 3,
          rentalAvailable: true,
          rentalPrice: 50.00,
          purchasePrice: 450.00,
          requiresPrescription: false
        },
        {
          id: 'eq2',
          name: 'Wheelchair',
          category: 'mobility',
          available: true,
          quantity: 2,
          rentalAvailable: true,
          rentalPrice: 75.00,
          purchasePrice: 800.00,
          requiresPrescription: true
        }
      ]
    },
    
    deliveryServices: [
      {
        id: 'del1',
        type: 'home_delivery',
        available: true,
        coverage: {
          radius: 10,
          areas: ['Casablanca Center', 'Ain Diab', 'Maarif', 'Palmiers'],
          restrictions: ['Controlled substances require ID verification']
        },
        pricing: {
          basePrice: 15.00,
          perKmPrice: 2.00,
          freeDeliveryThreshold: 200.00,
          rushFee: 10.00
        },
        timeSlots: {
          'Monday': ['09:00-12:00', '14:00-18:00'],
          'Tuesday': ['09:00-12:00', '14:00-18:00'],
          'Wednesday': ['09:00-12:00', '14:00-18:00'],
          'Thursday': ['09:00-12:00', '14:00-18:00'],
          'Friday': ['09:00-12:00', '14:00-18:00'],
          'Saturday': ['10:00-16:00'],
          'Sunday': ['10:00-14:00']
        },
        restrictions: {
          medicationTypes: ['Controlled substances', 'Refrigerated medications'],
          deliveryTimes: ['Within 4 hours for urgent medications'],
          specialHandling: ['Signature required for controlled substances']
        },
        drivers: [
          {
            id: 'drv1',
            name: 'Karim Mansouri',
            vehicle: {
              type: 'Motorcycle',
              licensePlate: '12345-A-6',
              capacity: 'Small packages'
            },
            availability: {
              'Monday': { start: '09:00', end: '19:00', available: true },
              'Tuesday': { start: '09:00', end: '19:00', available: true },
              'Wednesday': { start: '09:00', end: '19:00', available: true },
              'Thursday': { start: '09:00', end: '19:00', available: true },
              'Friday': { start: '09:00', end: '19:00', available: true },
              'Saturday': { start: '10:00', end: '18:00', available: true },
              'Sunday': { start: '10:00', end: '16:00', available: true }
            },
            rating: 4.8,
            languages: ['Arabic', 'French'],
            specializations: ['Medication delivery', 'Temperature-controlled transport']
          }
        ]
      }
    ],
    
    nightDuty: {
      available: true,
      schedule: {
        'Monday': { start: '22:00', end: '08:00', available: true, staffOnDuty: ['Ahmed Tazi'] },
        'Tuesday': { start: '22:00', end: '08:00', available: true, staffOnDuty: ['Ahmed Tazi'] },
        'Wednesday': { start: '22:00', end: '08:00', available: true, staffOnDuty: ['Ahmed Tazi'] },
        'Thursday': { start: '22:00', end: '08:00', available: true, staffOnDuty: ['Ahmed Tazi'] },
        'Friday': { start: '22:00', end: '08:00', available: true, staffOnDuty: ['Ahmed Tazi'] },
        'Saturday': { start: '20:00', end: '09:00', available: true, staffOnDuty: ['Ahmed Tazi'] },
        'Sunday': { start: '18:00', end: '09:00', available: true, staffOnDuty: ['Ahmed Tazi'] }
      },
      services: ['Emergency medications', 'Basic consultations', 'Prescription verification'],
      restrictions: ['Limited services during night hours', 'Emergency cases only'],
      emergencyContact: {
        phone: '+212 522 123 791',
        email: 'emergency@pharmacie-alandalous.ma'
      },
      securityMeasures: ['24/7 security guard', 'CCTV monitoring', 'Emergency alarm system']
    },
    
    security: {
      guards: [
        {
          id: 'sec1',
          name: 'Ahmed Tazi',
          license: 'Security License #SEC-2020-5678',
          experience: 5,
          shift: 'night',
          languages: ['Arabic', 'French'],
          specializations: ['Pharmacy security', 'Emergency response'],
          contactInfo: {
            phone: '+212 522 123 790',
            radioChannel: 'Channel 5'
          }
        }
      ],
      cameras: true,
      alarmSystem: true,
      accessControl: ['Key card entry', 'Biometric access', 'Visitor registration'],
      emergencyProcedures: ['Medical emergency response', 'Security incident protocols', 'Evacuation procedures'],
      incidentResponse: {
        phone: '+212 522 123 792',
        responseTime: '5 minutes'
      },
      safetyFeatures: [
        '24/7 CCTV monitoring',
        'Motion sensors',
        'Panic buttons',
        'Secure medication storage',
        'Visitor registration system'
      ],
      lastSecurityAudit: '2025-06-20',
      securityRating: 4.7
    },
    
    certifications: [
      'ISO 9001:2015 Quality Management',
      'Good Pharmacy Practice (GPP)',
      'Patient Safety Certification',
      'Medication Safety Certification',
      'Immunization Certification'
    ],
    
    awards: [
      'Best Pharmacy 2023 - Casablanca',
      'Patient Safety Excellence Award 2022',
      'Community Service Award 2021'
    ]
  },
  
  // Second pharmacy with different features
  {
    id: '2',
    name: 'Pharmacie de Garde - 24/7',
    image: 'https://images.pexels.com/photos/5910955/pexels-photo-5910955.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    reviewCount: 189,
    location: {
      city: 'Marrakech',
      address: '789 Boulevard Mohammed VI, Marrakech 40000',
      coordinates: {
        latitude: 31.6295,
        longitude: -7.9811
      },
      phone: '+212 524 987 654',
      email: 'contact@pharmacie-de-garde.ma',
      website: 'https://pharmacie-de-garde.ma'
    },
    hours: {
      'Monday': '24 Hours',
      'Tuesday': '24 Hours',
      'Wednesday': '24 Hours',
      'Thursday': '24 Hours',
      'Friday': '24 Hours',
      'Saturday': '24 Hours',
      'Sunday': '24 Hours'
    },
    services: [
      {
        id: 's9',
        name: 'Emergency Medications',
        description: '24/7 emergency medication dispensing',
        category: 'emergency',
        available: true,
        price: 10,
        requiresPrescription: true,
        availability: 'available',
        waitTime: '5 minutes'
      },
      {
        id: 's10',
        name: 'Travel Vaccines',
        description: 'Comprehensive travel vaccination services',
        category: 'vaccination',
        available: true,
        price: 200,
        requiresPrescription: false,
        availability: 'available',
        waitTime: '1 hour'
      }
    ],
    features: [
      '24/7 Service',
      'Emergency Services',
      'Drive-Through',
      'Security Guard',
      'Free Parking',
      'Insurance Accepted'
    ],
    description: '24/7 emergency pharmacy serving Marrakech with round-the-clock pharmaceutical care.',
    pharmacist: {
      name: 'Dr. Amina El Fassi',
      license: 'PharmD License #MA-2010-5678',
      experience: 12,
      specialization: 'Emergency Pharmacy',
      languages: ['Arabic', 'French', 'English', 'Spanish']
    },
    staff: [
      {
        id: 'st5',
        name: 'Dr. Amina El Fassi',
        role: 'pharmacist',
        license: 'PharmD License #MA-2010-5678',
        experience: 12,
        specialization: 'Emergency Pharmacy',
        languages: ['Arabic', 'French', 'English', 'Spanish'],
        availability: {
          'Monday': { start: '00:00', end: '23:59', available: true },
          'Tuesday': { start: '00:00', end: '23:59', available: true },
          'Wednesday': { start: '00:00', end: '23:59', available: true },
          'Thursday': { start: '00:00', end: '23:59', available: true },
          'Friday': { start: '00:00', end: '23:59', available: true },
          'Saturday': { start: '00:00', end: '23:59', available: true },
          'Sunday': { start: '00:00', end: '23:59', available: true }
        },
        certifications: ['Emergency Pharmacy Certification', 'Critical Care Pharmacy']
      }
    ],
    is24Hours: true,
    type: 'pharmacy',
    emergencyServices: true,
    accessibility: true,
    insurance: ['CNSS', 'RAMED'],
    languages: ['Arabic', 'French', 'English', 'Spanish'],
    
    safetyRating: {
      overall: 4.3,
      categories: {
        medicationSafety: 4.5,
        staffTraining: 4.2,
        securityMeasures: 4.8,
        emergencyResponse: 4.9,
        cleanliness: 4.1,
        accessibility: 4.0
      },
      lastUpdated: '2025-06-15',
      totalReviews: 189,
      safetyCertifications: [
        'Emergency Pharmacy Certification',
        '24/7 Safety Standards'
      ],
      incidentReports: 5,
      safetyFeatures: [
        '24/7 security monitoring',
        'Emergency response protocols',
        'Automated medication systems'
      ]
    },
    
    stockAvailability: {
      lastUpdated: '2025-01-15T10:30:00Z',
      categories: {
        'Emergency': { available: 20, total: 25, lowStock: [], outOfStock: [] },
        'Pain Relief': { available: 30, total: 35, lowStock: [], outOfStock: [] }
      },
      commonMedications: [],
      urgentMedications: [],
      vaccines: [],
      overTheCounter: [],
      medicalEquipment: []
    },
    
    deliveryServices: [],
    
    nightDuty: {
      available: true,
      schedule: {
        'Monday': { start: '00:00', end: '23:59', available: true, staffOnDuty: ['Dr. Amina El Fassi'] },
        'Tuesday': { start: '00:00', end: '23:59', available: true, staffOnDuty: ['Dr. Amina El Fassi'] },
        'Wednesday': { start: '00:00', end: '23:59', available: true, staffOnDuty: ['Dr. Amina El Fassi'] },
        'Thursday': { start: '00:00', end: '23:59', available: true, staffOnDuty: ['Dr. Amina El Fassi'] },
        'Friday': { start: '00:00', end: '23:59', available: true, staffOnDuty: ['Dr. Amina El Fassi'] },
        'Saturday': { start: '00:00', end: '23:59', available: true, staffOnDuty: ['Dr. Amina El Fassi'] },
        'Sunday': { start: '00:00', end: '23:59', available: true, staffOnDuty: ['Dr. Amina El Fassi'] }
      },
      services: ['Emergency medications', '24/7 consultations'],
      restrictions: [],
      emergencyContact: {
        phone: '+212 524 987 655'
      },
      securityMeasures: ['24/7 security', 'CCTV monitoring']
    },
    
    security: {
      guards: [],
      cameras: true,
      alarmSystem: true,
      accessControl: ['24/7 security'],
      emergencyProcedures: ['Emergency response'],
      incidentResponse: {
        phone: '+212 524 987 656',
        responseTime: '2 minutes'
      },
      safetyFeatures: ['24/7 monitoring'],
      lastSecurityAudit: '2025-06-20',
      securityRating: 4.8
    },
    
    certifications: [
      'Emergency Pharmacy Certification',
      '24/7 Safety Standards'
    ],
    
    awards: [
      '24/7 Service Excellence 2023'
    ]
  }
];

export const getPharmacyById = (id: string): Pharmacy | undefined => {
  return mockPharmacies.find(pharmacy => pharmacy.id === id);
};

export const searchPharmacies = (filters: {
  city?: string;
  services?: string[];
  is24Hours?: boolean;
  hasDelivery?: boolean;
  safetyRating?: number;
}): Pharmacy[] => {
  return mockPharmacies.filter(pharmacy => {
    if (filters.city && pharmacy.location.city !== filters.city) return false;
    if (filters.is24Hours && !pharmacy.is24Hours) return false;
    if (filters.hasDelivery && pharmacy.deliveryServices.length === 0) return false;
    if (filters.safetyRating && pharmacy.safetyRating.overall < filters.safetyRating) return false;
    if (filters.services && !filters.services.some(service => 
      pharmacy.services.some(s => s.name.toLowerCase().includes(service.toLowerCase()))
    )) return false;
    return true;
  });
}; 