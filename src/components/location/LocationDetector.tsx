import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locationService, LocationDetails } from '../../services/locationService';

interface LocationDetectorProps {
  onLocationSet?: (location: LocationDetails) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationSet }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // Cities in Morocco
  const cities = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 
    'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan'
  ];

  useEffect(() => {
    const checkLocation = async () => {
      const location = await locationService.getUserLocation();
      if (location) {
        setCurrentLocation(location);
        if (onLocationSet) onLocationSet(location);
      } else {
        // Show prompt if no location is set
        setShowPrompt(true);
      }
    };

    checkLocation();
  }, [onLocationSet]);

  useEffect(() => {
    // Filter cities based on search query
    if (searchQuery.trim()) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleAllowLocation = async () => {
    const granted = await locationService.requestLocationPermission();
    if (granted) {
      const location = await locationService.getUserLocation();
      if (location) {
        setCurrentLocation(location);
        if (onLocationSet) onLocationSet(location);
        setShowPrompt(false);
      }
    }
  };

  const handleSelectCity = async (city: string) => {
    const success = await locationService.setLocationByCity(city);
    if (success) {
      const location = await locationService.getUserLocation();
      if (location) {
        setCurrentLocation(location);
        if (onLocationSet) onLocationSet(location);
        setShowPrompt(false);
        setShowSearch(false);
        setSearchQuery('');
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt && !showSearch) {
    return (
      <div className="fixed top-20 left-4 z-40">
        <button 
          onClick={() => setShowSearch(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow text-sm"
        >
          <MapPin className="w-4 h-4 text-primary-600" />
          <span className="text-gray-700 dark:text-gray-300">
            {currentLocation?.city || 'Set location'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {(showPrompt || showSearch) && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 right-0 z-50 mx-auto max-w-md px-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            {showPrompt ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Enable Location Services
                  </h3>
                  <button 
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Allow location access to find healthcare providers near you and get personalized recommendations.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAllowLocation}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Allow Location</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowPrompt(false);
                      setShowSearch(true);
                    }}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Enter Manually
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Set Your Location
                  </h3>
                  <button 
                    onClick={() => setShowSearch(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for a city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                {searchResults.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    {searchResults.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleSelectCity(city)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{city}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No cities found matching "{searchQuery}"
                  </p>
                ) : (
                  <div className="max-h-60 overflow-y-auto">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Popular cities:</p>
                    {cities.slice(0, 6).map((city) => (
                      <button
                        key={city}
                        onClick={() => handleSelectCity(city)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{city}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleAllowLocation}
                    className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Use my current location instead</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationDetector;