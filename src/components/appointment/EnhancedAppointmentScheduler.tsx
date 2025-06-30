import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, User, MapPin, Phone, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Video, Mail, Bell, Settings, Wifi, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentService, Appointment, TimeSlot, ReminderSettings } from '../../services/appointmentService';
import { useRealtimeAppointmentSlots } from '../../hooks/useRealtimeAppointmentSlots';

interface EnhancedAppointmentSchedulerProps {
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  consultationFee: number;
  location?: string;
  onAppointmentBooked?: (appointment: Appointment) => void;
  onClose?: () => void;
}

const EnhancedAppointmentScheduler: React.FC<EnhancedAppointmentSchedulerProps> = ({
  doctorId,
  doctorName,
  doctorSpecialty,
  consultationFee,
  location,
  onAppointmentBooked,
  onClose
}) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'telehealth'>('in-person');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState(30);
  const [booking, setBooking] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    email: true,
    sms: true,
    push: false,
    timing: '24h'
  });
  const [showReminderSettings, setShowReminderSettings] = useState(false);
  const [telehealthInfo, setTelehealthInfo] = useState({
    platform: 'Zoom',
    requirements: ['Stable internet connection', 'Webcam', 'Microphone', 'Private space'],
    instructions: 'You will receive a secure link 10 minutes before your appointment.'
  });

  // Get week start and end dates
  const getWeekStart = (date: Date): Date => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const getWeekDays = (): Date[] => {
    const days = [];
    const start = getWeekStart(currentWeek);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Navigate between weeks
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
    setSelectedTimeSlot(null);
    setSelectedDate('');
  };

  // Fetch slots for selected date
  const fetchSlots = useCallback(async () => {
    if (!doctorId || !selectedDate) return;
    setLoadingSlots(true);
    try {
      const slots = await appointmentService.getRealTimeAvailability(doctorId, selectedDate);
      setAvailableSlots(slots);
    } catch (error) {
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [doctorId, selectedDate]);

  // Subscribe to realtime slot changes
  useRealtimeAppointmentSlots(doctorId, fetchSlots);

  // Handle date selection
  const handleDateSelect = async (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    setSelectedTimeSlot(null);
    // Fetch real-time availability for selected date
    fetchSlots();
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setDuration(timeSlot.duration);
  };

  // Handle appointment type change
  const handleAppointmentTypeChange = (type: 'in-person' | 'telehealth') => {
    setAppointmentType(type);
    if (type === 'telehealth') {
      // Generate telehealth URL when telehealth is selected
      appointmentService.generateTelehealthUrl('temp-id').catch(console.error);
    }
  };

  // Book appointment
  const handleBookAppointment = async () => {
    if (!user || !selectedTimeSlot || !reason.trim()) return;

    setBooking(true);
    try {
      const appointmentData = {
        doctorId,
        patientId: user.id,
        doctorName,
        patientName: user.name || 'Patient',
        specialty: doctorSpecialty,
        date: selectedDate,
        time: selectedTimeSlot.time,
        duration: selectedTimeSlot.duration,
        type: appointmentType,
        status: 'scheduled' as const,
        location: appointmentType === 'in-person' ? location : undefined,
        reason: reason.trim(),
        reminderSent: false,
        reminderPreferences: reminderSettings,
        canReschedule: true
      };

      const appointment = await appointmentService.bookAppointment(appointmentData);

      if (onAppointmentBooked) {
        onAppointmentBooked(appointment);
      }

      // Reset form
      setSelectedTimeSlot(null);
      setReason('');
      setSelectedDate('');
      setAvailableSlots([]);
      
    } catch (error) {
      console.error('Failed to book appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  // Format time display
  const formatTime = (time: string): string => {
    return time;
  };

  // Format date display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is in the past
  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Book Appointment
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{doctorName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{doctorSpecialty}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{consultationFee} MAD</span>
          </div>
        </div>
      </div>

      {/* Appointment Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Appointment Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAppointmentTypeChange('in-person')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              appointmentType === 'in-person'
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">In-Person</span>
            </div>
            <p className="text-xs opacity-75">Visit the doctor's office</p>
            {location && (
              <p className="text-xs mt-1 opacity-60">{location}</p>
            )}
          </button>
          
          <button
            onClick={() => handleAppointmentTypeChange('telehealth')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              appointmentType === 'telehealth'
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Video className="w-5 h-5" />
              <span className="font-medium">Telehealth</span>
            </div>
            <p className="text-xs opacity-75">Video consultation from home</p>
            <p className="text-xs mt-1 opacity-60">Secure video call</p>
          </button>
        </div>
      </div>

      {/* Telehealth Information */}
      {appointmentType === 'telehealth' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Telehealth Requirements
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                {telehealthInfo.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                {telehealthInfo.instructions}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Calendar Week View */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            Select Date
          </h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              disabled={isPast(day)}
              className={`p-3 rounded-lg text-center transition-colors ${
                isPast(day)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                  : selectedDate === day.toISOString().split('T')[0]
                  ? 'bg-primary-500 text-white'
                  : isToday(day)
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-xs font-medium">
                {day.toLocaleDateString([], { weekday: 'short' })}
              </div>
              <div className="text-lg font-semibold">
                {day.getDate()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Available Time Slots */}
      {selectedDate && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Available Times - {formatDate(new Date(selectedDate))}
          </h4>
          
          {loadingSlots ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeSlotSelect(slot)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeSlot?.id === slot.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {formatTime(slot.time)}
                </button>
              ))}
            </div>
          )}
          
          {!loadingSlots && availableSlots.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No available time slots for this date</p>
              <p className="text-sm mt-1">Please select another date</p>
            </div>
          )}
        </div>
      )}

      {/* Reminder Settings */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Reminder Settings
          </label>
          <button
            onClick={() => setShowReminderSettings(!showReminderSettings)}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Customize</span>
          </button>
        </div>
        
        <AnimatePresence>
          {showReminderSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reminder Methods
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={reminderSettings.email}
                        onChange={(e) => setReminderSettings(prev => ({ ...prev, email: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={reminderSettings.sms}
                        onChange={(e) => setReminderSettings(prev => ({ ...prev, sms: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">SMS</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={reminderSettings.push}
                        onChange={(e) => setReminderSettings(prev => ({ ...prev, push: e.target.checked }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <Bell className="w-4 h-4" />
                      <span className="text-sm">Push Notification</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reminder Timing
                  </label>
                  <select
                    value={reminderSettings.timing}
                    onChange={(e) => setReminderSettings(prev => ({ ...prev, timing: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="24h">24 hours before</option>
                    <option value="2h">2 hours before</option>
                    <option value="30m">30 minutes before</option>
                    <option value="15m">15 minutes before</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Bell className="w-4 h-4" />
          <span>
            {reminderSettings.email && reminderSettings.sms && reminderSettings.push
              ? 'Email, SMS & Push notifications'
              : reminderSettings.email && reminderSettings.sms
              ? 'Email & SMS notifications'
              : reminderSettings.email
              ? 'Email notifications'
              : reminderSettings.sms
              ? 'SMS notifications'
              : reminderSettings.push
              ? 'Push notifications'
              : 'No reminders'}
          </span>
        </div>
      </div>

      {/* Appointment Details */}
      {selectedTimeSlot && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Appointment Details
          </h4>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{formatDate(new Date(selectedDate))}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{formatTime(selectedTimeSlot.time)} ({duration} minutes)</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span>{doctorName}</span>
              </div>
              <div className="flex items-center space-x-2">
                {appointmentType === 'telehealth' ? (
                  <Video className="w-4 h-4 text-gray-400" />
                ) : (
                  <MapPin className="w-4 h-4 text-gray-400" />
                )}
                <span>
                  {appointmentType === 'telehealth' ? 'Video Consultation' : location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{consultationFee} MAD</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Visit *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please describe your symptoms or reason for the appointment..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={3}
              required
            />
          </div>
        </motion.div>
      )}

      {/* Book Button */}
      {selectedTimeSlot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={handleBookAppointment}
            disabled={!reason.trim() || booking}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            {booking ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Booking...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Confirm Appointment</span>
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            You will receive a confirmation email and SMS after booking
          </p>
        </motion.div>
      )}

      {/* Login Prompt */}
      {!user && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-800 dark:text-yellow-200">
              Please log in to book an appointment
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAppointmentScheduler; 