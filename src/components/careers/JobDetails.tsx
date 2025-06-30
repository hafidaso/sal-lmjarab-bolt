import React from 'react';
import { ArrowLeft, MapPin, Clock, Briefcase, Building } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface JobDetailsProps {
  onBack?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ onBack }) => {
  const { id } = useParams();

  // This would typically come from an API call using the id
  const job = {
    id: '1',
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
    experience: '5+ years',
    description: `We are seeking a talented Senior Full Stack Developer to join our growing engineering team. You will be responsible for developing and maintaining our healthcare platform, working with both frontend and backend technologies.`,
    responsibilities: [
      'Design and implement new features and functionality',
      'Write clean, maintainable, and efficient code',
      'Collaborate with cross-functional teams to define and implement innovative solutions',
      'Participate in code reviews and mentor junior developers',
      'Optimize applications for maximum speed and scalability',
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in full stack development',
      'Strong proficiency in JavaScript/TypeScript, React, and Node.js',
      'Experience with modern frontend frameworks and state management',
      'Excellent problem-solving and communication skills',
      'Experience with healthcare systems is a plus',
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health insurance coverage',
      'Flexible working hours',
      'Remote work options',
      'Professional development opportunities',
      'Annual learning and conference budget',
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {job.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            {job.department}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {job.type}
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            {job.experience}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            About the Role
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {job.description}
          </p>
        </section>

        {/* Responsibilities */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Key Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Requirements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Benefits
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>

        {/* Apply Button */}
        <div className="mt-8">
          <button className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors">
            Apply for this Position
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 