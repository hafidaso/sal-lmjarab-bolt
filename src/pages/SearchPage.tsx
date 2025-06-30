import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Clock, Users, Heart, Phone, Navigation, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import DoctorCard from '../components/search/DoctorCard';
import SearchFilters from '../components/search/SearchFilters';
import { mockDoctors, Doctor } from '../data/mockDoctors';
import LocationAwareSearch from '../components/search/LocationAwareSearch';
import NearbyProvidersMap from '../components/map/NearbyProvidersMap';
import { locationService } from '../services/locationService';

// Filter interface
interface SearchFilters {
  insurance: string[];
  gender: string;
  languages: string[];
  rating: string;
  distance: number;
  acceptingNew: boolean;
  telehealth: boolean;
  specialty: string;
  priceRange: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [userCoordinates, setUserCoordinates] = useState<{latitude: number, longitude: number} | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    insurance: [],
    gender: '',
    languages: [],
    rating: '',
    distance: 50,
    acceptingNew: false,
    telehealth: false,
    specialty: '',
    priceRange: ''
  });
  const { t } = useLanguage();

  // Load initial data
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Filter doctors based on search params
      let filteredDoctors = [...mockDoctors];
      
      if (searchTerm) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.subspecialties.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      if (location) {
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.location.city.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setDoctors(filteredDoctors);
      setFilteredDoctors(filteredDoctors);
    } catch (err) {
      setError('Failed to load search results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams, searchTerm, location]);

  // Apply filters whenever filters change
  useEffect(() => {
    try {
      let filtered = [...doctors];

      // Apply insurance filter
      if (filters.insurance.length > 0) {
        filtered = filtered.filter(doctor =>
          filters.insurance.some(insurance => 
            doctor.insurance.some(docInsurance => 
              docInsurance.toLowerCase().includes(insurance.toLowerCase())
            )
          )
        );
      }

      // Apply gender filter
      if (filters.gender) {
        // Note: This would need gender data in the doctor objects
        // For now, we'll skip this filter as it's not in the mock data
      }

      // Apply language filter
      if (filters.languages.length > 0) {
        filtered = filtered.filter(doctor =>
          filters.languages.some(lang => 
            doctor.languages.some(docLang => 
              docLang.toLowerCase().includes(lang.toLowerCase())
            )
          )
        );
      }

      // Apply rating filter
      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        filtered = filtered.filter(doctor => doctor.rating >= minRating);
      }

      // Apply distance filter
      if (filters.distance < 50) {
        filtered = filtered.filter(doctor => doctor.location.distance <= filters.distance);
      }

      // Apply accepting new patients filter
      if (filters.acceptingNew) {
        filtered = filtered.filter(doctor => doctor.availability.acceptingNew);
      }

      // Apply telehealth filter
      if (filters.telehealth) {
        // Note: This would need telehealth data in the doctor objects
        // For now, we'll skip this filter as it's not in the mock data
      }

      // Apply specialty filter
      if (filters.specialty) {
        filtered = filtered.filter(doctor =>
          doctor.specialty.toLowerCase().includes(filters.specialty.toLowerCase()) ||
          doctor.subspecialties.some(sub => 
            sub.toLowerCase().includes(filters.specialty.toLowerCase())
          )
        );
      }

      // Apply price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter(doctor => {
          const price = doctor.fees.consultation;
          if (max) {
            return price >= min && price <= max;
          }
          return price >= min;
        });
      }

      setFilteredDoctors(filtered);
    } catch (err) {
      setError('Failed to apply filters. Please try again.');
      console.error('Filter error:', err);
    }
  }, [doctors, filters]);

  useEffect(() => {
    // Get user location for map view
    const getUserLocation = async () => {
      try {
        const location = await locationService.getUserLocation();
        if (location) {
          setUserCoordinates(location.coordinates);
        }
      } catch (err) {
        console.error('Failed to get user location:', err);
      }
    };
    
    getUserLocation();
  }, []);

  const handleTraditionalSearch = (query: string, locationQuery: string) => {
    setSearchTerm(query);
    setLocation(locationQuery);
    
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (locationQuery) params.set('location', locationQuery);
    setSearchParams(params);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      insurance: [],
      gender: '',
      languages: [],
      rating: '',
      distance: 50,
      acceptingNew: false,
      telehealth: false,
      specialty: '',
      priceRange: ''
    });
  };

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return a.location.distance - b.location.distance;
      case 'price':
        return a.fees.consultation - b.fees.consultation;
      case 'experience':
        return b.experience - a.experience;
      default:
        return 0;
    }
  });

  const mapProviders = sortedDoctors.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    type: 'doctor' as const,
    specialty: doctor.specialty,
    rating: doctor.rating,
    coordinates: {
      latitude: doctor.location.coordinates.lat,
      longitude: doctor.location.coordinates.lng
    },
    address: doctor.location.address,
    phone: '+212 522 123 456', // Mock phone number
    distance: doctor.location.distance
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Find Healthcare Providers
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Search for doctors, specialists, and healthcare facilities in Morocco
            </p>
          </div>
          <LocationAwareSearch 
            onSearch={handleTraditionalSearch}
            placeholder={t('search.placeholder')}
            locationPlaceholder={t('search.location')}
            centered={true}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <SearchFilters 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Healthcare Providers
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {sortedDoctors.length} doctors found
                  {location && ` in ${location}`}
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Map Toggle */}
                <button
                  onClick={() => setShowMap(!showMap)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    showMap
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  <span>Map View</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="rating">Highest Rated</option>
                    <option value="distance">Closest</option>
                    <option value="price">Most Affordable</option>
                    <option value="experience">Most Experienced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Map View */}
            {showMap && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <NearbyProvidersMap 
                  providers={mapProviders}
                  height="500px"
                  zoom={12}
                  showControls={true}
                />
              </div>
            )}

            {/* Results */}
            <div className="space-y-4">
              {sortedDoctors.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No doctors found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 text-sm text-primary-600 hover:text-primary-700 border border-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                sortedDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <DoctorCard doctor={doctor} />
                  </motion.div>
                ))
              )}
            </div>

            {/* Load More */}
            {sortedDoctors.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;