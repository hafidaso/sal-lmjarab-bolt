import React, { useState } from 'react';
import { Image, Star, Plus, Edit, Trash2, Eye, EyeOff, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  status: 'active' | 'inactive' | 'draft';
  startDate: string;
  endDate: string;
  priority: number;
}

interface FeaturedDoctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  featured: boolean;
  sponsored: boolean;
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
}

interface SponsoredContent {
  id: string;
  title: string;
  type: 'banner' | 'doctor' | 'facility' | 'article';
  advertiser: string;
  budget: number;
  spent: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

const FeaturedContentManagement = () => {
  const [activeTab, setActiveTab] = useState('banners');
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showSponsorModal, setShowSponsorModal] = useState(false);

  // Mock data
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      title: 'Find Your Perfect Doctor',
      description: 'Connect with top healthcare professionals in Morocco',
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/search',
      status: 'active',
      startDate: '2025-06-29',
      endDate: '2025-12-31',
      priority: 1
    },
    {
      id: '2',
      title: 'Special Offers',
      description: 'Get 20% off on first consultation',
      imageUrl: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/offers',
      status: 'active',
      startDate: '2025-06-15',
      endDate: '2025-05-16',
      priority: 2
    }
  ]);

  const [featuredDoctors, setFeaturedDoctors] = useState<FeaturedDoctor[]>([
    {
      id: '1',
      name: 'Dr. Ahmed Bennani',
      specialty: 'Cardiology',
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true,
      sponsored: true,
      startDate: '2025-06-29',
      endDate: '2025-12-31',
      clicks: 1250,
      impressions: 8500
    },
    {
      id: '2',
      name: 'Dr. Fatima Alaoui',
      specialty: 'Dermatology',
      rating: 4.6,
      imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true,
      sponsored: false,
      startDate: '2025-06-29',
      endDate: '2025-12-31',
      clicks: 890,
      impressions: 6200
    }
  ]);

  const [sponsoredContent, setSponsoredContent] = useState<SponsoredContent[]>([
    {
      id: '1',
      title: 'Dr. Ahmed Bennani - Cardiology',
      type: 'doctor',
      advertiser: 'Dr. Ahmed Bennani',
      budget: 5000,
      spent: 3200,
      status: 'active',
      startDate: '2025-06-29',
      endDate: '2025-12-31',
      impressions: 8500,
      clicks: 1250,
      ctr: 14.7
    },
    {
      id: '2',
      title: 'Homepage Banner - Special Offers',
      type: 'banner',
      advertiser: 'Marketing Team',
      budget: 3000,
      spent: 1800,
      status: 'active',
      startDate: '2025-06-15',
      endDate: '2025-05-16',
      impressions: 12000,
      clicks: 1800,
      ctr: 15.0
    }
  ]);

  const handleToggleBannerStatus = (bannerId: string) => {
    setBanners(prev => prev.map(banner => 
      banner.id === bannerId 
        ? { ...banner, status: banner.status === 'active' ? 'inactive' : 'active' }
        : banner
    ));
  };

  const handleToggleDoctorFeatured = (doctorId: string) => {
    setFeaturedDoctors(prev => prev.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, featured: !doctor.featured }
        : doctor
    ));
  };

  const handleToggleDoctorSponsored = (doctorId: string) => {
    setFeaturedDoctors(prev => prev.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, sponsored: !doctor.sponsored }
        : doctor
    ));
  };

  const handleToggleSponsorStatus = (sponsorId: string) => {
    setSponsoredContent(prev => prev.map(sponsor => 
      sponsor.id === sponsorId 
        ? { ...sponsor, status: sponsor.status === 'active' ? 'paused' : 'active' }
        : sponsor
    ));
  };

  const renderBannersTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Homepage Banners
          </h2>
          <button
            onClick={() => setShowBannerModal(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Banner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    banner.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : banner.status === 'inactive'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {banner.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{banner.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{banner.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span>Priority: {banner.priority}</span>
                  <span>{banner.startDate} - {banner.endDate}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleBannerStatus(banner.id)}
                    className={`px-3 py-1 rounded-md text-xs ${
                      banner.status === 'active'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {banner.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs">
                    <Edit className="w-3 h-3 inline mr-1" />
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-xs">
                    <Eye className="w-3 h-3 inline mr-1" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeaturedDoctorsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Featured Doctors
          </h2>
          <button
            onClick={() => setShowDoctorModal(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Featured Doctor</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Specialty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {featuredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={doctor.imageUrl}
                        alt={doctor.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{doctor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{doctor.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-900 dark:text-white">{doctor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleDoctorFeatured(doctor.id)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          doctor.featured
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {doctor.featured ? 'Featured' : 'Not Featured'}
                      </button>
                      <button
                        onClick={() => handleToggleDoctorSponsored(doctor.id)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          doctor.sponsored
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {doctor.sponsored ? 'Sponsored' : 'Not Sponsored'}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      <div>Clicks: {doctor.clicks}</div>
                      <div>Impressions: {doctor.impressions}</div>
                      <div>CTR: {((doctor.clicks / doctor.impressions) * 100).toFixed(1)}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs">
                        <Edit className="w-3 h-3 inline mr-1" />
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs">
                        <Trash2 className="w-3 h-3 inline mr-1" />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSponsoredContentTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Sponsored Content & Ads
          </h2>
          <button
            onClick={() => setShowSponsorModal(true)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sponsored Content</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Active Campaigns</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {sponsoredContent.filter(s => s.status === 'active').length}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-green-900 dark:text-green-100">Total Budget</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${sponsoredContent.reduce((sum, s) => sum + s.budget, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900 dark:text-yellow-100">Total Spent</h3>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              ${sponsoredContent.reduce((sum, s) => sum + s.spent, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-purple-900 dark:text-purple-100">Avg CTR</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {(sponsoredContent.reduce((sum, s) => sum + s.ctr, 0) / sponsoredContent.length).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Campaign
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Advertiser
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Budget/Spent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sponsoredContent.map((sponsor) => (
                <tr key={sponsor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{sponsor.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{sponsor.startDate} - {sponsor.endDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sponsor.type === 'banner' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      sponsor.type === 'doctor' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      sponsor.type === 'facility' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {sponsor.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{sponsor.advertiser}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      <div>Budget: ${sponsor.budget.toLocaleString()}</div>
                      <div>Spent: ${sponsor.spent.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {((sponsor.spent / sponsor.budget) * 100).toFixed(1)}% used
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleSponsorStatus(sponsor.id)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        sponsor.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : sponsor.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {sponsor.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      <div>Impressions: {sponsor.impressions.toLocaleString()}</div>
                      <div>Clicks: {sponsor.clicks.toLocaleString()}</div>
                      <div>CTR: {sponsor.ctr}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs">
                        <Edit className="w-3 h-3 inline mr-1" />
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        Analytics
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'banners', label: 'Homepage Banners', icon: Image },
              { id: 'doctors', label: 'Featured Doctors', icon: Star },
              { id: 'sponsored', label: 'Sponsored Content', icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'banners' && renderBannersTab()}
      {activeTab === 'doctors' && renderFeaturedDoctorsTab()}
      {activeTab === 'sponsored' && renderSponsoredContentTab()}

      {/* Add Banner Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Banner
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter banner title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Enter banner description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter image URL..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link URL
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter link URL..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowBannerModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                Add Banner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Featured Doctor Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Featured Doctor
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter doctor name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter specialty..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter image URL..."
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Sponsored</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDoctorModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sponsored Content Modal */}
      {showSponsorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Sponsored Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Campaign Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter campaign title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="banner">Banner</option>
                  <option value="doctor">Doctor</option>
                  <option value="facility">Facility</option>
                  <option value="article">Article</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Advertiser
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter advertiser name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget (USD)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter budget amount..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSponsorModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                Add Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedContentManagement; 