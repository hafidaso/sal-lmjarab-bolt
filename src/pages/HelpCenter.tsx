import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, FileText, ExternalLink, User, Calendar, CreditCard, Stethoscope, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);
  const [helpfulFAQs, setHelpfulFAQs] = useState<string[]>([]);
  const [unhelpfulFAQs, setUnhelpfulFAQs] = useState<string[]>([]);

  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const markHelpful = (id: string) => {
    if (!helpfulFAQs.includes(id)) {
      setHelpfulFAQs(prev => [...prev, id]);
      setUnhelpfulFAQs(prev => prev.filter(item => item !== id));
    }
  };

  const markUnhelpful = (id: string) => {
    if (!unhelpfulFAQs.includes(id)) {
      setUnhelpfulFAQs(prev => [...prev, id]);
      setHelpfulFAQs(prev => prev.filter(item => item !== id));
    }
  };

  const categories: FAQCategory[] = [
    { id: 'all', name: 'All Categories', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'account', name: 'Account & Profile', icon: <User className="w-5 h-5" /> },
    { id: 'appointments', name: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
    { id: 'insurance', name: 'Insurance & Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'medical-records', name: 'Medical Records', icon: <FileText className="w-5 h-5" /> },
    { id: 'providers', name: 'For Providers', icon: <Stethoscope className="w-5 h-5" /> }
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Register" button in the top right corner of the homepage. Fill in your personal information, create a password, and verify your email address. Once verified, you can log in and access all features of the platform.',
      category: 'account'
    },
    {
      id: '2',
      question: 'How do I reset my password?',
      answer: 'If you forgot your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we\'ll send you a link to reset your password. Follow the instructions in the email to create a new password.',
      category: 'account'
    },
    {
      id: '3',
      question: 'How do I book an appointment?',
      answer: 'To book an appointment, search for a healthcare provider using the search function. Select the provider you want to see, then click on "Book Appointment" on their profile. Choose an available date and time, provide the reason for your visit, and confirm your booking. You\'ll receive a confirmation email with the details.',
      category: 'appointments'
    },
    {
      id: '4',
      question: 'How do I cancel or reschedule an appointment?',
      answer: 'To cancel or reschedule an appointment, go to your dashboard and select "Appointments". Find the appointment you want to modify, then click "Reschedule" or "Cancel". For rescheduling, select a new date and time. Please note that some providers have cancellation policies that may apply.',
      category: 'appointments'
    },
    {
      id: '5',
      question: 'What insurance plans are accepted?',
      answer: 'Insurance acceptance varies by healthcare provider. When searching for providers, you can filter by insurance plans like CNSS, RAMED, or private insurance. Each provider\'s profile also lists the insurance plans they accept. If you\'re unsure, you can contact the provider directly for confirmation.',
      category: 'insurance'
    },
    {
      id: '6',
      question: 'How do I access my medical records?',
      answer: 'To access your medical records, log in to your account and go to the "Medical Records" section in your dashboard. You\'ll find all records shared with you by your healthcare providers. You can view, download, and share these records as needed. For records not available online, you may need to contact your healthcare provider directly.',
      category: 'medical-records'
    },
    {
      id: '7',
      question: 'How do I claim my provider profile?',
      answer: 'If you\'re a healthcare provider, you can claim your profile by clicking on "Claim Your Profile" in the footer. You\'ll need to provide your professional information and verification documents. Our team will review your submission and verify your identity, typically within 2-3 business days.',
      category: 'providers'
    },
    {
      id: '8',
      question: 'How do I update my provider information?',
      answer: 'Once you\'ve claimed your provider profile, you can update your information by logging in and going to your Provider Dashboard. Select "Edit Profile" to update your contact information, services, education, and more. Changes will be reviewed by our team before being published.',
      category: 'providers'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Find answers to common questions and get the support you need
          </p>
          
          {/* Search */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } shadow-sm`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or browse all categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                      {faq.question}
                    </h3>
                    {openFAQs.includes(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openFAQs.includes(faq.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Was this helpful?
                            </span>
                            <button
                              onClick={() => markHelpful(faq.id)}
                              className={`p-1 rounded-full ${
                                helpfulFAQs.includes(faq.id)
                                  ? 'text-green-600 bg-green-100 dark:bg-green-900'
                                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                              }`}
                            >
                              <ThumbsUp className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => markUnhelpful(faq.id)}
                              className={`p-1 rounded-full ${
                                unhelpfulFAQs.includes(faq.id)
                                  ? 'text-red-600 bg-red-100 dark:bg-red-900'
                                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                              }`}
                            >
                              <ThumbsDown className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Still need help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/contact"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <MessageCircle className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Chat with us</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Available 24/7 for your questions
              </p>
            </Link>
            <Link
              to="/contact"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <Mail className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email us</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Get a response within 24 hours
              </p>
            </Link>
            <Link
              to="/contact"
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <Phone className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Call us</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Mon-Fri, 9am-6pm GMT+1
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;