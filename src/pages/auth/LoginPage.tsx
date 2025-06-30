import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Heart, Mail, Lock, AlertCircle, Info, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../services/supabaseClient';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const { login, isLoading, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Demo accounts for testing
  const demoAccounts = [
    { email: 'patient@demo.com', password: 'demo123', role: 'Patient', description: 'Access patient dashboard and features' },
    { email: 'doctor@demo.com', password: 'demo123', role: 'Doctor/Provider', description: 'Access provider dashboard and tools' },
    { email: 'admin@demo.com', password: 'demo123', role: 'Administrator', description: 'Access admin panel and management tools' }
  ];

  // Get the page they were trying to access before being redirected to login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  // Handle navigation after successful login
  useEffect(() => {
    console.log('LoginPage useEffect - user:', user, 'isLoading:', isLoading);
    if (user && !isLoading) {
      console.log('User is logged in, navigating to dashboard for role:', user.role);
      // Navigate based on user role
      switch (user.role) {
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'provider':
          navigate('/provider/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          // Navigate to the page they were trying to access or to the default page
          navigate(from, { replace: true });
      }
    }
  }, [user, isLoading, navigate, from]);

  // Redirect already logged-in users away from login page
  useEffect(() => {
    console.log('LoginPage redirect useEffect - user:', user, 'isLoading:', isLoading);
    if (user && !isLoading) {
      console.log('User is already logged in, redirecting from login page');
      // User is already logged in, redirect them
      switch (user.role) {
        case 'patient':
          navigate('/patient/dashboard', { replace: true });
          break;
        case 'provider':
          navigate('/provider/dashboard', { replace: true });
          break;
        case 'admin':
          navigate('/admin/dashboard', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailNotConfirmed(false);

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
      // Navigation will be handled by the useEffect above
    } catch (error: any) {
      // Check if the error is due to unconfirmed email
      if (error?.message?.includes('Email not confirmed') || 
          error?.code === 'email_not_confirmed') {
        setEmailNotConfirmed(true);
        toast.error('Please check your email and click the confirmation link before logging in.');
      } else {
        console.error('Login error:', error);
      }
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setShowDemoAccounts(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Sal-lmjarab
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Access your healthcare dashboard
          </p>
        </div>

        {/* Demo Accounts Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm flex-1">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                Demo Accounts Available
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-2">
                Use these demo accounts to explore the platform features:
              </p>
              <button
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
              >
                <Users className="w-4 h-4 mr-1" />
                {showDemoAccounts ? 'Hide' : 'Show'} Demo Accounts
              </button>
            </div>
          </div>
          
          {showDemoAccounts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 space-y-2"
            >
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {account.role}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {account.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {account.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Use Account
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Note: These are demo accounts for testing purposes. In production, you would create your own account.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Email Not Confirmed Alert */}
        {emailNotConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Email Confirmation Required
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Please check your email inbox and click the confirmation link to activate your account before logging in.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('login.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('login.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              t('login.button')
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.register')}{' '}
              <Link
                to="/register/select"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Register here
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage;