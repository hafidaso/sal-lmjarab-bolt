import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Stethoscope,
  Calendar,
  Pill,
  Play,
  ChevronRight,
  Heart,
  Activity,
  Thermometer,
  Scissors,
  Eye,
  Bone,
  Shield,
  Wind,
  Brain,
  Sun,
} from 'lucide-react';

const HealthAZ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const conditions = [
    { name: 'Back Pain', icon: <Activity className="w-6 h-6" />, slug: 'back-pain' },
    { name: 'Cancer', icon: <Thermometer className="w-6 h-6" />, slug: 'cancer' },
    { name: 'Diabetes', icon: <Activity className="w-6 h-6" />, slug: 'diabetes' },
    { name: 'High Blood Pressure', icon: <Heart className="w-6 h-6" />, slug: 'high-blood-pressure' },
    { name: 'Skin Conditions', icon: <Sun className="w-6 h-6" />, slug: 'skin-conditions' },
  ];

  const procedures = [
    { name: 'Angioplasty', icon: <Heart className="w-6 h-6" />, slug: 'angioplasty' },
    { name: 'Cataract Surgery', icon: <Eye className="w-6 h-6" />, slug: 'cataract-surgery' },
    { name: 'Knee Replacement', icon: <Bone className="w-6 h-6" />, slug: 'knee-replacement' },
    { name: 'Mohs Surgery', icon: <Scissors className="w-6 h-6" />, slug: 'mohs-surgery' },
    { name: 'Shoulder Surgery', icon: <Bone className="w-6 h-6" />, slug: 'shoulder-surgery' },
  ];

  const appointmentGuides = [
    { name: 'Asthma', icon: <Wind className="w-6 h-6" />, slug: 'asthma' },
    { name: 'COPD', icon: <Wind className="w-6 h-6" />, slug: 'copd' },
    { name: 'Depression', icon: <Brain className="w-6 h-6" />, slug: 'depression' },
    { name: 'Psoriasis', icon: <Sun className="w-6 h-6" />, slug: 'psoriasis' },
    { name: 'Rheumatoid Arthritis', icon: <Bone className="w-6 h-6" />, slug: 'rheumatoid-arthritis' },
  ];

  const popularDrugs = [
    { name: 'Acetaminophen', category: 'Pain Relief', slug: 'acetaminophen' },
    { name: 'Amoxicillin', category: 'Antibiotics', slug: 'amoxicillin' },
    { name: 'Lisinopril', category: 'Blood Pressure', slug: 'lisinopril' },
    { name: 'Metformin', category: 'Diabetes', slug: 'metformin' },
    { name: 'Omeprazole', category: 'Acid Reflux', slug: 'omeprazole' },
  ];

  const trendingVideos = [
    { title: 'Understanding Diabetes Management', duration: '5:30', slug: 'diabetes-management' },
    { title: 'Heart Health Basics', duration: '4:45', slug: 'heart-health' },
    { title: 'Mental Health Awareness', duration: '6:15', slug: 'mental-health' },
    { title: 'Healthy Living Tips', duration: '3:50', slug: 'healthy-living' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Health A to Z
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conditions, procedures, or medications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Learn About Conditions */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Learn About Conditions
            </h2>
            <Link
              to="/conditions"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
            >
              See All Conditions
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition) => (
              <Link
                key={condition.slug}
                to={`/conditions/${condition.slug}`}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                    {condition.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {condition.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Learn About Procedures */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Stethoscope className="w-6 h-6 mr-2" />
              Learn About Procedures
            </h2>
            <Link
              to="/procedures"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
            >
              See All Procedures
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procedures.map((procedure) => (
              <Link
                key={procedure.slug}
                to={`/procedures/${procedure.slug}`}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                    {procedure.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {procedure.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Appointment Guides */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Appointment Guides
            </h2>
            <Link
              to="/appointment-guides"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
            >
              See All Guides
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointmentGuides.map((guide) => (
              <Link
                key={guide.slug}
                to={`/appointment-guides/${guide.slug}`}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {guide.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Drugs A-Z */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Pill className="w-6 h-6 mr-2" />
              Popular Medications
            </h2>
            <Link
              to="/drugs-az"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
            >
              See All Medications
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDrugs.map((drug) => (
              <Link
                key={drug.slug}
                to={`/drugs/${drug.slug}`}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {drug.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {drug.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Videos */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Play className="w-6 h-6 mr-2" />
              Trending Videos
            </h2>
            <Link
              to="/videos"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
            >
              See All Videos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingVideos.map((video) => (
              <Link
                key={video.slug}
                to={`/videos/${video.slug}`}
                className="group"
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {video.duration}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HealthAZ; 