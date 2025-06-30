import { useState, useEffect } from 'react';
import { supabase, PatientReview } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function usePatientReviews() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reviews, setReviews] = useState<PatientReview[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('patient_reviews')
          .select('*')
          .eq('patient_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setReviews(data as PatientReview[]);
      } catch (err) {
        console.error('Error fetching patient reviews:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch reviews'));
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [user]);

  const submitReview = async (reviewData: Partial<PatientReview>): Promise<PatientReview> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('patient_reviews')
        .insert([{ patient_id: user.id, ...reviewData }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setReviews(prev => [data as PatientReview, ...prev]);
      
      return data as PatientReview;
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err instanceof Error ? err : new Error('Failed to submit review'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (id: string, updates: Partial<PatientReview>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_reviews')
        .update(updates)
        .eq('id', id)
        .eq('patient_id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setReviews(prev => 
        prev.map(review => 
          review.id === id ? { ...review, ...updates } : review
        )
      );
    } catch (err) {
      console.error('Error updating review:', err);
      setError(err instanceof Error ? err : new Error('Failed to update review'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('patient_reviews')
        .delete()
        .eq('id', id)
        .eq('patient_id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setReviews(prev => prev.filter(review => review.id !== id));
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete review'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    reviews, 
    loading, 
    error, 
    submitReview, 
    updateReview, 
    deleteReview 
  };
}