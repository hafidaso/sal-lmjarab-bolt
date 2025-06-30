import { supabase } from '../lib/supabase';

export interface SearchAnalytics {
  topSearches: SearchTerm[];
  searchTrends: SearchTrend[];
  specialtyGaps: SpecialtyGap[];
  locationGaps: LocationGap[];
  reviewSentiment: ReviewSentiment[];
  userBehavior: UserBehaviorMetrics;
}

export interface SearchTerm {
  term: string;
  count: number;
  percentage: number;
  category: 'symptom' | 'specialty' | 'location' | 'doctor' | 'general';
  trend: 'up' | 'down' | 'stable';
}

export interface SearchTrend {
  date: string;
  totalSearches: number;
  uniqueUsers: number;
  topTerms: string[];
}

export interface SpecialtyGap {
  specialty: string;
  location: string;
  currentDoctors: number;
  requiredDoctors: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
  estimatedDemand: number;
}

export interface LocationGap {
  city: string;
  region: string;
  totalDoctors: number;
  population: number;
  doctorsPerCapita: number;
  specialties: SpecialtyGap[];
  priority: 'high' | 'medium' | 'low';
}

export interface ReviewSentiment {
  doctorId: string;
  doctorName: string;
  specialty: string;
  totalReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  neutralReviews: number;
  sentimentScore: number;
  commonComplaints: string[];
  commonPraise: string[];
  trend: 'improving' | 'declining' | 'stable';
}

export interface UserBehaviorMetrics {
  totalUsers: number;
  activeUsers: number;
  searchFrequency: number;
  averageSessionDuration: number;
  conversionRate: number;
  topUserSegments: UserSegment[];
}

export interface UserSegment {
  segment: string;
  count: number;
  percentage: number;
  averageSearches: number;
  topInterests: string[];
}

class AnalyticsService {
  // Mock data for demonstration - in production, this would come from Supabase
  private mockSearchData: SearchAnalytics = {
    topSearches: [
      { term: 'cardiology', count: 1247, percentage: 15.2, category: 'specialty', trend: 'up' },
      { term: 'dizziness', count: 892, percentage: 10.9, category: 'symptom', trend: 'up' },
      { term: 'Casablanca', count: 756, percentage: 9.2, category: 'location', trend: 'stable' },
      { term: 'back pain', count: 634, percentage: 7.7, category: 'symptom', trend: 'up' },
      { term: 'Dr. Ahmed Bennani', count: 523, percentage: 6.4, category: 'doctor', trend: 'up' },
      { term: 'anxiety', count: 487, percentage: 5.9, category: 'symptom', trend: 'up' },
      { term: 'dermatology', count: 445, percentage: 5.4, category: 'specialty', trend: 'stable' },
      { term: 'Rabat', count: 398, percentage: 4.8, category: 'location', trend: 'down' },
      { term: 'vomiting', count: 356, percentage: 4.3, category: 'symptom', trend: 'up' },
      { term: 'orthopedics', count: 334, percentage: 4.1, category: 'specialty', trend: 'stable' }
    ],
    searchTrends: [
      { date: '2025-06-29', totalSearches: 2456, uniqueUsers: 1892, topTerms: ['cardiology', 'dizziness', 'Casablanca'] },
      { date: '2025-01-02', totalSearches: 2678, uniqueUsers: 2034, topTerms: ['back pain', 'anxiety', 'dermatology'] },
      { date: '2025-06-27', totalSearches: 2891, uniqueUsers: 2156, topTerms: ['vomiting', 'orthopedics', 'Rabat'] },
      { date: '2025-01-04', totalSearches: 3123, uniqueUsers: 2345, topTerms: ['cardiology', 'dizziness', 'Casablanca'] },
      { date: '2025-06-25', totalSearches: 2987, uniqueUsers: 2212, topTerms: ['back pain', 'anxiety', 'dermatology'] },
      { date: '2025-01-06', totalSearches: 3245, uniqueUsers: 2456, topTerms: ['vomiting', 'orthopedics', 'Rabat'] },
      { date: '2025-01-07', totalSearches: 3456, uniqueUsers: 2678, topTerms: ['cardiology', 'dizziness', 'Casablanca'] }
    ],
    specialtyGaps: [
      { specialty: 'Cardiology', location: 'Casablanca', currentDoctors: 45, requiredDoctors: 65, gap: 20, priority: 'high', estimatedDemand: 1200 },
      { specialty: 'Neurology', location: 'Rabat', currentDoctors: 23, requiredDoctors: 40, gap: 17, priority: 'high', estimatedDemand: 800 },
      { specialty: 'Dermatology', location: 'Marrakech', currentDoctors: 18, requiredDoctors: 30, gap: 12, priority: 'medium', estimatedDemand: 600 },
      { specialty: 'Pediatrics', location: 'Fes', currentDoctors: 15, requiredDoctors: 35, gap: 20, priority: 'high', estimatedDemand: 900 },
      { specialty: 'Orthopedics', location: 'Agadir', currentDoctors: 12, requiredDoctors: 25, gap: 13, priority: 'medium', estimatedDemand: 500 },
      { specialty: 'Psychiatry', location: 'Casablanca', currentDoctors: 28, requiredDoctors: 45, gap: 17, priority: 'high', estimatedDemand: 1000 },
      { specialty: 'Gastroenterology', location: 'Rabat', currentDoctors: 20, requiredDoctors: 35, gap: 15, priority: 'medium', estimatedDemand: 700 },
      { specialty: 'Oncology', location: 'Casablanca', currentDoctors: 15, requiredDoctors: 30, gap: 15, priority: 'high', estimatedDemand: 800 }
    ],
    locationGaps: [
      { city: 'Casablanca', region: 'Grand Casablanca', totalDoctors: 450, population: 3400000, doctorsPerCapita: 132, specialties: [], priority: 'medium' },
      { city: 'Rabat', region: 'Rabat-Salé-Kénitra', totalDoctors: 280, population: 1800000, doctorsPerCapita: 156, specialties: [], priority: 'low' },
      { city: 'Marrakech', region: 'Marrakech-Safi', totalDoctors: 180, population: 1500000, doctorsPerCapita: 120, specialties: [], priority: 'high' },
      { city: 'Fes', region: 'Fès-Meknès', totalDoctors: 120, population: 1200000, doctorsPerCapita: 100, specialties: [], priority: 'high' },
      { city: 'Agadir', region: 'Souss-Massa', totalDoctors: 85, population: 800000, doctorsPerCapita: 106, specialties: [], priority: 'high' },
      { city: 'Tangier', region: 'Tanger-Tétouan-Al Hoceima', totalDoctors: 95, population: 1000000, doctorsPerCapita: 105, specialties: [], priority: 'high' }
    ],
    reviewSentiment: [
      {
        doctorId: '1',
        doctorName: 'Dr. Ahmed Bennani',
        specialty: 'Cardiology',
        totalReviews: 156,
        positiveReviews: 142,
        negativeReviews: 8,
        neutralReviews: 6,
        sentimentScore: 0.86,
        commonComplaints: ['Long wait times', 'Rushed consultations'],
        commonPraise: ['Excellent diagnosis', 'Very knowledgeable', 'Caring approach'],
        trend: 'improving'
      },
      {
        doctorId: '2',
        doctorName: 'Dr. Fatima Alaoui',
        specialty: 'Dermatology',
        totalReviews: 89,
        positiveReviews: 78,
        negativeReviews: 7,
        neutralReviews: 4,
        sentimentScore: 0.80,
        commonComplaints: ['Expensive treatments', 'Limited appointment slots'],
        commonPraise: ['Clear explanations', 'Effective treatments', 'Professional staff'],
        trend: 'stable'
      },
      {
        doctorId: '3',
        doctorName: 'Dr. Omar Idrissi',
        specialty: 'General Medicine',
        totalReviews: 234,
        positiveReviews: 198,
        negativeReviews: 22,
        neutralReviews: 14,
        sentimentScore: 0.75,
        commonComplaints: ['Short consultation time', 'Difficulty getting appointments'],
        commonPraise: ['Good listener', 'Thorough examinations', 'Follows up well'],
        trend: 'declining'
      },
      {
        doctorId: '4',
        doctorName: 'Dr. Leila Benjelloun',
        specialty: 'Pediatrics',
        totalReviews: 167,
        positiveReviews: 145,
        negativeReviews: 12,
        neutralReviews: 10,
        sentimentScore: 0.80,
        commonComplaints: ['Long waiting room times', 'Limited parking'],
        commonPraise: ['Great with children', 'Patient explanations', 'Gentle approach'],
        trend: 'improving'
      }
    ],
    userBehavior: {
      totalUsers: 12543,
      activeUsers: 8923,
      searchFrequency: 3.2,
      averageSessionDuration: 8.5,
      conversionRate: 0.23,
      topUserSegments: [
        { segment: 'Symptom Seekers', count: 4567, percentage: 36.4, averageSearches: 4.2, topInterests: ['dizziness', 'back pain', 'anxiety'] },
        { segment: 'Specialty Focused', count: 3234, percentage: 25.8, averageSearches: 2.8, topInterests: ['cardiology', 'dermatology', 'orthopedics'] },
        { segment: 'Location Based', count: 2890, percentage: 23.0, averageSearches: 2.1, topInterests: ['Casablanca', 'Rabat', 'Marrakech'] },
        { segment: 'Doctor Specific', count: 1852, percentage: 14.8, averageSearches: 1.5, topInterests: ['Dr. Ahmed Bennani', 'Dr. Fatima Alaoui'] }
      ]
    }
  };

  async getSearchAnalytics(): Promise<SearchAnalytics> {
    try {
      // In production, this would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('search_analytics')
      //   .select('*')
      //   .order('created_at', { ascending: false });

      // For now, return mock data
      return this.mockSearchData;
    } catch (error) {
      console.error('Error fetching search analytics:', error);
      return this.mockSearchData;
    }
  }

  async getTopSearches(limit: number = 10): Promise<SearchTerm[]> {
    const analytics = await this.getSearchAnalytics();
    return analytics.topSearches.slice(0, limit);
  }

  async getSpecialtyGaps(): Promise<SpecialtyGap[]> {
    const analytics = await this.getSearchAnalytics();
    return analytics.specialtyGaps.sort((a, b) => b.gap - a.gap);
  }

  async getLocationGaps(): Promise<LocationGap[]> {
    const analytics = await this.getSearchAnalytics();
    return analytics.locationGaps.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  async getReviewSentiment(): Promise<ReviewSentiment[]> {
    const analytics = await this.getSearchAnalytics();
    return analytics.reviewSentiment.sort((a, b) => b.sentimentScore - a.sentimentScore);
  }

  async getSearchTrends(days: number = 7): Promise<SearchTrend[]> {
    const analytics = await this.getSearchAnalytics();
    return analytics.searchTrends.slice(-days);
  }

  async getUserBehavior(): Promise<UserBehaviorMetrics> {
    const analytics = await this.getSearchAnalytics();
    return analytics.userBehavior;
  }

  // Advanced analytics methods
  async getComplaintPatterns(): Promise<any[]> {
    const sentiment = await this.getReviewSentiment();
    const complaints = sentiment.flatMap(doctor => 
      doctor.commonComplaints.map(complaint => ({
        complaint,
        doctorName: doctor.doctorName,
        specialty: doctor.specialty,
        frequency: 1
      }))
    );

    // Group and count complaints
    const complaintCounts = complaints.reduce((acc, item) => {
      const key = item.complaint.toLowerCase();
      if (acc[key]) {
        acc[key].frequency += 1;
        acc[key].doctors.push(item.doctorName);
      } else {
        acc[key] = {
          complaint: item.complaint,
          frequency: 1,
          doctors: [item.doctorName],
          specialties: [item.specialty]
        };
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(complaintCounts).sort((a, b) => b.frequency - a.frequency);
  }

  async getSpecialtyDemandAnalysis(): Promise<any[]> {
    const specialtyGaps = await this.getSpecialtyGaps();
    const topSearches = await this.getTopSearches(20);

    return specialtyGaps.map(gap => {
      const searchDemand = topSearches.filter(search => 
        search.term.toLowerCase().includes(gap.specialty.toLowerCase())
      ).reduce((sum, search) => sum + search.count, 0);

      return {
        ...gap,
        searchDemand,
        demandScore: (searchDemand / 1000) + (gap.estimatedDemand / 100),
        recommendation: this.getRecruitmentRecommendation(gap.gap, gap.priority)
      };
    }).sort((a, b) => b.demandScore - a.demandScore);
  }

  private getRecruitmentRecommendation(gap: number, priority: string): string {
    if (priority === 'high' && gap > 15) {
      return 'Urgent: Immediate recruitment needed';
    } else if (priority === 'high' || gap > 10) {
      return 'High Priority: Recruit within 3 months';
    } else if (priority === 'medium' || gap > 5) {
      return 'Medium Priority: Plan recruitment within 6 months';
    } else {
      return 'Low Priority: Monitor demand trends';
    }
  }
}

export const analyticsService = new AnalyticsService(); 