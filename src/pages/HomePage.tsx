import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Heart, 
  Shield, 
  Users, 
  Stethoscope,
  Building,
  Pill,
  Clock,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockDoctors } from '../data/mockDoctors';
import { locationService } from '../services/locationService';
import LocationAwareSearch from '../components/search/LocationAwareSearch';
import { useAuth } from '../contexts/AuthContext';
import SplitText from '../components/SplitText';
import StarBorder from '../components/StarBorder';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedTestimonialsDemo from '../components/ui/animated-testimonials-demo';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [topDoctors, setTopDoctors] = useState(mockDoctors.slice(0, 3));
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Fatima Alaoui",
      role: "Patient",
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "Sal-lmjarab made it so easy to find a specialist for my mother. The verified reviews helped us choose the right doctor, and booking an appointment was seamless."
    },
    {
      id: 2,
      name: "Dr. Ahmed Bennani",
      role: "Cardiologist",
      image: "https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "As a healthcare provider, this platform has transformed my practice. I've been able to reach more patients and the online appointment system has reduced no-shows significantly."
    },
    {
      id: 3,
      name: "Youssef Tazi",
      role: "Patient",
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "The AI chatbot helped me understand my symptoms and find the right specialist. I was able to book an appointment immediately and get the care I needed."
    }
  ]);

  useEffect(() => {
    const getUserLocation = async () => {
      const location = await locationService.getUserLocation();
      if (location && location.city) {
        setUserLocation(location.city);
      }
    };

    getUserLocation();

    // Select top-rated doctor from 6 different specialties
    const specialties = [
      'Cardiology',
      'Dermatology',
      'General Medicine',
      'Pediatrics',
      'Orthopedics',
      'Gynecology'
    ];
    const selectedDoctors = specialties.map(specialty => {
      return [...mockDoctors]
        .filter(doc => doc.specialty === specialty)
        .sort((a, b) => b.rating - a.rating)[0];
    }).filter(Boolean);
    setTopDoctors(selectedDoctors);
  }, []);

  const handleSearch = (query: string, location: string) => {
    // Navigate to search page with query parameters
    navigate(`/search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If user is logged in, redirect to their role-specific dashboard
  if (user) {
    switch (user.role) {
      case 'patient':
        return <Navigate to="/patient/dashboard" replace />;
      case 'provider':
        return <Navigate to="/provider/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        break;
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SplitText
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                  delay={60}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  onLetterAnimationComplete={() => {}}
              >
                Morocco's #1 Doctor Review<br />Platform
              </SplitText>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Find Morocco's best healthcare professionals — rated by people like you.
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Find the care you need</h2>
              <StarBorder as="div" className="mb-4 max-w-2xl mx-auto" color="cyan" speed="5s">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <LocationAwareSearch 
                    onSearch={handleSearch}
                    centered={true}
                    className="text-white"
                    placeholder="Doctor, condition, procedure"
                    locationPlaceholder="Location"
                  />
                </div>
              </StarBorder>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {[
                  { label: 'Family Medicine', query: 'Family Medicine' },
                  { label: 'Pediatrics', query: 'Pediatrics' },
                  { label: 'Top Hospitals', link: '/top-hospitals' },
                  { label: 'COVID-19', query: 'COVID-19' },
                  { label: 'Dentistry', query: 'Dentistry' },
                  { label: 'Orthopedic Surgery', query: 'Orthopedic Surgery' },
                  { label: '+ More', link: '/search' }
                ].map((cat, idx) =>
                  cat.link ? (
                    <Link
                      key={cat.label}
                      to={cat.link}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      {cat.label}
                    </Link>
                  ) : (
                    <button
                      key={cat.label}
                      onClick={() => handleSearch(cat.query ?? '', '')}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      {cat.label}
                    </button>
                  )
                )}
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/search"
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-primary-600 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Doctors
                </Link>
                <Link
                  to="/top-hospitals"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  <Building className="w-5 h-5 mr-2" />
                  Top Hospitals
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">15,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Verified Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Healthcare Facilities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">1.2M+</div>
              <div className="text-gray-600 dark:text-gray-400">Patient Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">20+</div>
              <div className="text-gray-600 dark:text-gray-400">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Our Rating System Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our comprehensive evaluation system helps you find the best healthcare providers in Morocco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Verified Patient Reviews
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  All reviews come from real patients who have visited the healthcare provider. We verify appointments to ensure authentic feedback.
                </p>
                <Link
                  to="/methodologies"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            </SpotlightCard>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 215, 0, 0.15)">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Comprehensive Rating Criteria
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Providers are rated on multiple factors including bedside manner, wait time, facility cleanliness, and communication quality.
                </p>
                <Link
                  to="/methodologies"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            </SpotlightCard>
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 255, 128, 0.13)">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Credential Verification
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We verify the credentials, licenses, and qualifications of all healthcare providers listed on our platform.
                </p>
                <Link
                  to="/methodologies"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Top Rated Doctors */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Top-Rated Healthcare Providers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Discover Morocco's highest-rated doctors based on verified patient reviews
              </p>
            </div>
            <Link
              to="/search"
              className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>View all providers</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  {doctor.verified && (
                    <div className="absolute top-4 right-4 bg-primary-600 text-white p-1 rounded-full">
                      <Shield className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center space-x-1 text-white">
                      {renderStars(doctor.rating)}
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="text-sm">({doctor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Link to={`/doctor/${doctor.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {doctor.name}
                    </h3>
                  </Link>
                  <p className="text-primary-600 dark:text-primary-400 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{doctor.location.city}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{doctor.experience} years exp.</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.insurance.map((ins, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs"
                      >
                        {ins}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/doctor/${doctor.id}`}
                      className="flex-1 px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-center font-medium transition-colors"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/doctor/${doctor.id}?tab=availability`}
                      className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-center font-medium transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/search"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>View all providers</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from patients and healthcare providers who use our platform
            </p>
          </div>
          <AnimatedTestimonialsDemo small />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Sal-lmjarab?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform offers unique features to help you find the best healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8 text-primary-600" />,
                title: "Verified Reviews",
                description: "All reviews come from verified patients who have actually visited the healthcare provider."
              },
              {
                icon: <Calendar className="w-8 h-8 text-primary-600" />,
                title: "Online Booking",
                description: "Book appointments instantly with your preferred healthcare providers, 24/7."
              },
              {
                icon: <Shield className="w-8 h-8 text-primary-600" />,
                title: "Credential Verification",
                description: "We verify the credentials and qualifications of all healthcare providers."
              },
              {
                icon: <MapPin className="w-8 h-8 text-primary-600" />,
                title: "Location-Based Search",
                description: "Find healthcare providers near you with our location-aware search."
              },
              {
                icon: <MessageCircle className="w-8 h-8 text-primary-600" />,
                title: "AI Health Assistant",
                description: "Get instant answers to your health questions with our AI-powered chatbot."
              },
              {
                icon: <Award className="w-8 h-8 text-primary-600" />,
                title: "Quality Metrics",
                description: "Compare healthcare providers based on multiple quality indicators."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Healthcare Provider?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of Moroccans who find and book quality healthcare every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-primary-600 rounded-lg font-medium transition-colors"
            >
              Find a Doctor
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-medium transition-colors"
            >
              Create an Account
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary-400 border-2 border-primary-600 flex items-center justify-center text-xs font-medium text-white">
                  {i}
                </div>
              ))}
            </div>
            <span className="text-primary-100">Join 500,000+ users today</span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Verified Providers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Rated Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">500,000+ Users</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;