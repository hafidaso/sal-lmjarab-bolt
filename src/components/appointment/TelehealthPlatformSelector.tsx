import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Monitor, 
  Smartphone, 
  Laptop, 
  Users, 
  Shield, 
  Clock, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { telehealthService, TelehealthPlatform } from '../../services/telehealthService';

interface TelehealthPlatformSelectorProps {
  onPlatformSelected: (platform: TelehealthPlatform) => void;
  selectedPlatform?: string;
  onClose?: () => void;
}

const TelehealthPlatformSelector: React.FC<TelehealthPlatformSelectorProps> = ({
  onPlatformSelected,
  selectedPlatform,
  onClose
}) => {
  const [platforms, setPlatforms] = useState<TelehealthPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  useEffect(() => {
    loadPlatforms();
  }, []);

  const loadPlatforms = async () => {
    try {
      const availablePlatforms = await telehealthService.getAvailablePlatforms();
      setPlatforms(availablePlatforms);
    } catch (error) {
      console.error('Error loading platforms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformSelect = (platform: TelehealthPlatform) => {
    onPlatformSelected(platform);
  };

  const getPlatformIcon = (platformType: string) => {
    switch (platformType) {
      case 'zoom':
        return (
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
        );
      case 'teams':
        return (
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
        );
      case 'custom':
        return (
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <Monitor className="w-6 h-6 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>
        );
    }
  };

  const getPlatformInstructions = (platformId: string) => {
    return telehealthService.getPlatformInstructions(platformId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Choose Your Telehealth Platform
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select the platform you prefer for your video consultation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
              selectedPlatform === platform.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
            }`}
            onClick={() => handlePlatformSelect(platform)}
            onMouseEnter={() => setHoveredPlatform(platform.id)}
            onMouseLeave={() => setHoveredPlatform(null)}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                {getPlatformIcon(platform.type)}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {platform.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {platform.type === 'zoom' && 'Professional video conferencing'}
                    {platform.type === 'teams' && 'Enterprise collaboration platform'}
                    {platform.type === 'custom' && 'Secure custom platform'}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Features
                </h5>
                <div className="space-y-1">
                  {platform.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {platform.features.length > 3 && (
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        +{platform.features.length - 3} more
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Platform-specific info */}
              {hoveredPlatform === platform.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h6 className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Setup Instructions
                      </h6>
                      <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                        {getPlatformInstructions(platform.id).slice(0, 2).map((instruction, index) => (
                          <li key={index}>• {instruction}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Selection indicator */}
              {selectedPlatform === platform.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform comparison */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Platform Comparison
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-white">Zoom</div>
            <div className="text-gray-600 dark:text-gray-400">Most Popular</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-white">Teams</div>
            <div className="text-gray-600 dark:text-gray-400">Enterprise</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-white">Custom</div>
            <div className="text-gray-600 dark:text-gray-400">Secure</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900 dark:text-white">All</div>
            <div className="text-gray-600 dark:text-gray-400">HIPAA Compliant</div>
          </div>
        </div>
      </div>

      {/* Security notice */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
              Secure & Private
            </h4>
            <p className="text-sm text-green-800 dark:text-green-200">
              All platforms are HIPAA-compliant and use end-to-end encryption to ensure your privacy and security during consultations.
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={() => {
            const platform = platforms.find(p => p.id === selectedPlatform);
            if (platform) {
              handlePlatformSelect(platform);
            }
          }}
          disabled={!selectedPlatform}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedPlatform
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TelehealthPlatformSelector; 