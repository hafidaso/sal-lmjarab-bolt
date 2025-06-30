import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Monitor, Smartphone, Laptop, Users, Shield, Clock, Globe, CheckCircle, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const VirtualCare = () => {
  const handleDemoRequest = () => {
    // In a real app, this would open a contact form or redirect to a demo page
    alert('Demo request feature coming soon! Please contact us through the Contact page.');
  };

  const handleContactSales = () => {
    // Redirect to contact page
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Virtual Point of Care Solutions
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Seamless telehealth integration and virtual care solutions that connect patients with healthcare providers anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDemoRequest}
                  className="px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Request a Demo
                </button>
                <button
                  onClick={handleContactSales}
                  className="px-6 py-3 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Benefits of Virtual Care
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Expanded Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reach patients in remote areas, those with mobility challenges, or busy individuals who can't easily visit in-person.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Increased Efficiency
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reduce no-shows, optimize provider schedules, and streamline administrative workflows with digital-first care.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Enhanced Patient Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Provide convenient, comfortable care experiences that eliminate travel time, waiting rooms, and other friction points.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Comprehensive Virtual Care Platform
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Video className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Seamless Video Consultations
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">HD Video Quality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Crystal-clear video and audio for effective virtual examinations and consultations.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">No Downloads Required</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Browser-based solution works instantly on any device without software installation.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Multi-participant Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Include family members, caregivers, or specialists in consultations as needed.
                    </p>
                  </div>
                </li>
              </ul>
              
              <button 
                onClick={() => alert('Video consultation features coming soon!')}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Integrated Scheduling
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Smart Scheduling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI-powered scheduling that optimizes provider availability and patient preferences.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Automated Reminders</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Multi-channel appointment reminders to reduce no-shows and improve attendance.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Calendar Sync</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Seamless integration with Google Calendar, Outlook, and other popular calendar systems.
                    </p>
                  </div>
                </li>
              </ul>
              
              <button 
                onClick={() => alert('Scheduling features coming soon!')}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Secure Messaging
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">HIPAA-Compliant Chat</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      End-to-end encrypted messaging for secure patient-provider communication.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">File Sharing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Secure exchange of medical documents, images, and test results.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Asynchronous Communication</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Non-urgent messaging for follow-ups, questions, and ongoing care management.
                    </p>
                  </div>
                </li>
              </ul>
              
              <button 
                onClick={() => alert('Messaging features coming soon!')}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Security & Compliance
                </h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">HIPAA Compliance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Built to meet or exceed all healthcare privacy and security requirements.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">End-to-End Encryption</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All data and communications are encrypted in transit and at rest.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Audit Trails</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comprehensive logging and monitoring of all system activities for compliance and security.
                    </p>
                  </div>
                </li>
              </ul>
              
              <button 
                onClick={() => alert('Security features coming soon!')}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-6"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Device Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Available on Any Device
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Mobile
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Native iOS and Android apps for on-the-go virtual care access.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Laptop className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Laptop
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Web-based platform optimized for laptop and desktop computers.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Desktop
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Full-featured experience for clinical settings and office use.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tablet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimized interface for tablet devices with touch controls.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Integration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Seamless Integration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Integrate with Your Existing Systems
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our virtual care platform is designed to work with your existing healthcare IT infrastructure, minimizing disruption and maximizing value.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">EHR Integration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Seamless connection with major EHR systems for unified patient records and documentation.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Practice Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Integration with scheduling, billing, and practice management systems.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">API Access</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Robust API for custom integrations and workflow automation.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Single Sign-On</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Streamlined authentication for providers and staff.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Supported Systems
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Epic', 'Cerner', 'Allscripts', 'eClinicalWorks', 'NextGen', 'Meditech',
                  'athenahealth', 'Greenway', 'McKesson', 'GE Healthcare', 'Custom Solutions'
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{system}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center">
                Don't see your system? Contact us to discuss custom integration options.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Simple Implementation Process
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-900"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                { step: 1, title: 'Needs Assessment', description: 'We work with you to understand your virtual care goals, workflows, and technical requirements.' },
                { step: 2, title: 'Solution Design', description: 'Our team designs a customized implementation plan tailored to your specific needs.' },
                { step: 3, title: 'Integration & Setup', description: 'We handle the technical integration, configuration, and testing of your virtual care platform.' },
                { step: 4, title: 'Training & Onboarding', description: 'Comprehensive training for your staff and providers to ensure successful adoption.' },
                { step: 5, title: 'Go-Live & Support', description: 'Smooth launch with dedicated support to ensure everything runs perfectly from day one.' }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900"></div>
                    
                    {/* Content */}
                    <div className="md:w-1/2 pl-8 md:pl-0 md:pr-12 md:text-right">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                        <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded-full text-sm font-medium mb-2">
                          Step {step.step}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Spacer for alternate layout */}
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Flexible Pricing Options
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Essential',
                price: '15,000',
                description: 'Basic virtual care for small practices',
                features: [
                  'Video consultations',
                  'Secure messaging',
                  'Basic scheduling',
                  'Up to 5 providers',
                  'Email support'
                ]
              },
              {
                name: 'Professional',
                price: '35,000',
                description: 'Comprehensive solution for growing practices',
                features: [
                  'All Essential features',
                  'EHR integration',
                  'Advanced scheduling',
                  'Patient portal',
                  'Up to 20 providers',
                  'Priority support',
                  'Custom branding'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'Advanced solution for hospitals and health systems',
                features: [
                  'All Professional features',
                  'Unlimited providers',
                  'Multi-location support',
                  'Advanced analytics',
                  'Custom integrations',
                  'Dedicated account manager',
                  'SLA guarantees',
                  'White-label solution'
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border ${
                  plan.popular ? 'border-primary-500 dark:border-primary-400' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white py-2 text-center text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.price} MAD
                    </span>
                    {plan.name !== 'Enterprise' && (
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => alert(`Plan details for ${plan.name} coming soon!`)}
                    className={`w-full block text-center py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-xl p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Clients Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Implementing Sal-lmjarab's virtual care solution has transformed our practice. We've expanded our patient base by 30% and significantly improved satisfaction scores.",
                name: "Dr. Hassan Alami",
                title: "Medical Director, Clinique Internationale"
              },
              {
                quote: "The platform's ease of use for both our staff and patients has made the transition to telehealth seamless. The integration with our existing systems was much smoother than expected.",
                name: "Leila Mansouri",
                title: "IT Director, CHU Ibn Sina"
              },
              {
                quote: "Our rural patients now have access to specialists without traveling hours to the city. This platform has truly democratized healthcare access in our region.",
                name: "Dr. Karim Bensouda",
                title: "Chief of Medicine, Regional Hospital of Fes"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'What technical requirements are needed for virtual care?',
                answer: 'For providers, a computer with webcam, microphone, and stable internet connection (minimum 5 Mbps) is recommended. Patients can access virtual care via smartphone, tablet, or computer with similar requirements. Our platform automatically adjusts to available bandwidth.'
              },
              {
                question: 'Is the platform compliant with healthcare regulations?',
                answer: 'Yes, our platform is fully compliant with HIPAA and other relevant healthcare privacy regulations. We implement end-to-end encryption, secure data storage, and comprehensive audit trails to ensure compliance.'
              },
              {
                question: 'Can we customize the virtual care experience with our branding?',
                answer: 'Absolutely. Our Professional and Enterprise plans include custom branding options. You can add your logo, colors, and messaging to create a seamless branded experience for your patients.'
              },
              {
                question: 'How does billing work for virtual consultations?',
                answer: 'Our platform includes integrated billing capabilities that support various payment models including insurance billing, self-pay, and subscription models. We can also integrate with your existing billing systems.'
              },
              {
                question: 'What kind of support do you provide during implementation?',
                answer: 'We provide comprehensive support throughout the implementation process, including technical setup, integration with existing systems, staff training, and go-live support. Our Professional and Enterprise plans include dedicated implementation managers.'
              },
              {
                question: 'Can patients access virtual care from mobile devices?',
                answer: 'Yes, our platform is fully mobile-responsive and we offer native iOS and Android apps for an optimized patient experience on smartphones and tablets.'
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

        {/* CTA */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Practice with Virtual Care?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
            Join the leading healthcare providers in Morocco who are using our virtual care platform to expand access, improve efficiency, and enhance patient experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDemoRequest}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Request a Demo
            </button>
            <button
              onClick={handleContactSales}
              className="px-8 py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg font-medium transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCare;