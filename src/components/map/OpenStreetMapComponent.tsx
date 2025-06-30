import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Phone, Navigation, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface OpenStreetMapComponentProps {
  providers?: Provider[];
  height?: string;
  width?: string;
  zoom?: number;
  showControls?: boolean;
  interactive?: boolean;
  onProviderSelect?: (provider: Provider) => void;
}

const OpenStreetMapComponent: React.FC<OpenStreetMapComponentProps> = ({
  providers = [],
  height = '400px',
  width = '100%',
  zoom = 12,
  showControls = true,
  interactive = true,
  onProviderSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Dynamically load Leaflet CSS and JS
        if (!document.querySelector('#leaflet-css')) {
          const css = document.createElement('link');
          css.id = 'leaflet-css';
          css.rel = 'stylesheet';
          css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          css.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          css.crossOrigin = '';
          document.head.appendChild(css);
        }

        if (!window.L) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          script.crossOrigin = '';
          script.onload = initializeMap;
          document.head.appendChild(script);
        } else {
          initializeMap();
        }
      } catch (err) {
        setError('Failed to load map library');
        setLoading(false);
      }
    };

    loadLeaflet();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    try {
      // Initialize map centered on Casablanca
      const defaultLocation = { lat: 33.5731, lng: -7.5898 };
      const mapInstance = window.L.map(mapRef.current).setView(defaultLocation, zoom);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(mapInstance);

      setMap(mapInstance);

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation({ latitude: userPos.lat, longitude: userPos.lng });

            // Add user location marker
            window.L.marker(userPos, {
              icon: window.L.divIcon({
                className: 'user-location-marker',
                html: '<div style="background: #3B82F6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [12, 12],
                iconAnchor: [6, 6]
              })
            }).addTo(mapInstance).bindPopup('Your Location');

            mapInstance.setView(userPos, zoom);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }

      // Add provider markers
      addProviderMarkers(mapInstance);
      setLoading(false);

    } catch (err) {
      setError('Failed to initialize map');
      setLoading(false);
    }
  };

  const addProviderMarkers = (mapInstance: any) => {
    const newMarkers: any[] = [];

    providers.forEach(provider => {
      const markerColor = getMarkerColor(provider.type);
      const markerIcon = window.L.divIcon({
        className: 'provider-marker',
        html: `<div style="background: ${markerColor}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">${getMarkerIcon(provider.type)}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });

      const marker = window.L.marker(
        [provider.coordinates.latitude, provider.coordinates.longitude],
        { icon: markerIcon }
      ).addTo(mapInstance);

      const popupContent = createPopupContent(provider);
      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setSelectedProvider(provider);
        if (onProviderSelect) {
          onProviderSelect(provider);
        }
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'doctor':
        return '#3B82F6'; // blue
      case 'hospital':
        return '#EF4444'; // red
      case 'pharmacy':
        return '#10B981'; // green
      default:
        return '#6B7280'; // gray
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'doctor':
        return '👨‍⚕️';
      case 'hospital':
        return '🏥';
      case 'pharmacy':
        return '💊';
      default:
        return '📍';
    }
  };

  const createPopupContent = (provider: Provider) => {
    return `
      <div class="p-3 max-w-xs">
        <h3 class="font-semibold text-gray-900 mb-1">${provider.name}</h3>
        ${provider.specialty ? `<p class="text-sm text-gray-600 mb-1">${provider.specialty}</p>` : ''}
        <div class="flex items-center space-x-1 mb-2">
          <span class="text-yellow-400">★</span>
          <span class="text-sm">${provider.rating}</span>
          ${provider.distance ? `<span class="mx-1">•</span><span class="text-sm">${provider.distance.toFixed(1)} km</span>` : ''}
        </div>
        ${provider.address ? `<p class="text-xs text-gray-500 mb-2">${provider.address}</p>` : ''}
        <div class="flex space-x-2">
          ${provider.phone ? `<a href="tel:${provider.phone}" class="flex-1 text-center px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">Call</a>` : ''}
          <a href="https://www.openstreetmap.org/directions?from=&to=${provider.coordinates.latitude},${provider.coordinates.longitude}" target="_blank" class="flex-1 text-center px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">Directions</a>
          ${provider.type === 'doctor' ? `<a href="/doctor/${provider.id}" class="flex-1 text-center px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs">Book</a>` : ''}
        </div>
      </div>
    `;
  };

  if (loading) {
    return (
      <div style={{ height, width }} className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height, width }} className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center p-4">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Map Loading Error
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height, width }} className="relative rounded-lg overflow-hidden">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      
      {/* Map Controls */}
      {showControls && map && (
        <div className="absolute top-4 right-4 space-y-2">
          <button
            onClick={() => map.setZoom(map.getZoom() + 1)}
            className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => map.setZoom(map.getZoom() - 1)}
            className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50"
            title="Zoom Out"
          >
            −
          </button>
          {userLocation && (
            <button
              onClick={() => map.setView([userLocation.latitude, userLocation.longitude], zoom)}
              className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50"
              title="Go to My Location"
            >
              <Navigation className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Provider List Overlay */}
      {providers.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-h-32 overflow-y-auto">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Nearby Providers ({providers.length})
          </h4>
          <div className="space-y-1">
            {providers.slice(0, 3).map(provider => (
              <div 
                key={provider.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                onClick={() => {
                  map.setView([provider.coordinates.latitude, provider.coordinates.longitude], 15);
                  setSelectedProvider(provider);
                }}
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{provider.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{provider.specialty}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-sm">★ {provider.rating}</span>
                  {provider.distance && (
                    <span className="text-xs text-gray-500">{provider.distance.toFixed(1)} km</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Add Leaflet types to window
declare global {
  interface Window {
    L: any;
  }
}

export default OpenStreetMapComponent; 