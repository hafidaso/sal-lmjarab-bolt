import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Heart, Shield, Award, Users, Calendar, CheckCircle, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Doctor } from '../../data/mockDoctors';
import { useAuth } from '../../contexts/AuthContext';
import ReviewLink from '../reviews/ReviewLink';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: (doctorId: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getInsuranceColor = (insurance: string) => {
    switch (insurance) {
      case 'CNSS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'RAMED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Private':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg object-cover"
              />
              {doctor.verified && (
                <div className="absolute -top-2 -right-2 bg-primary-500 text-white p-1 rounded-full">
                  <Shield className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="flex-1">
                <Link 
                  to={`/doctor/${doctor.id}`}
                  className="group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {doctor.name}
                  </h3>
                </Link>
                
                <p className="text-gray-600 dark:text-gray-400 mb-1">{doctor.specialty}</p>
                
                {/* Subspecialties */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {doctor.subspecialties.slice(0, 2).map((sub, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                    >
                      {sub}
                    </span>
                  ))}
                  {doctor.subspecialties.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                      +{doctor.subspecialties.length - 2} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {doctor.rating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {doctor.experience} years experience
                    </span>
                  </div>
                </div>

                {/* Badges */}
                {doctor.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {doctor.badges.slice(0, 2).map((badge, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                      >
                        <Award className="w-3 h-3 mr-1" />
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Languages */}
                <div className="mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Languages: </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {doctor.languages.join(', ')}
                  </span>
                </div>

                {/* Insurance */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {doctor.insurance.map((ins, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getInsuranceColor(ins)}`}
                    >
                      {ins}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side Info */}
              <div className="lg:text-right lg:ml-6 mt-4 lg:mt-0">
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {doctor.fees.consultation} {doctor.fees.currency}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Consultation
                </div>
                <div className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {doctor.fees.followUp} {doctor.fees.currency} Follow-up
                </div>

                <div className="flex items-center space-x-1 mb-2 lg:justify-end">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {doctor.location.city} • {doctor.location.distance} km
                  </span>
                </div>

                <div className="flex items-center space-x-1 mb-4 lg:justify-end">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Next: {formatDate(doctor.availability.nextAvailable)}
                  </span>
                </div>

                {/* Response Time */}
                <div className="flex items-center space-x-1 mb-4 lg:justify-end">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Responds in {doctor.availability.responseTime}h
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                  <Link
                    to={`/doctor/${doctor.id}`}
                    className="px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg text-sm font-medium transition-colors text-center"
                  >
                    {t('view.profile')}
                  </Link>
                  
                  {user && (
                    <ReviewLink
                      doctorId={doctor.id}
                      doctorName={doctor.name}
                      variant="button"
                      size="sm"
                      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Review This Doctor
                    </ReviewLink>
                  )}
                  
                  {doctor.availability.acceptingNew ? (
                    <Link
                      to={`/doctor/${doctor.id}?tab=availability`}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors text-center flex items-center justify-center space-x-1"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t('book.appointment')}</span>
                    </Link>
                  ) : (
                    <button disabled className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed">
                      Not Accepting New Patients
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
              <MapPin className="w-4 h-4 inline mr-1" />
              {doctor.location.address}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;