import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Flag, MessageSquare, CheckCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ratingService, DoctorRating, RatingCriteria } from '../../services/ratingService';
import { useAuth } from '../../contexts/AuthContext';

interface RatingSystemProps {
  doctorId: string;
  appointmentId?: string;
  showForm?: boolean;
  onRatingSubmitted?: (rating: DoctorRating) => void;
}

interface RatingFormData {
  overall: number;
  professionalism: number;
  waitTime: number;
  communication: number;
  satisfaction: number;
  comment: string;
}

const RatingSystem: React.FC<RatingSystemProps> = ({
  doctorId,
  appointmentId,
  showForm = false,
  onRatingSubmitted
}) => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState<DoctorRating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [ratingBreakdown, setRatingBreakdown] = useState<{ [key: number]: number }>({});
  const [showRatingForm, setShowRatingForm] = useState(showForm);
  const [formData, setFormData] = useState<RatingFormData>({
    overall: 0,
    professionalism: 0,
    waitTime: 0,
    communication: 0,
    satisfaction: 0,
    comment: ''
  });
  const [criteria, setCriteria] = useState<RatingCriteria | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRatings();
    loadCriteria();
  }, [doctorId]);

  const loadRatings = async () => {
    try {
      const result = await ratingService.getDoctorRatings(doctorId, 10, 0);
      setRatings(result.ratings);
      setAverageRating(result.averageRating);
      setTotalCount(result.totalCount);
      setRatingBreakdown(result.ratingBreakdown);
    } catch (error) {
      console.error('Failed to load ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCriteria = () => {
    const ratingCriteria = ratingService.getRatingCriteria();
    setCriteria(ratingCriteria);
  };

  const handleRatingChange = (criterion: keyof RatingFormData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [criterion]: value
    }));
  };

  const handleSubmitRating = async () => {
    if (!user || !appointmentId) return;

    setSubmitting(true);
    try {
      const newRating = await ratingService.submitRating({
        doctorId,
        patientId: user.id,
        appointmentId,
        rating: {
          overall: formData.overall,
          professionalism: formData.professionalism,
          waitTime: formData.waitTime,
          communication: formData.communication,
          satisfaction: formData.satisfaction
        },
        comment: formData.comment,
        verified: true
      });

      setRatings(prev => [newRating, ...prev]);
      setShowRatingForm(false);
      setFormData({
        overall: 0,
        professionalism: 0,
        waitTime: 0,
        communication: 0,
        satisfaction: 0,
        comment: ''
      });

      if (onRatingSubmitted) {
        onRatingSubmitted(newRating);
      }

      // Reload ratings to get updated averages
      await loadRatings();
    } catch (error) {
      console.error('Failed to submit rating:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkHelpful = async (ratingId: string) => {
    if (!user) return;
    
    try {
      await ratingService.markHelpful(ratingId, user.id);
      // Update the rating in the list
      setRatings(prev => prev.map(rating => 
        rating.id === ratingId 
          ? { ...rating, helpful: rating.helpful + 1 }
          : rating
      ));
    } catch (error) {
      console.error('Failed to mark as helpful:', error);
    }
  };

  const handleReportRating = async (ratingId: string, reason: string) => {
    if (!user) return;
    
    try {
      await ratingService.reportRating(ratingId, reason, user.id);
      // Update the rating in the list
      setRatings(prev => prev.map(rating => 
        rating.id === ratingId 
          ? { ...rating, reported: true }
          : rating
      ));
    } catch (error) {
      console.error('Failed to report rating:', error);
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
        const count = ratingBreakdown[stars] || 0;
        const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
        
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {averageRating.toFixed(1)}
              </span>
              {renderStars(averageRating, 'lg')}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Based on {totalCount} patient reviews
            </p>
          </div>
          
          <div className="flex-1 max-w-md">
            {renderRatingBreakdown()}
          </div>
        </div>

        {/* Write Review Button */}
        {user && appointmentId && !showRatingForm && (
          <button
            onClick={() => setShowRatingForm(true)}
            className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Star className="w-5 h-5" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      {/* Rating Form */}
      <AnimatePresence>
        {showRatingForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Rate Your Experience
            </h3>

            <div className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center space-x-2">
                  {renderStars(formData.overall, 'lg', true, (value) => handleRatingChange('overall', value))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {formData.overall > 0 && `${formData.overall} star${formData.overall !== 1 ? 's' : ''}`}
                  </span>
                </div>
              </div>

              {/* Detailed Ratings */}
              {criteria && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(criteria).map(([key, description]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{description}</p>
                      <div className="flex items-center space-x-2">
                        {renderStars(
                          formData[key as keyof RatingFormData] as number,
                          'md',
                          true,
                          (value) => handleRatingChange(key as keyof RatingFormData, value)
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Review (Optional)
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience to help other patients..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleSubmitRating}
                  disabled={formData.overall === 0 || submitting}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  onClick={() => setShowRatingForm(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Patient Reviews ({totalCount})
        </h3>

        {ratings.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <motion.div
                key={rating.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Anonymous Patient
                        </span>
                        {rating.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(rating.rating.overall, 'sm')}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(rating.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Professionalism:</span>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(rating.rating.professionalism, 'sm')}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Wait Time:</span>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(rating.rating.waitTime, 'sm')}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Communication:</span>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(rating.rating.communication, 'sm')}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Satisfaction:</span>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(rating.rating.satisfaction, 'sm')}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                {rating.comment && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {rating.comment}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={() => handleMarkHelpful(rating.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({rating.helpful})</span>
                  </button>
                  
                  <button
                    onClick={() => handleReportRating(rating.id, 'inappropriate')}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingSystem;