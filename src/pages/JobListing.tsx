import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Building, 
  Calendar, 
  Share2, 
  Bookmark, 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  Award,
  ChevronRight,
  CheckCircle,
  Star,
  Heart,
  Brain,
  Code,
  Database,
  Cloud,
  Shield,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface JobSkill {
  name: string;
  level: 'required' | 'preferred';
  category: 'technical' | 'soft' | 'domain';
}

interface JobBenefit {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface RelatedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
}

const JobListing = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock job data - in a real app, this would come from an API
  const job = {
    id: jobId,
    title: "Senior Full Stack Developer",
    company: "Sal-lmjarab HealthTech",
    logo: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "Casablanca, Morocco",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    postedDate: "2025-06-15",
    deadline: "2025-05-16",
    description: `We are seeking a Senior Full Stack Developer to join our growing healthcare technology team. 
    You will be responsible for developing and maintaining our patient-doctor matching platform, 
    implementing new features, and ensuring high performance and reliability of our applications.`,
    responsibilities: [
      "Design and implement scalable web applications using modern technologies",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Write clean, maintainable, and efficient code",
      "Perform code reviews and mentor junior developers",
      "Optimize applications for maximum speed and scalability",
      "Implement security and data protection measures",
      "Stay up-to-date with emerging trends and technologies"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in full-stack development",
      "Strong proficiency in JavaScript/TypeScript, React, and Node.js",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Knowledge of database design and optimization",
      "Experience with healthcare systems and HIPAA compliance is a plus",
      "Excellent problem-solving and communication skills"
    ],
    skills: [
      { name: "React", level: "required", category: "technical" },
      { name: "Node.js", level: "required", category: "technical" },
      { name: "TypeScript", level: "required", category: "technical" },
      { name: "AWS", level: "preferred", category: "technical" },
      { name: "Healthcare Domain Knowledge", level: "preferred", category: "domain" },
      { name: "Team Leadership", level: "preferred", category: "soft" }
    ] as JobSkill[],
    benefits: [
      {
        title: "Health Insurance",
        description: "Comprehensive medical, dental, and vision coverage",
        icon: Heart
      },
      {
        title: "Professional Development",
        description: "Annual budget for courses, conferences, and certifications",
        icon: Brain
      },
      {
        title: "Remote Work",
        description: "Flexible work arrangements with remote options",
        icon: Globe
      },
      {
        title: "Competitive Salary",
        description: "Market-competitive compensation with annual reviews",
        icon: DollarSign
      }
    ] as JobBenefit[],
    companyOverview: `Sal-lmjarab HealthTech is a leading healthcare technology company in Morocco, 
    dedicated to improving healthcare access through innovative digital solutions. 
    Our platform connects patients with healthcare providers, making quality healthcare 
    more accessible to everyone.`,
    hiringProcess: [
      "Initial screening call with HR",
      "Technical assessment",
      "Technical interview with the team",
      "System design discussion",
      "Final interview with leadership",
      "Offer and negotiation"
    ],
    contact: {
      email: "careers@sal-lmjarab.com",
      phone: "+212 5XX-XXXXXX",
      website: "www.sal-lmjarab.com"
    }
  };

  const relatedJobs: RelatedJob[] = [
    {
      id: "2",
      title: "Frontend Developer",
      company: "Sal-lmjarab HealthTech",
      location: "Casablanca, Morocco",
      type: "Full-time",
      salary: "$60,000 - $90,000",
      postedDate: "2025-06-20"
    },
    {
      id: "3",
      title: "DevOps Engineer",
      company: "Sal-lmjarab HealthTech",
      location: "Remote",
      type: "Full-time",
      salary: "$70,000 - $110,000",
      postedDate: "2025-06-18"
    },
    {
      id: "4",
      title: "Product Manager",
      company: "Sal-lmjarab HealthTech",
      location: "Casablanca, Morocco",
      type: "Full-time",
      salary: "$75,000 - $115,000",
      postedDate: "2025-06-16"
    }
  ];

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved jobs" : "Job saved successfully");
  };

  const handleShareJob = () => {
    // In a real app, implement sharing functionality
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard");
  };

  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Code className="w-4 h-4" />;
      case 'soft':
        return <Users className="w-4 h-4" />;
      case 'domain':
        return <Database className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h1>
                    <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      {job.company}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveJob}
                    className={`p-2 rounded-lg ${
                      isSaved
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    } hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900 dark:hover:text-primary-400`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleShareJob}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900 dark:hover:text-primary-400"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Job Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {job.description}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Responsibilities
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Requirements
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {job.requirements.map((item, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      skill.level === 'required'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {getSkillIcon(skill.category)}
                    <span className="ml-1">{skill.name}</span>
                  </span>
                ))}
              </div>

              {job.deadline && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <span className="text-yellow-800 dark:text-yellow-300">
                      Application deadline: {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Company Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About {job.company}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {job.companyOverview}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Hiring Process
              </h3>
              <div className="space-y-3 mb-6">
                {job.hiringProcess.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">{step}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  {job.contact.email}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  {job.contact.phone}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Globe className="w-4 h-4 mr-2" />
                  {job.contact.website}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Apply Button */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4">
                Apply Now
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Applications close in {Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Benefits & Perks
              </h2>
              <div className="space-y-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg mr-3">
                      <benefit.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Similar Jobs You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedJobs.map((relatedJob) => (
              <Link
                key={relatedJob.id}
                to={`/jobs/${relatedJob.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {relatedJob.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {relatedJob.company}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {relatedJob.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {relatedJob.type}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {relatedJob.salary}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing; 