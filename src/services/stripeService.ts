import { loadStripe } from '@stripe/stripe-js';
import { mockStripeAPI } from './mockStripeAPI';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  amount_total: number;
  currency: string;
  status: string;
}

// Stripe Service
export const stripeService = {
  // Get Stripe instance
  async getStripe() {
    return await stripePromise;
  },

  // Create payment intent for pharmacy order
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<PaymentIntent> {
    try {
      // Use mock API for development
      if (import.meta.env.DEV) {
        return await mockStripeAPI.createPaymentIntent(amount, currency);
      }

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },

  // Create checkout session for pharmacy order
  async createCheckoutSession(orderData: {
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
    total_amount: number;
    order_id: string;
    patient_id: string;
  }): Promise<CheckoutSession> {
    try {
      // Use mock API for development
      if (import.meta.env.DEV) {
        return await mockStripeAPI.createCheckoutSession(orderData);
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  // Process payment with Stripe Elements
  async processPayment(clientSecret: string, paymentMethod: any) {
    const stripe = await this.getStripe();
    if (!stripe) {
      throw new Error('Stripe not loaded');
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    });

    if (error) {
      throw error;
    }

    return paymentIntent;
  },

  // Redirect to Stripe Checkout
  async redirectToCheckout(sessionId: string) {
    try {
      // For development, simulate redirect
      if (import.meta.env.DEV) {
        console.log('Development mode: Simulating Stripe checkout redirect');
        console.log('Session ID:', sessionId);
        
        // Simulate successful payment after delay
        setTimeout(() => {
          alert('Payment successful! (Development simulation)');
          window.location.href = '/pharmacy?payment=success';
        }, 2000);
        
        return;
      }

      const stripe = await this.getStripe();
      if (!stripe) {
        throw new Error('Stripe not loaded');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  },

  // Verify payment status
  async verifyPayment(paymentIntentId: string): Promise<boolean> {
    try {
      // Use mock API for development
      if (import.meta.env.DEV) {
        return await mockStripeAPI.verifyPayment(paymentIntentId);
      }

      const response = await fetch(`/api/verify-payment?payment_intent_id=${paymentIntentId}`);
      
      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.status === 'succeeded';
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  },

  // Get payment methods for a customer
  async getPaymentMethods(customerId: string) {
    try {
      // Use mock API for development
      if (import.meta.env.DEV) {
        return await mockStripeAPI.getPaymentMethods(customerId);
      }

      const response = await fetch(`/api/payment-methods?customer_id=${customerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  },

  // Save payment method for future use
  async savePaymentMethod(paymentMethodId: string, customerId: string) {
    try {
      // Use mock API for development
      if (import.meta.env.DEV) {
        return await mockStripeAPI.savePaymentMethod(paymentMethodId, customerId);
      }

      const response = await fetch('/api/save-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethodId,
          customer_id: customerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment method');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving payment method:', error);
      throw error;
    }
  },

  // Simulate payment processing for development
  async simulatePayment(amount: number): Promise<{ success: boolean; message: string }> {
    if (!import.meta.env.DEV) {
      throw new Error('Simulation only available in development mode');
    }

    await mockStripeAPI.delay(2000); // Simulate processing time
    
    // Simulate 95% success rate
    const success = Math.random() > 0.05;
    
    if (success) {
      return {
        success: true,
        message: 'Payment processed successfully!'
      };
    } else {
      return {
        success: false,
        message: 'Payment failed. Please try again.'
      };
    }
  }
}; 