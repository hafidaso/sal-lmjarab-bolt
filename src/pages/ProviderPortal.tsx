import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Users, Star, Calendar, ChevronRight, Shield, Award, BarChart, Zap, MessageSquare, FileText, Settings, User, Building, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const ProviderPortal = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Healthcare Provider Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tools and resources to manage your practice and connect with patients
          </p>
        </div>

        {/* Main Content */}
        {user && user.role === 'provider' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Healthcare Provider</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  {[
                    { id: 'overview', label: 'Dashboard Overview', icon: BarChart },
                    { id: 'profile', label: 'Profile Management', icon: User },
                    { id: 'appointments', label: 'Appointment Calendar', icon: Calendar },
                    { id: 'patients', label: 'Patient Management', icon: Users },
                    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
                    { id: 'messages', label: 'Secure Messaging', icon: MessageSquare },
                    { id: 'documents', label: 'Document Center', icon: FileText },
                    { id: 'settings', label: 'Account Settings', icon: Settings }
                  ].map(item => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <ItemIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-3">
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Our support team is available to assist you with any questions.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contact us directly for immediate assistance.
                </p>
              </div>
            </div>

            {/* Main Dashboard Area */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Welcome back, Dr. {user.name.split(' ')[1]}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Here's an overview of your practice performance and upcoming appointments.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Profile Views</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Appointments</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">28</p>
                      </div>
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">8 upcoming this week</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                      </div>
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Based on 127 reviews</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Today's Appointments
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { time: '09:00 AM', patient: 'Fatima Alaoui', reason: 'Follow-up consultation' },
                      { time: '10:30 AM', patient: 'Mohammed Khalid', reason: 'Annual checkup' },
                      { time: '02:00 PM', patient: 'Amina Benali', reason: 'New patient consultation' }
                    ].map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{appointment.patient}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.reason}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">{appointment.time}</p>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link
                      to="/provider/appointments"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All Appointments
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
                    Recent Messages
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { patient: 'Fatima Alaoui', message: 'Thank you for the prescription. When should I schedule a follow-up?', time: '2 hours ago' },
                      { patient: 'Mohammed Khalid', message: 'I have a question about the medication you prescribed yesterday.', time: '1 day ago' }
                    ].map((message, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium text-gray-900 dark:text-white">{message.patient}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{message.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{message.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link
                      to="/provider/messages"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All Messages
                    </Link>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-primary-600" />
                    Recent Reviews
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { patient: 'Anonymous Patient', rating: 5, comment: 'Dr. Bennani was very thorough and took the time to explain everything. Highly recommend!', time: '2 days ago' },
                      { patient: 'Anonymous Patient', rating: 4, comment: 'Great doctor with excellent bedside manner. The wait time was a bit long though.', time: '1 week ago' }
                    ].map((review, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium text-gray-900 dark:text-white">{review.patient}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{review.comment}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{review.time}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link
                      to="/provider/reviews"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View All Reviews
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-sm p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Complete Your Profile</h3>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-lg">75%</span>
                  </div>
                </div>
                <p className="text-primary-100 mb-4">
                  Enhance your visibility and attract more patients by completing your profile information.
                </p>
                <Link
                  to="/provider/profile"
                  className="inline-block px-4 py-2 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Complete Profile
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero Section for Non-Logged In Users */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="p-8 md:p-12 md:w-1/2">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Join Morocco's Leading Healthcare Platform
                  </h2>
                  <p className="text-primary-100 mb-6">
                    Connect with patients, manage your practice, and grow your online presence with Sal-lmjarab's comprehensive provider tools.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/register"
                      className="px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                    >
                      Create Account
                    </Link>
                    <Link
                      to="/login"
                      className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 bg-primary-800">
                  <img
                    src="https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Healthcare provider with patient"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Benefits for Healthcare Providers
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Expand Your Patient Base
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Connect with new patients searching for healthcare providers in your specialty and location.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Streamline Appointments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Reduce no-shows and manage your schedule efficiently with our online booking system.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Build Your Reputation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Showcase your expertise and collect verified patient reviews to enhance your online presence.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Verified Provider Profiles
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our verification process ensures that only legitimate healthcare providers are featured on our platform, building trust with patients.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">Credential verification</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">License validation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">Verified badge on your profile</span>
                  </li>
                </ul>
                <Link
                  to="/claim-profile"
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <span>Claim your profile</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <BarChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Practice Analytics
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Gain valuable insights into your practice performance with our comprehensive analytics dashboard.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">Profile view statistics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">Appointment conversion rates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">Patient satisfaction metrics</span>
                  </li>
                </ul>
                <Link
                  to="/provider-analytics"
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                What Healthcare Providers Say
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "Joining Sal-lmjarab has transformed my practice. I've seen a 30% increase in new patients and the appointment management system has reduced no-shows significantly.",
                    name: "Dr. Ahmed Bennani",
                    title: "Cardiologist, Casablanca"
                  },
                  {
                    quote: "The verification process was smooth and professional. Having a verified profile has helped build trust with new patients and enhanced my online reputation.",
                    name: "Dr. Fatima Alaoui",
                    title: "Dermatologist, Rabat"
                  },
                  {
                    quote: "The analytics dashboard gives me valuable insights into my practice performance. I can now make data-driven decisions to improve patient satisfaction.",
                    name: "Dr. Omar Idrissi",
                    title: "General Practitioner, Marrakech"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Grow Your Practice?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
                Join thousands of healthcare providers who trust Sal-lmjarab to connect with patients and manage their practice online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Create Provider Account
                </Link>
                <Link
                  to="/claim-profile"
                  className="px-8 py-4 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors"
                >
                  Claim Your Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderPortal;