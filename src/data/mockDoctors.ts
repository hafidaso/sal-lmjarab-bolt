export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subspecialties: string[];
  image: string;
  rating: number;
  reviewCount: number;
  experience: number;
  languages: string[];
  insurance: string[];
  location: {
    city: string;
    address: string;
    distance: number;
    coordinates: { lat: number; lng: number };
  };
  availability: {
    nextAvailable: string;
    acceptingNew: boolean;
    responseTime: number; // hours
  };
  fees: {
    consultation: number;
    followUp: number;
    currency: string;
  };
  verified: boolean;
  badges: string[];
  education: string[];
  certifications: string[];
  hospitalAffiliations: string[];
  biography: string;
  workingHours: {
    [key: string]: { start: string; end: string; available: boolean };
  };
  services: string[];
  conditions: string[];
}

export interface Review {
  id: string;
  patientName: string;
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
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  type: 'consultation' | 'follow-up' | 'emergency';
  duration: number;
}

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Bennani',
    specialty: 'Cardiology',
    subspecialties: ['Interventional Cardiology', 'Heart Failure', 'Cardiac Imaging'],
    image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviewCount: 127,
    experience: 15,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'RAMED', 'Private'],
    location: {
      city: 'Casablanca',
      address: 'Boulevard Zerktouni, Maarif, Casablanca 20100',
      distance: 2.3,
      coordinates: { lat: 33.5731, lng: -7.5898 }
    },
    availability: {
      nextAvailable: '2025-01-15T10:00:00Z',
      acceptingNew: true,
      responseTime: 2
    },
    fees: {
      consultation: 400,
      followUp: 300,
      currency: 'MAD'
    },
    verified: true,
    badges: [
      "Most Recommended",
      "Patient's Choice",
      "Responsive Doctor",
      "Top Rated"
    ],
    education: [
      'MD - Faculty of Medicine, University of Casablanca (2008)',
      'Cardiology Residency - CHU Ibn Rochd, Casablanca (2012)',
      'Fellowship in Interventional Cardiology - Hôpital Européen Georges-Pompidou, Paris (2014)'
    ],
    certifications: [
      'Board Certified in Cardiology - Moroccan Society of Cardiology',
      'Advanced Cardiac Life Support (ACLS) - American Heart Association',
      'Interventional Cardiology Certification - European Society of Cardiology'
    ],
    hospitalAffiliations: ['CHU Ibn Rochd', 'Clinique Al Andalous', 'Polyclinique du Littoral'],
    biography: 'Dr. Ahmed Bennani is a highly experienced interventional cardiologist with over 15 years of practice in Morocco and France. He specializes in complex coronary interventions, structural heart disease, and advanced cardiac imaging. Dr. Bennani has performed over 2,000 cardiac catheterizations and is recognized for his expertise in treating acute coronary syndromes. He is committed to providing compassionate, evidence-based care and stays current with the latest advances in cardiovascular medicine.',
    workingHours: {
      Monday: { start: '09:00', end: '17:00', available: true },
      Tuesday: { start: '09:00', end: '17:00', available: true },
      Wednesday: { start: '09:00', end: '17:00', available: true },
      Thursday: { start: '09:00', end: '17:00', available: true },
      Friday: { start: '09:00', end: '15:00', available: true },
      Saturday: { start: '09:00', end: '13:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Coronary Angioplasty',
      'Cardiac Catheterization',
      'Echocardiography',
      'Stress Testing',
      'Holter Monitoring',
      'Pacemaker Follow-up',
      'Heart Failure Management'
    ],
    conditions: [
      'Coronary Artery Disease',
      'Heart Attack',
      'Angina',
      'Heart Failure',
      'Arrhythmias',
      'Hypertension',
      'High Cholesterol',
      'Valvular Heart Disease'
    ]
  },
  {
    id: '2',
    name: 'Dr. Fatima Alaoui',
    specialty: 'Dermatology',
    subspecialties: ['Cosmetic Dermatology', 'Dermatopathology', 'Pediatric Dermatology'],
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 89,
    experience: 12,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'Private'],
    location: {
      city: 'Rabat',
      address: 'Avenue Mohammed V, Agdal, Rabat 10090',
      distance: 15.7,
      coordinates: { lat: 34.0209, lng: -6.8416 }
    },
    availability: {
      nextAvailable: '2025-01-16T14:30:00Z',
      acceptingNew: true,
      responseTime: 1
    },
    fees: {
      consultation: 350,
      followUp: 250,
      currency: 'MAD'
    },
    verified: true,
    badges: [
      "Patient's Choice",
      "Responsive Doctor",
      "Cosmetic Expert",
      "Most Recommended"
    ],
    education: [
      'MD - Faculty of Medicine, Mohammed V University, Rabat (2011)',
      'Dermatology Residency - CHU Ibn Sina, Rabat (2015)',
      'Fellowship in Cosmetic Dermatology - University of Paris (2016)'
    ],
    certifications: [
      'Board Certified in Dermatology - Moroccan Society of Dermatology',
      'Cosmetic Dermatology Certification - International Society of Dermatology',
      'Laser Safety Certification - American Society for Laser Medicine'
    ],
    hospitalAffiliations: ['CHU Ibn Sina', 'Clinique Agdal', 'Centre Dermatologique Rabat'],
    biography: 'Dr. Fatima Alaoui is a board-certified dermatologist with extensive experience in both medical and cosmetic dermatology. She completed her fellowship in Paris and has been practicing for over 12 years. Dr. Alaoui is particularly skilled in treating complex skin conditions, acne, and providing advanced cosmetic treatments. She is known for her gentle approach and excellent patient communication skills.',
    workingHours: {
      Monday: { start: '08:30', end: '16:30', available: true },
      Tuesday: { start: '08:30', end: '16:30', available: true },
      Wednesday: { start: '08:30', end: '16:30', available: true },
      Thursday: { start: '08:30', end: '16:30', available: true },
      Friday: { start: '08:30', end: '14:00', available: true },
      Saturday: { start: '09:00', end: '12:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Acne Treatment',
      'Skin Cancer Screening',
      'Botox Injections',
      'Chemical Peels',
      'Laser Hair Removal',
      'Mole Removal',
      'Eczema Treatment',
      'Psoriasis Management'
    ],
    conditions: [
      'Acne',
      'Eczema',
      'Psoriasis',
      'Skin Cancer',
      'Rosacea',
      'Hair Loss',
      'Vitiligo',
      'Dermatitis'
    ]
  },
  {
    id: '3',
    name: 'Dr. Omar Idrissi',
    specialty: 'General Medicine',
    subspecialties: ['Family Medicine', 'Preventive Care', 'Chronic Disease Management'],
    image: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviewCount: 203,
    experience: 20,
    languages: ['Arabic', 'French', 'English', 'Berber'],
    insurance: ['CNSS', 'RAMED'],
    location: {
      city: 'Marrakech',
      address: 'Avenue Mohammed VI, Gueliz, Marrakech 40000',
      distance: 245.8,
      coordinates: { lat: 31.6295, lng: -7.9811 }
    },
    availability: {
      nextAvailable: '2025-01-14T09:00:00Z',
      acceptingNew: true,
      responseTime: 3
    },
    fees: {
      consultation: 250,
      followUp: 200,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Most Affordable', 'High Volume', 'Community Choice'],
    education: [
      'MD - Faculty of Medicine, Cadi Ayyad University, Marrakech (2003)',
      'Family Medicine Residency - CHU Mohammed VI, Marrakech (2007)',
      'Public Health Certificate - National School of Public Health, Rabat (2010)'
    ],
    certifications: [
      'Board Certified in Family Medicine - Moroccan College of Family Physicians',
      'Diabetes Management Certification - International Diabetes Federation',
      'Hypertension Specialist - Moroccan Society of Hypertension'
    ],
    hospitalAffiliations: ['CHU Mohammed VI', 'Polyclinique du Sud', 'Centre de Santé Gueliz'],
    biography: 'Dr. Omar Idrissi is a dedicated family physician with 20 years of experience serving the Marrakech community. He is passionate about preventive care and chronic disease management, particularly diabetes and hypertension. Dr. Idrissi is fluent in multiple languages including Berber, making him accessible to diverse patient populations. He is known for his thorough examinations and patient education approach.',
    workingHours: {
      Monday: { start: '08:00', end: '18:00', available: true },
      Tuesday: { start: '08:00', end: '18:00', available: true },
      Wednesday: { start: '08:00', end: '18:00', available: true },
      Thursday: { start: '08:00', end: '18:00', available: true },
      Friday: { start: '08:00', end: '16:00', available: true },
      Saturday: { start: '08:00', end: '14:00', available: true },
      Sunday: { start: '09:00', end: '13:00', available: true }
    },
    services: [
      'Annual Physical Exams',
      'Vaccination',
      'Diabetes Management',
      'Hypertension Treatment',
      'Health Screenings',
      'Minor Procedures',
      'Chronic Disease Management',
      'Preventive Care'
    ],
    conditions: [
      'Diabetes',
      'Hypertension',
      'High Cholesterol',
      'Obesity',
      'Common Cold',
      'Flu',
      'Allergies',
      'Arthritis'
    ]
  },
  {
    id: '4',
    name: 'Dr. Aicha Benali',
    specialty: 'Pediatrics',
    subspecialties: ['Neonatology', 'Pediatric Cardiology', 'Developmental Pediatrics'],
    image: 'https://images.pexels.com/photos/5215001/pexels-photo-5215001.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 156,
    experience: 10,
    languages: ['Arabic', 'French'],
    insurance: ['CNSS', 'RAMED', 'Private'],
    location: {
      city: 'Fes',
      address: 'Boulevard Allal El Fassi, Ville Nouvelle, Fes 30000',
      distance: 189.2,
      coordinates: { lat: 34.0181, lng: -5.0078 }
    },
    availability: {
      nextAvailable: '2025-01-17T11:00:00Z',
      acceptingNew: false,
      responseTime: 4
    },
    fees: {
      consultation: 300,
      followUp: 250,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Child Specialist', 'Gentle Care', 'Parent Recommended'],
    education: [
      'MD - Faculty of Medicine, Sidi Mohammed Ben Abdellah University, Fes (2013)',
      'Pediatrics Residency - CHU Hassan II, Fes (2017)',
      'Neonatology Fellowship - Hôpital Robert Debré, Paris (2019)'
    ],
    certifications: [
      'Board Certified in Pediatrics - Moroccan Society of Pediatrics',
      'Neonatal Resuscitation Program - American Academy of Pediatrics',
      'Pediatric Advanced Life Support - European Resuscitation Council'
    ],
    hospitalAffiliations: ['CHU Hassan II', 'Clinique Al Kawtar', 'Centre Pédiatrique Fes'],
    biography: 'Dr. Aicha Benali is a compassionate pediatrician specializing in newborn and infant care. With 10 years of experience, she has developed expertise in neonatology and pediatric cardiology. Dr. Benali completed advanced training in Paris and is known for her gentle approach with children and excellent communication with parents. She is particularly skilled in managing complex pediatric cases and developmental assessments.',
    workingHours: {
      Monday: { start: '09:00', end: '17:00', available: true },
      Tuesday: { start: '09:00', end: '17:00', available: true },
      Wednesday: { start: '09:00', end: '17:00', available: true },
      Thursday: { start: '09:00', end: '17:00', available: true },
      Friday: { start: '09:00', end: '15:00', available: true },
      Saturday: { start: '09:00', end: '13:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Well-Child Visits',
      'Immunizations',
      'Growth Assessment',
      'Developmental Screening',
      'Newborn Care',
      'Pediatric Cardiology',
      'Allergy Testing',
      'Behavioral Counseling'
    ],
    conditions: [
      'Asthma',
      'Allergies',
      'Growth Disorders',
      'Developmental Delays',
      'Heart Murmurs',
      'Feeding Problems',
      'Sleep Disorders',
      'Behavioral Issues'
    ]
  },
  {
    id: '5',
    name: 'Dr. Youssef Tazi',
    specialty: 'Orthopedics',
    subspecialties: ['Sports Medicine', 'Joint Replacement', 'Spine Surgery'],
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviewCount: 98,
    experience: 18,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'Private'],
    location: {
      city: 'Casablanca',
      address: 'Rue Ibn Batouta, Maarif, Casablanca 20100',
      distance: 3.1,
      coordinates: { lat: 33.5892, lng: -7.6036 }
    },
    availability: {
      nextAvailable: '2025-01-18T08:30:00Z',
      acceptingNew: true,
      responseTime: 2
    },
    fees: {
      consultation: 450,
      followUp: 350,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Sports Medicine Expert', 'Surgical Excellence', 'Innovation Leader'],
    education: [
      'MD - Faculty of Medicine, University of Casablanca (2005)',
      'Orthopedic Surgery Residency - CHU Ibn Rochd, Casablanca (2010)',
      'Sports Medicine Fellowship - Hospital for Special Surgery, New York (2012)'
    ],
    certifications: [
      'Board Certified in Orthopedic Surgery - Moroccan Society of Orthopedics',
      'Sports Medicine Certification - International Federation of Sports Medicine',
      'Arthroscopy Certification - International Arthroscopy Association'
    ],
    hospitalAffiliations: ['CHU Ibn Rochd', 'Clinique des Spécialités', 'Centre Orthopédique Casa'],
    biography: 'Dr. Youssef Tazi is a leading orthopedic surgeon with specialized training in sports medicine and minimally invasive surgery. He has 18 years of experience treating athletes and active individuals. Dr. Tazi completed fellowship training in New York and has introduced several innovative surgical techniques to Morocco. He is the team physician for several professional sports clubs and is known for his expertise in complex joint reconstructions.',
    workingHours: {
      Monday: { start: '08:00', end: '16:00', available: true },
      Tuesday: { start: '08:00', end: '16:00', available: true },
      Wednesday: { start: '08:00', end: '16:00', available: true },
      Thursday: { start: '08:00', end: '16:00', available: true },
      Friday: { start: '08:00', end: '14:00', available: true },
      Saturday: { start: '09:00', end: '12:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Knee Arthroscopy',
      'Shoulder Surgery',
      'Hip Replacement',
      'Sports Injury Treatment',
      'Fracture Care',
      'Spine Surgery',
      'Joint Injections',
      'Physical Therapy Consultation'
    ],
    conditions: [
      'ACL Tears',
      'Meniscus Injuries',
      'Rotator Cuff Tears',
      'Arthritis',
      'Fractures',
      'Back Pain',
      'Sports Injuries',
      'Joint Pain'
    ]
  },
  {
    id: '6',
    name: 'Dr. Khadija Mansouri',
    specialty: 'Gynecology',
    subspecialties: ['Obstetrics', 'Reproductive Endocrinology', 'Minimally Invasive Surgery'],
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviewCount: 142,
    experience: 14,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'RAMED', 'Private'],
    location: {
      city: 'Rabat',
      address: 'Avenue Allal Ben Abdellah, Hassan, Rabat 10020',
      distance: 16.2,
      coordinates: { lat: 34.0209, lng: -6.8416 }
    },
    availability: {
      nextAvailable: '2025-01-16T10:30:00Z',
      acceptingNew: true,
      responseTime: 1
    },
    fees: {
      consultation: 380,
      followUp: 280,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Women\'s Health Expert', 'Compassionate Care', 'High Success Rate'],
    education: [
      'MD - Faculty of Medicine, Mohammed V University, Rabat (2009)',
      'Obstetrics & Gynecology Residency - CHU Ibn Sina, Rabat (2013)',
      'Reproductive Endocrinology Fellowship - Université Paris Descartes (2015)'
    ],
    certifications: [
      'Board Certified in Obstetrics & Gynecology - Moroccan Society of Gynecology',
      'Reproductive Endocrinology Certification - European Society of Human Reproduction',
      'Laparoscopic Surgery Certification - Society of Laparoendoscopic Surgeons'
    ],
    hospitalAffiliations: ['CHU Ibn Sina', 'Clinique Internationale', 'Centre de Maternité Rabat'],
    biography: 'Dr. Khadija Mansouri is a highly skilled obstetrician-gynecologist with expertise in reproductive health and minimally invasive surgery. She has 14 years of experience helping women through all stages of life, from adolescence through menopause. Dr. Mansouri completed advanced training in Paris and specializes in fertility treatments and high-risk pregnancies. She is known for her compassionate approach and excellent surgical outcomes.',
    workingHours: {
      Monday: { start: '09:00', end: '17:00', available: true },
      Tuesday: { start: '09:00', end: '17:00', available: true },
      Wednesday: { start: '09:00', end: '17:00', available: true },
      Thursday: { start: '09:00', end: '17:00', available: true },
      Friday: { start: '09:00', end: '15:00', available: true },
      Saturday: { start: '09:00', end: '13:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Prenatal Care',
      'Delivery Services',
      'Fertility Treatment',
      'Contraception Counseling',
      'Menopause Management',
      'Gynecologic Surgery',
      'Cancer Screening',
      'High-Risk Pregnancy Care'
    ],
    conditions: [
      'Pregnancy',
      'Infertility',
      'Menstrual Disorders',
      'Endometriosis',
      'PCOS',
      'Menopause',
      'Cervical Cancer',
      'Ovarian Cysts'
    ]
  },
  {
    id: '7',
    name: 'Dr. Samira El Fassi',
    specialty: 'Psychiatry',
    subspecialties: ['Child & Adolescent Psychiatry', 'Depression & Anxiety', 'Addiction Psychiatry'],
    image: 'https://images.pexels.com/photos/5215025/pexels-photo-5215025.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 89,
    experience: 16,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'Private'],
    location: {
      city: 'Casablanca',
      address: 'Boulevard Anfa, Ain Diab, Casablanca 20000',
      distance: 4.2,
      coordinates: { lat: 33.5951, lng: -7.6324 }
    },
    availability: {
      nextAvailable: '2025-01-19T14:00:00Z',
      acceptingNew: true,
      responseTime: 1
    },
    fees: {
      consultation: 500,
      followUp: 400,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Mental Health Expert', 'Compassionate Care', 'Child Specialist'],
    education: [
      'MD - Faculty of Medicine, University of Casablanca (2007)',
      'Psychiatry Residency - CHU Ibn Rochd, Casablanca (2012)',
      'Child Psychiatry Fellowship - Hôpital Sainte-Anne, Paris (2014)',
      'Addiction Psychiatry Training - University of Montreal (2015)'
    ],
    certifications: [
      'Board Certified in Psychiatry - Moroccan Society of Psychiatry',
      'Child & Adolescent Psychiatry - European Society of Child Psychiatry',
      'Addiction Medicine Certification - International Society of Addiction Medicine'
    ],
    hospitalAffiliations: ['CHU Ibn Rochd', 'Centre Psychiatrique Casa', 'Clinique Al Shifa'],
    biography: 'Dr. Samira El Fassi is a distinguished psychiatrist with 16 years of experience specializing in child and adolescent mental health, depression, anxiety, and addiction treatment. She completed advanced training in Paris and Montreal, bringing international expertise to Morocco. Dr. El Fassi is known for her gentle, non-judgmental approach and her ability to help patients of all ages overcome mental health challenges. She is particularly skilled in treating complex cases involving trauma and family dynamics.',
    workingHours: {
      Monday: { start: '09:00', end: '17:00', available: true },
      Tuesday: { start: '09:00', end: '17:00', available: true },
      Wednesday: { start: '09:00', end: '17:00', available: true },
      Thursday: { start: '09:00', end: '17:00', available: true },
      Friday: { start: '09:00', end: '15:00', available: true },
      Saturday: { start: '09:00', end: '13:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Individual Therapy',
      'Family Therapy',
      'Child & Adolescent Counseling',
      'Depression Treatment',
      'Anxiety Management',
      'Addiction Recovery',
      'Trauma Therapy',
      'Medication Management',
      'Crisis Intervention',
      'Stress Management'
    ],
    conditions: [
      'Depression',
      'Anxiety Disorders',
      'ADHD',
      'Autism Spectrum Disorder',
      'Bipolar Disorder',
      'Post-Traumatic Stress Disorder',
      'Eating Disorders',
      'Substance Abuse',
      'Obsessive-Compulsive Disorder',
      'Schizophrenia'
    ]
  },
  {
    id: '8',
    name: 'Dr. Karim Benjelloun',
    specialty: 'Psychiatry',
    subspecialties: ['Adult Psychiatry', 'Mood Disorders', 'Psychotherapy'],
    image: 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    reviewCount: 112,
    experience: 12,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'RAMED', 'Private'],
    location: {
      city: 'Rabat',
      address: 'Avenue Mohammed V, Agdal, Rabat 10090',
      distance: 15.8,
      coordinates: { lat: 34.0209, lng: -6.8416 }
    },
    availability: {
      nextAvailable: '2025-01-20T10:30:00Z',
      acceptingNew: true,
      responseTime: 2
    },
    fees: {
      consultation: 450,
      followUp: 350,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Mood Disorder Specialist', 'Evidence-Based Care', 'Patient Advocate'],
    education: [
      'MD - Faculty of Medicine, Mohammed V University, Rabat (2011)',
      'Psychiatry Residency - CHU Ibn Sina, Rabat (2016)',
      'Mood Disorders Fellowship - McGill University, Montreal (2018)',
      'Cognitive Behavioral Therapy Certification - Beck Institute (2019)'
    ],
    certifications: [
      'Board Certified in Psychiatry - Moroccan Society of Psychiatry',
      'Cognitive Behavioral Therapy - Beck Institute',
      'Dialectical Behavior Therapy - Linehan Institute'
    ],
    hospitalAffiliations: ['CHU Ibn Sina', 'Centre Psychiatrique Rabat', 'Clinique Al Wassila'],
    biography: 'Dr. Karim Benjelloun is a compassionate psychiatrist specializing in adult mental health and mood disorders. With 12 years of experience, he combines medication management with evidence-based psychotherapy approaches. Dr. Benjelloun completed advanced training in Canada and is certified in Cognitive Behavioral Therapy and Dialectical Behavior Therapy. He is known for his collaborative approach to treatment, working closely with patients to develop personalized care plans that address both biological and psychological aspects of mental health.',
    workingHours: {
      Monday: { start: '08:30', end: '16:30', available: true },
      Tuesday: { start: '08:30', end: '16:30', available: true },
      Wednesday: { start: '08:30', end: '16:30', available: true },
      Thursday: { start: '08:30', end: '16:30', available: true },
      Friday: { start: '08:30', end: '14:00', available: true },
      Saturday: { start: '09:00', end: '12:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Individual Psychotherapy',
      'Group Therapy',
      'Mood Disorder Treatment',
      'Anxiety Management',
      'Medication Management',
      'Crisis Intervention',
      'Stress Management',
      'Work-Life Balance Counseling',
      'Grief Counseling',
      'Relationship Issues'
    ],
    conditions: [
      'Major Depressive Disorder',
      'Bipolar Disorder',
      'Generalized Anxiety Disorder',
      'Panic Disorder',
      'Social Anxiety',
      'Insomnia',
      'Grief & Loss',
      'Work-Related Stress',
      'Relationship Problems',
      'Adjustment Disorders'
    ]
  },
  {
    id: '9',
    name: 'Dr. Amina Tazi',
    specialty: 'Sexology',
    subspecialties: ['Couples Therapy', 'Sexual Dysfunction', 'Gender Identity'],
    image: 'https://images.pexels.com/photos/5215026/pexels-photo-5215026.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviewCount: 67,
    experience: 8,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['Private'],
    location: {
      city: 'Casablanca',
      address: 'Rue du Prince Moulay Abdellah, Maarif, Casablanca 20100',
      distance: 2.8,
      coordinates: { lat: 33.5892, lng: -7.6036 }
    },
    availability: {
      nextAvailable: '2025-01-21T15:00:00Z',
      acceptingNew: true,
      responseTime: 1
    },
    fees: {
      consultation: 600,
      followUp: 500,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Sexual Health Expert', 'Confidential Care', 'Couples Specialist'],
    education: [
      'MD - Faculty of Medicine, University of Casablanca (2015)',
      'Psychiatry Residency - CHU Ibn Rochd, Casablanca (2019)',
      'Sexology Fellowship - Institut de Sexologie de Paris (2020)',
      'Couples Therapy Training - Gottman Institute (2021)'
    ],
    certifications: [
      'Board Certified in Psychiatry - Moroccan Society of Psychiatry',
      'Sexology Certification - International Society of Sexual Medicine',
      'Couples Therapy - Gottman Institute',
      'Gender Identity Specialist - World Professional Association for Transgender Health'
    ],
    hospitalAffiliations: ['CHU Ibn Rochd', 'Centre de Sexologie Casa', 'Clinique Privée Al Wassila'],
    biography: 'Dr. Amina Tazi is a pioneering sexologist in Morocco, specializing in sexual health, couples therapy, and gender identity issues. With 8 years of experience, she provides a safe, non-judgmental environment for patients to discuss sensitive topics. Dr. Tazi completed specialized training in Paris and is certified in couples therapy by the Gottman Institute. She is known for her compassionate approach and her ability to help individuals and couples improve their intimate relationships and overall well-being.',
    workingHours: {
      Monday: { start: '10:00', end: '18:00', available: true },
      Tuesday: { start: '10:00', end: '18:00', available: true },
      Wednesday: { start: '10:00', end: '18:00', available: true },
      Thursday: { start: '10:00', end: '18:00', available: true },
      Friday: { start: '10:00', end: '16:00', available: true },
      Saturday: { start: '10:00', end: '14:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Individual Sex Therapy',
      'Couples Counseling',
      'Sexual Dysfunction Treatment',
      'Gender Identity Support',
      'Relationship Issues',
      'Intimacy Problems',
      'Sexual Education',
      'Trauma-Informed Care',
      'LGBTQ+ Support',
      'Premarital Counseling'
    ],
    conditions: [
      'Erectile Dysfunction',
      'Premature Ejaculation',
      'Low Libido',
      'Painful Intercourse',
      'Orgasm Difficulties',
      'Relationship Conflicts',
      'Gender Dysphoria',
      'Sexual Trauma',
      'Communication Issues',
      'Intimacy Problems'
    ]
  },
  {
    id: '10',
    name: 'Dr. Leila Benali',
    specialty: 'Obstetrics',
    subspecialties: ['High-Risk Pregnancy', 'Maternal-Fetal Medicine', 'Ultrasound'],
    image: 'https://images.pexels.com/photos/5215027/pexels-photo-5215027.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 156,
    experience: 18,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'RAMED', 'Private'],
    location: {
      city: 'Fes',
      address: 'Boulevard Mohammed V, Ville Nouvelle, Fes 30000',
      distance: 188.5,
      coordinates: { lat: 34.0181, lng: -5.0078 }
    },
    availability: {
      nextAvailable: '2025-01-22T09:00:00Z',
      acceptingNew: true,
      responseTime: 1
    },
    fees: {
      consultation: 420,
      followUp: 320,
      currency: 'MAD'
    },
    verified: true,
    badges: ['High-Risk Pregnancy Expert', 'Maternal Care Specialist', 'Ultrasound Expert'],
    education: [
      'MD - Faculty of Medicine, Sidi Mohammed Ben Abdellah University, Fes (2005)',
      'Obstetrics & Gynecology Residency - CHU Hassan II, Fes (2010)',
      'Maternal-Fetal Medicine Fellowship - Hôpital Necker, Paris (2012)',
      'Advanced Ultrasound Training - Fetal Medicine Foundation, London (2013)'
    ],
    certifications: [
      'Board Certified in Obstetrics & Gynecology - Moroccan Society of Gynecology',
      'Maternal-Fetal Medicine - International Society of Ultrasound in Obstetrics',
      'Advanced Fetal Ultrasound - Fetal Medicine Foundation',
      'High-Risk Pregnancy Management - Society for Maternal-Fetal Medicine'
    ],
    hospitalAffiliations: ['CHU Hassan II', 'Centre de Maternité Fes', 'Clinique Al Kawtar'],
    biography: 'Dr. Leila Benali is a highly experienced obstetrician specializing in high-risk pregnancies and maternal-fetal medicine. With 18 years of experience, she has helped thousands of women through complex pregnancies and deliveries. Dr. Benali completed advanced training in Paris and London, bringing cutting-edge techniques to Morocco. She is particularly skilled in managing high-risk pregnancies, performing detailed ultrasounds, and providing comprehensive prenatal care. Her gentle approach and expertise have made her one of the most trusted obstetricians in the region.',
    workingHours: {
      Monday: { start: '08:00', end: '16:00', available: true },
      Tuesday: { start: '08:00', end: '16:00', available: true },
      Wednesday: { start: '08:00', end: '16:00', available: true },
      Thursday: { start: '08:00', end: '16:00', available: true },
      Friday: { start: '08:00', end: '14:00', available: true },
      Saturday: { start: '08:00', end: '12:00', available: true },
      Sunday: { start: '09:00', end: '13:00', available: true }
    },
    services: [
      'Prenatal Care',
      'High-Risk Pregnancy Management',
      'Detailed Ultrasound Scans',
      'Delivery Services',
      'Postpartum Care',
      'Fetal Monitoring',
      'Genetic Counseling',
      'Pregnancy Complications',
      'Multiple Pregnancy Care',
      'Emergency Obstetric Care'
    ],
    conditions: [
      'High-Risk Pregnancy',
      'Gestational Diabetes',
      'Preeclampsia',
      'Multiple Pregnancy',
      'Fetal Growth Restriction',
      'Placenta Previa',
      'Preterm Labor',
      'Pregnancy Loss',
      'Fetal Anomalies',
      'Maternal Health Conditions'
    ]
  },
  {
    id: '11',
    name: 'Dr. Nadia El Khoury',
    specialty: 'Gynecology',
    subspecialties: ['Reproductive Medicine', 'Fertility Treatment', 'Endoscopic Surgery'],
    image: 'https://images.pexels.com/photos/5215028/pexels-photo-5215028.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 134,
    experience: 15,
    languages: ['Arabic', 'French', 'English'],
    insurance: ['CNSS', 'Private'],
    location: {
      city: 'Marrakech',
      address: 'Avenue Mohammed VI, Gueliz, Marrakech 40000',
      distance: 244.3,
      coordinates: { lat: 31.6295, lng: -7.9811 }
    },
    availability: {
      nextAvailable: '2025-01-23T11:30:00Z',
      acceptingNew: true,
      responseTime: 2
    },
    fees: {
      consultation: 400,
      followUp: 300,
      currency: 'MAD'
    },
    verified: true,
    badges: ['Fertility Expert', 'Minimally Invasive Surgery', 'Reproductive Health'],
    education: [
      'MD - Faculty of Medicine, Cadi Ayyad University, Marrakech (2008)',
      'Obstetrics & Gynecology Residency - CHU Mohammed VI, Marrakech (2013)',
      'Reproductive Medicine Fellowship - Université Paris Diderot (2015)',
      'Endoscopic Surgery Training - European Society of Gynaecological Endoscopy (2016)'
    ],
    certifications: [
      'Board Certified in Obstetrics & Gynecology - Moroccan Society of Gynecology',
      'Reproductive Medicine - European Society of Human Reproduction',
      'Endoscopic Surgery - European Society of Gynaecological Endoscopy',
      'Fertility Treatment - International Federation of Fertility Societies'
    ],
    hospitalAffiliations: ['CHU Mohammed VI', 'Centre de Fertilité Marrakech', 'Clinique Al Wassila'],
    biography: 'Dr. Nadia El Khoury is a leading gynecologist specializing in reproductive medicine and fertility treatment. With 15 years of experience, she has helped hundreds of couples achieve their dream of parenthood. Dr. El Khoury completed specialized training in Paris and is an expert in minimally invasive gynecological surgery. She is known for her comprehensive approach to fertility treatment, combining medical expertise with emotional support. Her success rates in fertility treatments are among the highest in the region.',
    workingHours: {
      Monday: { start: '09:00', end: '17:00', available: true },
      Tuesday: { start: '09:00', end: '17:00', available: true },
      Wednesday: { start: '09:00', end: '17:00', available: true },
      Thursday: { start: '09:00', end: '17:00', available: true },
      Friday: { start: '09:00', end: '15:00', available: true },
      Saturday: { start: '09:00', end: '13:00', available: true },
      Sunday: { start: '', end: '', available: false }
    },
    services: [
      'Fertility Evaluation',
      'In Vitro Fertilization (IVF)',
      'Intrauterine Insemination (IUI)',
      'Ovulation Induction',
      'Endoscopic Surgery',
      'Hysteroscopy',
      'Laparoscopy',
      'Polycystic Ovary Syndrome Treatment',
      'Endometriosis Management',
      'Menstrual Disorder Treatment'
    ],
    conditions: [
      'Infertility',
      'Polycystic Ovary Syndrome',
      'Endometriosis',
      'Uterine Fibroids',
      'Menstrual Disorders',
      'Ovarian Cysts',
      'Uterine Polyps',
      'Adhesions',
      'Hormonal Imbalances',
      'Recurrent Miscarriage'
    ]
  }
];

export const mockReviews: { [doctorId: string]: Review[] } = {
  '1': [
    {
      id: 'r1',
      patientName: 'Fatima M.',
      rating: 5,
      comment: 'Dr. Bennani saved my life! I came to him with severe chest pain and he immediately diagnosed a heart attack. His quick action and expertise during the emergency angioplasty procedure were exceptional. The follow-up care has been outstanding, and I feel completely confident in his treatment plan. Highly recommend!',
      date: '2025-06-20',
      verified: true,
      helpful: 23,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r2',
      patientName: 'Mohammed K.',
      rating: 5,
      comment: 'Excellent cardiologist! Dr. Bennani explained my condition in detail and took time to answer all my questions. The clinic is modern and well-equipped. I had a cardiac catheterization procedure and everything went smoothly. His team is also very professional.',
      date: '2025-06-23',
      verified: true,
      helpful: 18,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r3',
      patientName: 'Aicha L.',
      rating: 4,
      comment: 'Very knowledgeable doctor with great experience. The appointment was on time and Dr. Bennani was thorough in his examination. My only concern was the cost, but the quality of care justifies it. Would definitely return for follow-up visits.',
      date: '2025-06-25',
      verified: true,
      helpful: 12,
      aspects: { professionalism: 5, waitTime: 5, communication: 4, satisfaction: 4 }
    },
    {
      id: 'r4',
      patientName: 'Hassan B.',
      rating: 5,
      comment: 'Dr. Bennani performed my father\'s angioplasty. The procedure was successful and the recovery was faster than expected. He explained everything clearly to our family and was available for questions. Truly a skilled and caring physician.',
      date: '2025-06-27',
      verified: true,
      helpful: 15,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    }
  ],
  '2': [
    {
      id: 'r5',
      patientName: 'Salma A.',
      rating: 5,
      comment: 'Dr. Alaoui is amazing! I struggled with acne for years and she completely transformed my skin. Her treatment plan was comprehensive and she explained each step. The results are incredible and my confidence is back. She truly cares about her patients.',
      date: '2025-01-09',
      verified: true,
      helpful: 28,
      aspects: { professionalism: 5, waitTime: 5, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r6',
      patientName: 'Youssef T.',
      rating: 5,
      comment: 'Professional and knowledgeable dermatologist. I had a suspicious mole that needed removal and Dr. Alaoui handled it perfectly. The procedure was painless and healed beautifully. Her clinic is very clean and modern.',
      date: '2025-01-07',
      verified: true,
      helpful: 16,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r7',
      patientName: 'Nadia R.',
      rating: 4,
      comment: 'Great experience overall. Dr. Alaoui is very gentle and explains everything clearly. I had Botox treatment and the results are natural-looking. The only downside was the waiting time, but it was worth it.',
      date: '2025-01-04',
      verified: true,
      helpful: 11,
      aspects: { professionalism: 5, waitTime: 3, communication: 5, satisfaction: 4 }
    }
  ],
  '3': [
    {
      id: 'r8',
      patientName: 'Ahmed S.',
      rating: 5,
      comment: 'Dr. Idrissi has been our family doctor for 5 years. He\'s incredibly thorough and always takes time to listen. His diabetes management program helped me control my blood sugar perfectly. Very affordable and accessible.',
      date: '2025-01-11',
      verified: true,
      helpful: 22,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r9',
      patientName: 'Latifa M.',
      rating: 4,
      comment: 'Good doctor who speaks multiple languages which is helpful. He diagnosed my hypertension early and the treatment is working well. The clinic can get busy but Dr. Idrissi never rushes the consultation.',
      date: '2025-01-06',
      verified: true,
      helpful: 14,
      aspects: { professionalism: 4, waitTime: 3, communication: 5, satisfaction: 4 }
    },
    {
      id: 'r10',
      patientName: 'Omar Z.',
      rating: 5,
      comment: 'Excellent family doctor! Dr. Idrissi takes care of my entire family. He\'s very patient with children and elderly patients. His preventive care approach has kept us all healthy. Highly recommended for families.',
      date: '2025-01-02',
      verified: true,
      helpful: 19,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    }
  ],
  '4': [
    {
      id: 'r11',
      patientName: 'Maryam K.',
      rating: 5,
      comment: 'Dr. Benali is wonderful with children! My daughter was scared but Dr. Benali made her feel comfortable immediately. She\'s very gentle and explains everything to both parent and child. The best pediatrician in Fes!',
      date: '2025-06-20',
      verified: true,
      helpful: 25,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r12',
      patientName: 'Rachid B.',
      rating: 4,
      comment: 'Very knowledgeable pediatrician. Dr. Benali caught my son\'s heart murmur early and referred us to the right specialist. She\'s thorough in her examinations and always available for urgent questions.',
      date: '2025-06-23',
      verified: true,
      helpful: 17,
      aspects: { professionalism: 5, waitTime: 3, communication: 4, satisfaction: 4 }
    },
    {
      id: 'r13',
      patientName: 'Zineb A.',
      rating: 5,
      comment: 'Dr. Benali delivered my baby and provided excellent newborn care. She\'s very experienced and her gentle approach with newborns is remarkable. I trust her completely with my children\'s health.',
      date: '2025-06-25',
      verified: true,
      helpful: 21,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    }
  ],
  '5': [
    {
      id: 'r14',
      patientName: 'Karim L.',
      rating: 5,
      comment: 'Dr. Tazi performed my knee surgery after a football injury. The arthroscopic procedure was minimally invasive and recovery was faster than expected. He\'s the best sports medicine doctor in Morocco!',
      date: '2025-01-09',
      verified: true,
      helpful: 20,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r15',
      patientName: 'Samira H.',
      rating: 4,
      comment: 'Excellent orthopedic surgeon. Dr. Tazi replaced my mother\'s hip joint and she\'s walking pain-free now. The surgery was successful and the follow-up care is excellent. Highly skilled surgeon.',
      date: '2025-01-07',
      verified: true,
      helpful: 16,
      aspects: { professionalism: 5, waitTime: 3, communication: 4, satisfaction: 4 }
    }
  ],
  '6': [
    {
      id: 'r16',
      patientName: 'Amina T.',
      rating: 5,
      comment: 'Dr. Mansouri helped me through a difficult pregnancy. Her expertise and caring nature made all the difference. She was available 24/7 and delivered my healthy baby safely. Forever grateful!',
      date: '2025-01-11',
      verified: true,
      helpful: 24,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r17',
      patientName: 'Houda M.',
      rating: 5,
      comment: 'Outstanding gynecologist! Dr. Mansouri helped me with fertility issues and I\'m now pregnant with my first child. Her treatment approach is comprehensive and she\'s very supportive throughout the process.',
      date: '2025-06-23',
      verified: true,
      helpful: 22,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    }
  ],
  '7': [
    {
      id: 'r18',
      patientName: 'Samira E.',
      rating: 5,
      comment: 'Dr. El Fassi is a wonderful psychiatrist! She helped me through a difficult time in my life and provided excellent care. Her approach was compassionate and effective. Highly recommended!',
      date: '2025-06-20',
      verified: true,
      helpful: 28,
      aspects: { professionalism: 5, waitTime: 5, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r19',
      patientName: 'Youssef K.',
      rating: 4,
      comment: 'Dr. El Fassi was very knowledgeable and provided helpful advice. The consultation was on time and the follow-up care was excellent. Highly recommended for mental health care.',
      date: '2025-06-23',
      verified: true,
      helpful: 16,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 4 }
    },
    {
      id: 'r20',
      patientName: 'Nadia A.',
      rating: 5,
      comment: 'Dr. El Fassi was very understanding and supportive during a challenging period in my life. The therapy sessions were effective and I feel much better now. Highly recommended.',
      date: '2025-06-25',
      verified: true,
      helpful: 11,
      aspects: { professionalism: 5, waitTime: 3, communication: 5, satisfaction: 5 }
    }
  ],
  '8': [
    {
      id: 'r21',
      patientName: 'Karim B.',
      rating: 5,
      comment: 'Dr. Benjelloun is a compassionate psychiatrist with a wealth of experience. He helped me manage my mood disorders and provided excellent care. Highly recommended for mental health treatment.',
      date: '2025-01-11',
      verified: true,
      helpful: 22,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r22',
      patientName: 'Latifa M.',
      rating: 4,
      comment: 'Dr. Benjelloun was very thorough and took time to understand my situation. The medication management was effective and the follow-up care was good. Highly recommended for mental health treatment.',
      date: '2025-01-06',
      verified: true,
      helpful: 14,
      aspects: { professionalism: 4, waitTime: 3, communication: 5, satisfaction: 4 }
    },
    {
      id: 'r23',
      patientName: 'Omar Z.',
      rating: 5,
      comment: 'Dr. Benjelloun took excellent care of my mental health and provided effective treatment. The therapy sessions were helpful and the follow-up care was good. Highly recommended for mental health treatment.',
      date: '2025-01-02',
      verified: true,
      helpful: 19,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    }
  ],
  '9': [
    {
      id: 'r24',
      patientName: 'Amina T.',
      rating: 5,
      comment: 'Dr. Tazi is a knowledgeable and compassionate sexologist. She provided excellent care and helped me with my sexual dysfunction. Highly recommended for sexual health treatment.',
      date: '2025-06-20',
      verified: true,
      helpful: 25,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r25',
      patientName: 'Rachid B.',
      rating: 4,
      comment: 'Dr. Tazi was very understanding and provided helpful advice. The consultation was on time and the follow-up care was good. Highly recommended for sexual health treatment.',
      date: '2025-06-23',
      verified: true,
      helpful: 17,
      aspects: { professionalism: 4, waitTime: 3, communication: 5, satisfaction: 4 }
    },
    {
      id: 'r26',
      patientName: 'Zineb A.',
      rating: 5,
      comment: 'Dr. Tazi provided excellent care and helped me with my sexual dysfunction. The therapy sessions were effective and the follow-up care was good. Highly recommended for sexual health treatment.',
      date: '2025-06-25',
      verified: true,
      helpful: 21,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    }
  ],
  '10': [
    {
      id: 'r27',
      patientName: 'Leila B.',
      rating: 5,
      comment: 'Dr. Benali is a highly experienced obstetrician. She provided excellent care and helped me through a high-risk pregnancy. Highly recommended for obstetric care.',
      date: '2025-01-11',
      verified: true,
      helpful: 24,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r28',
      patientName: 'Ahmed M.',
      rating: 4,
      comment: 'Dr. Benali was very thorough and took time to understand my situation. The care and support during my high-risk pregnancy were excellent. Highly recommended for obstetric care.',
      date: '2025-06-23',
      verified: true,
      helpful: 22,
      aspects: { professionalism: 4, waitTime: 3, communication: 5, satisfaction: 4 }
    }
  ],
  '11': [
    {
      id: 'r29',
      patientName: 'Nadia E.',
      rating: 5,
      comment: 'Dr. El Khoury is a leading gynecologist with extensive experience. She provided excellent care and helped me with my fertility issues. Highly recommended for gynecological care.',
      date: '2025-06-20',
      verified: true,
      helpful: 25,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    },
    {
      id: 'r30',
      patientName: 'Ahmed M.',
      rating: 4,
      comment: 'Dr. El Khoury was very thorough and took time to understand my situation. The care and support during my fertility treatment were excellent. Highly recommended for gynecological care.',
      date: '2025-06-23',
      verified: true,
      helpful: 17,
      aspects: { professionalism: 4, waitTime: 3, communication: 5, satisfaction: 4 }
    },
    {
      id: 'r31',
      patientName: 'Zineb A.',
      rating: 5,
      comment: 'Dr. El Khoury provided excellent care and helped me with my fertility issues. The treatment approach was comprehensive and the follow-up care was good. Highly recommended for gynecological care.',
      date: '2025-06-25',
      verified: true,
      helpful: 21,
      aspects: { professionalism: 5, waitTime: 4, communication: 5, satisfaction: 5 }
    }
  ]
};

// Generate realistic time slots for the next 14 days
export const generateTimeSlots = (doctorId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const doctor = mockDoctors.find(d => d.id === doctorId);
  if (!doctor) return slots;

  const startDate = new Date();
  
  for (let day = 0; day < 14; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const workingHours = doctor.workingHours[dayName];
    
    if (!workingHours.available) continue;
    
    const [startHour, startMinute] = workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = workingHours.end.split(':').map(Number);
    
    let currentTime = new Date(currentDate);
    currentTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date(currentDate);
    endTime.setHours(endHour, endMinute, 0, 0);
    
    while (currentTime < endTime) {
      // Skip lunch break (12:00-13:00)
      if (currentTime.getHours() === 12) {
        currentTime.setHours(13, 0, 0, 0);
        continue;
      }
      
      // Randomly make some slots unavailable (booked)
      const isAvailable = Math.random() > 0.3; // 70% availability
      
      // Make past slots unavailable
      const now = new Date();
      const slotAvailable = currentTime > now && isAvailable;
      
      slots.push({
        id: `${doctorId}_${currentTime.toISOString()}`,
        date: currentDate.toISOString().split('T')[0],
        time: currentTime.toTimeString().slice(0, 5),
        available: slotAvailable,
        type: 'consultation',
        duration: 30
      });
      
      // Add 30-minute intervals
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
  }
  
  return slots;
};