import React from 'react';
import { Database, Lock, Shield, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const HealthDataPrivacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Health Data Privacy Policy
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto text-center">
            Understanding how we protect and handle your sensitive health information.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/privacy-settings"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Privacy Settings
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your privacy preferences
            </p>
          </Link>

          <Link
            to="/privacy"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Privacy Policy
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Review our general privacy practices
            </p>
          </Link>

          <Link
            to="/advertising-policy"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Advertising Policy
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Learn about our advertising practices
            </p>
          </Link>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Health Information Protection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We implement strict measures to protect your health information:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>End-to-end encryption for all health data</li>
              <li>Secure storage and transmission protocols</li>
              <li>Regular security audits and assessments</li>
              <li>Access controls and authentication</li>
              <li>Compliance with healthcare privacy laws</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Collection and Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect and use health information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Facilitating healthcare appointments</li>
              <li>Coordinating with healthcare providers</li>
              <li>Improving healthcare services</li>
              <li>Research and analytics (with consent)</li>
              <li>Legal and regulatory compliance</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Regarding your health information, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Access your health records</li>
              <li>Request corrections to your information</li>
              <li>Receive a copy of your data</li>
              <li>Choose who can access your information</li>
              <li>Request deletion of your data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We may share your health information with:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Healthcare providers you choose</li>
              <li>Emergency services when necessary</li>
              <li>Legal authorities when required</li>
              <li>Research partners (with explicit consent)</li>
              <li>Service providers (with data protection agreements)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Security Measures
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our security infrastructure includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Advanced encryption protocols</li>
              <li>Multi-factor authentication</li>
              <li>Regular security updates</li>
              <li>Continuous monitoring</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For questions about your health data privacy:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                Data Protection Officer<br />
                Email: privacy@sal-lmjarab.com<br />
                Phone: +212 (0) 5XX-XXXXXX<br />
                Address: [Your Address], Morocco
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HealthDataPrivacy; 