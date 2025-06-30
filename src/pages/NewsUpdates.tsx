import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Tag, Clock, ChevronLeft, ChevronRight, Heart, Brain, Brush as Virus, Pill, Stethoscope, Users, Microscope, Building, Laptop, FileText, Newspaper, Scale as Female, Baby, Apple } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NewsArticle {
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

const NewsUpdates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock news articles data
  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'New Diabetes Treatment Center Opens in Casablanca',
      excerpt: 'State-of-the-art facility brings advanced diabetes care to Morocco\'s largest city, offering comprehensive treatment options and patient education programs.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Ahmed Bennani',
        title: 'Medical Correspondent',
        avatar: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-15',
      readTime: 8,
      category: 'Healthcare Facilities',
      tags: ['Diabetes', 'Casablanca', 'Treatment Center'],
      image: 'https://images.pexels.com/photos/3846005/pexels-photo-3846005.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '2',
      title: 'Ministry of Health Launches Nationwide Vaccination Campaign',
      excerpt: 'Nationwide initiative aims to increase immunization rates for children under five, targeting remote and underserved communities across Morocco.',
      content: 'Full article content here...',
      author: {
        name: 'Leila Mansouri',
        title: 'Health Policy Reporter',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-18',
      readTime: 6,
      category: 'Public Health',
      tags: ['Vaccination', 'Children', 'Public Health'],
      image: 'https://images.pexels.com/photos/5863365/pexels-photo-5863365.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '3',
      title: 'Study Shows Significant Increase in Telemedicine Adoption Across Morocco',
      excerpt: 'Research finds 65% growth in virtual healthcare usage across Morocco in the past year, with both urban and rural patients embracing digital health solutions.',
      content: 'Full article content here...',
      author: {
        name: 'Karim Bensouda',
        title: 'Digital Health Editor',
        avatar: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-20',
      readTime: 7,
      category: 'Digital Health',
      tags: ['Telemedicine', 'Digital Health', 'Healthcare Access'],
      image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'Breakthrough in Alzheimer\'s Research by Moroccan Scientists',
      excerpt: 'Team of researchers from Rabat University identifies potential new biomarker for early Alzheimer\'s detection, opening possibilities for earlier intervention.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Fatima Alaoui',
        title: 'Science Correspondent',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-23',
      readTime: 9,
      category: 'Medical Research',
      tags: ['Alzheimer\'s', 'Research', 'Neuroscience'],
      image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'New Guidelines Released for Hypertension Management in Morocco',
      excerpt: 'Updated clinical guidelines provide new recommendations for blood pressure management, emphasizing lifestyle modifications alongside medication.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Youssef Tazi',
        title: 'Cardiology Specialist',
        avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-25',
      readTime: 10,
      category: 'Clinical Guidelines',
      tags: ['Hypertension', 'Guidelines', 'Cardiology'],
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      title: 'Mental Health Services Expanding in Rural Morocco',
      excerpt: 'New initiative brings mental health services to underserved rural communities through mobile clinics and telehealth solutions.',
      content: 'Full article content here...',
      author: {
        name: 'Amina Benali',
        title: 'Community Health Reporter',
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      date: '2025-06-27',
      readTime: 8,
      category: 'Mental Health',
      tags: ['Mental Health', 'Rural Healthcare', 'Telehealth'],
      image: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'public-health', name: 'Public Health', icon: Users },
    { id: 'medical-research', name: 'Medical Research', icon: Microscope },
    { id: 'healthcare-facilities', name: 'Healthcare Facilities', icon: Building },
    { id: 'digital-health', name: 'Digital Health', icon: Laptop },
    { id: 'clinical-guidelines', name: 'Clinical Guidelines', icon: FileText },
    { id: 'mental-health', name: 'Mental Health', icon: Brain }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      activeCategory === 'all' || 
      article.category.toLowerCase().replace(/\s+/g, '-') === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const postsPerPage = 4;
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase().replace(/\s+/g, '-')) {
      case 'public-health':
        return <Users className="w-5 h-5" />;
      case 'medical-research':
        return <Microscope className="w-5 h-5" />;
      case 'healthcare-facilities':
        return <Building className="w-5 h-5" />;
      case 'digital-health':
        return <Laptop className="w-5 h-5" />;
      case 'clinical-guidelines':
        return <FileText className="w-5 h-5" />;
      case 'mental-health':
        return <Brain className="w-5 h-5" />;
      default:
        return <Stethoscope className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            News & Medical Updates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay informed with the latest healthcare news, medical breakthroughs, and health policy updates
          </p>
        </div>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        {filteredArticles.filter(article => article.featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured News
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles
                .filter(article => article.featured)
                .map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="relative h-64">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(article.category)}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {article.category}
                          </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(article.date)}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {article.author.avatar ? (
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {article.author.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {article.author.title}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/news/${article.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Latest News */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Latest News & Updates
          </h2>
          
          {paginatedArticles.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {paginatedArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs font-medium flex items-center">
                          {getCategoryIcon(article.category)}
                          <span className="ml-1">{article.category}</span>
                        </span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {article.readTime} min read
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        <Link to={`/news/${article.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {article.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {article.author.avatar ? (
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {article.author.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(article.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
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

        {/* Health Topics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Health Topics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Heart Health', icon: Heart, color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' },
              { name: 'Brain & Neurology', icon: Brain, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' },
              { name: 'Infectious Diseases', icon: Virus, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' },
              { name: 'Medications', icon: Pill, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' },
              { name: 'Women\'s Health', icon: Female, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400' },
              { name: 'Children\'s Health', icon: Baby, color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' },
              { name: 'Mental Health', icon: Brain, color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' },
              { name: 'Nutrition', icon: Apple, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400' }
            ].map((topic, index) => (
              <Link
                key={index}
                to={`/health-topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className={`p-2 rounded-lg ${topic.color}`}>
                  <topic.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{topic.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-sm p-8 text-white">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-2">
                Stay Informed with Our Newsletter
              </h2>
              <p className="text-primary-100">
                Get the latest health news, research updates, and medical breakthroughs delivered to your inbox.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-l-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                />
                <button className="bg-primary-800 hover:bg-primary-900 px-4 py-3 rounded-r-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-primary-200 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsUpdates;