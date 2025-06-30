import { Doctor, Hospital, Pharmacy } from '../types/healthcare';

interface SearchCriteria {
  location: {
    latitude: number;
    longitude: number;
    radius: number; // in kilometers
  };
  specialty?: string;
  services?: string[];
  insurance?: string[];
  minRating?: number;
  emergencyServices?: boolean;
  accessibility?: boolean;
  languages?: string[];
  operatingHours?: {
    day: string;
    time: string;
  };
  facilityType?: 'doctor' | 'hospital' | 'pharmacy' | 'all';
}

export interface SearchResult {
  id: string;
  type: 'doctor' | 'hospital' | 'pharmacy';
  name: string;
  rating: number;
  distance: number;
  waitTime: number; // in minutes
  availability: 'immediate' | 'same-day' | 'next-day' | 'week+';
  coordinates: {
    latitude: number;
    longitude: number;
  };
  relevanceScore: number;
  predictedCapacity: number;
  emergencyStatus: boolean;
}

class AISearchEngine {
  private facilities: (Doctor | Hospital | Pharmacy)[] = [];
  private mlModel: any; // Placeholder for ML model
  
  constructor() {
    this.initializeMLModel();
  }

  private initializeMLModel() {
    // Initialize machine learning model for search ranking
    // This would integrate with TensorFlow.js or similar in production
    this.mlModel = {
      predict: (features: number[]) => Math.random(), // Placeholder
      updateWeights: (feedback: any) => {} // Placeholder
    };
  }

  async intelligentSearch(criteria: SearchCriteria): Promise<SearchResult[]> {
    try {
      // Step 1: Filter facilities by basic criteria
      let filteredFacilities = this.filterByCriteria(criteria);
      
      // Step 2: Calculate distances and apply location filter
      filteredFacilities = this.filterByLocation(filteredFacilities, criteria.location);
      
      // Step 3: Apply ML-based ranking
      const rankedResults = await this.rankWithML(filteredFacilities, criteria);
      
      // Step 4: Add real-time predictions
      const resultsWithPredictions = await this.addPredictiveData(rankedResults);
      
      // Step 5: Sort by relevance score
      return resultsWithPredictions.sort((a, b) => b.relevanceScore - a.relevanceScore);
      
    } catch (error) {
      console.error('Search error:', error);
      throw new Error('Search service temporarily unavailable');
    }
  }

  private filterByCriteria(criteria: SearchCriteria): any[] {
    return this.facilities.filter(facility => {
      // Rating filter
      if (criteria.minRating && facility.rating < criteria.minRating) {
        return false;
      }

      // Emergency services filter
      if (criteria.emergencyServices && !facility.emergencyServices) {
        return false;
      }

      // Insurance filter
      if (criteria.insurance && criteria.insurance.length > 0) {
        const hasInsurance = criteria.insurance.some(ins => 
          facility.insurance?.includes(ins)
        );
        if (!hasInsurance) return false;
      }

      // Language filter
      if (criteria.languages && criteria.languages.length > 0) {
        const hasLanguage = criteria.languages.some(lang => 
          facility.languages?.includes(lang)
        );
        if (!hasLanguage) return false;
      }

      // Accessibility filter
      if (criteria.accessibility && !facility.accessibility) {
        return false;
      }

      return true;
    });
  }

  private filterByLocation(facilities: any[], location: SearchCriteria['location']): any[] {
    return facilities.filter(facility => {
      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        facility.coordinates.latitude,
        facility.coordinates.longitude
      );
      return distance <= location.radius;
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI/180);
  }

  private async rankWithML(facilities: any[], criteria: SearchCriteria): Promise<SearchResult[]> {
    return facilities.map(facility => {
      // Extract features for ML model
      const features = [
        facility.rating,
        this.calculateDistance(
          criteria.location.latitude,
          criteria.location.longitude,
          facility.coordinates.latitude,
          facility.coordinates.longitude
        ),
        facility.reviewCount || 0,
        facility.experience || 0,
        facility.emergencyServices ? 1 : 0
      ];

      // Get ML prediction for relevance
      const relevanceScore = this.mlModel.predict(features);

      return {
        id: facility.id,
        type: facility.type,
        name: facility.name,
        rating: facility.rating,
        distance: features[1],
        waitTime: this.estimateWaitTime(facility),
        availability: this.determineAvailability(facility),
        coordinates: facility.coordinates,
        relevanceScore,
        predictedCapacity: 0, // Will be filled by addPredictiveData
        emergencyStatus: facility.emergencyServices || false
      };
    });
  }

  private estimateWaitTime(facility: any): number {
    // Simulate wait time estimation based on facility type and current time
    const baseWaitTime = facility.type === 'hospital' ? 45 : 
                        facility.type === 'doctor' ? 20 : 10;
    const randomFactor = Math.random() * 0.5 + 0.75; // 0.75 to 1.25
    return Math.round(baseWaitTime * randomFactor);
  }

  private determineAvailability(facility: any): 'immediate' | 'same-day' | 'next-day' | 'week+' {
    const random = Math.random();
    if (random < 0.2) return 'immediate';
    if (random < 0.5) return 'same-day';
    if (random < 0.8) return 'next-day';
    return 'week+';
  }

  private async addPredictiveData(results: SearchResult[]): Promise<SearchResult[]> {
    // Add predictive analytics data
    return results.map(result => ({
      ...result,
      predictedCapacity: this.predictCapacity(result),
      waitTime: this.adjustWaitTimeWithPredictions(result.waitTime, result)
    }));
  }

  private predictCapacity(facility: SearchResult): number {
    // Simulate capacity prediction (0-100%)
    const hour = new Date().getHours();
    const peakHours = [9, 10, 11, 14, 15, 16]; // Typical busy hours
    const isPeakHour = peakHours.includes(hour);
    
    const baseCapacity = isPeakHour ? 75 : 45;
    const randomVariation = (Math.random() - 0.5) * 20;
    
    return Math.max(0, Math.min(100, baseCapacity + randomVariation));
  }

  private adjustWaitTimeWithPredictions(baseWaitTime: number, facility: SearchResult): number {
    const capacityFactor = facility.predictedCapacity / 100;
    return Math.round(baseWaitTime * (1 + capacityFactor));
  }

  // Method to update ML model with user feedback
  updateModelWithFeedback(searchId: string, userFeedback: any) {
    // In production, this would update the ML model weights
    this.mlModel.updateWeights(userFeedback);
  }

  // Method to get trending searches and insights
  getTrendingInsights(): any {
    return {
      popularSpecialties: ['Cardiology', 'Dermatology', 'General Medicine'],
      peakSearchTimes: ['9:00-11:00', '14:00-16:00'],
      emergencyTrends: {
        increase: 15,
        commonReasons: ['Chest pain', 'Breathing difficulties', 'Accidents']
      }
    };
  }
}

const aiSearchEngine = new AISearchEngine();