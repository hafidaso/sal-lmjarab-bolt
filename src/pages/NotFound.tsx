import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Phone, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import FuzzyText from '../components/FuzzyText';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Mock suggestions based on input
  React.useEffect(() => {
    if (searchQuery.length > 1) {
      const mockSuggestions = [
        'Virtual Care Platform',
        'Point-of-Care Solutions',
        'Life Sciences Advertising',
        'Healthcare Systems',
        'Request a Demo',
        'Contact Support'
      ].filter(suggestion => 
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSuggestions(mockSuggestions);
      setShowSuggestions(mockSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true} className="text-7xl md:text-9xl font-extrabold mb-6">
                    404
                  </FuzzyText>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    We couldn't find the page you're looking for. It might have been moved or doesn't exist.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search our site..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      
                      {/* Search Suggestions */}
                      {showSuggestions && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-2">
                          {suggestions.map((suggestion, index) => (
                            <Link
                              key={index}
                              to={`/search?q=${encodeURIComponent(suggestion)}`}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                              onClick={() => setShowSuggestions(false)}
                            >
                              {suggestion}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Navigation Options */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Home className="w-5 h-5 mr-2" />
                        <span>Return to Homepage</span>
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        <span>Contact Support</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <img
                  src="https://images.pexels.com/photos/3846005/pexels-photo-3846005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Healthcare professional with tablet"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
            
            {/* Emergency Support */}
            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  24/7 Support Available
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need immediate assistance? Our support team is available around the clock to help with any urgent issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+18005551234"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Call Support: 1-800-555-1234
                </a>
                <Link
                  to="/live-chat"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg font-medium transition-colors"
                >
                  Start Live Chat
                </Link>
              </div>
            </div>
            
            {/* Back Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Go back to previous page</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;