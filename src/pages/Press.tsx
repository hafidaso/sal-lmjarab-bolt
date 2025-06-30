import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar, ExternalLink, Mail, Phone, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Press = () => {
  const pressReleases = [
    {
      id: '1',
      title: 'Sal-lmjarab Launches AI-Powered Healthcare Platform in Morocco',
      date: '2025-06-15',
      summary: 'Innovative platform connects patients with healthcare providers using advanced AI technology.',
      category: 'Product Launch'
    },
    {
      id: '2',
      title: 'Sal-lmjarab Secures $10M in Series A Funding to Expand Healthcare Access',
      date: '2023-11-20',
      summary: 'Investment will accelerate growth and enhance AI capabilities for improved healthcare matching.',
      category: 'Funding'
    },
    {
      id: '3',
      title: 'Sal-lmjarab Partners with Ministry of Health to Improve Rural Healthcare Access',
      date: '2023-09-05',
      summary: 'Strategic partnership aims to bring quality healthcare services to underserved communities.',
      category: 'Partnership'
    },
    {
      id: '4',
      title: 'Sal-lmjarab Introduces Predictive Analytics for Hospital Capacity Management',
      date: '2023-07-12',
      summary: 'New feature helps patients find available healthcare facilities in real-time.',
      category: 'Feature Launch'
    }
  ];

  const mediaAppearances = [
    {
      id: '1',
      outlet: 'Morocco Today',
      title: 'How Technology is Transforming Healthcare Access in Morocco',
      date: '2025-06-10',
      link: '#'
    },
    {
      id: '2',
      outlet: 'Tech Maghreb',
      title: 'Sal-lmjarab: The Moroccan Startup Revolutionizing Healthcare',
      date: '2025-06-05',
      link: '#'
    },
    {
      id: '3',
      outlet: 'Healthcare Innovation',
      title: 'AI in Healthcare: Sal-lmjarab Case Study',
      date: '2025-05-16',
      link: '#'
    }
  ];

  const pressKitItems = [
    { name: 'Company Fact Sheet', type: 'PDF', size: '1.2 MB' },
    { name: 'Brand Guidelines', type: 'PDF', size: '3.5 MB' },
    { name: 'Executive Headshots', type: 'ZIP', size: '8.7 MB' },
    { name: 'Product Screenshots', type: 'ZIP', size: '12.4 MB' },
    { name: 'Company Logo Pack', type: 'ZIP', size: '5.2 MB' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Press Room
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Latest news, press releases, and media resources from Sal-lmjarab
          </p>
        </div>

        {/* Press Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Press Contact
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                For press inquiries, interview requests, or additional information, please contact our media relations team.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">press@sal-lmjarab.ma</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">+212 522 XXX XXX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-700 dark:text-gray-300">www.sal-lmjarab.ma/press</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Media Spokesperson
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-xl font-semibold">SA</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Sarah Amrani</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Director of Communications</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                    Available for interviews in Arabic, French, and English
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Press Releases
            </h2>
            <Link to="/press/all" className="text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded-full text-xs font-medium">
                        {release.category}
                      </span>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {release.date}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {release.summary}
                    </p>
                    <Link to={`/press/release/${release.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Read Full Release
                    </Link>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Media Appearances */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Media Appearances
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaAppearances.map((appearance, index) => (
              <motion.div
                key={appearance.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
              >
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {appearance.outlet} • {appearance.date}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {appearance.title}
                </h3>
                <a 
                  href={appearance.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  <span>Read Article</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Press Kit */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Press Kit
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Download official Sal-lmjarab assets, including logos, executive photos, product screenshots, and fact sheets for media use.
          </p>
          
          <div className="space-y-4 mb-6">
            {pressKitItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.type} • {item.size}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-medium transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
          
          <button className="w-full md:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Complete Press Kit (30.5 MB)</span>
          </button>
        </div>

        {/* In the News */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sal-lmjarab in the News
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Video Thumbnail</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Interview: How Sal-lmjarab is Transforming Healthcare in Morocco
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                2M TV • January 10, 2025
              </p>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Watch Video
              </button>
            </div>
            
            <div>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Video Thumbnail</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Feature: The Future of Digital Health in North Africa
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Al Jazeera • December 5, 2023
              </p>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Upcoming Events
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span>February 15-17, 2025</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Digital Health Summit Morocco 2025
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Casablanca, Morocco
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Our CEO Dr. Mohammed El Fassi will be delivering a keynote on "AI-Driven Healthcare Transformation in North Africa."
              </p>
              <Link to="/events/digital-health-summit" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <span>Event Details</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="border-l-4 border-primary-500 pl-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span>March 8, 2025</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Press Conference: Q1 2025 Growth Report
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Rabat, Morocco
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Join us for the announcement of our Q1 2025 results and strategic initiatives for the coming year.
              </p>
              <Link to="/events/q1-press-conference" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <span>Event Details</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;