import { useState, useEffect } from 'react';
import { supabase, PatientAppointment } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function usePatientAppointments() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchAppointments() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('patient_appointments')
          .select('*')
          .eq('patient_id', user.id)
          .order('appointment_date', { ascending: true });

        if (error) {
          throw error;
        }

        setAppointments(data as PatientAppointment[]);
      } catch (err) {
        console.error('Error fetching patient appointments:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch appointments'));
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user]);

  const createAppointment = async (appointmentData: Partial<PatientAppointment>): Promise<PatientAppointment> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('patient_appointments')
        .insert([{ patient_id: user.id, ...appointmentData }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setAppointments(prev => [...prev, data as PatientAppointment]);
      
      return data as PatientAppointment;
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(err instanceof Error ? err : new Error('Failed to create appointment'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id: string, updates: Partial<PatientAppointment>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_appointments')
        .update(updates)
        .eq('id', id)
        .eq('patient_id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === id ? { ...appointment, ...updates } : appointment
        )
      );
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError(err instanceof Error ? err : new Error('Failed to update appointment'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string): Promise<void> => {
    return updateAppointment(id, { status: 'cancelled' });
  };

  const deleteAppointment = async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_appointments')
        .delete()
        .eq('id', id)
        .eq('patient_id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setAppointments(prev => prev.filter(appointment => appointment.id !== id));
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete appointment'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingAppointments = (): PatientAppointment[] => {
    const now = new Date();
    return appointments.filter(appointment => 
      new Date(appointment.appointment_date) > now && 
      appointment.status !== 'cancelled'
    );
  };

  const getPastAppointments = (): PatientAppointment[] => {
    const now = new Date();
    return appointments.filter(appointment => 
      new Date(appointment.appointment_date) <= now || 
      appointment.status === 'completed' ||
      appointment.status === 'no-show'
    );
  };

  return { 
    appointments, 
    loading, 
    error, 
    createAppointment, 
    updateAppointment, 
    cancelAppointment, 
    deleteAppointment,
    getUpcomingAppointments,
    getPastAppointments
  };
}