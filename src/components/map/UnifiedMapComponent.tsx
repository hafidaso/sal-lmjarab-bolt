import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Loader2 } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: 'doctor' | 'hospital' | 'pharmacy';
  specialty?: string;
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  phone?: string;
  distance?: number;
}

interface UnifiedMapComponentProps {
  providers?: Provider[];
  height?: string;
  width?: string;
  zoom?: number;
  showControls?: boolean;
  interactive?: boolean;
  onProviderSelect?: (provider: Provider) => void;
  preferredAPI?: 'google' | 'mapbox' | 'auto';
}

const UnifiedMapComponent: React.FC<UnifiedMapComponentProps> = ({
  providers = [],
  height = '400px',
  width = '100%',
  zoom = 12,
  showControls = true,
  interactive = true,
  onProviderSelect,
  preferredAPI = 'auto'
}) => {
  const [mapType, setMapType] = useState<'google' | 'mapbox' | 'none'>('none');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check available APIs
  useEffect(() => {
    const checkAPIs = () => {
      const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

      if (preferredAPI === 'google' && googleMapsKey) {
        setMapType('google');
      } else if (preferredAPI === 'mapbox' && mapboxToken) {
        setMapType('mapbox');
      } else if (preferredAPI === 'auto') {
        if (googleMapsKey) {
          setMapType('google');
        } else if (mapboxToken) {
          setMapType('mapbox');
        } else {
          setError('No map API keys configured. Please add VITE_GOOGLE_MAPS_API_KEY or VITE_MAPBOX_TOKEN to your environment variables.');
        }
      } else {
        setError('Preferred map API not available. Please check your API keys.');
      }
      
      setLoading(false);
    };

    checkAPIs();
  }, [preferredAPI]);

  if (loading) {
    return (
      <div style={{ height, width }} className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height, width }} className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center p-4 max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Map Configuration Required
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>To fix this:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Get a Google Maps API key from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
              <li>Or get a Mapbox token from <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mapbox</a></li>
              <li>Add the key to your <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env</code> file</li>
              <li>Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate map component
  if (mapType === 'google') {
    return <GoogleMapsMap 
      providers={providers}
      height={height}
      width={width}
      zoom={zoom}
      showControls={showControls}
      interactive={interactive}
      onProviderSelect={onProviderSelect}
    />;
  }

  if (mapType === 'mapbox') {
    return <MapboxMap 
      providers={providers}
      height={height}
      width={width}
      zoom={zoom}
      showControls={showControls}
      interactive={interactive}
      onProviderSelect={onProviderSelect}
    />;
  }

  return null;
};

// Google Maps Implementation
const GoogleMapsMap: React.FC<UnifiedMapComponentProps> = (props) => {
  // This would import and use the existing GoogleMapsIntegration component
  // For now, return a placeholder
  return (
    <div style={{ height: props.height, width: props.width }} className="bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
        <p className="text-blue-800 dark:text-blue-200">Google Maps Integration</p>
        <p className="text-sm text-blue-600 dark:text-blue-300">Would load Google Maps here</p>
      </div>
    </div>
  );
};

// Mapbox Implementation
const MapboxMap: React.FC<UnifiedMapComponentProps> = (props) => {
  // This would import and use the existing NearbyProvidersMap component
  // For now, return a placeholder
  return (
    <div style={{ height: props.height, width: props.width }} className="bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
        <p className="text-green-800 dark:text-green-200">Mapbox Integration</p>
        <p className="text-sm text-green-600 dark:text-green-300">Would load Mapbox here</p>
      </div>
    </div>
  );
};

export default UnifiedMapComponent; 