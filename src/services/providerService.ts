import { supabase } from '../lib/supabase';

export interface Provider {
  id: string;
  name: string;
  type: 'doctor' | 'hospital' | 'clinic' | 'pharmacy';
  specialty?: string;
  description?: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  rating: number;
  review_count: number;
  image_url?: string;
  services?: string[];
  insurance_accepted?: string[];
  hours?: any;
  location?: any;
  created_at: string;
  updated_at: string;
}

export interface ProviderSearchFilters {
  type?: string;
  specialty?: string;
  city?: string;
  services?: string[];
  insurance?: string[];
  rating?: number;
}

// Provider Service
export const providerService = {
  // Get all providers
  async getProviders(): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching providers:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get provider by ID
  async getProviderById(id: string): Promise<Provider | null> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching provider:', error);
      throw error;
    }
    
    return data;
  },

  // Get providers by type
  async getProvidersByType(type: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('type', type)
      .order('name');
    
    if (error) {
      console.error('Error fetching providers by type:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get providers by specialty
  async getProvidersBySpecialty(specialty: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('specialty', specialty)
      .order('name');
    
    if (error) {
      console.error('Error fetching providers by specialty:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get providers by city
  async getProvidersByCity(city: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('city', city)
      .order('name');
    
    if (error) {
      console.error('Error fetching providers by city:', error);
      throw error;
    }
    
    return data || [];
  },

  // Search providers with filters
  async searchProviders(filters: ProviderSearchFilters): Promise<Provider[]> {
    let query = supabase
      .from('providers')
      .select('*');

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.specialty) {
      query = query.eq('specialty', filters.specialty);
    }

    if (filters.city) {
      query = query.eq('city', filters.city);
    }

    if (filters.rating) {
      query = query.gte('rating', filters.rating);
    }

    if (filters.services && filters.services.length > 0) {
      query = query.overlaps('services', filters.services);
    }

    if (filters.insurance && filters.insurance.length > 0) {
      query = query.overlaps('insurance_accepted', filters.insurance);
    }

    const { data, error } = await query.order('rating', { ascending: false });
    
    if (error) {
      console.error('Error searching providers:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get top rated providers
  async getTopRatedProviders(limit: number = 10): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .gte('rating', 4.0)
      .order('rating', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching top rated providers:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get providers by service
  async getProvidersByService(service: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .contains('services', [service])
      .order('rating', { ascending: false });
    
    if (error) {
      console.error('Error fetching providers by service:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get unique specialties
  async getSpecialties(): Promise<string[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('specialty')
      .not('specialty', 'is', null);
    
    if (error) {
      console.error('Error fetching specialties:', error);
      throw error;
    }
    
    const specialties = data?.map(item => item.specialty).filter(Boolean) || [];
    return [...new Set(specialties)]; // Remove duplicates
  },

  // Get unique cities
  async getCities(): Promise<string[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('city')
      .not('city', 'is', null);
    
    if (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
    
    const cities = data?.map(item => item.city).filter(Boolean) || [];
    return [...new Set(cities)]; // Remove duplicates
  },

  // Get unique services
  async getServices(): Promise<string[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('services');
    
    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
    
    const allServices = data?.flatMap(item => item.services || []) || [];
    return [...new Set(allServices)]; // Remove duplicates
  },

  // Update provider rating
  async updateProviderRating(providerId: string, newRating: number, reviewCount: number): Promise<Provider> {
    const { data, error } = await supabase
      .from('providers')
      .update({
        rating: newRating,
        review_count: reviewCount
      })
      .eq('id', providerId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating provider rating:', error);
      throw error;
    }
    
    return data;
  },

  // Create provider (admin only)
  async createProvider(provider: Omit<Provider, 'id' | 'created_at' | 'updated_at'>): Promise<Provider> {
    const { data, error } = await supabase
      .from('providers')
      .insert(provider)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating provider:', error);
      throw error;
    }
    
    return data;
  },

  // Update provider (admin only)
  async updateProvider(id: string, updates: Partial<Provider>): Promise<Provider> {
    const { data, error } = await supabase
      .from('providers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating provider:', error);
      throw error;
    }
    
    return data;
  },

  // Delete provider (admin only)
  async deleteProvider(id: string): Promise<void> {
    const { error } = await supabase
      .from('providers')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting provider:', error);
      throw error;
    }
  }
}; 