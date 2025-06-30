import { supabase } from '../lib/supabase';

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email?: string;
  website?: string;
  hours?: any;
  services: string[];
  insurance?: string[];
  is_24_hour: boolean;
  has_delivery: boolean;
  rating: number;
  review_count: number;
  safety_rating: number;
  staff: {
    pharmacists: number;
    security: boolean;
  };
  stock_availability: Array<{
    name: string;
    status: string;
  }>;
  location?: any;
  created_at: string;
  updated_at: string;
}

export interface Medication {
  id: string;
  name: string;
  generic_name?: string;
  description?: string;
  dosage: string[];
  form: string[];
  requires_prescription: boolean;
  price?: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  created_at: string;
  updated_at: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor_name: string;
  date: string;
  expiry_date?: string;
  medications: any[];
  status: 'pending' | 'verified' | 'filled' | 'expired' | 'rejected';
  pharmacy_id?: string;
  filled_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PharmacyOrder {
  id: string;
  patient_id: string;
  pharmacy_id: string;
  prescription_id?: string;
  items: any[];
  total_amount: number;
  status: 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  payment_method?: 'card' | 'cash' | 'insurance';
  delivery_address?: string;
  delivery_fee: number;
  estimated_delivery?: string;
  tracking_code?: string;
  created_at: string;
  updated_at: string;
}

export interface ShoppingCart {
  id: string;
  patient_id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    requires_prescription: boolean;
  }>;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

// Pharmacy Service
export const pharmacyService = {
  // Get all pharmacies
  async getPharmacies(): Promise<Pharmacy[]> {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching pharmacies:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get pharmacy by ID
  async getPharmacyById(id: string): Promise<Pharmacy | null> {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching pharmacy:', error);
      throw error;
    }
    
    return data;
  },

  // Get pharmacies by city
  async getPharmaciesByCity(city: string): Promise<Pharmacy[]> {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')
      .eq('city', city)
      .order('name');
    
    if (error) {
      console.error('Error fetching pharmacies by city:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get all medications
  async getMedications(): Promise<Medication[]> {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching medications:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get medication by ID
  async getMedicationById(id: string): Promise<Medication | null> {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching medication:', error);
      throw error;
    }
    
    return data;
  },

  // Get patient prescriptions
  async getPatientPrescriptions(patientId: string): Promise<Prescription[]> {
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
      .eq('patient_id', patientId)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching prescriptions:', error);
      throw error;
    }
    
    return data || [];
  },

  // Create prescription
  async createPrescription(prescription: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>): Promise<Prescription> {
    const { data, error } = await supabase
      .from('prescriptions')
      .insert(prescription)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating prescription:', error);
      throw error;
    }
    
    return data;
  },

  // Update prescription
  async updatePrescription(id: string, updates: Partial<Prescription>): Promise<Prescription> {
    const { data, error } = await supabase
      .from('prescriptions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating prescription:', error);
      throw error;
    }
    
    return data;
  },

  // Get patient orders
  async getPatientOrders(patientId: string): Promise<PharmacyOrder[]> {
    const { data, error } = await supabase
      .from('pharmacy_orders')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
    
    return data || [];
  },

  // Create order
  async createOrder(order: Omit<PharmacyOrder, 'id' | 'created_at' | 'updated_at'>): Promise<PharmacyOrder> {
    const { data, error } = await supabase
      .from('pharmacy_orders')
      .insert(order)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }
    
    return data;
  },

  // Update order
  async updateOrder(id: string, updates: Partial<PharmacyOrder>): Promise<PharmacyOrder> {
    const { data, error } = await supabase
      .from('pharmacy_orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }
    
    return data;
  },

  // Shopping Cart Operations
  async getShoppingCart(patientId: string): Promise<ShoppingCart | null> {
    const { data, error } = await supabase
      .from('shopping_carts')
      .select('*')
      .eq('patient_id', patientId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching shopping cart:', error);
      throw error;
    }
    
    return data;
  },

  async createShoppingCart(patientId: string): Promise<ShoppingCart> {
    const { data, error } = await supabase
      .from('shopping_carts')
      .insert({
        patient_id: patientId,
        items: [],
        total_amount: 0
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating shopping cart:', error);
      throw error;
    }
    
    return data;
  },

  async updateShoppingCart(cartId: string, updates: Partial<ShoppingCart>): Promise<ShoppingCart> {
    const { data, error } = await supabase
      .from('shopping_carts')
      .update(updates)
      .eq('id', cartId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating shopping cart:', error);
      throw error;
    }
    
    return data;
  },

  // Cart item operations
  async addToCart(patientId: string, item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    requires_prescription: boolean;
  }): Promise<ShoppingCart> {
    // Get or create cart
    let cart = await this.getShoppingCart(patientId);
    if (!cart) {
      cart = await this.createShoppingCart(patientId);
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(cartItem => cartItem.id === item.id);
    
    let updatedItems;
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedItems = [...cart.items];
      updatedItems[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      updatedItems = [...cart.items, item];
    }

    // Calculate total
    const totalAmount = updatedItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.quantity), 0);

    // Update cart
    return await this.updateShoppingCart(cart.id, {
      items: updatedItems,
      total_amount: totalAmount
    });
  },

  async removeFromCart(patientId: string, itemId: string): Promise<ShoppingCart> {
    const cart = await this.getShoppingCart(patientId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return await this.updateShoppingCart(cart.id, {
      items: updatedItems,
      total_amount: totalAmount
    });
  },

  async updateCartItemQuantity(patientId: string, itemId: string, quantity: number): Promise<ShoppingCart> {
    const cart = await this.getShoppingCart(patientId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const updatedItems = cart.items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return await this.updateShoppingCart(cart.id, {
      items: updatedItems,
      total_amount: totalAmount
    });
  },

  async clearCart(patientId: string): Promise<ShoppingCart> {
    const cart = await this.getShoppingCart(patientId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    return await this.updateShoppingCart(cart.id, {
      items: [],
      total_amount: 0
    });
  }
};