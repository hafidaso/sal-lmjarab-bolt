import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Building, Heart, Brain, Bone, Stethoscope, Activity, CheckCircle, Users, Shield, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const specialties = [
  { id: 'cardiology', name: 'Cardiology', icon: Heart, description: 'Heart and cardiovascular system care' },
  { id: 'neurology', name: 'Neurology', icon: Brain, description: 'Brain, spinal cord, and nervous system treatment' },
  { id: 'orthopedics', name: 'Orthopedics', icon: Bone, description: 'Musculoskeletal system and injury care' },
  { id: 'oncology', name: 'Oncology', icon: Activity, description: 'Cancer diagnosis and treatment' },
  { id: 'gastroenterology', name: 'Gastroenterology', icon: Stethoscope, description: 'Digestive system disorders' },
  { id: 'urology', name: 'Urology', icon: Stethoscope, description: 'Urinary tract and male reproductive health' },
  { id: 'gynecology', name: 'Gynecology', icon: Stethoscope, description: 'Female reproductive health' },
  { id: 'pediatrics', name: 'Pediatrics', icon: Users, description: 'Children\'s healthcare' },
  { id: 'dermatology', name: 'Dermatology', icon: Stethoscope, description: 'Skin conditions and treatments' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: Stethoscope, description: 'Eye care and vision health' },
  { id: 'ent', name: 'ENT', icon: Stethoscope, description: 'Ear, nose, and throat care' },
  { id: 'psychiatry', name: 'Psychiatry', icon: Brain, description: 'Mental health diagnosis and treatment' }
];

const TopHospitals = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Top Hospitals by Specialty
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover Morocco's leading hospitals ranked by specialty, patient outcomes, and quality metrics
          </p>
        </div>

        {/* Methodology Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
              <Trophy className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Rankings Methodology
            </h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our hospital rankings are based on a comprehensive analysis of multiple factors to ensure accuracy and relevance for patients seeking quality care. We evaluate facilities across several key dimensions:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Patient Outcomes</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Survival rates, complication rates, readmission rates, and length of stay metrics compared to national averages.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Patient Experience</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Patient satisfaction scores, communication quality, staff responsiveness, and facility cleanliness ratings.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Quality & Safety</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Infection prevention measures, medication safety, surgical safety protocols, and overall safety scores.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>Rankings are updated annually based on the most recent data available from the Ministry of Health, independent healthcare quality organizations, and patient surveys.</p>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-all"
            >
              <Link to={`/top-hospitals/${specialty.id}`} className="block h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                    <specialty.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {specialty.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {specialty.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    View Top Hospitals
                  </span>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Why Trust Our Rankings */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Trust Our Hospital Rankings?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Expert Panel Review
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rankings developed with input from leading healthcare professionals and researchers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Activity className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Data-Driven Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive evaluation using verified data from multiple reliable sources
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Transparent Methodology
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Clear explanation of ranking criteria and scoring system for complete transparency
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHospitals;