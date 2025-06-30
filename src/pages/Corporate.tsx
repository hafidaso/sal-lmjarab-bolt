import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Globe, Award, Shield, Zap, FileText, BarChart, Briefcase, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Corporate = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sal-lmjarab Corporate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transforming healthcare access and delivery across Morocco through innovative technology solutions
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                At Sal-lmjarab, our mission is to revolutionize healthcare access in Morocco by connecting patients with the right healthcare providers through innovative technology. We believe that everyone deserves access to quality healthcare, regardless of location or socioeconomic status.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to improving healthcare outcomes by providing transparent information, verified reviews, and seamless appointment booking, empowering patients to make informed healthcare decisions while helping providers grow their practices.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We envision a future where every Moroccan citizen has immediate access to the best healthcare services tailored to their specific needs. A future where technology bridges the gap between patients and providers, creating a more efficient, transparent, and accessible healthcare ecosystem.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                By 2030, we aim to be the leading healthcare platform in North Africa, setting new standards for digital health innovation and patient-centered care.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously innovate with AI and technology to solve healthcare challenges and improve access to quality care.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Leadership Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
                title: 'Chief Operating Officer',
                bio: 'Healthcare administrator with experience in both public and private sectors.',
                image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
            ].map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {leader.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-3">
                  {leader.title}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {leader.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investors & Partners */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Investors & Partners
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="flex items-center justify-center h-24 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="text-center">
                  <Building className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Partner Logo</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Responsibility */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Corporate Responsibility
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Healthcare Access Initiative
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our program to bring healthcare services to underserved rural communities across Morocco through mobile clinics and telehealth solutions.
              </p>
              <Link to="/initiatives/healthcare-access" className="text-primary-600 hover:text-primary-700 font-medium">
                Learn More
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Environmental Sustainability
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our commitment to reducing our carbon footprint through paperless operations, renewable energy, and sustainable business practices.
              </p>
              <Link to="/initiatives/sustainability" className="text-primary-600 hover:text-primary-700 font-medium">
                Learn More
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Health Education Program
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our initiative to improve health literacy through educational content, workshops, and community outreach programs.
              </p>
              <Link to="/initiatives/health-education" className="text-primary-600 hover:text-primary-700 font-medium">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Careers Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-sm p-8 mb-16 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Join Our Team
              </h2>
              <p className="text-primary-100 mb-6">
                We're looking for passionate individuals to help us transform healthcare in Morocco. Explore career opportunities and become part of our mission.
              </p>
              <Link
                to="/careers"
                className="inline-block px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                View Open Positions
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Briefcase, label: 'Competitive Salary' },
                { icon: Globe, label: 'Remote Work Options' },
                { icon: Users, label: 'Collaborative Culture' },
                { icon: Zap, label: 'Growth Opportunities' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/10 p-4 rounded-lg">
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Annual Reports */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Annual Reports & Publications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { year: '2023', title: 'Annual Impact Report', pages: 48 },
              { year: '2022', title: 'Annual Impact Report', pages: 42 },
              { year: '2021', title: 'Annual Impact Report', pages: 36 }
            ].map((report, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {report.year} {report.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {report.pages} pages
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Online
                  </button>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch with Our Corporate Team
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
            For investor relations, partnership opportunities, press inquiries, or other corporate matters, our team is ready to assist you.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Corporate;