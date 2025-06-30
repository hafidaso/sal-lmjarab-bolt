import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clipboard, Clock, DollarSign, Shield, AlertTriangle, CheckCircle, Building, Star, MapPin, ArrowRight, FileText, HelpCircle, Users, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface Procedure {
  id: string;
  name: string;
  description: string;
  preparationSteps: string[];
  recoveryInfo: {
    hospitalStay: string;
    totalRecovery: string;
    painLevel: 'Mild' | 'Moderate' | 'Severe';
    returnToWork: string;
    physicalRestrictions: string[];
  };
  risks: string[];
  benefits: string[];
  expectedOutcomes: string[];
  costInfo: {
    averageCost: string;
    costRange: string;
    insuranceCoverage: string;
  };
  insuranceCodes: {
    cpt: string;
    icd10: string;
  };
}

interface TopFacility {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
  location: string;
  successRate: number;
  proceduresPerYear: number;
  image: string;
}

interface Specialist {
  id: string;
  name: string;
  title: string;
  hospital: string;
  experience: number;
  proceduresPerformed: number;
  rating: number;
  image: string;
}

const ProcedureDetail = () => {
  const { procedureId } = useParams<{ procedureId: string }>();
  const [loading, setLoading] = useState(true);
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [topFacilities, setTopFacilities] = useState<TopFacility[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call to fetch procedure data
    setLoading(true);
    setTimeout(() => {
      const procedureData = getProcedureData(procedureId || '');
      setProcedure(procedureData);
      setTopFacilities(getMockTopFacilities());
      setSpecialists(getMockSpecialists());
      setLoading(false);
    }, 1000);
  }, [procedureId]);

  const getProcedureData = (id: string): Procedure => {
    const procedures = {
      'appendectomy': {
        id: 'appendectomy',
        name: 'Appendectomy',
        description: 'An appendectomy is the surgical removal of the appendix, a small pouch attached to the large intestine. This procedure is typically performed as an emergency surgery when the appendix becomes inflamed or infected (appendicitis).',
        preparationSteps: [
          'Fast for 8 hours before surgery',
          'Stop certain medications as advised by your doctor',
          'Arrange for someone to drive you home after surgery',
          'Follow any additional instructions from your surgical team'
        ],
        recoveryInfo: {
          hospitalStay: '1-2 days for open surgery, same day for laparoscopic',
          totalRecovery: '2-4 weeks',
          painLevel: 'Moderate',
          returnToWork: '1-3 weeks depending on job requirements',
          physicalRestrictions: [
            'No heavy lifting (>10 lbs) for 2 weeks',
            'Gradual return to normal activities',
            'No driving while taking narcotic pain medication'
          ]
        },
        risks: [
          'Infection at the incision site',
          'Bleeding',
          'Intestinal blockage',
          'Injury to nearby organs',
          'Reaction to anesthesia'
        ],
        benefits: [
          'Removal of infected appendix prevents rupture and peritonitis',
          'Resolves appendicitis symptoms',
          'Prevents future appendicitis episodes'
        ],
        expectedOutcomes: [
          'Complete resolution of appendicitis symptoms',
          'Return to normal activities within 2-4 weeks',
          'No long-term impact on digestion or immune function'
        ],
        costInfo: {
          averageCost: '15,000 - 25,000 MAD',
          costRange: '10,000 - 40,000 MAD depending on hospital and technique',
          insuranceCoverage: 'Typically covered by CNSS, RAMED, and private insurance as an emergency procedure'
        },
        insuranceCodes: {
          cpt: '44950 (open) or 44970 (laparoscopic)',
          icd10: 'K35.80 (unspecified appendicitis)'
        }
      },
      'back-neck-surgery': {
        id: 'back-neck-surgery',
        name: 'Back/Neck Surgery',
        description: 'Back and neck surgeries encompass various procedures to address spinal conditions such as herniated discs, spinal stenosis, degenerative disc disease, and spinal instability. These surgeries aim to relieve pain, restore function, and improve quality of life.',
        preparationSteps: [
          'Complete all required imaging studies (MRI, CT scan, X-rays)',
          'Stop smoking at least 2 weeks before surgery',
          'Stop certain medications as advised by your doctor',
          'Fast for 8-12 hours before surgery',
          'Prepare your home for recovery (bedroom on main floor, grab bars in bathroom)'
        ],
        recoveryInfo: {
          hospitalStay: '1-5 days depending on procedure complexity',
          totalRecovery: '3-12 months for full recovery',
          painLevel: 'Moderate to Severe',
          returnToWork: '4-6 weeks for desk jobs, 3-6 months for physical jobs',
          physicalRestrictions: [
            'No bending, lifting, or twisting for 6 weeks',
            'No driving for 2-4 weeks',
            'Wear back brace if prescribed',
            'Follow specific physical therapy protocol'
          ]
        },
        risks: [
          'Infection',
          'Bleeding',
          'Nerve damage',
          'Spinal fluid leak',
          'Failed back surgery syndrome',
          'Blood clots',
          'Reaction to anesthesia',
          'Adjacent segment disease'
        ],
        benefits: [
          'Pain relief',
          'Improved mobility and function',
          'Correction of spinal deformity',
          'Prevention of neurological deterioration',
          'Improved quality of life'
        ],
        expectedOutcomes: [
          'Significant reduction in pain (70-90% of patients)',
          'Improved mobility and function',
          'Return to most normal activities within 3-6 months',
          'Some patients may require ongoing pain management'
        ],
        costInfo: {
          averageCost: '50,000 - 120,000 MAD',
          costRange: '30,000 - 200,000 MAD depending on procedure complexity and hospital',
          insuranceCoverage: 'Typically covered by CNSS and private insurance with prior authorization; RAMED coverage may be limited'
        },
        insuranceCodes: {
          cpt: 'Multiple codes depending on specific procedure',
          icd10: 'Multiple codes depending on diagnosis'
        }
      },
      'bariatric-surgery': {
        id: 'bariatric-surgery',
        name: 'Bariatric Surgery',
        description: 'Bariatric surgery includes several procedures that help with weight loss by making changes to the digestive system. These procedures are typically performed when diet and exercise haven\'t worked or when serious health problems related to obesity are present.',
        preparationSteps: [
          'Complete a comprehensive medical evaluation',
          'Follow a specific pre-surgery diet (typically 2-3 weeks)',
          'Stop smoking at least 6 weeks before surgery',
          'Attend nutritional counseling sessions',
          'Undergo psychological evaluation',
          'Complete required lab tests and imaging studies'
        ],
        recoveryInfo: {
          hospitalStay: '1-3 days depending on procedure',
          totalRecovery: '4-6 weeks for initial recovery, lifestyle changes are permanent',
          painLevel: 'Moderate',
          returnToWork: '1-3 weeks for desk jobs, 3-6 weeks for physical jobs',
          physicalRestrictions: [
            'No heavy lifting (>10 lbs) for 4-6 weeks',
            'Gradual return to physical activity',
            'Follow specific dietary progression (liquid to pureed to soft to regular foods)'
          ]
        },
        risks: [
          'Bleeding',
          'Infection',
          'Adverse reactions to anesthesia',
          'Blood clots',
          'Leaks in your gastrointestinal system',
          'Bowel obstruction',
          'Dumping syndrome',
          'Malnutrition',
          'Gallstones',
          'Hernias',
          'Need for follow-up procedures'
        ],
        benefits: [
          'Significant weight loss (typically 60-80% of excess weight)',
          'Improvement or resolution of obesity-related conditions (diabetes, hypertension, sleep apnea)',
          'Improved mobility and quality of life',
          'Reduced joint pain',
          'Improved fertility and pregnancy outcomes',
          'Reduced mortality risk'
        ],
        expectedOutcomes: [
          'Loss of 60-80% of excess weight within 1-2 years',
          'Improvement or resolution of many obesity-related conditions',
          'Need for lifelong vitamin and mineral supplementation',
          'Requirement for lifelong dietary and lifestyle changes',
          'Regular follow-up with healthcare providers'
        ],
        costInfo: {
          averageCost: '60,000 - 90,000 MAD',
          costRange: '50,000 - 120,000 MAD depending on procedure and hospital',
          insuranceCoverage: 'Coverage varies; may require documentation of medical necessity and completion of medically supervised weight loss program'
        },
        insuranceCodes: {
          cpt: '43644 (gastric bypass), 43775 (sleeve gastrectomy), 43770 (gastric banding)',
          icd10: 'E66.01 (morbid obesity)'
        }
      },
      'carotid-surgery': {
        id: 'carotid-surgery',
        name: 'Carotid Surgery',
        description: 'Carotid surgery, primarily carotid endarterectomy (CEA), is a procedure to remove plaque buildup from the carotid arteries in the neck. These arteries supply blood to the brain, and blockages can increase the risk of stroke.',
        preparationSteps: [
          'Complete carotid ultrasound, CT angiography, or MR angiography',
          'Stop blood thinners as directed by your doctor',
          'Fast for 8 hours before surgery',
          'Stop smoking at least 2 weeks before surgery',
          'Inform your doctor of all medications and supplements'
        ],
        recoveryInfo: {
          hospitalStay: '1-2 days',
          totalRecovery: '2-4 weeks',
          painLevel: 'Mild to Moderate',
          returnToWork: '1-2 weeks for desk jobs, 2-4 weeks for physical jobs',
          physicalRestrictions: [
            'No heavy lifting for 2 weeks',
            'No driving for 1-2 weeks',
            'Avoid straining neck for 2-3 weeks',
            'Gradual return to normal activities'
          ]
        },
        risks: [
          'Stroke during or after surgery (1-3% risk)',
          'Heart attack',
          'Bleeding',
          'Infection',
          'Nerve injury (may affect voice, tongue, or facial movement)',
          'Restenosis (recurrent narrowing of the artery)',
          'Reaction to anesthesia'
        ],
        benefits: [
          'Reduced risk of stroke',
          'Improved blood flow to the brain',
          'Long-term stroke prevention',
          'Relief of symptoms (if present)'
        ],
        expectedOutcomes: [
          'Significant reduction in stroke risk (by approximately 50-70%)',
          'Resolution of symptoms like TIAs (mini-strokes) if present',
          'Need for ongoing management of cardiovascular risk factors',
          'Regular follow-up ultrasounds to monitor carotid arteries'
        ],
        costInfo: {
          averageCost: '40,000 - 70,000 MAD',
          costRange: '35,000 - 90,000 MAD depending on hospital and technique',
          insuranceCoverage: 'Typically covered by CNSS and private insurance; RAMED coverage may be limited'
        },
        insuranceCodes: {
          cpt: '35301 (carotid endarterectomy)',
          icd10: 'I65.21-I65.29 (occlusion and stenosis of carotid arteries)'
        }
      }
    };
    
    return procedures[id as keyof typeof procedures] || {
      id,
      name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      description: 'A medical procedure to diagnose or treat a health condition.',
      preparationSteps: ['Consult with your doctor for specific preparation instructions'],
      recoveryInfo: {
        hospitalStay: 'Varies',
        totalRecovery: 'Varies',
        painLevel: 'Moderate',
        returnToWork: 'Consult with your doctor',
        physicalRestrictions: ['Follow your doctor\'s recommendations']
      },
      risks: ['Discuss potential risks with your healthcare provider'],
      benefits: ['Discuss potential benefits with your healthcare provider'],
      expectedOutcomes: ['Outcomes vary based on individual factors'],
      costInfo: {
        averageCost: 'Varies',
        costRange: 'Consult with your healthcare provider and insurance',
        insuranceCoverage: 'Coverage varies by insurance plan'
      },
      insuranceCodes: {
        cpt: 'Varies',
        icd10: 'Varies'
      }
    };
  };

  const getMockTopFacilities = (): TopFacility[] => {
    return [
      {
        id: '1',
        name: 'CHU Ibn Rochd',
        type: 'University Hospital',
        rating: 4.8,
        reviewCount: 1247,
        location: 'Casablanca',
        successRate: 94,
        proceduresPerYear: 450,
        image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '2',
        name: 'Hôpital Cheikh Khalifa',
        type: 'Specialty Hospital',
        rating: 4.7,
        reviewCount: 986,
        location: 'Casablanca',
        successRate: 92,
        proceduresPerYear: 380,
        image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '3',
        name: 'Clinique Internationale de Marrakech',
        type: 'Private Clinic',
        rating: 4.6,
        reviewCount: 723,
        location: 'Marrakech',
        successRate: 91,
        proceduresPerYear: 320,
        image: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ];
  };

  const getMockSpecialists = (): Specialist[] => {
    return [
      {
        id: '1',
        name: 'Dr. Ahmed Bennani',
        title: 'Chief of Surgery',
        hospital: 'CHU Ibn Rochd',
        experience: 15,
        proceduresPerformed: 1200,
        rating: 4.9,
        image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '2',
        name: 'Dr. Fatima Alaoui',
        title: 'Senior Surgeon',
        hospital: 'Hôpital Cheikh Khalifa',
        experience: 12,
        proceduresPerformed: 950,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: '3',
        name: 'Dr. Youssef Tazi',
        title: 'Surgical Director',
        hospital: 'Clinique Internationale de Marrakech',
        experience: 18,
        proceduresPerformed: 1500,
        rating: 4.7,
        image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!procedure) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Procedure not found</h1>
            <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/procedures" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Procedures
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{procedure.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
              <Clipboard className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {procedure.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {procedure.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'preparation', label: 'Preparation' },
                { id: 'recovery', label: 'Recovery' },
                { id: 'risks-benefits', label: 'Risks & Benefits' },
                { id: 'cost', label: 'Cost & Insurance' },
                { id: 'facilities', label: 'Top Facilities' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    About {procedure.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {procedure.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Recovery Time
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {procedure.recoveryInfo.totalRecovery}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Average Cost
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {procedure.costInfo.averageCost}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Insurance Coverage
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {procedure.costInfo.insuranceCoverage}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Expected Outcomes
                    </h3>
                    <ul className="space-y-2">
                      {procedure.expectedOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Top Specialists
                    </h3>
                    <div className="space-y-4">
                      {specialists.slice(0, 2).map((specialist) => (
                        <div key={specialist.id} className="flex items-center space-x-3">
                          <img
                            src={specialist.image}
                            alt={specialist.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {specialist.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {specialist.hospital} • {specialist.proceduresPerformed}+ procedures
                            </p>
                          </div>
                        </div>
                      ))}
                      <Link
                        to="#facilities"
                        onClick={() => setActiveTab('facilities')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View all specialists
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preparation' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Preparation Guidelines
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Proper preparation is essential for a successful {procedure.name}. Follow these guidelines and any specific instructions from your healthcare provider.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Before Your Procedure
                    </h3>
                    <ul className="space-y-4">
                      {procedure.preparationSteps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                        Questions to Ask Your Doctor
                      </h3>
                    </div>
                    <ul className="space-y-2 text-blue-700 dark:text-blue-400">
                      <li>• What are the specific risks for someone with my medical history?</li>
                      <li>• What type of anesthesia will be used?</li>
                      <li>• How many of these procedures have you performed?</li>
                      <li>• What are the alternative treatment options?</li>
                      <li>• What can I expect during recovery?</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                        Important Reminders
                      </h3>
                    </div>
                    <ul className="space-y-2 text-yellow-700 dark:text-yellow-400">
                      <li>• Bring a complete list of your medications</li>
                      <li>• Inform your doctor of any allergies</li>
                      <li>• Arrange for someone to drive you home</li>
                      <li>• Remove jewelry, contact lenses, and dentures before surgery</li>
                      <li>• Follow all fasting instructions precisely</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recovery' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Recovery Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Understanding what to expect during recovery can help you prepare and heal properly after your {procedure.name}.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <Building className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Hospital Stay</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {procedure.recoveryInfo.hospitalStay}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Total Recovery</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {procedure.recoveryInfo.totalRecovery}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Pain Level</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {procedure.recoveryInfo.painLevel}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Return to Work</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {procedure.recoveryInfo.returnToWork}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Physical Restrictions
                    </h3>
                    <ul className="space-y-2">
                      {procedure.recoveryInfo.physicalRestrictions.map((restriction, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <h3 className="font-semibold text-green-800 dark:text-green-300">
                        Recovery Tips
                      </h3>
                    </div>
                    <ul className="space-y-2 text-green-700 dark:text-green-400">
                      <li>• Follow your doctor's pain management plan</li>
                      <li>• Keep incision sites clean and dry</li>
                      <li>• Attend all follow-up appointments</li>
                      <li>• Follow dietary recommendations</li>
                      <li>• Gradually increase activity as advised</li>
                      <li>• Report any unusual symptoms immediately</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <h3 className="font-semibold text-red-800 dark:text-red-300">
                        When to Seek Medical Attention
                      </h3>
                    </div>
                    <ul className="space-y-2 text-red-700 dark:text-red-400">
                      <li>• Fever above 38°C (100.4°F)</li>
                      <li>• Increasing pain not relieved by medication</li>
                      <li>• Redness, swelling, or discharge from incision</li>
                      <li>• Difficulty breathing</li>
                      <li>• Severe headache or vision changes</li>
                      <li>• Persistent nausea or vomiting</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'risks-benefits' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      Potential Risks
                    </h2>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                      <ul className="space-y-3">
                        {procedure.risks.map((risk, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-red-600 dark:text-red-400">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{risk}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                        Note: The likelihood of these risks varies based on individual factors such as age, overall health, and specific medical conditions. Discuss your personal risk profile with your healthcare provider.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Potential Benefits
                    </h2>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <ul className="space-y-3">
                        {procedure.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-600 dark:text-green-400">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                        The benefits of this procedure should be weighed against the potential risks. Your healthcare provider can help you make an informed decision based on your specific situation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Expected Outcomes
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <ul className="space-y-3">
                      {procedure.expectedOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Individual results may vary. Factors such as age, overall health, adherence to recovery guidelines, and the severity of your condition can all affect outcomes.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                      Making an Informed Decision
                    </h3>
                  </div>
                  <p className="text-blue-700 dark:text-blue-400 mb-4">
                    It's important to have a thorough discussion with your healthcare provider about the risks and benefits of {procedure.name} as they relate to your specific situation. Consider getting a second opinion before making your decision.
                  </p>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      Find a Specialist
                    </button>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg text-sm font-medium transition-colors">
                      Learn About Alternatives
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cost' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Cost Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Understanding the costs associated with {procedure.name} can help you plan financially for your procedure.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Average Cost</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {procedure.costInfo.averageCost}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Cost Range</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {procedure.costInfo.costRange}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <CreditCard className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Insurance Codes</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        CPT: {procedure.insuranceCodes.cpt}<br />
                        ICD-10: {procedure.insuranceCodes.icd10}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Insurance Coverage
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {procedure.costInfo.insuranceCoverage}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm text-blue-700 dark:text-blue-300">CNSS Coverage</span>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-green-700 dark:text-green-300">RAMED Coverage</span>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm text-purple-700 dark:text-purple-300">Private Insurance</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                        Additional Costs to Consider
                      </h3>
                    </div>
                    <ul className="space-y-2 text-yellow-700 dark:text-yellow-400">
                      <li>• Pre-operative tests and consultations</li>
                      <li>• Anesthesia fees</li>
                      <li>• Hospital stay (if required)</li>
                      <li>• Post-operative medications</li>
                      <li>• Follow-up appointments</li>
                      <li>• Physical therapy (if needed)</li>
                      <li>• Medical equipment for recovery</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                        Financial Assistance Options
                      </h3>
                    </div>
                    <ul className="space-y-2 text-blue-700 dark:text-blue-400">
                      <li>• Hospital payment plans</li>
                      <li>• Medical loans</li>
                      <li>• Charitable organizations</li>
                      <li>• Government assistance programs</li>
                      <li>• Discounts for upfront payment</li>
                    </ul>
                    <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Learn more about financial assistance
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Top-Rated Facilities for {procedure.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    These hospitals and clinics have been ranked based on success rates, patient outcomes, and specialist expertise for {procedure.name}.
                  </p>
                  
                  <div className="space-y-6">
                    {topFacilities.map((facility) => (
                      <motion.div
                        key={facility.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/4">
                            <div className="relative">
                              <img
                                src={facility.image}
                                alt={facility.name}
                                className="w-full h-48 md:h-full object-cover rounded-lg"
                              />
                              <div className="absolute top-3 left-3 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                {facility.id}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                  {facility.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                  {facility.type}
                                </p>
                                
                                <div className="flex items-center space-x-4 mb-2">
                                  <div className="flex items-center space-x-1">
                                    {renderStars(facility.rating)}
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                      {facility.rating} ({facility.reviewCount} reviews)
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-1 mb-4">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {facility.location}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                    {facility.successRate}%
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Success Rate
                                  </div>
                                </div>
                                
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                    {facility.proceduresPerYear}+
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Procedures/Year
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Link
                                to={`/hospital/${facility.id}`}
                                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors"
                              >
                                View Facility Profile
                              </Link>
                              <button className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 px-4 py-2 rounded-lg font-medium transition-colors">
                                Request Consultation
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Leading Specialists
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {specialists.map((specialist) => (
                      <motion.div
                        key={specialist.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col items-center text-center">
                          <img
                            src={specialist.image}
                            alt={specialist.name}
                            className="w-24 h-24 rounded-full object-cover mb-4"
                          />
                          
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {specialist.name}
                          </h3>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {specialist.title}
                          </p>
                          
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            {specialist.hospital} • {specialist.experience} years experience
                          </p>
                          
                          <div className="flex items-center space-x-1 mb-4">
                            {renderStars(specialist.rating)}
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {specialist.rating}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {specialist.proceduresPerformed}+ procedures performed
                          </p>
                          
                          <Link
                            to={`/doctor/${specialist.id}`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            View Profile
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Patient Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Patient Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Educational Materials
                </h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Understanding {procedure.name}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Pre-operative Preparation Guide</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Recovery Timeline and Tips</span>
                </li>
              </ul>
              
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Download Materials
              </button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Financial Resources
                </h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Insurance Coverage Guide</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Cost Estimation Calculator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Financial Assistance Programs</span>
                </li>
              </ul>
              
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Explore Financial Options
              </button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Support Resources
                </h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Patient Support Groups</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Recovery Assistance Services</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                  <span>Mental Health Resources</span>
                </li>
              </ul>
              
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Find Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcedureDetail;