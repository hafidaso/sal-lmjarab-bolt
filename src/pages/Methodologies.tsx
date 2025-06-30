import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Award, FileText, Search, Shield, CheckCircle, Users, Star, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Methodologies = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <BarChart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sal-lmjarab Methodologies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our comprehensive approach to data collection, analysis, and quality assessment
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Commitment to Accuracy and Transparency
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            At Sal-lmjarab, we believe that healthcare decisions should be based on accurate, comprehensive, and transparent information. Our methodologies are designed to provide patients with reliable data about healthcare providers, facilities, and services across Morocco.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We employ a multi-faceted approach that combines verified data from healthcare authorities, direct submissions from providers, patient feedback, and advanced analytics to create the most comprehensive healthcare resource in Morocco. All our methodologies undergo regular review by our medical advisory board and data science team to ensure they remain accurate and relevant.
          </p>
        </div>

        {/* Methodology Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Hospital & Facility Rankings
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our hospital and facility rankings are based on a comprehensive analysis of quality metrics, patient outcomes, safety measures, and patient experience data. We evaluate facilities across multiple dimensions to provide a holistic view of their performance.
            </p>
            <Link to="/methodologies/hospital-rankings" className="text-primary-600 hover:text-primary-700 font-medium">
              Learn more about our ranking methodology
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Doctor Ratings & Reviews
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our doctor ratings system combines verified patient reviews, professional credentials, peer recommendations, and practice metrics. We employ advanced sentiment analysis and verification processes to ensure authenticity and relevance.
            </p>
            <Link to="/methodologies/doctor-ratings" className="text-primary-600 hover:text-primary-700 font-medium">
              Learn more about our ratings methodology
            </Link>
          </motion.div>
        </div>

        {/* Data Collection & Verification */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Data Collection & Verification Process
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <Search className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Data Collection
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We collect data from multiple sources including official healthcare registries, direct submissions from healthcare providers, patient surveys, and public health databases. Our data collection process is continuous and comprehensive, ensuring we have the most up-to-date information available.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Verification Process
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All provider information undergoes a rigorous verification process. We verify medical licenses, practice locations, specialties, and credentials against official records. For patient reviews, we employ both automated systems and human moderation to ensure authenticity and prevent fraudulent content.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Data Quality Control
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our data science team employs advanced algorithms to identify inconsistencies, outliers, and potential errors in our database. Regular audits and cross-verification processes ensure the integrity and accuracy of all information presented on our platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI & Analytics Methodologies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            AI & Analytics Methodologies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI-Powered Search Engine
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our search algorithm uses machine learning to match patients with healthcare providers based on multiple factors including location, specialty, insurance acceptance, availability, and patient preferences. The algorithm continuously improves based on user interactions and outcomes.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  <span>Personalized matching based on patient history and preferences</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  <span>Multi-criteria optimization for balanced recommendations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  <span>Continuous learning from user feedback and outcomes</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <BarChart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Predictive Analytics
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our predictive models forecast facility capacity, wait times, and appointment availability to help patients make informed decisions. These models analyze historical patterns, real-time data, and external factors to provide accurate predictions.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  <span>Time-series forecasting for facility capacity</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  <span>Wait time estimation with 82% accuracy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                  <span>Seasonal trend analysis for healthcare demand</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quality Metrics & Evaluation Criteria
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Metrics
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data Sources
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Patient Outcomes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Mortality rates, complication rates, readmission rates
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Ministry of Health, Hospital reports
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    35%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Patient Experience
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Satisfaction scores, communication ratings, facility ratings
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Verified patient reviews, Surveys
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    25%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Safety & Quality
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Infection rates, safety protocols, medication errors
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Quality organizations, Accreditation bodies
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    20%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Expert Opinion
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Peer recognition, awards, publications
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Professional associations, Medical journals
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    15%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Technology & Innovation
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Advanced equipment, digital health adoption
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Provider submissions, Technology assessments
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    5%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Methodology Updates */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Methodology Updates & Revisions
          </h2>
          
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              Our methodologies are not static; they evolve based on new research, data availability, and healthcare trends. We are committed to continuous improvement and transparency in our methodological approach.
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  January 2025 Update
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enhanced our AI search algorithm to better account for patient-reported outcomes and geographic accessibility factors.
                </p>
              </div>
              
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  October 2023 Update
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Revised our hospital ranking methodology to include more granular specialty-specific quality metrics and patient experience data.
                </p>
              </div>
              
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  July 2023 Update
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Implemented advanced sentiment analysis for patient reviews to better capture nuanced feedback and identify trending issues.
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/methodologies/updates" className="text-primary-600 hover:text-primary-700 font-medium">
                View all methodology updates
              </Link>
            </div>
          </div>
        </div>

        {/* Advisory Board */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Medical & Data Advisory Board
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our methodologies are developed and regularly reviewed by our advisory board, consisting of healthcare professionals, data scientists, and patient advocates. This multidisciplinary approach ensures our methods are clinically relevant, statistically sound, and patient-centered.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Prof. Hassan Alami', title: 'Chief of Medicine, University Hospital of Rabat', specialty: 'Public Health' },
              { name: 'Dr. Nadia Benkirane', title: 'Director of Quality, Ministry of Health', specialty: 'Healthcare Quality' },
              { name: 'Dr. Youssef El Ouardi', title: 'Data Science Director, National Institute of Statistics', specialty: 'Medical Informatics' }
            ].map((advisor, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {advisor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {advisor.title}
                </p>
                <p className="text-xs text-primary-600 dark:text-primary-400">
                  Specialty: {advisor.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: 'How often are your rankings updated?',
                answer: 'Our rankings are updated annually with the most recent data available. However, we continuously collect data and may update specific metrics more frequently as new information becomes available.'
              },
              {
                question: 'How do you verify patient reviews?',
                answer: 'We employ a multi-step verification process that includes email verification, appointment confirmation checks, and both automated and human moderation to ensure authenticity and prevent fraudulent reviews.'
              },
              {
                question: 'How can healthcare providers submit corrections to their information?',
                answer: 'Providers can claim their profile and submit corrections through our provider portal. All submissions are reviewed by our data team before being published.'
              },
              {
                question: 'Do you accept advertising from healthcare providers?',
                answer: 'Yes, we offer advertising opportunities, but we maintain a strict separation between our ranking methodologies and advertising relationships. Advertising status has no impact on rankings or ratings.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
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

export default Methodologies;