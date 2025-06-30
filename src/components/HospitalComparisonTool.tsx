import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Heart, 
  Users, 
  MapPin, 
  Phone, 
  Globe, 
  Award,
  Shield,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Building2,
  Stethoscope
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Hospital {
  id: string;
  name: string;
  type: 'public' | 'private' | 'university';
  location: {
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  ratings: {
    cleanliness: number;
    patientSatisfaction: number;
    overall: number;
    reviewCount: number;
  };
  emergencyRoom: {
    averageWaitTime: number; // in minutes
    waitTimeRange: string;
    capacity: 'low' | 'medium' | 'high';
  };
  specialties: string[];
  services: string[];
  certifications: string[];
  contact: {
    phone: string;
    website: string;
    email: string;
  };
  image: string;
  description: string;
  verified: boolean;
  insurance: string[];
  languages: string[];
}

// Mock hospital data
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'CHU Ibn Rochd',
    type: 'public',
    location: {
      city: 'Casablanca',
      address: 'Boulevard Hassan II, Casablanca 20000',
      coordinates: { lat: 33.5731, lng: -7.5898 }
    },
    ratings: {
      cleanliness: 4.2,
      patientSatisfaction: 4.0,
      overall: 4.1,
      reviewCount: 1247
    },
    emergencyRoom: {
      averageWaitTime: 45,
      waitTimeRange: '30-60 minutes',
      capacity: 'medium'
    },
    specialties: [
      'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 
      'Emergency Medicine', 'Internal Medicine', 'Surgery', 'Oncology',
      'Radiology', 'Laboratory Medicine', 'Pharmacy', 'Rehabilitation'
    ],
    services: [
      '24/7 Emergency Care', 'Intensive Care Unit', 'Operating Rooms',
      'Laboratory Services', 'Radiology Services', 'Pharmacy',
      'Rehabilitation Center', 'Outpatient Clinics'
    ],
    certifications: [
      'ISO 9001:2015', 'Joint Commission International',
      'Ministry of Health Accreditation'
    ],
    contact: {
      phone: '+212 522 123 456',
      website: 'https://www.chu-ibn-rochd.ma',
      email: 'contact@chu-ibn-rochd.ma'
    },
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'University Hospital Center Ibn Rochd is one of the largest public hospitals in Morocco, providing comprehensive healthcare services with state-of-the-art medical equipment.',
    verified: true,
    insurance: ['CNSS', 'RAMED', 'Private'],
    languages: ['Arabic', 'French', 'English']
  },
  {
    id: '2',
    name: 'Clinique Al Andalous',
    type: 'private',
    location: {
      city: 'Casablanca',
      address: 'Avenue Hassan II, Maarif, Casablanca 20100',
      coordinates: { lat: 33.5951, lng: -7.6324 }
    },
    ratings: {
      cleanliness: 4.8,
      patientSatisfaction: 4.7,
      overall: 4.75,
      reviewCount: 892
    },
    emergencyRoom: {
      averageWaitTime: 25,
      waitTimeRange: '15-35 minutes',
      capacity: 'low'
    },
    specialties: [
      'Cardiology', 'Dermatology', 'Gynecology', 'Ophthalmology',
      'Orthopedics', 'Pediatrics', 'Plastic Surgery', 'Urology',
      'ENT', 'Gastroenterology', 'Endocrinology', 'Rheumatology'
    ],
    services: [
      '24/7 Emergency Care', 'Luxury Patient Rooms', 'Private Consultation',
      'Advanced Imaging Center', 'Laboratory Services', 'Pharmacy',
      'Wellness Center', 'Concierge Services'
    ],
    certifications: [
      'ISO 9001:2015', 'Joint Commission International',
      'European Healthcare Standards'
    ],
    contact: {
      phone: '+212 522 234 567',
      website: 'https://www.clinique-al-andalous.ma',
      email: 'info@clinique-al-andalous.ma'
    },
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Clinique Al Andalous is a premium private hospital offering luxury healthcare services with personalized care and modern medical facilities.',
    verified: true,
    insurance: ['Private', 'International'],
    languages: ['Arabic', 'French', 'English', 'Spanish']
  },
  {
    id: '3',
    name: 'Hôpital Provincial de Rabat',
    type: 'public',
    location: {
      city: 'Rabat',
      address: 'Avenue Mohammed V, Rabat 10000',
      coordinates: { lat: 34.0209, lng: -6.8416 }
    },
    ratings: {
      cleanliness: 3.9,
      patientSatisfaction: 3.8,
      overall: 3.85,
      reviewCount: 756
    },
    emergencyRoom: {
      averageWaitTime: 60,
      waitTimeRange: '45-90 minutes',
      capacity: 'high'
    },
    specialties: [
      'Emergency Medicine', 'Internal Medicine', 'General Surgery',
      'Pediatrics', 'Obstetrics', 'Gynecology', 'Orthopedics',
      'Radiology', 'Laboratory Medicine'
    ],
    services: [
      '24/7 Emergency Care', 'General Wards', 'Operating Rooms',
      'Laboratory Services', 'Radiology Services', 'Pharmacy',
      'Maternity Ward', 'Pediatric Ward'
    ],
    certifications: [
      'Ministry of Health Accreditation',
      'Provincial Healthcare Standards'
    ],
    contact: {
      phone: '+212 537 345 678',
      website: 'https://www.hopital-rabat.ma',
      email: 'contact@hopital-rabat.ma'
    },
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Provincial Hospital of Rabat provides essential healthcare services to the local community with a focus on emergency care and general medicine.',
    verified: true,
    insurance: ['CNSS', 'RAMED'],
    languages: ['Arabic', 'French']
  },
  {
    id: '4',
    name: 'Centre Hospitalier Universitaire Mohammed VI',
    type: 'public',
    location: {
      city: 'Marrakech',
      address: 'Route de Safi, Marrakech 40000',
      coordinates: { lat: 31.6295, lng: -7.9811 }
    },
    ratings: {
      cleanliness: 4.1,
      patientSatisfaction: 4.2,
      overall: 4.15,
      reviewCount: 634
    },
    emergencyRoom: {
      averageWaitTime: 50,
      waitTimeRange: '35-70 minutes',
      capacity: 'medium'
    },
    specialties: [
      'Cardiology', 'Neurology', 'Orthopedics', 'Emergency Medicine',
      'Internal Medicine', 'Surgery', 'Pediatrics', 'Gynecology',
      'Oncology', 'Radiology', 'Laboratory Medicine', 'Rehabilitation'
    ],
    services: [
      '24/7 Emergency Care', 'Intensive Care Unit', 'Operating Rooms',
      'Laboratory Services', 'Radiology Services', 'Pharmacy',
      'Rehabilitation Center', 'Research Center'
    ],
    certifications: [
      'ISO 9001:2015', 'Joint Commission International',
      'University Hospital Standards'
    ],
    contact: {
      phone: '+212 524 456 789',
      website: 'https://www.chu-marrakech.ma',
      email: 'info@chu-marrakech.ma'
    },
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'University Hospital Center Mohammed VI is a modern healthcare facility serving the Marrakech region with advanced medical technology and research capabilities.',
    verified: true,
    insurance: ['CNSS', 'RAMED', 'Private'],
    languages: ['Arabic', 'French', 'English']
  },
  {
    id: '5',
    name: 'Clinique Internationale de Fès',
    type: 'private',
    location: {
      city: 'Fès',
      address: 'Avenue Hassan II, Fès 30000',
      coordinates: { lat: 34.0181, lng: -5.0078 }
    },
    ratings: {
      cleanliness: 4.6,
      patientSatisfaction: 4.5,
      overall: 4.55,
      reviewCount: 445
    },
    emergencyRoom: {
      averageWaitTime: 30,
      waitTimeRange: '20-45 minutes',
      capacity: 'low'
    },
    specialties: [
      'Cardiology', 'Dermatology', 'Gynecology', 'Ophthalmology',
      'Orthopedics', 'Pediatrics', 'Urology', 'ENT',
      'Gastroenterology', 'Endocrinology', 'Neurology', 'Psychiatry'
    ],
    services: [
      '24/7 Emergency Care', 'Private Rooms', 'Specialized Clinics',
      'Advanced Imaging Center', 'Laboratory Services', 'Pharmacy',
      'Wellness Programs', 'International Patient Services'
    ],
    certifications: [
      'ISO 9001:2015', 'Joint Commission International',
      'International Healthcare Standards'
    ],
    contact: {
      phone: '+212 535 567 890',
      website: 'https://www.clinique-fes.ma',
      email: 'contact@clinique-fes.ma'
    },
    image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'International Clinic of Fès offers premium healthcare services with international standards and personalized care for both local and international patients.',
    verified: true,
    insurance: ['Private', 'International'],
    languages: ['Arabic', 'French', 'English', 'German']
  }
];

interface ComparisonFilters {
  city: string;
  type: string;
  minCleanliness: number;
  maxWaitTime: number;
  minSatisfaction: number;
  specialties: string[];
}

const HospitalComparisonTool: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);
  const [filters, setFilters] = useState<ComparisonFilters>({
    city: '',
    type: '',
    minCleanliness: 0,
    maxWaitTime: 120,
    minSatisfaction: 0,
    specialties: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('overall');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Available specialties for filter
  const allSpecialties = Array.from(new Set(
    mockHospitals.flatMap(hospital => hospital.specialties)
  )).sort();

  // Available cities for filter
  const allCities = Array.from(new Set(
    mockHospitals.map(hospital => hospital.location.city)
  )).sort();

  const filteredHospitals = hospitals.filter(hospital => {
    if (filters.city && hospital.location.city !== filters.city) return false;
    if (filters.type && hospital.type !== filters.type) return false;
    if (hospital.ratings.cleanliness < filters.minCleanliness) return false;
    if (hospital.emergencyRoom.averageWaitTime > filters.maxWaitTime) return false;
    if (hospital.ratings.patientSatisfaction < filters.minSatisfaction) return false;
    if (filters.specialties.length > 0 && 
        !filters.specialties.some(specialty => 
          hospital.specialties.includes(specialty)
        )) return false;
    return true;
  });

  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortBy) {
      case 'cleanliness':
        aValue = a.ratings.cleanliness;
        bValue = b.ratings.cleanliness;
        break;
      case 'waitTime':
        aValue = a.emergencyRoom.averageWaitTime;
        bValue = b.emergencyRoom.averageWaitTime;
        break;
      case 'satisfaction':
        aValue = a.ratings.patientSatisfaction;
        bValue = b.ratings.patientSatisfaction;
        break;
      case 'overall':
      default:
        aValue = a.ratings.overall;
        bValue = b.ratings.overall;
        break;
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const toggleHospitalSelection = (hospitalId: string) => {
    setSelectedHospitals(prev => 
      prev.includes(hospitalId) 
        ? prev.filter(id => id !== hospitalId)
        : prev.length < 3 
          ? [...prev, hospitalId]
          : prev
    );
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      minCleanliness: 0,
      maxWaitTime: 120,
      minSatisfaction: 0,
      specialties: []
    });
  };

  const getWaitTimeColor = (waitTime: number) => {
    if (waitTime <= 30) return 'text-green-600';
    if (waitTime <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hospital Service Comparison Tool
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare hospitals by cleanliness ratings, emergency room wait times, patient satisfaction, and available specialties to make informed healthcare decisions.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters & Sorting
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
              >
                <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* City Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <select
                        value={filters.city}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">All Cities</option>
                        {allCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hospital Type
                      </label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">All Types</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="university">University</option>
                      </select>
                    </div>

                    {/* Cleanliness Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Min Cleanliness Rating
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={filters.minCleanliness}
                        onChange={(e) => setFilters(prev => ({ ...prev, minCleanliness: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {filters.minCleanliness} stars
                      </div>
                    </div>

                    {/* Wait Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Wait Time
                      </label>
                      <input
                        type="range"
                        min="15"
                        max="120"
                        step="5"
                        value={filters.maxWaitTime}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxWaitTime: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {filters.maxWaitTime} minutes
                      </div>
                    </div>
                  </div>

                  {/* Specialties Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Specialties
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {allSpecialties.map(specialty => (
                        <label key={specialty} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.specialties.includes(specialty)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  specialties: [...prev.specialties, specialty] 
                                }));
                              } else {
                                setFilters(prev => ({ 
                                  ...prev, 
                                  specialties: prev.specialties.filter(s => s !== specialty) 
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {specialty}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sorting */}
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="overall">Overall Rating</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="waitTime">Wait Time</option>
                <option value="satisfaction">Patient Satisfaction</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {sortOrder === 'asc' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredHospitals.length} of {mockHospitals.length} hospitals
          </p>
        </div>

        {/* Hospital Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {sortedHospitals.map((hospital) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
                selectedHospitals.includes(hospital.id)
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
              }`}
              onClick={() => toggleHospitalSelection(hospital.id)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {hospital.name}
                      </h3>
                      {hospital.verified && (
                        <Shield className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="capitalize">{hospital.type}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{hospital.location.city}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Select for comparison</span>
                    <input
                      type="checkbox"
                      checked={selectedHospitals.includes(hospital.id)}
                      onChange={() => toggleHospitalSelection(hospital.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Image */}
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                {/* Ratings Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cleanliness
                      </span>
                    </div>
                    {renderStars(hospital.ratings.cleanliness)}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Satisfaction
                      </span>
                    </div>
                    {renderStars(hospital.ratings.patientSatisfaction)}
                  </div>
                </div>

                {/* Emergency Room Info */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        ER Wait Time
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${getWaitTimeColor(hospital.emergencyRoom.averageWaitTime)}`}>
                        {hospital.emergencyRoom.averageWaitTime} min
                      </div>
                      <div className="text-xs text-gray-500">
                        {hospital.emergencyRoom.waitTimeRange}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Capacity:</span>
                    <span className={`text-xs font-medium ${getCapacityColor(hospital.emergencyRoom.capacity)}`}>
                      {hospital.emergencyRoom.capacity.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Specialties
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.slice(0, 6).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                    {hospital.specialties.length > 6 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-full text-xs">
                        +{hospital.specialties.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{hospital.contact.phone}</span>
                  </div>
                  <a
                    href={hospital.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        {selectedHospitals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Hospital Comparison
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Criteria
                      </th>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <th key={hospitalId} className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                            {hospital?.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Overall Rating */}
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Overall Rating
                      </td>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <td key={hospitalId} className="py-3 px-4 text-center">
                            {renderStars(hospital?.ratings.overall || 0)}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Cleanliness */}
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Cleanliness Rating
                      </td>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <td key={hospitalId} className="py-3 px-4 text-center">
                            {renderStars(hospital?.ratings.cleanliness || 0)}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Patient Satisfaction */}
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Patient Satisfaction
                      </td>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <td key={hospitalId} className="py-3 px-4 text-center">
                            {renderStars(hospital?.ratings.patientSatisfaction || 0)}
                          </td>
                        );
                      })}
                    </tr>

                    {/* ER Wait Time */}
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        ER Wait Time
                      </td>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <td key={hospitalId} className="py-3 px-4 text-center">
                            <div className={`font-semibold ${getWaitTimeColor(hospital?.emergencyRoom.averageWaitTime || 0)}`}>
                              {hospital?.emergencyRoom.averageWaitTime} min
                            </div>
                            <div className="text-xs text-gray-500">
                              {hospital?.emergencyRoom.waitTimeRange}
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Specialties Count */}
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Available Specialties
                      </td>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <td key={hospitalId} className="py-3 px-4 text-center">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {hospital?.specialties.length}
                            </div>
                            <div className="text-xs text-gray-500">
                              specialties
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Type */}
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Hospital Type
                      </td>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <td key={hospitalId} className="py-3 px-4 text-center">
                            <span className="capitalize px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                              {hospital?.type}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Contact */}
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                        Contact
                      </td>
                      {selectedHospitals.map(hospitalId => {
                        const hospital = mockHospitals.find(h => h.id === hospitalId);
                        return (
                          <td key={hospitalId} className="py-3 px-4 text-center">
                            <div className="text-sm">
                              <div>{hospital?.contact.phone}</div>
                              <a
                                href={hospital?.contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 hover:text-primary-700 text-xs"
                              >
                                Visit Website
                              </a>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Clear Selection */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedHospitals([])}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Selection</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HospitalComparisonTool; 