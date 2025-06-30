import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, Camera, X, CheckCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  categories: {
    waitTime: number;
    staffFriendliness: number;
    communication: number;
    overallExperience: number;
  };
  photos?: string[];
}

interface ReviewFormData {
  rating: number;
  comment: string;
  categories: {
    waitTime: number;
    staffFriendliness: number;
    communication: number;
    overallExperience: number;
  };
  photos: File[];
}

const ReviewSystem: React.FC<{ providerId: string; providerName: string }> = ({ 
  providerId, 
  providerName 
}) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      patientName: 'Fatima M.',
      rating: 5,
      comment: 'Excellent service and very professional staff. The doctor took time to explain everything clearly.',
      date: '2025-06-20',
      verified: true,
      helpful: 12,
      categories: {
        waitTime: 4,
        staffFriendliness: 5,
        communication: 5,
        overallExperience: 5
      },
      photos: ['https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400']
    }
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
    categories: {
      waitTime: 0,
      staffFriendliness: 0,
      communication: 0,
      overallExperience: 0
    },
    photos: []
  });

  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');

  const categoryLabels = {
    waitTime: 'Wait Times',
    staffFriendliness: 'Staff Friendliness',
    communication: 'Communication Quality',
    overallExperience: 'Overall Experience'
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (reviewForm.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!reviewForm.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      patientName: 'Anonymous Patient',
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      helpful: 0,
      categories: reviewForm.categories,
      photos: reviewForm.photos.map(file => URL.createObjectURL(file))
    };

    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
    setReviewForm({
      rating: 0,
      comment: '',
      categories: {
        waitTime: 0,
        staffFriendliness: 0,
        communication: 0,
        overallExperience: 0
      },
      photos: []
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (reviewForm.photos.length + files.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }
    setReviewForm(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (index: number) => {
    setReviewForm(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const filteredAndSortedReviews = reviews
    .filter(review => filterBy === 'all' || review.rating === parseInt(filterBy))
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {averageRating.toFixed(1)}
              </span>
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Based on {reviews.length} patient reviews
            </p>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2 text-sm">
                  <span className="w-8">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-gray-600 dark:text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowReviewForm(true)}
          className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Star className="w-5 h-5" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
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
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Ratings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(review.categories).map(([category, rating]) => (
                <div key={category} className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </div>
                  <div className="flex justify-center">
                    {renderStars(rating)}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>

            {/* Photos */}
            {review.photos && review.photos.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Write a Review for {providerName}
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
                    {renderStars(reviewForm.rating, true, (rating) => 
                      setReviewForm(prev => ({ ...prev, rating }))
                    )}
                  </div>

                  {/* Category Ratings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Rate Specific Categories
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(categoryLabels).map(([category, label]) => (
                        <div key={category}>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</div>
                          {renderStars(
                            reviewForm.categories[category as keyof typeof reviewForm.categories],
                            true,
                            (rating) => setReviewForm(prev => ({
                              ...prev,
                              categories: { ...prev.categories, [category]: rating }
                            }))
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your experience..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Add Photos (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Camera className="w-5 h-5" />
                        <span>Add Photos</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-sm text-gray-500">Max 5 photos</span>
                    </div>
                    
                    {reviewForm.photos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {reviewForm.photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Upload ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewSystem;