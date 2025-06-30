import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Users, 
  Lock, 
  Phone,
  MessageCircle,
  Info,
  CheckCircle,
  XCircle,
  Plus,
  X,
  AlertCircle,
  PhoneCall,
  LifeBuoy,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SpecializedBookingFormProps {
  doctorId: string;
  doctorName: string;
  specialty: 'Psychiatry' | 'Sexology';
  onBookingSubmit: (bookingData: SpecializedBookingData) => void;
  onClose?: () => void;
}

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

const SpecializedBookingForm: React.FC<SpecializedBookingFormProps> = ({
  doctorId,
  doctorName,
  specialty,
  onBookingSubmit,
  onClose
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SpecializedBookingData>({
    doctorId,
    patientName: user?.displayName || '',
    isAnonymous: false,
    contactEmail: user?.email || '',
    contactPhone: '',
    therapyType: '',
    sensitiveIssues: [],
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    crisisSupport: false,
    notes: '',
    preferredContactMethod: 'email',
    previousTherapy: false,
    currentMedications: [],
    urgency: 'medium',
    anonymousDisplayName: '',
    consentToAnonymous: false
  });

  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  const [newMedication, setNewMedication] = useState('');
  const [newSensitiveIssue, setNewSensitiveIssue] = useState('');
  const [showAnonymousInfo, setShowAnonymousInfo] = useState(false);

  // Therapy types based on specialty
  const therapyTypes = {
    Psychiatry: [
      'Cognitive Behavioral Therapy (CBT)',
      'Dialectical Behavior Therapy (DBT)',
      'Psychoanalysis',
      'Psychodynamic Therapy',
      'Interpersonal Therapy',
      'Family Therapy',
      'Group Therapy',
      'Trauma-Focused Therapy',
      'Mindfulness-Based Therapy',
      'Medication Management',
      'Exposure Therapy',
      'Acceptance and Commitment Therapy (ACT)',
      'Eye Movement Desensitization and Reprocessing (EMDR)',
      'Art Therapy',
      'Music Therapy'
    ],
    Sexology: [
      'Individual Sex Therapy',
      'Couples Therapy',
      'Relationship Counseling',
      'Sexual Dysfunction Treatment',
      'Gender Identity Support',
      'LGBTQ+ Affirmative Therapy',
      'Trauma-Informed Sex Therapy',
      'Intimacy Coaching',
      'Sexual Education',
      'Premarital Counseling',
      'Postpartum Sexual Health',
      'Sexual Addiction Treatment',
      'Body Image Therapy',
      'Communication Skills Training',
      'Sexual Trauma Recovery'
    ]
  };

  // Sensitive issue tags
  const sensitiveIssueOptions = {
    Psychiatry: [
      'Depression',
      'Anxiety',
      'Trauma/PTSD',
      'Suicidal Thoughts',
      'Self-Harm',
      'Eating Disorders',
      'Substance Abuse',
      'Bipolar Disorder',
      'Schizophrenia',
      'OCD',
      'ADHD',
      'Autism Spectrum',
      'Grief & Loss',
      'Work Stress',
      'Relationship Issues',
      'Family Conflict',
      'LGBTQ+ Issues',
      'Cultural Issues',
      'Religious Concerns',
      'Financial Stress',
      'Borderline Personality Disorder',
      'Dissociative Disorders',
      'Panic Attacks',
      'Social Anxiety',
      'Insomnia'
    ],
    Sexology: [
      'Erectile Dysfunction',
      'Premature Ejaculation',
      'Low Libido',
      'Painful Intercourse',
      'Orgasm Difficulties',
      'Sexual Trauma',
      'Gender Dysphoria',
      'LGBTQ+ Issues',
      'Relationship Conflicts',
      'Communication Issues',
      'Intimacy Problems',
      'Sexual Orientation',
      'Body Image Issues',
      'Sexual Education',
      'Cultural/Religious Concerns',
      'Performance Anxiety',
      'Sexual Addiction',
      'Infidelity',
      'Divorce/Separation',
      'Premarital Issues',
      'Postpartum Sexual Changes',
      'Menopause-Related Issues',
      'Sexual Identity',
      'Kink/BDSM Support',
      'Polyamory/Open Relationships'
    ]
  };

  // Crisis support resources
  const crisisResources = {
    national: {
      name: 'National Crisis Hotline',
      phone: '988',
      description: '24/7 suicide and crisis lifeline'
    },
    local: {
      name: 'Local Crisis Center',
      phone: '1-800-273-8255',
      description: 'Emergency mental health support'
    },
    lgbtq: {
      name: 'LGBTQ+ Crisis Line',
      phone: '1-866-488-7386',
      description: 'Specialized support for LGBTQ+ community'
    }
  };

  const handleInputChange = (field: keyof SpecializedBookingData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field: keyof typeof formData.emergencyContact, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const addSensitiveIssue = () => {
    if (newSensitiveIssue.trim() && !formData.sensitiveIssues.includes(newSensitiveIssue.trim())) {
      setFormData(prev => ({
        ...prev,
        sensitiveIssues: [...prev.sensitiveIssues, newSensitiveIssue.trim()]
      }));
      setNewSensitiveIssue('');
    }
  };

  const removeSensitiveIssue = (issue: string) => {
    setFormData(prev => ({
      ...prev,
      sensitiveIssues: prev.sensitiveIssues.filter(i => i !== issue)
    }));
  };

  const addMedication = () => {
    if (newMedication.trim() && !formData.currentMedications.includes(newMedication.trim())) {
      setFormData(prev => ({
        ...prev,
        currentMedications: [...prev.currentMedications, newMedication.trim()]
      }));
      setNewMedication('');
    }
  };

  const removeMedication = (medication: string) => {
    setFormData(prev => ({
      ...prev,
      currentMedications: prev.currentMedications.filter(m => m !== medication)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate anonymous booking requirements
    if (formData.isAnonymous && !formData.consentToAnonymous) {
      alert('Please consent to anonymous booking to proceed.');
      return;
    }
    
    if (formData.isAnonymous && !formData.anonymousDisplayName?.trim()) {
      alert('Please provide an anonymous display name.');
      return;
    }
    
    onBookingSubmit(formData);
  };

  const isFormValid = () => {
    return (
      (formData.isAnonymous || formData.patientName.trim()) &&
      formData.contactEmail.trim() &&
      formData.therapyType &&
      (formData.urgency !== 'crisis' || formData.crisisSupport) &&
      (!formData.isAnonymous || (formData.consentToAnonymous && formData.anonymousDisplayName?.trim()))
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Specialized Booking - {specialty}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dr. {doctorName}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XCircle className="w-6 h-6" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Privacy & Anonymity Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Privacy & Confidentiality
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  Your privacy is our top priority. All information is kept strictly confidential and protected by HIPAA regulations.
                </p>
                
                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 mt-0.5"
                    />
                    <div>
                      <span className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                        Book anonymously
                      </span>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        Your name will be hidden from the doctor until you choose to reveal it. You'll use an anonymous display name for communication.
                      </p>
                    </div>
                  </label>

                  {formData.isAnonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-7 space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Anonymous Display Name *
                        </label>
                        <input
                          type="text"
                          value={formData.anonymousDisplayName || ''}
                          onChange={(e) => handleInputChange('anonymousDisplayName', e.target.value)}
                          className="w-full px-3 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="e.g., Patient123, Anonymous, or any name you prefer"
                        />
                      </div>

                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.consentToAnonymous}
                          onChange={(e) => handleInputChange('consentToAnonymous', e.target.checked)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 mt-0.5"
                        />
                        <div>
                          <span className="text-sm text-blue-800 dark:text-blue-200">
                            I consent to anonymous booking and understand the implications
                          </span>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                            You can reveal your identity to the doctor at any time during your treatment.
                          </p>
                        </div>
                      </label>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Patient Information
            </h3>
            
            {!formData.isAnonymous && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Therapy Type Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Therapy Type *
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {therapyTypes[specialty].map((therapyType) => (
                <label key={therapyType} className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="therapyType"
                    value={therapyType}
                    checked={formData.therapyType === therapyType}
                    onChange={(e) => handleInputChange('therapyType', e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{therapyType}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sensitive Issues */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Sensitive Issues (Optional)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Select issues that are relevant to your treatment. This helps the doctor prepare for your session.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
              {sensitiveIssueOptions[specialty].map((issue) => (
                <label key={issue} className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sensitiveIssues.includes(issue)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          sensitiveIssues: [...prev.sensitiveIssues, issue]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          sensitiveIssues: prev.sensitiveIssues.filter(i => i !== issue)
                        }));
                      }
                    }}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{issue}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSensitiveIssue}
                onChange={(e) => setNewSensitiveIssue(e.target.value)}
                placeholder="Add custom issue..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={addSensitiveIssue}
                className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {formData.sensitiveIssues.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.sensitiveIssues.map((issue) => (
                  <span
                    key={issue}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                  >
                    <span>{issue}</span>
                    <button
                      type="button"
                      onClick={() => removeSensitiveIssue(issue)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Urgency Level */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Urgency Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { value: 'low', label: 'Low', description: 'Routine consultation', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
                { value: 'medium', label: 'Medium', description: 'Moderate concern', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
                { value: 'high', label: 'High', description: 'Significant concern', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
                { value: 'crisis', label: 'Crisis', description: 'Immediate attention needed', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
              ].map((level) => (
                <label key={level.value} className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="urgency"
                    value={level.value}
                    checked={formData.urgency === level.value}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <div className={`text-sm font-medium px-2 py-1 rounded ${level.color}`}>
                      {level.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {level.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Crisis Support Section */}
          {formData.urgency === 'crisis' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">
                    Crisis Support Available
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                    If you're in immediate crisis, please consider these resources:
                  </p>
                  
                  <div className="space-y-2">
                    {Object.entries(crisisResources).map(([key, resource]) => (
                      <div key={key} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{resource.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</div>
                        </div>
                        <a
                          href={`tel:${resource.phone}`}
                          className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>{resource.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  <label className="flex items-center space-x-2 mt-3">
                    <input
                      type="checkbox"
                      checked={formData.crisisSupport}
                      onChange={(e) => handleInputChange('crisisSupport', e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-red-800 dark:text-red-200">
                      I understand and would like to proceed with booking
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Emergency Contact */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Emergency Contact (Optional)
              </h3>
              <button
                type="button"
                onClick={() => setShowEmergencyContact(!showEmergencyContact)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {showEmergencyContact ? 'Hide' : 'Add Emergency Contact'}
              </button>
            </div>
            
            {showEmergencyContact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., Spouse, Parent, Friend"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Additional Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Previous Therapy Experience
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.previousTherapy}
                    onChange={(e) => handleInputChange('previousTherapy', e.target.checked)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I have received therapy or counseling before
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Medications
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Add medication..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addMedication}
                    className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {formData.currentMedications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.currentMedications.map((medication) => (
                      <span
                        key={medication}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                      >
                        <span>{medication}</span>
                        <button
                          type="button"
                          onClick={() => removeMedication(medication)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'email', label: 'Email', icon: MessageCircle },
                    { value: 'phone', label: 'Phone', icon: Phone },
                    { value: 'secure-message', label: 'Secure Message', icon: Lock }
                  ].map((method) => (
                    <label key={method.value} className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value={method.value}
                        checked={formData.preferredContactMethod === method.value}
                        onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <method.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4}
                  placeholder="Any additional information you'd like to share with the doctor..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>All information is kept confidential and secure.</p>
              {formData.isAnonymous && (
                <p className="mt-1 text-blue-600 dark:text-blue-400">
                  ✓ Anonymous booking selected
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!isFormValid()}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecializedBookingForm; 