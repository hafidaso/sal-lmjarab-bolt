import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Star, Phone, Navigation, Calendar, Search, Filter, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Provider {
  id: string;
  name: string;
  type: 'doctor' | 'hospital' | 'pharmacy';
  specialty?: string;
  rating: number;
  reviewCount: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  phone?: string;
  distance?: number;
  image?: string;
  fees?: number;
  insurance?: string[];
  availability?: string;
}

interface GoogleMapsIntegrationProps {
  onProviderSelect?: (provider: Provider) => void;
  onLocationChange?: (location: { latitude: number; longitude: number; address: string }) => void;
  height?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  initialLocation?: { latitude: number; longitude: number };
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMapsIntegration: React.FC<GoogleMapsIntegrationProps> = ({
  onProviderSelect,
  onLocationChange,
  height = '600px',
  showSearch = true,
  showFilters = true,
  initialLocation
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProviderList, setShowProviderList] = useState(false);
  const [filters, setFilters] = useState({
    radius: 10,
    type: 'all' as 'all' | 'doctor' | 'hospital' | 'pharmacy',
    specialty: '',
    minRating: 0,
    maxDistance: 50
  });

  // Mock providers data - in real app, this would come from API
  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Bennani',
      type: 'doctor',
      specialty: 'Cardiology',
      rating: 4.8,
      reviewCount: 127,
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      address: 'Boulevard Zerktouni, Casablanca',
      phone: '+212 522 123 456',
      distance: 2.3,
      image: 'https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400',
      fees: 400,
      insurance: ['CNSS', 'RAMED', 'Private'],
      availability: 'Next available: Tomorrow'
    },
    {
      id: '2',
      name: 'CHU Ibn Rochd',
      type: 'hospital',
      specialty: 'General Hospital',
      rating: 4.6,
      reviewCount: 1247,
      coordinates: { latitude: 33.5892, longitude: -7.6036 },
      address: '1 Rue des Hôpitaux, Casablanca',
      phone: '+212 522 234 567',
      distance: 3.1,
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400',
      insurance: ['CNSS', 'RAMED', 'Private'],
      availability: '24/7 Emergency Services'
    },
    {
      id: '3',
      name: 'Pharmacie Centrale',
      type: 'pharmacy',
      rating: 4.4,
      reviewCount: 89,
      coordinates: { latitude: 33.5957, longitude: -7.6323 },
      address: 'Avenue Mohammed V, Casablanca',
      phone: '+212 522 345 678',
      distance: 1.8,
      image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=400',
      availability: 'Open until 10 PM'
    }
  ];

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      const defaultLocation = initialLocation || { latitude: 33.5731, longitude: -7.5898 }; // Casablanca

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: defaultLocation.latitude, lng: defaultLocation.longitude },
        zoom: 13,
        styles: [
          {
            featureType: 'poi.medical',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });

      setMap(mapInstance);

      // Add user location marker
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation({ latitude: userPos.lat, longitude: userPos.lng });
            
            new window.google.maps.Marker({
              position: userPos,
              map: mapInstance,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#3B82F6',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              },
              title: 'Your Location'
            });

            mapInstance.setCenter(userPos);
          },
          (error) => {
            console.error('Error getting location:', error);
            toast.error('Unable to get your location');
          }
        );
      }

      // Add provider markers
      addProviderMarkers(mapInstance);
    };

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup markers
      markers.forEach(marker => marker.setMap(null));
    };
  }, [initialLocation]);

  const addProviderMarkers = useCallback((mapInstance: any) => {
    const newMarkers: any[] = [];
    
    mockProviders.forEach(provider => {
      const marker = new window.google.maps.Marker({
        position: { lat: provider.coordinates.latitude, lng: provider.coordinates.longitude },
        map: mapInstance,
        icon: {
          url: getMarkerIcon(provider.type),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        },
        title: provider.name
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(provider)
      });

      marker.addListener('click', () => {
        setSelectedProvider(provider);
        infoWindow.open(mapInstance, marker);
        if (onProviderSelect) {
          onProviderSelect(provider);
        }
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [onProviderSelect]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'doctor':
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#3B82F6"/>
            <path d="M16 8C18.21 8 20 9.79 20 12C20 14.21 18.21 16 16 16C13.79 16 12 14.21 12 12C12 9.79 13.79 8 16 8ZM16 18C20.42 18 24 21.58 24 26V28H8V26C8 21.58 11.58 18 16 18Z" fill="white"/>
          </svg>
        `);
      case 'hospital':
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#EF4444"/>
            <path d="M12 8V12H8V16H12V20H16V16H20V12H16V8H12ZM24 24H8V28H24V24Z" fill="white"/>
          </svg>
        `);
      case 'pharmacy':
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#10B981"/>
            <path d="M16 8L20 12V20C20 22.21 18.21 24 16 24C13.79 24 12 22.21 12 20V12L16 8ZM16 10L14 12V20C14 21.1 14.9 22 16 22C17.1 22 18 21.1 18 20V12L16 10Z" fill="white"/>
          </svg>
        `);
      default:
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#6B7280"/>
            <path d="M16 8C18.21 8 20 9.79 20 12C20 14.21 18.21 16 16 16C13.79 16 12 14.21 12 12C12 9.79 13.79 8 16 8ZM16 18C20.42 18 24 21.58 24 26V28H8V26C8 21.58 11.58 18 16 18Z" fill="white"/>
          </svg>
        `);
    }
  };

  const createInfoWindowContent = (provider: Provider) => {
    return `
      <div class="p-3 max-w-xs">
        <h3 class="font-semibold text-gray-900 mb-1">${provider.name}</h3>
        ${provider.specialty ? `<p class="text-sm text-gray-600 mb-1">${provider.specialty}</p>` : ''}
        <div class="flex items-center space-x-1 mb-2">
          <span class="text-yellow-400">★</span>
          <span class="text-sm">${provider.rating} (${provider.reviewCount} reviews)</span>
          ${provider.distance ? `<span class="mx-1">•</span><span class="text-sm">${provider.distance.toFixed(1)} km</span>` : ''}
        </div>
        <p class="text-xs text-gray-500 mb-2">${provider.address}</p>
        <div class="flex space-x-2">
          ${provider.phone ? `<a href="tel:${provider.phone}" class="flex-1 text-center px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">Call</a>` : ''}
          <a href="https://www.google.com/maps/dir/?api=1&destination=${provider.coordinates.latitude},${provider.coordinates.longitude}" target="_blank" class="flex-1 text-center px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs">Directions</a>
          ${provider.type === 'doctor' ? `<a href="/doctor/${provider.id}" class="flex-1 text-center px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs">Book</a>` : ''}
        </div>
      </div>
    `;
  };

  const handleLocationSearch = async () => {
    if (!locationQuery.trim() || !window.google) return;

    setLoading(true);
    try {
      const geocoder = new window.google.maps.Geocoder();
      const result = await geocoder.geocode({ address: locationQuery });
      
      if (result.results.length > 0) {
        const location = result.results[0].geometry.location;
        const address = result.results[0].formatted_address;
        
        map.setCenter(location);
        map.setZoom(15);
        
        setUserLocation({ latitude: location.lat(), longitude: location.lng() });
        
        if (onLocationChange) {
          onLocationChange({
            latitude: location.lat(),
            longitude: location.lng(),
            address
          });
        }
        
        toast.success(`Location updated to ${address}`);
      } else {
        toast.error('Location not found');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast.error('Error finding location');
    } finally {
      setLoading(false);
    }
  };

  const handleNearbySearch = async () => {
    if (!userLocation || !window.google) return;

    setLoading(true);
    try {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: { lat: userLocation.latitude, lng: userLocation.longitude },
        radius: filters.radius * 1000, // Convert to meters
        type: filters.type === 'all' ? undefined : filters.type,
        keyword: filters.specialty || undefined
      };

      service.nearbySearch(request, (results: any[], status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const nearbyProviders = results.map(place => ({
            id: place.place_id,
            name: place.name,
            type: getProviderType(place.types),
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total || 0,
            coordinates: {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            },
            address: place.vicinity,
            phone: place.formatted_phone_number,
            distance: calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              place.geometry.location.lat(),
              place.geometry.location.lng()
            )
          }));

          setProviders(nearbyProviders);
          toast.success(`Found ${nearbyProviders.length} nearby providers`);
        } else {
          toast.error('No providers found in this area');
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Nearby search error:', error);
      toast.error('Error searching for providers');
      setLoading(false);
    }
  };

  const getProviderType = (types: string[]): 'doctor' | 'hospital' | 'pharmacy' => {
    if (types.includes('hospital')) return 'hospital';
    if (types.includes('pharmacy')) return 'pharmacy';
    return 'doctor';
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredProviders = providers.filter(provider => {
    if (filters.minRating > 0 && provider.rating < filters.minRating) return false;
    if (provider.distance && provider.distance > filters.maxDistance) return false;
    if (filters.type !== 'all' && provider.type !== filters.type) return false;
    return true;
  });

  return (
    <div className="relative" style={{ height }}>
      {/* Search Interface */}
      {showSearch && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  ref={searchBoxRef}
                  type="text"
                  placeholder="Search for doctors, hospitals, or pharmacies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location or address..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <button
                onClick={handleLocationSearch}
                disabled={loading}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Search</span>
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-4 flex flex-wrap gap-4">
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="doctor">Doctors</option>
                  <option value="hospital">Hospitals</option>
                  <option value="pharmacy">Pharmacies</option>
                </select>
                
                <select
                  value={filters.radius}
                  onChange={(e) => setFilters(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={25}>25 km</option>
                  <option value={50}>50 km</option>
                </select>
                
                <input
                  type="number"
                  placeholder="Min rating"
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) || 0 }))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24"
                />
                
                <button
                  onClick={handleNearbySearch}
                  disabled={loading || !userLocation}
                  className="px-4 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  Find Nearby
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {/* Provider List */}
      <AnimatePresence>
        {showProviderList && filteredProviders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-4 right-4 w-80 max-h-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Nearby Providers ({filteredProviders.length})
                </h3>
                <button
                  onClick={() => setShowProviderList(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedProvider(provider);
                    map.setCenter({ lat: provider.coordinates.latitude, lng: provider.coordinates.longitude });
                    map.setZoom(16);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getMarkerColor(provider.type) }}
                      >
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {provider.name}
                      </h4>
                      {provider.specialty && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {provider.specialty}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {provider.rating} ({provider.reviewCount})
                          </span>
                        </div>
                        {provider.distance && (
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {provider.distance.toFixed(1)} km
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Provider List Button */}
      {filteredProviders.length > 0 && (
        <button
          onClick={() => setShowProviderList(!showProviderList)}
          className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow z-10"
        >
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default GoogleMapsIntegration; 