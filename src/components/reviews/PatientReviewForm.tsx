import React, { useState } from 'react';
import { Star, Info, Check, X, Shield, Eye, EyeOff, AlertTriangle, Heart, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface PatientReviewFormProps {
  doctorName: string;
  doctorId: string;
  doctorSpecialty?: string;
  appointmentId?: string;
  onSubmit: (reviewData: ReviewData) => void;
  onCancel: () => void;
}

interface ReviewData {
  doctorId: string;
  appointmentId?: string;
  overallRating: number;
  bedsideManner: number;
  waitTime: number;
  cleanliness: number;
  staffProfessionalism: number;
  recommend: boolean;
  comment: string;
  isAnonymous?: boolean;
  anonymousDisplayName?: string;
  therapyType?: string;
  sensitiveIssues?: string[];
  consentToAnonymous?: boolean;
}

const PatientReviewForm: React.FC<PatientReviewFormProps> = ({
  doctorName,
  doctorId,
  doctorSpecialty,
  appointmentId,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<ReviewData>({
    doctorId,
    appointmentId,
    overallRating: 0,
    bedsideManner: 0,
    waitTime: 0,
    cleanliness: 0,
    staffProfessionalism: 0,
    recommend: true,
    comment: '',
    isAnonymous: false,
    anonymousDisplayName: '',
    therapyType: '',
    sensitiveIssues: [],
    consentToAnonymous: false
  });

  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [newSensitiveIssue, setNewSensitiveIssue] = useState('');

  // Check if this is a specialized specialty that supports anonymous reviews
  const isSpecializedSpecialty = doctorSpecialty === 'Psychiatry' || doctorSpecialty === 'Sexology';

  // Therapy types for specialized reviews
  const therapyTypes = {
    Psychiatry: [
      'Cognitive Behavioral Therapy (CBT)',
      'Dialectical Behavior Therapy (DBT)',
      'Psychoanalysis',
      'Psychodynamic Therapy',
      'Interpersonal Therapy',
      'Family Therapy',
      'Group Therapy',
      'Trauma-Focused Therapy',
      'Mindfulness-Based Therapy',
      'Medication Management',
      'Exposure Therapy',
      'Acceptance and Commitment Therapy (ACT)',
      'Eye Movement Desensitization and Reprocessing (EMDR)',
      'Art Therapy',
      'Music Therapy'
    ],
    Sexology: [
      'Individual Sex Therapy',
      'Couples Therapy',
      'Relationship Counseling',
      'Sexual Dysfunction Treatment',
      'Gender Identity Support',
      'LGBTQ+ Affirmative Therapy',
      'Trauma-Informed Sex Therapy',
      'Intimacy Coaching',
      'Sexual Education',
      'Premarital Counseling',
      'Postpartum Sexual Health',
      'Sexual Addiction Treatment',
      'Body Image Therapy',
      'Communication Skills Training',
      'Sexual Trauma Recovery'
    ]
  };

  // Sensitive issue tags for specialized reviews
  const sensitiveIssueOptions = {
    Psychiatry: [
      'Depression',
      'Anxiety',
      'Trauma/PTSD',
      'Suicidal Thoughts',
      'Self-Harm',
      'Eating Disorders',
      'Substance Abuse',
      'Bipolar Disorder',
      'Schizophrenia',
      'OCD',
      'ADHD',
      'Autism Spectrum',
      'Grief & Loss',
      'Work Stress',
      'Relationship Issues',
      'Family Conflict',
      'LGBTQ+ Issues',
      'Cultural Issues',
      'Religious Concerns',
      'Financial Stress',
      'Borderline Personality Disorder',
      'Dissociative Disorders',
      'Panic Attacks',
      'Social Anxiety',
      'Insomnia'
    ],
    Sexology: [
      'Erectile Dysfunction',
      'Premature Ejaculation',
      'Low Libido',
      'Painful Intercourse',
      'Orgasm Difficulties',
      'Sexual Trauma',
      'Gender Dysphoria',
      'LGBTQ+ Issues',
      'Relationship Conflicts',
      'Communication Issues',
      'Intimacy Problems',
      'Sexual Orientation',
      'Body Image Issues',
      'Sexual Education',
      'Cultural/Religious Concerns',
      'Performance Anxiety',
      'Sexual Addiction',
      'Infidelity',
      'Divorce/Separation',
      'Premarital Issues',
      'Postpartum Sexual Changes',
      'Menopause-Related Issues',
      'Sexual Identity',
      'Kink/BDSM Support',
      'Polyamory/Open Relationships'
    ]
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, overallRating: rating }));
    if (errors.overallRating) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.overallRating;
        return newErrors;
      });
    }
  };

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ReviewData) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRecommendChange = (recommend: boolean) => {
    setFormData(prev => ({ ...prev, recommend }));
  };

  const addSensitiveIssue = () => {
    if (newSensitiveIssue.trim() && !formData.sensitiveIssues?.includes(newSensitiveIssue.trim())) {
      setFormData(prev => ({
        ...prev,
        sensitiveIssues: [...(prev.sensitiveIssues || []), newSensitiveIssue.trim()]
      }));
      setNewSensitiveIssue('');
    }
  };

  const removeSensitiveIssue = (issue: string) => {
    setFormData(prev => ({
      ...prev,
      sensitiveIssues: prev.sensitiveIssues?.filter(i => i !== issue) || []
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (formData.overallRating === 0) {
      newErrors.overallRating = 'Please provide an overall rating';
    }

    if (formData.isAnonymous && !formData.consentToAnonymous) {
      newErrors.anonymous = 'Please consent to anonymous review';
    }

    if (formData.isAnonymous && !formData.anonymousDisplayName?.trim()) {
      newErrors.anonymousDisplayName = 'Please provide an anonymous display name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const tooltips = {
    bedsideManner: "Rate how well the doctor communicated, showed empathy, and explained your condition and treatment options.",
    waitTime: "Rate your experience with appointment scheduling and time spent in the waiting room.",
    cleanliness: "Rate the cleanliness, comfort, and overall environment of the doctor's office.",
    staffProfessionalism: "Rate the courtesy, helpfulness, and professionalism of the office staff."
  };

  const showTooltip = (field: string) => {
    setActiveTooltip(field);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const getStarLabel = (rating: number): string => {
    const labels = {
      0: 'Select rating',
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels[rating as keyof typeof labels] || 'Select rating';
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : 'button'}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            onMouseEnter={interactive ? () => handleStarHover(star) : undefined}
            onMouseLeave={interactive ? handleStarLeave : undefined}
            className={`focus:outline-none transition-transform ${interactive ? 'hover:scale-110' : ''}`}
            disabled={!interactive}
          >
            <Star 
              className={`w-6 h-6 ${
                star <= (hoveredStar || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              } transition-colors`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {doctorName} - Patient Experience Rating <span className="text-red-500">*</span>
          </h2>
          {doctorSpecialty && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Specialty: {doctorSpecialty}
            </p>
          )}
        </div>

        {/* Anonymous Review Option for Specialized Specialties */}
        {isSpecializedSpecialty && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Anonymous Review Option
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  You can choose to submit this review anonymously to protect your privacy.
                </p>
                
                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 mt-0.5"
                    />
                    <div>
                      <span className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                        Submit review anonymously
                      </span>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        Your name will be hidden and replaced with an anonymous display name.
                      </p>
                    </div>
                  </label>

                  {formData.isAnonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-7 space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Anonymous Display Name *
                        </label>
                        <input
                          type="text"
                          value={formData.anonymousDisplayName || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, anonymousDisplayName: e.target.value }))}
                          className="w-full px-3 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="e.g., Patient123, Anonymous, or any name you prefer"
                        />
                        {errors.anonymousDisplayName && (
                          <p className="text-red-500 text-sm mt-1">{errors.anonymousDisplayName}</p>
                        )}
                      </div>

                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.consentToAnonymous}
                          onChange={(e) => setFormData(prev => ({ ...prev, consentToAnonymous: e.target.checked }))}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 mt-0.5"
                        />
                        <div>
                          <span className="text-sm text-blue-800 dark:text-blue-200">
                            I consent to anonymous review and understand the implications
                          </span>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                            Anonymous reviews are still moderated and must follow our guidelines.
                          </p>
                        </div>
                      </label>
                      {errors.anonymous && (
                        <p className="text-red-500 text-sm ml-7">{errors.anonymous}</p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Therapy Type Selection for Specialized Specialties */}
        {isSpecializedSpecialty && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Therapy Type (Optional)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              What type of therapy did you receive? This helps other patients understand the doctor's approach.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {therapyTypes[doctorSpecialty as keyof typeof therapyTypes]?.map((therapyType) => (
                <label key={therapyType} className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="therapyType"
                    value={therapyType}
                    checked={formData.therapyType === therapyType}
                    onChange={(e) => setFormData(prev => ({ ...prev, therapyType: e.target.value }))}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{therapyType}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sensitive Issues for Specialized Specialties */}
        {isSpecializedSpecialty && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Relevant Issues (Optional)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Select issues that were relevant to your treatment. This helps other patients with similar concerns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
              {sensitiveIssueOptions[doctorSpecialty as keyof typeof sensitiveIssueOptions]?.map((issue) => (
                <label key={issue} className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sensitiveIssues?.includes(issue) || false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          sensitiveIssues: [...(prev.sensitiveIssues || []), issue]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          sensitiveIssues: prev.sensitiveIssues?.filter(i => i !== issue) || []
                        }));
                      }
                    }}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{issue}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSensitiveIssue}
                onChange={(e) => setNewSensitiveIssue(e.target.value)}
                placeholder="Add custom issue..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={addSensitiveIssue}
                className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>

            {formData.sensitiveIssues && formData.sensitiveIssues.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.sensitiveIssues.map((issue) => (
                  <span
                    key={issue}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                  >
                    <span>{issue}</span>
                    <button
                      type="button"
                      onClick={() => removeSensitiveIssue(issue)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Primary Rating Section */}
        <div className="mb-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleStarClick(rating)}
                  onMouseEnter={() => handleStarHover(rating)}
                  onMouseLeave={handleStarLeave}
                  className="focus:outline-none transition-transform hover:scale-110"
                  aria-label={`Rate ${rating} stars`}
                >
                  <Star 
                    className={`w-10 h-10 ${
                      rating <= (hoveredStar || formData.overallRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    } transition-colors`} 
                  />
                </button>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {getStarLabel(hoveredStar || formData.overallRating)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Click to rate your overall experience
            </p>
            {errors.overallRating && (
              <p className="text-red-500 text-sm mt-2">{errors.overallRating}</p>
            )}
          </div>
        </div>

        {/* Detailed Rating Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Rate Specific Aspects
          </h3>
          <div className="space-y-4">
            {[
              { key: 'bedsideManner', label: 'Bedside Manner', icon: Heart },
              { key: 'waitTime', label: 'Wait Time', icon: Info },
              { key: 'cleanliness', label: 'Cleanliness', icon: Check },
              { key: 'staffProfessionalism', label: 'Staff Professionalism', icon: Check }
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{label}</span>
                </div>
                <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="5"
                    value={formData[key as keyof ReviewData] as number}
                    onChange={(e) => handleSliderChange(e, key as keyof ReviewData)}
                    className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                    {formData[key as keyof ReviewData] as number}
                </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Would you recommend this doctor?
          </h3>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleRecommendChange(true)}
              className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                formData.recommend
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Yes, I would recommend</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleRecommendChange(false)}
              className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                !formData.recommend
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-500'
              }`}
            >
              <div className="flex items-center space-x-2">
                <X className="w-5 h-5" />
                <span>No, I would not recommend</span>
              </div>
            </button>
          </div>
        </div>

        {/* Review Comment */}
        <div className="mb-8">
          <label htmlFor="comment" className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={5}
            placeholder="Share details of your experience with this doctor..."
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={formData.overallRating === 0}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* Guidelines Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-10"
      >
        <div className="max-w-4xl mx-auto">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Review Guidelines:
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Provide honest, constructive feedback based on your experience</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Exclude protected health information (PHI) and personal details</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Focus on your personal experience only, not others'</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>No unauthorized photos or media</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Reviews are moderated and typically appear within 24-48 hours</span>
            </li>
            {isSpecializedSpecialty && (
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Anonymous reviews are available for privacy-sensitive specialties</span>
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientReviewForm;