import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface EmailSignupModalProps {
  onClose: () => void;
  onSignup: (email: string) => void;
}

const EmailSignupModal: React.FC<EmailSignupModalProps> = ({ onClose, onSignup }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSignup(email);
      setIsSuccess(true);
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNoThanks = () => {
    localStorage.setItem('emailSignupDismissed', 'true');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        >
          {/* Close button */}
          <button
            onClick={handleNoThanks}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Unlock Free Access to Our Premium Doctor Finder
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover Sal-lmjarab – your personalized tool to find the right doctor based on your specific needs.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter your email to get started:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
                  )}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  By signing up, you agree to our{' '}
                  <Link to="/terms-of-use" className="text-primary-600 hover:text-primary-700 underline">
                    User Agreement
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                    Privacy Policy
                  </Link>
                  . You can unsubscribe anytime.
                </p>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Get Free Access
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleNoThanks}
                    className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    No Thanks
                  </button>
                </div>
              </form>

              {/* Login link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already a member?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to Sal-lmjarab!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're all set! Check your email for confirmation and start finding the perfect doctor.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmailSignupModal; 