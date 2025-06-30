import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, AlertTriangle, CheckCircle, Shield, Globe, Users } from 'lucide-react';

const TermsOfUse = () => {
  const lastUpdated = 'January 15, 2025';

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
              Terms of Use
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Welcome to Sal-lmjarab. These Terms of Use govern your use of our website, mobile applications, and services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms of Use and our Privacy Policy.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Please read these terms carefully before using our Platform. If you do not agree to these terms, please do not use our Platform.
          </p>
        </div>

        {/* Definitions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Definitions
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                "Sal-lmjarab," "we," "us," and "our"
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Refers to Sal-lmjarab, the company operating this Platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                "Platform"
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Refers to our website, mobile applications, and all services provided by Sal-lmjarab.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                "User," "you," and "your"
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Refers to any individual who accesses or uses our Platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                "Healthcare Provider"
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Refers to doctors, dentists, hospitals, clinics, and other healthcare professionals or facilities listed on our Platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                "Content"
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Refers to all information, text, images, data, links, software, or other material that is displayed on, uploaded to, or accessed through the Platform.
              </p>
            </div>
          </div>
        </div>

        {/* Use of the Platform */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Use of the Platform
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Eligibility
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You must be at least 16 years old to use our Platform. By using our Platform, you represent and warrant that you are at least 16 years old and have the legal capacity to enter into these Terms of Use.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Account Creation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To access certain features of our Platform, you may need to create an account. When creating an account, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with these requirements.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Prohibited Activities
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                When using our Platform, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Use the Platform for any illegal or unauthorized purpose</li>
                <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
                <li>Interfere with or disrupt the operation of the Platform or servers or networks connected to the Platform</li>
                <li>Attempt to gain unauthorized access to any portion of the Platform or any other accounts, computer systems, or networks connected to the Platform</li>
                <li>Use any robot, spider, or other automated device to access the Platform</li>
                <li>Harvest or collect email addresses or other contact information of other users from the Platform</li>
                <li>Create multiple accounts for abusive purposes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Healthcare Information Disclaimer */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Healthcare Information Disclaimer
          </h2>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                Important Notice
              </h3>
            </div>
            <p className="text-yellow-700 dark:text-yellow-400">
              The content on our Platform is provided for general informational purposes only and is not intended as medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Sal-lmjarab does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Platform. Reliance on any information provided by Sal-lmjarab, its employees, contracted healthcare providers, or others appearing on the Platform is solely at your own risk.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400">
            The Platform may contain health-related materials that are sexually explicit or otherwise offensive to some audiences. If you find these materials offensive, you may not want to use our Platform.
          </p>
        </div>

        {/* User Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            User Content
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                User Reviews and Submissions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our Platform allows users to submit reviews, comments, and other content. By submitting content to our Platform, you grant Sal-lmjarab a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                You represent and warrant that you own or control all rights to the content you post; that the content is accurate; that use of the content does not violate these Terms of Use and will not cause injury to any person or entity; and that you will indemnify Sal-lmjarab for all claims resulting from content you supply.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Content Guidelines
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All content submitted by users must comply with the following guidelines:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Content must be based on your genuine experience</li>
                <li>Content must not contain false, defamatory, or misleading information</li>
                <li>Content must not contain offensive, abusive, or hateful language</li>
                <li>Content must not violate any person's privacy or publicity rights</li>
                <li>Content must not contain personal health information of others</li>
                <li>Content must not contain spam, commercial solicitations, or promotional materials</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Content Moderation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sal-lmjarab reserves the right, but has no obligation, to monitor, edit, or remove any user content that violates these Terms of Use or that we find objectionable for any reason. We may remove or refuse to display content that we believe violates these Terms of Use or our policies, or that we believe may be offensive, illegal, or violate the rights of any person.
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Intellectual Property
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Sal-lmjarab Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The Platform and its original content, features, and functionality are owned by Sal-lmjarab and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any of the material on our Platform without prior written consent.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Trademarks
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The Sal-lmjarab name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Sal-lmjarab or its affiliates. You may not use such marks without the prior written permission of Sal-lmjarab.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Third-Party Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our Platform may contain content provided by third parties, including Healthcare Providers. All statements and/or opinions expressed in such materials, and all articles and responses to questions and other content, other than the content provided by Sal-lmjarab, are solely the responsibility of the person or entity providing those materials.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy
          </h2>
          
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your privacy is important to us. Our Privacy Policy describes how we collect, use, and disclose information about you when you use our Platform. By using our Platform, you consent to the collection, use, and disclosure of information as described in our Privacy Policy.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Please review our <Link to="/privacy" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">Privacy Policy</Link> to understand our practices.
              </p>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Limitation of Liability
          </h2>
          
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-red-800 dark:text-red-300">
                Important Limitation
              </h3>
            </div>
            <p className="text-red-700 dark:text-red-400">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SAL-LMJARAB AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, AND LICENSORS WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM.
            </p>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            Sal-lmjarab does not guarantee the accuracy, completeness, or usefulness of any information on the Platform or the availability of the Platform at any particular time. Sal-lmjarab cannot and does not guarantee that the Platform will be free from viruses or other destructive code.
          </p>
        </div>

        {/* Indemnification */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Indemnification
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400">
            You agree to defend, indemnify, and hold harmless Sal-lmjarab, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Use or your use of the Platform.
          </p>
        </div>

        {/* Termination */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Termination
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of these Terms of Use.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            If you wish to terminate your account, you may simply discontinue using the Platform, or you may contact us to request account deletion.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Changes to Terms of Use
          </h2>
          
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may revise and update these Terms of Use from time to time at our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Platform thereafter.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Your continued use of the Platform following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
              </p>
            </div>
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Governing Law and Jurisdiction
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400">
            These Terms of Use and any dispute or claim arising out of or in connection with them or their subject matter or formation shall be governed by and construed in accordance with the laws of Morocco, without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, or proceeding arising out of, or related to, these Terms of Use or the Platform shall be instituted exclusively in the courts of Morocco.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have any questions about these Terms of Use, please contact us:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300">legal@sal-lmjarab.ma</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300">+212 522 XXX XXX</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300">
                123 Boulevard Mohammed V, Casablanca, 20000, Morocco
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;