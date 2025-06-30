import React, { useState, useEffect } from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Star, 
  BarChart3, 
  Download, 
  Filter,
  Eye,
  MessageSquare,
  Heart,
  Frown,
  Meh,
  Target,
  Calendar,
  Clock,
  Activity
} from 'lucide-react';
import { analyticsService, SearchAnalytics, SearchTerm, SpecialtyGap, ReviewSentiment } from '../../services/analyticsService';

const AdvancedSearchAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('searches');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getSearchAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'symptom':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'specialty':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'location':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'doctor':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSentimentColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 dark:text-green-400';
    if (score >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSentimentIcon = (score: number) => {
    if (score >= 0.8) return <Heart className="w-4 h-4 text-green-500" />;
    if (score >= 0.6) return <Meh className="w-4 h-4 text-yellow-500" />;
    return <Frown className="w-4 h-4 text-red-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Unable to load analytics
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Search Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive insights into user search patterns, specialty gaps, and review sentiment
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'searches', label: 'Search Trends', icon: Search },
            { id: 'gaps', label: 'Specialty Gaps', icon: Target },
            { id: 'sentiment', label: 'Review Sentiment', icon: MessageSquare },
            { id: 'behavior', label: 'User Behavior', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search Trends Tab */}
      {activeTab === 'searches' && (
        <div className="space-y-6">
          {/* Top Searches */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Top Search Terms
                </h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="symptom">Symptoms</option>
                  <option value="specialty">Specialties</option>
                  <option value="location">Locations</option>
                  <option value="doctor">Doctors</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.topSearches
                  .filter(search => selectedCategory === 'all' || search.category === selectedCategory)
                  .map((search, index) => (
                    <div key={search.term} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full">
                          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">{search.term}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(search.category)}`}>
                              {search.category}
                            </span>
                            {getTrendIcon(search.trend)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {search.count.toLocaleString()} searches ({search.percentage}%)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {search.count.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {search.percentage}% of total
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Search Trends Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Search Volume Trends
            </h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Search trends chart</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {analytics.searchTrends.length} days of data available
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specialty Gaps Tab */}
      {activeTab === 'gaps' && (
        <div className="space-y-6">
          {/* Specialty Gaps */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Specialty Coverage Gaps
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Areas where additional doctors are needed based on search demand
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.specialtyGaps.map((gap) => (
                  <div key={`${gap.specialty}-${gap.location}`} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                          <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{gap.specialty}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{gap.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(gap.priority)}`}>
                        {gap.priority} priority
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{gap.currentDoctors}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Current</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{gap.requiredDoctors}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Required</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-600 dark:text-red-400">{gap.gap}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Gap</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{gap.estimatedDemand}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Demand</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(gap.currentDoctors / gap.requiredDoctors) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Gaps */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Location Coverage Analysis
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.locationGaps.map((location) => (
                  <div key={location.city} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{location.city}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{location.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.doctorsPerCapita} doctors/100k
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(location.priority)}`}>
                        {location.priority} priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Sentiment Tab */}
      {activeTab === 'sentiment' && (
        <div className="space-y-6">
          {/* Sentiment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Sentiment</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0.81</p>
                  <p className="text-sm text-green-600">+5% from last month</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">646</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Doctors with Issues</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  <p className="text-sm text-red-600">+1 from last month</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Sentiment Details */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Doctor Sentiment Analysis
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.reviewSentiment.map((doctor) => (
                  <div key={doctor.doctorId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{doctor.doctorName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSentimentIcon(doctor.sentimentScore)}
                        <span className={`font-semibold ${getSentimentColor(doctor.sentimentScore)}`}>
                          {(doctor.sentimentScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{doctor.totalReviews}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">{doctor.positiveReviews}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Positive</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-600 dark:text-red-400">{doctor.negativeReviews}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Negative</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{doctor.neutralReviews}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Neutral</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {doctor.commonComplaints.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Common Complaints:</p>
                          <div className="flex flex-wrap gap-1">
                            {doctor.commonComplaints.map((complaint, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded">
                                {complaint}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {doctor.commonPraise.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Common Praise:</p>
                          <div className="flex flex-wrap gap-1">
                            {doctor.commonPraise.map((praise, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                                {praise}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Behavior Tab */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          {/* User Behavior Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.userBehavior.totalUsers.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.userBehavior.activeUsers.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Searches</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.userBehavior.searchFrequency}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Search className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(analytics.userBehavior.conversionRate * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* User Segments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                User Segments
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.userBehavior.topUserSegments.map((segment) => (
                  <div key={segment.segment} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                        <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{segment.segment}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {segment.count.toLocaleString()} users ({segment.percentage}%)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {segment.averageSearches} avg searches
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Top: {segment.topInterests.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchAnalytics; 