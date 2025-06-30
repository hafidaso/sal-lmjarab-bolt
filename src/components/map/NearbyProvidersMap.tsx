import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { MapPin, Star, Phone, Navigation, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locationService } from '../../services/locationService';

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

interface NearbyProvidersMapProps {
  providers?: Provider[];
  height?: string;
  width?: string;
  zoom?: number;
  showControls?: boolean;
  interactive?: boolean;
  onProviderSelect?: (provider: Provider) => void;
}

const NearbyProvidersMap: React.FC<NearbyProvidersMapProps> = ({
  providers = [],
  height = '400px',
  width = '100%',
  zoom = 12,
  showControls = true,
  interactive = true,
  onProviderSelect
}) => {
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 33.5731, // Default to Casablanca
    longitude: -7.5898,
    zoom: zoom
  });

  // Get Mapbox token from environment variables
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

  useEffect(() => {
    const initializeMap = async () => {
      const location = await locationService.getUserLocation();
      if (location) {
        setUserLocation(location.coordinates);
        setViewState(prev => ({
          ...prev,
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude
        }));
      }
    };

    initializeMap();
  }, []);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'doctor':
        return '#3B82F6'; // blue-500
      case 'hospital':
        return '#EF4444'; // red-500
      case 'pharmacy':
        return '#10B981'; // emerald-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  const handleMarkerClick = (provider: Provider) => {
    setSelectedProvider(provider);
    if (onProviderSelect) {
      onProviderSelect(provider);
    }
  };

  return (
    <div style={{ height, width }} className="relative rounded-lg overflow-hidden">
      {!mapboxToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <div className="text-center p-4">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              Mapbox token not configured. Please add VITE_MAPBOX_TOKEN to your environment variables.
            </p>
          </div>
        </div>
      )}
      
      {mapboxToken && (
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapboxToken}
          attributionControl={true}
          interactive={interactive}
        >
          {showControls && (
            <>
              <NavigationControl position="top-right" />
              <GeolocateControl
                position="top-right"
                trackUserLocation
                onGeolocate={(e) => {
                  setUserLocation({
                    latitude: e.coords.latitude,
                    longitude: e.coords.longitude
                  });
                }}
              />
            </>
          )}
          
          {/* User location marker */}
          {userLocation && (
            <Marker
              longitude={userLocation.longitude}
              latitude={userLocation.latitude}
              anchor="center"
            >
              <div className="w-6 h-6 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </Marker>
          )}
          
          {/* Provider markers */}
          {providers.map(provider => (
            <Marker
              key={provider.id}
              longitude={provider.coordinates.longitude}
              latitude={provider.coordinates.latitude}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(provider);
              }}
            >
              <div 
                className="cursor-pointer transform transition-transform hover:scale-110"
                style={{ color: getMarkerColor(provider.type) }}
              >
                <MapPin className="w-8 h-8" />
              </div>
            </Marker>
          ))}
          
          {/* Selected provider popup */}
          {selectedProvider && (
            <Popup
              longitude={selectedProvider.coordinates.longitude}
              latitude={selectedProvider.coordinates.latitude}
              anchor="bottom"
              onClose={() => setSelectedProvider(null)}
              closeButton={true}
              closeOnClick={false}
              className="z-10"
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-gray-900 mb-1">{selectedProvider.name}</h3>
                {selectedProvider.specialty && (
                  <p className="text-sm text-gray-600 mb-1">{selectedProvider.specialty}</p>
                )}
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{selectedProvider.rating}</span>
                  {selectedProvider.distance && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="text-sm">{selectedProvider.distance.toFixed(1)} km</span>
                    </>
                  )}
                </div>
                {selectedProvider.address && (
                  <p className="text-xs text-gray-500 mb-2">{selectedProvider.address}</p>
                )}
                <div className="flex space-x-2 mt-2">
                  {selectedProvider.phone && (
                    <a 
                      href={`tel:${selectedProvider.phone}`}
                      className="flex-1 flex items-center justify-center space-x-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  )}
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedProvider.coordinates.latitude},${selectedProvider.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </a>
                  {selectedProvider.type === 'doctor' && (
                    <Link 
                      to={`/doctor/${selectedProvider.id}`}
                      className="flex-1 flex items-center justify-center space-x-1 px-2 py-1 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded text-xs font-medium"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book</span>
                    </Link>
                  )}
                </div>
              </div>
            </Popup>
          )}
        </Map>
      )}
    </div>
  );
};

export default NearbyProvidersMap;