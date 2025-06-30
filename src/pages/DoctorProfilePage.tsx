import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Globe, Award, Shield, Heart, Calendar, MessageCircle, Share2, ChevronLeft, Users, CheckCircle, X, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import RatingSystem from '../components/rating/RatingSystem';
import AppointmentScheduler from '../components/appointment/AppointmentScheduler';
import MessagingInterface from '../components/messaging/MessagingInterface';
import SharingButtons from '../components/sharing/SharingButtons';
import ReviewLink from '../components/reviews/ReviewLink';
import { ShareableContent } from '../services/sharingService';
import { mockDoctors, mockReviews, generateTimeSlots, Doctor, Review, TimeSlot } from '../data/mockDoctors';

const DoctorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { t } = useLanguage();

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
    visitDate: '',
    visitReason: '',
    wouldRecommend: true
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundDoctor = mockDoctors.find(d => d.id === id);
        const doctorReviews = mockReviews[id] || [];
        const doctorTimeSlots = generateTimeSlots(id);
        
        setDoctor(foundDoctor || null);
        setReviews(doctorReviews);
        setTimeSlots(doctorTimeSlots);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to submit a review');
      return;
    }

    if (reviewForm.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!reviewForm.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    // Create new review
    const newReview: Review = {
      id: `review_${Date.now()}`,
      patientName: user.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      helpful: 0,
      aspects: {
        professionalism: reviewForm.rating,
        waitTime: reviewForm.rating,
        communication: reviewForm.rating,
        satisfaction: reviewForm.rating
      }
    };

    // Add to reviews list
    setReviews(prev => [newReview, ...prev]);
    
    // Reset form
    setReviewForm({
      rating: 0,
      comment: '',
      visitDate: '',
      visitReason: '',
      wouldRecommend: true
    });
    
    setShowReviewForm(false);
    alert('Thank you for your review! It has been submitted successfully.');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getInsuranceColor = (insurance: string) => {
    switch (insurance) {
      case 'CNSS':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'RAMED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Private':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getShareableContent = (): ShareableContent => ({
    type: 'doctor',
    id: doctor?.id || '',
    title: doctor?.name || '',
    description: `${doctor?.specialty} with ${doctor?.experience} years of experience`,
    imageUrl: doctor?.image,
    url: window.location.href,
    metadata: {
      rating: doctor?.rating,
      specialty: doctor?.specialty,
      location: doctor?.location.city,
      phone: doctor?.location.address,
      email: `${doctor?.name.toLowerCase().replace(/\s+/g, '.')}@sal-lmjarab.ma`
    }
  });

  const getAvailableSlots = () => {
    return timeSlots.filter(slot => slot.available).slice(0, 10);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md', interactive: boolean = false, onChange?: (value: number) => void) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(star)}
            className={`${sizeClasses[size]} ${
              interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
            } ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
            }`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
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

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor not found</h1>
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

        {/* Doctor Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg object-cover"
                  />
                  {doctor.verified && (
                    <div className="absolute -top-2 -right-2 bg-primary-500 text-white p-2 rounded-full">
                      <Shield className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {doctor.name}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">{doctor.specialty}</p>
                    
                    {/* Subspecialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.subspecialties.map((sub, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center space-x-1">
                        {renderStars(doctor.rating)}
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {doctor.rating}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          ({doctor.reviewCount} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {doctor.experience} years experience
                        </span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.badges.map((badge, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                        >
                          <Award className="w-4 h-4 mr-1" />
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Languages: </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {doctor.languages.join(', ')}
                      </span>
                    </div>

                    {/* Insurance */}
                    <div className="flex flex-wrap gap-2">
                      {doctor.insurance.map((ins, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getInsuranceColor(ins)}`}
                        >
                          {ins}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Side Info */}
                  <div className="lg:w-80 mt-6 lg:mt-0">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {doctor.fees.consultation} {doctor.fees.currency}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Consultation fee
                        </div>
                        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">
                          {doctor.fees.followUp} {doctor.fees.currency}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Follow-up fee
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {doctor.location.address}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Next: {formatDate(doctor.availability.nextAvailable)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {getAvailableSlots().length} slots available this week
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {doctor.availability.acceptingNew ? (
                          <button 
                            onClick={() => setShowAppointmentScheduler(true)}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                          >
                            <Calendar className="w-5 h-5" />
                            <span>Book Appointment</span>
                          </button>
                        ) : (
                          <button disabled className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed">
                            Not Accepting New Patients
                          </button>
                        )}
                        
                        <button 
                          onClick={() => setShowMessaging(true)}
                          className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>Send Message</span>
                        </button>

                        {/* Write Review Button */}
                        {user && (
                          <ReviewLink
                            doctorId={doctor.id}
                            doctorName={doctor.name}
                            variant="button"
                            size="md"
                          >
                            Write a Review
                          </ReviewLink>
                        )}
                        
                        {/* Sharing Component */}
                        <SharingButtons content={getShareableContent()} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'availability', label: 'Availability' },
                { id: 'contact', label: 'Contact & Location' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
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
                {/* Biography */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About Dr. {doctor.name.split(' ').pop()}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {doctor.biography}
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education & Training</h3>
                  <ul className="space-y-3">
                    {doctor.education.map((edu, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Certifications</h3>
                  <ul className="space-y-3">
                    {doctor.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Award className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hospital Affiliations */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hospital Affiliations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {doctor.hospitalAffiliations.map((hospital, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Heart className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-600 dark:text-gray-400">{hospital}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {doctor.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditions Treated */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Conditions Treated</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {doctor.conditions.map((condition, index) => (
                      <div key={index} className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                        <span className="text-sm text-blue-700 dark:text-blue-300">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Patient Reviews ({reviews.length})</h3>
                  {user && (
                    <ReviewLink
                      doctorId={doctor.id}
                      doctorName={doctor.name}
                      variant="button"
                      size="md"
                    >
                      Write a Review
                    </ReviewLink>
                  )}
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No reviews yet. Be the first to share your experience!
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
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
                                {renderStars(review.rating, 'sm')}
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {review.helpful} helpful
                          </div>
                        </div>

                        {/* Detailed Ratings */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Professionalism:</span>
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(review.aspects.professionalism, 'sm')}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Wait Time:</span>
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(review.aspects.waitTime, 'sm')}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Communication:</span>
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(review.aspects.communication, 'sm')}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Satisfaction:</span>
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(review.aspects.satisfaction, 'sm')}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Available Appointment Slots</h3>
                
                {/* Working Hours */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Working Hours</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                    {Object.entries(doctor.workingHours).map(([day, hours], index) => (
                      <div key={index} className="flex justify-between py-3 px-4 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <span className="font-medium text-gray-900 dark:text-white">{day}</span>
                        <span className={`${
                          hours.available 
                            ? 'text-gray-600 dark:text-gray-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {hours.available ? `${hours.start} - ${hours.end}` : 'Closed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Slots Preview */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Next Available Slots ({getAvailableSlots().length} available)
                  </h4>
                  
                  {getAvailableSlots().length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {getAvailableSlots().map((slot) => (
                        <div key={slot.id} className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                          <div className="font-medium text-green-800 dark:text-green-300">
                            {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="text-sm text-green-600 dark:text-green-400">
                            {slot.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No available slots in the next 14 days. Please check back later or contact the office.
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setShowAppointmentScheduler(true)}
                  className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Available Times & Book
                </button>
              </div>
            )}

            {activeTab === 'contact' && (
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
                              <p className="font-medium text-gray-900 dark:text-white">{doctor.name}</p>
                              <p className="text-gray-600 dark:text-gray-400">{doctor.location.address}</p>
                              <p className="text-gray-600 dark:text-gray-400">{doctor.location.city}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-primary-500" />
                            <span className="text-gray-600 dark:text-gray-400">+212 522 123 456</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-primary-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {doctor.name.toLowerCase().replace(/\s+/g, '.')}@sal-lmjarab.ma
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Response Time</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-300">
                      Dr. {doctor.name.split(' ').pop()} typically responds to messages within {doctor.availability.responseTime} hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Write a Review for {doctor.name}
                  </h2>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  {/* Overall Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Overall Rating *
                    </label>
                    <div className="flex items-center space-x-2">
                      {renderStars(reviewForm.rating, 'lg', true, (rating) => 
                        setReviewForm(prev => ({ ...prev, rating }))
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        {reviewForm.rating > 0 && `${reviewForm.rating} star${reviewForm.rating !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  {/* Visit Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Visit Date
                    </label>
                    <input
                      type="date"
                      value={reviewForm.visitDate}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, visitDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Visit Reason */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reason for Visit
                    </label>
                    <input
                      type="text"
                      value={reviewForm.visitReason}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, visitReason: e.target.value }))}
                      placeholder="e.g., Regular checkup, consultation, treatment"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your experience with this doctor. What went well? What could be improved?"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Would Recommend */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reviewForm.wouldRecommend}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, wouldRecommend: e.target.checked }))}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        I would recommend this doctor to others
                      </span>
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Scheduler Modal */}
        {showAppointmentScheduler && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Book Appointment with {doctor.name}
                  </h2>
                  <button
                    onClick={() => setShowAppointmentScheduler(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <AppointmentScheduler
                  doctorId={doctor.id}
                  doctorName={doctor.name}
                  doctorSpecialty={doctor.specialty}
                  consultationFee={doctor.fees.consultation}
                  timeSlots={timeSlots}
                  onAppointmentBooked={() => setShowAppointmentScheduler(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Messaging Modal */}
        {showMessaging && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Message {doctor.name}
                  </h2>
                  <button
                    onClick={() => setShowMessaging(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <MessagingInterface
                  recipientId={doctor.id}
                  recipientName={doctor.name}
                  recipientType="doctor"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfilePage;