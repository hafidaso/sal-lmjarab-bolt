import React from 'react';
import { Link } from 'react-router-dom';
import { User, Stethoscope, Shield, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AccountTypeSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Sal-lmjarab
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Account Type
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Select the type of account you want to create to get started with Sal-lmjarab
          </p>
        </div>

        {/* Account Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Account */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
              <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Patient
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Find doctors, book appointments, and manage your healthcare
            </p>
            <Link
              to="/register"
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <span>Create Patient Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Doctor Account */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Stethoscope className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Healthcare Provider
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Manage your practice, patients, and online presence
            </p>
            <Link
              to="/register/doctor"
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <span>Create Provider Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Admin Account */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Administrator
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Manage the platform, users, and system settings
            </p>
            <Link
              to="/register/admin"
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              <span>Create Admin Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountTypeSelection;