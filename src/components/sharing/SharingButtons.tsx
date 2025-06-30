import React, { useState } from 'react';
import { Share2, Mail, MessageSquare, Facebook, Twitter, Linkedin, Link, Download, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sharingService, ShareableContent, ShareOptions } from '../../services/sharingService';

interface SharingButtonsProps {
  content: ShareableContent;
  showAnalytics?: boolean;
  compact?: boolean;
}

const SharingButtons: React.FC<SharingButtonsProps> = ({
  content,
  showAnalytics = false,
  compact = false
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');

  const shareOptions = [
    {
      platform: 'whatsapp' as const,
      label: 'WhatsApp',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800'
    },
    {
      platform: 'email' as const,
      label: 'Email',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'
    },
    {
      platform: 'sms' as const,
      label: 'SMS',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800'
    },
    {
      platform: 'facebook' as const,
      label: 'Facebook',
      icon: Facebook,
      color: 'text-blue-700',
      bgColor: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'
    },
    {
      platform: 'twitter' as const,
      label: 'Twitter',
      icon: Twitter,
      color: 'text-sky-600',
      bgColor: 'bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 dark:hover:bg-sky-800'
    },
    {
      platform: 'linkedin' as const,
      label: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-800',
      bgColor: 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'
    },
    {
      platform: 'copy-link' as const,
      label: 'Copy Link',
      icon: copied ? Check : Copy,
      color: copied ? 'text-green-600' : 'text-gray-600',
      bgColor: copied 
        ? 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800'
        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
    }
  ];

  const handleShare = async (platform: ShareOptions['platform']) => {
    try {
      const options: ShareOptions = {
        platform,
        customMessage: customMessage || undefined,
        recipientEmail: recipientEmail || undefined,
        recipientPhone: recipientPhone || undefined
      };

      const success = await sharingService.shareContent(content, options);
      
      if (success) {
        if (platform === 'copy-link') {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        setShowShareMenu(false);
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      alert('Sharing failed. Please try again.');
    }
  };

  const handleDownloadVCard = async () => {
    if (content.type === 'doctor') {
      try {
        const doctorData = {
          id: content.id,
          name: content.title,
          specialty: content.metadata.specialty,
          phone: content.metadata.phone,
          email: content.metadata.email,
          address: content.metadata.location,
          city: content.metadata.location,
          rating: content.metadata.rating
        };
        
        await sharingService.downloadVCard(doctorData);
      } catch (error) {
        console.error('VCard download failed:', error);
      }
    }
  };

  const loadAnalytics = async () => {
    if (showAnalytics) {
      try {
        const analytics = await sharingService.getShareAnalytics(content.id, content.type);
        setShareAnalytics(analytics);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      }
    }
  };

  React.useEffect(() => {
    if (showShareMenu && showAnalytics) {
      loadAnalytics();
    }
  }, [showShareMenu, showAnalytics]);

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50"
            >
              <div className="grid grid-cols-3 gap-2">
                {shareOptions.slice(0, 6).map((option) => (
                  <button
                    key={option.platform}
                    onClick={() => handleShare(option.platform)}
                    className={`p-2 rounded-lg transition-colors ${option.bgColor}`}
                    title={option.label}
                  >
                    <option.icon className={`w-4 h-4 ${option.color}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Share Button */}
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Share2 className="w-5 h-5" />
        <span>Share Profile</span>
      </button>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4"
          >
            {/* Custom Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Message (Optional)
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add a personal message..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                rows={2}
              />
            </div>

            {/* Email/Phone for specific platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email (for email sharing)
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone (for SMS sharing)
                </label>
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.platform}
                  onClick={() => handleShare(option.platform)}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors ${option.bgColor}`}
                >
                  <option.icon className={`w-6 h-6 ${option.color}`} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Download vCard (for doctors) */}
            {content.type === 'doctor' && (
              <button
                onClick={handleDownloadVCard}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Contact Card</span>
              </button>
            )}

            {/* Analytics */}
            {showAnalytics && shareAnalytics && (
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Sharing Analytics
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {shareAnalytics.totalShares}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Shares</div>
                  </div>
                  
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {shareAnalytics.clickThroughs}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Click-throughs</div>
                  </div>
                  
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {(shareAnalytics.conversionRate * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Conversion Rate</div>
                  </div>
                  
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {Object.keys(shareAnalytics.sharesByPlatform).length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Platforms</div>
                  </div>
                </div>

                {/* Platform Breakdown */}
                <div className="mt-4">
                  <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shares by Platform
                  </h5>
                  <div className="space-y-2">
                    {Object.entries(shareAnalytics.sharesByPlatform).map(([platform, count]) => (
                      <div key={platform} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-gray-600 dark:text-gray-400">{platform}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SharingButtons;