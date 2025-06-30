import { useState, useEffect } from 'react';
import { supabase, PatientSavedProvider } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function usePatientSavedProviders() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [savedProviders, setSavedProviders] = useState<PatientSavedProvider[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchSavedProviders() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('patient_saved_providers')
          .select('*')
          .eq('patient_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setSavedProviders(data as PatientSavedProvider[]);
      } catch (err) {
        console.error('Error fetching saved providers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch saved providers'));
      } finally {
        setLoading(false);
      }
    }

    fetchSavedProviders();
  }, [user]);

  const saveProvider = async (providerId: string, notes?: string): Promise<PatientSavedProvider> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      // Check if already saved
      const existing = savedProviders.find(p => p.provider_id === providerId);
      if (existing) {
        return existing;
      }

      const { data, error } = await supabase
        .from('patient_saved_providers')
        .insert([{ 
          patient_id: user.id, 
          provider_id: providerId,
          notes 
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setSavedProviders(prev => [data as PatientSavedProvider, ...prev]);
      
      return data as PatientSavedProvider;
    } catch (err) {
      console.error('Error saving provider:', err);
      setError(err instanceof Error ? err : new Error('Failed to save provider'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unsaveProvider = async (providerId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_saved_providers')
        .delete()
        .eq('patient_id', user.id)
        .eq('provider_id', providerId);

      if (error) {
        throw error;
      }

      // Update local state
      setSavedProviders(prev => prev.filter(p => p.provider_id !== providerId));
    } catch (err) {
      console.error('Error removing saved provider:', err);
      setError(err instanceof Error ? err : new Error('Failed to remove saved provider'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateNotes = async (providerId: string, notes: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_saved_providers')
        .update({ notes })
        .eq('patient_id', user.id)
        .eq('provider_id', providerId);

      if (error) {
        throw error;
      }

      // Update local state
      setSavedProviders(prev => 
        prev.map(provider => 
          provider.provider_id === providerId ? { ...provider, notes } : provider
        )
      );
    } catch (err) {
      console.error('Error updating provider notes:', err);
      setError(err instanceof Error ? err : new Error('Failed to update provider notes'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isProviderSaved = (providerId: string): boolean => {
    return savedProviders.some(p => p.provider_id === providerId);
  };

  return { 
    savedProviders, 
    loading, 
    error, 
    saveProvider, 
    unsaveProvider, 
    updateNotes,
    isProviderSaved
  };
}