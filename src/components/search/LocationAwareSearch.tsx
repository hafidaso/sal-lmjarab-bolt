import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locationService, LocationDetails } from '../../services/locationService';

interface LocationAwareSearchProps {
  onSearch: (query: string, location: string) => void;
  placeholder?: string;
  locationPlaceholder?: string;
  className?: string;
  centered?: boolean;
}

interface ValidationError {
  field: 'search' | 'location';
  message: string;
}

const LocationAwareSearch: React.FC<LocationAwareSearchProps> = ({
  onSearch,
  placeholder = 'Search doctors, specialties, or conditions...',
  locationPlaceholder = 'City, ZIP code',
  className = '',
  centered = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [userLocation, setUserLocation] = useState<LocationDetails | null>(null);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const location = await locationService.getUserLocation();
        if (location && location.city) {
          setUserLocation(location);
          setLocationQuery(location.city);
          setIsUsingCurrentLocation(true);
        }
      } catch (error) {
        console.error('Failed to get user location:', error);
      }
    };
    
    checkLocation();
  }, []);

  const validateInputs = (): boolean => {
    const errors: ValidationError[] = [];

    // Only require at least one of the two fields
    if (!searchQuery.trim() && !locationQuery.trim()) {
      errors.push({ field: 'search', message: 'Please enter a search term or location' });
      errors.push({ field: 'location', message: 'Please enter a search term or location' });
    } else {
      // If search is filled, validate its length
      if (searchQuery.trim() && searchQuery.trim().length < 2) {
        errors.push({ field: 'search', message: 'Search term must be at least 2 characters' });
      }
      // If location is filled, validate its length
      if (locationQuery.trim() && locationQuery.trim().length < 2) {
        errors.push({ field: 'location', message: 'Location must be at least 2 characters' });
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const clearValidationError = (field: 'search' | 'location') => {
    setValidationErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      setSearchFeedback({
        type: 'error',
        message: 'Please fix the validation errors above'
      });
      return;
    }

    setIsSearching(true);
    setSearchFeedback(null);

    try {
      // Simulate search delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSearch(searchQuery.trim(), locationQuery.trim());
      
      setSearchFeedback({
        type: 'success',
        message: `Searching for "${searchQuery.trim()}" in ${locationQuery.trim()}`
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSearchFeedback(null);
      }, 3000);
    } catch (error) {
      setSearchFeedback({
        type: 'error',
        message: 'Search failed. Please try again.'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    if (locationService.isLocationPermissionGranted()) {
      try {
        const location = await locationService.getUserLocation();
        if (location) {
          setUserLocation(location);
          setLocationQuery(location.city || '');
          setIsUsingCurrentLocation(true);
          clearValidationError('location');
        }
      } catch (error) {
        setSearchFeedback({
          type: 'error',
          message: 'Failed to get current location. Please enter manually.'
        });
      }
    } else {
      setShowLocationPrompt(true);
    }
  };

  const handleLocationPermissionResponse = async (granted: boolean) => {
    setShowLocationPrompt(false);
    
    if (granted) {
      try {
        const location = await locationService.getUserLocation();
        if (location) {
          setUserLocation(location);
          setLocationQuery(location.city || '');
          setIsUsingCurrentLocation(true);
          clearValidationError('location');
        }
      } catch (error) {
        setSearchFeedback({
          type: 'error',
          message: 'Location access denied. Please enter location manually.'
        });
      }
    }
  };

  const getFieldError = (field: 'search' | 'location') => {
    return validationErrors.find(error => error.field === field);
  };

  const containerClasses = `w-full search-container ${centered ? 'flex justify-center' : ''} ${className}`;
  const formClasses = `flex flex-col lg:flex-row gap-4 search-form ${centered ? 'max-w-4xl w-full' : ''}`;

  return (
    <div className={containerClasses}>
      {/* Search Feedback */}
      <AnimatePresence>
        {searchFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-3 rounded-lg flex items-center success-feedback ${
              searchFeedback.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : searchFeedback.type === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
            }`}
          >
            {searchFeedback.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
            ) : searchFeedback.type === 'error' ? (
              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 mr-2 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
            )}
            <span className={`text-sm ${
              searchFeedback.type === 'success' 
                ? 'text-green-700 dark:text-green-300' 
                : searchFeedback.type === 'error'
                ? 'text-red-700 dark:text-red-300'
                : 'text-blue-700 dark:text-blue-300'
            }`}>
              {searchFeedback.message}
            </span>
            <button
              onClick={() => setSearchFeedback(null)}
              className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSearch} className={formClasses}>
        {/* Search Input */}
        <div className="flex-1 relative search-input-group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              clearValidationError('search');
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors search-input ${
              getFieldError('search') 
                ? 'border-red-300 dark:border-red-600 focus:ring-red-500 validation-error' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            disabled={isSearching}
          />
          {getFieldError('search') && (
            <div className="absolute -bottom-6 left-0 text-xs text-red-600 dark:text-red-400">
              {getFieldError('search')?.message}
            </div>
          )}
        </div>
        
        {/* Location Input */}
        <div className="relative search-input-group">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={locationPlaceholder}
            value={locationQuery}
            onChange={(e) => {
              setLocationQuery(e.target.value);
              setIsUsingCurrentLocation(false);
              clearValidationError('location');
            }}
            className={`w-full lg:w-64 pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors search-input ${
              getFieldError('location') 
                ? 'border-red-300 dark:border-red-600 focus:ring-red-500 validation-error' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            disabled={isSearching}
          />
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isSearching}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isUsingCurrentLocation 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            } transition-colors ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Use current location"
          >
            <Navigation className="w-5 h-5" />
          </button>
          {getFieldError('location') && (
            <div className="absolute -bottom-6 left-0 text-xs text-red-600 dark:text-red-400">
              {getFieldError('location')?.message}
            </div>
          )}
        </div>
        
        {/* Search Button */}
        <button
          type="submit"
          disabled={isSearching}
          className={`bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center min-w-[120px] search-button ${
            isSearching ? 'cursor-not-allowed' : ''
          }`}
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 search-loading"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Search
            </>
          )}
        </button>
      </form>

      {/* Location Permission Prompt */}
      <AnimatePresence>
        {showLocationPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg location-prompt"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  To show healthcare providers near you, we need access to your location. Would you like to share your location?
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => handleLocationPermissionResponse(true)}
                    className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Allow Location Access
                  </button>
                  <button
                    onClick={() => handleLocationPermissionResponse(false)}
                    className="px-3 py-1 border border-yellow-600 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded-md text-sm font-medium transition-colors"
                  >
                    No Thanks
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationAwareSearch;