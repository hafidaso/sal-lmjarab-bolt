import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Star, MessageSquare, Flag, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewModeration from '../../components/rating/ReviewModeration';

const ReviewManagementPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState('all');

  // Mock review statistics
  const reviewStats = {
    total: 127,
    average: 4.8,
    distribution: {
      5: 85,
      4: 30,
      3: 8,
      2: 3,
      1: 1
    },
    categories: {
      waitTime: 4.2,
      staffFriendliness: 4.7,
      communication: 4.9,
      overallExperience: 4.8
    },
    reported: 5,
    responded: 112
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Review Management
        </h1>
        
        {/* Review Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Review Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviewStats.total}</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{reviewStats.average}</p>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((reviewStats.responded / reviewStats.total) * 100)}%
                  </p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reported Reviews</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviewStats.reported}</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating Distribution */}
            <div className="md:col-span-1">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Rating Distribution
              </h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviewStats.distribution[stars as keyof typeof reviewStats.distribution] || 0;
                  const percentage = (count / reviewStats.total) * 100;
                  
                  return (
                    <div key={stars} className="flex items-center space-x-2 text-sm">
                      <span className="w-8">{stars}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
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
            </div>
            
            {/* Category Ratings */}
            <div className="md:col-span-2">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Category Ratings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(reviewStats.categories).map(([category, rating]) => (
                  <div key={category} className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {rating}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Review Management Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  All Reviews
                </TabsTrigger>
                <TabsTrigger value="unresponded" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Unresponded
                </TabsTrigger>
                <TabsTrigger value="reported" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  Reported
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
            
            <TabsContent value="all">
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>All reviews would be displayed here.</p>
                <p>Use the tabs above to filter reviews.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="unresponded">
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>Unresponded reviews would be displayed here.</p>
                <p>Respond to patient reviews to improve engagement.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reported">
              <ReviewModeration doctorId={user?.id} />
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
      </div>
    </div>
  );
};

export default ReviewManagementPage;