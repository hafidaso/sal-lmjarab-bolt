import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MapPin, Phone, Mail, Bell, Edit, Trash2, Plus, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, User, Filter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { telehealthService } from '../../services/telehealthService';
import toast from 'react-hot-toast';

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'in-person' | 'telehealth';
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
  location?: string;
  notes?: string;
  reminderSent: boolean;
  canReschedule: boolean;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  location?: string;
  availableSlots?: TimeSlot[];
}

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasAppointment: boolean;
  appointments: Appointment[];
}

const AppointmentManagementSystem: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorId: 'doctor-1',
      doctorName: 'Dr. Ahmed Bennani',
      specialty: 'Cardiology',
      date: '2025-06-15',
      time: '10:00',
      duration: 30,
      type: 'in-person',
      status: 'upcoming',
      location: 'Boulevard Zerktouni, Casablanca',
      notes: 'Follow-up consultation',
      reminderSent: true,
      canReschedule: true
    },
    {
      id: '2',
      doctorId: 'doctor-2',
      doctorName: 'Dr. Fatima Alaoui',
      specialty: 'Dermatology',
      date: '2025-06-10',
      time: '14:30',
      duration: 45,
      type: 'telehealth',
      status: 'upcoming',
      notes: 'Skin condition check-up',
      reminderSent: false,
      canReschedule: true
    },
    {
      id: '3',
      doctorId: 'doctor-3',
      doctorName: 'Dr. Omar Idrissi',
      specialty: 'General Medicine',
      date: '2025-06-25',
      time: '09:00',
      duration: 30,
      type: 'in-person',
      status: 'completed',
      location: 'Avenue Mohammed VI, Marrakech',
      reminderSent: true,
      canReschedule: false
    }
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 'doctor-1',
      name: 'Dr. Ahmed Bennani',
      specialty: 'Cardiology',
      image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Boulevard Zerktouni, Casablanca'
    },
    {
      id: 'doctor-2',
      name: 'Dr. Fatima Alaoui',
      specialty: 'Dermatology',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Avenue Mohammed V, Rabat'
    },
    {
      id: 'doctor-3',
      name: 'Dr. Omar Idrissi',
      specialty: 'General Medicine',
      image: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Avenue Mohammed VI, Marrakech'
    }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'telehealth'>('in-person');
  const [reminderPreferences, setReminderPreferences] = useState({
    email: true,
    sms: true,
    push: false,
    timing: '24h' // 24h, 2h, 30m
  });

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, appointments]);

  useEffect(() => {
    if (selectedDoctor) {
      generateAvailableTimeSlots(selectedDoctor.id);
    }
  }, [selectedDoctor]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Calculate the number of days to show from the previous month
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Get the first day to show in the calendar
    const firstDayToShow = new Date(year, month, 1 - daysFromPrevMonth);
    
    // Calculate the total number of days to show (42 = 6 weeks)
    const totalDays = 42;
    
    const days: CalendarDay[] = [];
    
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(firstDayToShow);
      date.setDate(firstDayToShow.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === new Date().toDateString();
      
      const dateString = date.toISOString().split('T')[0];
      const dayAppointments = appointments.filter(apt => apt.date === dateString);
      
      days.push({
        date,
        isCurrentMonth,
        isToday,
        hasAppointment: dayAppointments.length > 0,
        appointments: dayAppointments
      });
    }
    
    setCalendarDays(days);
  };

  const generateAvailableTimeSlots = (doctorId: string) => {
    // Simulate API call to get available time slots
    const today = new Date();
    const availableSlots: TimeSlot[] = [];
    
    // Generate slots for the next 14 days
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const dateString = date.toISOString().split('T')[0];
      
      // Generate random available slots
      const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
      
      timeSlots.forEach(time => {
        // Randomly make some slots unavailable
        const available = Math.random() > 0.3;
        
        availableSlots.push({
          date: dateString,
          time,
          available
        });
      });
    }
    
    // Update doctor with available slots
    setDoctors(prev => prev.map(doc => 
      doc.id === doctorId 
        ? { ...doc, availableSlots }
        : doc
    ));
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (day: CalendarDay) => {
    setSelectedDate(day.date);
    
    if (calendarView === 'month') {
      setCalendarView('day');
    }
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedTimeSlot) return;
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedTimeSlot.date,
      time: selectedTimeSlot.time,
      duration: 30,
      type: appointmentType,
      status: 'upcoming',
      location: appointmentType === 'in-person' ? selectedDoctor.location : undefined,
      notes: appointmentNotes,
      reminderSent: false,
      canReschedule: true
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    setShowBookingModal(false);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    setAppointmentNotes('');
    setAppointmentType('in-person');
    
    alert('Appointment booked successfully! You will receive a confirmation shortly.');
  };

  const handleRescheduleAppointment = () => {
    if (!showRescheduleModal || !selectedTimeSlot) return;
    
    setAppointments(prev => prev.map(apt => 
      apt.id === showRescheduleModal
        ? {
            ...apt,
            date: selectedTimeSlot.date,
            time: selectedTimeSlot.time,
            status: 'rescheduled'
          }
        : apt
    ));
    
    setShowRescheduleModal(null);
    setSelectedTimeSlot(null);
    
    alert('Appointment rescheduled successfully! You will receive a confirmation shortly.');
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId
          ? { ...apt, status: 'cancelled' }
          : apt
      ));
      
      setShowAppointmentDetails(null);
      alert('Appointment cancelled successfully.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
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
    if (!appointment.canReschedule || appointment.status !== 'upcoming') return false;
    
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const hoursDiff = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return hoursDiff > 24;
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const renderCalendarHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setCalendarView('month')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              calendarView === 'month'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setCalendarView('week')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              calendarView === 'week'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setCalendarView('day')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              calendarView === 'day'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Day
          </button>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`p-2 h-24 text-left rounded-lg transition-colors ${
                day.isToday
                  ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-500'
                  : day.isCurrentMonth
                  ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-medium ${
                  day.isToday
                    ? 'text-primary-600 dark:text-primary-400'
                    : day.isCurrentMonth
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {day.date.getDate()}
                </span>
                
                {day.hasAppointment && (
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                )}
              </div>
              
              {day.appointments.length > 0 && (
                <div className="mt-1 space-y-1">
                  {day.appointments.slice(0, 2).map(apt => (
                    <div
                      key={apt.id}
                      className={`text-xs p-1 rounded truncate ${
                        apt.status === 'upcoming'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : apt.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}
                    >
                      {apt.time} - {apt.doctorName}
                    </div>
                  ))}
                  
                  {day.appointments.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{day.appointments.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    // Get the start of the week (Monday)
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }
    
    const timeSlots = [];
    for (let hour = 8; hour < 18; hour++) {
      timeSlots.push(`${hour}:00`);
      timeSlots.push(`${hour}:30`);
    }
    
    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              Time
            </div>
            {weekDays.map((date, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {date.toLocaleDateString(undefined, { weekday: 'short' })}
                </div>
                <div className={`text-sm ${
                  date.toDateString() === new Date().toDateString()
                    ? 'text-primary-600 dark:text-primary-400 font-bold'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-1">
            {timeSlots.map((time, timeIndex) => (
              <div key={timeIndex} className="grid grid-cols-8 gap-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 py-2 px-1 text-right">
                  {time}
                </div>
                
                {weekDays.map((date, dateIndex) => {
                  const dateString = date.toISOString().split('T')[0];
                  const aptsAtTime = appointments.filter(apt => 
                    apt.date === dateString && apt.time === time
                  );
                  
                  return (
                    <div
                      key={dateIndex}
                      className="h-12 border border-gray-200 dark:border-gray-700 rounded-lg relative"
                    >
                      {aptsAtTime.map(apt => (
                        <div
                          key={apt.id}
                          onClick={() => setShowAppointmentDetails(apt.id)}
                          className={`absolute inset-0 p-1 text-xs rounded-lg cursor-pointer ${getStatusColor(apt.status)}`}
                        >
                          <div className="truncate font-medium">{apt.doctorName}</div>
                          <div className="truncate">{apt.specialty}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayToShow = selectedDate || currentDate;
    const dateString = dayToShow.toISOString().split('T')[0];
    const dayAppointments = appointments.filter(apt => apt.date === dateString);
    
    const timeSlots = [];
    for (let hour = 8; hour < 18; hour++) {
      timeSlots.push(`${hour}:00`);
      timeSlots.push(`${hour}:30`);
    }
    
    return (
      <div>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {dayToShow.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
        </div>
        
        <div className="space-y-2">
          {timeSlots.map((time, index) => {
            const aptsAtTime = dayAppointments.filter(apt => apt.time === time);
            
            return (
              <div key={index} className="flex">
                <div className="w-20 text-right pr-4 text-sm text-gray-500 dark:text-gray-400 py-2">
                  {time}
                </div>
                
                <div className="flex-1 min-h-[60px] border-l border-gray-200 dark:border-gray-700 pl-4">
                  {aptsAtTime.length > 0 ? (
                    aptsAtTime.map(apt => (
                      <div
                        key={apt.id}
                        onClick={() => setShowAppointmentDetails(apt.id)}
                        className={`p-2 rounded-lg mb-2 cursor-pointer ${getStatusColor(apt.status)}`}
                      >
                        <div className="font-medium">{apt.doctorName}</div>
                        <div className="text-sm">{apt.specialty}</div>
                        <div className="text-xs">
                          {apt.type === 'in-person' ? 'In-person' : 'Telehealth'} • {apt.duration} min
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full border border-dashed border-gray-200 dark:border-gray-700 rounded-lg"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Appointment Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Schedule, reschedule, and manage your healthcare appointments
          </p>
        </div>
        
        <button
          onClick={() => setShowBookingModal(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Reminder Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-primary-500" />
          <span>Appointment Reminders</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Notification Methods</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reminderPreferences.email}
                  onChange={(e) => setReminderPreferences(prev => ({ ...prev, email: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Email notifications
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reminderPreferences.sms}
                  onChange={(e) => setReminderPreferences(prev => ({ ...prev, sms: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  SMS notifications
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reminderPreferences.push}
                  onChange={(e) => setReminderPreferences(prev => ({ ...prev, push: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Push notifications
                </span>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Reminder Timing</h4>
            <select
              value={reminderPreferences.timing}
              onChange={(e) => setReminderPreferences(prev => ({ ...prev, timing: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="24h">24 hours before</option>
              <option value="2h">2 hours before</option>
              <option value="30m">30 minutes before</option>
            </select>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Calendar Integration</h4>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Google Calendar</span>
                </button>
                
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Apple Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        {renderCalendarHeader()}
        
        <div className="mt-4">
          {calendarView === 'month' && renderMonthView()}
          {calendarView === 'week' && renderWeekView()}
          {calendarView === 'day' && renderDayView()}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Appointments
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Appointments</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg font-medium">No appointments found</p>
            <p className="text-sm">Try adjusting your filters or book a new appointment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${
                  appointment.status === 'cancelled' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      appointment.type === 'in-person'
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : 'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      {appointment.type === 'in-person' ? (
                        <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Video className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {appointment.doctorName}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {appointment.specialty}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {appointment.type === 'in-person' ? (
                            <>
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                In-person
                              </span>
                            </>
                          ) : (
                            <>
                              <Video className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                Telehealth
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowAppointmentDetails(appointment.id)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Details
                    </button>
                    
                    {appointment.status === 'upcoming' && (
                      <>
                        {canRescheduleAppointment(appointment) && (
                          <button
                            onClick={() => {
                              setShowRescheduleModal(appointment.id);
                              setSelectedDoctor(doctors.find(d => d.id === appointment.doctorId) || null);
                            }}
                            className="px-3 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors"
                          >
                            Reschedule
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-3 py-2 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Book New Appointment
                  </h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1: Select Doctor */}
                  <div className="md:col-span-1 border-r border-gray-200 dark:border-gray-700 pr-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      1. Select Provider
                    </h3>
                    
                    <div className="space-y-4">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => setSelectedDoctor(doctor)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedDoctor?.id === doctor.id
                              ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-500'
                              : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {doctor.image ? (
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                              </div>
                            )}
                            
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {doctor.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {doctor.specialty}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Step 2: Select Date & Time */}
                  <div className="md:col-span-1 border-r border-gray-200 dark:border-gray-700 px-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      2. Select Date & Time
                    </h3>
                    
                    {selectedDoctor ? (
                      <>
                        {selectedDoctor.availableSlots ? (
                          <div className="space-y-4">
                            {/* Group slots by date */}
                            {Array.from(new Set(selectedDoctor.availableSlots.map(slot => slot.date))).map(date => {
                              const slotsForDate = selectedDoctor.availableSlots!.filter(slot => 
                                slot.date === date && slot.available
                              );
                              
                              if (slotsForDate.length === 0) return null;
                              
                              return (
                                <div key={date} className="mb-4">
                                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                    {new Date(date).toLocaleDateString(undefined, { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </h4>
                                  
                                  <div className="grid grid-cols-3 gap-2">
                                    {slotsForDate.map((slot, index) => (
                                      <button
                                        key={`${slot.date}-${slot.time}`}
                                        onClick={() => setSelectedTimeSlot(slot)}
                                        className={`p-2 text-center rounded-lg text-sm transition-colors ${
                                          selectedTimeSlot?.date === slot.date && selectedTimeSlot?.time === slot.time
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                      >
                                        {slot.time}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-48">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Calendar className="w-12 h-12 mx-auto mb-2" />
                        <p>Please select a provider first</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Step 3: Appointment Details */}
                  <div className="md:col-span-1 pl-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      3. Appointment Details
                    </h3>
                    
                    {selectedDoctor && selectedTimeSlot ? (
                      <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Appointment Summary
                          </h4>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Provider:</span>
                              <span className="text-gray-900 dark:text-white">{selectedDoctor.name}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Specialty:</span>
                              <span className="text-gray-900 dark:text-white">{selectedDoctor.specialty}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Date:</span>
                              <span className="text-gray-900 dark:text-white">
                                {new Date(selectedTimeSlot.date).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Time:</span>
                              <span className="text-gray-900 dark:text-white">{selectedTimeSlot.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Appointment Type
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                              <input
                                type="radio"
                                name="appointmentType"
                                value="in-person"
                                checked={appointmentType === 'in-person'}
                                onChange={() => setAppointmentType('in-person')}
                                className="w-4 h-4 text-primary-600"
                              />
                              <div className="ml-3">
                                <div className="font-medium text-gray-900 dark:text-white">In-Person</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Visit the clinic</div>
                              </div>
                            </label>
                            
                            <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                              <input
                                type="radio"
                                name="appointmentType"
                                value="telehealth"
                                checked={appointmentType === 'telehealth'}
                                onChange={() => setAppointmentType('telehealth')}
                                className="w-4 h-4 text-primary-600"
                              />
                              <div className="ml-3">
                                <div className="font-medium text-gray-900 dark:text-white">Telehealth</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Video consultation</div>
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Notes (Optional)
                          </label>
                          <textarea
                            value={appointmentNotes}
                            onChange={(e) => setAppointmentNotes(e.target.value)}
                            placeholder="Add any notes or reason for visit"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            rows={3}
                          />
                        </div>
                        
                        <button
                          onClick={handleBookAppointment}
                          className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          Confirm Appointment
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <Clock className="w-12 h-12 mx-auto mb-2" />
                        <p>Select a provider and time slot</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {showRescheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Reschedule Appointment
                  </h2>
                  <button
                    onClick={() => setShowRescheduleModal(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Current Appointment
                  </h3>
                  
                  {showRescheduleModal && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Provider:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {appointments.find(a => a.id === showRescheduleModal)?.doctorName}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Specialty:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {appointments.find(a => a.id === showRescheduleModal)?.specialty}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Date:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {new Date(appointments.find(a => a.id === showRescheduleModal)?.date || '').toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Time:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {appointments.find(a => a.id === showRescheduleModal)?.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Select New Date & Time
                  </h3>
                  
                  {selectedDoctor?.availableSlots ? (
                    <div className="space-y-4">
                      {/* Group slots by date */}
                      {Array.from(new Set(selectedDoctor.availableSlots.map(slot => slot.date))).map(date => {
                        const slotsForDate = selectedDoctor.availableSlots!.filter(slot => 
                          slot.date === date && slot.available
                        );
                        
                        if (slotsForDate.length === 0) return null;
                        
                        return (
                          <div key={date} className="mb-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {new Date(date).toLocaleDateString(undefined, { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </h4>
                            
                            <div className="grid grid-cols-4 gap-2">
                              {slotsForDate.map((slot, index) => (
                                <button
                                  key={`${slot.date}-${slot.time}`}
                                  onClick={() => setSelectedTimeSlot(slot)}
                                  className={`p-2 text-center rounded-lg text-sm transition-colors ${
                                    selectedTimeSlot?.date === slot.date && selectedTimeSlot?.time === slot.time
                                      ? 'bg-primary-600 text-white'
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleRescheduleAppointment}
                    disabled={!selectedTimeSlot}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Confirm Reschedule
                  </button>
                  
                  <button
                    onClick={() => setShowRescheduleModal(null)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Appointment Details Modal */}
      <AnimatePresence>
        {showAppointmentDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full"
            >
              <div className="p-6">
                {(() => {
                  const appointment = appointments.find(a => a.id === showAppointmentDetails);
                  if (!appointment) return null;
                  
                  return (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Appointment Details
                        </h2>
                        <button
                          onClick={() => setShowAppointmentDetails(null)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {appointment.doctorName}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Specialty</h4>
                              <p className="text-gray-900 dark:text-white">{appointment.specialty}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</h4>
                              <p className="text-gray-900 dark:text-white">
                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h4>
                              <p className="text-gray-900 dark:text-white">{appointment.duration} minutes</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Appointment Type</h4>
                              <p className="text-gray-900 dark:text-white capitalize">{appointment.type}</p>
                            </div>
                            
                            {appointment.location && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                                <p className="text-gray-900 dark:text-white">{appointment.location}</p>
                              </div>
                            )}
                            
                            {appointment.notes && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h4>
                                <p className="text-gray-900 dark:text-white">{appointment.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {appointment.status === 'upcoming' && (
                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                          {appointment.type === 'telehealth' && (
                            <button
                              onClick={async () => {
                                try {
                                  const roomUrl = await telehealthService.generateTelehealthUrl(appointment.id);
                                  toast.success('Joining video call...');
                                  window.open(roomUrl, '_blank');
                                } catch (error) {
                                  console.error('Error joining video call:', error);
                                  toast.error('Failed to join video call. Please try again.');
                                }
                              }}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
                              <Video className="w-4 h-4" />
                              <span>Join Video Call</span>
                            </button>
                          )}
                          
                          {canRescheduleAppointment(appointment) && (
                            <button
                              onClick={() => {
                                setShowAppointmentDetails(null);
                                setShowRescheduleModal(appointment.id);
                                setSelectedDoctor(doctors.find(d => d.id === appointment.doctorId) || null);
                              }}
                              className="px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors flex items-center justify-center space-x-2"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Reschedule</span>
                            </button>
                          )}
                          
                          <button
                            onClick={() => {
                              setShowAppointmentDetails(null);
                              handleCancelAppointment(appointment.id);
                            }}
                            className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors flex items-center justify-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                      
                      {appointment.status === 'completed' && (
                        <div className="flex justify-end">
                          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                            View Summary
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentManagementSystem;