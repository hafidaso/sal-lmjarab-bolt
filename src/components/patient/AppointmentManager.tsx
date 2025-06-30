import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MapPin, Phone, Mail, Bell, Edit, Trash2, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentService, Appointment, ReminderSettings } from '../../services/appointmentService';
import toast from 'react-hot-toast';

interface BookingForm {
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'in-person' | 'telehealth';
  reason: string;
  notes: string;
}

const AppointmentManager: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    type: 'in-person',
    reason: '',
    notes: ''
  });
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    email: true,
    sms: true,
    push: true,
    timing: '24h'
  });

  useEffect(() => {
    if (user && user.id) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      const data = await appointmentService.getPatientAppointments(user.id);
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.id) return;
    try {
      await appointmentService.bookAppointment({
        doctorId: bookingForm.doctorId,
        patientId: user.id,
        doctorName: bookingForm.doctorName,
        patientName: user.name || 'Patient',
        specialty: 'General Medicine', // You may want to select this
        date: bookingForm.date,
        time: bookingForm.time,
        duration: 30,
        type: bookingForm.type,
        status: 'scheduled',
        location: bookingForm.type === 'in-person' ? 'TBD' : undefined,
        reason: bookingForm.reason,
        notes: bookingForm.notes,
        reminderSent: false,
        reminderPreferences: reminderSettings,
        canReschedule: true
      });
      setShowBookingForm(false);
      setBookingForm({
        doctorId: '',
        doctorName: '',
        date: '',
        time: '',
        type: 'in-person',
        reason: '',
        notes: ''
      });
      await fetchAppointments();
      toast.success('Appointment booked successfully! Confirmation sent via email and SMS.');
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
    }
  };

  const handleReschedule = async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      await appointmentService.rescheduleAppointment(appointmentId, newDate, newTime);
      setShowRescheduleForm(null);
      await fetchAppointments();
      alert('Appointment rescheduled successfully!');
    } catch (error) {
      alert('Failed to reschedule appointment. Please try again.');
    }
  };

  const handleCancel = async (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.cancelAppointment(appointmentId);
        await fetchAppointments();
      } catch (error) {
        alert('Failed to cancel appointment. Please try again.');
      }
    }
  };

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

  const canRescheduleAppointment = (appointment: Appointment) => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const hoursDiff = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 24 && appointment.canReschedule;
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled' || apt.status === 'confirmed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Appointment Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your healthcare appointments and reminders
          </p>
        </div>
        
        <button
          onClick={() => setShowBookingForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Reminder Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Reminder Preferences
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Notification Methods</h4>
            <div className="space-y-2">
              {Object.entries(reminderSettings).filter(([key]) => key !== 'timing').map(([method, enabled]) => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setReminderSettings(prev => ({ ...prev, [method]: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {method === 'sms' ? 'SMS' : method} notifications
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Reminder Timing</h4>
            <select
              value={reminderSettings.timing}
              onChange={(e) => setReminderSettings(prev => ({ ...prev, timing: e.target.value as ReminderSettings['timing'] }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="24h">24 hours before</option>
              <option value="2h">2 hours before</option>
              <option value="30m">30 minutes before</option>
            </select>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Appointments ({upcomingAppointments.length})
        </h3>
        
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No upcoming appointments scheduled
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {appointment.doctorName}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      {appointment.type === 'telehealth' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          <Video className="w-3 h-3 mr-1" />
                          Telehealth
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      {appointment.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{appointment.location}</span>
                        </div>
                      )}
                    </div>
                    
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    {canRescheduleAppointment(appointment) && (
                      <button
                        onClick={() => setShowRescheduleForm(appointment.id)}
                        className="px-3 py-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Reschedule</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Past Appointments
        </h3>
        
        {pastAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No past appointments
          </div>
        ) : (
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 opacity-75"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {appointment.doctorName}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      <span>{appointment.time}</span>
                      <span>{appointment.specialty}</span>
                    </div>
                  </div>
                  
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Book New Appointment
                </h2>
                
                <form onSubmit={handleBookAppointment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Doctor Name *
                    </label>
                    <input
                      type="text"
                      value={bookingForm.doctorName}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, doctorName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Time *
                      </label>
                      <input
                        type="time"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Appointment Type *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="in-person"
                          checked={bookingForm.type === 'in-person'}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, type: e.target.value as any }))}
                          className="w-4 h-4 text-primary-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">In-Person</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Visit the clinic</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="telehealth"
                          checked={bookingForm.type === 'telehealth'}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, type: e.target.value as any }))}
                          className="w-4 h-4 text-primary-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">Telehealth</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Video consultation</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reason for Visit
                    </label>
                    <input
                      type="text"
                      value={bookingForm.reason}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="e.g., Regular checkup, follow-up, consultation"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any additional information for the doctor"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Book Appointment
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentManager;