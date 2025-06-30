import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  PhoneCall, 
  Shield, 
  Heart, 
  Brain, 
  Users, 
  Lock, 
  Info,
  X,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SpecializedBookingForm, { SpecializedBookingData } from './SpecializedBookingForm';

interface SpecializedAppointmentIntegrationProps {
  doctorId: string;
  doctorName: string;
  specialty: 'Psychiatry' | 'Sexology';
  onBookingSubmit: (bookingData: SpecializedBookingData) => void;
  onClose?: () => void;
}

const SpecializedAppointmentIntegration: React.FC<SpecializedAppointmentIntegrationProps> = ({
  doctorId,
  doctorName,
  specialty,
  onBookingSubmit,
  onClose
}) => {
  const { user } = useAuth();
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

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
    },
    sexualAssault: {
      name: 'Sexual Assault Hotline',
      phone: '1-800-656-4673',
      description: 'RAINN - National Sexual Assault Hotline'
    },
    domesticViolence: {
      name: 'Domestic Violence Hotline',
      phone: '1-800-799-7233',
      description: 'National Domestic Violence Hotline'
    }
  };

  // Specialized resources based on specialty
  const specializedResources = {
    Psychiatry: ['national', 'local', 'lgbtq'],
    Sexology: ['national', 'local', 'lgbtq', 'sexualAssault', 'domesticViolence']
  };

  const resourcesToShow = specializedResources[specialty];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleBookingSubmit = (bookingData: SpecializedBookingData) => {
    // Add specialized metadata to the booking
    const enhancedBookingData = {
      ...bookingData,
      specializedFeatures: {
        isAnonymous: bookingData.isAnonymous,
        therapyType: bookingData.therapyType,
        sensitiveIssues: bookingData.sensitiveIssues,
        urgency: bookingData.urgency,
        hasEmergencyContact: !!bookingData.emergencyContact.name,
        crisisSupportRequested: bookingData.crisisSupport
      }
    };
    
    onBookingSubmit(enhancedBookingData);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Specialized {specialty} Appointment
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dr. {doctorName} - Enhanced privacy and specialized care options
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <SpecializedBookingForm
              doctorId={doctorId}
              doctorName={doctorName}
              specialty={specialty}
              onBookingSubmit={handleBookingSubmit}
              onClose={onClose}
            />
          </div>

          {/* Sidebar with Specialized Features */}
          <div className="space-y-6">
            {/* Privacy & Confidentiality */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Enhanced Privacy
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Anonymous booking option</li>
                    <li>• HIPAA-compliant data protection</li>
                    <li>• Secure communication channels</li>
                    <li>• Confidential therapy sessions</li>
                  </ul>
                  <button
                    onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 hover:underline"
                  >
                    Learn more about privacy
                  </button>
                </div>
              </div>
            </div>

            {/* Crisis Support */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">
                    Crisis Support
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                    Immediate help is available 24/7 if you're in crisis.
                  </p>
                  <button
                    onClick={() => setShowCrisisSupport(!showCrisisSupport)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    View Crisis Resources
                  </button>
                </div>
              </div>
            </div>

            {/* Specialized Features */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Specialized Features
                  </h3>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Therapy type selection</li>
                    <li>• Sensitive issue tagging</li>
                    <li>• Urgency level assessment</li>
                    <li>• Emergency contact setup</li>
                    <li>• Crisis support integration</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                    What to Expect
                  </h3>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• Initial consultation call</li>
                    <li>• Treatment plan discussion</li>
                    <li>• Privacy preferences setup</li>
                    <li>• Emergency protocols review</li>
                    <li>• Follow-up scheduling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Support Modal */}
        <AnimatePresence>
          {showCrisisSupport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Crisis Support Available
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Immediate help is available 24/7
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCrisisSupport(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Emergency Message */}
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">
                          You're Not Alone
                        </h3>
                        <p className="text-sm text-red-800 dark:text-red-200">
                          If you're experiencing a crisis or having thoughts of self-harm, 
                          please reach out to one of these resources immediately. 
                          Trained professionals are available 24/7 to help you.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Crisis Resources */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Crisis Support Resources
                    </h3>
                    
                    {resourcesToShow.map((resourceKey) => {
                      const resource = crisisResources[resourceKey as keyof typeof crisisResources];
                      
                      return (
                        <motion.div
                          key={resourceKey}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {resource.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {resource.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                Available: 24/7
                              </p>
                            </div>
                            
                            <div className="flex flex-col space-y-2">
                              <button
                                onClick={() => handleCall(resource.phone)}
                                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                              >
                                <PhoneCall className="w-4 h-4" />
                                <span>Call</span>
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-3 text-center">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {resource.phone}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Emergency Services */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      If You're in Immediate Danger
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <h5 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                          Emergency Services
                        </h5>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                          If you're in immediate danger, call emergency services:
                        </p>
                        <button
                          onClick={() => handleCall('911')}
                          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Call 911
                        </button>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">
                          Go to Emergency Room
                        </h5>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          If you're having thoughts of self-harm, go to your nearest emergency room for immediate help.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setShowCrisisSupport(false)}
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy Info Modal */}
        <AnimatePresence>
          {showPrivacyInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Privacy & Confidentiality
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your privacy is our top priority
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPrivacyInfo(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Privacy Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        HIPAA Compliance
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All patient information is protected under the Health Insurance Portability and Accountability Act (HIPAA). 
                        We maintain strict confidentiality standards and secure data practices.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Anonymous Booking
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        For privacy-sensitive specialties, you can choose to book appointments anonymously. 
                        Your real name will be hidden from the doctor until you choose to reveal it.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Secure Communication
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All communications are encrypted and secure. We use industry-standard security protocols 
                        to protect your personal and medical information.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Data Protection
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your data is stored securely and only accessed by authorized personnel. 
                        We never share your information with third parties without your explicit consent.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Your Rights
                      </h3>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Access your medical records</li>
                        <li>• Request corrections to your information</li>
                        <li>• Choose how you receive communications</li>
                        <li>• Opt out of certain data sharing</li>
                        <li>• File a complaint about privacy practices</li>
                      </ul>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setShowPrivacyInfo(false)}
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpecializedAppointmentIntegration; 