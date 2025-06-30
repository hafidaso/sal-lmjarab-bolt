import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Star, Shield, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import PatientReviewSystem from '../components/rating/PatientReviewSystem';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockDoctors } from '../data/mockDoctors';

const DynamicReviewPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDoctor = async () => {
      if (!doctorId) {
        setError('Doctor ID is required');
        setLoading(false);
        return;
      }

      try {
        // In a real app, this would be an API call
        // For now, we'll search in mock data
        const foundDoctor = mockDoctors.find(d => d.id === doctorId);
        
        if (!foundDoctor) {
          setError('Doctor not found');
          setLoading(false);
          return;
        }

        setDoctor(foundDoctor);
      } catch (err) {
        setError('Failed to load doctor information');
        console.error('Error loading doctor:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [doctorId]);

  const handleReviewSubmitted = (review: any) => {
    // Handle review submission
    console.log('Review submitted:', review);
    // You could navigate back to the doctor's profile or show a success message
    navigate(`/doctor/${doctorId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="text-red-500 mb-4">
              <User className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Doctor Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'The doctor you are looking for could not be found.'}
            </p>
            <Link
              to="/search"
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Search for Doctors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <div className="text-primary-500 mb-4">
              <Shield className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Login Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to review a doctor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to={`/doctor/${doctorId}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctor Profile
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Review Dr. {doctor.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your experience to help other patients make informed decisions
          </p>
        </div>

        {/* Doctor Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                {doctor.verified && (
                  <div className="absolute -top-2 -right-2 bg-primary-500 text-white p-1 rounded-full">
                    <Shield className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{doctor.specialty}</p>
                  
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {doctor.rating} ({doctor.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {doctor.location.address}, {doctor.location.city}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {doctor.phone}
                  </span>
                </div>
                {doctor.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {doctor.email}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
        >
          <PatientReviewSystem 
            doctorId={doctor.id} 
            doctorName={doctor.name}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicReviewPage; 