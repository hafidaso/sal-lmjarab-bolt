import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Clock, Calendar, Map, List, Navigation, Phone, Building, Accessibility, CreditCard, Heart, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { patientService, HealthcareProvider } from '../../services/patientService';

const PatientProviderDirectory = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [providers, setProviders] = useState<HealthcareProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedProviders, setSavedProviders] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    specialty: 'all',
    distance: 50,
    insurance: [] as string[],
    rating: 0,
    availability: false,
    gender: 'all'
  });

  useEffect(() => {
    loadSavedProviders();
  }, [user]);

  const loadSavedProviders = async () => {
    try {
      const saved = await patientService.getSavedProviders(user?.id || '');
      setSavedProviders(saved.map(provider => provider.provider_id));
    } catch (error) {
      console.error('Error loading saved providers:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const results = await patientService.searchProviders(searchQuery, {
        location,
        ...filters
      });
      setProviders(results);
    } catch (error) {
      console.error('Error searching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveProvider = async (providerId: string) => {
    try {
      if (savedProviders.includes(providerId)) {
        // Find the saved provider entry and remove it
        const savedProvider = await patientService.getSavedProviders(user?.id || '');
        const toRemove = savedProvider.find(p => p.provider_id === providerId);
        
        if (toRemove) {
          await patientService.removeSavedProvider(toRemove.id);
          setSavedProviders(prev => prev.filter(id => id !== providerId));
        }
      } else {
        // Save the provider
        await patientService.saveProvider(user?.id || '', providerId);
        setSavedProviders(prev => [...prev, providerId]);
      }
    } catch (error) {
      console.error('Error toggling saved provider:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Find Healthcare Providers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search for doctors, hospitals, and other healthcare facilities across Morocco
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by doctor name, specialty, or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="City, ZIP code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg font-medium transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {(filters.specialty !== 'all' || filters.insurance.length > 0 || filters.rating > 0 || filters.availability || filters.gender !== 'all') && (
              <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {[
                  filters.specialty !== 'all' ? 1 : 0,
                  filters.insurance.length > 0 ? 1 : 0,
                  filters.rating > 0 ? 1 : 0,
                  filters.availability ? 1 : 0,
                  filters.gender !== 'all' ? 1 : 0
                ].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {providers.length} results found
            </span>
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Specialty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specialty
                  </label>
                  <select
                    value={filters.specialty}
                    onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Specialties</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="general-medicine">General Medicine</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="gynecology">Gynecology</option>
                    <option value="ophthalmology">Ophthalmology</option>
                  </select>
                </div>

                {/* Distance Radius */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distance Radius
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={filters.distance}
                      onChange={(e) => setFilters(prev => ({ ...prev, distance: Number(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>5 km</span>
                      <span>{filters.distance} km</span>
                      <span>50+ km</span>
                    </div>
                  </div>
                </div>

                {/* Insurance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Insurance Accepted
                  </label>
                  <div className="space-y-2">
                    {['CNSS', 'RAMED', 'Private'].map(insurance => (
                      <label key={insurance} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.insurance.includes(insurance)}
                          onChange={(e) => {
                            const newInsurance = e.target.checked
                              ? [...filters.insurance, insurance]
                              : filters.insurance.filter(i => i !== insurance);
                            setFilters(prev => ({ ...prev, insurance: newInsurance }));
                          }}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{insurance}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={4.0}>4.0+ Stars</option>
                    <option value={3.5}>3.5+ Stars</option>
                    <option value={3.0}>3.0+ Stars</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender Preference
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">No Preference</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Additional Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Filters
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.availability}
                        onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.checked }))}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Available Today</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Telehealth Available</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Wheelchair Accessible</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({
                    specialty: 'all',
                    distance: 50,
                    insurance: [],
                    rating: 0,
                    availability: false,
                    gender: 'all'
                  })}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : providers.length > 0 ? (
              providers.map((provider, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="relative">
                        <img
                          src={provider.image || 'https://via.placeholder.com/150'}
                          alt={provider.name}
                          className="w-full h-48 md:h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => toggleSaveProvider(provider.id)}
                          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Heart className={`w-5 h-5 ${
                            savedProviders.includes(provider.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-400 hover:text-red-500'
                          }`} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {provider.name}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{provider.specialty}</p>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {provider.rating}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {provider.location} • {provider.distance} km
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 mb-4">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {provider.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to={`/doctor/${provider.id}`}
                          className="px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg text-sm font-medium transition-colors text-center"
                        >
                          View Profile
                        </Link>
                        
                        <Link
                          to={`/doctor/${provider.id}?tab=availability`}
                          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors text-center flex items-center justify-center space-x-1"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book Appointment</span>
                        </Link>
                        
                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                          <Navigation className="w-4 h-4" />
                          <span>Directions</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No providers found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery || location 
                    ? 'Try adjusting your search criteria or filters' 
                    : 'Start by searching for a doctor, specialty, or location'}
                </p>
                {(searchQuery || location) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setLocation('');
                      setFilters({
                        specialty: 'all',
                        distance: 50,
                        insurance: [],
                        rating: 0,
                        availability: false,
                        gender: 'all'
                      });
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear search filters
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive map would be displayed here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Showing {providers.length} healthcare providers
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProviderDirectory;