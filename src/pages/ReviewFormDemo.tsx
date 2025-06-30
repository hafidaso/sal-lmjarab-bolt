import React from 'react';
import PatientReviewFormDemo from '../components/reviews/PatientReviewFormDemo';

const ReviewFormDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Patient Review Form
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This form appears when a patient wants to rate a doctor after a completed appointment
          </p>
        </div>
        
        <PatientReviewFormDemo />
      </div>
    </div>
  );
};

export default ReviewFormDemo;