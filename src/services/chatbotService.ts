import { mockDoctors, Doctor } from '../data/mockDoctors';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: string;
  entities?: string[];
  confidence?: number;
}

export interface ChatContext {
  userId?: string;
  sessionId: string;
  language: 'en' | 'fr' | 'ar';
  location?: {
    latitude: number;
    longitude: number;
  };
  userProfile?: {
    insurance: string[];
    preferences: Record<string, unknown>;
  };
}

interface IntentAnalysis {
  intent: string;
  confidence: number;
  entities: string[];
}

interface IntentData {
  patterns: string[];
  responses: Record<'en' | 'fr' | 'ar', string[]>;
  action: string;
  entities?: string[];
  priority?: 'high' | 'medium' | 'low';
}

interface ResponseData {
  text: string;
  action?: string;
}

// Add new interfaces for enhanced features
interface SymptomGuidance {
  symptoms: string[];
  recommendedSpecialties: string[];
  urgency: 'emergency' | 'urgent' | 'routine';
  preparationTips: string[];
  redFlags: string[];
}

interface ConsultationTip {
  specialty: string;
  preparation: string[];
  whatToBring: string[];
  duration: string;
  followUp: string;
}

interface FAQItem {
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

class AdvancedChatbotService {
  private intents: Map<string, IntentData> = new Map();
  private context: ChatContext | null = null;
  private conversationHistory: ChatMessage[] = [];
  private siteSearchIndex: any[] = [];
  private openaiApiKey: string | null = null;

  // Add new data structures for enhanced features
  private symptomGuidance: Map<string, SymptomGuidance> = new Map();
  private consultationTips: Map<string, ConsultationTip> = new Map();
  private faqDatabase: FAQItem[] = [];
  private emergencyKeywords: string[] = [];

  constructor() {
    this.initializeIntents();
    this.initializeSiteSearchIndex();
    this.initializeSymptomGuidance();
    this.initializeConsultationTips();
    this.initializeFAQDatabase();
    this.initializeEmergencyKeywords();
    // Try to get API key from environment variables
    this.openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
  }

  private initializeIntents() {
    // Define conversation intents and responses
    this.intents.set('greeting', {
      patterns: [
        'hello',
        'hi',
        'hey',
        'good morning',
        'good afternoon',
        'bonjour',
        'salut',
        'marhaba',
      ],
      responses: {
        en: [
          "Hello! I'm your healthcare assistant. How can I help you today?",
          'Hi there! I can help you find doctors, book appointments, or answer health questions.',
          'Welcome! What healthcare assistance do you need?',
        ],
        fr: [
          'Bonjour! Je suis votre assistant santé. Comment puis-je vous aider?',
          'Salut! Je peux vous aider à trouver des médecins ou répondre à vos questions.',
          'Bienvenue! De quelle assistance médicale avez-vous besoin?',
        ],
        ar: [
          'مرحبا! أنا مساعدك الصحي. كيف يمكنني مساعدتك اليوم؟',
          'أهلا بك! يمكنني مساعدتك في العثور على الأطباء أو الإجابة على الأسئلة الصحية.',
          'مرحبا! ما نوع المساعدة الطبية التي تحتاجها؟',
        ],
      },
      action: 'greeting',
    });

    this.intents.set('find_doctor', {
      patterns: [
        'find doctor',
        'search doctor',
        'need doctor',
        'doctor near me',
        'find a doctor',
        'find doctors',
        'search for doctor',
        'look for doctor',
        'find specialist',
        'search specialist',
        'need specialist',
        'specialist near me',
        'find physician',
        'search physician',
        'need physician',
        'physician near me',
        'médecin',
        'docteur',
        'chercher médecin',
        'trouver médecin',
        'طبيب',
        'البحث عن طبيب',
        'العثور على طبيب',
        'أحتاج طبيب',
      ],
      responses: {
        en: [
          "I'll help you find doctors in your area. Here are some available healthcare providers:",
          'Let me show you the doctors and specialists available near you:',
          'I can help you find the right doctor. Here are some options:',
        ],
        fr: [
          'Je vais vous aider à trouver des médecins dans votre région. Voici quelques prestataires de soins disponibles:',
          'Laissez-moi vous montrer les médecins et spécialistes disponibles près de chez vous:',
          'Je peux vous aider à trouver le bon médecin. Voici quelques options:',
        ],
        ar: [
          'سأساعدك في العثور على الأطباء في منطقتك. إليك بعض مقدمي الرعاية الصحية المتاحين:',
          'دعني أريك الأطباء والمتخصصين المتاحين بالقرب منك:',
          'يمكنني مساعدتك في العثور على الطبيب المناسب. إليك بعض الخيارات:',
        ],
      },
      action: 'search_doctors',
      entities: ['specialty', 'location', 'insurance'],
    });

    this.intents.set('book_appointment', {
      patterns: [
        'book appointment',
        'schedule appointment',
        'make appointment',
        'book doctor',
        'schedule visit',
        'take appointment',
        'reserve appointment',
        'book consultation',
        'schedule consultation',
        'prendre rendez-vous',
        'réserver rendez-vous',
        'حجز موعد',
        'تحديد موعد',
      ],
      responses: {
        en: [
          "I'll help you book an appointment. First, let me show you available doctors, then you can select one to schedule your visit.",
          "Let's get you scheduled! I'll show you the doctors available for appointments and help you choose the right one.",
          'I can help you book an appointment. Let me display the available healthcare providers for you to choose from.',
        ],
        fr: [
          'Je vais vous aider à prendre rendez-vous. D\'abord, laissez-moi vous montrer les médecins disponibles, puis vous pourrez en sélectionner un pour programmer votre visite.',
          'Programmons votre rendez-vous ! Je vais vous montrer les médecins disponibles pour les rendez-vous et vous aider à choisir le bon.',
          'Je peux vous aider à prendre rendez-vous. Laissez-moi afficher les prestataires de soins disponibles pour que vous puissiez choisir.',
        ],
        ar: [
          'سأساعدك في حجز موعد. أولاً، دعني أريك الأطباء المتاحين، ثم يمكنك اختيار واحد لجدولة زيارتك.',
          'دعنا نحجز موعدك! سأريك الأطباء المتاحين للمواعيد وأساعدك في اختيار الطبيب المناسب.',
          'يمكنني مساعدتك في حجز موعد. دعني أعرض مقدمي الرعاية الصحية المتاحين لكي تختار منهم.',
        ],
      },
      action: 'book_appointment',
      entities: ['specialty', 'location', 'insurance', 'symptoms'],
    });

    this.intents.set('show_reviews', {
      patterns: [
        'show reviews',
        'doctor reviews',
        'patient reviews',
        'ratings',
        'what do patients say',
        'patient feedback',
        'doctor ratings',
        'reviews and ratings',
        'avis patients',
        'évaluations',
        'commentaires',
        'تقييمات',
        'مراجعات',
        'آراء المرضى',
      ],
      responses: {
        en: [
          "I'll show you the latest patient reviews and ratings for our healthcare providers.",
          'Let me display the patient reviews and ratings to help you make an informed decision.',
          'Here are the reviews and ratings from verified patients to help you choose the right doctor.',
        ],
        fr: [
          'Je vais vous montrer les derniers avis et évaluations des patients pour nos prestataires de soins.',
          'Laissez-moi afficher les avis et évaluations des patients pour vous aider à prendre une décision éclairée.',
          'Voici les avis et évaluations des patients vérifiés pour vous aider à choisir le bon médecin.',
        ],
        ar: [
          'سأريك أحدث تقييمات ومراجعات المرضى لمقدمي الرعاية الصحية لدينا.',
          'دعني أعرض لك مراجعات وتقييمات المرضى لمساعدتك في اتخاذ قرار مدروس.',
          'إليك المراجعات والتقييمات من المرضى المعتمدين لمساعدتك في اختيار الطبيب المناسب.',
        ],
      },
      action: 'show_reviews',
      entities: ['doctor_id'],
    });

    this.intents.set('check_insurance', {
      patterns: [
        'check insurance',
        'insurance coverage',
        'insurance info',
        'accepted insurance',
        'insurance plans',
        'what insurance',
        'insurance accepted',
        'coverage info',
        'vérifier assurance',
        'couverture assurance',
        'plans assurance',
        'تأمين',
        'تغطية التأمين',
        'خطط التأمين',
      ],
      responses: {
        en: [
          "I'll help you check insurance coverage information. Here are the insurance plans we accept:",
          'Let me show you which insurance plans are accepted by our healthcare providers.',
          'I can help you understand the insurance coverage details. Here\'s what we accept:',
        ],
        fr: [
          "Je vais vous aider à vérifier les informations de couverture d'assurance. Voici les plans d'assurance que nous acceptons:",
          'Laissez-moi vous montrer quels plans d\'assurance sont acceptés par nos prestataires de soins.',
          'Je peux vous aider à comprendre les détails de la couverture d\'assurance. Voici ce que nous acceptons:',
        ],
        ar: [
          'سأساعدك في التحقق من معلومات تغطية التأمين. إليك خطط التأمين التي نقبلها:',
          'دعني أريك خطط التأمين المقبولة من قبل مقدمي الرعاية الصحية لدينا.',
          'يمكنني مساعدتك في فهم تفاصيل تغطية التأمين. إليك ما نقبله:',
        ],
      },
      action: 'check_insurance',
      entities: ['insurance_type'],
    });

    this.intents.set('emergency', {
      patterns: [
        'emergency',
        'urgent',
        'help',
        'pain',
        'accident',
        'urgence',
        'طوارئ',
        'مساعدة',
      ],
      responses: {
        en: [
          '🚨 For life-threatening emergencies, please call 15 immediately or go to the nearest emergency room.',
          'If this is a medical emergency, please call emergency services: 15 (Emergency) or 141 (SAMU).',
          'For urgent but non-life-threatening issues, I can help you find urgent care centers nearby.',
        ],
        fr: [
          '🚨 Pour les urgences vitales, appelez le 15 immédiatement ou rendez-vous aux urgences les plus proches.',
          "Si c'est une urgence médicale, appelez les services d'urgence: 15 (Urgences) ou 141 (SAMU).",
          'Pour les problèmes urgents mais non vitaux, je peux vous aider à trouver des centres de soins urgents.',
        ],
        ar: [
          '🚨 في حالات الطوارئ المهددة للحياة، يرجى الاتصال بالرقم 15 فوراً أو التوجه لأقرب قسم طوارئ.',
          'إذا كانت هذه حالة طوارئ طبية، يرجى الاتصال بخدمات الطوارئ: 15 (الطوارئ) أو 141 (سامو).',
          'للمشاكل العاجلة غير المهددة للحياة، يمكنني مساعدتك في العثور على مراكز الرعاية العاجلة القريبة.',
        ],
      },
      action: 'emergency_guidance',
      priority: 'high',
    });

    this.intents.set('directions', {
      patterns: [
        'directions',
        'how to get',
        'location',
        'address',
        'parking',
        'itinéraire',
        'اتجاهات',
      ],
      responses: {
        en: [
          'I can provide directions to any healthcare facility. Which location do you need directions to?',
          "Let me help you with directions. What's the name of the facility you're visiting?",
          'I can guide you to your destination and provide parking information. Where are you headed?',
        ],
        fr: [
          "Je peux fournir des directions vers n'importe quel établissement de santé. Vers quel endroit avez-vous besoin de directions?",
          "Laissez-moi vous aider avec les directions. Quel est le nom de l'établissement que vous visitez?",
          'Je peux vous guider vers votre destination et fournir des informations sur le stationnement. Où allez-vous?',
        ],
        ar: [
          'يمكنني تقديم الاتجاهات إلى أي مرفق صحي. إلى أي موقع تحتاج اتجاهات؟',
          'دعني أساعدك بالاتجاهات. ما اسم المرفق الذي تزوره؟',
          'يمكنني إرشادك إلى وجهتك وتقديم معلومات عن المواقف. إلى أين تتجه؟',
        ],
      },
      action: 'provide_directions',
      entities: ['facility_name', 'address'],
    });

    this.intents.set('insurance', {
      patterns: [
        'insurance',
        'cnss',
        'ramed',
        'coverage',
        'assurance',
        'تأمين',
      ],
      responses: {
        en: [
          'I can help you find healthcare providers that accept your insurance. What type of insurance do you have?',
          'Let me check which facilities accept your insurance plan. Do you have CNSS, RAMED, or private insurance?',
          "I'll help you understand your coverage options. What insurance plan are you using?",
        ],
        fr: [
          "Je peux vous aider à trouver des prestataires qui acceptent votre assurance. Quel type d'assurance avez-vous?",
          "Laissez-moi vérifier quels établissements acceptent votre plan d'assurance. Avez-vous CNSS, RAMED, ou une assurance privée?",
          "Je vais vous aider à comprendre vos options de couverture. Quel plan d'assurance utilisez-vous?",
        ],
        ar: [
          'يمكنني مساعدتك في العثور على مقدمي الرعاية الصحية الذين يقبلون تأمينك. ما نوع التأمين لديك؟',
          'دعني أتحقق من المرافق التي تقبل خطة التأمين الخاصة بك. هل لديك CNSS أو RAMED أو تأمين خاص؟',
          'سأساعدك في فهم خيارات التغطية الخاصة بك. ما خطة التأمين التي تستخدمها؟',
        ],
      },
      action: 'insurance_info',
      entities: ['insurance_type'],
    });

    // Add site search intent
    this.intents.set('site_search', {
      patterns: [
        'search',
        'find',
        'look for',
        'search for',
        'where is',
        'how do I find',
        'recherche',
        'بحث',
      ],
      responses: {
        en: [
          "I'll search the site for that information. Here's what I found:",
          "Let me look that up for you. Here are the search results:",
          "I found the following information about your query:",
        ],
        fr: [
          "Je vais rechercher cette information sur le site. Voici ce que j'ai trouvé :",
          "Laissez-moi chercher cela pour vous. Voici les résultats de recherche :",
          "J'ai trouvé les informations suivantes concernant votre requête :",
        ],
        ar: [
          "سأبحث في الموقع عن هذه المعلومات. إليك ما وجدت:",
          "دعني أبحث عن ذلك لك. إليك نتائج البحث:",
          "وجدت المعلومات التالية حول استفسارك:",
        ],
      },
      action: 'site_search',
      entities: ['search_term'],
    });

    // Add pharmacy-related intent
    this.intents.set('pharmacy', {
      patterns: [
        'find pharmacy',
        'pharmacy near me',
        'pharmacies',
        'medication',
        'prescription',
        'drug store',
        'pharmacie',
        'médicaments',
        'ordonnance',
        'صيدلية',
        'أدوية',
        'وصفة طبية',
      ],
      responses: {
        en: [
          "I'll help you find pharmacies near your location. Here are some available pharmacies:",
          'Let me show you the pharmacies and drug stores available in your area.',
          'I can help you locate pharmacies for your medication needs. Here are your options:',
        ],
        fr: [
          'Je vais vous aider à trouver des pharmacies près de votre emplacement. Voici quelques pharmacies disponibles:',
          'Laissez-moi vous montrer les pharmacies et drogueries disponibles dans votre région.',
          'Je peux vous aider à localiser des pharmacies pour vos besoins en médicaments. Voici vos options:',
        ],
        ar: [
          'سأساعدك في العثور على الصيدليات بالقرب من موقعك. إليك بعض الصيدليات المتاحة:',
          'دعني أريك الصيدليات ومتاجر الأدوية المتاحة في منطقتك.',
          'يمكنني مساعدتك في تحديد مواقع الصيدليات لاحتياجاتك من الأدوية. إليك خياراتك:',
        ],
      },
      action: 'find_pharmacy',
      entities: ['location', 'medication'],
    });

    // Add location-based intent
    this.intents.set('location_based', {
      patterns: [
        'near me',
        'nearby',
        'closest',
        'in my area',
        'proximity',
        'distance',
        'à proximité',
        'قريب مني'
      ],
      responses: {
        en: [
          "I'll find healthcare services near your location. What type of service are you looking for?",
          "Let me search for nearby options. What healthcare provider do you need?",
          "I can help you find the closest healthcare facilities. What are you looking for specifically?"
        ],
        fr: [
          "Je vais trouver des services de santé près de votre emplacement. Quel type de service recherchez-vous?",
          "Laissez-moi chercher des options à proximité. De quel prestataire de soins avez-vous besoin?",
          "Je peux vous aider à trouver les établissements de santé les plus proches. Que recherchez-vous spécifiquement?"
        ],
        ar: [
          "سأجد خدمات الرعاية الصحية بالقرب من موقعك. ما نوع الخدمة التي تبحث عنها؟",
          "دعني أبحث عن الخيارات القريبة. ما مقدم الرعاية الصحية الذي تحتاجه؟",
          "يمكنني مساعدتك في العثور على أقرب مرافق الرعاية الصحية. ما الذي تبحث عنه على وجه التحديد؟"
        ]
      },
      action: 'location_search',
      entities: ['service_type', 'specialty', 'facility_type']
    });

    // Add new intents for enhanced features
    this.intents.set('symptom_guidance', {
      patterns: [
        'i have anxiety',
        'i feel anxious',
        'i have depression',
        'i feel sad',
        'i have insomnia',
        'i can\'t sleep',
        'i have headache',
        'i have joint pain',
        'i have skin rash',
        'i have back pain',
        'i have stomach pain',
        'i have chest pain',
        'i have shortness of breath',
        'symptoms',
        'what doctor for',
        'which specialist',
        'recommend doctor for',
        'help with symptoms',
        'symptom check',
        'medical advice',
        'what should i do',
        'j\'ai de l\'anxiété',
        'je me sens anxieux',
        'j\'ai de la dépression',
        'je ne peux pas dormir',
        'j\'ai mal à la tête',
        'symptômes',
        'quel médecin pour',
        'أعاني من القلق',
        'أشعر بالاكتئاب',
        'لا أستطيع النوم',
        'أعاني من الصداع',
        'الأعراض',
        'أي طبيب ل',
      ],
      responses: {
        en: [
          "I'll help you find the right specialist for your symptoms. Let me provide some guidance and recommend appropriate doctors.",
          "Based on your symptoms, I can suggest the best type of doctor to see and help you prepare for your visit.",
          'I can guide you to the right specialist for your condition and provide preparation tips for your appointment.',
        ],
        fr: [
          'Je vais vous aider à trouver le bon spécialiste pour vos symptômes. Laissez-moi vous donner des conseils et recommander des médecins appropriés.',
          'Basé sur vos symptômes, je peux suggérer le meilleur type de médecin à consulter et vous aider à préparer votre visite.',
          'Je peux vous orienter vers le bon spécialiste pour votre condition et fournir des conseils de préparation pour votre rendez-vous.',
        ],
        ar: [
          'سأساعدك في العثور على الطبيب المختص المناسب لأعراضك. دعني أقدم لك إرشادات وأوصي بأطباء مناسبين.',
          'بناءً على أعراضك، يمكنني اقتراح أفضل نوع من الأطباء للزيارة ومساعدتك في التحضير لزيارتك.',
          'يمكنني توجيهك إلى الطبيب المختص المناسب لحالتك وتقديم نصائح للتحضير لموعدك.',
        ],
      },
      action: 'symptom_guidance',
      entities: ['symptoms', 'urgency', 'specialty'],
    });

    this.intents.set('rating_explanation', {
      patterns: [
        'how do ratings work',
        'what do ratings mean',
        'explain ratings',
        'star ratings',
        'doctor ratings',
        'review system',
        'how are doctors rated',
        'rating system',
        'patient reviews',
        'comment fonctionnent les évaluations',
        'que signifient les étoiles',
        'système d\'évaluation',
        'avis des patients',
        'كيف تعمل التقييمات',
        'ماذا تعني النجوم',
        'نظام التقييم',
        'تقييمات الأطباء',
      ],
      responses: {
        en: [
          "I'll explain how our doctor rating system works and what the different star levels mean.",
          "Let me break down our rating system and help you understand how to choose the best doctor based on reviews.",
          'I can explain the rating system and help you understand what makes a good doctor rating.',
        ],
        fr: [
          'Je vais expliquer comment fonctionne notre système d\'évaluation des médecins et ce que signifient les différents niveaux d\'étoiles.',
          'Laissez-moi décomposer notre système d\'évaluation et vous aider à comprendre comment choisir le meilleur médecin basé sur les avis.',
          'Je peux expliquer le système d\'évaluation et vous aider à comprendre ce qui fait une bonne évaluation de médecin.',
        ],
        ar: [
          'سأشرح لك كيف يعمل نظام تقييم الأطباء لدينا وماذا تعني مستويات النجوم المختلفة.',
          'دعني أوضح نظام التقييم وأساعدك في فهم كيفية اختيار أفضل طبيب بناءً على المراجعات.',
          'يمكنني شرح نظام التقييم ومساعدتك في فهم ما يجعل تقييم الطبيب جيداً.',
        ],
      },
      action: 'explain_ratings',
      entities: ['rating_system', 'reviews', 'stars'],
    });

    this.intents.set('booking_help', {
      patterns: [
        'how to book appointment',
        'first time booking',
        'new patient',
        'booking help',
        'how to schedule',
        'appointment guide',
        'booking process',
        'how to make appointment',
        'comment prendre rendez-vous',
        'nouveau patient',
        'aide pour la réservation',
        'processus de réservation',
        'كيف أحجز موعد',
        'مريض جديد',
        'مساعدة في الحجز',
        'عملية الحجز',
      ],
      responses: {
        en: [
          "I'll guide you through the booking process step by step, especially for new patients.",
          "Let me walk you through how to book your first appointment and what information you'll need.",
          'I can help you navigate the booking system and make your first appointment easy and stress-free.',
        ],
        fr: [
          'Je vais vous guider à travers le processus de réservation étape par étape, surtout pour les nouveaux patients.',
          'Laissez-moi vous expliquer comment prendre votre premier rendez-vous et quelles informations vous aurez besoin.',
          'Je peux vous aider à naviguer le système de réservation et rendre votre premier rendez-vous facile et sans stress.',
        ],
        ar: [
          'سأرشدك خلال عملية الحجز خطوة بخطوة، خاصة للمرضى الجدد.',
          'دعني أوضح لك كيفية حجز موعدك الأول وما هي المعلومات التي ستحتاجها.',
          'يمكنني مساعدتك في التنقل في نظام الحجز وجعل موعدك الأول سهلاً وخالياً من التوتر.',
        ],
      },
      action: 'booking_help',
      entities: ['new_patient', 'booking_process', 'information_needed'],
    });

    this.intents.set('faq_insurance', {
      patterns: [
        'insurance',
        'coverage',
        'cnss',
        'ramed',
        'private insurance',
        'what insurance',
        'insurance accepted',
        'assurance',
        'couverture',
        'quelle assurance',
        'التأمين',
        'التغطية',
        'أي تأمين',
      ],
      responses: {
        en: [
          "I'll help you understand our insurance coverage and what plans we accept.",
          "Let me explain our insurance policies and help you verify your coverage.",
          'I can answer your insurance questions and help you understand what\'s covered.',
        ],
        fr: [
          'Je vais vous aider à comprendre notre couverture d\'assurance et quels régimes nous acceptons.',
          'Laissez-moi expliquer nos politiques d\'assurance et vous aider à vérifier votre couverture.',
          'Je peux répondre à vos questions d\'assurance et vous aider à comprendre ce qui est couvert.',
        ],
        ar: [
          'سأساعدك في فهم تغطية التأمين لدينا وما هي الخطط التي نقبلها.',
          'دعني أوضح سياسات التأمين لدينا وأساعدك في التحقق من تغطيتك.',
          'يمكنني الإجابة على أسئلتك حول التأمين ومساعدتك في فهم ما يتم تغطيته.',
        ],
      },
      action: 'faq_insurance',
      entities: ['insurance_type', 'coverage', 'verification'],
    });

    this.intents.set('faq_pharmacy', {
      patterns: [
        'pharmacy hours',
        'pharmacy open',
        'pharmacy near me',
        'prescription',
        'medication',
        'pharmacie',
        'heures pharmacie',
        'ordonnance',
        'médicament',
        'صيدلية',
        'ساعات الصيدلية',
        'وصفة طبية',
        'دواء',
      ],
      responses: {
        en: [
          "I'll help you find pharmacy information including hours, locations, and prescription services.",
          "Let me provide you with pharmacy details and help you locate the nearest one.",
          'I can answer your pharmacy questions and help you with prescription and medication needs.',
        ],
        fr: [
          'Je vais vous aider à trouver des informations sur les pharmacies, y compris les heures, les emplacements et les services de prescription.',
          'Laissez-moi vous fournir des détails sur les pharmacies et vous aider à localiser la plus proche.',
          'Je peux répondre à vos questions sur les pharmacies et vous aider avec vos besoins de prescription et de médicaments.',
        ],
        ar: [
          'سأساعدك في العثور على معلومات الصيدلية بما في ذلك الساعات والمواقع وخدمات الوصفات الطبية.',
          'دعني أقدم لك تفاصيل الصيدلية وأساعدك في تحديد الأقرب إليك.',
          'يمكنني الإجابة على أسئلتك حول الصيدلية ومساعدتك في احتياجات الوصفات الطبية والأدوية.',
        ],
      },
      action: 'faq_pharmacy',
      entities: ['pharmacy_hours', 'location', 'prescription'],
    });

    this.intents.set('faq_emergency', {
      patterns: [
        'emergency',
        'emergency number',
        'emergency contact',
        'urgent care',
        'ambulance',
        'urgence',
        'numéro urgence',
        'contact urgence',
        'ambulance',
        'طوارئ',
        'رقم الطوارئ',
        'اتصال الطوارئ',
        'إسعاف',
      ],
      responses: {
        en: [
          "I'll provide you with emergency contact information and guidance on when to seek emergency care.",
          "Let me give you the emergency numbers and explain when you should go to the emergency room.",
          'I can help you with emergency information and guide you on when to call emergency services.',
        ],
        fr: [
          'Je vais vous fournir des informations de contact d\'urgence et des conseils sur quand chercher des soins d\'urgence.',
          'Laissez-moi vous donner les numéros d\'urgence et expliquer quand vous devriez aller aux urgences.',
          'Je peux vous aider avec les informations d\'urgence et vous guider sur quand appeler les services d\'urgence.',
        ],
        ar: [
          'سأقدم لك معلومات الاتصال في حالات الطوارئ وإرشادات حول متى تطلب الرعاية الطارئة.',
          'دعني أعطيك أرقام الطوارئ وأوضح لك متى يجب أن تذهب إلى غرفة الطوارئ.',
          'يمكنني مساعدتك في معلومات الطوارئ وتوجيهك حول متى تتصل بخدمات الطوارئ.',
        ],
      },
      action: 'faq_emergency',
      entities: ['emergency_number', 'urgent_care', 'when_to_call'],
    });
  }

  private initializeSiteSearchIndex() {
    // This would be populated with actual site content in production
    this.siteSearchIndex = [
      {
        path: '/doctors',
        title: 'Find Doctors',
        content: 'Search for doctors by specialty, location, and insurance.',
        type: 'page',
      },
      {
        path: '/hospitals',
        title: 'Top Hospitals',
        content: 'Discover the best hospitals in Morocco ranked by specialty and patient satisfaction.',
        type: 'page',
      },
      {
        path: '/pharmacy',
        title: 'Pharmacy Services',
        content: 'Find pharmacies, check medication information, and manage prescriptions.',
        type: 'page',
      },
      {
        path: '/insurance',
        title: 'Insurance Information',
        content: 'Learn about healthcare insurance options including CNSS, RAMED, and private plans.',
        type: 'page',
      },
      {
        path: '/appointments',
        title: 'Book Appointments',
        content: 'Schedule appointments with healthcare providers online.',
        type: 'page',
      },
    ];
  }

  private initializeSymptomGuidance() {
    // Emergency symptoms
    this.symptomGuidance.set('chest_pain', {
      symptoms: ['chest pain', 'chest tightness', 'chest pressure', 'heart pain'],
      recommendedSpecialties: ['Cardiology', 'Emergency Medicine'],
      urgency: 'emergency',
      preparationTips: [
        'Call emergency services immediately (15)',
        'Do not drive yourself to the hospital',
        'Stay calm and sit in a comfortable position',
        'Take note of when symptoms started'
      ],
      redFlags: [
        'Pain radiating to arm, jaw, or back',
        'Shortness of breath',
        'Nausea or dizziness',
        'Cold sweats'
      ]
    });

    this.symptomGuidance.set('severe_headache', {
      symptoms: ['severe headache', 'worst headache', 'thunderclap headache', 'sudden headache'],
      recommendedSpecialties: ['Neurology', 'Emergency Medicine'],
      urgency: 'emergency',
      preparationTips: [
        'Call emergency services immediately (15)',
        'Do not take pain medication without medical supervision',
        'Note any accompanying symptoms',
        'Avoid bright lights and loud noises'
      ],
      redFlags: [
        'Headache with fever and stiff neck',
        'Headache with confusion or loss of consciousness',
        'Headache after head injury',
        'Headache with vision changes'
      ]
    });

    this.symptomGuidance.set('shortness_of_breath', {
      symptoms: ['shortness of breath', 'difficulty breathing', 'breathing problems', 'can\'t breathe'],
      recommendedSpecialties: ['Pulmonology', 'Cardiology', 'Emergency Medicine'],
      urgency: 'urgent',
      preparationTips: [
        'Seek immediate medical attention',
        'Sit in an upright position',
        'Try to stay calm',
        'Note any triggers or accompanying symptoms'
      ],
      redFlags: [
        'Blue lips or fingertips',
        'Chest pain with breathing',
        'Severe anxiety or panic',
        'Inability to speak in full sentences'
      ]
    });

    // Common symptoms with professional guidance
    this.symptomGuidance.set('dizziness', {
      symptoms: ['dizzy', 'dizziness', 'lightheaded', 'vertigo', 'feeling dizzy', 'spinning sensation'],
      recommendedSpecialties: ['General Practice', 'Neurology', 'Otolaryngology'],
      urgency: 'routine',
      preparationTips: [
        'Note when dizziness occurs (standing, sitting, moving head)',
        'Track any triggers (dehydration, stress, certain foods)',
        'Keep a symptom diary for 1-2 weeks',
        'Bring list of current medications',
        'Note any recent head injury or ear problems'
      ],
      redFlags: [
        'Dizziness with chest pain or shortness of breath',
        'Dizziness with severe headache',
        'Dizziness with loss of consciousness',
        'Dizziness with difficulty speaking or walking'
      ]
    });

    this.symptomGuidance.set('back_pain', {
      symptoms: ['back pain', 'lower back pain', 'backache', 'spine pain', 'sharp pain in back', 'back hurts'],
      recommendedSpecialties: ['Orthopedics', 'Physical Therapy', 'Pain Management', 'General Practice'],
      urgency: 'routine',
      preparationTips: [
        'Note the exact location and type of pain (sharp, dull, aching)',
        'Record activities that worsen or improve the pain',
        'Bring any previous imaging results (X-rays, MRI)',
        'Wear comfortable clothing for examination',
        'Note any recent injuries or accidents'
      ],
      redFlags: [
        'Pain with numbness or weakness in legs',
        'Pain with loss of bladder or bowel control',
        'Pain after trauma or fall',
        'Pain with fever or unexplained weight loss'
      ]
    });

    this.symptomGuidance.set('stomach_pain', {
      symptoms: ['stomach pain', 'abdominal pain', 'stomach hurts', 'belly pain', 'tummy pain', 'stomach ache'],
      recommendedSpecialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
      urgency: 'routine',
      preparationTips: [
        'Keep a food diary for 1-2 weeks',
        'Note timing of symptoms (before/after meals)',
        'Track any foods that trigger symptoms',
        'Bring list of current medications',
        'Note any recent changes in diet or stress'
      ],
      redFlags: [
        'Severe, sudden abdominal pain',
        'Pain with fever or vomiting',
        'Pain with blood in stool',
        'Pain that wakes you at night'
      ]
    });

    this.symptomGuidance.set('digestive_issues', {
      symptoms: ['nausea', 'vomiting', 'diarrhea', 'constipation', 'indigestion', 'heartburn', 'acid reflux'],
      recommendedSpecialties: ['Gastroenterology', 'Internal Medicine'],
      urgency: 'routine',
      preparationTips: [
        'Keep a food diary for 1-2 weeks',
        'Note timing of symptoms',
        'Bring list of current medications',
        'Fast for 8 hours if endoscopy is expected'
      ],
      redFlags: [
        'Severe abdominal pain',
        'Blood in stool or vomit',
        'Unintentional weight loss',
        'Pain that wakes you at night'
      ]
    });

    this.symptomGuidance.set('vomiting', {
      symptoms: ['vomit', 'vomiting', 'want to vomit', 'throwing up', 'nausea', 'feeling sick'],
      recommendedSpecialties: ['Gastroenterology', 'Internal Medicine', 'General Practice'],
      urgency: 'routine',
      preparationTips: [
        'Note when vomiting occurs (before/after meals, time of day)',
        'Track any foods that trigger vomiting',
        'Keep a symptom diary for 1-2 weeks',
        'Bring list of current medications',
        'Note any recent travel or food poisoning exposure'
      ],
      redFlags: [
        'Vomiting with severe abdominal pain',
        'Blood in vomit',
        'Vomiting with fever',
        'Signs of dehydration (dry mouth, dark urine)',
        'Vomiting that lasts more than 24 hours'
      ]
    });

    this.symptomGuidance.set('frequent_vomiting', {
      symptoms: ['vomit frequently', 'vomiting after meals', 'always vomiting', 'chronic vomiting', 'vomiting regularly'],
      recommendedSpecialties: ['Gastroenterology', 'Internal Medicine'],
      urgency: 'urgent',
      preparationTips: [
        'Keep a detailed food and symptom diary for 2 weeks',
        'Note timing of vomiting in relation to meals',
        'Track any foods that consistently trigger vomiting',
        'Bring list of current medications',
        'Note any weight loss or appetite changes',
        'Document any stress or anxiety triggers'
      ],
      redFlags: [
        'Vomiting with severe abdominal pain',
        'Blood in vomit',
        'Unintentional weight loss',
        'Signs of dehydration',
        'Vomiting with fever or jaundice'
      ]
    });

    // Mental Health Symptoms
    this.symptomGuidance.set('anxiety', {
      symptoms: ['anxiety', 'panic attacks', 'worry', 'nervousness', 'stress', 'fear', 'panic'],
      recommendedSpecialties: ['Psychiatry', 'Psychology', 'Mental Health'],
      urgency: 'routine',
      preparationTips: [
        'Keep a mood diary for 1-2 weeks',
        'Note triggers and frequency of symptoms',
        'Bring list of current medications',
        'Consider bringing a trusted friend or family member',
        'Write down specific concerns and questions'
      ],
      redFlags: [
        'Thoughts of self-harm or suicide',
        'Severe panic attacks affecting daily life',
        'Inability to function at work or home',
        'Substance use to cope with anxiety'
      ]
    });

    this.symptomGuidance.set('depression', {
      symptoms: ['depression', 'sadness', 'hopelessness', 'loss of interest', 'fatigue', 'sleep problems'],
      recommendedSpecialties: ['Psychiatry', 'Psychology', 'Mental Health'],
      urgency: 'routine',
      preparationTips: [
        'Track your mood daily for 2 weeks',
        'Note sleep patterns and appetite changes',
        'List activities you used to enjoy',
        'Bring list of current medications',
        'Consider bringing a family member for support'
      ],
      redFlags: [
        'Thoughts of death or suicide',
        'Severe hopelessness or worthlessness',
        'Inability to care for basic needs',
        'Isolation from friends and family'
      ]
    });

    this.symptomGuidance.set('insomnia', {
      symptoms: ['insomnia', 'sleep problems', 'can\'t sleep', 'trouble sleeping', 'wake up frequently'],
      recommendedSpecialties: ['Sleep Medicine', 'Psychiatry', 'Neurology'],
      urgency: 'routine',
      preparationTips: [
        'Keep a sleep diary for 2 weeks',
        'Note bedtime routine and environment',
        'Track caffeine and alcohol intake',
        'Bring list of current medications',
        'Note any stress or life changes'
      ],
      redFlags: [
        'Sleep problems with daytime sleepiness affecting driving',
        'Sleep problems with chest pain or breathing issues',
        'Sleep problems with severe mood changes',
        'Sleep problems lasting more than 3 months'
      ]
    });

    // Routine symptoms
    this.symptomGuidance.set('skin_rash', {
      symptoms: ['skin rash', 'itchy skin', 'red spots', 'skin irritation'],
      recommendedSpecialties: ['Dermatology'],
      urgency: 'routine',
      preparationTips: [
        'Take photos of the rash',
        'Note when it started and any triggers',
        'Avoid scratching the affected area',
        'Bring list of current medications'
      ],
      redFlags: [
        'Rash with fever',
        'Rash spreading rapidly',
        'Rash with difficulty breathing',
        'Rash with swelling of face or throat'
      ]
    });

    this.symptomGuidance.set('headache', {
      symptoms: ['headache', 'migraine', 'tension headache', 'cluster headache'],
      recommendedSpecialties: ['Neurology', 'Headache Medicine'],
      urgency: 'routine',
      preparationTips: [
        'Keep a headache diary for 1 month',
        'Note triggers, duration, and severity',
        'Track medication use and effectiveness',
        'Bring list of current medications',
        'Note any family history of headaches'
      ],
      redFlags: [
        'Worst headache of your life',
        'Headache with fever and stiff neck',
        'Headache after head injury',
        'Headache with confusion or vision changes'
      ]
    });

    this.symptomGuidance.set('joint_pain', {
      symptoms: ['joint pain', 'arthritis', 'swollen joints', 'stiff joints'],
      recommendedSpecialties: ['Rheumatology', 'Orthopedics'],
      urgency: 'routine',
      preparationTips: [
        'Note which joints are affected',
        'Track pain patterns and triggers',
        'Bring any previous imaging results',
        'Wear comfortable clothing for examination',
        'Note family history of arthritis'
      ],
      redFlags: [
        'Joint pain with fever',
        'Joint pain with severe swelling',
        'Joint pain with inability to move joint',
        'Joint pain with rash'
      ]
    });
  }

  private initializeConsultationTips() {
    this.consultationTips.set('Cardiology', {
      specialty: 'Cardiology',
      preparation: [
        'Fast for 12 hours before appointment',
        'Bring all current medications',
        'Wear comfortable clothing',
        'Avoid caffeine for 24 hours',
        'Bring previous ECG or heart test results'
      ],
      whatToBring: [
        'List of current medications',
        'Previous heart test results',
        'Blood pressure readings if you have them',
        'Family history of heart disease',
        'Insurance card and ID'
      ],
      duration: '30-60 minutes',
      followUp: 'Usually 1-3 months, depending on condition'
    });

    this.consultationTips.set('Dermatology', {
      specialty: 'Dermatology',
      preparation: [
        'Avoid applying makeup or lotions to affected areas',
        'Take photos of skin conditions',
        'Note any recent changes in skin',
        'Bring list of skincare products used'
      ],
      whatToBring: [
        'Photos of skin conditions',
        'List of current medications',
        'Previous biopsy results if any',
        'Family history of skin conditions',
        'Insurance card and ID'
      ],
      duration: '15-30 minutes',
      followUp: 'Usually 2-4 weeks for follow-up'
    });

    this.consultationTips.set('Psychiatry', {
      specialty: 'Psychiatry',
      preparation: [
        'Write down your symptoms and concerns',
        'Keep a mood or symptom diary',
        'Note any recent life changes or stressors',
        'Bring list of current medications',
        'Consider bringing a trusted friend or family member'
      ],
      whatToBring: [
        'Symptom diary or mood tracker',
        'List of current medications',
        'Family history of mental health conditions',
        'Previous mental health records if any',
        'Insurance card and ID'
      ],
      duration: '45-60 minutes',
      followUp: 'Usually 2-4 weeks for medication management, 1-2 weeks for therapy'
    });

    this.consultationTips.set('Psychology', {
      specialty: 'Psychology',
      preparation: [
        'Think about your goals for therapy',
        'Write down specific concerns or questions',
        'Note any recent life changes',
        'Be prepared to discuss your background',
        'Wear comfortable clothing'
      ],
      whatToBring: [
        'List of concerns and goals',
        'Any relevant medical records',
        'Insurance card and ID',
        'Payment method if required'
      ],
      duration: '50-60 minutes',
      followUp: 'Usually weekly or bi-weekly sessions'
    });

    this.consultationTips.set('Orthopedics', {
      specialty: 'Orthopedics',
      preparation: [
        'Wear loose, comfortable clothing',
        'Bring any braces or supports you use',
        'Note activities that worsen pain',
        'Bring imaging results if available'
      ],
      whatToBring: [
        'X-rays, MRI, or CT scan results',
        'List of current medications',
        'Any braces or supports',
        'Insurance card and ID'
      ],
      duration: '20-40 minutes',
      followUp: 'Usually 2-6 weeks depending on treatment'
    });

    this.consultationTips.set('Gastroenterology', {
      specialty: 'Gastroenterology',
      preparation: [
        'Fast for 8 hours if endoscopy is expected',
        'Keep a food diary for 1-2 weeks',
        'Note timing and triggers of symptoms',
        'Bring list of current medications'
      ],
      whatToBring: [
        'Food diary',
        'List of current medications',
        'Previous endoscopy or colonoscopy results',
        'Family history of digestive conditions',
        'Insurance card and ID'
      ],
      duration: '30-45 minutes',
      followUp: 'Usually 1-3 months'
    });

    this.consultationTips.set('Neurology', {
      specialty: 'Neurology',
      preparation: [
        'Bring someone to drive you if needed',
        'Note frequency and duration of symptoms',
        'Bring any previous brain imaging results',
        'Avoid caffeine for 24 hours if EEG is expected'
      ],
      whatToBring: [
        'Previous MRI, CT, or EEG results',
        'List of current medications',
        'Detailed symptom diary',
        'Family history of neurological conditions',
        'Insurance card and ID'
      ],
      duration: '45-60 minutes',
      followUp: 'Usually 1-6 months depending on condition'
    });

    this.consultationTips.set('Sleep Medicine', {
      specialty: 'Sleep Medicine',
      preparation: [
        'Keep a sleep diary for 2 weeks',
        'Note your bedtime routine',
        'Track caffeine and alcohol intake',
        'Bring list of current medications',
        'Note any stress or life changes'
      ],
      whatToBring: [
        'Sleep diary',
        'List of current medications',
        'Any previous sleep study results',
        'Insurance card and ID'
      ],
      duration: '30-45 minutes',
      followUp: 'Usually 1-2 months for follow-up'
    });
  }

  private initializeFAQDatabase() {
    this.faqDatabase = [
      // Insurance FAQs
      {
        category: 'insurance',
        question: 'What insurance plans do you accept?',
        answer: 'We accept most major insurance plans including CNSS, RAMED, and private insurance. Please contact our office to verify your specific coverage before your appointment.',
        keywords: ['insurance', 'coverage', 'cnss', 'ramed', 'private', 'accepted']
      },
      {
        category: 'insurance',
        question: 'How do I check if my insurance covers a specific procedure?',
        answer: 'You can check your insurance coverage by calling your insurance provider directly or contacting our billing department. We recommend verifying coverage before any procedure.',
        keywords: ['procedure', 'coverage', 'check', 'verify', 'billing']
      },
      {
        category: 'insurance',
        question: 'Do you accept international insurance?',
        answer: 'We accept some international insurance plans. Please contact our office with your insurance details to verify coverage before your appointment.',
        keywords: ['international', 'foreign', 'insurance', 'coverage']
      },
      {
        category: 'insurance',
        question: 'What if I don\'t have insurance?',
        answer: 'We offer self-pay options and can work with you to create a payment plan. We also accept cash payments and major credit cards.',
        keywords: ['no insurance', 'self pay', 'payment', 'cash', 'credit card']
      },

      // Pharmacy FAQs
      {
        category: 'pharmacy',
        question: 'What are the pharmacy hours?',
        answer: 'Most pharmacies are open Monday-Saturday 8:00 AM to 8:00 PM. Some have extended hours or are open 24/7. Emergency pharmacies are available for urgent medication needs.',
        keywords: ['pharmacy', 'hours', 'open', 'emergency', 'medication']
      },
      {
        category: 'pharmacy',
        question: 'Can I get my prescription filled at any pharmacy?',
        answer: 'Yes, you can get your prescription filled at any licensed pharmacy. Some pharmacies may have your medication in stock while others may need to order it.',
        keywords: ['prescription', 'fill', 'pharmacy', 'stock', 'medication']
      },
      {
        category: 'pharmacy',
        question: 'How long does it take to fill a prescription?',
        answer: 'Most prescriptions are filled within 15-30 minutes. Complex medications or those that need to be ordered may take 24-48 hours.',
        keywords: ['prescription', 'time', 'fill', 'duration', 'wait']
      },
      {
        category: 'pharmacy',
        question: 'Do you have emergency pharmacy services?',
        answer: 'Yes, there are 24/7 emergency pharmacies available. Call 15 for emergency services or check our website for the nearest emergency pharmacy.',
        keywords: ['emergency', 'pharmacy', '24/7', 'urgent', 'medication']
      },

      // Emergency Contact FAQs
      {
        category: 'emergency',
        question: 'What is the emergency number?',
        answer: 'For medical emergencies, call 15 immediately. This is the national emergency number for medical assistance in Morocco.',
        keywords: ['emergency', 'number', '15', 'urgent', 'ambulance']
      },
      {
        category: 'emergency',
        question: 'When should I go to the emergency room?',
        answer: 'Go to the emergency room for chest pain, severe bleeding, difficulty breathing, loss of consciousness, severe head injury, or any life-threatening condition.',
        keywords: ['emergency room', 'when', 'urgent', 'severe', 'life threatening']
      },
      {
        category: 'emergency',
        question: 'How do I contact emergency services?',
        answer: 'Call 15 for medical emergencies, 19 for police, or 15 for fire services. For non-emergency medical advice, you can contact our office during business hours.',
        keywords: ['emergency', 'contact', '15', '19', 'services']
      },

      // Booking and Navigation FAQs
      {
        category: 'booking',
        question: 'How do I book my first appointment?',
        answer: 'To book your first appointment: 1) Search for a doctor by specialty or location, 2) View their profile and availability, 3) Click "Book Appointment", 4) Select your preferred time slot, 5) Fill in your information and confirm.',
        keywords: ['first appointment', 'book', 'how', 'new patient', 'schedule']
      },
      {
        category: 'booking',
        question: 'What information do I need to book an appointment?',
        answer: 'You\'ll need: your full name, phone number, email address, insurance information (if applicable), and a brief description of your symptoms or reason for visit.',
        keywords: ['information', 'book', 'appointment', 'needed', 'required']
      },
      {
        category: 'booking',
        question: 'Can I book an appointment for someone else?',
        answer: 'Yes, you can book appointments for family members. You\'ll need their personal information and consent to make the appointment.',
        keywords: ['book for someone', 'family', 'consent', 'appointment']
      },
      {
        category: 'booking',
        question: 'How do I cancel or reschedule an appointment?',
        answer: 'You can cancel or reschedule through your account dashboard, by calling our office, or by responding to the confirmation SMS/email. Please provide at least 24 hours notice.',
        keywords: ['cancel', 'reschedule', 'appointment', 'notice', 'change']
      },

      // Rating System FAQs
      {
        category: 'ratings',
        question: 'How do doctor ratings work?',
        answer: 'Doctor ratings are based on patient reviews and range from 1-5 stars. Ratings consider factors like bedside manner, wait times, communication, and overall satisfaction. Only verified patients can leave reviews.',
        keywords: ['ratings', 'stars', 'reviews', 'how', 'work']
      },
      {
        category: 'ratings',
        question: 'What do the different rating levels mean?',
        answer: '5 stars: Excellent care and experience, 4 stars: Very good care, 3 stars: Satisfactory care, 2 stars: Below average care, 1 star: Poor care. We recommend doctors with 4+ stars.',
        keywords: ['rating levels', 'stars', 'meaning', 'excellent', 'poor']
      },
      {
        category: 'ratings',
        question: 'Can I trust the ratings and reviews?',
        answer: 'Yes, all reviews are from verified patients who have actually visited the doctor. We moderate reviews to ensure they are genuine and helpful.',
        keywords: ['trust', 'ratings', 'reviews', 'verified', 'genuine']
      },
      {
        category: 'ratings',
        question: 'How can I leave a review for my doctor?',
        answer: 'After your appointment, you\'ll receive an email or SMS with a link to leave a review. You can also leave a review through your account dashboard.',
        keywords: ['leave review', 'rating', 'after appointment', 'feedback']
      },

      // Teleconsultation FAQs
      {
        category: 'teleconsultations',
        question: 'How do teleconsultations work?',
        answer: 'Teleconsultations are conducted via secure video calls. You\'ll receive a link before your appointment. Ensure you have a stable internet connection and a quiet, private space.',
        keywords: ['teleconsultation', 'video', 'call', 'online', 'virtual']
      },
      {
        category: 'teleconsultations',
        question: 'What equipment do I need for a teleconsultation?',
        answer: 'You need a computer, tablet, or smartphone with a camera and microphone, stable internet connection, and a quiet, private space. We\'ll send you a secure link before your appointment.',
        keywords: ['equipment', 'camera', 'microphone', 'internet', 'computer']
      },
      {
        category: 'teleconsultations',
        question: 'Are teleconsultations covered by insurance?',
        answer: 'Many insurance plans now cover teleconsultations. Please check with your insurance provider to confirm coverage before your appointment.',
        keywords: ['teleconsultation', 'insurance', 'covered', 'coverage']
      },
      {
        category: 'teleconsultations',
        question: 'When should I choose a teleconsultation vs in-person visit?',
        answer: 'Choose teleconsultation for: follow-ups, medication refills, minor concerns, or when you\'re unable to travel. Choose in-person for: physical exams, procedures, or when the doctor needs to examine you physically.',
        keywords: ['teleconsultation', 'in person', 'when', 'choose', 'difference']
      }
    ];
  }

  private initializeEmergencyKeywords() {
    this.emergencyKeywords = [
      'chest pain', 'heart attack', 'stroke', 'unconscious', 'not breathing',
      'severe bleeding', 'broken bone', 'head injury', 'seizure', 'overdose',
      'suicide', 'self-harm', 'severe allergic reaction', 'anaphylaxis',
      'douleur thoracique', 'crise cardiaque', 'accident vasculaire cérébral',
      'saignement sévère', 'fracture', 'traumatisme crânien', 'convulsion',
      'ألم في الصدر', 'نوبة قلبية', 'سكتة دماغية', 'نزيف شديد', 'كسور'
    ];
  }

  async processMessage(
    text: string,
    context: ChatContext
  ): Promise<ChatMessage> {
    this.context = context;

    // Try to use OpenAI if available, otherwise fall back to rule-based
    if (this.openaiApiKey) {
      try {
        return await this.processWithOpenAI(text, context);
      } catch (error) {
        console.error('OpenAI processing failed, falling back to rule-based:', error);
        // Fall back to rule-based processing
      }
    }

    // Analyze message intent
    const analysis = await this.analyzeIntent(text);

    // Generate response based on intent
    const response = await this.generateResponse(analysis, text);

    // Create chat message
    const chatMessage: ChatMessage = {
      id: this.generateId(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      intent: analysis.intent,
      confidence: analysis.confidence,
    };

    // Store in conversation history
    this.conversationHistory.push({
      id: this.generateId(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
    });
    this.conversationHistory.push(chatMessage);

    // Execute any actions
    if (response.action) {
      await this.executeAction(response.action, analysis.entities, text);
    }

    return chatMessage;
  }

  private async processWithOpenAI(text: string, context: ChatContext): Promise<ChatMessage> {
    try {
      // Import OpenAI dynamically to avoid issues if not available
      const { OpenAI } = await import('openai');
      
      if (!this.openaiApiKey) {
        throw new Error('OpenAI API key not available');
      }

      const openai = new OpenAI({
        apiKey: this.openaiApiKey,
        dangerouslyAllowBrowser: true // Note: In production, use server-side API calls
      });

      // Prepare conversation history for context
      const messages = this.conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Add system message with context
      messages.unshift({
        role: 'system',
        content: `You are a helpful healthcare assistant for Sal-lmjarab, a healthcare platform in Morocco. 
        The user's language preference is ${context.language}. 
        ${context.location ? `The user is located near: ${JSON.stringify(context.location)}` : ''}
        ${context.userProfile ? `User profile: ${JSON.stringify(context.userProfile)}` : ''}
        Provide concise, accurate information about healthcare services, doctors, and facilities.
        For emergencies, always advise calling emergency services at 15 or 141.
        You can search for doctors, hospitals, and pharmacies, and provide information about medical specialties.`
      });

      // Add current user message
      messages.push({
        role: 'user',
        content: text
      });

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages as any,
        max_tokens: 300,
        temperature: 0.7,
      });

      const responseText = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

      // Create chat message
      const chatMessage: ChatMessage = {
        id: this.generateId(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        intent: this.detectIntentFromOpenAIResponse(responseText, text),
        confidence: 0.95, // Higher confidence for AI-generated responses
      };

      // Store in conversation history
      this.conversationHistory.push({
        id: this.generateId(),
        text: text,
        sender: 'user',
        timestamp: new Date(),
      });
      this.conversationHistory.push(chatMessage);

      return chatMessage;
    } catch (error) {
      console.error('Error processing with OpenAI:', error);
      throw error;
    }
  }

  private detectIntentFromOpenAIResponse(response: string, query: string): string {
    // Simple heuristic to detect intent from response content
    const lowerResponse = response.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    if (lowerResponse.includes('emergency') || lowerQuery.includes('emergency')) {
      return 'emergency';
    }
    
    if (lowerResponse.includes('doctor') || lowerResponse.includes('specialist') || 
        lowerQuery.includes('doctor') || lowerQuery.includes('specialist')) {
      return 'find_doctor';
    }
    
    if (lowerResponse.includes('appointment') || lowerQuery.includes('appointment') || 
        lowerQuery.includes('schedule')) {
      return 'book_appointment';
    }
    
    if (lowerResponse.includes('insurance') || lowerQuery.includes('insurance') || 
        lowerQuery.includes('coverage')) {
      return 'check_insurance';
    }
    
    if (lowerResponse.includes('pharmacy') || lowerQuery.includes('pharmacy') || 
        lowerQuery.includes('medication')) {
      return 'pharmacy';
    }
    
    if (lowerResponse.includes('direction') || lowerResponse.includes('location') || 
        lowerQuery.includes('direction') || lowerQuery.includes('where is')) {
      return 'directions';
    }
    
    if (lowerResponse.includes('near') || lowerResponse.includes('nearby') || 
        lowerQuery.includes('near me') || lowerQuery.includes('closest')) {
      return 'location_based';
    }
    
    return 'general_info';
  }

  private async analyzeIntent(message: string): Promise<IntentAnalysis> {
    const lowerMessage = message.toLowerCase();
    let bestIntent = 'unknown';
    let bestConfidence = 0;
    let entities: string[] = [];

    // Check for emergency keywords first (highest priority)
    if (this.isEmergencyMessage(lowerMessage)) {
      return {
        intent: 'emergency',
        confidence: 1.0,
        entities: ['emergency']
      };
    }

    // Check for symptom-based queries
    const symptomMatch = this.matchSymptomGuidance(lowerMessage);
    if (symptomMatch) {
      return {
        intent: 'symptom_guidance',
        confidence: 0.95,
        entities: [symptomMatch.key, ...symptomMatch.specialties]
      };
    }

    // Check for FAQ queries
    const faqMatch = this.matchFAQQuery(lowerMessage);
    if (faqMatch) {
      return {
        intent: 'faq',
        confidence: 0.9,
        entities: [faqMatch.category]
      };
    }

    // Check for consultation preparation queries
    const consultationMatch = this.matchConsultationQuery(lowerMessage);
    if (consultationMatch) {
      return {
        intent: 'consultation_tips',
        confidence: 0.9,
        entities: [consultationMatch.specialty]
      };
    }

    // Check for high-rated doctor queries
    if (this.isHighRatedDoctorQuery(lowerMessage)) {
      return {
        intent: 'high_rated_doctors',
        confidence: 0.85,
        entities: this.extractSpecialtyFromQuery(lowerMessage)
      };
    }

    // Process with existing intent patterns
    for (const [intent, data] of this.intents) {
      for (const pattern of data.patterns) {
        const confidence = this.calculateConfidence(lowerMessage, pattern);
        if (confidence > bestConfidence) {
          bestConfidence = confidence;
          bestIntent = intent;
          if (data.entities) {
            entities = this.extractEntities(message, data.entities);
          }
        }
      }
    }

    return {
      intent: bestIntent,
      confidence: bestConfidence,
      entities: entities,
    };
  }

  // Enhanced methods for new features
  private isEmergencyMessage(message: string): boolean {
    return this.emergencyKeywords.some(keyword => 
      message.includes(keyword.toLowerCase())
    );
  }

  private matchSymptomGuidance(message: string): { key: string; specialties: string[] } | null {
    for (const [key, guidance] of this.symptomGuidance) {
      if (guidance.symptoms.some(symptom => message.includes(symptom))) {
        return {
          key,
          specialties: guidance.recommendedSpecialties
        };
      }
    }
    return null;
  }

  private matchFAQQuery(message: string): { category: string; item: FAQItem } | null {
    for (const item of this.faqDatabase) {
      if (item.keywords.some(keyword => message.includes(keyword))) {
        return {
          category: item.category,
          item
        };
      }
    }
    return null;
  }

  private matchConsultationQuery(message: string): { specialty: string; tip: ConsultationTip } | null {
    const consultationKeywords = ['prepare', 'consultation', 'appointment', 'what to bring', 'preparation'];
    if (consultationKeywords.some(keyword => message.includes(keyword))) {
      for (const [specialty, tip] of this.consultationTips) {
        if (message.includes(specialty.toLowerCase()) || 
            message.includes(this.getSpecialtyKeywords(specialty))) {
          return { specialty, tip };
        }
      }
    }
    return null;
  }

  private isHighRatedDoctorQuery(message: string): boolean {
    const ratingKeywords = ['high rated', 'best', 'top', 'excellent', 'high rating', 'highly rated'];
    const doctorKeywords = ['doctor', 'specialist', 'physician'];
    
    return ratingKeywords.some(rating => message.includes(rating)) &&
           doctorKeywords.some(doctor => message.includes(doctor));
  }

  private extractSpecialtyFromQuery(message: string): string[] {
    const specialties = ['Cardiology', 'Dermatology', 'Orthopedics', 'Gastroenterology', 'Neurology', 'Pulmonology'];
    return specialties.filter(specialty => 
      message.includes(specialty.toLowerCase()) || 
      message.includes(this.getSpecialtyKeywords(specialty))
    );
  }

  private getSpecialtyKeywords(specialty: string): string {
    const keywords: Record<string, string> = {
      'Cardiology': 'heart, cardiac, cardiologist',
      'Dermatology': 'skin, dermatologist, rash',
      'Orthopedics': 'bone, joint, orthopedic, fracture',
      'Gastroenterology': 'stomach, digestive, gastroenterologist',
      'Neurology': 'brain, nerve, neurologist, headache',
      'Pulmonology': 'lung, respiratory, pulmonologist, breathing'
    };
    return keywords[specialty] || specialty.toLowerCase();
  }

  // Add back missing methods
  private calculateConfidence(message: string, pattern: string): number {
    // Simple confidence calculation
    const words = message.split(' ');
    const patternWords = pattern.split(' ');
    const matches = patternWords.filter((word) =>
      words.some((msgWord) => msgWord.includes(word))
    );
    return matches.length / patternWords.length;
  }

  private extractEntities(message: string, entityTypes: string[]): string[] {
    // Simple entity extraction (in production, use NLP)
    const entities: string[] = [];

    // Extract entities based on patterns or keywords
    for (const entityType of entityTypes) {
      const extracted = this.extractEntity(message, entityType);
      if (extracted) {
        entities.push(extracted);
      }
    }

    return entities;
  }

  private extractEntity(message: string, entityType: string): string | null {
    const lowerMessage = message.toLowerCase();
    
    switch (entityType) {
      case 'specialty':
        const specialties = [
          'cardiology', 'dermatology', 'neurology', 'pediatrics', 
          'orthopedics', 'gynecology', 'ophthalmology', 'psychiatry'
        ];
        for (const specialty of specialties) {
          if (lowerMessage.includes(specialty)) {
            return specialty;
          }
        }
        break;
        
      case 'location':
        const locations = ['casablanca', 'rabat', 'marrakech', 'fes', 'tangier', 'agadir'];
        for (const location of locations) {
          if (lowerMessage.includes(location)) {
            return location;
          }
        }
        break;
        
      case 'insurance':
        const insuranceTypes = ['cnss', 'ramed', 'private'];
        for (const insurance of insuranceTypes) {
          if (lowerMessage.includes(insurance)) {
            return insurance;
          }
        }
        break;
        
      case 'search_term':
        // Extract the search term after "search for" or similar phrases
        const searchPhrases = ['search for', 'find', 'look for', 'search'];
        for (const phrase of searchPhrases) {
          if (lowerMessage.includes(phrase)) {
            const startIndex = lowerMessage.indexOf(phrase) + phrase.length;
            return message.substring(startIndex).trim();
          }
        }
        break;
    }
    
    return null;
  }

  // Enhanced response generation
  private async generateResponse(
    analysis: IntentAnalysis,
    originalMessage: string
  ): Promise<ResponseData> {
    const { intent, confidence, entities } = analysis;

    // Check for emergency messages first
    if (this.isEmergencyMessage(originalMessage)) {
      return this.generateEmergencyResponse(originalMessage);
    }

    // Check for symptom guidance
    const symptomMatch = this.matchSymptomGuidance(originalMessage);
    if (symptomMatch) {
      return this.generateSymptomGuidanceResponse(symptomMatch.key);
    }

    // Check for FAQ queries
    const faqMatch = this.matchFAQQuery(originalMessage);
    if (faqMatch) {
      return this.generateFAQResponse(faqMatch.category, originalMessage);
    }

    // Check for consultation tips
    const consultationMatch = this.matchConsultationQuery(originalMessage);
    if (consultationMatch) {
      return this.generateConsultationTipsResponse(consultationMatch.specialty);
    }

    // Check for high-rated doctor queries
    if (this.isHighRatedDoctorQuery(originalMessage)) {
      const specialties = this.extractSpecialtyFromQuery(originalMessage);
      return this.generateHighRatedDoctorsResponse(specialties);
    }

    // Handle specific intents
    switch (intent) {
      case 'symptom_guidance':
        // Try to match specific symptoms
        const symptomMatch2 = this.matchSymptomGuidance(originalMessage);
        if (symptomMatch2) {
          return this.generateSymptomGuidanceResponse(symptomMatch2.key);
        }
        return { text: "I understand you're experiencing symptoms. Could you please describe them in more detail so I can recommend the right specialist?" };

      case 'explain_ratings':
        return this.generateRatingExplanationResponse();

      case 'booking_help':
        return this.generateBookingHelpResponse();

      case 'faq_insurance':
        return this.generateFAQResponse('insurance', originalMessage);

      case 'faq_pharmacy':
        return this.generateFAQResponse('pharmacy', originalMessage);

      case 'faq_emergency':
        return this.generateFAQResponse('emergency', originalMessage);

      case 'find_doctor':
        return this.generateStandardResponse(intent, entities, originalMessage);

      case 'book_appointment':
        return this.generateStandardResponse(intent, entities, originalMessage);

      case 'greeting':
        return this.generateStandardResponse(intent, entities, originalMessage);

      default:
        return this.generateStandardResponse(intent, entities, originalMessage);
    }
  }

  private generateEmergencyResponse(message: string): ResponseData {
    const emergencyMessage = `🚨 EMERGENCY ALERT 🚨

If you're experiencing a medical emergency, please:

1. **Call Emergency Services Immediately: 15**
2. **Do NOT drive yourself to the hospital**
3. **Stay calm and follow emergency operator instructions**

For immediate assistance:
• Emergency Services: 15
• Poison Control: 0537-68-01-15
• Mental Health Crisis: 0537-68-01-15

If you're in immediate danger, call 15 right now.

This chatbot cannot provide emergency medical care. Please seek immediate professional medical attention.`;

    return {
      text: emergencyMessage,
      action: 'emergency_alert'
    };
  }

  private generateSymptomGuidanceResponse(symptomKey: string): ResponseData {
    const guidance = this.symptomGuidance.get(symptomKey);
    if (!guidance) {
      return { text: "I understand you're experiencing symptoms. Let me help you find the right specialist. Could you tell me more about your symptoms so I can provide better guidance?" };
    }

    const language = this.context?.language || 'en';
    
    // Create professional, helpful response based on symptom type
    let response = '';
    
    // Add specific symptom explanations
    if (symptomKey === 'dizziness') {
      response = "Feeling dizzy can have several causes, including dehydration, low blood pressure, inner ear issues, or medication side effects. It's best to consult a general practitioner for an initial checkup to determine the underlying cause.\n\n";
    } else if (symptomKey === 'back_pain') {
      response = "That type of pain may be related to a muscle strain, kidney issues, or a spinal problem. You might want to see an orthopedic doctor or a general practitioner for diagnosis.\n\n";
    } else if (symptomKey === 'stomach_pain') {
      response = "Stomach pain after eating can be caused by food intolerances, acid reflux, gastritis, or other digestive issues. A gastroenterologist or general practitioner can help identify the cause.\n\n";
    } else if (symptomKey === 'vomiting') {
      response = "Vomiting can be caused by various factors including food poisoning, viral infections, medication side effects, or underlying digestive conditions. A gastroenterologist or general practitioner can help determine the cause and provide appropriate treatment.\n\n";
    } else if (symptomKey === 'frequent_vomiting') {
      response = "Frequent vomiting after meals could indicate a digestive disorder such as gastroparesis, acid reflux, food intolerances, or other gastrointestinal conditions. A gastroenterologist should evaluate this pattern to identify the underlying cause.\n\n";
    } else if (symptomKey === 'chest_pain') {
      response = "Chest pain requires immediate medical attention as it could indicate a serious heart condition. Please call emergency services (15) immediately and do not delay seeking care.\n\n";
    } else if (symptomKey === 'anxiety') {
      response = "Anxiety symptoms can significantly impact daily life. A mental health professional can help you develop coping strategies and determine if treatment is needed.\n\n";
    } else if (symptomKey === 'depression') {
      response = "Depression is a treatable medical condition. A psychiatrist or psychologist can provide proper diagnosis and treatment options to help you feel better.\n\n";
    } else {
      response = `Based on your symptoms, I recommend seeing a ${guidance.recommendedSpecialties.join(' or ')} specialist for proper evaluation.\n\n`;
    }

    // Add urgency level
    const urgencyText = {
      emergency: language === 'fr' ? 'URGENCE' : language === 'ar' ? 'طوارئ' : 'EMERGENCY',
      urgent: language === 'fr' ? 'Urgent' : language === 'ar' ? 'عاجل' : 'Urgent',
      routine: language === 'fr' ? 'Routine' : language === 'ar' ? 'روتيني' : 'Routine'
    };

    if (guidance.urgency === 'emergency') {
      response += `**⚠️ ${urgencyText[guidance.urgency]} - Seek immediate medical care**\n\n`;
    } else if (guidance.urgency === 'urgent') {
      response += `**⚠️ ${urgencyText[guidance.urgency]} - Schedule appointment soon**\n\n`;
    } else {
      response += `**📋 ${urgencyText[guidance.urgency]} - Schedule at your convenience**\n\n`;
    }
    
    // Add preparation tips
    response += `**Preparation Tips:**\n`;
    guidance.preparationTips.forEach(tip => {
      response += `• ${tip}\n`;
    });

    // Add red flags if any
    if (guidance.redFlags.length > 0) {
      response += `\n**⚠️ Warning Signs (Seek immediate care if you experience):**\n`;
      guidance.redFlags.forEach(flag => {
        response += `• ${flag}\n`;
      });
    }

    // Add doctor recommendations
    const relevantDoctors = mockDoctors.filter(doctor => 
      guidance.recommendedSpecialties.some(specialty => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      )
    ).slice(0, 3);

    if (relevantDoctors.length > 0) {
      response += `\n**Recommended Specialists:**\n`;
      relevantDoctors.forEach(doctor => {
        response += `• Dr. ${doctor.name} (${doctor.specialty}) - ${doctor.rating}⭐ (${doctor.reviewCount} reviews)\n`;
      });
    }

    // Add closing message
    response += `\nWould you like me to help you book an appointment with one of these specialists?`;

    return { text: response };
  }

  private generateRatingExplanationResponse(): ResponseData {
    const language = this.context?.language || 'en';
    
    let response = "**How Our Doctor Rating System Works:**\n\n";
    response += "Our ratings are based on verified patient reviews and range from 1-5 stars:\n\n";
    response += "**⭐ 5 Stars:** Excellent care and experience\n";
    response += "**⭐⭐ 4 Stars:** Very good care\n";
    response += "**⭐⭐⭐ 3 Stars:** Satisfactory care\n";
    response += "**⭐⭐⭐⭐ 2 Stars:** Below average care\n";
    response += "**⭐⭐⭐⭐⭐ 1 Star:** Poor care\n\n";
    
    response += "**What We Consider:**\n";
    response += "• Bedside manner and communication\n";
    response += "• Wait times and punctuality\n";
    response += "• Treatment effectiveness\n";
    response += "• Overall patient satisfaction\n\n";
    
    response += "**Trust & Verification:**\n";
    response += "• Only verified patients can leave reviews\n";
    response += "• All reviews are moderated for authenticity\n";
    response += "• We recommend doctors with 4+ star ratings\n\n";
    
    response += "**How to Leave a Review:**\n";
    response += "After your appointment, you'll receive an email/SMS with a review link, or you can leave one through your account dashboard.";

    return { text: response };
  }

  private generateBookingHelpResponse(): ResponseData {
    const language = this.context?.language || 'en';
    
    let response = "**How to Book Your First Appointment:**\n\n";
    response += "**Step 1:** Search for a doctor\n";
    response += "• Use the search bar to find doctors by specialty or location\n";
    response += "• Browse through available healthcare providers\n\n";
    
    response += "**Step 2:** Review doctor profiles\n";
    response += "• Check ratings, reviews, and experience\n";
    response += "• Read about their specialties and services\n";
    response += "• Verify they accept your insurance\n\n";
    
    response += "**Step 3:** Book your appointment\n";
    response += "• Click 'Book Appointment' on the doctor's profile\n";
    response += "• Select your preferred date and time\n";
    response += "• Fill in your information\n\n";
    
    response += "**Information You'll Need:**\n";
    response += "• Full name and contact information\n";
    response += "• Insurance card (if applicable)\n";
    response += "• Brief description of your symptoms\n";
    response += "• Preferred appointment time\n\n";
    
    response += "**Tips for New Patients:**\n";
    response += "• Arrive 15 minutes early for paperwork\n";
    response += "• Bring a list of current medications\n";
    response += "• Write down your questions beforehand\n";
    response += "• Bring a friend or family member if needed";

    return { text: response };
  }

  private generateFAQResponse(category: string, originalMessage: string): ResponseData {
    const relevantFAQs = this.faqDatabase.filter(faq => 
      faq.category === category || 
      faq.keywords.some(keyword => 
        originalMessage.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    if (relevantFAQs.length === 0) {
      return { text: "I couldn't find specific information about that. Could you please rephrase your question or ask about insurance, pharmacy hours, emergency contacts, or booking appointments?" };
    }

    let response = "";
    
    if (category === 'insurance') {
      response = "**Insurance Information:**\n\n";
      response += "**Accepted Insurance Plans:**\n";
      response += "• CNSS (National Social Security Fund)\n";
      response += "• RAMED (Medical Assistance Program)\n";
      response += "• Private insurance plans\n";
      response += "• International insurance (some plans)\n\n";
      response += "**Self-Pay Options:**\n";
      response += "• Cash payments\n";
      response += "• Credit cards\n";
      response += "• Payment plans available\n\n";
      response += "**To Verify Coverage:**\n";
      response += "• Contact your insurance provider\n";
      response += "• Call our billing department\n";
      response += "• Verify before any procedure";
    } else if (category === 'pharmacy') {
      response = "**Pharmacy Information:**\n\n";
      response += "**Regular Hours:**\n";
      response += "• Monday-Saturday: 8:00 AM - 8:00 PM\n";
      response += "• Some pharmacies have extended hours\n";
      response += "• 24/7 emergency pharmacies available\n\n";
      response += "**Prescription Services:**\n";
      response += "• Fill time: 15-30 minutes (most prescriptions)\n";
      response += "• Complex medications: 24-48 hours\n";
      response += "• Can fill at any licensed pharmacy\n\n";
      response += "**Emergency Pharmacy:**\n";
      response += "• Call 15 for emergency services\n";
      response += "• 24/7 pharmacies for urgent medication needs";
    } else if (category === 'emergency') {
      response = "**Emergency Information:**\n\n";
      response += "**Emergency Numbers:**\n";
      response += "• Medical Emergency: 15\n";
      response += "• Police: 19\n";
      response += "• Fire Services: 15\n\n";
      response += "**When to Go to Emergency Room:**\n";
      response += "• Chest pain or pressure\n";
      response += "• Severe bleeding\n";
      response += "• Difficulty breathing\n";
      response += "• Loss of consciousness\n";
      response += "• Severe head injury\n";
      response += "• Any life-threatening condition\n\n";
      response += "**Non-Emergency:**\n";
      response += "Contact our office during business hours for non-emergency medical advice.";
    } else {
      // Generic FAQ response
      response = "**Frequently Asked Questions:**\n\n";
      relevantFAQs.slice(0, 3).forEach(faq => {
        response += `**Q: ${faq.question}**\n`;
        response += `A: ${faq.answer}\n\n`;
      });
    }

    return { text: response };
  }

  private generateConsultationTipsResponse(specialty: string): ResponseData {
    const tip = this.consultationTips.get(specialty);
    if (!tip) {
      return {
        text: `I don't have specific preparation tips for ${specialty} yet. Please contact the doctor's office directly for preparation instructions.`
      };
    }

    let response = `**Preparation Tips for ${specialty} Consultation**\n\n`;
    
    response += `**Before Your Appointment:**\n`;
    tip.preparation.forEach(item => {
      response += `• ${item}\n`;
    });

    response += `\n**What to Bring:**\n`;
    tip.whatToBring.forEach(item => {
      response += `• ${item}\n`;
    });

    response += `\n**Appointment Details:**\n`;
    response += `• Duration: ${tip.duration}\n`;
    response += `• Follow-up: ${tip.followUp}\n`;

    response += `\nWould you like me to help you book an appointment with a ${specialty} specialist?`;

    return {
      text: response,
      action: 'consultation_tips'
    };
  }

  private generateHighRatedDoctorsResponse(specialties: string[]): ResponseData {
    // This would typically fetch from a database
    // For now, using mock data
    const mockDoctors = [
      {
        name: 'Dr. Ahmed Bennani',
        specialty: 'Cardiology',
        rating: 4.8,
        reviewCount: 127,
        location: 'Casablanca',
        nextAvailable: '2025-01-15T10:00:00Z'
      },
      {
        name: 'Dr. Fatima Alaoui',
        specialty: 'Dermatology',
        rating: 4.9,
        reviewCount: 89,
        location: 'Rabat',
        nextAvailable: '2025-01-16T14:30:00Z'
      }
    ];

    const filteredDoctors = specialties.length > 0 
      ? mockDoctors.filter(doc => specialties.includes(doc.specialty))
      : mockDoctors;

    let response = `**Top-Rated Doctors**\n\n`;
    
    filteredDoctors.forEach(doctor => {
      response += `**${doctor.name}** (${doctor.specialty})\n`;
      response += `⭐ ${doctor.rating}/5 (${doctor.reviewCount} reviews)\n`;
      response += `📍 ${doctor.location}\n`;
      response += `📅 Next available: ${new Date(doctor.nextAvailable).toLocaleDateString()}\n\n`;
    });

    response += `Would you like to book an appointment with any of these doctors?`;

    return {
      text: response,
      action: 'high_rated_doctors'
    };
  }

  private generateStandardResponse(intent: string, entities: string[], originalMessage: string): ResponseData {
    const intentData = this.intents.get(intent);
    if (!intentData) {
      return { text: this.getUnknownResponse() };
    }

    const language = this.context?.language || 'en';
    const responses = intentData.responses[language];
    const response = responses[Math.floor(Math.random() * responses.length)];

    return { text: this.personalizeResponse(response, entities) };
  }

  private formatDoctorList(doctors: any[]): string {
    if (!doctors || doctors.length === 0) {
      return 'No doctors available at the moment. Please try again later.';
    }
    
    const language = this.context?.language || 'en';
    const headers = {
      en: 'Available Doctors:',
      fr: 'Médecins Disponibles:',
      ar: 'الأطباء المتاحون:'
    };
    
    let list = `${headers[language as keyof typeof headers]}\n\n`;
    
    // Show first 5 doctors
    doctors.slice(0, 5).forEach((doctor, index) => {
      const nextAvailable = new Date(doctor.availability.nextAvailable).toLocaleDateString();
      const rating = doctor.rating ? `⭐ ${doctor.rating}/5` : '';
      
      list += `${index + 1}. **${doctor.name}** (${doctor.specialty})\n`;
      list += `   📍 ${doctor.location.city}, ${doctor.location.country}\n`;
      list += `   📅 Next available: ${nextAvailable}\n`;
      if (rating) list += `   ${rating}\n`;
      list += `   📞 ${doctor.phone}\n`;
      list += `   🔗 [View Profile](/doctor/${doctor.id})\n`;
      list += `   📝 [Book Appointment](/appointment/${doctor.id})\n\n`;
    });
    
    const footers = {
      en: 'Click on "View Profile" to see detailed information about each doctor, or "Book Appointment" to schedule a visit.',
      fr: 'Cliquez sur "Voir le Profil" pour voir les informations détaillées sur chaque médecin, ou "Prendre Rendez-vous" pour programmer une visite.',
      ar: 'انقر على "عرض الملف الشخصي" لرؤية المعلومات التفصيلية عن كل طبيب، أو "حجز موعد" لتحديد موعد زيارة.'
    };
    
    list += footers[language as keyof typeof footers];
    
    return list;
  }

  private formatDoctorListForAppointments(doctors: any[]): string {
    if (!doctors || doctors.length === 0) {
      return 'No doctors available for appointments at the moment. Please try again later.';
    }
    
    const language = this.context?.language || 'en';
    const headers = {
      en: 'Available Doctors for Appointments:',
      fr: 'Médecins Disponibles pour Prendre Rendez-vous:',
      ar: 'الأطباء المتاحون لحجز موعد:'
    };
    
    let list = `${headers[language as keyof typeof headers]}\n\n`;
    
    // Show first 5 doctors
    doctors.slice(0, 5).forEach((doctor, index) => {
      const nextAvailable = new Date(doctor.availability.nextAvailable).toLocaleDateString();
      const rating = doctor.rating ? `⭐ ${doctor.rating}/5` : '';
      
      list += `${index + 1}. **${doctor.name}** (${doctor.specialty})\n`;
      list += `   📍 ${doctor.location.city}, ${doctor.location.country}\n`;
      list += `   📅 Next available: ${nextAvailable}\n`;
      if (rating) list += `   ${rating}\n`;
      list += `   📞 ${doctor.phone}\n`;
      list += `   🔗 [View Profile](/doctor/${doctor.id})\n`;
      list += `   📝 [Book Appointment](/appointment/${doctor.id})\n\n`;
    });
    
    const footers = {
      en: 'Click on "View Profile" to see detailed information about each doctor, or "Book Appointment" to schedule a visit.',
      fr: 'Cliquez sur "Voir le Profil" pour voir les informations détaillées sur chaque médecin, ou "Prendre Rendez-vous" pour programmer une visite.',
      ar: 'انقر على "عرض الملف الشخصي" لرؤية المعلومات التفصيلية عن كل طبيب، أو "حجز موعد" لتحديد موعد زيارة.'
    };
    
    list += footers[language as keyof typeof footers];
    
    return list;
  }

  private formatReviewsList(doctors: any[]): string {
    if (!doctors || doctors.length === 0) {
      return 'No doctor reviews available at the moment. Please try again later.';
    }
    
    const language = this.context?.language || 'en';
    const headers = {
      en: 'Patient Reviews:',
      fr: 'Avis des Patients:',
      ar: 'مراجعات المرضى:'
    };
    
    let list = `${headers[language as keyof typeof headers]}\n\n`;
    
    // Show first 5 reviews
    doctors.slice(0, 5).forEach((doctor, index) => {
      const review = doctor.reviews ? doctor.reviews[Math.floor(Math.random() * doctor.reviews.length)] : 'No reviews available';
      
      list += `${index + 1}. **${doctor.name}**\n`;
      list += `   ${review}\n`;
      list += `   ⭐ ${doctor.rating}/5\n`;
      list += `   🔗 [View Full Profile](/doctor/${doctor.id})\n`;
      list += `   📝 [Book Appointment](/appointment/${doctor.id})\n\n`;
    });
    
    const footers = {
      en: 'Click on "View Full Profile" to see all reviews and detailed information about each doctor.',
      fr: 'Cliquez sur "Voir le Profil Complet" pour voir tous les avis et les informations détaillées sur chaque médecin.',
      ar: 'انقر على "عرض الملف الشخصي الكامل" لرؤية جميع المراجعات والمعلومات التفصيلية عن كل طبيب.'
    };
    
    list += footers[language as keyof typeof footers];
    
    return list;
  }

  private formatInsuranceInfo(): string {
    const language = this.context?.language || 'en';
    const insuranceInfo = {
      en: `**Insurance Plans We Accept:**

🏥 **CNSS (National Social Security Fund)**
   - Covers employees and their families
   - [Learn More](/insurance/cnss)
   - [Find CNSS Doctors](/doctors?insurance=cnss)

🏥 **RAMED (Medical Assistance Program)**
   - For low-income families
   - [Learn More](/insurance/ramed)
   - [Find RAMED Doctors](/doctors?insurance=ramed)

🏥 **Private Insurance**
   - All major private insurance providers
   - [Learn More](/insurance/private)
   - [Find Private Insurance Doctors](/doctors?insurance=private)

📋 **Check Your Coverage**
   - [Verify Insurance](/insurance/verify)
   - [Calculate Costs](/insurance/calculator)
   - [Contact Insurance Support](/support/insurance)`,
      
      fr: `**Plans d'Assurance que Nous Acceptons:**

🏥 **CNSS (Caisse Nationale de Sécurité Sociale)**
   - Couvre les employés et leurs familles
   - [En Savoir Plus](/insurance/cnss)
   - [Trouver des Médecins CNSS](/doctors?insurance=cnss)

🏥 **RAMED (Programme d'Assistance Médicale)**
   - Pour les familles à faible revenu
   - [En Savoir Plus](/insurance/ramed)
   - [Trouver des Médecins RAMED](/doctors?insurance=ramed)

🏥 **Assurance Privée**
   - Tous les principaux fournisseurs d'assurance privée
   - [En Savoir Plus](/insurance/private)
   - [Trouver des Médecins Assurance Privée](/doctors?insurance=private)

📋 **Vérifier Votre Couverture**
   - [Vérifier l'Assurance](/insurance/verify)
   - [Calculer les Coûts](/insurance/calculator)
   - [Contacter le Support Assurance](/support/insurance)`,
      
      ar: `**خطط التأمين التي نقبلها:**

🏥 **الصندوق الوطني للضمان الاجتماعي**
   - يغطي الموظفين وعائلاتهم
   - [اعرف المزيد](/insurance/cnss)
   - [ابحث عن أطباء الصندوق الوطني](/doctors?insurance=cnss)

🏥 **راميد (برنامج المساعدة الطبية)**
   - للعائلات منخفضة الدخل
   - [اعرف المزيد](/insurance/ramed)
   - [ابحث عن أطباء راميد](/doctors?insurance=ramed)

🏥 **التأمين الخاص**
   - جميع مزودي التأمين الخاص الرئيسيين
   - [اعرف المزيد](/insurance/private)
   - [ابحث عن أطباء التأمين الخاص](/doctors?insurance=private)

📋 **تحقق من تغطيتك**
   - [التحقق من التأمين](/insurance/verify)
   - [حساب التكاليف](/insurance/calculator)
   - [اتصل بدعم التأمين](/support/insurance)`
    };

    return insuranceInfo[language as keyof typeof insuranceInfo];
  }

  private formatPharmacyList(): string {
    const language = this.context?.language || 'en';
    const pharmacyInfo = {
      en: `**Nearby Pharmacies:**

🏥 **Pharmacie Centrale**
   - 📍 123 Avenue Mohammed V, Casablanca
   - 📞 +212 5 22 123 456
   - 🕒 Open 24/7
   - 🔗 [View Profile](/pharmacy/1)
   - 📝 [Order Medications](/pharmacy/1/order)

🏥 **Pharmacie Al Shifa**
   - 📍 456 Boulevard Hassan II, Rabat
   - 📞 +212 5 37 789 012
   - 🕒 8:00 AM - 10:00 PM
   - 🔗 [View Profile](/pharmacy/2)
   - 📝 [Order Medications](/pharmacy/2/order)

🏥 **Pharmacie Ibn Sina**
   - 📍 789 Rue Atlas, Marrakech
   - 📞 +212 5 24 345 678
   - 🕒 7:00 AM - 11:00 PM
   - 🔗 [View Profile](/pharmacy/3)
   - 📝 [Order Medications](/pharmacy/3/order)

🏥 **Pharmacie Al Amal**
   - 📍 321 Avenue Fes, Tangier
   - 📞 +212 5 39 567 890
   - 🕒 9:00 AM - 9:00 PM
   - 🔗 [View Profile](/pharmacy/4)
   - 📝 [Order Medications](/pharmacy/4/order)

🏥 **Pharmacie Al Salam**
   - 📍 654 Boulevard Agadir, Agadir
   - 📞 +212 5 28 901 234
   - 🕒 Open 24/7
   - 🔗 [View Profile](/pharmacy/5)
   - 📝 [Order Medications](/pharmacy/5/order)

📋 **Additional Services:**
   - [Find More Pharmacies](/pharmacies)
   - [Check Medication Availability](/medications)
   - [Pharmacy Delivery Service](/delivery)
   - [Emergency Pharmacies](/pharmacies/emergency)`,
      
      fr: `**Pharmacies à Proximité:**

🏥 **Pharmacie Centrale**
   - 📍 123 Avenue Mohammed V, Casablanca
   - 📞 +212 5 22 123 456
   - 🕒 Ouvert 24h/24
   - 🔗 [Voir le Profil](/pharmacy/1)
   - 📝 [Commander des Médicaments](/pharmacy/1/order)

🏥 **Pharmacie Al Shifa**
   - 📍 456 Boulevard Hassan II, Rabat
   - 📞 +212 5 37 789 012
   - 🕒 8h00 - 22h00
   - 🔗 [Voir le Profil](/pharmacy/2)
   - 📝 [Commander des Médicaments](/pharmacy/2/order)

🏥 **Pharmacie Ibn Sina**
   - 📍 789 Rue Atlas, Marrakech
   - 📞 +212 5 24 345 678
   - 🕒 7h00 - 23h00
   - 🔗 [Voir le Profil](/pharmacy/3)
   - 📝 [Commander des Médicaments](/pharmacy/3/order)

🏥 **Pharmacie Al Amal**
   - 📍 321 Avenue Fes, Tangier
   - 📞 +212 5 39 567 890
   - 🕒 9h00 - 21h00
   - 🔗 [Voir le Profil](/pharmacy/4)
   - 📝 [Commander des Médicaments](/pharmacy/4/order)

🏥 **Pharmacie Al Salam**
   - 📍 654 Boulevard Agadir, Agadir
   - 📞 +212 5 28 901 234
   - 🕒 Ouvert 24h/24
   - 🔗 [Voir le Profil](/pharmacy/5)
   - 📝 [Commander des Médicaments](/pharmacy/5/order)

📋 **Services Supplémentaires:**
   - [Trouver Plus de Pharmacies](/pharmacies)
   - [Vérifier la Disponibilité des Médicaments](/medications)
   - [Service de Livraison de Pharmacie](/delivery)
   - [Pharmacies d'Urgence](/pharmacies/emergency)`,
      
      ar: `**الصيدليات القريبة:**

🏥 **الصيدلية المركزية**
   - 📍 123 شارع محمد الخامس، الدار البيضاء
   - 📞 +212 5 22 123 456
   - 🕒 مفتوحة 24/7
   - 🔗 [عرض الملف الشخصي](/pharmacy/1)
   - 📝 [طلب الأدوية](/pharmacy/1/order)

🏥 **صيدلية الشفاء**
   - 📍 456 شارع الحسن الثاني، الرباط
   - 📞 +212 5 37 789 012
   - 🕒 8:00 صباحاً - 10:00 مساءً
   - 🔗 [عرض الملف الشخصي](/pharmacy/2)
   - 📝 [طلب الأدوية](/pharmacy/2/order)

🏥 **صيدلية ابن سينا**
   - 📍 789 شارع الأطلس، مراكش
   - 📞 +212 5 24 345 678
   - 🕒 7:00 صباحاً - 11:00 مساءً
   - 🔗 [عرض الملف الشخصي](/pharmacy/3)
   - 📝 [طلب الأدوية](/pharmacy/3/order)

🏥 **صيدلية الأمل**
   - 📍 321 شارع فاس، طنجة
   - 📞 +212 5 39 567 890
   - 🕒 9:00 صباحاً - 9:00 مساءً
   - 🔗 [عرض الملف الشخصي](/pharmacy/4)
   - 📝 [طلب الأدوية](/pharmacy/4/order)

🏥 **صيدلية السلام**
   - 📍 654 شارع أكادير، أكادير
   - 📞 +212 5 28 901 234
   - 🕒 مفتوحة 24/7
   - 🔗 [عرض الملف الشخصي](/pharmacy/5)
   - 📝 [طلب الأدوية](/pharmacy/5/order)

📋 **خدمات إضافية:**
   - [البحث عن المزيد من الصيدليات](/pharmacies)
   - [التحقق من توفر الأدوية](/medications)
   - [خدمة توصيل الصيدلية](/delivery)
   - [صيدليات الطوارئ](/pharmacies/emergency)`
    };

    return pharmacyInfo[language as keyof typeof pharmacyInfo];
  }

  private personalizeResponse(response: string, entities: string[]): string {
    // Add personalization logic here
    let personalized = response;
    
    // Add entity information if available
    if (entities.length > 0) {
      const specialty = entities.find(e => e.includes('cardiology') || e.includes('dermatology'));
      const location = entities.find(e => e.includes('casablanca') || e.includes('rabat'));
      
      if (specialty && response.includes('specialty')) {
        personalized = personalized.replace('specialty', specialty);
      }
      
      if (location && response.includes('your area')) {
        personalized = personalized.replace('your area', location);
      }
    }
    
    // Add location context if available
    if (this.context?.location) {
      personalized = personalized.replace('in your area', 'near your current location');
    }
    
    return personalized;
  }

  private getUnknownResponse(): string {
    const language = this.context?.language || 'en';
    const unknownResponses = {
      en: [
        "I'm not sure I understand. Could you please rephrase your question?",
        "I didn't quite catch that. Can you tell me more about what you need help with?",
        'Let me help you better. Are you looking for a doctor, need to book an appointment, or have a health question?',
      ],
      fr: [
        'Je ne suis pas sûr de comprendre. Pourriez-vous reformuler votre question?',
        "Je n'ai pas bien saisi. Pouvez-vous me dire plus sur ce dont vous avez besoin?",
        'Laissez-moi mieux vous aider. Cherchez-vous un médecin, voulez-vous prendre rendez-vous, ou avez-vous une question de santé?',
      ],
      ar: [
        'لست متأكداً من فهمي. هل يمكنك إعادة صياغة سؤالك؟',
        'لم أفهم ذلك تماماً. هل يمكنك إخباري أكثر عما تحتاج مساعدة فيه؟',
        'دعني أساعدك بشكل أفضل. هل تبحث عن طبيب، أم تريد حجز موعد، أم لديك سؤال صحي؟',
      ],
    };

    const responses = unknownResponses[language] || unknownResponses.en;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private async executeAction(
    action: string,
    entities: string[],
    originalMessage: string
  ): Promise<void> {
    switch (action) {
      case 'search_doctors':
        // Trigger doctor search with extracted entities
        const searchParams = new URLSearchParams();
        const specialty = entities.find(e => e.includes('cardiology') || e.includes('dermatology'));
        const location = entities.find(e => e.includes('casablanca') || e.includes('rabat'));
        
        if (specialty) searchParams.set('specialty', specialty);
        if (location) searchParams.set('location', location);
        if (this.context?.location) {
          searchParams.set('lat', this.context.location.latitude.toString());
          searchParams.set('lng', this.context.location.longitude.toString());
        }
        
        // In a real implementation, this would navigate to the search page
        console.log(`Searching doctors with params: ${searchParams.toString()}`);
        break;
        
      case 'book_appointment':
        // Navigate to appointment booking
        console.log('Navigating to appointment booking');
        break;
        
      case 'emergency_guidance':
        // Provide emergency resources
        console.log('Providing emergency guidance');
        break;
        
      case 'provide_directions':
        // Generate directions
        console.log('Generating directions');
        break;
        
      case 'insurance_info':
        // Provide insurance information
        console.log('Providing insurance information');
        break;
        
      case 'show_reviews':
        // Navigate to doctor reviews
        const doctorId = entities.find((e) => e.startsWith('doctor_'));
        console.log(`Showing reviews for doctor: ${doctorId || 'unknown'}`);
        break;
        
      case 'check_insurance':
        // Navigate to insurance coverage page
        console.log('Checking insurance coverage');
        break;
        
      case 'site_search':
        // Search the site
        console.log(`Searching site for: ${originalMessage}`);
        break;
        
      case 'pharmacy_assistance':
        // Provide pharmacy assistance
        console.log('Providing pharmacy assistance');
        break;

      case 'location_search':
        // Perform location-based search
        console.log(`Performing location-based search with entities: ${entities.join(', ')}`);
        if (this.context?.location) {
          console.log(`User location: ${JSON.stringify(this.context.location)}`);
        } else {
          console.log('No user location available');
        }
        break;
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // HIPAA compliance methods
  sanitizeMessage(message: string): string {
    // Remove potential PII/PHI
    const sensitivePatterns = [
      /\b\d{3}-\d{2}-\d{4}\b/g, // SSN pattern
      /\b\d{10,}\b/g, // Phone numbers
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email
    ];

    let sanitized = message;
    sensitivePatterns.forEach((pattern) => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });

    return sanitized;
  }

  encryptConversation(conversation: ChatMessage[]): string {
    // In production, use proper encryption
    return btoa(JSON.stringify(conversation));
  }

  // Transfer to human support
  async transferToHuman(reason: string): Promise<any> {
    return {
      transferred: true,
      reason,
      ticketId: this.generateId(),
      estimatedWaitTime: 5, // minutes
    };
  }

  // Get conversation insights
  getConversationInsights(): any {
    const intents = this.conversationHistory
      .filter((msg) => msg.sender === 'bot' && msg.intent)
      .map((msg) => msg.intent);

    return {
      totalMessages: this.conversationHistory.length,
      userMessages: this.conversationHistory.filter(
        (msg) => msg.sender === 'user'
      ).length,
      topIntents: this.getTopIntents(intents),
      averageConfidence: this.calculateAverageConfidence(),
      sessionDuration: this.getSessionDuration(),
    };
  }

  private getTopIntents(intents: (string | undefined)[]): string[] {
    const intentCounts = new Map<string, number>();

    for (const intent of intents) {
      if (typeof intent === 'string') {
        intentCounts.set(intent, (intentCounts.get(intent) || 0) + 1);
      }
    }

    return Array.from(intentCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([intent]) => intent);
  }

  private calculateAverageConfidence(): number {
    const confidenceScores = this.conversationHistory
      .filter((msg) => msg.confidence)
      .map((msg) => msg.confidence!);

    return confidenceScores.length > 0
      ? confidenceScores.reduce((sum, score) => sum + score, 0) /
          confidenceScores.length
      : 0;
  }

  private getSessionDuration(): number {
    if (this.conversationHistory.length < 2) return 0;

    const firstMessage = this.conversationHistory[0];
    const lastMessage =
      this.conversationHistory[this.conversationHistory.length - 1];

    return lastMessage.timestamp.getTime() - firstMessage.timestamp.getTime();
  }

  async generateSuggestions(insights: any): Promise<string[]> {
    const suggestions: string[] = [];

    // Get user's recent intents
    const recentIntents = this.getTopIntents(
      this.conversationHistory
        .filter(
          (msg): msg is ChatMessage & { intent: string } =>
            typeof msg.intent === 'string'
        )
        .map((msg) => msg.intent)
    );

    // Generate contextual suggestions
    if (recentIntents.includes('find_doctor')) {
      suggestions.push('Book an appointment');
      suggestions.push('Show doctor reviews');
      suggestions.push('Check insurance coverage');
    } else if (recentIntents.includes('book_appointment')) {
      suggestions.push('Get directions');
      suggestions.push('View doctor profile');
      suggestions.push('Check wait times');
    } else if (recentIntents.includes('emergency')) {
      suggestions.push('Find nearest hospital');
      suggestions.push('Call ambulance');
      suggestions.push('First aid information');
    } else if (recentIntents.includes('pharmacy')) {
      suggestions.push('Find nearby pharmacy');
      suggestions.push('Check medication information');
      suggestions.push('Prescription refill process');
    } else if (recentIntents.includes('location_based')) {
      suggestions.push('Show more results');
      suggestions.push('Filter by rating');
      suggestions.push('Change search radius');
    } else {
      // Default suggestions
      suggestions.push('Find a doctor');
      suggestions.push('Book appointment');
      suggestions.push('Medical advice');
      suggestions.push('Emergency help');
    }

    return suggestions.slice(0, 4); // Return max 4 suggestions
  }

  // Set OpenAI API key
  setOpenAIApiKey(apiKey: string): void {
    this.openaiApiKey = apiKey;
  }

  private generateLocationBasedResponse(query: string, entities: string[]): string {
    const language = this.context?.language || 'en';
    
    // Check if we have location data
    if (!this.context?.location) {
      const responses = {
        en: "I'd like to help you find nearby healthcare services, but I need your location first. Would you like to share your location?",
        fr: "J'aimerais vous aider à trouver des services de santé à proximité, mais j'ai besoin de votre emplacement d'abord. Souhaitez-vous partager votre emplacement?",
        ar: "أود مساعدتك في العثور على خدمات الرعاية الصحية القريبة، ولكنني بحاجة إلى موقعك أولاً. هل ترغب في مشاركة موقعك؟"
      };
      return responses[language as keyof typeof responses];
    }
    
    // Determine what type of service they're looking for
    let serviceType = 'healthcare provider';
    if (entities.includes('doctor') || entities.includes('specialist')) {
      serviceType = 'doctor';
    } else if (entities.includes('hospital') || entities.includes('clinic')) {
      serviceType = 'hospital';
    } else if (entities.includes('pharmacy')) {
      serviceType = 'pharmacy';
    }
    
    // Check for specialty
    const specialties = [
      'cardiology', 'dermatology', 'neurology', 'pediatrics', 
      'orthopedics', 'gynecology', 'ophthalmology', 'psychiatry'
    ];
    const specialty = entities.find(e => specialties.includes(e));
    
    const responses = {
      en: [
        `I'll find ${specialty ? specialty + ' ' : ''}${serviceType}s near your location. One moment please...`,
        `Searching for nearby ${specialty ? specialty + ' ' : ''}${serviceType}s based on your current location.`,
        `Looking for the closest ${specialty ? specialty + ' ' : ''}${serviceType}s to you...`
      ],
      fr: [
        `Je vais trouver des ${serviceType}s${specialty ? ' en ' + specialty : ''} près de votre emplacement. Un moment s'il vous plaît...`,
        `Recherche de ${serviceType}s${specialty ? ' en ' + specialty : ''} à proximité basée sur votre emplacement actuel.`,
        `Recherche des ${serviceType}s${specialty ? ' en ' + specialty : ''} les plus proches de vous...`
      ],
      ar: [
        `سأجد ${specialty ? specialty + ' ' : ''}${serviceType} بالقرب من موقعك. لحظة من فضلك...`,
        `البحث عن ${specialty ? specialty + ' ' : ''}${serviceType} القريبة بناءً على موقعك الحالي.`,
        `البحث عن أقرب ${specialty ? specialty + ' ' : ''}${serviceType} إليك...`
      ]
    };
    
    const responseArray = responses[language as keyof typeof responses];
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  }

  private async performSiteSearch(query: string): Promise<any[]> {
    // Extract search term from query
    const searchTerm = query.toLowerCase().replace(/search( for)?|find|look for/gi, '').trim();
    
    if (!searchTerm) return [];
    
    // Search the index
    return this.siteSearchIndex.filter(item => {
      return item.title.toLowerCase().includes(searchTerm) || 
             item.content.toLowerCase().includes(searchTerm);
    });
  }

  private formatSearchResults(results: any[]): string {
    if (results.length === 0) {
      return "I couldn't find any information about that on our site. Can you try rephrasing your search or ask me something else?";
    }
    
    let response = "Here's what I found on our site:\n\n";
    
    results.forEach((result, index) => {
      response += `${index + 1}. **${result.title}**\n`;
      response += `   ${result.content}\n`;
      response += `   [View page](${result.path})\n\n`;
    });
    
    response += "Is there anything specific from these results you'd like to know more about?";
    
    return response;
  }
}

export const chatbotService = new AdvancedChatbotService();