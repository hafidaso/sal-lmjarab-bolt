import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Video, Mail, Bell, Settings, Wifi, Monitor, Search, Filter, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { appointmentService, Appointment, TimeSlot } from '../services/appointmentService';
import EnhancedAppointmentScheduler from '../components/appointment/EnhancedAppointmentScheduler';
import ReminderManagement from '../components/appointment/ReminderManagement';
import { mockDoctors } from '../data/mockDoctors';

interface AppointmentBookingSystemProps {
  onClose?: () => void;
}

const AppointmentBookingSystem: React.FC<AppointmentBookingSystemProps> = ({
  onClose
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'book' | 'manage' | 'reminders'>('book');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showReminderManagement, setShowReminderManagement] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'in-person' | 'telehealth'>('all');

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  const loadAppointments = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const patientAppointments = await appointmentService.getPatientAppointments(user.id);
      setAppointments(patientAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
    setShowScheduler(false);
    setSelectedDoctor(null);
    setActiveTab('manage');
  };

  const handleRescheduleAppointment = async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      await appointmentService.rescheduleAppointment(appointmentId, newDate, newTime);
      await loadAppointments();
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      alert('Failed to reschedule appointment. Please try again.');
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await appointmentService.cancelAppointment(appointmentId);
      await loadAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !filterSpecialty || doctor.specialty === filterSpecialty;
    const matchesLocation = !filterLocation || doctor.location.toLowerCase().includes(filterLocation.toLowerCase());
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesType = filterType === 'all' || appointment.type === filterType;
    return matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const specialties = Array.from(new Set(mockDoctors.map(doctor => doctor.specialty)));
  const locations = Array.from(new Set(mockDoctors.map(doctor => doctor.location)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Appointment Booking System
              </h1>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Real-time availability • Telehealth • Automated reminders</span>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'book', label: 'Book Appointment', icon: Plus },
              { id: 'manage', label: 'My Appointments', icon: Calendar },
              { id: 'reminders', label: 'Reminders', icon: Bell }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search Doctors
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or specialty..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Specialty
                    </label>
                    <select
                      value={filterSpecialty}
                      onChange={(e) => setFilterSpecialty(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">All Specialties</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Doctors List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {doctor.specialty}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{doctor.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <CheckCircle
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(doctor.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                ({doctor.rating})
                              </span>
                            </div>
                            <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                              {doctor.consultationFee} MAD
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            setShowScheduler(true);
                          }}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredDoctors.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No doctors found matching your criteria</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'manage' && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Appointments Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    My Appointments
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your scheduled appointments
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="in-person">In-Person</option>
                    <option value="telehealth">Telehealth</option>
                  </select>
                </div>
              </div>

              {/* Appointments List */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No appointments found</p>
                  <p className="text-sm mt-1">Book your first appointment to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            {appointment.type === 'telehealth' ? (
                              <Video className="w-5 h-5" />
                            ) : (
                              <MapPin className="w-5 h-5" />
                            )}
                            <span className="text-sm font-medium capitalize">{appointment.type}</span>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {appointment.specialty}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.time}</span>
                              </div>
                              {appointment.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{appointment.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          
                          {appointment.status === 'scheduled' && appointmentService.canRescheduleAppointment(appointment) && (
                            <button
                              onClick={() => {
                                setSelectedDoctor({ id: appointment.doctorId, name: appointment.doctorName, specialty: appointment.specialty });
                                setShowScheduler(true);
                              }}
                              className="px-3 py-1 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors text-sm"
                            >
                              Reschedule
                            </button>
                          )}
                          
                          {appointment.status === 'scheduled' && (
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="px-3 py-1 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'reminders' && (
            <motion.div
              key="reminders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ReminderManagement onClose={() => setActiveTab('manage')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Appointment Scheduler Modal */}
      <AnimatePresence>
        {showScheduler && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <EnhancedAppointmentScheduler
                  doctorId={selectedDoctor.id}
                  doctorName={selectedDoctor.name}
                  doctorSpecialty={selectedDoctor.specialty}
                  consultationFee={selectedDoctor.consultationFee}
                  location={selectedDoctor.location}
                  onAppointmentBooked={handleBookAppointment}
                  onClose={() => {
                    setShowScheduler(false);
                    setSelectedDoctor(null);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentBookingSystem; 