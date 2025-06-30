import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Book,
  Search,
  Heart,
  Brain,
  Stethoscope,
  Bone,
  Pill,
  Users,
  Baby,
  Eye,
  Smile,
  Activity,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'heart', name: 'Heart & Cardiovascular', icon: Heart, articles: 156 },
  { id: 'brain', name: 'Brain & Nervous System', icon: Brain, articles: 143 },
  {
    id: 'respiratory',
    name: 'Respiratory Health',
    icon: Stethoscope,
    articles: 98,
  },
  { id: 'bones', name: 'Bones & Joints', icon: Bone, articles: 112 },
  { id: 'medications', name: 'Medications', icon: Pill, articles: 245 },
  { id: 'pediatrics', name: "Children's Health", icon: Baby, articles: 167 },
  { id: 'vision', name: 'Eye Health', icon: Eye, articles: 89 },
  { id: 'dental', name: 'Dental Health', icon: Smile, articles: 76 },
  {
    id: 'infectious',
    name: 'Infectious Diseases',
    icon: Activity,
    articles: 134,
  },
  { id: 'wellness', name: 'Wellness & Prevention', icon: Users, articles: 198 },
];

const featuredArticles = [
  {
    id: '1',
    title: 'Understanding Blood Pressure: A Comprehensive Guide',
    category: 'Heart & Cardiovascular',
    readTime: '8 min read',
    date: '2025-06-15',
  },
  {
    id: '2',
    title: 'Common Childhood Vaccinations: What Parents Need to Know',
    category: "Children's Health",
    readTime: '10 min read',
    date: '2025-06-18',
  },
  {
    id: '3',
    title: 'Managing Diabetes: Diet, Exercise, and Medication',
    category: 'Wellness & Prevention',
    readTime: '12 min read',
    date: '2025-06-20',
  },
];

const HealthLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <Book className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Health Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive, up-to-date health information reviewed by medical
            experts
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search health topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/library/article/${article.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                  {article.category}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {article.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>{article.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/library/category/${category.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                      <category.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.articles} articles
                      </p>
                    </div>
                  </div>
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

export default HealthLibrary;
