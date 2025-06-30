import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, MessageCircle, Heart, Shield, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CrisisSupportComponentProps {
  specialty?: 'Psychiatry' | 'Sexology';
  onClose?: () => void;
  showImmediate?: boolean;
}

const CrisisSupportComponent: React.FC<CrisisSupportComponentProps> = ({
  specialty,
  onClose,
  showImmediate = false
}) => {
  const [showDetails, setShowDetails] = useState(showImmediate);

  // Crisis support resources
  const crisisResources = {
    national: {
      name: 'National Crisis Hotline',
      phone: '988',
      description: '24/7 suicide and crisis lifeline',
      available: '24/7',
      icon: PhoneCall
    },
    local: {
      name: 'Local Crisis Center',
      phone: '1-800-273-8255',
      description: 'Emergency mental health support',
      available: '24/7',
      icon: Heart
    },
    lgbtq: {
      name: 'LGBTQ+ Crisis Line',
      phone: '1-866-488-7386',
      description: 'Specialized support for LGBTQ+ community',
      available: '24/7',
      icon: Heart
    },
    sexualAssault: {
      name: 'Sexual Assault Hotline',
      phone: '1-800-656-4673',
      description: 'RAINN - National Sexual Assault Hotline',
      available: '24/7',
      icon: Shield
    },
    domesticViolence: {
      name: 'Domestic Violence Hotline',
      phone: '1-800-799-7233',
      description: 'National Domestic Violence Hotline',
      available: '24/7',
      icon: Shield
    },
    substanceAbuse: {
      name: 'Substance Abuse Hotline',
      phone: '1-800-662-4357',
      description: 'SAMHSA National Helpline',
      available: '24/7',
      icon: MessageCircle
    }
  };

  // Specialized resources based on specialty
  const specializedResources = {
    Psychiatry: [
      'national',
      'local',
      'lgbtq',
      'substanceAbuse'
    ],
    Sexology: [
      'national',
      'local',
      'lgbtq',
      'sexualAssault',
      'domesticViolence'
    ]
  };

  const resourcesToShow = specialty 
    ? specializedResources[specialty] 
    : Object.keys(crisisResources);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleText = (phone: string) => {
    window.open(`sms:${phone}`, '_self');
  };

  return (
    <AnimatePresence>
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
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
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
                const Icon = resource.icon;
                
                return (
                  <motion.div
                    key={resourceKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {resource.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {resource.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Available: {resource.available}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleCall(resource.phone)}
                          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                        <button
                          onClick={() => handleText(resource.phone)}
                          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Text</span>
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

            {/* Additional Information */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    What to Expect When You Call
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• You'll speak with a trained crisis counselor</li>
                    <li>• Calls are confidential and free</li>
                    <li>• Counselors can help you develop a safety plan</li>
                    <li>• They can connect you with local resources</li>
                    <li>• No judgment - they're here to help</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Safety Planning */}
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                {showDetails ? 'Hide Details' : 'Show More Information'}
              </button>
              
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              )}
            </div>

            {/* Additional Details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Warning Signs to Watch For
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>• Talking about wanting to die or kill oneself</li>
                      <li>• Looking for ways to kill oneself</li>
                      <li>• Talking about feeling hopeless or having no reason to live</li>
                      <li>• Talking about feeling trapped or in unbearable pain</li>
                      <li>• Talking about being a burden to others</li>
                      <li>• Increasing use of alcohol or drugs</li>
                      <li>• Acting anxious, agitated, or reckless</li>
                      <li>• Sleeping too little or too much</li>
                      <li>• Withdrawing or feeling isolated</li>
                      <li>• Showing rage or talking about seeking revenge</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      How to Help Someone in Crisis
                    </h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>• Ask directly if they're thinking about suicide</li>
                      <li>• Listen without judgment</li>
                      <li>• Stay with them and don't leave them alone</li>
                      <li>• Remove any lethal means from their environment</li>
                      <li>• Call a crisis hotline or emergency services</li>
                      <li>• Take them to an emergency room if necessary</li>
                      <li>• Follow up with them after the crisis</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CrisisSupportComponent;