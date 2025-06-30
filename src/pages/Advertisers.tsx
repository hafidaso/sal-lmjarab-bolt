import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Target, Users, Globe, Zap, Award, CheckCircle, ArrowRight, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Advertisers = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Life Sciences Advertising Solutions
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Connect with healthcare professionals and patients across Morocco through targeted, compliant advertising on the country's leading healthcare platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/advertisers/contact"
                  className="px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/advertisers/media-kit"
                  className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Download Media Kit
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Advertise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Advertise on Sal-lmjarab?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Targeted Audience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reach over 500,000 patients and 15,000+ healthcare professionals actively engaged in healthcare decisions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Precision Targeting
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Target by specialty, condition, location, and patient demographics to ensure your message reaches the right audience.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Measurable Results
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive analytics and reporting to track campaign performance, engagement, and ROI in real-time.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Audience Reach */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Audience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Healthcare Professionals
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Physicians</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">8,500+</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Specialists</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">6,200+</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Pharmacists</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">3,800+</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Nurses</span>
                  <div className="w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">2,500+</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Top Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Dermatology', 'Orthopedics', 'Gynecology', 'Endocrinology'].map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Patient Demographics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Age Distribution</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { age: '18-24', percentage: 15 },
                      { age: '25-34', percentage: 28 },
                      { age: '35-44', percentage: 22 },
                      { age: '45-54', percentage: 18 },
                      { age: '55+', percentage: 17 }
                    ].map((group, index) => (
                      <div key={index} className="text-center">
                        <div className="mb-2 h-24 bg-gray-200 dark:bg-gray-700 rounded-t-lg relative">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg"
                            style={{ height: `${group.percentage * 2}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-700 dark:text-gray-300">{group.age}</div>
                        <div className="text-xs font-medium text-gray-900 dark:text-white">{group.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Geographic Distribution</h4>
                  <div className="space-y-2">
                    {[
                      { region: 'Casablanca-Settat', percentage: 35 },
                      { region: 'Rabat-Salé-Kénitra', percentage: 22 },
                      { region: 'Marrakech-Safi', percentage: 15 },
                      { region: 'Fès-Meknès', percentage: 12 },
                      { region: 'Other Regions', percentage: 16 }
                    ].map((region, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300 w-40">{region.region}</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${region.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-10">{region.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advertising Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Advertising Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Targeted Display Ads
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Premium display advertising across our platform, targeted by specialty, condition, location, and user intent.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Search results placement</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Condition page advertising</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Specialty-targeted banners</span>
                </li>
              </ul>
              <Link to="/advertisers/display" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Educational Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sponsored educational content that provides value to healthcare professionals and patients while promoting your brand.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Sponsored articles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Disease awareness content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Treatment option guides</span>
                </li>
              </ul>
              <Link to="/advertisers/content" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                HCP Engagement
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Targeted advertising and educational resources specifically for healthcare professionals on our platform.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">HCP-only content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Clinical resource libraries</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-400">Sponsored medical updates</span>
                </li>
              </ul>
              <Link to="/advertisers/hcp" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Case Study</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Leading Pharmaceutical Company Increases Brand Awareness by 45%
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  A targeted campaign for a new diabetes medication reached over 200,000 relevant patients and 3,000 endocrinologists, resulting in a 45% increase in brand awareness and 32% increase in prescription inquiries.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>Pharmaceutical</span>
                  </div>
                  <Link to="/case-studies/pharma-awareness" className="text-primary-600 hover:text-primary-700 font-medium">
                    Read Case Study
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Case Study</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Medical Device Company Achieves 3X ROI on Educational Campaign
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  A sponsored educational content series about innovative cardiac devices reached 5,000+ cardiologists and cardiac surgeons, generating 350+ qualified leads and a 3X return on advertising investment.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>Medical Devices</span>
                  </div>
                  <Link to="/case-studies/device-education" className="text-primary-600 hover:text-primary-700 font-medium">
                    Read Case Study
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Regulatory Compliance
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Our Commitment to Compliant Advertising
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We understand the complex regulatory environment for life sciences advertising. Our platform is designed to help you reach your target audience while maintaining full compliance with all applicable regulations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Regulatory Expertise
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Our team includes regulatory experts who ensure all advertising content meets Moroccan pharmaceutical advertising regulations and industry standards.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pre-approval review process</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Compliance documentation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Regulatory guidance</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Audience Segmentation
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Our platform enables precise audience targeting to ensure prescription drug advertising only reaches appropriate healthcare professionals.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">HCP verification system</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Content gating for Rx messaging</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Appropriate audience targeting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Ready to Get Started?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Schedule a Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Meet with our advertising specialists to discuss your goals and explore solutions.
              </p>
              <Link
                to="/advertisers/schedule"
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Book a Meeting
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Request Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get our detailed media kit with audience data, ad specifications, and pricing.
              </p>
              <Link
                to="/advertisers/media-kit"
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Request Media Kit
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Contact Sales
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Speak directly with our advertising team to discuss your specific needs.
              </p>
              <Link
                to="/advertisers/contact"
                className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-xl p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Advertisers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Sal-lmjarab's targeted advertising platform has been instrumental in reaching the right healthcare professionals for our new product launch.",
                name: "Karim Bensouda",
                title: "Marketing Director, PharmaMed Morocco"
              },
              {
                quote: "The ROI we've seen from our educational content campaigns has exceeded our expectations. The platform's ability to segment audiences is exceptional.",
                name: "Leila Mansouri",
                title: "Digital Marketing Manager, MedTech Solutions"
              },
              {
                quote: "The compliance support provided by the Sal-lmjarab team has made advertising our prescription products seamless and worry-free.",
                name: "Dr. Yasmine Alami",
                title: "Medical Affairs Director, Global Pharma"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg">
                <p className="italic mb-4 text-primary-100">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-200">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'What types of ads can I run on Sal-lmjarab?',
                answer: 'We offer a variety of ad formats including display banners, sponsored content, email campaigns, and targeted HCP messaging. Our team can help you select the best formats for your specific goals.'
              },
              {
                question: 'How do you ensure my ads reach the right audience?',
                answer: 'We use a combination of user profiles, search behavior, specialty information, and AI-powered matching to ensure your ads reach the most relevant audience. We can target by specialty, condition, location, and user intent.'
              },
              {
                question: 'What reporting and analytics do you provide?',
                answer: 'We provide comprehensive real-time analytics including impressions, clicks, engagement rates, conversion metrics, and ROI calculations. Our dashboard allows you to track campaign performance and make data-driven optimizations.'
              },
              {
                question: 'How do you handle regulatory compliance for pharmaceutical ads?',
                answer: 'Our platform is designed with pharmaceutical compliance in mind. We have built-in tools for fair balance, important safety information, and audience verification. Our regulatory team reviews all pharmaceutical ads before they go live.'
              },
              {
                question: 'What is the minimum budget for advertising campaigns?',
                answer: 'Our advertising packages start at 25,000 MAD per month, with flexible options based on your goals and target audience. We work with companies of all sizes and can customize solutions to fit your budget.'
              },
              {
                question: 'Can you help with creative development?',
                answer: 'Yes, our creative services team can assist with ad design, content creation, and optimization to ensure your campaigns are effective and compliant. This service is available for an additional fee.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisers;