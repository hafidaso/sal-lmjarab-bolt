import { supabase } from '../lib/supabase';

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'in-person' | 'telehealth';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
  location?: string;
  telehealthUrl?: string;
  reason: string;
  notes?: string;
  reminderSent: boolean;
  reminderPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    timing: '24h' | '2h' | '30m' | '15m';
  };
  canReschedule: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  type: 'consultation' | 'follow-up' | 'emergency';
  duration: number;
  doctorId: string;
}

export interface DoctorAvailability {
  doctorId: string;
  workingHours: {
    [key: string]: { start: string; end: string; available: boolean };
  };
  breaks: {
    [key: string]: { start: string; end: string; reason: string }[];
  };
  holidays: string[];
  maxPatientsPerDay: number;
  appointmentDuration: number;
}

export interface ReminderSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  timing: '24h' | '2h' | '30m' | '15m';
  customMessage?: string;
}

class AppointmentService {
  // Real-time availability checking
  async getRealTimeAvailability(doctorId: string, date: string): Promise<TimeSlot[]> {
    try {
      // Get doctor's working hours and existing appointments
      const { data: availability } = await supabase
        .from('doctor_availability')
        .select('*')
        .eq('doctor_id', doctorId)
        .single();

      const { data: existingAppointments } = await supabase
        .from('appointments')
        .select('date, time, duration')
        .eq('doctor_id', doctorId)
        .eq('date', date)
        .in('status', ['scheduled', 'confirmed']);

      // Generate available time slots
      const timeSlots: TimeSlot[] = [];
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      const workingHours = availability?.working_hours?.[dayOfWeek];

      if (workingHours?.available) {
        const startTime = new Date(`${date}T${workingHours.start}`);
        const endTime = new Date(`${date}T${workingHours.end}`);
        const slotDuration = availability?.appointment_duration || 30;

        for (let time = new Date(startTime); time < endTime; time.setMinutes(time.getMinutes() + slotDuration)) {
          const timeString = time.toTimeString().slice(0, 5);
          
          // Check if slot conflicts with existing appointments
          const isConflict = existingAppointments?.some(apt => {
            const aptStart = new Date(`${date}T${apt.time}`);
            const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000);
            const slotEnd = new Date(time.getTime() + slotDuration * 60000);
            
            return (time >= aptStart && time < aptEnd) || (slotEnd > aptStart && slotEnd <= aptEnd);
          });

          if (!isConflict) {
            timeSlots.push({
              id: `${doctorId}-${date}-${timeString}`,
              date,
              time: timeString,
              available: true,
              type: 'consultation',
              duration: slotDuration,
              doctorId
            });
          }
        }
      }

      return timeSlots;
    } catch (error) {
      console.error('Error fetching real-time availability:', error);
      return [];
    }
  }

  // Book appointment with real-time validation
  async bookAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    try {
      // Check real-time availability
      const availableSlots = await this.getRealTimeAvailability(appointmentData.doctorId, appointmentData.date);
      const isSlotAvailable = availableSlots.some(slot => 
        slot.time === appointmentData.time && slot.available
      );

      if (!isSlotAvailable) {
        throw new Error('Selected time slot is no longer available');
      }

      // Create appointment
      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert([{
          ...appointmentData,
          status: 'scheduled',
          reminder_sent: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Schedule reminders
      await this.scheduleReminders(appointment);

      // Send confirmation
      await this.sendConfirmation(appointment);

      return appointment;
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }

  // Schedule automated reminders
  async scheduleReminders(appointment: Appointment): Promise<void> {
    const { reminderPreferences } = appointment;
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);

    // Schedule reminders based on preferences
    const reminderTimes = this.getReminderTimes(appointmentDateTime, reminderPreferences.timing);

    for (const reminderTime of reminderTimes) {
      if (reminderPreferences.email) {
        await this.scheduleEmailReminder(appointment, reminderTime);
      }
      if (reminderPreferences.sms) {
        await this.scheduleSMSReminder(appointment, reminderTime);
      }
      if (reminderPreferences.push) {
        await this.schedulePushReminder(appointment, reminderTime);
      }
    }
  }

  // Get reminder times based on timing preference
  private getReminderTimes(appointmentDateTime: Date, timing: string): Date[] {
    const times: Date[] = [];
    const now = new Date();

    switch (timing) {
      case '24h':
        const dayBefore = new Date(appointmentDateTime.getTime() - 24 * 60 * 60 * 1000);
        if (dayBefore > now) times.push(dayBefore);
        break;
      case '2h':
        const twoHoursBefore = new Date(appointmentDateTime.getTime() - 2 * 60 * 60 * 1000);
        if (twoHoursBefore > now) times.push(twoHoursBefore);
        break;
      case '30m':
        const thirtyMinutesBefore = new Date(appointmentDateTime.getTime() - 30 * 60 * 1000);
        if (thirtyMinutesBefore > now) times.push(thirtyMinutesBefore);
        break;
      case '15m':
        const fifteenMinutesBefore = new Date(appointmentDateTime.getTime() - 15 * 60 * 1000);
        if (fifteenMinutesBefore > now) times.push(fifteenMinutesBefore);
        break;
    }

    return times;
  }

  // Schedule email reminder
  private async scheduleEmailReminder(appointment: Appointment, reminderTime: Date): Promise<void> {
    try {
      await supabase
        .from('scheduled_reminders')
        .insert([{
          appointment_id: appointment.id,
          type: 'email',
          scheduled_time: reminderTime.toISOString(),
          status: 'pending',
          recipient_email: appointment.patientName, // Should be actual patient email
          message: this.generateReminderMessage(appointment, 'email')
        }]);
    } catch (error) {
      console.error('Error scheduling email reminder:', error);
    }
  }

  // Schedule SMS reminder
  private async scheduleSMSReminder(appointment: Appointment, reminderTime: Date): Promise<void> {
    try {
      await supabase
        .from('scheduled_reminders')
        .insert([{
          appointment_id: appointment.id,
          type: 'sms',
          scheduled_time: reminderTime.toISOString(),
          status: 'pending',
          recipient_phone: appointment.patientName, // Should be actual patient phone
          message: this.generateReminderMessage(appointment, 'sms')
        }]);
    } catch (error) {
      console.error('Error scheduling SMS reminder:', error);
    }
  }

  // Schedule push notification reminder
  private async schedulePushReminder(appointment: Appointment, reminderTime: Date): Promise<void> {
    try {
      await supabase
        .from('scheduled_reminders')
        .insert([{
          appointment_id: appointment.id,
          type: 'push',
          scheduled_time: reminderTime.toISOString(),
          status: 'pending',
          recipient_id: appointment.patientId,
          message: this.generateReminderMessage(appointment, 'push')
        }]);
    } catch (error) {
      console.error('Error scheduling push reminder:', error);
    }
  }

  // Generate reminder message
  private generateReminderMessage(appointment: Appointment, type: 'email' | 'sms' | 'push'): string {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    const formattedDate = appointmentDate.toLocaleDateString();
    const formattedTime = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const baseMessage = `Reminder: Your appointment with ${appointment.doctorName} is scheduled for ${formattedDate} at ${formattedTime}.`;
    
    if (appointment.type === 'telehealth') {
      return `${baseMessage} This is a telehealth appointment. You will receive a link 10 minutes before the appointment.`;
    } else {
      return `${baseMessage} Please arrive 10 minutes early. Location: ${appointment.location}`;
    }
  }

  // Send confirmation
  private async sendConfirmation(appointment: Appointment): Promise<void> {
    try {
      // Send email confirmation
      await this.sendEmailConfirmation(appointment);
      
      // Send SMS confirmation
      await this.sendSMSConfirmation(appointment);
      
      // Update appointment status
      await supabase
        .from('appointments')
        .update({ status: 'confirmed' })
        .eq('id', appointment.id);
    } catch (error) {
      console.error('Error sending confirmation:', error);
    }
  }

  // Send email confirmation
  private async sendEmailConfirmation(appointment: Appointment): Promise<void> {
    const subject = 'Appointment Confirmation';
    const body = `
      Dear ${appointment.patientName},
      
      Your appointment has been confirmed:
      
      Doctor: ${appointment.doctorName}
      Specialty: ${appointment.specialty}
      Date: ${new Date(appointment.date).toLocaleDateString()}
      Time: ${appointment.time}
      Type: ${appointment.type === 'telehealth' ? 'Telehealth' : 'In-person'}
      ${appointment.location ? `Location: ${appointment.location}` : ''}
      
      ${appointment.type === 'telehealth' ? 
        'You will receive a telehealth link 10 minutes before your appointment.' : 
        'Please arrive 10 minutes early for your appointment.'
      }
      
      Reason: ${appointment.reason}
      
      If you need to reschedule or cancel, please contact us at least 24 hours in advance.
      
      Best regards,
      Healthcare Team
    `;

    // In a real implementation, this would use an email service like SendGrid or AWS SES
    console.log('Sending email confirmation:', { to: appointment.patientName, subject, body });
  }

  // Send SMS confirmation
  private async sendSMSConfirmation(appointment: Appointment): Promise<void> {
    const message = `Appointment confirmed with ${appointment.doctorName} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}. ${appointment.type === 'telehealth' ? 'Telehealth link will be sent 10 min before.' : 'Please arrive 10 min early.'}`;
    
    // In a real implementation, this would use an SMS service like Twilio
    console.log('Sending SMS confirmation:', message);
  }

  // Reschedule appointment
  async rescheduleAppointment(appointmentId: string, newDate: string, newTime: string): Promise<Appointment> {
    try {
      // Check availability for new time
      const appointment = await this.getAppointmentById(appointmentId);
      if (!appointment) throw new Error('Appointment not found');

      const availableSlots = await this.getRealTimeAvailability(appointment.doctorId, newDate);
      const isSlotAvailable = availableSlots.some(slot => 
        slot.time === newTime && slot.available
      );

      if (!isSlotAvailable) {
        throw new Error('Selected time slot is not available');
      }

      // Update appointment
      const { data: updatedAppointment, error } = await supabase
        .from('appointments')
        .update({
          date: newDate,
          time: newTime,
          status: 'rescheduled',
          updated_at: new Date().toISOString()
        })
        .eq('id', appointmentId)
        .select()
        .single();

      if (error) throw error;

      // Cancel old reminders and schedule new ones
      await this.cancelReminders(appointmentId);
      await this.scheduleReminders(updatedAppointment);

      // Send reschedule confirmation
      await this.sendRescheduleConfirmation(updatedAppointment);

      return updatedAppointment;
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      throw error;
    }
  }

  // Cancel appointment
  async cancelAppointment(appointmentId: string): Promise<void> {
    try {
      // Update appointment status
      await supabase
        .from('appointments')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', appointmentId);

      // Cancel all reminders
      await this.cancelReminders(appointmentId);

      // Send cancellation confirmation
      const appointment = await this.getAppointmentById(appointmentId);
      if (appointment) {
        await this.sendCancellationConfirmation(appointment);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }

  // Cancel all reminders for an appointment
  private async cancelReminders(appointmentId: string): Promise<void> {
    try {
      await supabase
        .from('scheduled_reminders')
        .update({ status: 'cancelled' })
        .eq('appointment_id', appointmentId);
    } catch (error) {
      console.error('Error cancelling reminders:', error);
    }
  }

  // Get appointment by ID
  async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    try {
      const { data: appointment, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .single();

      if (error) throw error;
      return appointment;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      return null;
    }
  }

  // Get patient appointments
  async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    try {
      const { data: appointments, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId)
        .order('date', { ascending: true });

      if (error) throw error;
      return appointments || [];
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      return [];
    }
  }

  // Get doctor appointments
  async getDoctorAppointments(doctorId: string, date?: string): Promise<Appointment[]> {
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', doctorId);

      if (date) {
        query = query.eq('date', date);
      }

      const { data: appointments, error } = await query.order('time', { ascending: true });

      if (error) throw error;
      return appointments || [];
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      return [];
    }
  }

  // Send reschedule confirmation
  private async sendRescheduleConfirmation(appointment: Appointment): Promise<void> {
    const message = `Your appointment with ${appointment.doctorName} has been rescheduled to ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}.`;
    
    console.log('Sending reschedule confirmation:', message);
  }

  // Send cancellation confirmation
  private async sendCancellationConfirmation(appointment: Appointment): Promise<void> {
    const message = `Your appointment with ${appointment.doctorName} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time} has been cancelled.`;
    
    console.log('Sending cancellation confirmation:', message);
  }

  // Generate telehealth URL
  async generateTelehealthUrl(appointmentId: string): Promise<string> {
    // Generate a secure telehealth URL for the appointment
    const baseUrl = process.env.REACT_APP_TELEHEALTH_URL || 'https://telehealth.example.com';
    const token = btoa(`${appointmentId}-${Date.now()}`); // Simple token generation
    return `${baseUrl}/room/${appointmentId}?token=${token}`;
  }

  // Update appointment status
  async updateAppointmentStatus(appointmentId: string, status: Appointment['status']): Promise<void> {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointmentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  }

  // Update appointment notes
  async updateAppointmentNotes(appointmentId: string, notes: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ 
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', appointmentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating appointment notes:', error);
      throw error;
    }
  }

  // Create appointment manually (for doctors)
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    try {
      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert([{
          ...appointmentData,
          status: 'scheduled',
          reminder_sent: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Schedule reminders
      await this.scheduleReminders(appointment);

      return appointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  // Check if appointment can be rescheduled
  canRescheduleAppointment(appointment: Appointment): boolean {
    if (!appointment.canReschedule || appointment.status !== 'scheduled') return false;
    
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const hoursDiff = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return hoursDiff > 24;
  }
}

export const appointmentService = new AppointmentService();

// In-memory cache for doctor availability
const availabilityCache: {
  [key: string]: { data: TimeSlot[]; expiry: number }
} = {};

/**
 * Get cached doctor availability for a given doctor and date.
 * If cache is valid, return cached data. Otherwise, fetch from Supabase and cache it.
 */
export async function getCachedAvailability(doctorId: string, date: string): Promise<TimeSlot[]> {
  const cacheKey = `${doctorId}-${date}`;
  const now = Date.now();
  const cached = availabilityCache[cacheKey];
  if (cached && cached.expiry > now) {
    return cached.data;
  }
  // Fetch from Supabase
  const slots = await appointmentService.getRealTimeAvailability(doctorId, date);
  // Cache for 2 minutes
  availabilityCache[cacheKey] = { data: slots, expiry: now + 2 * 60 * 1000 };
  return slots;
}

/**
 * Invalidate all cached availability for a doctor (e.g., on real-time update)
 */
export function invalidateAvailabilityCache(doctorId: string) {
  Object.keys(availabilityCache).forEach(key => {
    if (key.startsWith(`${doctorId}-`)) delete availabilityCache[key];
  });
} 