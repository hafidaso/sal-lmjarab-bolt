// Environment Configuration
export const config = {
  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here',
  },
  
  // Stripe Configuration
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your-stripe-publishable-key',
  },
  
  // App Configuration
  app: {
    env: import.meta.env.VITE_APP_ENV || 'development',
    isDev: import.meta.env.DEV || false,
  }
};

// Check if required environment variables are missing
export const checkEnvironment = () => {
  const missingVars = [];
  
  if (!import.meta.env.VITE_SUPABASE_URL) {
    missingVars.push('VITE_SUPABASE_URL');
  }
  
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    missingVars.push('VITE_SUPABASE_ANON_KEY');
  }
  
  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
    console.warn('Please create a .env file with the required variables.');
    console.warn('See .env.example for reference.');
  }
  
  return missingVars.length === 0;
};

// Initialize environment check
checkEnvironment(); 