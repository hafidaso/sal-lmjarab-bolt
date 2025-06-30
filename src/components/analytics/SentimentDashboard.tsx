import React, { useState, useEffect } from 'react';
import { MessageSquare, TrendingUp, TrendingDown, AlertTriangle, Star, Filter, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { sentimentAnalysis, TrendingIssue, InsightReport } from '../../services/sentimentAnalysis';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, color }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        {getTrendIcon()}
      </div>
      
      <div className="flex items-end space-x-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        {change && (
          <span className={`text-sm ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const SentimentDashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [trendingIssues, setTrendingIssues] = useState<TrendingIssue[]>([]);
  const [criticalIssues, setCriticalIssues] = useState<TrendingIssue[]>([]);
  const [realtimeAlerts, setRealtimeAlerts] = useState<any[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [insightReport, setInsightReport] = useState<InsightReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSentimentData();
    
    // Set up real-time updates
    const interval = setInterval(loadRealtimeData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [selectedTimeframe, selectedFacility]);

  const loadSentimentData = async () => {
    try {
      setLoading(true);
      
      // Load overview analytics
      const analyticsOverview = sentimentAnalysis.getAnalyticsOverview();
      setOverview(analyticsOverview);
      
      // Load trending issues
      const trending = sentimentAnalysis.getTrendingIssues();
      setTrendingIssues(trending);
      
      // Load critical issues
      const critical = sentimentAnalysis.getCriticalIssues();
      setCriticalIssues(critical);
      
      // Load real-time alerts
      const alerts = await sentimentAnalysis.getRealtimeAlerts();
      setRealtimeAlerts(alerts);
      
      // Generate insight report for a sample facility
      if (selectedFacility !== 'all') {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - parseInt(selectedTimeframe.replace('d', '')));
        
        const report = await sentimentAnalysis.generateInsightReport(
          selectedFacility,
          startDate,
          endDate
        );
        setInsightReport(report);
      }
      
    } catch (error) {
      console.error('Failed to load sentiment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRealtimeData = async () => {
    try {
      const alerts = await sentimentAnalysis.getRealtimeAlerts();
      setRealtimeAlerts(alerts);
      
      const overview = sentimentAnalysis.getAnalyticsOverview();
      setOverview(overview);
    } catch (error) {
      console.error('Failed to load real-time data:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-red-600';
      case 'decreasing':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-8 h-8 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sentiment Analysis Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time patient feedback analysis and insights
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Timeframe Selector */}
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          {/* Facility Selector */}
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Facilities</option>
            <option value="facility_1">CHU Ibn Rochd</option>
            <option value="facility_2">Clinique Al Andalous</option>
            <option value="facility_3">Pharmacie Centrale</option>
          </select>
          
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Real-time Alerts */}
      {realtimeAlerts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800 dark:text-red-300">
              Active Alerts ({realtimeAlerts.length})
            </h3>
          </div>
          <div className="space-y-2">
            {realtimeAlerts.slice(0, 3).map((alert, index) => (
              <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{alert.message}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === 'critical' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview Metrics */}
      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Reviews"
            value={overview.totalReviews.toLocaleString()}
            icon={<MessageSquare className="w-6 h-6 text-blue-500" />}
            color="border-blue-500"
          />
          
          <MetricCard
            title="Average Rating"
            value={overview.averageRating}
            icon={<Star className="w-6 h-6 text-yellow-500" />}
            color="border-yellow-500"
          />
          
          <MetricCard
            title="Active Issues"
            value={overview.totalIssues}
            trend={overview.totalIssues > 10 ? 'up' : 'stable'}
            icon={<AlertTriangle className="w-6 h-6 text-orange-500" />}
            color="border-orange-500"
          />
          
          <MetricCard
            title="Critical Issues"
            value={overview.criticalIssues}
            trend={overview.criticalIssues > 0 ? 'up' : 'stable'}
            icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
            color="border-red-500"
          />
        </div>
      )}

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Critical Issues Requiring Immediate Attention</span>
          </h3>
          
          <div className="space-y-4">
            {criticalIssues.map((issue, index) => (
              <div key={index} className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)}`}></div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {issue.description}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Frequency: {issue.frequency}
                    </span>
                    <span className={`text-sm font-medium ${getTrendColor(issue.trend)}`}>
                      {issue.trend}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                      {issue.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">First Detected:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {new Date(issue.firstDetected).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Affected Facilities:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {issue.affectedFacilities.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Issues */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <span>Trending Issues</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingIssues.slice(0, 6).map((issue, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)}`}></div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {issue.category}
                  </h4>
                </div>
                <span className={`text-sm font-medium ${getTrendColor(issue.trend)}`}>
                  {issue.trend}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {issue.description}
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Frequency:</span>
                  <span className="font-medium">{issue.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Facilities:</span>
                  <span className="font-medium">{issue.affectedFacilities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(issue.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight Report */}
      {insightReport && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-primary-600" />
            <span>Detailed Insights Report</span>
          </h3>
          
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {insightReport.summary.totalReviews}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {insightReport.summary.averageRating}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                insightReport.summary.sentimentTrend === 'improving' ? 'text-green-600' :
                insightReport.summary.sentimentTrend === 'declining' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {insightReport.summary.sentimentTrend}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sentiment Trend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {insightReport.summary.responseRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Response Rate</div>
            </div>
          </div>
          
          {/* Positive Highlights */}
          {insightReport.positiveHighlights.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Positive Highlights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {insightReport.positiveHighlights.map((highlight, index) => (
                  <div key={index} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <p className="text-sm text-green-800 dark:text-green-300">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Actionable Insights */}
          {insightReport.actionableInsights.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Actionable Insights
              </h4>
              <div className="space-y-3">
                {insightReport.actionableInsights.map((insight, index) => (
                  <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Department Breakdown */}
          {insightReport.departmentBreakdown.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Department Performance
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insightReport.departmentBreakdown.map((dept, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">{dept.name}</h5>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">{dept.averageRating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dept.reviewCount} reviews
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SentimentDashboard;