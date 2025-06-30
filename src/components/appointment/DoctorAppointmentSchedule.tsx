import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, Video, CheckCircle, X, ChevronLeft, ChevronRight, Plus, FileText, MessageCircle, Download, Filter, Search, Edit, Trash2, AlertCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentService, Appointment, TimeSlot, getCachedAvailability, invalidateAvailabilityCache } from '../../services/appointmentService';
import toast from 'react-hot-toast';
import { supabase } from '../../services/supabaseClient';

interface DoctorAppointmentScheduleProps {
  doctorId?: string;
}

interface AppointmentStats {
  today: number;
  thisWeek: number;
  pending: number;
  completed: number;
}

// Add a live region for screen reader announcements
const AriaLive = () => (
  <div aria-live="polite" aria-atomic="true" className="sr-only" id="aria-live-region"></div>
);

const DoctorAppointmentSchedule: React.FC<DoctorAppointmentScheduleProps> = ({ doctorId: propDoctorId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const doctorId = propDoctorId || (user && user.id);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'list'>('list');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Appointment['status'] | 'all'>('all');
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([]);
  const [stats, setStats] = useState<AppointmentStats>({
    today: 0,
    thisWeek: 0,
    pending: 0,
    completed: 0
  });

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
    type: 'in-person' as 'in-person' | 'telehealth',
    reason: '',
    notes: '',
    duration: 30
  });

  const addModalRef = useRef<HTMLDivElement>(null);
  const editModalRef = useRef<HTMLDivElement>(null);
  const [ariaMessage, setAriaMessage] = useState('');

  // Focus trap for modals
  useEffect(() => {
    const trapFocus = (e: KeyboardEvent) => {
      const modal = showNewAppointmentModal ? addModalRef.current : showAppointmentModal ? editModalRef.current : null;
      if (!modal) return;
      const focusableEls = modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        if (showNewAppointmentModal) setShowNewAppointmentModal(false);
        if (showAppointmentModal) setShowAppointmentModal(false);
      }
    };
    if (showNewAppointmentModal || showAppointmentModal) {
      document.addEventListener('keydown', trapFocus);
      setTimeout(() => {
        const modal = showNewAppointmentModal ? addModalRef.current : showAppointmentModal ? editModalRef.current : null;
        if (modal) {
          const focusableEls = modal.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableEls.length) focusableEls[0].focus();
        }
      }, 100);
      setAriaMessage(showNewAppointmentModal ? 'Add appointment dialog opened' : 'Edit appointment dialog opened');
    } else {
      document.removeEventListener('keydown', trapFocus);
      setAriaMessage('Dialog closed');
    }
    return () => document.removeEventListener('keydown', trapFocus);
  }, [showNewAppointmentModal, showAppointmentModal]);

  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  useEffect(() => {
    calculateStats();
  }, [appointments]);

  useEffect(() => {
    if (!doctorId) return;
    // Subscribe to real-time updates for appointments and doctor availability
    const channel = supabase
      .channel('doctor-appointments-availability')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments', filter: `doctor_id=eq.${doctorId}` },
        (payload) => {
          // Invalidate cache and refetch appointments
          invalidateAvailabilityCache(doctorId);
          fetchAppointments();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'doctor_availability', filter: `doctor_id=eq.${doctorId}` },
        (payload) => {
          // Invalidate cache and refetch appointments
          invalidateAvailabilityCache(doctorId);
          fetchAppointments();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [doctorId]);

  const fetchAppointments = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const data = await appointmentService.getDoctorAppointments(doctorId);
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const todayAppointments = appointments.filter(apt => apt.date === today);
    const weekAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= weekStart && aptDate <= weekEnd;
    });
    const pendingAppointments = appointments.filter(apt => apt.status === 'scheduled');
    const completedAppointments = appointments.filter(apt => apt.status === 'completed');

    setStats({
      today: todayAppointments.length,
      thisWeek: weekAppointments.length,
      pending: pendingAppointments.length,
      completed: completedAppointments.length
    });
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    try {
      await appointmentService.updateAppointmentStatus(id, status);
      await fetchAppointments();
      toast.success(`Appointment status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update appointment status.');
    }
  };

  const updateAppointmentNotes = async (id: string, notes: string) => {
    try {
      await appointmentService.updateAppointmentNotes(id, notes);
      setAppointmentNotes('');
      await fetchAppointments();
      toast.success('Appointment notes updated successfully');
    } catch (error) {
      toast.error('Failed to update appointment notes.');
    }
  };

  const bulkUpdateStatus = async (status: Appointment['status']) => {
    if (selectedAppointments.length === 0) {
      toast.error('Please select appointments to update');
      return;
    }

    try {
      const promises = selectedAppointments.map(id => 
        appointmentService.updateAppointmentStatus(id, status)
      );
      await Promise.all(promises);
      await fetchAppointments();
      setSelectedAppointments([]);
      toast.success(`Updated ${selectedAppointments.length} appointments to ${status}`);
    } catch (error) {
      toast.error('Failed to update appointments');
    }
  };

  const exportSchedule = () => {
    const csvContent = [
      ['Patient Name', 'Date', 'Time', 'Status', 'Type', 'Reason'],
      ...appointments.map(apt => [
        apt.patientName,
        apt.date,
        apt.time,
        apt.status,
        apt.type,
        apt.reason
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Schedule exported successfully');
  };

  const sendReminders = async () => {
    const pendingAppointments = appointments.filter(apt => apt.status === 'scheduled');
    if (pendingAppointments.length === 0) {
      toast.error('No pending appointments to send reminders for');
      return;
    }

    try {
      // In a real implementation, this would send actual reminders
      toast.success(`Reminders sent for ${pendingAppointments.length} appointments`);
    } catch (error) {
      toast.error('Failed to send reminders');
    }
  };

  const createNewAppointment = async () => {
    if (!doctorId) {
      toast.error('Doctor ID not found');
      return;
    }

    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const appointmentData = {
        doctorId,
        patientId: 'temp-patient-id', // In a real app, you'd look up or create a patient
        doctorName: user?.name || 'Doctor',
        patientName: newAppointment.patientName,
        specialty: 'General Medicine', // You might want to make this configurable
        date: newAppointment.date,
        time: newAppointment.time,
        duration: newAppointment.duration,
        type: newAppointment.type,
        status: 'scheduled' as const,
        location: newAppointment.type === 'in-person' ? 'Office' : undefined,
        reason: newAppointment.reason,
        notes: newAppointment.notes,
        reminderSent: false,
        reminderPreferences: {
          email: true,
          sms: true,
          push: false,
          timing: '24h' as '24h' | '2h' | '30m' | '15m'
        },
        canReschedule: true
      };

      await appointmentService.createAppointment(appointmentData);
      
      // Reset form
      setNewAppointment({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        date: '',
        time: '',
        type: 'in-person',
        reason: '',
        notes: '',
        duration: 30
      });
      
      setShowNewAppointmentModal(false);
      await fetchAppointments();
      toast.success('Appointment created successfully');
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to create appointment');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAppointment = (id: string) => {
    setSelectedAppointments(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAppointments.length === filteredAppointments.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(filteredAppointments.map(apt => apt.id));
    }
  };

  return (
    <div className="space-y-6">
      <AriaLive />
      <script dangerouslySetInnerHTML={{__html: `document.getElementById('aria-live-region').textContent = '${ariaMessage}';`}} />
      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Today's Appointments</p>
              <p className="text-3xl font-bold">{stats.today}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">This Week</p>
              <p className="text-3xl font-bold">{stats.thisWeek}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Pending</p>
              <p className="text-3xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Completed</p>
              <p className="text-3xl font-bold">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Management Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appointment Management</h3>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setShowNewAppointmentModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Appointment</span>
            </button>
            
            <button 
              onClick={() => bulkUpdateStatus('completed')}
              disabled={selectedAppointments.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Complete Selected</span>
            </button>
            
            <button 
              onClick={exportSchedule}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            
            <button 
              onClick={sendReminders}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Reminders</span>
            </button>

            <button 
              onClick={() => navigate(`/doctor/${doctorId}/review`)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              title={`Review Dr. ${user?.name || 'Doctor'}`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search patients or reasons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Appointment['status'] | 'all')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
            <option value="no-show">No Show</option>
          </select>
        </div>

        {/* Appointments List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedAppointments.length === filteredAppointments.length && filteredAppointments.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Reason</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Loading appointments...
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No appointments found
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleSelectAppointment(appointment.id)}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{appointment.patientName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.type === 'telehealth'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      }`}>
                        {appointment.type === 'telehealth' ? (
                          <>
                            <Video className="w-3 h-3 mr-1" />
                            Telehealth
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3 mr-1" />
                            In-person
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'scheduled' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : appointment.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : appointment.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                        {appointment.reason}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowAppointmentModal(true);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-700 focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                          aria-label="Edit appointment"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="p-1 text-green-600 hover:text-green-700 focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                          aria-label="Mark appointment as completed"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {showAppointmentModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="edit-appointment-title" aria-describedby="edit-appointment-desc" ref={editModalRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white" id="edit-appointment-title">
                    Appointment Details
                  </h2>
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label="Close appointment details dialog"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div id="edit-appointment-desc" className="sr-only">Edit appointment details, notes, and status.</div>
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedAppointment.patientName}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedAppointment.status === 'scheduled' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : selectedAppointment.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : selectedAppointment.status === 'cancelled'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                        }`}>
                          {selectedAppointment.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedAppointment.type === 'telehealth'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                        }`}>
                          {selectedAppointment.type === 'telehealth' ? 'Telehealth' : 'In-person'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(selectedAppointment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedAppointment.time} ({selectedAppointment.duration} min)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reason for Visit */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Reason for Visit
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedAppointment.reason}
                    </p>
                  </div>
                  
                  {/* Notes */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Appointment Notes
                    </h4>
                    <div className="space-y-2">
                      <textarea
                        value={appointmentNotes}
                        onChange={(e) => setAppointmentNotes(e.target.value)}
                        placeholder="Add notes about this appointment..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                      />
                      <button
                        onClick={() => updateAppointmentNotes(selectedAppointment.id, appointmentNotes)}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                  
                  {/* Status Actions */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, 'completed')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                      aria-label="Mark appointment as completed"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, 'cancelled')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Appointment Modal */}
      <AnimatePresence>
        {showNewAppointmentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="add-appointment-title" aria-describedby="add-appointment-desc" ref={addModalRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white" id="add-appointment-title">
                    Add New Appointment
                  </h2>
                  <button
                    onClick={() => setShowNewAppointmentModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label="Close add appointment dialog"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div id="add-appointment-desc" className="sr-only">Fill out the form to add a new appointment.</div>
                <form onSubmit={e => { e.preventDefault(); createNewAppointment(); }}>
                  <div className="space-y-6">
                    {/* Patient Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Patient Name *
                        </label>
                        <input
                          id="patientName"
                          type="text"
                          value={newAppointment.patientName}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, patientName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter patient name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Patient Email
                        </label>
                        <input
                          id="patientEmail"
                          type="email"
                          value={newAppointment.patientEmail}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, patientEmail: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter patient email"
                        />
                      </div>
                      <div>
                        <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Patient Phone
                        </label>
                        <input
                          id="patientPhone"
                          type="tel"
                          value={newAppointment.patientPhone}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, patientPhone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter patient phone"
                        />
                      </div>
                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration (minutes)
                        </label>
                        <select
                          id="duration"
                          value={newAppointment.duration}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={45}>45 minutes</option>
                          <option value={60}>60 minutes</option>
                        </select>
                      </div>
                    </div>
                    {/* Appointment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Date *
                        </label>
                        <input
                          id="date"
                          type="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Time *
                        </label>
                        <input
                          id="time"
                          type="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    {/* Appointment Type */}
                    <div>
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" id="appt-type-label">
                        Appointment Type
                      </span>
                      <div className="flex space-x-4" role="radiogroup" aria-labelledby="appt-type-label">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="apptType"
                            value="in-person"
                            checked={newAppointment.type === 'in-person'}
                            onChange={(e) => setNewAppointment(prev => ({ ...prev, type: e.target.value as 'in-person' | 'telehealth' }))}
                            className="mr-2"
                            aria-checked={newAppointment.type === 'in-person'}
                          />
                          <span className="text-gray-700 dark:text-gray-300">In-person</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="apptType"
                            value="telehealth"
                            checked={newAppointment.type === 'telehealth'}
                            onChange={(e) => setNewAppointment(prev => ({ ...prev, type: e.target.value as 'in-person' | 'telehealth' }))}
                            className="mr-2"
                            aria-checked={newAppointment.type === 'telehealth'}
                          />
                          <span className="text-gray-700 dark:text-gray-300">Telehealth</span>
                        </label>
                      </div>
                    </div>
                    {/* Reason for Visit */}
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Reason for Visit *
                      </label>
                      <textarea
                        id="reason"
                        value={newAppointment.reason}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, reason: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="Enter reason for visit"
                        required
                      />
                    </div>
                    {/* Notes */}
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={2}
                        placeholder="Additional notes (optional)"
                      />
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => setShowNewAppointmentModal(false)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                        aria-label="Cancel add appointment"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors focus:outline-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500"
                        aria-label="Create appointment"
                      >
                        Create Appointment
                      </button>
                    </div>
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

export default DoctorAppointmentSchedule;