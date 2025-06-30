import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Flag, MessageSquare, CheckCircle, X, AlertTriangle, Filter, Calendar, ArrowUp, ArrowDown, Upload, User, Clock, Shield, Info, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewCategory {
  id: string;
  name: string;
  description: string;
}

interface ReviewData {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  date: string;
  ratings: {
    overall: number;
    waitTime: number;
    staffFriendliness: number;
    communication: number;
    overallExperience: number;
  };
  content: string;
  pros?: string[];
  cons?: string[];
  tips?: string;
  photos?: string[];
  helpful: number;
  helpfulVoters: string[];
  verified: boolean;
  reported: boolean;
  reportReasons?: string[];
  doctorResponse?: {
    content: string;
    date: string;
  };
}

interface PatientReviewSystemProps {
  doctorId: string;
  doctorName: string;
  onReviewSubmitted?: (review: ReviewData) => void;
}

const PatientReviewSystem: React.FC<PatientReviewSystemProps> = ({
  doctorId,
  doctorName,
  onReviewSubmitted
}) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [averageRatings, setAverageRatings] = useState({
    overall: 0,
    waitTime: 0,
    staffFriendliness: 0,
    communication: 0,
    overallExperience: 0
  });
  const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportedReviewId, setReportedReviewId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterVerified, setFilterVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');
  const [reviewFormData, setReviewFormData] = useState({
    overall: 0,
    waitTime: 0,
    staffFriendliness: 0,
    communication: 0,
    overallExperience: 0,
    content: '',
    pros: [''],
    cons: [''],
    tips: ''
  });
  const [formErrors, setFormErrors] = useState({
    overall: false,
    content: false
  });

  // Review categories
  const categories: ReviewCategory[] = [
    { 
      id: 'waitTime', 
      name: 'Wait Times', 
      description: 'Time spent in the waiting room and exam rooms'
    },
    { 
      id: 'staffFriendliness', 
      name: 'Staff Friendliness', 
      description: 'Courtesy and professionalism of all staff members'
    },
    { 
      id: 'communication', 
      name: 'Communication Quality', 
      description: 'Clarity of explanations and instructions'
    },
    { 
      id: 'overallExperience', 
      name: 'Overall Experience', 
      description: 'General satisfaction with the visit'
    }
  ];

  // Mock data for initial reviews
  const mockReviews: ReviewData[] = [
    {
      id: '1',
      doctorId,
      patientId: 'patient-1',
      patientName: 'Fatima M.',
      date: '2025-06-20',
      ratings: {
        overall: 5,
        waitTime: 4,
        staffFriendliness: 5,
        communication: 5,
        overallExperience: 5
      },
      content: `Dr. Bennani was excellent! He took the time to listen to all my concerns and explained everything clearly. The staff was very friendly and professional. I only had to wait about 10 minutes past my appointment time, which is better than most doctors I've seen.`,
      pros: ['Thorough examination', 'Clear explanations', 'Friendly staff'],
      cons: ['Parking was difficult to find'],
      tips: 'Try to book a morning appointment if possible, as the office seems less busy then.',
      helpful: 23,
      helpfulVoters: [],
      verified: true,
      reported: false
    },
    {
      id: '2',
      doctorId,
      patientId: 'patient-2',
      patientName: 'Mohammed K.',
      date: '2025-06-25',
      ratings: {
        overall: 4,
        waitTime: 3,
        staffFriendliness: 4,
        communication: 5,
        overallExperience: 4
      },
      content: 'Very knowledgeable doctor who explained my condition in detail and took time to answer all my questions. The wait time was a bit long (about 30 minutes), but the quality of care made up for it. The reception staff could be a bit more welcoming.',
      pros: ['Knowledgeable', 'Patient', 'Thorough'],
      cons: ['Long wait time', 'Reception staff seemed rushed'],
      helpful: 15,
      helpfulVoters: [],
      verified: true,
      reported: false
    },
    {
      id: '3',
      doctorId,
      patientId: 'patient-3',
      patientName: 'Amina B.',
      date: '2023-12-28',
      ratings: {
        overall: 3,
        waitTime: 2,
        staffFriendliness: 3,
        communication: 4,
        overallExperience: 3
      },
      content: 'The doctor was good and explained things well, but I had to wait over an hour past my appointment time. The facility was clean but the waiting room was very crowded. I might return but would ask for the first appointment of the day.',
      pros: ['Good medical advice', 'Clean facility'],
      cons: ['Very long wait time', 'Crowded waiting room'],
      tips: 'Bring something to read as you might wait a while.',
      helpful: 8,
      helpfulVoters: [],
      verified: false,
      reported: false
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch reviews
    setLoading(true);
    setTimeout(() => {
      setReviews(mockReviews);
      calculateAverageRatings(mockReviews);
      calculateRatingCounts(mockReviews);
      setLoading(false);
    }, 1000);
  }, [doctorId]);

  const calculateAverageRatings = (reviewsData: ReviewData[]) => {
    if (reviewsData.length === 0) {
      setAverageRatings({
        overall: 0,
        waitTime: 0,
        staffFriendliness: 0,
        communication: 0,
        overallExperience: 0
      });
      return;
    }

    const sum = {
      overall: 0,
      waitTime: 0,
      staffFriendliness: 0,
      communication: 0,
      overallExperience: 0
    };

    reviewsData.forEach(review => {
      sum.overall += review.ratings.overall;
      sum.waitTime += review.ratings.waitTime;
      sum.staffFriendliness += review.ratings.staffFriendliness;
      sum.communication += review.ratings.communication;
      sum.overallExperience += review.ratings.overallExperience;
    });

    const count = reviewsData.length;
    setAverageRatings({
      overall: parseFloat((sum.overall / count).toFixed(1)),
      waitTime: parseFloat((sum.waitTime / count).toFixed(1)),
      staffFriendliness: parseFloat((sum.staffFriendliness / count).toFixed(1)),
      communication: parseFloat((sum.communication / count).toFixed(1)),
      overallExperience: parseFloat((sum.overallExperience / count).toFixed(1))
    });
  };

  const calculateRatingCounts = (reviewsData: ReviewData[]) => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    reviewsData.forEach(review => {
      const rating = Math.round(review.ratings.overall);
      if (counts[rating as keyof typeof counts] !== undefined) {
        counts[rating as keyof typeof counts]++;
      }
    });
    
    setRatingCounts(counts);
  };

  const handleRatingChange = (category: string, value: number) => {
    setReviewFormData(prev => ({
      ...prev,
      [category]: value
    }));

    if (category === 'overall') {
      setFormErrors(prev => ({
        ...prev,
        overall: false
      }));
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setReviewFormData(prev => ({
      ...prev,
      content
    }));

    if (content.length >= 50) {
      setFormErrors(prev => ({
        ...prev,
        content: false
      }));
    }
  };

  const handleProChange = (index: number, value: string) => {
    const updatedPros = [...reviewFormData.pros];
    updatedPros[index] = value;
    
    // Add a new empty field if the last field is being filled
    if (index === updatedPros.length - 1 && value.trim() !== '') {
      updatedPros.push('');
    }
    
    // Remove empty fields except the last one
    const filteredPros = updatedPros.filter((pro, i) => 
      pro.trim() !== '' || i === updatedPros.length - 1
    );
    
    setReviewFormData(prev => ({
      ...prev,
      pros: filteredPros
    }));
  };

  const handleConChange = (index: number, value: string) => {
    const updatedCons = [...reviewFormData.cons];
    updatedCons[index] = value;
    
    // Add a new empty field if the last field is being filled
    if (index === updatedCons.length - 1 && value.trim() !== '') {
      updatedCons.push('');
    }
    
    // Remove empty fields except the last one
    const filteredCons = updatedCons.filter((con, i) => 
      con.trim() !== '' || i === updatedCons.length - 1
    );
    
    setReviewFormData(prev => ({
      ...prev,
      cons: filteredCons
    }));
  };

  const handleTipsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewFormData(prev => ({
      ...prev,
      tips: e.target.value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file count
    if (files.length + uploadedPhotos.length > 5) {
      alert('You can upload a maximum of 5 photos');
      return;
    }
    
    // Validate file size
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the 5MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setUploadedPhotos(prev => [...prev, ...files]);
    setPhotoPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removePhoto = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(photoPreviewUrls[index]);
    
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const openPhotoModal = (url: string) => {
    setSelectedPhotoUrl(url);
    setShowPhotoModal(true);
  };

  const validateForm = () => {
    const errors = {
      overall: reviewFormData.overall === 0,
      content: reviewFormData.content.length < 50
    };
    
    setFormErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to submit a review');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Filter out empty pros and cons
      const filteredPros = reviewFormData.pros.filter(pro => pro.trim() !== '');
      const filteredCons = reviewFormData.cons.filter(con => con.trim() !== '');
      
      // Simulate API call to upload photos
      const uploadedPhotoUrls = await Promise.all(
        uploadedPhotos.map(async (photo) => {
          // In a real app, this would upload to a server
          // For now, we'll just use the object URL
          return URL.createObjectURL(photo);
        })
      );
      
      // Create new review
      const newReview: ReviewData = {
        id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        doctorId,
        patientId: user.id,
        patientName: user.name,
        patientAvatar: user.avatar,
        date: new Date().toISOString().split('T')[0],
        ratings: {
          overall: reviewFormData.overall,
          waitTime: reviewFormData.waitTime,
          staffFriendliness: reviewFormData.staffFriendliness,
          communication: reviewFormData.communication,
          overallExperience: reviewFormData.overallExperience
        },
        content: reviewFormData.content,
        pros: filteredPros.length > 0 ? filteredPros : undefined,
        cons: filteredCons.length > 0 ? filteredCons : undefined,
        tips: reviewFormData.tips.trim() || undefined,
        photos: uploadedPhotoUrls.length > 0 ? uploadedPhotoUrls : undefined,
        helpful: 0,
        helpfulVoters: [],
        verified: true, // Assuming the user has a verified appointment
        reported: false
      };
      
      // Add to reviews list
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      
      // Update averages and counts
      calculateAverageRatings(updatedReviews);
      calculateRatingCounts(updatedReviews);
      
      // Reset form
      setReviewFormData({
        overall: 0,
        waitTime: 0,
        staffFriendliness: 0,
        communication: 0,
        overallExperience: 0,
        content: '',
        pros: [''],
        cons: [''],
        tips: ''
      });
      setUploadedPhotos([]);
      setPhotoPreviewUrls([]);
      
      // Close form
      setShowReviewForm(false);
      
      // Callback
      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }
      
      alert('Thank you for your review! It has been submitted successfully.');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkHelpful = (reviewId: string) => {
    if (!user) {
      alert('Please log in to mark reviews as helpful');
      return;
    }
    
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        // Check if user has already voted
        if (review.helpfulVoters.includes(user.id)) {
          return review;
        }
        
        return {
          ...review,
          helpful: review.helpful + 1,
          helpfulVoters: [...review.helpfulVoters, user.id]
        };
      }
      return review;
    }));
  };

  const handleReportReview = (reviewId: string) => {
    if (!user) {
      alert('Please log in to report reviews');
      return;
    }
    
    setReportedReviewId(reviewId);
    setShowReportForm(true);
  };

  const submitReport = () => {
    if (!reportReason) {
      alert('Please select a reason for reporting this review');
      return;
    }
    
    setReviews(prev => prev.map(review => {
      if (review.id === reportedReviewId) {
        return {
          ...review,
          reported: true,
          reportReasons: [...(review.reportReasons || []), reportReason]
        };
      }
      return review;
    }));
    
    setReportedReviewId(null);
    setReportReason('');
    setReportDetails('');
    setShowReportForm(false);
    
    alert('Thank you for your report. Our team will review this content.');
  };

  const getSortedReviews = () => {
    let filteredReviews = [...reviews];
    
    // Apply rating filter
    if (filterRating !== null) {
      filteredReviews = filteredReviews.filter(review => 
        Math.round(review.ratings.overall) === filterRating
      );
    }
    
    // Apply verification filter
    if (filterVerified !== null) {
      filteredReviews = filteredReviews.filter(review => 
        review.verified === filterVerified
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'recent':
        return filteredReviews.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'helpful':
        return filteredReviews.sort((a, b) => b.helpful - a.helpful);
      case 'highest':
        return filteredReviews.sort((a, b) => b.ratings.overall - a.ratings.overall);
      case 'lowest':
        return filteredReviews.sort((a, b) => a.ratings.overall - b.ratings.overall);
      default:
        return filteredReviews;
    }
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
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  const renderRatingBreakdown = () => (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = ratingCounts[stars] || 0;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        
        return (
          <div key={stars} className="flex items-center space-x-2 text-sm">
            <span className="w-8">{stars}</span>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-8 text-gray-600 dark:text-gray-400">{count}</span>
          </div>
        );
      })}
    </div>
  );

  const renderCategoryRatings = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {categories.map(category => (
        <div key={category.id} className="flex flex-col">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {averageRatings[category.id as keyof typeof averageRatings]}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full"
              style={{ 
                width: `${(averageRatings[category.id as keyof typeof averageRatings] / 5) * 100}%` 
              }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {averageRatings.overall}
              </span>
              {renderStars(averageRatings.overall, 'lg')}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Based on {reviews.length} patient {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          
          <div className="flex-1 max-w-md">
            {renderRatingBreakdown()}
          </div>
        </div>

        {/* Category Ratings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Rating by Category
          </h3>
          {renderCategoryRatings()}
        </div>

        {/* Write Review Button */}
        {user && !showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Star className="w-5 h-5" />
            <span>Write a Review</span>
          </button>
        )}
        
        {!user && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-yellow-800 dark:text-yellow-300">
                Please <a href="/login" className="underline font-medium">log in</a> to write a review
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Write a Review for {doctorName}
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {renderStars(reviewFormData.overall, 'lg', true, (value) => handleRatingChange('overall', value))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {reviewFormData.overall > 0 && `${reviewFormData.overall} star${reviewFormData.overall !== 1 ? 's' : ''}`}
                  </span>
                </div>
                {formErrors.overall && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    Please select an overall rating
                  </p>
                )}
              </div>

              {/* Category Ratings */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
                  Rate Your Experience by Category
                </h4>
                
                {categories.map(category => (
                  <div key={category.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category.name} *
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{category.description}</p>
                    </div>
                    <div className="flex items-center">
                      {renderStars(
                        reviewFormData[category.id as keyof typeof reviewFormData] as number,
                        'md',
                        true,
                        (value) => handleRatingChange(category.id, value)
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={reviewFormData.content}
                  onChange={handleContentChange}
                  placeholder="Share your experience with this doctor. What went well? What could be improved? (Minimum 50 characters)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4}
                  minLength={50}
                  required
                />
                <div className="flex justify-between mt-1">
                  <p className={`text-xs ${formErrors.content ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    Minimum 50 characters required
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {reviewFormData.content.length} / 1000 characters
                  </p>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div>
                  <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pros
                  </label>
                  <div className="space-y-2">
                    {reviewFormData.pros.map((pro, index) => (
                      <div key={`pro-${index}`} className="flex items-center">
                        <input
                          type="text"
                          value={pro}
                          onChange={(e) => handleProChange(index, e.target.value)}
                          placeholder={`Pro #${index + 1}`}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cons */}
                <div>
                  <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cons
                  </label>
                  <div className="space-y-2">
                    {reviewFormData.cons.map((con, index) => (
                      <div key={`con-${index}`} className="flex items-center">
                        <input
                          type="text"
                          value={con}
                          onChange={(e) => handleConChange(index, e.target.value)}
                          placeholder={`Con #${index + 1}`}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tips for Other Patients */}
              <div>
                <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tips for Other Patients (Optional)
                </label>
                <textarea
                  value={reviewFormData.tips}
                  onChange={handleTipsChange}
                  placeholder="Share helpful tips for other patients visiting this doctor"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {photoPreviewUrls.map((url, index) => (
                      <div key={index} className="relative w-24 h-24">
                        <img
                          src={url}
                          alt={`Upload preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg cursor-pointer"
                          onClick={() => openPhotoModal(url)}
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          aria-label="Remove photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {photoPreviewUrls.length < 5 && (
                      <label className="w-24 h-24 flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          multiple={photoPreviewUrls.length < 4}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Maximum 5 photos (5MB each) • Supported formats: JPG, PNG
                  </p>
                </div>
              </div>

              {/* Review Guidelines */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Review Guidelines
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
                  <li>Be honest and specific about your experience</li>
                  <li>Focus on your medical experience and interactions</li>
                  <li>Do not include personal health information</li>
                  <li>Avoid offensive or inappropriate language</li>
                  <li>Do not mention other patients or staff by name</li>
                </ul>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Submit Review</span>
                    </>
                  )}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Patient Reviews ({reviews.length})
          </h3>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => document.getElementById('filter-dropdown')?.classList.toggle('hidden')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filter Reviews</span>
              {(filterRating !== null || filterVerified !== null) && (
                <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {(filterRating !== null ? 1 : 0) + (filterVerified !== null ? 1 : 0)}
                </span>
              )}
            </button>
            
            {/* Filter Dropdown */}
            <div id="filter-dropdown" className="hidden absolute right-0 mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10 w-64">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Rating</h4>
                  <div className="space-y-2">
                    {[null, 5, 4, 3, 2, 1].map((rating) => (
                      <label key={`rating-${rating || 'all'}`} className="flex items-center">
                        <input
                          type="radio"
                          name="rating-filter"
                          checked={filterRating === rating}
                          onChange={() => setFilterRating(rating)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {rating === null ? 'All Ratings' : `${rating} Star${rating !== 1 ? 's' : ''}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verification</h4>
                  <div className="space-y-2">
                    {[
                      { value: null, label: 'All Reviews' },
                      { value: true, label: 'Verified Patients Only' },
                      { value: false, label: 'Unverified Reviews Only' }
                    ].map((option) => (
                      <label key={`verified-${option.value === null ? 'all' : option.value}`} className="flex items-center">
                        <input
                          type="radio"
                          name="verified-filter"
                          checked={filterVerified === option.value}
                          onChange={() => setFilterVerified(option.value)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setFilterRating(null);
                    setFilterVerified(null);
                    document.getElementById('filter-dropdown')?.classList.add('hidden');
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {getSortedReviews().length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No reviews match your current filters. Try adjusting your filters or be the first to share your experience!
          </div>
        ) : (
          <div className="space-y-6">
            {getSortedReviews().map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ${
                  review.verified ? 'border-l-4 border-green-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {review.patientAvatar ? (
                      <img
                        src={review.patientAvatar}
                        alt={review.patientName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    )}
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
                        {renderStars(review.ratings.overall, 'sm')}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMarkHelpful(review.id)}
                      disabled={user && review.helpfulVoters.includes(user.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition-colors ${
                        user && review.helpfulVoters.includes(user.id)
                          ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                      aria-label="Mark as helpful"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    
                    <button
                      onClick={() => handleReportReview(review.id)}
                      disabled={review.reported}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm transition-colors ${
                        review.reported
                          ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                      aria-label="Report review"
                    >
                      <Flag className="w-4 h-4" />
                      <span>{review.reported ? 'Reported' : 'Report'}</span>
                    </button>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                  {review.content}
                </p>

                {/* Pros and Cons */}
                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {review.pros && review.pros.length > 0 && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Pros</h4>
                        <ul className="list-disc pl-5 space-y-1 text-green-700 dark:text-green-400">
                          {review.pros.map((pro, index) => (
                            <li key={index}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {review.cons && review.cons.length > 0 && (
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Cons</h4>
                        <ul className="list-disc pl-5 space-y-1 text-red-700 dark:text-red-400">
                          {review.cons.map((con, index) => (
                            <li key={index}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Tips */}
                {review.tips && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Tips for Other Patients</h4>
                    <p className="text-blue-700 dark:text-blue-400">{review.tips}</p>
                  </div>
                )}

                {/* Photos */}
                {review.photos && review.photos.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Photos</h4>
                    <div className="flex flex-wrap gap-2">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                          onClick={() => openPhotoModal(photo)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  {categories.map(category => (
                    <div key={category.id}>
                      <span className="text-gray-600 dark:text-gray-400">{category.name}:</span>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(review.ratings[category.id as keyof typeof review.ratings], 'sm')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Doctor Response */}
                {review.doctorResponse && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Stethoscope className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <h4 className="font-medium text-gray-900 dark:text-white">Doctor's Response</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(review.doctorResponse.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {review.doctorResponse.content}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Report Review Modal */}
      <AnimatePresence>
        {showReportForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Report Review
                  </h3>
                  <button
                    onClick={() => setShowReportForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Please select a reason for reporting this review:
                  </p>
                  
                  <div className="space-y-2">
                    {[
                      { value: 'inappropriate', label: 'Inappropriate content' },
                      { value: 'spam', label: 'Spam or advertising' },
                      { value: 'off-topic', label: 'Off-topic or irrelevant' },
                      { value: 'conflict', label: 'Conflict of interest' },
                      { value: 'fake', label: 'Fake or fraudulent review' },
                      { value: 'other', label: 'Other reason' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="report-reason"
                          value={option.value}
                          checked={reportReason === option.value}
                          onChange={() => setReportReason(option.value)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  
                  {reportReason === 'other' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Please provide details:
                      </label>
                      <textarea
                        value={reportDetails}
                        onChange={(e) => setReportDetails(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        required={reportReason === 'other'}
                      />
                    </div>
                  )}
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        Our team will review this report and take appropriate action if the review violates our guidelines.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={submitReport}
                      disabled={!reportReason || (reportReason === 'other' && !reportDetails)}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Submit Report
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReportForm(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Photo Modal */}
      <AnimatePresence>
        {showPhotoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedPhotoUrl}
                alt="Review photo"
                className="max-w-full max-h-[80vh] mx-auto"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientReviewSystem;