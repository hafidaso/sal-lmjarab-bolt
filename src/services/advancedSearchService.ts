export interface SearchFilters {
  // Basic filters
  specialty?: string[];
  location?: {
    city?: string;
    coordinates?: { lat: number; lng: number };
    radius?: number; // in km
  };
  
  // Insurance and payment
  insurance?: ('CNSS' | 'RAMED' | 'Private')[];
  priceRange?: { min: number; max: number };
  
  // Availability
  availableToday?: boolean;
  availableThisWeek?: boolean;
  appointmentType?: ('consultation' | 'follow-up' | 'emergency')[];
  timePreference?: ('morning' | 'afternoon' | 'evening')[];
  
  // Doctor attributes
  gender?: 'male' | 'female';
  languages?: string[];
  experience?: { min: number; max?: number };
  rating?: { min: number; max?: number };
  
  // Facility features
  accessibility?: boolean;
  parking?: boolean;
  publicTransport?: boolean;
  telemedicine?: boolean;
  emergencyServices?: boolean;
  
  // Advanced filters
  hospitalAffiliation?: string[];
  medicalSchool?: string[];
  certifications?: string[];
  subspecialties?: string[];
}

export interface SearchSuggestion {
  type: 'doctor' | 'specialty' | 'condition' | 'location' | 'hospital';
  text: string;
  category: string;
  popularity: number;
  metadata?: any;
}

export interface SearchResult {
  id: string;
  type: 'doctor' | 'hospital' | 'pharmacy';
  name: string;
  relevanceScore: number;
  matchedCriteria: string[];
  
  // Doctor-specific
  specialty?: string;
  subspecialties?: string[];
  experience?: number;
  rating?: number;
  reviewCount?: number;
  
  // Location
  location: {
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
    distance?: number;
  };
  
  // Availability
  nextAvailable?: Date;
  availableToday?: boolean;
  responseTime?: number; // in hours
  
  // Features
  features: string[];
  insurance: string[];
  languages: string[];
  
  // Pricing
  consultationFee?: number;
  currency?: string;
}

class AdvancedSearchService {
  private searchHistory: string[] = [];
  private popularSearches: Map<string, number> = new Map();
  private suggestions: SearchSuggestion[] = [];

  constructor() {
    this.initializeSuggestions();
  }

  private initializeSuggestions() {
    this.suggestions = [
      // Specialties
      { type: 'specialty', text: 'Cardiology', category: 'Medical Specialty', popularity: 95 },
      { type: 'specialty', text: 'Dermatology', category: 'Medical Specialty', popularity: 88 },
      { type: 'specialty', text: 'Pediatrics', category: 'Medical Specialty', popularity: 92 },
      { type: 'specialty', text: 'Gynecology', category: 'Medical Specialty', popularity: 85 },
      { type: 'specialty', text: 'Orthopedics', category: 'Medical Specialty', popularity: 78 },
      { type: 'specialty', text: 'Neurology', category: 'Medical Specialty', popularity: 72 },
      { type: 'specialty', text: 'Psychiatry', category: 'Medical Specialty', popularity: 68 },
      { type: 'specialty', text: 'Ophthalmology', category: 'Medical Specialty', popularity: 75 },
      
      // Common conditions
      { type: 'condition', text: 'Diabetes', category: 'Medical Condition', popularity: 90 },
      { type: 'condition', text: 'Hypertension', category: 'Medical Condition', popularity: 87 },
      { type: 'condition', text: 'Asthma', category: 'Medical Condition', popularity: 82 },
      { type: 'condition', text: 'Migraine', category: 'Medical Condition', popularity: 79 },
      { type: 'condition', text: 'Back pain', category: 'Medical Condition', popularity: 85 },
      { type: 'condition', text: 'Anxiety', category: 'Medical Condition', popularity: 76 },
      
      // Locations
      { type: 'location', text: 'Casablanca', category: 'City', popularity: 100 },
      { type: 'location', text: 'Rabat', category: 'City', popularity: 95 },
      { type: 'location', text: 'Marrakech', category: 'City', popularity: 88 },
      { type: 'location', text: 'Fes', category: 'City', popularity: 82 },
      { type: 'location', text: 'Tangier', category: 'City', popularity: 78 },
      { type: 'location', text: 'Agadir', category: 'City', popularity: 72 },
      
      // Doctors
      { type: 'doctor', text: 'Dr. Ahmed Bennani', category: 'Doctor', popularity: 65 },
      { type: 'doctor', text: 'Dr. Fatima Alaoui', category: 'Doctor', popularity: 62 },
      { type: 'doctor', text: 'Dr. Omar Idrissi', category: 'Doctor', popularity: 58 },
      
      // Hospitals
      { type: 'hospital', text: 'CHU Ibn Rochd', category: 'Hospital', popularity: 85 },
      { type: 'hospital', text: 'Clinique Al Andalous', category: 'Hospital', popularity: 78 },
      { type: 'hospital', text: 'Hôpital Cheikh Khalifa', category: 'Hospital', popularity: 82 }
    ];
  }

  async search(query: string, filters: SearchFilters = {}): Promise<SearchResult[]> {
    // Add to search history
    this.addToSearchHistory(query);
    
    // Parse query for entities
    const entities = this.parseQuery(query);
    
    // Combine query entities with filters
    const combinedFilters = this.combineQueryAndFilters(entities, filters);
    
    // Perform search
    const results = await this.performSearch(combinedFilters);
    
    // Rank results
    const rankedResults = this.rankResults(results, query, combinedFilters);
    
    // Apply post-processing
    return this.postProcessResults(rankedResults, combinedFilters);
  }

  async getSuggestions(query: string, limit: number = 10): Promise<SearchSuggestion[]> {
    if (!query || query.length < 2) {
      // Return popular suggestions
      return this.suggestions
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, limit);
    }

    const lowerQuery = query.toLowerCase();
    
    // Filter suggestions based on query
    const matchingSuggestions = this.suggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(lowerQuery) ||
      suggestion.category.toLowerCase().includes(lowerQuery)
    );

    // Sort by relevance and popularity
    return matchingSuggestions
      .sort((a, b) => {
        const aExactMatch = a.text.toLowerCase().startsWith(lowerQuery) ? 1 : 0;
        const bExactMatch = b.text.toLowerCase().startsWith(lowerQuery) ? 1 : 0;
        
        if (aExactMatch !== bExactMatch) {
          return bExactMatch - aExactMatch;
        }
        
        return b.popularity - a.popularity;
      })
      .slice(0, limit);
  }

  async getPopularSearches(limit: number = 5): Promise<string[]> {
    return Array.from(this.popularSearches.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([search]) => search);
  }

  async getSearchHistory(limit: number = 10): Promise<string[]> {
    return this.searchHistory.slice(-limit).reverse();
  }

  async getFilteredResults(
    baseResults: SearchResult[],
    filters: SearchFilters
  ): Promise<SearchResult[]> {
    return baseResults.filter(result => this.matchesFilters(result, filters));
  }

  async sortResults(
    results: SearchResult[],
    sortBy: 'relevance' | 'rating' | 'distance' | 'price' | 'availability' | 'experience'
  ): Promise<SearchResult[]> {
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        
        case 'distance':
          return (a.location.distance || 0) - (b.location.distance || 0);
        
        case 'price':
          return (a.consultationFee || 0) - (b.consultationFee || 0);
        
        case 'availability':
          if (a.availableToday && !b.availableToday) return -1;
          if (!a.availableToday && b.availableToday) return 1;
          return (a.responseTime || 24) - (b.responseTime || 24);
        
        case 'experience':
          return (b.experience || 0) - (a.experience || 0);
        
        default:
          return 0;
      }
    });
  }

  private parseQuery(query: string): Partial<SearchFilters> {
    const entities: Partial<SearchFilters> = {};
    const lowerQuery = query.toLowerCase();

    // Extract specialties
    const specialtyMatches = this.suggestions
      .filter(s => s.type === 'specialty' && lowerQuery.includes(s.text.toLowerCase()))
      .map(s => s.text);
    if (specialtyMatches.length > 0) {
      entities.specialty = specialtyMatches;
    }

    // Extract locations
    const locationMatches = this.suggestions
      .filter(s => s.type === 'location' && lowerQuery.includes(s.text.toLowerCase()))
      .map(s => s.text);
    if (locationMatches.length > 0) {
      entities.location = { city: locationMatches[0] };
    }

    // Extract insurance mentions
    if (lowerQuery.includes('cnss')) {
      entities.insurance = ['CNSS'];
    } else if (lowerQuery.includes('ramed')) {
      entities.insurance = ['RAMED'];
    } else if (lowerQuery.includes('private')) {
      entities.insurance = ['Private'];
    }

    // Extract availability preferences
    if (lowerQuery.includes('today') || lowerQuery.includes('urgent')) {
      entities.availableToday = true;
    }

    if (lowerQuery.includes('emergency')) {
      entities.emergencyServices = true;
      entities.appointmentType = ['emergency'];
    }

    // Extract gender preferences
    if (lowerQuery.includes('female doctor') || lowerQuery.includes('woman doctor')) {
      entities.gender = 'female';
    } else if (lowerQuery.includes('male doctor') || lowerQuery.includes('man doctor')) {
      entities.gender = 'male';
    }

    // Extract language preferences
    if (lowerQuery.includes('english')) {
      entities.languages = ['English'];
    } else if (lowerQuery.includes('french')) {
      entities.languages = ['French'];
    } else if (lowerQuery.includes('arabic')) {
      entities.languages = ['Arabic'];
    }

    return entities;
  }

  private combineQueryAndFilters(
    queryEntities: Partial<SearchFilters>,
    userFilters: SearchFilters
  ): SearchFilters {
    return {
      ...queryEntities,
      ...userFilters,
      // Merge arrays
      specialty: [...(queryEntities.specialty || []), ...(userFilters.specialty || [])],
      insurance: [...(queryEntities.insurance || []), ...(userFilters.insurance || [])],
      languages: [...(queryEntities.languages || []), ...(userFilters.languages || [])],
      appointmentType: [...(queryEntities.appointmentType || []), ...(userFilters.appointmentType || [])]
    };
  }

  private async performSearch(filters: SearchFilters): Promise<SearchResult[]> {
    // Mock search results - in production, this would query the database
    const mockResults: SearchResult[] = [
      {
        id: 'doctor_1',
        type: 'doctor',
        name: 'Dr. Ahmed Bennani',
        relevanceScore: 0.95,
        matchedCriteria: ['specialty', 'location', 'insurance'],
        specialty: 'Cardiology',
        subspecialties: ['Interventional Cardiology'],
        experience: 15,
        rating: 4.8,
        reviewCount: 127,
        location: {
          address: 'Boulevard Zerktouni, Casablanca',
          city: 'Casablanca',
          coordinates: { lat: 33.5731, lng: -7.5898 },
          distance: 2.3
        },
        nextAvailable: new Date(Date.now() + 24 * 60 * 60 * 1000),
        availableToday: false,
        responseTime: 2,
        features: ['Telemedicine', 'Emergency Services', 'Parking'],
        insurance: ['CNSS', 'RAMED', 'Private'],
        languages: ['Arabic', 'French', 'English'],
        consultationFee: 400,
        currency: 'MAD'
      },
      {
        id: 'doctor_2',
        type: 'doctor',
        name: 'Dr. Fatima Alaoui',
        relevanceScore: 0.88,
        matchedCriteria: ['specialty', 'gender', 'rating'],
        specialty: 'Dermatology',
        subspecialties: ['Cosmetic Dermatology'],
        experience: 12,
        rating: 4.9,
        reviewCount: 89,
        location: {
          address: 'Avenue Mohammed V, Rabat',
          city: 'Rabat',
          coordinates: { lat: 34.0209, lng: -6.8416 },
          distance: 15.7
        },
        nextAvailable: new Date(Date.now() + 48 * 60 * 60 * 1000),
        availableToday: true,
        responseTime: 1,
        features: ['Telemedicine', 'Accessibility', 'Public Transport'],
        insurance: ['CNSS', 'Private'],
        languages: ['Arabic', 'French'],
        consultationFee: 350,
        currency: 'MAD'
      }
    ];

    return mockResults;
  }

  private rankResults(
    results: SearchResult[],
    query: string,
    filters: SearchFilters
  ): SearchResult[] {
    return results.map(result => {
      let score = result.relevanceScore;
      
      // Boost score based on matched criteria
      score += result.matchedCriteria.length * 0.1;
      
      // Boost for exact name matches
      if (result.name.toLowerCase().includes(query.toLowerCase())) {
        score += 0.2;
      }
      
      // Boost for high ratings
      if (result.rating && result.rating >= 4.5) {
        score += 0.1;
      }
      
      // Boost for availability
      if (result.availableToday && filters.availableToday) {
        score += 0.15;
      }
      
      // Boost for location proximity
      if (result.location.distance && result.location.distance < 5) {
        score += 0.1;
      }
      
      return {
        ...result,
        relevanceScore: Math.min(1, score)
      };
    });
  }

  private postProcessResults(
    results: SearchResult[],
    filters: SearchFilters
  ): SearchResult[] {
    // Apply final filtering
    let filteredResults = results.filter(result => this.matchesFilters(result, filters));
    
    // Sort by relevance score
    filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Add diversity (ensure different specialties are represented)
    filteredResults = this.addDiversity(filteredResults);
    
    return filteredResults;
  }

  private matchesFilters(result: SearchResult, filters: SearchFilters): boolean {
    // Specialty filter
    if (filters.specialty && filters.specialty.length > 0) {
      if (!filters.specialty.includes(result.specialty || '')) {
        return false;
      }
    }

    // Location filter
    if (filters.location?.city) {
      if (result.location.city !== filters.location.city) {
        return false;
      }
    }

    // Insurance filter
    if (filters.insurance && filters.insurance.length > 0) {
      const hasMatchingInsurance = filters.insurance.some(ins => 
        result.insurance.includes(ins)
      );
      if (!hasMatchingInsurance) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating?.min && result.rating && result.rating < filters.rating.min) {
      return false;
    }

    // Experience filter
    if (filters.experience?.min && result.experience && result.experience < filters.experience.min) {
      return false;
    }

    // Price range filter
    if (filters.priceRange && result.consultationFee) {
      if (result.consultationFee < filters.priceRange.min || 
          result.consultationFee > filters.priceRange.max) {
        return false;
      }
    }

    // Availability filter
    if (filters.availableToday && !result.availableToday) {
      return false;
    }

    // Language filter
    if (filters.languages && filters.languages.length > 0) {
      const hasMatchingLanguage = filters.languages.some(lang => 
        result.languages.includes(lang)
      );
      if (!hasMatchingLanguage) {
        return false;
      }
    }

    return true;
  }

  private addDiversity(results: SearchResult[]): SearchResult[] {
    // Ensure variety in specialties while maintaining relevance order
    const diverseResults: SearchResult[] = [];
    const seenSpecialties = new Set<string>();
    
    // First pass: add top results from different specialties
    for (const result of results) {
      if (result.specialty && !seenSpecialties.has(result.specialty)) {
        diverseResults.push(result);
        seenSpecialties.add(result.specialty);
      }
    }
    
    // Second pass: add remaining results
    for (const result of results) {
      if (!diverseResults.includes(result)) {
        diverseResults.push(result);
      }
    }
    
    return diverseResults;
  }

  private addToSearchHistory(query: string): void {
    // Add to search history
    this.searchHistory.push(query);
    
    // Keep only last 50 searches
    if (this.searchHistory.length > 50) {
      this.searchHistory = this.searchHistory.slice(-50);
    }
    
    // Update popular searches
    const currentCount = this.popularSearches.get(query) || 0;
    this.popularSearches.set(query, currentCount + 1);
  }
}

export const advancedSearchService = new AdvancedSearchService();