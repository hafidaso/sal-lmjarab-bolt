import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertTriangle, CheckCircle, X, Info, Shield, Eye, Users, Image, Layout } from 'lucide-react';

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
              <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Advertising & Use Guidelines
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: January 15, 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            These Advertising and Use Guidelines ("Guidelines") govern all content, advertisements, and promotional materials (collectively "Advertisements") displayed on the Sal-lmjarab platform. These Guidelines apply to all advertisers, agencies, and partners who wish to promote their products, services, or content on our platform.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Sal-lmjarab is committed to maintaining the highest standards of accuracy, transparency, and compliance in healthcare advertising. All Advertisements must comply with these Guidelines, our Terms of Service, Privacy Policy, and all applicable laws and regulations.
          </p>
        </div>

        {/* General Principles */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            General Principles
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accuracy and Truthfulness</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All Advertisements must be accurate, truthful, and not misleading. Claims must be substantiated by reliable scientific evidence when applicable. Exaggerated or unsubstantiated claims are prohibited.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Transparency</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All Advertisements must be clearly identifiable as such. Sponsored content must be labeled appropriately to distinguish it from organic content. The identity of the advertiser must be clear to users.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Regulatory Compliance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All Advertisements must comply with applicable laws, regulations, and industry codes governing healthcare advertising in Morocco, including but not limited to regulations from the Ministry of Health and professional medical associations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">User Experience</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advertisements must not disrupt or degrade the user experience on our platform. Intrusive, excessive, or disruptive ad formats are prohibited.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy and Data Protection</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All Advertisements must respect user privacy and comply with our Privacy Policy and applicable data protection laws. Collection and use of user data must be transparent and consensual.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prohibited Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Prohibited Content
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Unapproved Medical Claims</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Claims about the safety or efficacy of medical treatments, procedures, or products that have not been approved by relevant regulatory authorities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Prescription Drug Advertising to Consumers</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Direct-to-consumer advertising of prescription medications is prohibited in accordance with Moroccan regulations. Prescription drug information may only be targeted to healthcare professionals.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Misleading Content</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Content that misrepresents the advertiser, their products or services, or that makes false or unsubstantiated claims about competitors.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Inappropriate Content</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Content that is offensive, discriminatory, violent, or otherwise inappropriate for a healthcare platform. This includes content that may cause distress to vulnerable users.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dangerous Products or Services</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advertisements for products or services that may pose health risks, promote harmful behaviors, or discourage seeking appropriate medical care.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specific Guidelines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Specific Guidelines by Advertiser Type
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                Healthcare Providers
              </h3>
              
              <ul className="space-y-2 pl-8 list-disc text-gray-600 dark:text-gray-400">
                <li>Qualifications and credentials must be accurately represented</li>
                <li>Patient testimonials must be authentic, with proper consent obtained</li>
                <li>Before/after images must include appropriate disclaimers</li>
                <li>Claims about success rates or outcomes must be substantiated</li>
                <li>Pricing information must be transparent and include any limitations or conditions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                Pharmaceutical Companies
              </h3>
              
              <ul className="space-y-2 pl-8 list-disc text-gray-600 dark:text-gray-400">
                <li>Prescription drug information must only be targeted to verified healthcare professionals</li>
                <li>All drug information must include approved indications and important safety information</li>
                <li>Content must be consistent with the approved product labeling</li>
                <li>Disease awareness campaigns must be clearly separated from product promotion</li>
                <li>Adverse event reporting mechanisms must be clearly provided</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                Hospitals & Healthcare Facilities
              </h3>
              
              <ul className="space-y-2 pl-8 list-disc text-gray-600 dark:text-gray-400">
                <li>Accreditations and certifications must be current and verifiable</li>
                <li>Quality metrics and rankings must be accurately represented with proper context</li>
                <li>Facility capabilities and available services must be accurately described</li>
                <li>Emergency service claims must be clear about limitations or hours</li>
                <li>Specialist availability must be accurately represented</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                Health Products & Services
              </h3>
              
              <ul className="space-y-2 pl-8 list-disc text-gray-600 dark:text-gray-400">
                <li>Health benefits claims must be substantiated by reliable evidence</li>
                <li>Products must be legally available in Morocco</li>
                <li>Dietary supplements must include appropriate disclaimers</li>
                <li>Medical devices must be properly classified and approved</li>
                <li>Health services must clearly disclose limitations and qualifications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ad Format Guidelines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Ad Format Guidelines
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Layout className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                Display Ads
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Technical Specifications</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>File formats: JPG, PNG, GIF</li>
                    <li>Maximum file size: 150KB</li>
                    <li>Dimensions: 300x250, 728x90, 300x600</li>
                    <li>Animation: 15 seconds max, no rapid flashing</li>
                    <li>Border: All ads must have a visible border</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Content Requirements</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Clear "Advertisement" or "Sponsored" label</li>
                    <li>Legible text (minimum 12pt font)</li>
                    <li>High-quality images</li>
                    <li>Clear call-to-action</li>
                    <li>Advertiser name must be visible</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                Sponsored Content
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Format Requirements</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Word count: 500-1500 words</li>
                    <li>Images: 1-3 high-quality images</li>
                    <li>Headline: Clear, concise, under 70 characters</li>
                    <li>Subheadings: Use H2 and H3 tags appropriately</li>
                    <li>Links: Maximum 3 outbound links</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Content Requirements</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Prominent "Sponsored Content" disclosure</li>
                    <li>Educational value to readers</li>
                    <li>Factually accurate information</li>
                    <li>Clear distinction between facts and opinions</li>
                    <li>Transparent author/sponsor identification</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Image className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                Rich Media Ads
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Technical Specifications</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>File formats: HTML5, MP4</li>
                    <li>Maximum file size: 1MB initial load</li>
                    <li>Video length: 30 seconds maximum</li>
                    <li>Audio: User-initiated only</li>
                    <li>Frame rate: 24 fps maximum</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">User Experience Requirements</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Clear close/skip button</li>
                    <li>No automatic expansion</li>
                    <li>No interstitial formats</li>
                    <li>No sound without user interaction</li>
                    <li>Performance impact: minimal CPU usage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Process */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Ad Review Process
          </h2>
          
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              All Advertisements submitted to Sal-lmjarab undergo a thorough review process to ensure compliance with these Guidelines and applicable regulations. Our review process includes:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-primary-100 dark:bg-primary-900 rounded-full mt-1">
                  <Info className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Initial Screening</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automated and manual review of all ad content for basic compliance with our Guidelines.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-primary-100 dark:bg-primary-900 rounded-full mt-1">
                  <Info className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Regulatory Review</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    For healthcare-specific content, additional review by our healthcare compliance team to ensure adherence to relevant regulations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-primary-100 dark:bg-primary-900 rounded-full mt-1">
                  <Info className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Feedback & Revisions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If issues are identified, advertisers will receive detailed feedback and have the opportunity to make revisions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-primary-100 dark:bg-primary-900 rounded-full mt-1">
                  <Info className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Final Approval</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Once all requirements are met, the Advertisement will receive final approval and be scheduled for publication.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-primary-100 dark:bg-primary-900 rounded-full mt-1">
                  <Info className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Ongoing Monitoring</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All active Advertisements are subject to ongoing monitoring for continued compliance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                  Review Timeframes
                </h3>
              </div>
              <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                Standard review: 2-3 business days<br />
                Healthcare-specific content: 3-5 business days<br />
                Pharmaceutical content: 5-7 business days
              </p>
            </div>
          </div>
        </div>

        {/* Enforcement */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Enforcement & Violations
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sal-lmjarab reserves the right to reject, remove, or require modifications to any Advertisement that does not comply with these Guidelines or for any other reason at our sole discretion. Violations of these Guidelines may result in:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Removal of Advertisement</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Non-compliant Advertisements will be immediately removed from our platform.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Suspension of Advertising Privileges</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Repeated violations may result in temporary or permanent suspension of advertising privileges.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Termination of Agreement</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Serious or repeated violations may result in termination of the advertising agreement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Reporting to Authorities</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Violations of laws or regulations may be reported to relevant authorities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Content Guidelines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            User Content Guidelines
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            These guidelines also apply to user-generated content on our platform, including reviews, comments, and forum posts:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full mt-1">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Authentic Experiences</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reviews and comments should reflect genuine patient experiences. Fake reviews, whether positive or negative, are prohibited.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full mt-1">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Respectful Communication</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Content should be respectful and constructive. Personal attacks, harassment, or discriminatory language is prohibited.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full mt-1">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Privacy Protection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Content should not include personal health information or identifiable information about other patients or healthcare providers without consent.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full mt-1">
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">No Medical Advice</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Users should not provide specific medical advice to others. General information sharing is permitted, but personalized medical advice should only come from qualified healthcare professionals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Updates to Guidelines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Updates to Guidelines
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Sal-lmjarab reserves the right to update these Guidelines at any time. Significant changes will be communicated to advertisers and partners. Continued use of our advertising services after such changes constitutes acceptance of the updated Guidelines.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400">
            It is the responsibility of advertisers to regularly review these Guidelines to ensure ongoing compliance.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have questions about these Guidelines or need assistance with your advertising content, please contact our advertising team:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300">advertising@sal-lmjarab.ma</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300">+212 522 XXX XXX</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              to="/advertisers"
              className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Learn More About Advertising Opportunities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;