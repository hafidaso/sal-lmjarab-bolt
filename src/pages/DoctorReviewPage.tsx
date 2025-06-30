import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft, User, Shield, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PatientReviewSystem from '../components/rating/PatientReviewSystem';
import { mockDoctors, Doctor } from '../data/mockDoctors';

const DoctorReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundDoctor = mockDoctors.find(d => d.id === id);
        setDoctor(foundDoctor || null);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor not found</h1>
            <Link to="/search" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Back to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to={`/doctor/${doctor.id}`} 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to doctor profile
        </Link>

        {/* Doctor Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {doctor.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{doctor.specialty}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {doctor.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {doctor.experience} years experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review System */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Patient Reviews & Ratings
          </h2>
          
          <PatientReviewSystem 
            doctorId={doctor.id} 
            doctorName={doctor.name}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorReviewPage;