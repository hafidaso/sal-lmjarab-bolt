import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Search,
  Clock,
  Eye as ViewIcon,
  Heart,
  Star,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  category: string;
  date: string;
  description: string;
}

const categories = [
  'All Videos',
  'Medical Procedures',
  'Health Tips',
  'Expert Interviews',
  'Patient Stories',
  'Wellness & Lifestyle',
  'Disease Management',
  'First Aid',
  'Mental Health',
];

const featuredVideos: Video[] = [
  {
    id: '1',
    title: 'Understanding Common Heart Conditions',
    thumbnail:
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '12:45',
    views: 15234,
    category: 'Medical Procedures',
    date: '2025-06-15',
    description:
      'Expert cardiologists explain common heart conditions and their treatments.',
  },
  {
    id: '2',
    title: 'Healthy Living: Diet & Exercise Tips',
    thumbnail:
      'https://images.pexels.com/photos/4498141/pexels-photo-4498141.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '08:30',
    views: 12567,
    category: 'Health Tips',
    date: '2025-06-18',
    description:
      'Professional nutritionists share practical tips for a healthy lifestyle.',
  },
  {
    id: '3',
    title: 'Mental Health Awareness',
    thumbnail:
      'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '15:20',
    views: 18921,
    category: 'Mental Health',
    date: '2025-06-20',
    description:
      'Understanding mental health and ways to maintain emotional well-being.',
  },
];

const VideoCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Videos');

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Video Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Watch expert-led videos on health topics, medical procedures, and
            wellness tips
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Videos */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <Link
                key={video.id}
                to={`/videos/${video.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {video.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <ViewIcon className="w-4 h-4 mr-1" />
                    <span>{formatViews(video.views)} views</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(video.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Video Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => (
              <Link
                key={category}
                to={`/videos/category/${category
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCenter;
