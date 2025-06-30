import React, { useState, useEffect } from 'react';
import { Flag, CheckCircle, X, AlertTriangle, Eye, Filter, Search, User, Star, Calendar, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  reportDetails?: string;
  status: 'pending' | 'approved' | 'rejected';
  moderationNotes?: string;
  doctorResponse?: {
    content: string;
    date: string;
  };
}

interface ReviewModerationProps {
  doctorId?: string;
  isAdmin?: boolean;
}

const ReviewModeration: React.FC<ReviewModerationProps> = ({ 
  doctorId,
  isAdmin = false
}) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewData[]>([]);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [moderationNote, setModerationNote] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [loading, setLoading] = useState(true);

  // Mock data for reported/flagged reviews
  const mockReviews: ReviewData[] = [
    {
      id: '1',
      doctorId: doctorId || 'doctor-1',
      patientId: 'patient-1',
      patientName: 'Fatima M.',
      date: '2025-06-20',
      ratings: {
        overall: 1,
        waitTime: 1,
        staffFriendliness: 1,
        communication: 1,
        overallExperience: 1
      },
      content: 'This doctor was terrible! The staff was rude and I waited for over 2 hours. I would never recommend this place to anyone. Complete waste of time and money.',
      pros: [],
      cons: ['Extremely long wait', 'Rude staff', 'Didn\'t listen to concerns'],
      helpful: 2,
      helpfulVoters: [],
      verified: true,
      reported: true,
      reportReasons: ['inappropriate'],
      status: 'pending'
    },
    {
      id: '2',
      doctorId: doctorId || 'doctor-1',
      patientId: 'patient-2',
      patientName: 'Mohammed K.',
      date: '2025-06-25',
      ratings: {
        overall: 5,
        waitTime: 5,
        staffFriendliness: 5,
        communication: 5,
        overallExperience: 5
      },
      content: 'Best doctor ever! No wait time at all and the staff treated me like family. Dr. Ahmed is amazing and solved all my health problems immediately. I recommend everyone to visit this clinic!',
      pros: ['No wait time', 'Amazing staff', 'Miracle worker'],
      cons: [],
      helpful: 15,
      helpfulVoters: [],
      verified: false,
      reported: true,
      reportReasons: ['fake'],
      status: 'pending'
    },
    {
      id: '3',
      doctorId: doctorId || 'doctor-2',
      patientId: 'patient-3',
      patientName: 'Amina B.',
      date: '2023-12-28',
      ratings: {
        overall: 2,
        waitTime: 1,
        staffFriendliness: 2,
        communication: 3,
        overallExperience: 2
      },
      content: 'Visit our pharmacy at www.cheapmeds.com for the best prices on all medications! 50% off your first order with code DISCOUNT50.',
      pros: ['Great discounts', 'Fast shipping'],
      cons: [],
      helpful: 0,
      helpfulVoters: [],
      verified: false,
      reported: true,
      reportReasons: ['spam'],
      status: 'pending'
    },
    {
      id: '4',
      doctorId: doctorId || 'doctor-1',
      patientId: 'patient-4',
      patientName: 'Hassan T.',
      date: '2023-12-20',
      ratings: {
        overall: 3,
        waitTime: 2,
        staffFriendliness: 3,
        communication: 4,
        overallExperience: 3
      },
      content: 'The doctor was okay but the nurse Samira was very unprofessional and made inappropriate comments about my condition. The receptionist Karim was on his phone the whole time and ignored patients.',
      pros: ['Doctor was knowledgeable'],
      cons: ['Unprofessional staff', 'Long wait time'],
      helpful: 5,
      helpfulVoters: [],
      verified: true,
      reported: true,
      reportReasons: ['inappropriate'],
      reportDetails: 'Names specific staff members',
      status: 'pending'
    },
    {
      id: '5',
      doctorId: doctorId || 'doctor-3',
      patientId: 'patient-5',
      patientName: 'Youssef M.',
      date: '2025-06-05',
      ratings: {
        overall: 1,
        waitTime: 1,
        staffFriendliness: 1,
        communication: 1,
        overallExperience: 1
      },
      content: 'This review contains inappropriate content that has been automatically flagged by our system.',
      pros: [],
      cons: ['Terrible experience'],
      helpful: 0,
      helpfulVoters: [],
      verified: false,
      reported: true,
      reportReasons: ['inappropriate'],
      status: 'rejected',
      moderationNotes: 'Review contained profanity and personal attacks'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch reported reviews
    setLoading(true);
    setTimeout(() => {
      // If doctorId is provided, filter reviews for that doctor
      const relevantReviews = doctorId 
        ? mockReviews.filter(review => review.doctorId === doctorId)
        : mockReviews;
      
      setReviews(relevantReviews);
      setFilteredReviews(relevantReviews);
      setLoading(false);
    }, 1000);
  }, [doctorId]);

  useEffect(() => {
    // Apply filters when search query or status filter changes
    let filtered = [...reviews];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(review => 
        review.patientName.toLowerCase().includes(query) ||
        review.content.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(review => review.status === statusFilter);
    }
    
    setFilteredReviews(filtered);
  }, [reviews, searchQuery, statusFilter]);

  const handleApproveReview = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'approved', moderationNotes: moderationNote || undefined }
        : review
    ));
    
    setSelectedReview(null);
    setModerationNote('');
  };

  const handleRejectReview = (reviewId: string) => {
    if (!moderationNote) {
      alert('Please provide a reason for rejecting this review');
      return;
    }
    
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: 'rejected', moderationNotes: moderationNote }
        : review
    ));
    
    setSelectedReview(null);
    setModerationNote('');
  };

  const handleRespondToReview = (reviewId: string) => {
    if (!responseContent) {
      alert('Please enter a response');
      return;
    }
    
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            doctorResponse: {
              content: responseContent,
              date: new Date().toISOString().split('T')[0]
            }
          }
        : review
    ));
    
    setSelectedReview(null);
    setResponseContent('');
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-xs font-medium">
            Pending Review
          </span>
        );
      case 'approved':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-medium">
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-xs font-medium">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isAdmin ? 'Review Moderation Queue' : 'Reported Reviews'}
        </h2>
        
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No reviews to moderate
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery || statusFilter !== 'all'
              ? 'No reviews match your current filters. Try adjusting your search criteria.'
              : 'There are currently no reviews that require moderation.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border-l-4 ${
                review.status === 'pending' 
                  ? 'border-yellow-500' 
                  : review.status === 'approved'
                  ? 'border-green-500'
                  : 'border-red-500'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
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
                            Verified
                          </span>
                        )}
                        {getStatusBadge(review.status)}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.ratings.overall)}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-xs font-medium flex items-center">
                      <Flag className="w-3 h-3 mr-1" />
                      <span>Reported</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {review.content}
                  </p>
                  
                  {/* Report Reasons */}
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mt-3">
                    <h4 className="font-medium text-red-800 dark:text-red-300 text-sm flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Reported for:
                    </h4>
                    <ul className="mt-1 text-sm text-red-700 dark:text-red-400">
                      {review.reportReasons?.map((reason, index) => (
                        <li key={index} className="capitalize">{reason}</li>
                      ))}
                      {review.reportDetails && (
                        <li className="mt-1 italic">"{review.reportDetails}"</li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {review.moderationNotes && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      Moderation Notes:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {review.moderationNotes}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Review & Moderate
                      </button>
                      
                      {!isAdmin && (
                        <button
                          onClick={() => {
                            setSelectedReview(review);
                            setResponseContent('');
                          }}
                          className="px-3 py-1.5 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg text-sm font-medium transition-colors"
                        >
                          Respond to Review
                        </button>
                      )}
                    </>
                  )}
                  
                  {review.status !== 'pending' && (
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Moderation Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isAdmin ? 'Review Moderation' : 'Review Details'}
                  </h3>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Review Details */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      {selectedReview.patientAvatar ? (
                        <img
                          src={selectedReview.patientAvatar}
                          alt={selectedReview.patientName}
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
                            {selectedReview.patientName}
                          </span>
                          {selectedReview.verified && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(selectedReview.ratings.overall)}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(selectedReview.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {selectedReview.content}
                    </p>
                    
                    {/* Pros and Cons */}
                    {(selectedReview.pros || selectedReview.cons) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {selectedReview.pros && selectedReview.pros.length > 0 && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Pros</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-green-700 dark:text-green-400">
                              {selectedReview.pros.map((pro, index) => (
                                <li key={index}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {selectedReview.cons && selectedReview.cons.length > 0 && (
                          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                            <h4 className="font-medium text-red-800 dark:text-red-300 mb-1">Cons</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-red-700 dark:text-red-400">
                              {selectedReview.cons.map((con, index) => (
                                <li key={index}>{con}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Tips */}
                    {selectedReview.tips && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Tips for Other Patients</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">{selectedReview.tips}</p>
                      </div>
                    )}
                    
                    {/* Photos */}
                    {selectedReview.photos && selectedReview.photos.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Photos</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedReview.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Review photo ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Detailed Ratings */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Wait Times:</span>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(selectedReview.ratings.waitTime)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Staff Friendliness:</span>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(selectedReview.ratings.staffFriendliness)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Communication:</span>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(selectedReview.ratings.communication)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Overall Experience:</span>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(selectedReview.ratings.overallExperience)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Report Information */}
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 dark:text-red-300 mb-2 flex items-center">
                      <Flag className="w-5 h-5 mr-2" />
                      Report Information
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-red-700 dark:text-red-400">Reported for:</span>
                        <ul className="list-disc pl-5 text-sm text-red-700 dark:text-red-400">
                          {selectedReview.reportReasons?.map((reason, index) => (
                            <li key={index} className="capitalize">{reason}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {selectedReview.reportDetails && (
                        <div>
                          <span className="text-sm font-medium text-red-700 dark:text-red-400">Additional details:</span>
                          <p className="text-sm text-red-700 dark:text-red-400 italic">
                            "{selectedReview.reportDetails}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Moderation Notes */}
                  {isAdmin && selectedReview.status === 'pending' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Moderation Notes
                      </label>
                      <textarea
                        value={moderationNote}
                        onChange={(e) => setModerationNote(e.target.value)}
                        placeholder="Add notes about why this review is being approved or rejected..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                      />
                    </div>
                  )}
                  
                  {/* Doctor Response */}
                  {!isAdmin && selectedReview.status === 'pending' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Respond to Review
                      </label>
                      <textarea
                        value={responseContent}
                        onChange={(e) => setResponseContent(e.target.value)}
                        placeholder="Add a professional response to this review..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Your response will be publicly visible alongside the review.
                      </p>
                    </div>
                  )}
                  
                  {/* Existing Doctor Response */}
                  {selectedReview.doctorResponse && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Stethoscope className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <h4 className="font-medium text-gray-900 dark:text-white">Doctor's Response</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(selectedReview.doctorResponse.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedReview.doctorResponse.content}
                      </p>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {isAdmin && selectedReview.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveReview(selectedReview.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve Review</span>
                        </button>
                        
                        <button
                          onClick={() => handleRejectReview(selectedReview.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject Review</span>
                        </button>
                      </>
                    )}
                    
                    {!isAdmin && selectedReview.status === 'pending' && (
                      <button
                        onClick={() => handleRespondToReview(selectedReview.id)}
                        disabled={!responseContent}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Submit Response</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => setSelectedReview(null)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewModeration;