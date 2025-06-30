import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Search, Filter, Heart, Code, BarChart, Users, MessageSquare, Globe, CheckCircle, ArrowRight, Clock, Building, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import JobDetails from '../components/careers/JobDetails';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  postedDate: string;
  description: string;
  requirements: string[];
  experience: string;
}

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering & Technology' },
    { id: 'product', name: 'Product & Design' },
    { id: 'data', name: 'Data Science & AI' },
    { id: 'medical', name: 'Medical Affairs' },
    { id: 'operations', name: 'Operations' },
    { id: 'marketing', name: 'Marketing & Communications' },
    { id: 'sales', name: 'Sales & Business Development' },
    { id: 'customer-support', name: 'Customer Support' },
    { id: 'hr', name: 'HR' },
    { id: 'finance', name: 'Finance' },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'casablanca', name: 'Casablanca' },
    { id: 'rabat', name: 'Rabat' },
    { id: 'marrakech', name: 'Marrakech' },
    { id: 'tangier', name: 'Tangier' },
    { id: 'remote', name: 'Remote' }
  ];

  const jobTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'full-time', name: 'Full-time' },
    { id: 'part-time', name: 'Part-time' },
    { id: 'contract', name: 'Contract' },
    { id: 'remote', name: 'Remote' }
  ];

  const jobListings: JobListing[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'engineering',
      location: 'Casablanca',
      type: 'Full-time',
      postedDate: '2025-06-15',
      description: 'We are looking for a Senior Full Stack Developer to join our engineering team and help build our healthcare platform. You will be responsible for developing and maintaining web applications, APIs, and services that power our platform.',
      requirements: [
        '5+ years of experience in full stack development',
        'Proficiency in React, Node.js, and TypeScript',
        'Experience with database design and optimization',
        'Knowledge of cloud services (AWS, Azure, or GCP)',
        'Experience with healthcare systems is a plus'
      ],
      experience: '5+ years'
    },
    {
      id: '2',
      title: 'AI Research Scientist',
      department: 'data',
      location: 'Rabat',
      type: 'Full-time',
      postedDate: '2025-06-18',
      description: 'Join our AI team to develop cutting-edge machine learning models for healthcare provider matching, predictive analytics, and natural language processing. You will work on innovative solutions to improve healthcare access and outcomes.',
      requirements: [
        'PhD or MS in Computer Science, Machine Learning, or related field',
        'Strong background in machine learning and deep learning',
        'Experience with NLP and recommendation systems',
        'Proficiency in Python and ML frameworks (TensorFlow, PyTorch)',
        'Publications in top-tier ML conferences is a plus'
      ],
      experience: 'PhD or MS'
    },
    {
      id: '3',
      title: 'Product Manager - Patient Experience',
      department: 'product',
      location: 'Casablanca',
      type: 'Full-time',
      postedDate: '2025-06-20',
      description: 'We are seeking a Product Manager to lead our patient experience initiatives. You will be responsible for defining product strategy, gathering requirements, and working with cross-functional teams to deliver features that improve the patient journey.',
      requirements: [
        '3+ years of product management experience',
        'Experience with healthcare or consumer applications',
        'Strong analytical and problem-solving skills',
        'Excellent communication and stakeholder management',
        'Data-driven approach to product development'
      ],
      experience: '3+ years'
    },
    {
      id: '4',
      title: 'Medical Content Writer',
      department: 'medical',
      location: 'Remote',
      type: 'Part-time',
      postedDate: '2025-06-23',
      description: 'Create accurate, engaging, and accessible medical content for our platform. You will develop educational materials, procedure descriptions, and health articles that help patients make informed healthcare decisions.',
      requirements: [
        'Medical background (MD, nursing, or related field)',
        'Excellent writing skills in Arabic and French',
        'Experience in medical content creation',
        'Understanding of SEO principles',
        'Ability to translate complex medical concepts into simple language'
      ],
      experience: 'Medical background'
    },
    {
      id: '5',
      title: 'Healthcare Partnerships Manager',
      department: 'sales',
      location: 'Rabat',
      type: 'Full-time',
      postedDate: '2025-06-25',
      description: 'Build and manage relationships with hospitals, clinics, and healthcare providers across Morocco. You will be responsible for expanding our network of healthcare partners and ensuring their success on our platform.',
      requirements: [
        '5+ years of experience in healthcare business development',
        'Strong network in the Moroccan healthcare sector',
        'Excellent negotiation and relationship management skills',
        'Track record of closing partnerships and achieving growth targets',
        'Fluency in Arabic, French, and English'
      ],
      experience: '5+ years'
    },
    {
      id: '6',
      title: 'Customer Support Specialist',
      department: 'customer-support',
      location: 'Marrakech',
      type: 'Full-time',
      postedDate: '2025-06-27',
      description: 'Provide exceptional customer support to our users and ensure their satisfaction with our platform.',
      requirements: [
        '1+ years of customer service experience',
        'Excellent communication skills',
        'Ability to handle multiple tasks and prioritize effectively',
        'Understanding of healthcare systems'
      ],
      experience: '1+ years'
    },
    {
      id: '7',
      title: 'HR Coordinator',
      department: 'hr',
      location: 'Rabat',
      type: 'Full-time',
      postedDate: '2025-06-29',
      description: 'Assist with HR-related tasks and support the HR team in managing employee relations.',
      requirements: [
        'Basic understanding of HR practices',
        'Strong organizational skills',
        'Ability to handle sensitive information with discretion'
      ],
      experience: 'Basic understanding'
    },
    {
      id: '8',
      title: 'Finance Analyst',
      department: 'finance',
      location: 'Casablanca',
      type: 'Full-time',
      postedDate: '2023-12-30',
      description: 'Analyze financial data and support the finance team in managing our platform\'s financial operations.',
      requirements: [
        '2+ years of finance experience',
        'Strong analytical skills',
        'Understanding of accounting principles'
      ],
      experience: '2+ years'
    },
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location.toLowerCase() === selectedLocation;
    const matchesType = selectedType === 'all' || job.type.toLowerCase().includes(selectedType);
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - postedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  if (selectedJobId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JobDetails onBack={() => setSelectedJobId(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Help us transform healthcare access in Morocco through technology and innovation
          </p>
        </div>

        {/* Why Join Us */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Join Sal-lmjarab?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Meaningful Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Work on technology that directly improves healthcare access and outcomes for millions of Moroccans.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Cutting-Edge Technology
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build and work with advanced AI systems, predictive analytics, and innovative healthcare solutions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Collaborative Culture
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join a diverse team of engineers, healthcare professionals, and business experts working together to solve complex challenges.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Job Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Open Positions
          </h2>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search job titles or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {jobTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                Showing {filteredJobs.length} of {jobListings.length} positions
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                  setSelectedLocation('all');
                  setSelectedType('all');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Briefcase className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No positions found
                </h3>
                <p>Try adjusting your search criteria or check back later for new openings.</p>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded-full text-xs font-medium">
                          {departments.find(d => d.id === job.department)?.name || job.department}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {job.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <span>•</span>
                        <div>Posted {getDaysAgo(job.postedDate)}</div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {job.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Link
                        to={`/careers/${job.id}`}
                        className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                      >
                        View & Apply
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Benefits & Perks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: 'Flexible Work', description: 'Remote and hybrid options available for most positions' },
              { icon: Users, title: 'Health Insurance', description: 'Comprehensive health coverage for you and your family' },
              { icon: BarChart, title: 'Career Growth', description: 'Professional development and advancement opportunities' },
              { icon: Heart, title: 'Wellness Program', description: 'Mental and physical health support programs' },
              { icon: Briefcase, title: 'Competitive Salary', description: 'Above-market compensation and equity packages' },
              { icon: MessageSquare, title: 'Collaborative Culture', description: 'Open communication and inclusive environment' },
              { icon: CheckCircle, title: 'Paid Time Off', description: 'Generous vacation policy and paid holidays' },
              { icon: Code, title: 'Latest Technology', description: 'Work with cutting-edge tools and technologies' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-sm p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">
            What Our Team Says
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Working at Sal-lmjarab has been incredibly rewarding. I get to apply my technical skills to solve real healthcare challenges that impact people's lives.",
                name: "Karim Bensouda",
                title: "Senior Software Engineer",
                years: "2 years at Sal-lmjarab"
              },
              {
                quote: "The collaborative culture here is unlike anywhere I've worked before. Everyone is passionate about our mission and works together to make healthcare more accessible.",
                name: "Leila Mansouri",
                title: "Product Manager",
                years: "1.5 years at Sal-lmjarab"
              },
              {
                quote: "As a healthcare professional, I appreciate how Sal-lmjarab bridges technology and medicine. We're truly making a difference in how Moroccans access quality healthcare.",
                name: "Dr. Yasmine Alami",
                title: "Medical Content Director",
                years: "3 years at Sal-lmjarab"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg">
                <p className="italic mb-4 text-primary-100">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-200">{testimonial.title}</p>
                  <p className="text-xs text-primary-200 mt-1">{testimonial.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Process */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Recruitment Process
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-900"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                { step: 1, title: 'Application Review', description: 'Our recruitment team reviews your application and resume.' },
                { step: 2, title: 'Initial Screening', description: 'A 30-minute call to discuss your experience and interest in the role.' },
                { step: 3, title: 'Technical Assessment', description: 'Role-specific assessment to evaluate your skills and expertise.' },
                { step: 4, title: 'Team Interviews', description: 'Meet with team members and potential colleagues.' },
                { step: 5, title: 'Final Interview', description: 'Discussion with department leadership or executive team.' },
                { step: 6, title: 'Offer & Onboarding', description: 'Receive your offer and begin your journey with us!' }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900"></div>
                    
                    {/* Content */}
                    <div className="md:w-1/2 pl-8 md:pl-0 md:pr-12 md:text-right">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
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

        {/* No Positions Available? */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Don't See a Position That Fits?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to our mission.
          </p>
          <Link
            to="/careers/general-application"
            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Submit General Application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;