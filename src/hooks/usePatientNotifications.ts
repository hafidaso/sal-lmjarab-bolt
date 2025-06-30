import { useState, useEffect } from 'react';
import { supabase, PatientNotification, PatientNotificationPreferences } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function usePatientNotifications() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [notifications, setNotifications] = useState<PatientNotification[]>([]);
  const [preferences, setPreferences] = useState<PatientNotificationPreferences | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchNotificationsAndPreferences() {
      try {
        setLoading(true);
        setError(null);

        // Fetch notifications
        const { data: notificationsData, error: notificationsError } = await supabase
          .from('patient_notifications')
          .select('*')
          .eq('patient_id', user.id)
          .order('created_at', { ascending: false });

        if (notificationsError) {
          throw notificationsError;
        }

        // Fetch preferences
        const { data: preferencesData, error: preferencesError } = await supabase
          .from('patient_notification_preferences')
          .select('*')
          .eq('patient_id', user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
          throw preferencesError;
        }

        setNotifications(notificationsData as PatientNotification[]);
        setPreferences(preferencesData as PatientNotificationPreferences);
        
        // Calculate unread count
        const unread = notificationsData.filter((n: PatientNotification) => !n.read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
      } finally {
        setLoading(false);
      }
    }

    fetchNotificationsAndPreferences();
  }, [user]);

  const markAsRead = async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setError(null);

      const { error } = await supabase
        .from('patient_notifications')
        .update({ read: true })
        .eq('id', id)
        .eq('patient_id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError(err instanceof Error ? err : new Error('Failed to mark notification as read'));
      throw err;
    }
  };

  const markAllAsRead = async (): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setError(null);

      const { error } = await supabase
        .from('patient_notifications')
        .update({ read: true })
        .eq('patient_id', user.id)
        .eq('read', false);

      if (error) {
        throw error;
      }

      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // Update unread count
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setError(err instanceof Error ? err : new Error('Failed to mark all notifications as read'));
      throw err;
    }
  };

  const updatePreferences = async (updates: Partial<PatientNotificationPreferences>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      if (preferences) {
        // Update existing preferences
        const { error } = await supabase
          .from('patient_notification_preferences')
          .update(updates)
          .eq('patient_id', user.id);

        if (error) {
          throw error;
        }
      } else {
        // Create new preferences
        const { error } = await supabase
          .from('patient_notification_preferences')
          .insert([{ patient_id: user.id, ...updates }]);

        if (error) {
          throw error;
        }
      }

      // Update local state
      setPreferences(prev => prev ? { ...prev, ...updates } : { patient_id: user.id, ...updates } as PatientNotificationPreferences);
    } catch (err) {
      console.error('Error updating notification preferences:', err);
      setError(err instanceof Error ? err : new Error('Failed to update notification preferences'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    notifications, 
    preferences, 
    unreadCount,
    loading, 
    error, 
    markAsRead, 
    markAllAsRead, 
    updatePreferences 
  };
}