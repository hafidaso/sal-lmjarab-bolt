import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Settings, Database, Bell } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto text-center">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
              Customize your privacy preferences and manage your data
            </p>
          </Link>

          <Link
            to="/advertising-policy"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Advertising Policy
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Learn about our advertising practices and your choices
            </p>
          </Link>

          <Link
            to="/health-data-privacy"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Health Data Privacy
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Special protections for your health information
            </p>
          </Link>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Personal information (name, email, phone number)</li>
              <li>Health information you choose to share</li>
              <li>Account credentials</li>
              <li>Communication preferences</li>
              <li>Device and usage information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Process your appointments and requests</li>
              <li>Send important notifications and updates</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Protection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about our Privacy Policy or how we handle your information, please contact our Data Protection Officer at:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
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

export default PrivacyPolicy;