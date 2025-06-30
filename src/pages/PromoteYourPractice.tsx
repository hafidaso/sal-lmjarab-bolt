import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Star,
  Users,
  TrendingUp,
  Calendar,
  MessageSquare,
  BarChart2,
  Shield,
  Award,
  ChevronRight,
  Megaphone,
  CheckCircle,
  Globe,
  Building,
  Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PromoteYourPractice = () => {
  const [selectedInterval, setSelectedInterval] = useState<
    'monthly' | 'yearly'
  >('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: PricingPlan[] = [
    {
      name: 'Basic',
      price: selectedInterval === 'monthly' ? '299' : '2990',
      description: 'Essential tools to enhance your online presence',
      features: [
        'Enhanced profile listing',
        'Basic appointment scheduling',
        'Patient reviews management',
        'Monthly performance reports',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      price: selectedInterval === 'monthly' ? '599' : '5990',
      description: 'Advanced features for growing practices',
      features: [
        'All Basic features',
        'Priority search placement',
        'Advanced analytics dashboard',
        'Online reputation management',
        'Dedicated account manager',
        'Phone & email support',
        'Custom profile branding',
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: selectedInterval === 'monthly' ? '999' : '9990',
      description: 'Complete solution for established practices',
      features: [
        'All Professional features',
        'Featured provider status',
        'Marketing campaign tools',
        'Patient engagement platform',
        'Integration with EMR systems',
        '24/7 priority support',
        'Custom reporting',
        'Staff training sessions',
      ],
    },
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6 text-primary-600" />,
      title: 'Reach More Patients',
      description:
        'Connect with thousands of potential patients actively searching for healthcare providers.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary-600" />,
      title: 'Grow Your Practice',
      description:
        'Access tools and insights to help your practice thrive and expand.',
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary-600" />,
      title: 'Streamline Scheduling',
      description:
        'Reduce no-shows and efficiently manage appointments with our booking system.',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary-600" />,
      title: 'Enhance Patient Communication',
      description:
        'Stay connected with patients through secure messaging and automated reminders.',
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-primary-600" />,
      title: 'Track Performance',
      description:
        'Access detailed analytics and insights to optimize your practice growth.',
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-600" />,
      title: 'Build Trust',
      description:
        'Showcase your credentials and patient reviews to build credibility.',
    },
  ];

  const features = [
    {
      icon: <Building className="w-6 h-6 text-primary-600" />,
      title: 'Professional Profile',
      description:
        'Create a comprehensive profile highlighting your expertise, services, and facilities.',
    },
    {
      icon: <Users className="w-6 h-6 text-primary-600" />,
      title: 'Patient Reviews',
      description:
        'Collect and showcase authentic patient reviews and testimonials.',
    },
    {
      icon: <Award className="w-6 h-6 text-primary-600" />,
      title: 'Credentials Display',
      description:
        'Showcase your qualifications, certifications, and specializations.',
    },
    {
      icon: <Heart className="w-6 h-6 text-primary-600" />,
      title: 'Patient Engagement',
      description:
        'Tools to interact with patients and manage appointments effectively.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <Megaphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Promote Your Practice
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Expand your reach and grow your practice with our comprehensive
            marketing solutions
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-all ${
                  selectedPlan === plan.name ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedInterval === 'monthly' ? 'MAD ' : 'MAD '}
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    selectedPlan === plan.name
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Grow Your Practice?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of healthcare providers who are already growing their
            practice with Sal-lmjarab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Get Started Now
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-medium rounded-lg transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoteYourPractice;
