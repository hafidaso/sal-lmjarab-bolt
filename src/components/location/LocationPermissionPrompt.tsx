import React, { useState, useEffect } from 'react';
import { MapPin, X, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locationService } from '../../services/locationService';

interface LocationPermissionPromptProps {
  onPermissionGranted?: () => void;
  onPermissionDenied?: () => void;
  onClose?: () => void;
}

const LocationPermissionPrompt: React.FC<LocationPermissionPromptProps> = ({
  onPermissionGranted,
  onPermissionDenied,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [showCitySelector, setShowCitySelector] = useState(false);

  const cities = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fes',
    'Tangier',
    'Agadir'
  ];

  useEffect(() => {
    // Check if we already have location permission
    if (locationService.isLocationPermissionGranted()) {
      setPermissionStatus('granted');
      onPermissionGranted?.();
      return;
    }

    // Show prompt after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onPermissionGranted]);

  const handleRequestPermission = async () => {
    const granted = await locationService.requestLocationPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
    
    if (granted) {
      onPermissionGranted?.();
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } else {
      setShowCitySelector(true);
      onPermissionDenied?.();
    }
  };

  const handleSelectCity = async () => {
    if (selectedCity) {
      const success = await locationService.setLocationByCity(selectedCity);
      if (success) {
        setPermissionStatus('granted');
        onPermissionGranted?.();
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full px-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {permissionStatus === 'granted' 
                    ? 'Location Access Granted' 
                    : 'Enable Location Services'}
                </h3>
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {permissionStatus === 'pending' && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Allow us to access your location to find healthcare providers near you and provide personalized recommendations.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleRequestPermission}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Allow Location Access
                  </button>
                  <button
                    onClick={() => setShowCitySelector(true)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Enter Manually
                  </button>
                </div>
              </div>
            )}
            
            {permissionStatus === 'granted' && (
              <div className="flex items-center space-x-3 text-green-600 dark:text-green-400">
                <Check className="w-5 h-5" />
                <p>Location access granted. We'll show you nearby healthcare options.</p>
              </div>
            )}
            
            {permissionStatus === 'denied' && !showCitySelector && (
              <div>
                <div className="flex items-start space-x-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Location access was denied. You can still use the app, but we won't be able to show you nearby healthcare providers automatically.
                  </p>
                </div>
                <button
                  onClick={() => setShowCitySelector(true)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Enter Location Manually
                </button>
              </div>
            )}
            
            {showCitySelector && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please select your city to help us show relevant healthcare providers:
                </p>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <button
                  onClick={handleSelectCity}
                  disabled={!selectedCity}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Confirm Location
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationPermissionPrompt;