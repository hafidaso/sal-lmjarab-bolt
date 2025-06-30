import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  DollarSign, 
  Image, 
  FileImage, 
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PolicyCategory {
  id: string;
  title: string;
  description: string;
  expanded: boolean;
  items: PolicyItem[];
}

interface PolicyItem {
  title: string;
  content: string;
  allowed?: string[];
  prohibited?: string[];
}

interface FileFormat {
  format: string;
  maxSize: string;
  dimensions: string;
  supported: boolean;
}

const AdvertisingPolicy = () => {
  const [policyCategories, setPolicyCategories] = useState<PolicyCategory[]>([
    {
      id: 'general',
      title: 'General Advertising Guidelines',
      description: 'Core principles and requirements for all advertisements on our platform',
      expanded: true,
      items: [
        {
          title: 'Accuracy and Truthfulness',
          content: 'All advertisements must be accurate, truthful, and not misleading. Claims must be substantiated by reliable scientific evidence when applicable.',
          allowed: [
            'Factual statements about product features',
            'Claims supported by peer-reviewed research',
            'Clear disclosure of limitations'
          ],
          prohibited: [
            'Exaggerated or unsubstantiated claims',
            'Misleading comparisons',
            'Omission of material information'
          ]
        },
        {
          title: 'Transparency',
          content: 'All advertisements must be clearly identifiable as such. Sponsored content must be labeled appropriately to distinguish it from organic content.',
          allowed: [
            'Clear "Sponsored" or "Advertisement" labels',
            'Transparent disclosure of advertiser identity',
            'Distinct visual separation from editorial content'
          ],
          prohibited: [
            'Disguising ads as editorial content',
            'Misleading users about the commercial nature of content',
            'Hiding sponsorship disclosures'
          ]
        }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare-Specific Requirements',
      description: 'Additional guidelines for healthcare and pharmaceutical advertising',
      expanded: false,
      items: [
        {
          title: 'Prescription Drug Advertising',
          content: 'Direct-to-consumer advertising of prescription medications must comply with all applicable regulations and include required safety information.',
          allowed: [
            'FDA-approved indications',
            'Fair balance of benefits and risks',
            'Inclusion of important safety information'
          ],
          prohibited: [
            'Off-label promotion',
            'Minimizing safety risks',
            'Making claims of superiority without substantial evidence'
          ]
        },
        {
          title: 'Medical Device Advertising',
          content: 'Advertisements for medical devices must accurately represent the approved uses and include relevant safety information.',
          allowed: [
            'Cleared or approved indications',
            'Accurate representation of device capabilities',
            'Appropriate risk information'
          ],
          prohibited: [
            'Claims beyond approved indications',
            'Misleading efficacy statements',
            'Omission of contraindications'
          ]
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Specifications',
      description: 'Technical requirements for ad formats, sizes, and performance',
      expanded: false,
      items: [
        {
          title: 'Performance Standards',
          content: 'Advertisements must meet performance standards to ensure they do not negatively impact user experience.',
          allowed: [
            'Optimized file sizes',
            'Efficient loading times',
            'Limited animation duration'
          ],
          prohibited: [
            'Excessive CPU usage',
            'Auto-playing audio without user interaction',
            'Intrusive formats that disrupt user experience'
          ]
        },
        {
          title: 'Responsive Design',
          content: 'All advertisements must be responsive and display properly across desktop and mobile devices.',
          allowed: [
            'Responsive layouts that adapt to screen size',
            'Mobile-optimized creative assets',
            'Touch-friendly interactive elements'
          ],
          prohibited: [
            'Fixed-width designs that break on mobile',
            'Tiny tap targets on mobile devices',
            'Horizontal scrolling on mobile'
          ]
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      description: 'Legal and regulatory requirements for healthcare advertising',
      expanded: false,
      items: [
        {
          title: 'HIPAA Compliance',
          content: 'All advertising must comply with HIPAA regulations regarding protected health information.',
          allowed: [
            'De-identified patient information',
            'Properly obtained testimonials with consent',
            'Generic patient scenarios'
          ],
          prohibited: [
            'Protected health information without authorization',
            'Identifiable patient images without consent',
            'Targeting based on sensitive health conditions'
          ]
        },
        {
          title: 'FDA Regulations',
          content: 'Pharmaceutical and medical device advertising must comply with all applicable FDA regulations.',
          allowed: [
            'Fair balance presentation',
            'Adequate provision for full prescribing information',
            'Approved claims and indications'
          ],
          prohibited: [
            'Promotion of investigational products',
            'Omission of risk information',
            'Misleading efficacy claims'
          ]
        }
      ]
    }
  ]);

  const fileFormats: FileFormat[] = [
    { format: 'JPG/JPEG', maxSize: '150KB', dimensions: '300x250, 728x90, 300x600', supported: true },
    { format: 'PNG', maxSize: '150KB', dimensions: '300x250, 728x90, 300x600', supported: true },
    { format: 'GIF', maxSize: '150KB', dimensions: '300x250, 728x90, 300x600', supported: true },
    { format: 'HTML5', maxSize: '200KB initial load', dimensions: '300x250, 728x90, 300x600', supported: true },
    { format: 'MP4', maxSize: '1MB', dimensions: '300x250, 728x90, 300x600', supported: true },
    { format: 'WEBP', maxSize: '100KB', dimensions: '300x250, 728x90, 300x600', supported: true },
    { format: 'SVG', maxSize: '50KB', dimensions: '300x250, 728x90, 300x600', supported: false },
    { format: 'Flash', maxSize: 'N/A', dimensions: 'N/A', supported: false }
  ];

  const toggleCategory = (id: string) => {
    setPolicyCategories(categories => 
      categories.map(category => 
        category.id === id 
          ? { ...category, expanded: !category.expanded } 
          : category
      )
    );
  };

  const [calculatorValues, setCalculatorValues] = useState({
    placement: 'premium',
    duration: '30',
    format: 'display'
  });

  const calculatePrice = () => {
    const basePrices = {
      premium: 5000,
      standard: 3000,
      targeted: 4000
    };
    
    const durationMultiplier = parseInt(calculatorValues.duration) / 30;
    
    const formatMultiplier = {
      display: 1,
      video: 1.5,
      sponsored: 1.2
    };
    
    const basePrice = basePrices[calculatorValues.placement as keyof typeof basePrices];
    const price = basePrice * durationMultiplier * formatMultiplier[calculatorValues.format as keyof typeof formatMultiplier];
    
    return price.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Advertising Policy & Guidelines
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive guidelines for advertising on the Sal-lmjarab Health Systems platform
          </p>
        </div>

        {/* Policy Categories */}
        <div className="grid grid-cols-1 gap-6 mb-16">
          {policyCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {category.description}
                  </p>
                </div>
                {category.expanded ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              
              {category.expanded && (
                <div className="px-6 pb-6 space-y-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {item.content}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {item.allowed && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <h4 className="font-medium text-green-800 dark:text-green-300 flex items-center mb-3">
                              <Check className="w-5 h-5 mr-2" />
                              Allowed
                            </h4>
                            <ul className="space-y-2">
                              {item.allowed.map((allowed, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 mr-2 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300">{allowed}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {item.prohibited && (
                          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                            <h4 className="font-medium text-red-800 dark:text-red-300 flex items-center mb-3">
                              <X className="w-5 h-5 mr-2" />
                              Prohibited
                            </h4>
                            <ul className="space-y-2">
                              {item.prohibited.map((prohibited, i) => (
                                <li key={i} className="flex items-start">
                                  <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-1 mr-2 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300">{prohibited}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end">
                    <Link
                      to={`/advertising-policy/${category.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View detailed guidelines
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Downloadable Templates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Submission Guidelines & Templates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Display Ad Specifications",
                description: "Technical requirements for banner ads",
                icon: <Image className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              },
              {
                title: "Sponsored Content Guidelines",
                description: "Format and content requirements",
                icon: <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              },
              {
                title: "Regulatory Compliance Checklist",
                description: "Ensure your ads meet all requirements",
                icon: <AlertTriangle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              }
            ].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    {template.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </div>
                </div>
                
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download PDF Template</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Advertising Pricing Calculator
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Placement Type
                  </label>
                  <select
                    value={calculatorValues.placement}
                    onChange={(e) => setCalculatorValues({...calculatorValues, placement: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="premium">Premium Placement</option>
                    <option value="standard">Standard Placement</option>
                    <option value="targeted">Specialty-Targeted Placement</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Campaign Duration (Days)
                  </label>
                  <select
                    value={calculatorValues.duration}
                    onChange={(e) => setCalculatorValues({...calculatorValues, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                    <option value="180">180 Days</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ad Format
                  </label>
                  <select
                    value={calculatorValues.format}
                    onChange={(e) => setCalculatorValues({...calculatorValues, format: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="display">Display Ads</option>
                    <option value="video">Video Ads</option>
                    <option value="sponsored">Sponsored Content</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/advertising/custom-quote"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Need a custom solution? Contact our sales team
                </Link>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Estimated Price
                </h3>
                
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  ${calculatePrice()}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Base price:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${calculatorValues.placement === 'premium' ? '5,000' : 
                         calculatorValues.placement === 'standard' ? '3,000' : '4,000'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{calculatorValues.duration} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Format:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {calculatorValues.format === 'display' ? 'Display Ads' : 
                       calculatorValues.format === 'video' ? 'Video Ads' : 'Sponsored Content'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Placement Preview</span>
                  </div>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FileImage className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {calculatorValues.placement === 'premium' ? 'Homepage Hero Section' : 
                         calculatorValues.placement === 'standard' ? 'In-Content Placement' : 'Specialty Page Placement'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Supported File Formats & Specifications
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Format
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Max Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Dimensions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Supported
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {fileFormats.map((format, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {format.format}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format.maxSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format.dimensions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {format.supported ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          <Check className="w-3 h-3 mr-1" />
                          Supported
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          <X className="w-3 h-3 mr-1" />
                          Not Supported
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <h3 className="font-medium text-gray-900 dark:text-white">
                Important Notes
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>All creative assets must be submitted at least 5 business days before campaign launch</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Animations should be limited to 15 seconds and must not loop more than 3 times</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Audio must be user-initiated only and include visible controls</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>All ads undergo a compliance review process before approval</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Checklist */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Compliance Checklist
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Healthcare Advertising Requirements
                </h3>
                
                <div className="space-y-4">
                  {[
                    "Fair balance of benefits and risks",
                    "Important safety information included",
                    "No misleading claims or comparisons",
                    "Appropriate regulatory disclosures",
                    "Clear indication information",
                    "No off-label promotion"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Technical Requirements
                </h3>
                
                <div className="space-y-4">
                  {[
                    "Meets file size requirements",
                    "Correct dimensions for placement",
                    "Responsive design for all devices",
                    "Animation within duration limits",
                    "No auto-playing audio",
                    "Includes required border"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Review Process & Timeline
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Initial Screening</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automated and manual review of all ad content for basic compliance (1-2 business days)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Regulatory Review</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      For healthcare-specific content, additional review by our healthcare compliance team (2-3 business days)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Feedback & Revisions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      If issues are identified, advertisers will receive detailed feedback and have the opportunity to make revisions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Final Approval</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Once all requirements are met, the advertisement will receive final approval and be scheduled for publication
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Reach Healthcare Professionals?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Connect with our advertising team to discuss your campaign goals and get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/advertising/get-started"
                className="px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/advertising/contact"
                className="px-8 py-4 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-medium transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingPolicy;