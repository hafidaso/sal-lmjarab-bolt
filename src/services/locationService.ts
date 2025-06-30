import { distance } from 'geolocation-utils';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationDetails {
  coordinates: LocationCoordinates;
  city?: string;
  address?: string;
  postalCode?: string;
  country?: string;
}

export interface NearbySearchOptions {
  radius?: number; // in kilometers
  limit?: number;
  types?: ('doctor' | 'hospital' | 'pharmacy')[];
  specialties?: string[];
  insurance?: string[];
  rating?: number;
  availability?: boolean;
}

class LocationService {
  private userLocation: LocationDetails | null = null;
  private locationPermissionGranted: boolean = false;
  private defaultLocation: LocationCoordinates = {
    // Default to Casablanca
    latitude: 33.5731,
    longitude: -7.5898
  };

  // Major cities in Morocco with coordinates
  private cities = [
    { name: 'Casablanca', coordinates: { latitude: 33.5731, longitude: -7.5898 } },
    { name: 'Rabat', coordinates: { latitude: 34.0209, longitude: -6.8416 } },
    { name: 'Marrakech', coordinates: { latitude: 31.6295, longitude: -7.9811 } },
    { name: 'Fes', coordinates: { latitude: 34.0181, longitude: -5.0078 } },
    { name: 'Tangier', coordinates: { latitude: 35.7595, longitude: -5.8340 } },
    { name: 'Agadir', coordinates: { latitude: 30.4278, longitude: -9.5981 } }
  ];

  constructor() {
    this.initializeLocation();
  }

  private async initializeLocation(): Promise<void> {
    try {
      // Try to get location from localStorage first
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        this.userLocation = JSON.parse(savedLocation);
        this.locationPermissionGranted = true;
        return;
      }

      // Otherwise try to get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = {
              coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            };
            this.locationPermissionGranted = true;
            this.reverseGeocode(this.userLocation.coordinates);
            localStorage.setItem('userLocation', JSON.stringify(this.userLocation));
          },
          (error) => {
            console.error('Geolocation error:', error);
            this.locationPermissionGranted = false;
            this.userLocation = { coordinates: this.defaultLocation };
          },
          { timeout: 10000, enableHighAccuracy: true }
        );
      } else {
        console.error('Geolocation not supported by this browser');
        this.locationPermissionGranted = false;
        this.userLocation = { coordinates: this.defaultLocation };
      }
    } catch (error) {
      console.error('Error initializing location:', error);
      this.userLocation = { coordinates: this.defaultLocation };
    }
  }

  async getUserLocation(): Promise<LocationDetails | null> {
    if (this.userLocation) {
      return this.userLocation;
    }

    // If location not initialized yet, wait for it
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.userLocation) {
          clearInterval(checkInterval);
          resolve(this.userLocation);
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve({ coordinates: this.defaultLocation });
      }, 5000);
    });
  }

  async requestLocationPermission(): Promise<boolean> {
    if (this.locationPermissionGranted) {
      return true;
    }

    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = {
              coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            };
            this.locationPermissionGranted = true;
            this.reverseGeocode(this.userLocation.coordinates);
            localStorage.setItem('userLocation', JSON.stringify(this.userLocation));
            resolve(true);
          },
          (error) => {
            console.error('Geolocation permission denied:', error);
            this.locationPermissionGranted = false;
            resolve(false);
          }
        );
      } else {
        console.error('Geolocation not supported');
        resolve(false);
      }
    });
  }

  async setManualLocation(location: LocationDetails): Promise<void> {
    this.userLocation = location;
    localStorage.setItem('userLocation', JSON.stringify(location));
  }

  async setLocationByCity(cityName: string): Promise<boolean> {
    const city = this.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (city) {
      this.userLocation = {
        coordinates: city.coordinates,
        city: city.name,
        country: 'Morocco'
      };
      localStorage.setItem('userLocation', JSON.stringify(this.userLocation));
      return true;
    }
    return false;
  }

  isLocationPermissionGranted(): boolean {
    return this.locationPermissionGranted;
  }

  calculateDistance(coordinates: LocationCoordinates): number {
    if (!this.userLocation) {
      return 0;
    }

    return distance(
      [this.userLocation.coordinates.longitude, this.userLocation.coordinates.latitude],
      [coordinates.longitude, coordinates.latitude]
    ) / 1000; // Convert meters to kilometers
  }

  async getNearestCity(): Promise<string> {
    if (!this.userLocation) {
      return 'Casablanca'; // Default city
    }

    let nearestCity = this.cities[0];
    let shortestDistance = Number.MAX_VALUE;

    for (const city of this.cities) {
      const dist = distance(
        [this.userLocation.coordinates.longitude, this.userLocation.coordinates.latitude],
        [city.coordinates.longitude, city.coordinates.latitude]
      ) / 1000;

      if (dist < shortestDistance) {
        shortestDistance = dist;
        nearestCity = city;
      }
    }

    return nearestCity.name;
  }

  private async reverseGeocode(coordinates: LocationCoordinates): Promise<void> {
    try {
      // In a real implementation, this would call a geocoding API
      // For now, we'll just find the nearest city from our predefined list
      let nearestCity = null;
      let shortestDistance = Number.MAX_VALUE;

      for (const city of this.cities) {
        const dist = distance(
          [coordinates.longitude, coordinates.latitude],
          [city.coordinates.longitude, city.coordinates.latitude]
        ) / 1000;

        if (dist < shortestDistance) {
          shortestDistance = dist;
          nearestCity = city;
        }
      }

      if (nearestCity && this.userLocation) {
        this.userLocation.city = nearestCity.name;
        this.userLocation.country = 'Morocco';
        localStorage.setItem('userLocation', JSON.stringify(this.userLocation));
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
    }
  }

  async searchNearby(options: NearbySearchOptions = {}): Promise<any[]> {
    // This would call an API in production
    // For now, we'll return mock data
    const mockResults = [
      {
        id: '1',
        name: 'Dr. Ahmed Bennani',
        type: 'doctor',
        specialty: 'Cardiology',
        rating: 4.8,
        distance: 2.3,
        coordinates: { latitude: 33.5931, longitude: -7.5898 }
      },
      {
        id: '2',
        name: 'CHU Ibn Rochd',
        type: 'hospital',
        rating: 4.6,
        distance: 3.1,
        coordinates: { latitude: 33.5892, longitude: -7.6036 }
      },
      {
        id: '3',
        name: 'Pharmacie Centrale',
        type: 'pharmacy',
        rating: 4.7,
        distance: 1.5,
        coordinates: { latitude: 33.5731, longitude: -7.5798 }
      }
    ];

    // Filter by type if specified
    let results = mockResults;
    if (options.types && options.types.length > 0) {
      results = results.filter(r => options.types?.includes(r.type as any));
    }

    // Filter by radius
    if (options.radius) {
      results = results.filter(r => r.distance <= options.radius);
    }

    // Filter by rating
    if (options.rating) {
      results = results.filter(r => r.rating >= options.rating);
    }

    // Sort by distance
    results.sort((a, b) => a.distance - b.distance);

    // Apply limit
    if (options.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  getLocationPrompt(): string {
    if (this.userLocation?.city) {
      return `We're showing results for ${this.userLocation.city}. Is this correct?`;
    } else {
      return "We'd like to show you healthcare providers near you. Would you like to share your location?";
    }
  }
}

export const locationService = new LocationService();