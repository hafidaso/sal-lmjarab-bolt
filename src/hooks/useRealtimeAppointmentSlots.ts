import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Subscribes to real-time changes on the appointments table for a given doctor.
 * Calls the provided callback whenever an appointment is inserted, updated, or deleted.
 * @param doctorId The doctor's ID to watch
 * @param onChange Callback to run when appointments change
 */
export function useRealtimeAppointmentSlots(doctorId: string, onChange: () => void) {
  useEffect(() => {
    if (!doctorId) return;
    const channel = supabase
      .channel('realtime:appointments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `doctor_id=eq.${doctorId}`
        },
        (payload) => {
          onChange();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [doctorId, onChange]);
} 