import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, BarChart, Award, Shield, Zap, Heart, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HealthSystems = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Sal-lmjarab for Health Systems
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Comprehensive solutions to enhance patient experience, optimize operations, and improve healthcare outcomes across your entire system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/health-systems/demo"
                  className="px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Request a Demo
                </Link>
                <Link
                  to="/health-systems/contact"
                  className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Key Benefits for Health Systems
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
                Enhanced Patient Acquisition
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Increase visibility and attract new patients through our AI-powered search and matching algorithms that connect patients with the right providers in your network.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Operational Efficiency
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Streamline appointment scheduling, reduce no-shows, and optimize resource allocation with our predictive analytics and capacity management tools.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Improved Patient Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enhance patient satisfaction with seamless digital experiences, personalized care journeys, and real-time communication tools that keep patients engaged and informed.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Solutions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Comprehensive Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Building className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  System-Wide Digital Presence
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Enhanced System Profiles</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Showcase your entire health system with comprehensive profiles for all facilities, departments, and providers.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Unified Brand Experience</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Present a consistent brand identity across all digital touchpoints while highlighting the unique strengths of each facility.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Specialty Promotion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Highlight centers of excellence and specialty services with dedicated landing pages and enhanced visibility.
                    </p>
                  </div>
                </li>
              </ul>
              
              <Link to="/health-systems/digital-presence" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <BarChart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advanced Analytics & Insights
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Predictive Capacity Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Forecast patient demand and optimize resource allocation across your entire system.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Patient Sentiment Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Gain actionable insights from patient feedback across all facilities and departments.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Performance Benchmarking</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Compare performance metrics across facilities and against national standards to identify improvement opportunities.
                    </p>
                  </div>
                </li>
              </ul>
              
              <Link to="/health-systems/analytics" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Patient Engagement Platform
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Unified Appointment Booking</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Centralized scheduling system that directs patients to the right facility and provider within your network.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Secure Messaging</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      HIPAA-compliant communication tools that connect patients with their care teams.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Patient Education Hub</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Customizable content library with condition-specific information and care instructions.
                    </p>
                  </div>
                </li>
              </ul>
              
              <Link to="/health-systems/patient-engagement" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Reputation Management
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Review Monitoring & Response</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Centralized dashboard to monitor, respond to, and analyze patient reviews across all facilities.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Quality Metrics Showcase</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Highlight your system's quality achievements, accreditations, and patient outcomes.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Crisis Management Tools</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Proactive alerts and response templates for managing reputation during critical situations.
                    </p>
                  </div>
                </li>
              </ul>
              
              <Link to="/health-systems/reputation" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Hospital building"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Case Study</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  CHU Ibn Rochd: 35% Increase in New Patient Acquisition
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  How Morocco's largest university hospital system transformed its digital presence and patient engagement strategy.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Building className="w-4 h-4" />
                    <span>University Hospital</span>
                  </div>
                  <Link to="/case-studies/chu-ibn-rochd" className="text-primary-600 hover:text-primary-700 font-medium">
                    Read Case Study
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src="https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Modern clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Case Study</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Clinique Al Andalous: Reducing No-Shows by 42%
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  How predictive analytics and automated reminders transformed appointment management for a multi-specialty clinic network.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Building className="w-4 h-4" />
                    <span>Private Clinic Network</span>
                  </div>
                  <Link to="/case-studies/clinique-al-andalous" className="text-primary-600 hover:text-primary-700 font-medium">
                    Read Case Study
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration & Implementation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Seamless Integration & Implementation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our platform integrates with your existing EHR, CRM, and scheduling systems through secure APIs and standard protocols.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Dedicated Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our implementation team works closely with your staff to ensure a smooth transition and provides ongoing support.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                HIPAA Compliant
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our platform is built with security and compliance at its core, ensuring all patient data is protected according to industry standards.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            What Healthcare Leaders Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <img
                    src="https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Dr. Hassan Alami"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Dr. Hassan Alami</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CIO, University Hospital of Rabat</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Implementing Sal-lmjarab across our hospital network has transformed how patients discover and engage with our services. The AI-powered matching has significantly improved our specialty department utilization and patient satisfaction scores."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <img
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Dr. Fatima Benkirane"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Dr. Fatima Benkirane</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CEO, Clinique Internationale de Casablanca</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "The predictive analytics capabilities have been game-changing for our resource allocation. We've reduced wait times by 35% while increasing patient volume by 22%. The ROI has exceeded our expectations within the first year."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Health System Today
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join the leading healthcare systems in Morocco that are using Sal-lmjarab to enhance patient experience, streamline operations, and improve outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/health-systems/demo"
              className="px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Schedule a Demo
            </Link>
            <Link
              to="/health-systems/contact"
              className="px-8 py-4 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSystems;