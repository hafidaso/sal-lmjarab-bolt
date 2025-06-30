import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ExternalLink, ChevronRight, Shield, Globe, FileText, Users, Building, HelpCircle, BookOpen, Video, Newspaper, Award, Stethoscope, Pill, Calendar, MessageSquare } from 'lucide-react';

const Footer = () => {
  // Comprehensive navigation structure
  const navigationSections = [
    {
      title: 'Main Pages',
      icon: <Heart className="w-5 h-5" />,
      links: [
        { label: 'Home', href: '/', icon: <Heart className="w-4 h-4" /> },
        { label: 'About Us', href: '/about-us', icon: <Users className="w-4 h-4" /> },
        { label: 'Contact', href: '/contact', icon: <MessageSquare className="w-4 h-4" /> },
        { label: 'Help Center', href: '/help-center', icon: <HelpCircle className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Healthcare Services',
      icon: <Stethoscope className="w-5 h-5" />,
      links: [
        { label: 'Find Facility', href: '/find-facility', icon: <Building className="w-4 h-4" /> },
        { label: 'Top Hospitals', href: '/top-hospitals', icon: <Award className="w-4 h-4" /> },
        { label: 'Pharmacies', href: '/pharmacy', icon: <Pill className="w-4 h-4" /> },
        { label: 'Health Library', href: '/library', icon: <BookOpen className="w-4 h-4" /> },
        { label: 'Drugs Database', href: '/drugs-az', icon: <Pill className="w-4 h-4" /> },
        { label: 'Virtual Care', href: '/virtual-care', icon: <Video className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Resources',
      icon: <BookOpen className="w-5 h-5" />,
      links: [
        { label: 'Blog', href: '/blog', icon: <FileText className="w-4 h-4" /> },
        { label: 'News & Updates', href: '/news', icon: <Newspaper className="w-4 h-4" /> },
        { label: 'Video Center', href: '/videos', icon: <Video className="w-4 h-4" /> },
        { label: 'Careers', href: '/careers', icon: <Users className="w-4 h-4" /> },
        { label: 'Press', href: '/press', icon: <Newspaper className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Legal & Policies',
      icon: <Shield className="w-5 h-5" />,
      links: [
        { label: 'Privacy Policy', href: '/privacy', icon: <Shield className="w-4 h-4" /> },
        { label: 'Terms of Use', href: '/terms-of-use', icon: <FileText className="w-4 h-4" /> },
        { label: 'Health Data Privacy', href: '/health-data-privacy', icon: <Shield className="w-4 h-4" /> },
        { label: 'Advertising Policy', href: '/advertising-policy', icon: <FileText className="w-4 h-4" /> },
        { label: 'Privacy Settings', href: '/privacy-settings', icon: <Shield className="w-4 h-4" /> },
      ]
    }
  ];

  // Company information
  const companyInfo = {
    name: 'Sal-lmjarab Health Systems',
    description: 'Transforming healthcare delivery through innovative technology solutions that improve patient outcomes and streamline clinical workflows.',
    contact: {
      email: 'contact@sal-lmjarab.com',
      phone: '+1 (800) 555-1234',
      address: '123 Healthcare Blvd, Suite 500\nBoston, MA 02110'
    }
  };

  // Certifications
  const certifications = [
    { label: 'HIPAA Compliant', icon: <Shield className="w-5 h-5" /> },
    { label: 'SOC 2 Type II Certified', icon: <Shield className="w-5 h-5" /> },
    { label: 'HITRUST CSF Certified', icon: <Shield className="w-5 h-5" /> },
    { label: 'ISO 27001 Certified', icon: <Shield className="w-5 h-5" /> },
    { label: 'GDPR Compliant', icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-lg object-contain bg-white"
              />
              <span className="text-xl font-bold">{companyInfo.name}</span>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {companyInfo.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{companyInfo.contact.email}</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{companyInfo.contact.phone}</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm whitespace-pre-line">{companyInfo.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-6 text-primary-400 flex items-center">
                {section.icon}
                <span className="ml-2">{section.title}</span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center text-sm group"
                    >
                      <span className="mr-2 group-hover:text-primary-400 transition-colors">
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center text-gray-400 text-sm">
                <span className="mr-2 text-primary-400">
                  {cert.icon}
                </span>
                <span>{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6">
            <Link 
              to="/about-us" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              About Us
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Blog
            </Link>
            <Link 
              to="/careers" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Careers
            </Link>
            <Link 
              to="/press" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Press
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;