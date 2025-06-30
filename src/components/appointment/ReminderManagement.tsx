import React, { useState, useEffect } from 'react';
import { Bell, Mail, Phone, Settings, Clock, CheckCircle, AlertCircle, Trash2, Edit, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentService, Appointment } from '../../services/appointmentService';

interface Reminder {
  id: string;
  appointmentId: string;
  type: 'email' | 'sms' | 'push';
  scheduledTime: string;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  recipientEmail?: string;
  recipientPhone?: string;
  message: string;
  createdAt: string;
}

interface ReminderManagementProps {
  appointmentId?: string;
  onClose?: () => void;
}

const ReminderManagement: React.FC<ReminderManagementProps> = ({
  appointmentId,
  onClose
}) => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [newReminder, setNewReminder] = useState({
    type: 'email' as 'email' | 'sms' | 'push',
    timing: '24h' as '24h' | '2h' | '30m' | '15m',
    message: '',
    recipientEmail: '',
    recipientPhone: ''
  });

  useEffect(() => {
    if (user) {
      loadReminders();
      loadAppointments();
    }
  }, [user, appointmentId]);

  const loadReminders = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the database
      const mockReminders: Reminder[] = [
        {
          id: '1',
          appointmentId: 'appointment-1',
          type: 'email',
          scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          recipientEmail: 'patient@example.com',
          message: 'Reminder: Your appointment with Dr. Ahmed Bennani is tomorrow at 10:00 AM.',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          appointmentId: 'appointment-1',
          type: 'sms',
          scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          status: 'pending',
          recipientPhone: '+212 6XX XXX XXX',
          message: 'Appointment reminder: Dr. Ahmed Bennani tomorrow at 10:00 AM.',
          createdAt: new Date().toISOString()
        }
      ];
      setReminders(mockReminders);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAppointments = async () => {
    try {
      if (user) {
        const patientAppointments = await appointmentService.getPatientAppointments(user.id);
        setAppointments(patientAppointments);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const handleAddReminder = async () => {
    if (!newReminder.message.trim()) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      appointmentId: appointmentId || 'general',
      type: newReminder.type,
      scheduledTime: calculateScheduledTime(newReminder.timing),
      status: 'pending',
      recipientEmail: newReminder.type === 'email' ? newReminder.recipientEmail : undefined,
      recipientPhone: newReminder.type === 'sms' ? newReminder.recipientPhone : undefined,
      message: newReminder.message,
      createdAt: new Date().toISOString()
    };

    setReminders(prev => [...prev, reminder]);
    setShowAddReminder(false);
    setNewReminder({
      type: 'email',
      timing: '24h',
      message: '',
      recipientEmail: '',
      recipientPhone: ''
    });
  };

  const calculateScheduledTime = (timing: string): string => {
    const now = new Date();
    switch (timing) {
      case '24h':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
      case '2h':
        return new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();
      case '30m':
        return new Date(now.getTime() + 30 * 60 * 1000).toISOString();
      case '15m':
        return new Date(now.getTime() + 15 * 60 * 1000).toISOString();
      default:
        return now.toISOString();
    }
  };

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setNewReminder({
      type: reminder.type,
      timing: '24h', // Default timing for editing
      message: reminder.message,
      recipientEmail: reminder.recipientEmail || '',
      recipientPhone: reminder.recipientPhone || ''
    });
  };

  const handleUpdateReminder = async () => {
    if (!editingReminder || !newReminder.message.trim()) return;

    const updatedReminder: Reminder = {
      ...editingReminder,
      type: newReminder.type,
      message: newReminder.message,
      recipientEmail: newReminder.type === 'email' ? newReminder.recipientEmail : undefined,
      recipientPhone: newReminder.type === 'sms' ? newReminder.recipientPhone : undefined
    };

    setReminders(prev => prev.map(r => r.id === editingReminder.id ? updatedReminder : r));
    setEditingReminder(null);
    setNewReminder({
      type: 'email',
      timing: '24h',
      message: '',
      recipientEmail: '',
      recipientPhone: ''
    });
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      setReminders(prev => prev.filter(r => r.id !== reminderId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'sent':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <Phone className="w-4 h-4" />;
      case 'push':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const getAppointmentInfo = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    return appointment ? `${appointment.doctorName} - ${new Date(appointment.date).toLocaleDateString()} ${appointment.time}` : 'Unknown appointment';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Reminder Management
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage automated reminders and notifications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddReminder(true)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Reminder</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No reminders scheduled</p>
            <p className="text-sm mt-1">Add a reminder to get notified about your appointments</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    {getTypeIcon(reminder.type)}
                    <span className="text-sm font-medium capitalize">{reminder.type}</span>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white mb-1">
                      {reminder.message}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDateTime(reminder.scheduledTime)}</span>
                      </div>
                      {reminder.appointmentId !== 'general' && (
                        <span>{getAppointmentInfo(reminder.appointmentId)}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                    {reminder.status}
                  </span>
                  
                  <button
                    onClick={() => handleEditReminder(reminder)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="p-1 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Reminder Modal */}
      <AnimatePresence>
        {(showAddReminder || editingReminder) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reminder Type
                  </label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="push">Push Notification</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Timing
                  </label>
                  <select
                    value={newReminder.timing}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, timing: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="24h">24 hours before</option>
                    <option value="2h">2 hours before</option>
                    <option value="30m">30 minutes before</option>
                    <option value="15m">15 minutes before</option>
                  </select>
                </div>
                
                {newReminder.type === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newReminder.recipientEmail}
                      onChange={(e) => setNewReminder(prev => ({ ...prev, recipientEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="patient@example.com"
                    />
                  </div>
                )}
                
                {newReminder.type === 'sms' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newReminder.recipientPhone}
                      onChange={(e) => setNewReminder(prev => ({ ...prev, recipientPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newReminder.message}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={3}
                    placeholder="Enter your reminder message..."
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddReminder(false);
                    setEditingReminder(null);
                    setNewReminder({
                      type: 'email',
                      timing: '24h',
                      message: '',
                      recipientEmail: '',
                      recipientPhone: ''
                    });
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingReminder ? handleUpdateReminder : handleAddReminder}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  {editingReminder ? 'Update' : 'Add'} Reminder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReminderManagement; 