import React from 'react';
import { Heart, Users, Globe, Award, CheckCircle, Star, Shield, Zap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Dr. Mohammed El Fassi',
      title: 'Founder & CEO',
      bio: 'Cardiologist with 20+ years of experience and a passion for improving healthcare accessibility in Morocco.',
      image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Leila Benjelloun',
      title: 'Chief Technology Officer',
      bio: 'Former Google engineer with expertise in AI and healthcare technology solutions.',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Dr. Karim Tazi',
      title: 'Chief Medical Officer',
      bio: 'Public health specialist focused on quality metrics and healthcare standards.',
      image: 'https://images.pexels.com/photos/5215011/pexels-photo-5215011.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Amina Benali',
      title: 'Head of Operations',
      bio: 'Healthcare administrator with experience in both public and private sectors.',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Sal-lmjarab was established with a mission to transform healthcare access in Morocco.'
    },
    {
      year: '2021',
      title: 'Initial Platform Launch',
      description: 'First version of the platform launched with doctor search and appointment booking.'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Introduced AI-powered search and chatbot assistance for users.'
    },
    {
      year: '2023',
      title: 'National Expansion',
      description: 'Expanded coverage to all major cities in Morocco with 5,000+ healthcare providers.'
    },
    {
      year: '2025',
      title: 'Advanced Analytics',
      description: 'Launched predictive analytics and sentiment analysis for improved healthcare insights.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Sal-lmjarab
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Connecting Morocco with Quality Healthcare through AI Innovation
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                At Sal-lmjarab, we're on a mission to revolutionize healthcare access in Morocco by connecting patients with the right healthcare providers through innovative technology.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We believe that everyone deserves access to quality healthcare, regardless of location or socioeconomic status. Our platform leverages artificial intelligence to match patients with healthcare providers based on their specific needs, insurance coverage, and preferences.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By providing transparent information, verified reviews, and seamless appointment booking, we empower patients to make informed healthcare decisions while helping providers grow their practices and improve patient care.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Healthcare professionals"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Patient-Centered
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We put patients first in everything we do, designing our platform to address their needs and improve their healthcare journey.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Trust & Transparency
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We verify all healthcare providers and ensure transparent information about qualifications, services, and patient experiences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously innovate with AI and technology to solve healthcare challenges and improve access to quality care.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Inclusivity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to making healthcare accessible to all Moroccans, regardless of location, language, or socioeconomic status.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Meet Our Leadership Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-3">
                  {member.title}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Journey
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-900"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900"></div>
                    
                    {/* Content */}
                    <div className="md:w-1/2 pl-8 md:pl-0 md:pr-12 md:text-right">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded-full text-sm font-medium mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {milestone.description}
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

        {/* Impact & Stats */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-sm p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Impact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500,000+</div>
              <p className="text-primary-100">Registered Users</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <p className="text-primary-100">Verified Healthcare Providers</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1.2M+</div>
              <p className="text-primary-100">Appointments Booked</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">20+</div>
              <p className="text-primary-100">Cities Across Morocco</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            What People Say About Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "Sal-lmjarab made it so easy to find a specialist for my mother. The verified reviews helped us choose the right doctor, and booking an appointment was seamless."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">F</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Fatima K.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "As a cardiologist, this platform has transformed my practice. I've been able to reach more patients and the online appointment system has reduced no-shows significantly."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">D</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dr. Ahmed B.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cardiologist</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "The AI chatbot helped me understand my symptoms and find the right specialist. I was able to book an appointment immediately and get the care I needed."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">Y</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Youssef M.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Where We Operate
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Coverage
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Sal-lmjarab currently operates in 20+ cities across Morocco, with plans to expand to all regions of the country. Our platform connects patients with healthcare providers in major urban centers and increasingly in smaller communities.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">Headquarters: Casablanca</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Major coverage: Casablanca, Rabat, Marrakech, Fes, Tangier</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Growing presence: Agadir, Oujda, Meknes, Tetouan</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Expanding to: Smaller cities and rural areas</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Interactive map would be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Join Us in Transforming Healthcare in Morocco
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
            Whether you're a patient seeking quality care or a healthcare provider looking to grow your practice, Sal-lmjarab is here to connect you with the right resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Create an Account
            </a>
            <a
              href="/claim-profile"
              className="px-6 py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg font-medium transition-colors"
            >
              Claim Your Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;