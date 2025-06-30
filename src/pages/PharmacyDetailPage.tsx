import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Car, Accessibility, Truck, Shield, ChevronLeft, Navigation, Share2, CheckCircle, Pill, Syringe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface Pharmacy {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    address: string;
    phone: string;
  };
  hours: {
    [key: string]: string;
  };
  services: string[];
  features: string[];
  description: string;
  pharmacist: {
    name: string;
    license: string;
    experience: number;
  };
  is24Hours: boolean;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  category: string;
}

interface NearbyPharmacy {
  id: string;
  name: string;
  distance: number;
  rating: number;
  isOpen: boolean;
}

const PharmacyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nearbyPharmacies, setNearbyPharmacies] = useState<NearbyPharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();

  // Mock data
  const mockPharmacy: Pharmacy = {
    id: '1',
    name: 'Pharmacie Al Andalous',
    image: 'https://images.pexels.com/photos/5910955/pexels-photo-5910955.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviewCount: 324,
    location: {
      city: 'Casablanca',
      address: '123 Boulevard Mohammed V, Casablanca 20000',
      phone: '+212 522 123 789'
    },
    hours: {
      'Monday': '8:00 AM - 10:00 PM',
      'Tuesday': '8:00 AM - 10:00 PM',
      'Wednesday': '8:00 AM - 10:00 PM',
      'Thursday': '8:00 AM - 10:00 PM',
      'Friday': '8:00 AM - 10:00 PM',
      'Saturday': '9:00 AM - 9:00 PM',
      'Sunday': '9:00 AM - 6:00 PM'
    },
    services: [
      'Prescription Refills',
      'Medication Consultation',
      'Immunizations & Vaccines',
      'Blood Pressure Monitoring',
      'Diabetes Testing',
      'Home Delivery',
      'Durable Medical Equipment',
      'Compounding Services'
    ],
    features: [
      'Drive-Through Service',
      'Wheelchair Accessible',
      'Free Parking',
      'Online Ordering',
      'Mobile App',
      'Insurance Accepted',
      'Multilingual Staff',
      'Emergency Services'
    ],
    description: 'Pharmacie Al Andalous has been serving the Casablanca community for over 20 years. We are committed to providing exceptional pharmaceutical care with a focus on patient health and wellness. Our experienced pharmacists are available to answer your questions and provide personalized medication counseling.',
    pharmacist: {
      name: 'Dr. Youssef Benali',
      license: 'PharmD License #MA-2003-1234',
      experience: 18
    },
    is24Hours: false
  };

  const mockReviews: Review[] = [
    {
      id: '1',
      customerName: 'Amina K.',
      rating: 5,
      comment: 'Excellent service and very knowledgeable pharmacist. They always have my medications in stock and the staff is very helpful.',
      date: '2025-06-20',
      verified: true,
      category: 'Service Quality'
    },
    {
      id: '2',
      customerName: 'Hassan M.',
      rating: 4,
      comment: 'Good pharmacy with reasonable prices. The drive-through service is very convenient. Sometimes there can be a wait during busy hours.',
      date: '2025-06-23',
      verified: true,
      category: 'Convenience'
    },
    {
      id: '3',
      customerName: 'Fatima L.',
      rating: 5,
      comment: 'The pharmacist took time to explain my new medication and potential side effects. Very professional and caring service.',
      date: '2025-06-25',
      verified: true,
      category: 'Professional Care'
    }
  ];

  const mockNearbyPharmacies: NearbyPharmacy[] = [
    {
      id: '2',
      name: 'Pharmacie Centrale',
      distance: 0.8,
      rating: 4.5,
      isOpen: true
    },
    {
      id: '3',
      name: 'Pharmacie du Quartier',
      distance: 1.2,
      rating: 4.3,
      isOpen: false
    },
    {
      id: '4',
      name: 'Pharmacie Moderne',
      distance: 1.5,
      rating: 4.6,
      isOpen: true
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPharmacy(mockPharmacy);
      setReviews(mockReviews);
      setNearbyPharmacies(mockNearbyPharmacies);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'immunizations & vaccines':
        return <Syringe className="w-5 h-5" />;
      case 'prescription refills':
        return <Pill className="w-5 h-5" />;
      case 'home delivery':
        return <Truck className="w-5 h-5" />;
      case 'blood pressure monitoring':
        return <Heart className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'drive-through service':
        return <Car className="w-4 h-4" />;
      case 'wheelchair accessible':
        return <Accessibility className="w-4 h-4" />;
      case 'insurance accepted':
        return <Shield className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const isCurrentlyOpen = () => {
    if (!pharmacy) return false;
    
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const todayHours = pharmacy.hours[currentDay];
    if (todayHours === 'Closed') return false;
    
    if (pharmacy.is24Hours) return true;
    
    // Parse hours like "8:00 AM - 10:00 PM"
    const [openTime, closeTime] = todayHours.split(' - ');
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      return (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes;
    };
    
    const openMinutes = parseTime(openTime);
    const closeMinutes = parseTime(closeTime);
    
    return currentTime >= openMinutes && currentTime <= closeMinutes;
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

  if (!pharmacy) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pharmacy not found</h1>
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

        {/* Pharmacy Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-48 md:h-64">
            <img
              src={pharmacy.image}
              alt={pharmacy.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{pharmacy.name}</h1>
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isCurrentlyOpen() 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {isCurrentlyOpen() ? 'Open Now' : 'Closed'}
                </div>
                {pharmacy.is24Hours && (
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    24/7 Service
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {pharmacy.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({pharmacy.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {pharmacy.location.address}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {pharmacy.location.phone}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {pharmacy.description}
                </p>

                {/* Pharmacist Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Head Pharmacist</h4>
                  <p className="text-gray-700 dark:text-gray-300">{pharmacy.pharmacist.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pharmacy.pharmacist.experience} years experience • {pharmacy.pharmacist.license}
                  </p>
                </div>
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
                      <span>Call Pharmacy</span>
                    </button>
                    
                    <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share Pharmacy</span>
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
                { id: 'services', label: 'Services' },
                { id: 'reviews', label: `Reviews (${pharmacy.reviewCount})` },
                { id: 'hours', label: 'Hours & Location' },
                { id: 'nearby', label: 'Nearby Pharmacies' },
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
                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features & Accessibility</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pharmacy.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {getFeatureIcon(feature)}
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">At a Glance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {pharmacy.rating}/5
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Customer Rating</div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {pharmacy.pharmacist.experience}+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                        {pharmacy.services.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Services Offered</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Services Offered</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pharmacy.services.map((service, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                          {getServiceIcon(service)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">{service}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {service === 'Prescription Refills' && 'Quick and convenient prescription refill service with automatic reminders.'}
                            {service === 'Medication Consultation' && 'Professional consultation on medication usage, interactions, and side effects.'}
                            {service === 'Immunizations & Vaccines' && 'Complete vaccination services including flu shots, travel vaccines, and more.'}
                            {service === 'Blood Pressure Monitoring' && 'Free blood pressure checks and monitoring services.'}
                            {service === 'Diabetes Testing' && 'Blood glucose testing and diabetes management support.'}
                            {service === 'Home Delivery' && 'Convenient home delivery service for your medications.'}
                            {service === 'Durable Medical Equipment' && 'Medical equipment rental and sales including wheelchairs, walkers, and more.'}
                            {service === 'Compounding Services' && 'Custom medication compounding for specialized prescriptions.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Customer Reviews</h3>
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
                              {review.customerName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {review.customerName}
                              </span>
                              {review.verified && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified Customer
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

            {activeTab === 'hours' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{pharmacy.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">{pharmacy.location.address}</p>
                        <p className="text-gray-600 dark:text-gray-400">{pharmacy.location.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Operating Hours</h3>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    {Object.entries(pharmacy.hours).map(([day, hours], index) => {
                      const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
                      return (
                        <div key={index} className={`flex justify-between py-3 px-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                          isToday ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                        }`}>
                          <span className={`font-medium ${isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                            {day} {isToday && '(Today)'}
                          </span>
                          <span className={`${
                            hours === 'Closed' 
                              ? 'text-red-600 dark:text-red-400' 
                              : isToday 
                                ? 'text-primary-600 dark:text-primary-400 font-medium'
                                : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {hours}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nearby' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Nearby Pharmacies</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearbyPharmacies.map((nearbyPharmacy) => (
                    <div key={nearbyPharmacy.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{nearbyPharmacy.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{nearbyPharmacy.distance} km away</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          nearbyPharmacy.isOpen 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {nearbyPharmacy.isOpen ? 'Open' : 'Closed'}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{nearbyPharmacy.rating}</span>
                      </div>
                      
                      <Link
                        to={`/pharmacy/${nearbyPharmacy.id}`}
                        className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
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

export default PharmacyDetailPage;