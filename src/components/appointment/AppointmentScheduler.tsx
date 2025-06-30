import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { TimeSlot } from '../../data/mockDoctors';

interface AppointmentSchedulerProps {
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  consultationFee: number;
  timeSlots?: TimeSlot[];
  onAppointmentBooked?: (appointment: any) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  doctorId,
  doctorName,
  doctorSpecialty,
  consultationFee,
  timeSlots = [],
  onAppointmentBooked
}) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [appointmentType, setAppointmentType] = useState<'consultation' | 'follow-up' | 'emergency'>('consultation');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState(30);
  const [booking, setBooking] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekStart = (date: Date): Date => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const getWeekEnd = (date: Date): Date => {
    const end = getWeekStart(date);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
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

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
    setSelectedTimeSlot(null);
    setSelectedDate('');
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookAppointment = async () => {
    if (!user || !selectedTimeSlot || !reason.trim()) return;

    setBooking(true);
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const appointment = {
        id: Date.now().toString(),
        doctorId,
        patientId: user.id,
        timeSlot: selectedTimeSlot,
        type: appointmentType,
        reason: reason.trim(),
        duration,
        status: 'scheduled',
        createdAt: new Date()
      };

      if (onAppointmentBooked) {
        onAppointmentBooked(appointment);
      }

      // Reset form
      setSelectedTimeSlot(null);
      setReason('');
      setSelectedDate('');
      
    } catch (error) {
      console.error('Failed to book appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  const formatTime = (time: string): string => {
    return time;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getAvailableSlotsForDate = (date: Date): TimeSlot[] => {
    const dateString = date.toISOString().split('T')[0];
    return timeSlots.filter(slot => slot.date === dateString && slot.available);
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Book Appointment
        </h3>
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Appointment Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'consultation', label: 'Consultation', duration: 30 },
            { value: 'follow-up', label: 'Follow-up', duration: 20 },
            { value: 'emergency', label: 'Emergency', duration: 45 }
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => {
                setAppointmentType(type.value as any);
                setDuration(type.duration);
              }}
              className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                appointmentType === type.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div>{type.label}</div>
              <div className="text-xs opacity-75">{type.duration} min</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            Select Date & Time
          </h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px] text-center">
              {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
            </span>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((date, index) => {
            const availableSlots = getAvailableSlotsForDate(date);
            const isSelected = selectedDate === date.toISOString().split('T')[0];
            const isDatePast = isPast(date);
            const isDateToday = isToday(date);

            return (
              <div key={index} className="text-center">
                <button
                  onClick={() => !isDatePast && handleDateSelect(date)}
                  disabled={isDatePast || availableSlots.length === 0}
                  className={`w-full p-3 rounded-lg text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-primary-500 text-white'
                      : isDatePast || availableSlots.length === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className={`${isDateToday ? 'font-bold' : ''}`}>
                    {date.toLocaleDateString([], { weekday: 'short' })}
                  </div>
                  <div className="text-lg">
                    {date.getDate()}
                  </div>
                  <div className="text-xs">
                    {availableSlots.length} slots
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Available Times - {formatDate(new Date(selectedDate))}
          </h4>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {getAvailableSlotsForDate(new Date(selectedDate)).map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleTimeSlotSelect(slot)}
                className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeSlot?.id === slot.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {formatTime(slot.time)}
              </button>
            ))}
          </div>
          
          {getAvailableSlotsForDate(new Date(selectedDate)).length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No available time slots for this date
            </div>
          )}
        </div>
      )}

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

export default AppointmentScheduler;