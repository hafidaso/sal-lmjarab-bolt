import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Clock, DollarSign, Languages, User, Stethoscope, Calendar, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { advancedSearchService, SearchFilters, SearchResult, SearchSuggestion } from '../../services/advancedSearchService';

interface AdvancedSearchInterfaceProps {
  onResults: (results: SearchResult[]) => void;
  onLoading: (loading: boolean) => void;
}

const AdvancedSearchInterface: React.FC<AdvancedSearchInterfaceProps> = ({
  onResults,
  onLoading
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'distance' | 'price' | 'availability' | 'experience'>('relevance');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadSearchHistory();
    loadPopularSearches();
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      loadSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const loadSuggestions = async () => {
    try {
      const searchSuggestions = await advancedSearchService.getSuggestions(query, 8);
      setSuggestions(searchSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const history = await advancedSearchService.getSearchHistory(5);
      setSearchHistory(history);
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  };

  const loadPopularSearches = async () => {
    try {
      const popular = await advancedSearchService.getPopularSearches(5);
      setPopularSearches(popular);
    } catch (error) {
      console.error('Failed to load popular searches:', error);
    }
  };

  const handleSearch = async (searchQuery?: string) => {
    const searchTerm = searchQuery || query;
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    onLoading(true);
    setShowSuggestions(false);

    try {
      const results = await advancedSearchService.search(searchTerm, filters);
      const sortedResults = await advancedSearchService.sortResults(results, sortBy);
      onResults(sortedResults);
      
      // Update search history
      await loadSearchHistory();
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
      onLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    handleSearch(suggestion.text);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getActiveFilterCount = (): number => {
    return Object.values(filters).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
      return value !== undefined && value !== null && value !== '';
    }).length;
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'doctor':
        return <User className="w-4 h-4" />;
      case 'specialty':
        return <Stethoscope className="w-4 h-4" />;
      case 'location':
        return <MapPin className="w-4 h-4" />;
      case 'hospital':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search doctors, specialties, conditions, or locations..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
              getActiveFilterCount() > 0 ? 'bg-primary-50 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
          
          <button
            onClick={() => handleSearch()}
            disabled={isSearching}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span>Search</span>
          </button>
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                >
                  <div className="text-gray-400">
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {suggestion.text}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {suggestion.category}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {suggestion.popularity}% popular
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Suggestions */}
      {!query && (searchHistory.length > 0 || popularSearches.length > 0) && (
        <div className="space-y-3">
          {searchHistory.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {popularSearches.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Stethoscope className="w-4 h-4 inline mr-1" />
                  Specialty
                </label>
                <select
                  multiple
                  value={filters.specialty || []}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    handleFilterChange('specialty', values);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Gynecology">Gynecology</option>
                </select>
              </div>

              {/* Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Insurance Accepted
                </label>
                <div className="space-y-2">
                  {['CNSS', 'RAMED', 'Private'].map((insurance) => (
                    <label key={insurance} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.insurance?.includes(insurance as any) || false}
                        onChange={(e) => {
                          const current = filters.insurance || [];
                          const updated = e.target.checked
                            ? [...current, insurance as any]
                            : current.filter(i => i !== insurance);
                          handleFilterChange('insurance', updated);
                        }}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{insurance}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Star className="w-4 h-4 inline mr-1" />
                  Minimum Rating
                </label>
                <select
                  value={filters.rating?.min || ''}
                  onChange={(e) => handleFilterChange('rating', e.target.value ? { min: parseFloat(e.target.value) } : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3.0">3.0+ Stars</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Experience
                </label>
                <select
                  value={filters.experience?.min || ''}
                  onChange={(e) => handleFilterChange('experience', e.target.value ? { min: parseInt(e.target.value) } : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Any Experience</option>
                  <option value="1">1+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                  <option value="20">20+ Years</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Gender Preference
                </label>
                <select
                  value={filters.gender || ''}
                  onChange={(e) => handleFilterChange('gender', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">No Preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Languages className="w-4 h-4 inline mr-1" />
                  Languages Spoken
                </label>
                <div className="space-y-2">
                  {['Arabic', 'French', 'English'].map((language) => (
                    <label key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.languages?.includes(language) || false}
                        onChange={(e) => {
                          const current = filters.languages || [];
                          const updated = e.target.checked
                            ? [...current, language]
                            : current.filter(l => l !== language);
                          handleFilterChange('languages', updated);
                        }}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price Range (MAD)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange?.min || ''}
                    onChange={(e) => {
                      const min = e.target.value ? parseInt(e.target.value) : undefined;
                      handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        min
                      });
                    }}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange?.max || ''}
                    onChange={(e) => {
                      const max = e.target.value ? parseInt(e.target.value) : undefined;
                      handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        max
                      });
                    }}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Availability
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.availableToday || false}
                      onChange={(e) => handleFilterChange('availableToday', e.target.checked || undefined)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Available Today</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.availableThisWeek || false}
                      onChange={(e) => handleFilterChange('availableThisWeek', e.target.checked || undefined)}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Available This Week</span>
                  </label>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Features
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'accessibility', label: 'Wheelchair Accessible' },
                    { key: 'parking', label: 'Parking Available' },
                    { key: 'telemedicine', label: 'Telemedicine' },
                    { key: 'emergencyServices', label: 'Emergency Services' }
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters[feature.key as keyof SearchFilters] as boolean || false}
                        onChange={(e) => handleFilterChange(feature.key as keyof SearchFilters, e.target.checked || undefined)}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort Results By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="relevance">Most Relevant</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Closest Distance</option>
                <option value="price">Most Affordable</option>
                <option value="availability">Best Availability</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearchInterface;