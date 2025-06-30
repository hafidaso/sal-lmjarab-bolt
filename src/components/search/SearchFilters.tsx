import React, { useState } from 'react';
import { Star, Filter, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SearchFiltersProps {
  filters: {
    insurance: string[];
    gender: string;
    languages: string[];
    rating: string;
    distance: number;
    acceptingNew: boolean;
    telehealth: boolean;
    specialty: string;
    priceRange: string;
  };
  onFilterChange: (filters: Partial<SearchFiltersProps['filters']>) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange, onClearFilters }) => {
  const { t } = useLanguage();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const insuranceOptions = [
    { value: 'cnss', label: t('insurance.cnss') },
    { value: 'ramed', label: t('insurance.ramed') },
    { value: 'private', label: t('insurance.private') },
  ];

  const languageOptions = [
    { value: 'arabic', label: t('language.arabic') },
    { value: 'french', label: t('language.french') },
    { value: 'english', label: t('language.english') },
  ];

  const ratingOptions = [
    { value: '4.5', label: t('rating.excellent') },
    { value: '4.0', label: t('rating.good') },
    { value: '3.0', label: t('rating.average') },
  ];

  const specialtyOptions = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'oncology', label: 'Oncology' },
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-200', label: 'Under 200 MAD' },
    { value: '200-400', label: '200-400 MAD' },
    { value: '400-600', label: '400-600 MAD' },
    { value: '600-', label: 'Over 600 MAD' },
  ];

  const validateFilters = (): boolean => {
    const errors: string[] = [];

    // Validate distance
    if (filters.distance < 5 || filters.distance > 100) {
      errors.push('Distance must be between 5 and 100 km');
    }

    // Validate rating
    if (filters.rating && (parseFloat(filters.rating) < 1 || parseFloat(filters.rating) > 5)) {
      errors.push('Rating must be between 1 and 5');
    }

    // Validate price range
    if (filters.priceRange && filters.priceRange !== '') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (isNaN(min) || min < 0) {
        errors.push('Invalid minimum price');
      }
      if (max && (isNaN(max) || max < min)) {
        errors.push('Maximum price must be greater than minimum price');
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleInsuranceChange = (insurance: string) => {
    const newInsurance = filters.insurance.includes(insurance)
      ? filters.insurance.filter(i => i !== insurance)
      : [...filters.insurance, insurance];
    
    onFilterChange({ insurance: newInsurance });
  };

  const handleLanguageChange = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter(l => l !== language)
      : [...filters.languages, language];
    
    onFilterChange({ languages: newLanguages });
  };

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    onFilterChange({ [key]: value });
    
    // Validate after a short delay to avoid excessive validation
    setTimeout(() => {
      validateFilters();
    }, 300);
  };

  const handleClearFilters = () => {
    onClearFilters();
    setValidationErrors([]);
  };

  return (
    <div className="space-y-6">
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <div className="flex items-start">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-red-800 dark:text-red-200">
              {validationErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Specialty */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Specialty
        </h4>
        <select
          value={filters.specialty}
          onChange={(e) => handleFilterChange('specialty', e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
        >
          <option value="">Any Specialty</option>
          {specialtyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Insurance */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          {t('filter.insurance')}
        </h4>
        <div className="space-y-2">
          {insuranceOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.insurance.includes(option.value)}
                onChange={() => handleInsuranceChange(option.value)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          {t('filter.gender')}
        </h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value=""
              checked={filters.gender === ''}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Any</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={filters.gender === 'male'}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t('gender.male')}
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={filters.gender === 'female'}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {t('gender.female')}
            </span>
          </label>
        </div>
      </div>

      {/* Languages */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          {t('filter.language')}
        </h4>
        <div className="space-y-2">
          {languageOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.languages.includes(option.value)}
                onChange={() => handleLanguageChange(option.value)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          {t('filter.rating')}
        </h4>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={option.value}
                checked={filters.rating === option.value}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="ml-2 flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Price Range
        </h4>
        <select
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600"
        >
          {priceRangeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Distance */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          {t('filter.distance')}
        </h4>
        <div className="space-y-2">
          <input
            type="range"
            min="5"
            max="100"
            value={filters.distance}
            onChange={(e) => handleFilterChange('distance', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>5 km</span>
            <span>{filters.distance} km</span>
            <span>100+ km</span>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Additional Options
        </h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.acceptingNew}
              onChange={(e) => handleFilterChange('acceptingNew', e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Accepting new patients
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.telehealth}
              onChange={(e) => handleFilterChange('telehealth', e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Telehealth available
            </span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={handleClearFilters}
        className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default SearchFilters;