import { useState, useEffect } from 'react';
import { supabase, PatientMedicalRecord } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function usePatientMedicalRecords() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [records, setRecords] = useState<PatientMedicalRecord[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchMedicalRecords() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('patient_medical_records')
          .select('*')
          .eq('patient_id', user.id)
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }

        setRecords(data as PatientMedicalRecord[]);
      } catch (err) {
        console.error('Error fetching medical records:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch medical records'));
      } finally {
        setLoading(false);
      }
    }

    fetchMedicalRecords();
  }, [user]);

  const getRecordById = (id: string): PatientMedicalRecord | undefined => {
    return records.find(record => record.id === id);
  };

  const getRecordsByType = (type: string): PatientMedicalRecord[] => {
    return records.filter(record => record.record_type === type);
  };

  const getRecentRecords = (limit: number = 5): PatientMedicalRecord[] => {
    return [...records].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, limit);
  };

  const searchRecords = (query: string): PatientMedicalRecord[] => {
    const searchTerms = query.toLowerCase().split(' ');
    return records.filter(record => {
      const searchableText = `
        ${record.title.toLowerCase()} 
        ${record.provider_name?.toLowerCase() || ''} 
        ${record.facility?.toLowerCase() || ''} 
        ${record.description?.toLowerCase() || ''}
        ${record.tags?.join(' ').toLowerCase() || ''}
      `;
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  };

  return { 
    records, 
    loading, 
    error, 
    getRecordById, 
    getRecordsByType, 
    getRecentRecords,
    searchRecords
  };
}