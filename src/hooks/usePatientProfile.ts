import { useState, useEffect } from 'react';
import { supabase, PatientProfile } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function usePatientProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [profile, setProfile] = useState<PatientProfile | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('patient_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data as PatientProfile);
      } catch (err) {
        console.error('Error fetching patient profile:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<PatientProfile>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      console.error('Error updating patient profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: Partial<PatientProfile>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_profiles')
        .insert([{ id: user.id, ...profileData }]);

      if (error) {
        throw error;
      }

      // Fetch the newly created profile
      const { data, error: fetchError } = await supabase
        .from('patient_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setProfile(data as PatientProfile);
    } catch (err) {
      console.error('Error creating patient profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to create profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, updateProfile, createProfile };
}