import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockHealthBlog } from '../data/mockHealthBlog';
import { mockDoctors } from '../data/mockDoctors';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding Hypertension: Causes, Symptoms, and Treatment Options',
      excerpt: 'Hypertension affects millions of Moroccans. Learn about the causes, symptoms, and the latest treatment approaches to manage this common condition.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Ahmed Bennani',
        title: 'Cardiologist',
        avatar: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-15',
      readTime: 8,
      category: 'Health Conditions',
      tags: ['Hypertension', 'Heart Health', 'Preventive Care'],
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '2',
      title: 'The Importance of Regular Health Screenings at Every Age',
      excerpt: 'Preventive screenings can detect health issues before they become serious. Discover which screenings are recommended at different life stages.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Fatima Alaoui',
        title: 'Family Medicine Specialist',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-20',
      readTime: 6,
      category: 'Preventive Care',
      tags: ['Screenings', 'Preventive Medicine', 'Health Checkups'],
      image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Advances in Diabetes Management: New Technologies and Treatments',
      excerpt: 'Recent innovations are transforming diabetes care. Learn about continuous glucose monitors, insulin pumps, and new medications improving quality of life.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Omar Idrissi',
        title: 'Endocrinologist',
        avatar: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-25',
      readTime: 10,
      category: 'Medical Innovations',
      tags: ['Diabetes', 'Technology', 'Treatment'],
      image: 'https://images.pexels.com/photos/7108344/pexels-photo-7108344.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'Mental Health Awareness: Breaking the Stigma in Morocco',
      excerpt: 'Mental health stigma remains a challenge in Morocco. This article discusses efforts to increase awareness and improve access to mental health services.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Leila Benjelloun',
        title: 'Psychiatrist',
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2023-12-28',
      readTime: 7,
      category: 'Mental Health',
      tags: ['Mental Health', 'Awareness', 'Healthcare Access'],
      image: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'Nutrition for Optimal Health: Mediterranean Diet Benefits',
      excerpt: 'The Mediterranean diet has been linked to numerous health benefits. Discover how this eating pattern can improve heart health and overall wellbeing.',
      content: 'Full article content here...',
      author: {
        name: 'Amina Benali',
        title: 'Nutritionist',
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2023-12-20',
      readTime: 5,
      category: 'Nutrition',
      tags: ['Diet', 'Mediterranean', 'Heart Health'],
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      title: 'Children\'s Health: Common Concerns and When to See a Doctor',
      excerpt: 'Parents often worry about their children\'s health. Learn about common childhood illnesses, prevention strategies, and when to seek medical attention.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Aicha Benali',
        title: 'Pediatrician',
        avatar: 'https://images.pexels.com/photos/5215001/pexels-photo-5215001.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-05',
      readTime: 9,
      category: 'Pediatrics',
      tags: ['Children', 'Parenting', 'Pediatrics'],
      image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'health-1',
      title: '5 Heart-Healthy Habits for Everyday Life',
      excerpt: 'Maintaining a healthy heart is easier than you think. Start with regular exercise, a balanced diet, and routine check-ups. Avoid smoking and manage stress for long-term cardiovascular health.',
      content: 'Maintaining a healthy heart is easier than you think. Start with regular exercise, a balanced diet, and routine check-ups. Avoid smoking and manage stress for long-term cardiovascular health. Read on for practical tips you can start today...',
      author: {
        name: 'Dr. Ahmed Bennani',
        title: 'Cardiologist',
        avatar: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-05-31',
      readTime: 5,
      category: 'Preventive Care',
      tags: ['heart', 'lifestyle', 'prevention', 'cardiology'],
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'health-2',
      title: 'How to Care for Sensitive Skin in Summer',
      excerpt: 'Summer heat can be tough on sensitive skin. Use gentle cleansers, apply sunscreen daily, and avoid harsh exfoliants. Stay hydrated and consult a dermatologist for personalized advice.',
      content: 'Summer heat can be tough on sensitive skin. Use gentle cleansers, apply sunscreen daily, and avoid harsh exfoliants. Stay hydrated and consult a dermatologist for personalized advice. Here are expert tips for glowing skin all season...',
      author: {
        name: 'Dr. Fatima Alaoui',
        title: 'Dermatologist',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-05-30',
      readTime: 4,
      category: 'Health Conditions',
      tags: ['skin', 'dermatology', 'summer', 'tips'],
      image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'health-conditions', name: 'Health Conditions' },
    { id: 'preventive-care', name: 'Preventive Care' },
    { id: 'medical-innovations', name: 'Medical Innovations' },
    { id: 'mental-health', name: 'Mental Health' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'pediatrics', name: 'Pediatrics' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      activeCategory === 'all' || 
      post.category.toLowerCase().replace(/\s+/g, '-') === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const postsPerPage = 4;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Health Insights Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Expert articles, health tips, and medical news to keep you informed and healthy
          </p>
        </div>

        {/* Featured Post */}
        {filteredPosts.find(post => post.featured) && (
          <div className="mb-12">
            {filteredPosts
              .filter(post => post.featured)
              .map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded-full text-xs font-medium">
                          Featured
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {post.readTime} min read
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-6">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {post.author.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {post.author.title}
                          </p>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts */}
            {paginatedPosts.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {paginatedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          <Link to={`/blog/${post.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {post.author.avatar ? (
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              </div>
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {post.author.name}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(post.date)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {post.readTime} min
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Popular Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Hypertension', 'Diabetes', 'Mental Health', 'Nutrition', 'Preventive Care', 'Heart Health', 'Women\'s Health', 'Children\'s Health', 'Exercise', 'Sleep'].map(tag => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Articles
              </h3>
              <div className="space-y-4">
                {blogPosts
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 3)
                  .map(post => (
                    <div key={post.id} className="flex space-x-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                          <Link to={`/blog/${post.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-100 mb-4">
                Get the latest health tips, medical news, and exclusive content delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-primary-100 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;