import React, { useState } from 'react';
import PatientReviewForm from './PatientReviewForm';
import { CheckCircle } from 'lucide-react';

interface ReviewData {
  doctorId: string;
  appointmentId?: string;
  overallRating: number;
  bedsideManner: number;
  waitTime: number;
  cleanliness: number;
  staffProfessionalism: number;
  recommend: boolean;
  comment: string;
}

const PatientReviewFormDemo: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  const handleSubmit = (data: ReviewData) => {
    console.log('Review submitted:', data);
    setReviewData(data);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setReviewData(null);
  };

  const handleCancel = () => {
    alert('Review cancelled. Returning to previous page.');
  };

  if (submitted && reviewData) {
    return (
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Thank You for Your Review!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your feedback helps other patients make informed decisions.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Review Summary
          </h3>
          
          <div className="space-y-4">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Overall Rating:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">{reviewData.overallRating}/5</span>
            </div>
            
            <div>
              <span className="text-gray-600 dark:text-gray-400">Bedside Manner:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">{reviewData.bedsideManner}/5</span>
            </div>
            
            <div>
              <span className="text-gray-600 dark:text-gray-400">Wait Time:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">{reviewData.waitTime}/5</span>
            </div>
            
            <div>
              <span className="text-gray-600 dark:text-gray-400">Cleanliness:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">{reviewData.cleanliness}/5</span>
            </div>
            
            <div>
              <span className="text-gray-600 dark:text-gray-400">Staff Professionalism:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">{reviewData.staffProfessionalism}/5</span>
            </div>
            
            <div>
              <span className="text-gray-600 dark:text-gray-400">Recommendation:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">
                {reviewData.recommend ? 'Yes' : 'No'}
              </span>
            </div>
            
            {reviewData.comment && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Comment:</span>
                <p className="mt-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  {reviewData.comment}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <PatientReviewForm 
      doctorName="Ahmed Bennani"
      doctorId="doctor-123"
      appointmentId="appointment-456"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default PatientReviewFormDemo;