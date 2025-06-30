import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Heart, Clock, FileText, User, Bell, Settings, Activity, Users, Star, Search, MessageCircle, Phone, Shield, CheckCircle, X, Edit, TrendingUp, MapPin, Mail, ChevronRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { patientService, HealthMetrics } from '../../services/patientService';
import toast from 'react-hot-toast';
import { generateRecentDate, formatDateForDisplay } from '../../lib/utils';

type HealthMetric = {
  label: string;
  value: string;
  status: string;
  icon: React.ElementType;
};

const PatientDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Activity },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Heart },
    { label: 'Weight', value: '70 kg', status: 'stable', icon: User },
    { label: 'Last Checkup', value: '2 weeks ago', status: 'recent', icon: Calendar },
  ]);
  const [editMetrics, setEditMetrics] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);

  // Load health metrics from database on component mount
  useEffect(() => {
    if (user?.id) {
      loadHealthMetrics();
    }
  }, [user]);

  const loadHealthMetrics = async () => {
    try {
      setLoading(true);
      const dbMetrics = await patientService.getHealthMetrics(user!.id);
      
      if (dbMetrics) {
        const convertedMetrics: HealthMetric[] = [
          { label: 'Blood Pressure', value: dbMetrics.blood_pressure || '120/80', status: 'normal', icon: Activity },
          { label: 'Heart Rate', value: dbMetrics.heart_rate || '72 bpm', status: 'stable', icon: Heart },
          { label: 'Weight', value: dbMetrics.weight || '70 kg', status: 'normal', icon: TrendingUp },
          { label: 'Last Checkup', value: dbMetrics.last_checkup || '2 weeks ago', status: 'recent', icon: Calendar },
        ];
        setHealthMetrics(convertedMetrics);
      }
    } catch (error) {
      console.error('Error loading health metrics:', error);
      toast.error('Failed to load health metrics');
    } finally {
      setLoading(false);
    }
  };

  const recentAppointments = [
    { doctor: 'Dr. Ahmed Bennani', specialty: 'Cardiology', date: generateRecentDate(2), time: '10:00 AM', status: 'upcoming' },
    { doctor: 'Dr. Fatima Alaoui', specialty: 'Dermatology', date: generateRecentDate(7), time: '2:30 PM', status: 'upcoming' },
    { doctor: 'Dr. Omar Idrissi', specialty: 'General Medicine', date: generateRecentDate(10), time: '9:00 AM', status: 'completed' },
  ];

  const favoritesDoctors = [
    { name: 'Dr. Ahmed Bennani', specialty: 'Cardiology', rating: 4.8, id: '1' },
    { name: 'Dr. Omar Idrissi', specialty: 'General Medicine', rating: 4.6, id: '3' },
  ];

  const quickActions = [
    {
      title: 'Find a Doctor',
      description: 'Search for healthcare providers',
      icon: Users,
      action: () => navigate('/search'),
      color: 'bg-blue-500'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule with your doctors',
      icon: Calendar,
      action: () => navigate('/patient/communication?tab=appointments'),
      color: 'bg-green-500'
    },
    {
      title: 'Medical Records',
      description: 'View your health history',
      icon: FileText,
      action: () => navigate('/patient/communication?tab=records'),
      color: 'bg-purple-500'
    },
    {
      title: 'Customer Support',
      description: '24/7 assistance available',
      icon: MessageCircle,
      action: () => navigate('/patient/communication?tab=support'),
      color: 'bg-red-500'
    }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: Activity, path: '/patient/dashboard' },
    { id: 'search', label: 'Find Healthcare Providers', icon: Search, path: '/search' },
    { id: 'appointments', label: 'Appointment Management', icon: Calendar, path: '/patient/communication?tab=appointments' },
    { id: 'records', label: 'Medical Records Portal', icon: FileText, path: '/patient/communication?tab=records' },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star, path: '/patient/communication?tab=reviews' },
    { id: 'profile', label: 'Profile Management', icon: User, path: '/patient/communication?tab=profile' },
    { id: 'support', label: 'Customer Support', icon: MessageCircle, path: '/patient/communication?tab=support' },
  ];

  const handleEditMetricChange = (index: number, value: string) => {
    setEditMetrics((prev) => prev.map((m, i) => i === index ? { ...m, value } : m));
  };

  const handleSaveMetrics = async () => {
    try {
      // Parse values from editMetrics
      const [bp, hr, wt, lastCheckup] = editMetrics.map(m => m.value);

      // Send the raw text values as they are, since the database expects TEXT fields
      const dbMetrics = {
        blood_pressure: bp || '120/80',
        heart_rate: hr || '72 bpm',
        weight: wt || '70 kg',
        last_checkup: lastCheckup || '2 weeks ago',
      };

      console.log('Submitting health metrics:', dbMetrics);

      const result = await patientService.updateHealthMetrics(user!.id, dbMetrics);
      
      if (result) {
        setHealthMetrics(editMetrics);
        setShowEditModal(false);
        toast.success('Health metrics updated successfully!');
      } else {
        toast.error('Failed to update health metrics');
      }
    } catch (error) {
      console.error('Error saving health metrics:', error);
      toast.error('Failed to save health metrics');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">
                {t('dashboard.welcome')}, {user?.name}
              </h1>
              <p className="text-primary-100">
                Manage your health and appointments with ease
              </p>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 ${action.color} rounded-lg group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Health Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Health Overview
                </h2>
                <button
                  className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                  onClick={() => {
                    setEditMetrics(healthMetrics);
                    setShowEditModal(true);
                  }}
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${
                      metric.status === 'normal' ? 'bg-green-100 text-green-600' :
                      metric.status === 'stable' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Health Overview Modal */}
            <AnimatePresence>
              {showEditModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg relative"
                  >
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={() => setShowEditModal(false)}
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Edit Health Overview</h3>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleSaveMetrics();
                      }}
                      className="space-y-4"
                    >
                      {editMetrics.map((metric, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {metric.label}
                          </label>
                          <input
                            type="text"
                            value={metric.value}
                            onChange={e => handleEditMetricChange(index, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      ))}
                      <div className="flex justify-end gap-2 mt-6">
                        <button
                          type="button"
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg"
                          onClick={() => setShowEditModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent & Upcoming {t('dashboard.appointments')}
                  </h2>
                  <Link
                    to="/patient/communication?tab=appointments"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Manage All
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          appointment.status === 'upcoming' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.specialty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.date}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorite Doctors */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Favorite Doctors
                </h2>
                <div className="space-y-4">
                  {favoritesDoctors.map((doctor, index) => (
                    <Link
                      key={index}
                      to={`/doctor/${doctor.id}`}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{doctor.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Security & Privacy
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your data is protected with 256-bit encryption and HIPAA compliance
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Multi-factor authentication</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">HIPAA compliant storage</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Regular security audits</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Patient</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Need Help?
              </h3>
              <div className="space-y-2">
                <Link
                  to="/patient/communication?tab=support"
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with AI Assistant</span>
                </Link>
                <a 
                  href="tel:+212522XXXXXX"
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Support: +212 522 XXX XXX</span>
                </a>
              </div>
            </div>
            
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-3">
                Communication Center
              </h3>
              <Link
                to="/patient/communication"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Go to Communication Center</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;