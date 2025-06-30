import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, Clock, Calendar, Map, List, Navigation, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Provider {
  id: string;
  name: string;
  type: 'doctor' | 'hospital' | 'pharmacy';
  specialty?: string;
  rating: number;
  reviewCount: number;
  distance: number;
  nextAvailable: string;
  insurance: string[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  image: string;
  fees?: number;
}

interface SearchFilters {
  location: string;
  radius: number;
  specialty: string;
  insurance: string[];
  rating: number;
  availability: string;
  providerType: string;
}

const HealthcareProviderSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    radius: 25,
    specialty: '',
    insurance: [],
    rating: 0,
    availability: '',
    providerType: 'all'
  });

  const specialties = [
    'General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics',
    'Gynecology', 'Orthopedics', 'Neurology', 'Psychiatry', 'Ophthalmology'
  ];

  const insuranceOptions = ['CNSS', 'RAMED', 'Private'];

  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Bennani',
      type: 'doctor',
      specialty: 'Cardiology',
      rating: 4.8,
      reviewCount: 127,
      distance: 2.3,
      nextAvailable: '2025-01-15T10:00:00Z',
      insurance: ['CNSS', 'RAMED', 'Private'],
      location: {
        address: 'Boulevard Zerktouni, Casablanca',
        coordinates: { lat: 33.5731, lng: -7.5898 }
      },
      image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      fees: 400
    },
    {
      id: '2',
      name: 'CHU Ibn Rochd',
      type: 'hospital',
      rating: 4.6,
      reviewCount: 1247,
      distance: 3.1,
      nextAvailable: '2025-01-14T08:00:00Z',
      insurance: ['CNSS', 'RAMED', 'Private'],
      location: {
        address: '1 Rue des Hôpitaux, Casablanca',
        coordinates: { lat: 33.5892, lng: -7.6036 }
      },
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  useEffect(() => {
    performSearch();
  }, [filters]);

  const performSearch = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredProviders = [...mockProviders];
      
      if (searchQuery) {
        filteredProviders = filteredProviders.filter(provider =>
          provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filters.specialty) {
        filteredProviders = filteredProviders.filter(provider =>
          provider.specialty === filters.specialty
        );
      }

      if (filters.rating > 0) {
        filteredProviders = filteredProviders.filter(provider =>
          provider.rating >= filters.rating
        );
      }

      if (filters.insurance.length > 0) {
        filteredProviders = filteredProviders.filter(provider =>
          filters.insurance.some(ins => provider.insurance.includes(ins))
        );
      }

      if (filters.providerType !== 'all') {
        filteredProviders = filteredProviders.filter(provider =>
          provider.type === filters.providerType
        );
      }

      setProviders(filteredProviders);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const formatNextAvailable = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, hospitals, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {(filters.specialty || filters.insurance.length > 0 || filters.rating > 0) && (
            <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {[filters.specialty, ...filters.insurance, filters.rating > 0 ? 'rating' : ''].filter(Boolean).length}
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
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Distance Radius */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distance Radius
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={filters.radius}
                    onChange={(e) => setFilters(prev => ({ ...prev, radius: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5 km</span>
                    <span>{filters.radius} km</span>
                    <span>100+ km</span>
                  </div>
                </div>
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical Specialty
                </label>
                <select
                  value={filters.specialty}
                  onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Insurance Accepted
                </label>
                <div className="space-y-2">
                  {insuranceOptions.map(insurance => (
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
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({
                  location: '',
                  radius: 25,
                  specialty: '',
                  insurance: [],
                  rating: 0,
                  availability: '',
                  providerType: 'all'
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
          ) : providers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No providers found matching your criteria.</p>
            </div>
          ) : (
            providers.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {provider.name}
                        </h3>
                        {provider.specialty && (
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{provider.specialty}</p>
                        )}
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center space-x-1">
                            {renderStars(provider.rating)}
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {provider.rating} ({provider.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {provider.distance} km away
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Next available: {formatNextAvailable(provider.nextAvailable)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {provider.fees && (
                          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {provider.fees} MAD
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {provider.insurance.map(ins => (
                            <span
                              key={ins}
                              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs"
                            >
                              {ins}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/${provider.type}/${provider.id}`}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors"
                      >
                        View Profile
                      </Link>
                      <button className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Book Appointment</span>
                      </button>
                      <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Navigation className="w-4 h-4" />
                        <span>Directions</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Interactive map view would be displayed here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Showing {providers.length} providers on map
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthcareProviderSearch;