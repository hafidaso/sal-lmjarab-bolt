import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Globe, Award, Shield, Heart, Calendar, MessageCircle, Share2, ChevronLeft, Users, CheckCircle, Navigation, Mail, Wifi, Car, Accessibility } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface Hospital {
  id: string;
  name: string;
  type: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  hours: {
    [key: string]: string;
  };
  awards: string[];
  specialtyAwards: string[];
  safetyScore: number;
  qualityMetrics: {
    patientSatisfaction: number;
    mortalityRate: number;
    complicationRate: number;
    readmissionRate: number;
  };
  amenities: string[];
  departments: string[];
  description: string;
  emergencyServices: boolean;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  education: string[];
}

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  category: string;
}

const HospitalDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();

  // Mock data
  const mockHospital: Hospital = {
    id: '1',
    name: 'CHU Ibn Rochd',
    type: 'University Hospital',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviewCount: 1247,
    location: {
      city: 'Casablanca',
      address: '1 Rue des Hôpitaux, Casablanca 20100',
      phone: '+212 522 225 252',
      email: 'contact@chu-ibnrochd.ma',
      website: 'www.chu-ibnrochd.ma'
    },
    hours: {
      'Monday': '24 Hours',
      'Tuesday': '24 Hours',
      'Wednesday': '24 Hours',
      'Thursday': '24 Hours',
      'Friday': '24 Hours',
      'Saturday': '24 Hours',
      'Sunday': '24 Hours'
    },
    awards: [
      "Morocco's Top 10 Hospitals 2025",
      "Excellence in Patient Care Award",
      "Best Teaching Hospital Award"
    ],
    specialtyAwards: [
      "Best Cardiac Care Center",
      "Excellence in Emergency Medicine",
      "Top Neurology Department"
    ],
    safetyScore: 4.8,
    qualityMetrics: {
      patientSatisfaction: 87,
      mortalityRate: 2.1,
      complicationRate: 3.4,
      readmissionRate: 8.2
    },
    amenities: [
      'Free WiFi',
      'Parking Available',
      'Wheelchair Accessible',
      'Pharmacy',
      'Cafeteria',
      'Prayer Room',
      'ATM',
      'Gift Shop'
    ],
    departments: [
      'Emergency Medicine',
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Oncology',
      'Pediatrics',
      'Obstetrics & Gynecology',
      'Internal Medicine'
    ],
    description: 'CHU Ibn Rochd is one of Morocco\'s leading university hospitals, providing comprehensive healthcare services with state-of-the-art medical technology and highly qualified medical staff. We are committed to excellence in patient care, medical education, and research.',
    emergencyServices: true
  };

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Bennani',
      specialty: 'Cardiology',
      image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      experience: 15,
      education: ['MD - University of Casablanca', 'Cardiology Fellowship - Paris']
    },
    {
      id: '2',
      name: 'Dr. Fatima Alaoui',
      specialty: 'Neurology',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      experience: 12,
      education: ['MD - University of Rabat', 'Neurology Residency - CHU Ibn Rochd']
    },
    {
      id: '3',
      name: 'Dr. Omar Idrissi',
      specialty: 'Emergency Medicine',
      image: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      experience: 18,
      education: ['MD - University of Fes', 'Emergency Medicine Fellowship - France']
    }
  ];

  const mockReviews: Review[] = [
    {
      id: '1',
      patientName: 'Fatima M.',
      rating: 5,
      comment: 'Excellent hospital with professional staff. The emergency department was very efficient and the doctors were caring and knowledgeable.',
      date: '2025-06-20',
      verified: true,
      category: 'Emergency Care'
    },
    {
      id: '2',
      patientName: 'Mohammed K.',
      rating: 4,
      comment: 'Good facilities and clean environment. The waiting time was reasonable and the staff was helpful throughout my visit.',
      date: '2025-06-23',
      verified: true,
      category: 'General Care'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHospital(mockHospital);
      setDoctors(mockDoctors);
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <Wifi className="w-4 h-4" />;
      case 'parking available':
        return <Car className="w-4 h-4" />;
      case 'wheelchair accessible':
        return <Accessibility className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

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

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hospital not found</h1>
            <Link to="/search" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Back to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/search" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to search results
        </Link>

        {/* Hospital Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-64 md:h-80">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{hospital.name}</h1>
              <p className="text-xl opacity-90">{hospital.type}</p>
            </div>
            {hospital.emergencyServices && (
              <div className="absolute top-6 right-6 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                24/7 Emergency
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {hospital.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({hospital.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Safety Score: {hospital.safetyScore}/5
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {hospital.location.address}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {hospital.location.phone}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {hospital.location.email}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {hospital.description}
                </p>
              </div>

              <div className="lg:w-80 mt-6 lg:mt-0">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                      <Navigation className="w-5 h-5" />
                      <span>Get Directions</span>
                    </button>
                    
                    <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Call Hospital</span>
                    </button>
                    
                    <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share Hospital</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'quality', label: 'Quality & Safety' },
                { id: 'doctors', label: 'Medical Staff' },
                { id: 'reviews', label: `Reviews (${hospital.reviewCount})` },
                { id: 'location', label: 'Location & Hours' },
                { id: 'faq', label: 'FAQ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Awards & Recognition */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Awards & Recognition</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospital Awards</h4>
                      <ul className="space-y-2">
                        {hospital.awards.map((award, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Award className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{award}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Specialty Awards</h4>
                      <ul className="space-y-2">
                        {hospital.specialtyAwards.map((award, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{award}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Departments */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Medical Departments</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {hospital.departments.map((dept, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{dept}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Amenities & Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hospital.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {getAmenityIcon(amenity)}
                        <span className="text-gray-600 dark:text-gray-400">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quality' && (
              <div className="space-y-8">
                {/* Quality Metrics */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Clinical Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {hospital.qualityMetrics.patientSatisfaction}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Patient Satisfaction</div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">Above National Average</div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {hospital.qualityMetrics.mortalityRate}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Mortality Rate</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Below National Average</div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {hospital.qualityMetrics.complicationRate}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Complication Rate</div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">At National Average</div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {hospital.qualityMetrics.readmissionRate}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Readmission Rate</div>
                      <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Below National Average</div>
                    </div>
                  </div>
                </div>

                {/* Safety Score */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Patient Safety</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">Overall Safety Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(hospital.safetyScore)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {hospital.safetyScore}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      This hospital has received excellent safety ratings based on infection control, 
                      medication safety, and overall patient care protocols.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Medical Staff Directory</h3>
                  <Link to="/search?type=doctors" className="text-primary-600 hover:text-primary-700 font-medium">
                    View All Doctors
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {doctor.experience} years experience
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {doctor.education.join(' • ')}
                        </div>
                      </div>
                      
                      <Link
                        to={`/doctor/${doctor.id}`}
                        className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Profile
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Patient Reviews</h3>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Write a Review
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 dark:text-primary-400 font-semibold">
                              {review.patientName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {review.patientName}
                              </span>
                              {review.verified && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified Patient
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {review.category} • {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location & Contact</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Address</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-primary-500 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{hospital.name}</p>
                              <p className="text-gray-600 dark:text-gray-400">{hospital.location.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-primary-500" />
                            <span className="text-gray-600 dark:text-gray-400">{hospital.location.phone}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-primary-500" />
                            <span className="text-gray-600 dark:text-gray-400">{hospital.location.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-primary-500" />
                            <span className="text-gray-600 dark:text-gray-400">{hospital.location.website}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Operating Hours</h3>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    {Object.entries(hospital.hours).map(([day, hours], index) => (
                      <div key={index} className="flex justify-between py-3 px-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <span className="font-medium text-gray-900 dark:text-white">{day}</span>
                        <span className={`${hours === '24 Hours' ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                          {hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      question: "What insurance plans do you accept?",
                      answer: "We accept CNSS, RAMED, and most private insurance plans. Please contact our billing department for specific coverage details."
                    },
                    {
                      question: "Do you offer emergency services?",
                      answer: "Yes, we provide 24/7 emergency services with a fully equipped emergency department and trauma center."
                    },
                    {
                      question: "Is parking available?",
                      answer: "Yes, we offer free parking for patients and visitors. Valet parking is also available for a small fee."
                    },
                    {
                      question: "What visitor policies do you have?",
                      answer: "Visiting hours are from 10 AM to 8 PM. Each patient may have up to 2 visitors at a time. Please check with nursing staff for specific unit policies."
                    },
                    {
                      question: "Do you have a pharmacy on-site?",
                      answer: "Yes, we have a full-service pharmacy located on the ground floor that's open 24/7 for your convenience."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailPage;