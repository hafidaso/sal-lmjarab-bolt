import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Flag, Filter, Calendar, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, X } from 'lucide-react';
import ReviewModeration from '../../components/rating/ReviewModeration';

const ReviewModerationPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState('all');

  // Mock moderation statistics
  const moderationStats = {
    pending: 15,
    approved: 127,
    rejected: 8,
    flaggedKeywords: 12,
    flaggedPhotos: 3,
    averageResponseTime: '4.2 hours'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Review Moderation
        </h1>
        
        {/* Moderation Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Moderation Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">Pending Reviews</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">{moderationStats.pending}</p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                Average response time: {moderationStats.averageResponseTime}
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-800 dark:text-green-300">Approved Reviews</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-200">{moderationStats.approved}</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                94% approval rate
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-800 dark:text-red-300">Rejected Reviews</p>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-200">{moderationStats.rejected}</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
                  <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                6% rejection rate
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Flagged Content
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Flagged for inappropriate language</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{moderationStats.flaggedKeywords}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Flagged for inappropriate photos</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{moderationStats.flaggedPhotos}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Flagged for spam content</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">5</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Moderation Activity
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reviews moderated today</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reviews moderated this week</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reviews moderated this month</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">127</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Review Moderation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <TabsTrigger value="pending" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Pending ({moderationStats.pending})
                </TabsTrigger>
                <TabsTrigger value="approved" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Approved
                </TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Rejected
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                  <option value="1y">Last Year</option>
                </select>
                
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>
            
            <TabsContent value="pending">
              <ReviewModeration isAdmin={true} />
            </TabsContent>
            
            <TabsContent value="approved">
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>Approved reviews would be displayed here.</p>
                <p>Use the tabs above to filter reviews.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="rejected">
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>Rejected reviews would be displayed here.</p>
                <p>Use the tabs above to filter reviews.</p>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === 3}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
        
        {/* Moderation Guidelines */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Review Moderation Guidelines
              </h3>
              <p className="text-blue-700 dark:text-blue-400 mb-4">
                When moderating reviews, please follow these guidelines to ensure fair and consistent moderation:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-blue-700 dark:text-blue-400">
                <li>Approve reviews that provide honest feedback, even if negative, as long as they follow our content guidelines</li>
                <li>Reject reviews containing profanity, personal attacks, discriminatory language, or spam</li>
                <li>Reject reviews that mention specific staff members by name (other than the doctor)</li>
                <li>Reject reviews containing personal health information</li>
                <li>Always provide a reason when rejecting a review to help users understand our guidelines</li>
                <li>Reviews with photos should be carefully examined to ensure they don't contain identifiable patients or staff</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModerationPage;