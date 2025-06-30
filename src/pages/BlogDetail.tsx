import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Tag, 
  Share2, 
  Bookmark, 
  BookmarkPlus,
  MessageCircle,
  AlertTriangle,
  ExternalLink,
  Heart,
  Star,
  FileText,
  Users,
  Phone,
  Menu,
  X
} from 'lucide-react';
import { mockHealthBlog } from '../data/mockHealthBlog';
import { mockDoctors } from '../data/mockDoctors';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  fullContent?: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
    credentials?: string[];
    experience?: number;
    specializations?: string[];
  };
  date: string;
  lastUpdated?: string;
  readTime: number;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  medicalReviewDate?: string;
  peerReviewed?: boolean;
  references?: string[];
  relatedConditions?: string[];
  whenToSeeDoctor?: string[];
  tableOfContents?: { title: string; id: string }[];
}

// Enhanced blog posts data with medical-specific content
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Hypertension: Causes, Symptoms, and Treatment Options',
    excerpt: 'Hypertension affects millions of Moroccans. Learn about the causes, symptoms, and the latest treatment approaches to manage this common condition.',
    content: 'Full article content here...',
    fullContent: `
      <h2>What is Hypertension?</h2>
      <p>Hypertension, commonly known as high blood pressure, is a medical condition where the force of blood against artery walls is consistently too high. This condition affects approximately 1 in 3 adults in Morocco and is a major risk factor for heart disease, stroke, and kidney problems.</p>
      
      <h2>Causes of Hypertension</h2>
      <p>Several factors can contribute to the development of hypertension:</p>
      <ul>
        <li><strong>Lifestyle factors:</strong> Poor diet, lack of exercise, excessive salt intake</li>
        <li><strong>Medical conditions:</strong> Diabetes, kidney disease, sleep apnea</li>
        <li><strong>Genetic factors:</strong> Family history of hypertension</li>
        <li><strong>Age and gender:</strong> Risk increases with age</li>
      </ul>
      
      <h2>Common Symptoms</h2>
      <p>Hypertension is often called the "silent killer" because it may not show obvious symptoms. However, some people may experience:</p>
      <ul>
        <li>Headaches, especially in the morning</li>
        <li>Shortness of breath</li>
        <li>Nosebleeds</li>
        <li>Chest pain</li>
        <li>Dizziness</li>
        <li>Vision problems</li>
      </ul>
      
      <h2>Treatment Options</h2>
      <p>Treatment typically involves a combination of lifestyle changes and medication:</p>
      <h3>Lifestyle Modifications</h3>
      <ul>
        <li>Reduce salt intake to less than 2,300mg per day</li>
        <li>Follow the DASH diet (Dietary Approaches to Stop Hypertension)</li>
        <li>Exercise regularly (150 minutes of moderate activity per week)</li>
        <li>Maintain a healthy weight</li>
        <li>Limit alcohol consumption</li>
        <li>Quit smoking</li>
        <li>Manage stress through relaxation techniques</li>
      </ul>
      
      <h3>Medications</h3>
      <p>Common medications include:</p>
      <ul>
        <li>ACE inhibitors</li>
        <li>Angiotensin II receptor blockers</li>
        <li>Calcium channel blockers</li>
        <li>Diuretics</li>
        <li>Beta-blockers</li>
      </ul>
      
      <h2>Prevention Strategies</h2>
      <p>Preventing hypertension involves adopting healthy habits early in life:</p>
      <ul>
        <li>Regular blood pressure monitoring</li>
        <li>Annual health checkups</li>
        <li>Healthy diet rich in fruits, vegetables, and whole grains</li>
        <li>Regular physical activity</li>
        <li>Adequate sleep (7-9 hours per night)</li>
      </ul>
    `,
    author: {
      name: 'Dr. Ahmed Bennani',
      title: 'Cardiologist',
      avatar: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      credentials: ['MD - Faculty of Medicine, University of Casablanca', 'Board Certified in Cardiology', 'Fellowship in Interventional Cardiology'],
      experience: 15,
      specializations: ['Interventional Cardiology', 'Heart Failure', 'Cardiac Imaging']
    },
    date: '2025-06-15',
    lastUpdated: '2025-06-10',
    readTime: 8,
    category: 'Health Conditions',
    tags: ['Hypertension', 'Heart Health', 'Preventive Care', 'Cardiology'],
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    medicalReviewDate: '2025-06-12',
    peerReviewed: true,
    references: [
      'American Heart Association. (2023). Guidelines for Hypertension Management.',
      'World Health Organization. (2023). Global Report on Hypertension.',
      'Moroccan Society of Cardiology. (2023). National Guidelines for Cardiovascular Disease Prevention.'
    ],
    relatedConditions: ['Heart Disease', 'Stroke', 'Kidney Disease', 'Diabetes'],
    whenToSeeDoctor: [
      'Blood pressure consistently above 140/90 mmHg',
      'Severe headaches or vision problems',
      'Chest pain or shortness of breath',
      'Irregular heartbeat',
      'Dizziness or fainting spells'
    ],
    tableOfContents: [
      { title: 'What is Hypertension?', id: 'what-is' },
      { title: 'Causes of Hypertension', id: 'causes' },
      { title: 'Common Symptoms', id: 'symptoms' },
      { title: 'Treatment Options', id: 'treatment' },
      { title: 'Prevention Strategies', id: 'prevention' }
    ]
  },
  {
    id: '2',
    title: 'The Importance of Regular Health Screenings at Every Age',
    excerpt: 'Preventive screenings can detect health issues before they become serious. Discover which screenings are recommended at different life stages.',
    content: 'Full article content here...',
    author: {
      name: 'Dr. Fatima Alaoui',
      title: 'Family Medicine Specialist',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    date: '2025-06-20',
    readTime: 6,
    category: 'Preventive Care',
    tags: ['Screenings', 'Preventive Medicine', 'Health Checkups'],
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  // Add health blog posts
  {
    id: 'health-1',
    title: '5 Heart-Healthy Habits for Everyday Life',
    excerpt: 'Maintaining a healthy heart is easier than you think. Start with regular exercise, a balanced diet, and routine check-ups. Avoid smoking and manage stress for long-term cardiovascular health.',
    content: 'Maintaining a healthy heart is easier than you think. Start with regular exercise, a balanced diet, and routine check-ups. Avoid smoking and manage stress for long-term cardiovascular health. Read on for practical tips you can start today...',
    fullContent: `
      <h2>Introduction to Heart Health</h2>
      <p>Your heart is the most important muscle in your body, working tirelessly to pump blood and oxygen to every cell. Taking care of it should be a top priority for everyone, regardless of age or current health status.</p>
      
      <h2>1. Regular Exercise</h2>
      <p>Aim for at least 150 minutes of moderate-intensity aerobic activity per week. This can include:</p>
      <ul>
        <li>Brisk walking (30 minutes, 5 days a week)</li>
        <li>Swimming or cycling</li>
        <li>Dancing or aerobics</li>
        <li>Strength training (2-3 times per week)</li>
      </ul>
      
      <h2>2. Heart-Healthy Diet</h2>
      <p>Follow these dietary guidelines:</p>
      <ul>
        <li>Eat plenty of fruits and vegetables (5 servings daily)</li>
        <li>Choose whole grains over refined grains</li>
        <li>Include lean proteins (fish, poultry, legumes)</li>
        <li>Limit saturated and trans fats</li>
        <li>Reduce sodium intake</li>
      </ul>
      
      <h2>3. Regular Health Check-ups</h2>
      <p>Schedule regular appointments with your healthcare provider to monitor:</p>
      <ul>
        <li>Blood pressure</li>
        <li>Cholesterol levels</li>
        <li>Blood sugar</li>
        <li>Body weight and BMI</li>
      </ul>
      
      <h2>4. Stress Management</h2>
      <p>Chronic stress can negatively impact heart health. Try these techniques:</p>
      <ul>
        <li>Meditation and deep breathing exercises</li>
        <li>Regular physical activity</li>
        <li>Adequate sleep (7-9 hours per night)</li>
        <li>Social connections and support</li>
        <li>Hobbies and leisure activities</li>
      </ul>
      
      <h2>5. Avoid Smoking and Limit Alcohol</h2>
      <p>Smoking is one of the biggest risk factors for heart disease. If you smoke, seek help to quit. Limit alcohol to moderate amounts (1 drink per day for women, 2 for men).</p>
    `,
    author: {
      name: 'Dr. Ahmed Bennani',
      title: 'Cardiologist',
      avatar: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      credentials: ['MD - Faculty of Medicine, University of Casablanca', 'Board Certified in Cardiology'],
      experience: 15,
      specializations: ['Interventional Cardiology', 'Heart Failure', 'Preventive Cardiology']
    },
    date: '2025-05-31',
    lastUpdated: '2025-05-27',
    readTime: 5,
    category: 'Preventive Care',
    tags: ['heart', 'lifestyle', 'prevention', 'cardiology'],
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    medicalReviewDate: '2025-05-29',
    peerReviewed: true,
    relatedConditions: ['Heart Disease', 'Hypertension', 'High Cholesterol', 'Diabetes'],
    whenToSeeDoctor: [
      'Chest pain or discomfort',
      'Shortness of breath',
      'Irregular heartbeat',
      'Swelling in legs or ankles',
      'Fatigue or weakness'
    ],
    tableOfContents: [
      { title: 'Introduction to Heart Health', id: 'intro' },
      { title: 'Regular Exercise', id: 'exercise' },
      { title: 'Heart-Healthy Diet', id: 'diet' },
      { title: 'Regular Health Check-ups', id: 'checkups' },
      { title: 'Stress Management', id: 'stress' },
      { title: 'Avoid Smoking and Limit Alcohol', id: 'lifestyle' }
    ]
  },
  {
    id: 'health-2',
    title: 'How to Care for Sensitive Skin in Summer',
    excerpt: 'Summer heat can be tough on sensitive skin. Use gentle cleansers, apply sunscreen daily, and avoid harsh exfoliants. Stay hydrated and consult a dermatologist for personalized advice.',
    content: 'Summer heat can be tough on sensitive skin. Use gentle cleansers, apply sunscreen daily, and avoid harsh exfoliants. Stay hydrated and consult a dermatologist for personalized advice. Here are expert tips for glowing skin all season...',
    author: {
      name: 'Dr. Fatima Alaoui',
      title: 'Dermatologist',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    date: '2025-05-30',
    readTime: 4,
    category: 'Health Conditions',
    tags: ['skin', 'dermatology', 'summer', 'tips'],
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Find the doctor by name to get their ID for the profile link
  const doctor = post ? mockDoctors.find(d => d.name === post.author.name) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Blog post not found</h2>
            <Link to="/blog" className="text-primary-600 hover:underline">← Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`);
        break;
    }
    setShowShareMenu(false);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically save to localStorage or backend
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Back Button */}
            <Link 
              to="/blog" 
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4 sm:mb-6 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            {/* Article */}
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {/* Header Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              />

              {/* Content */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Category and Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-xs sm:text-sm font-medium self-start">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <button
                      onClick={toggleBookmark}
                      className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                    >
                      {isBookmarked ? <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <BookmarkPlus className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                        title="Share article"
                      >
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      {showShareMenu && (
                        <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                          <button
                            onClick={() => handleShare('facebook')}
                            className="w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-t-lg text-sm"
                          >
                            Share on Facebook
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
                          >
                            Share on Twitter
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 text-sm"
                          >
                            Share on LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare('email')}
                            className="w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-600 rounded-b-lg text-sm"
                          >
                            Share via Email
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 mb-6 sm:mb-8 text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-center space-x-3">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{post.author.name}</span>
                      <span className="block text-xs sm:text-sm">{post.author.title}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{formatDate(post.date)}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{post.readTime} min read</span>
                    </div>

                    {post.lastUpdated && (
                      <div className="flex items-center space-x-1">
                        <span className="text-xs sm:text-sm">Updated: {formatDate(post.lastUpdated)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1 text-sm sm:text-base">
                        Medical Disclaimer
                      </h3>
                      <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                        This article is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Table of Contents */}
                {post.tableOfContents && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                      <FileText className="w-4 h-4 mr-2" />
                      Table of Contents
                    </h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {post.tableOfContents.map((item, index) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-xs sm:text-sm block py-1"
                          >
                            {index + 1}. {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article Content */}
                <div className="prose dark:prose-invert max-w-none mb-6 sm:mb-8 prose-sm sm:prose-base lg:prose-lg">
                  <div dangerouslySetInnerHTML={{ __html: post.fullContent || post.content }} />
                </div>

                {/* When to See a Doctor */}
                {post.whenToSeeDoctor && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      When to See a Doctor
                    </h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {post.whenToSeeDoctor.map((item, index) => (
                        <li key={index} className="text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-start">
                          <span className="text-red-500 mr-2 mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* References */}
                {post.references && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 mt-4 sm:mt-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">References</h3>
                    <ol className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {post.references.map((ref, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-0.5">{index + 1}.</span>
                          <span className="leading-relaxed">{ref}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            {/* Author Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <User className="w-4 h-4 mr-2" />
                About the Author
              </h3>
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <img
                  src={post.author.avatar || ''}
                  alt={post.author.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{post.author.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{post.author.title}</p>
                  {post.author.experience && (
                    <p className="text-xs text-gray-500 dark:text-gray-500">{post.author.experience} years experience</p>
                  )}
                </div>
              </div>
              {post.author.credentials && (
                <div className="mb-3 sm:mb-4">
                  <h5 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Credentials:</h5>
                  <ul className="space-y-1">
                    {post.author.credentials.map((cred, index) => (
                      <li key={index} className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">• {cred}</li>
                    ))}
                  </ul>
                </div>
              )}
              {doctor && (
                <Link
                  to={`/doctor/${doctor.id}`}
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-xs sm:text-sm"
                >
                  <span>View Full Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>

            {/* Ask a Doctor */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-sm p-4 sm:p-6 text-white">
              <h3 className="font-semibold mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <MessageCircle className="w-4 h-4 mr-2" />
                Have Questions?
              </h3>
              <p className="text-primary-100 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                Get personalized medical advice from our expert doctors.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center space-x-2 bg-white text-primary-600 hover:bg-primary-50 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Book Consultation</span>
              </Link>
            </div>

            {/* Related Articles */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">Related Articles</h3>
              <div className="space-y-3 sm:space-y-4">
                {blogPosts
                  .filter(p => p.id !== post.id && p.category === post.category)
                  .slice(0, 3)
                  .map(relatedPost => (
                    <div key={relatedPost.id} className="flex space-x-2 sm:space-x-3">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm line-clamp-2 leading-tight">
                          <Link to={`/blog/${relatedPost.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(relatedPost.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Medical Review Info */}
            {post.medicalReviewDate && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <Star className="w-4 h-4 mr-2" />
                  Medical Review
                </h3>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <p>Reviewed: {formatDate(post.medicalReviewDate)}</p>
                  {post.peerReviewed && (
                    <p className="flex items-center">
                      <span className="text-green-600 dark:text-green-400 mr-1">✓</span>
                      Peer-reviewed content
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 