import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Star,
  Search,
  MapPin,
  Filter,
  ChevronRight,
  Building,
  Shield,
  Heart,
  Activity,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Hospital {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  awards: string[];
  image: string;
}

const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'Ibn Sina University Hospital',
    location: 'Rabat',
    rating: 4.8,
    reviews: 524,
    specialties: ['Cardiology', 'Neurology', 'Oncology'],
    awards: ['Excellence in Patient Care 2023', 'Top Hospital in Morocco 2023'],
    image:
      'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    name: 'Mohammed VI University Hospital',
    location: 'Marrakech',
    rating: 4.7,
    reviews: 412,
    specialties: ['Orthopedics', 'Pediatrics', 'Surgery'],
    awards: [
      'Patient Safety Excellence Award 2023',
      'Best Teaching Hospital 2023',
    ],
    image:
      'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    name: 'Hassan II University Hospital',
    location: 'Fes',
    rating: 4.6,
    reviews: 378,
    specialties: ['Cardiology', 'Gastroenterology', 'Urology'],
    awards: [
      'Healthcare Innovation Award 2023',
      'Quality Leadership Award 2023',
    ],
    image:
      'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const categories = [
  'All Awards',
  'Patient Care Excellence',
  'Quality & Safety',
  'Innovation',
  'Teaching Excellence',
  'Research Achievement',
  'Environmental Sustainability',
];

const HospitalAwards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Awards');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hospital Awards & Ratings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover Morocco's top-rated hospitals and their achievements in
            healthcare excellence
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hospitals..."
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

        {/* Award Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Award Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Patient Care Excellence', count: 45 },
              { icon: Shield, title: 'Quality & Safety', count: 38 },
              { icon: Activity, title: 'Innovation', count: 29 },
              { icon: Building, title: 'Teaching Excellence', count: 24 },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <category.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.count} hospitals
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Hospitals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Award-Winning Hospitals
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hospitals.map((hospital) => (
              <Link
                key={hospital.id}
                to={`/hospital/${hospital.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {hospital.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{hospital.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {hospital.rating}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          ({hospital.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Recent Awards:
                      </h4>
                      <ul className="space-y-1">
                        {hospital.awards.map((award, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                          >
                            <Award className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAwards;
