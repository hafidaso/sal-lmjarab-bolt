import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Star, Calendar, Settings, Bell, User, FileText, MessageCircle, Heart } from 'lucide-react';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { icon: Users, label: 'Profile Views', value: '1,234', change: '+12%' },
    { icon: Star, label: 'Average Rating', value: '4.8', change: '+0.2' },
    { icon: Calendar, label: 'Appointments', value: '89', change: '+15%' },
    { icon: Bell, label: 'New Reviews', value: '5', change: '+2' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your practice and view your performance metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Management */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('dashboard.profile')} Management
              </h2>
              <Link 
                to="/provider/profile" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View Full Profile
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Keep your professional profile up to date to attract more patients and maintain your online presence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/provider/profile"
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Personal Details</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update your credentials and specialties</p>
                </div>
              </Link>
              
              <Link
                to="/provider/profile"
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Scheduling</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your availability and appointments</p>
                </div>
              </Link>
              
              <Link
                to="/provider/profile"
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                  <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Communication</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Set your messaging and follow-up preferences</p>
                </div>
              </Link>
              
              <Link
                to="/provider/profile"
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg mr-4">
                  <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Verification</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete your profile verification</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent {t('dashboard.reviews')}
            </h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  "Dr. Bennani was very thorough and took the time to explain everything. Highly recommend!"
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  "Great doctor with excellent bedside manner. The wait time was a bit long though."
                </p>
              </div>
              
              <Link to="/provider/reviews" className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;