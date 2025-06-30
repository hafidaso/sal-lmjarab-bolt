import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Star, Shield, BarChart, CheckCircle, Users, Heart, Building, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const QualityAchievements = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Promote Your Quality Achievements
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Showcase your hospital's excellence, quality metrics, and accreditations to patients seeking the best healthcare options in Morocco.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/quality/contact"
                  className="px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/quality/learn-more"
                  className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component content... */}

      </div>
    </div>
  );
};

export default QualityAchievements;