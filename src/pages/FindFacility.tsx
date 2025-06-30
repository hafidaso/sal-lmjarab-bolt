import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, Clock, Calendar, Map, List, Navigation, Phone, Building, Accessibility, CreditCard, Clock8, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Facility {
  id: string;
  name: string;
  type: 'hospital' | 'group-practice' | 'pharmacy' | 'urgent-care';
  rating: number;
  reviewCount: number;
  distance: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  insurance: string[];
  specialties?: string[];
  hours: {
    [key: string]: string;
  };
  features: string[];
  image: string;
}

const FindFacility = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    facilityType: 'all',
    distance: 50,
    insurance: [] as string[],
    rating: 0,
    openNow: false,
    accessibility: false,
  });

  // Mock data for facilities
  const mockFacilities: Facility[] = [
    {
      id: '1',
      name: 'CHU Ibn Rochd',
      type: 'hospital',
      rating: 4.6,
      reviewCount: 1247,
      distance: 3.1,
      address: '1 Rue des Hôpitaux',
      city: 'Casablanca',
      state: '',
      zipCode: '20100',
      phone: '+212 522 225 252',
      insurance: ['CNSS', 'RAMED', 'Private'],
      specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'],
      hours: {
        'Monday': '24 Hours',
        'Tuesday': '24 Hours',
        'Wednesday': '24 Hours',
        'Thursday': '24 Hours',
        'Friday': '24 Hours',
        'Saturday': '24 Hours',
        'Sunday': '24 Hours'
      },
      features: ['Emergency Services', 'Parking', 'Wheelchair Accessible', 'Cafeteria'],
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: 'Clinique Al Andalous',
      type: 'group-practice',
      rating: 4.8,
      reviewCount: 856,
      distance: 5.7,
      address: '123 Avenue Mohammed V',
      city: 'Rabat',
      state: '',
      zipCode: '10000',
      phone: '+212 537 123 456',
      insurance: ['CNSS', 'Private'],
      specialties: ['Dermatology', 'Gynecology', 'Ophthalmology'],
      hours: {
        'Monday': '8:00 AM - 8:00 PM',
        'Tuesday': '8:00 AM - 8:00 PM',
        'Wednesday': '8:00 AM - 8:00 PM',
        'Thursday': '8:00 AM - 8:00 PM',
        'Friday': '8:00 AM - 8:00 PM',
        'Saturday': '9:00 AM - 5:00 PM',
        'Sunday': 'Closed'
      },
      features: ['Parking', 'Wheelchair Accessible', 'Laboratory Services'],
      image: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      name: 'Pharmacie Centrale',
      type: 'pharmacy',
      rating: 4.7,
      reviewCount: 324,
      distance: 2.3,
      address: '456 Boulevard Mohammed VI',
      city: 'Marrakech',
      state: '',
      zipCode: '40000',
      phone: '+212 524 987 654',
      insurance: ['CNSS', 'RAMED', 'Private'],
      hours: {
        'Monday': '8:00 AM - 10:00 PM',
        'Tuesday': '8:00 AM - 10:00 PM',
        'Wednesday': '8:00 AM - 10:00 PM',
        'Thursday': '8:00 AM - 10:00 PM',
        'Friday': '8:00 AM - 10:00 PM',
        'Saturday': '9:00 AM - 9:00 PM',
        'Sunday': '9:00 AM - 6:00 PM'
      },
      features: ['Drive-Through Service', 'Wheelchair Accessible', 'Home Delivery'],
      image: 'https://images.pexels.com/photos/5910955/pexels-photo-5910955.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      name: 'Centre Médical d\'Urgence',
      type: 'urgent-care',
      rating: 4.5,
      reviewCount: 512,
      distance: 4.2,
      address: '789 Avenue Hassan II',
      city: 'Casablanca',
      state: '',
      zipCode: '20200',
      phone: '+212 522 345 678',
      insurance: ['CNSS', 'RAMED', 'Private'],
      specialties: ['Emergency Medicine', 'General Medicine'],
      hours: {
        'Monday': '24 Hours',
        'Tuesday': '24 Hours',
        'Wednesday': '24 Hours',
        'Thursday': '24 Hours',
        'Friday': '24 Hours',
        'Saturday': '24 Hours',
        'Sunday': '24 Hours'
      },
      features: ['Emergency Services', 'X-Ray', 'Laboratory', 'Parking'],
      image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  useEffect(() => {
    performSearch();
  }, [filters]);

  const performSearch = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredFacilities = [...mockFacilities];
      
      if (searchQuery) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          facility.specialties?.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
          facility.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (location) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.city.toLowerCase().includes(location.toLowerCase()) ||
          facility.zipCode.includes(location)
        );
      }

      if (filters.facilityType !== 'all') {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.type === filters.facilityType
        );
      }

      if (filters.distance < 50) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.distance <= filters.distance
        );
      }

      if (filters.insurance.length > 0) {
        filteredFacilities = filteredFacilities.filter(facility =>
          filters.insurance.some(ins => facility.insurance.includes(ins))
        );
      }

      if (filters.rating > 0) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.rating >= filters.rating
        );
      }

      if (filters.openNow) {
        const now = new Date();
        const day = now.toLocaleDateString('en-US', { weekday: 'long' });
        
        filteredFacilities = filteredFacilities.filter(facility => {
          const hours = facility.hours[day];
          if (hours === '24 Hours') return true;
          if (hours === 'Closed') return false;
          
          // Parse hours like "8:00 AM - 8:00 PM"
          const [start, end] = hours.split(' - ');
          const currentTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          
          // Simple string comparison (not perfect but works for demo)
          return currentTime >= start && currentTime <= end;
        });
      }

      if (filters.accessibility) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.features.includes('Wheelchair Accessible')
        );
      }

      setFacilities(filteredFacilities);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const getFacilityTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return <Building className="w-5 h-5" />;
      case 'group-practice':
        return <Users className="w-5 h-5" />;
      case 'pharmacy':
        return <Pill className="w-5 h-5" />;
      case 'urgent-care':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
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

  const isCurrentlyOpen = (facility: Facility) => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    
    const hours = facility.hours[day];
    if (hours === '24 Hours') return true;
    if (hours === 'Closed') return false;
    
    // This is a simplified check - in a real app, you'd want to parse the times properly
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Find a Healthcare Facility
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search for hospitals, clinics, pharmacies, and more across Morocco
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
                  placeholder="Search by facility name, specialty, or type..."
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
            {(filters.facilityType !== 'all' || filters.insurance.length > 0 || filters.rating > 0 || filters.openNow || filters.accessibility) && (
              <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {[
                  filters.facilityType !== 'all' ? 1 : 0,
                  filters.insurance.length > 0 ? 1 : 0,
                  filters.rating > 0 ? 1 : 0,
                  filters.openNow ? 1 : 0,
                  filters.accessibility ? 1 : 0
                ].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {facilities.length} results found
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
                {/* Facility Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Facility Type
                  </label>
                  <select
                    value={filters.facilityType}
                    onChange={(e) => setFilters(prev => ({ ...prev, facilityType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Facilities</option>
                    <option value="hospital">Hospitals</option>
                    <option value="group-practice">Group Practices</option>
                    <option value="pharmacy">Pharmacies</option>
                    <option value="urgent-care">Urgent Care</option>
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

                {/* Additional Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Filters
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.openNow}
                        onChange={(e) => setFilters(prev => ({ ...prev, openNow: e.target.checked }))}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Open Now</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.accessibility}
                        onChange={(e) => setFilters(prev => ({ ...prev, accessibility: e.target.checked }))}
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
                    facilityType: 'all',
                    distance: 50,
                    insurance: [],
                    rating: 0,
                    openNow: false,
                    accessibility: false,
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
            ) : facilities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No facilities found matching your criteria.</p>
              </div>
            ) : (
              facilities.map((facility) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="w-full h-48 md:h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {facility.name}
                            </h3>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-medium capitalize">
                              {facility.type.replace('-', ' ')}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 mb-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(facility.rating)}
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {facility.rating} ({facility.reviewCount} reviews)
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {facility.distance} km away
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {facility.address}, {facility.city} {facility.zipCode}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {facility.phone}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-4">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {isCurrentlyOpen(facility) ? (
                                <span className="text-green-600 dark:text-green-400">Open Now</span>
                              ) : (
                                <span className="text-red-600 dark:text-red-400">Closed</span>
                              )}
                              {' • '}
                              {facility.hours['Monday']}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {facility.insurance.map(ins => (
                              <span
                                key={ins}
                                className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs"
                              >
                                {ins}
                              </span>
                            ))}
                          </div>
                          
                          {facility.specialties && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {facility.specialties.slice(0, 3).map((specialty, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                                >
                                  {specialty}
                                </span>
                              ))}
                              {facility.specialties.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                                  +{facility.specialties.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2">
                            {facility.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                              </div>
                            ))}
                            {facility.features.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{facility.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to={`/${facility.type}/${facility.id}`}
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors"
                        >
                          View Details
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
                  Showing {facilities.length} facilities on map
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindFacility;