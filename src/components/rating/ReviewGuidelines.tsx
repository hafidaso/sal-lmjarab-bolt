import React from 'react';
import { CheckCircle, X, AlertTriangle, Shield, Eye, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewGuidelinesProps {
  onClose: () => void;
}

const ReviewGuidelines: React.FC<ReviewGuidelinesProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Shield className="w-6 h-6 mr-2 text-primary-600" />
              Review Guidelines
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              At Sal-lmjarab, we value authentic, helpful reviews that assist other patients in making informed healthcare decisions. 
              Please follow these guidelines when writing your review:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Be Authentic</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Share your genuine experience with the healthcare provider. Reviews should be based on your personal experience only.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Be Specific</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Provide details about your visit, including wait times, staff interactions, communication quality, and overall experience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Be Respectful</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Even if your experience was negative, express your concerns in a constructive and respectful manner.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Be Helpful</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Include information that would be useful to other patients, such as tips for navigating the office or preparing for an appointment.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-medium text-red-800 dark:text-red-300 mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Content to Avoid
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-red-700 dark:text-red-400">
                <li>Personal health information (yours or others')</li>
                <li>Offensive, abusive, or discriminatory language</li>
                <li>Personal attacks on staff or other patients</li>
                <li>False or misleading information</li>
                <li>Promotional content or advertisements</li>
                <li>Content unrelated to your healthcare experience</li>
                <li>Full names of staff members other than the doctor</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Review Moderation Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Automated Screening</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All reviews are automatically screened for inappropriate language and content that violates our guidelines.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Manual Review</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reviews flagged by our system or reported by users are manually reviewed by our team within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                Verification Process
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Reviews from patients who have verifiable appointments with the healthcare provider receive a "Verified Patient" badge. 
                While we encourage all reviews, verified reviews provide additional confidence to other patients.
              </p>
            </div>
            
            <div className="text-center">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewGuidelines;