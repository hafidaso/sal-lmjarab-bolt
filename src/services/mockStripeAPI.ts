// Mock Stripe API Service for Development
// In production, this would be replaced with actual Stripe API calls

export interface MockPaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface MockCheckoutSession {
  id: string;
  url: string;
  amount_total: number;
  currency: string;
  status: string;
}

// Mock API Service
export const mockStripeAPI = {
  // Simulate API delay
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Create payment intent
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<MockPaymentIntent> {
    await this.delay(1000); // Simulate network delay
    
    // Simulate 10% chance of failure
    if (Math.random() < 0.1) {
      throw new Error('Payment intent creation failed');
    }

    return {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(amount * 100),
      currency,
      status: 'requires_payment_method',
      client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`
    };
  },

  // Create checkout session
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
  }): Promise<MockCheckoutSession> {
    await this.delay(1500); // Simulate network delay
    
    // Simulate 5% chance of failure
    if (Math.random() < 0.05) {
      throw new Error('Checkout session creation failed');
    }

    return {
      id: `cs_${Math.random().toString(36).substr(2, 9)}`,
      url: `https://checkout.stripe.com/pay/${Math.random().toString(36).substr(2, 9)}`,
      amount_total: Math.round(orderData.total_amount * 100),
      currency: 'usd',
      status: 'open'
    };
  },

  // Verify payment
  async verifyPayment(paymentIntentId: string): Promise<boolean> {
    await this.delay(500);
    
    // Simulate 95% success rate
    return Math.random() > 0.05;
  },

  // Get payment methods
  async getPaymentMethods(customerId: string) {
    await this.delay(800);
    
    return {
      data: [
        {
          id: 'pm_1234567890',
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025
          }
        }
      ]
    };
  },

  // Save payment method
  async savePaymentMethod(paymentMethodId: string, customerId: string) {
    await this.delay(1000);
    
    return {
      id: paymentMethodId,
      customer: customerId,
      status: 'succeeded'
    };
  }
}; 