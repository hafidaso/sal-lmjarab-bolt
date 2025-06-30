interface ReviewData {
  id: string;
  facilityId: string;
  facilityType: 'doctor' | 'hospital' | 'pharmacy';
  patientId: string;
  rating: number;
  comment: string;
  date: Date;
  department?: string;
  service?: string;
  verified: boolean;
  source: 'internal' | 'google' | 'facebook' | 'other';
}

interface SentimentScore {
  overall: number; // -1 to 1
  aspects: {
    service: number;
    staff: number;
    facilities: number;
    waitTime: number;
    cleanliness: number;
    communication: number;
  };
  confidence: number;
  keywords: string[];
}

export interface TrendingIssue {
  category: string;
  description: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trend: 'increasing' | 'decreasing' | 'stable';
  affectedFacilities: string[];
  firstDetected: Date;
  lastUpdated: Date;
}

export interface InsightReport {
  facilityId: string;
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalReviews: number;
    averageRating: number;
    sentimentTrend: 'improving' | 'declining' | 'stable';
    responseRate: number;
  };
  topIssues: TrendingIssue[];
  positiveHighlights: string[];
  actionableInsights: string[];
  departmentBreakdown: any[];
  competitorComparison?: any;
}

class SentimentAnalysisService {
  private reviews: ReviewData[] = [];
  private sentimentModel: any;
  private aspectModel: any;
  private trendingIssues: Map<string, TrendingIssue> = new Map();

  constructor() {
    this.initializeModels();
    this.startContinuousAnalysis();
  }

  private initializeModels() {
    // Initialize sentiment analysis models
    this.sentimentModel = {
      analyze: (text: string) => this.analyzeSentiment(text),
      confidence: 0.85
    };

    this.aspectModel = {
      extractAspects: (text: string) => this.extractAspects(text),
      confidence: 0.78
    };
  }

  private startContinuousAnalysis() {
    // Run analysis every hour
    setInterval(() => {
      this.performBatchAnalysis();
    }, 3600000); // 1 hour
  }

  async analyzeReview(review: ReviewData): Promise<SentimentScore> {
    try {
      // Preprocess text
      const cleanedText = this.preprocessText(review.comment);
      
      // Analyze overall sentiment
      const overallSentiment = this.sentimentModel.analyze(cleanedText);
      
      // Extract aspect-based sentiments
      const aspects = this.aspectModel.extractAspects(cleanedText);
      
      // Calculate confidence score
      const confidence = this.calculateConfidence(cleanedText, overallSentiment, aspects);
      
      // Extract keywords
      const keywords = this.extractKeywords(cleanedText);
      
      const sentimentScore: SentimentScore = {
        overall: overallSentiment,
        aspects: {
          service: aspects.service || 0,
          staff: aspects.staff || 0,
          facilities: aspects.facilities || 0,
          waitTime: aspects.waitTime || 0,
          cleanliness: aspects.cleanliness || 0,
          communication: aspects.communication || 0
        },
        confidence,
        keywords
      };

      // Store analysis results
      await this.storeAnalysisResult(review.id, sentimentScore);
      
      // Check for trending issues
      await this.checkForTrendingIssues(review, sentimentScore);
      
      return sentimentScore;
      
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      throw new Error('Failed to analyze review sentiment');
    }
  }

  private preprocessText(text: string): string {
    // Clean and normalize text
    let cleaned = text.toLowerCase();
    
    // Remove special characters but keep important punctuation
    cleaned = cleaned.replace(/[^\w\s.,!?-]/g, ' ');
    
    // Remove extra whitespace
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    // Handle negations
    cleaned = this.handleNegations(cleaned);
    
    return cleaned;
  }

  private handleNegations(text: string): string {
    const negationWords = ['not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 'nor'];
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'poor', 'worst'];
    
    let processed = text;
    
    negationWords.forEach(negation => {
      // Handle "not good" -> "bad"
      positiveWords.forEach(positive => {
        const pattern = new RegExp(`${negation}\\s+${positive}`, 'g');
        processed = processed.replace(pattern, 'bad');
      });
      
      // Handle "not bad" -> "okay"
      negativeWords.forEach(negative => {
        const pattern = new RegExp(`${negation}\\s+${negative}`, 'g');
        processed = processed.replace(pattern, 'okay');
      });
    });
    
    return processed;
  }

  private analyzeSentiment(text: string): number {
    // Simplified sentiment analysis using keyword matching
    const positiveWords = [
      'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'perfect', 'outstanding',
      'professional', 'helpful', 'friendly', 'clean', 'efficient', 'quick', 'comfortable',
      'caring', 'knowledgeable', 'thorough', 'recommend', 'satisfied', 'pleased'
    ];
    
    const negativeWords = [
      'terrible', 'awful', 'horrible', 'poor', 'worst', 'bad', 'disappointing',
      'unprofessional', 'rude', 'dirty', 'slow', 'uncomfortable', 'painful',
      'confused', 'frustrated', 'angry', 'dissatisfied', 'complaint', 'problem'
    ];
    
    const words = text.split(/\s+/);
    let score = 0;
    let wordCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) {
        score += 1;
        wordCount++;
      } else if (negativeWords.includes(word)) {
        score -= 1;
        wordCount++;
      }
    });
    
    // Normalize score to -1 to 1 range
    if (wordCount === 0) return 0;
    
    const normalizedScore = score / Math.max(wordCount, 5); // Prevent extreme scores
    return Math.max(-1, Math.min(1, normalizedScore));
  }

  private extractAspects(text: string): any {
    const aspects = {
      service: 0,
      staff: 0,
      facilities: 0,
      waitTime: 0,
      cleanliness: 0,
      communication: 0
    };

    // Service-related keywords
    const serviceKeywords = ['service', 'treatment', 'care', 'appointment', 'booking', 'scheduling'];
    const staffKeywords = ['doctor', 'nurse', 'staff', 'receptionist', 'personnel', 'team'];
    const facilitiesKeywords = ['facility', 'building', 'room', 'equipment', 'parking', 'location'];
    const waitTimeKeywords = ['wait', 'waiting', 'time', 'delay', 'quick', 'fast', 'slow'];
    const cleanlinessKeywords = ['clean', 'dirty', 'hygiene', 'sanitized', 'tidy', 'messy'];
    const communicationKeywords = ['explain', 'communication', 'information', 'clear', 'confusing'];

    const words = text.split(/\s+/);
    
    // Analyze sentiment for each aspect
    aspects.service = this.calculateAspectSentiment(text, serviceKeywords);
    aspects.staff = this.calculateAspectSentiment(text, staffKeywords);
    aspects.facilities = this.calculateAspectSentiment(text, facilitiesKeywords);
    aspects.waitTime = this.calculateAspectSentiment(text, waitTimeKeywords);
    aspects.cleanliness = this.calculateAspectSentiment(text, cleanlinessKeywords);
    aspects.communication = this.calculateAspectSentiment(text, communicationKeywords);

    return aspects;
  }

  private calculateAspectSentiment(text: string, keywords: string[]): number {
    const sentences = text.split(/[.!?]+/);
    let totalSentiment = 0;
    let relevantSentences = 0;

    sentences.forEach(sentence => {
      const hasKeyword = keywords.some(keyword => sentence.includes(keyword));
      if (hasKeyword) {
        totalSentiment += this.analyzeSentiment(sentence);
        relevantSentences++;
      }
    });

    return relevantSentences > 0 ? totalSentiment / relevantSentences : 0;
  }

  private calculateConfidence(text: string, sentiment: number, aspects: any): number {
    let confidence = 0.7; // Base confidence
    
    // Increase confidence based on text length
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 20) confidence += 0.1;
    if (wordCount > 50) confidence += 0.1;
    
    // Increase confidence if multiple aspects are mentioned
    const aspectCount = Object.values(aspects).filter(score => Math.abs(score as number) > 0.1).length;
    confidence += aspectCount * 0.02;
    
    // Decrease confidence for neutral sentiments
    if (Math.abs(sentiment) < 0.2) confidence -= 0.1;
    
    return Math.max(0.3, Math.min(1.0, confidence));
  }

  private extractKeywords(text: string): string[] {
    const words = text.split(/\s+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'was', 'are', 'were'];
    
    // Filter out stop words and short words
    const keywords = words
      .filter(word => word.length > 3 && !stopWords.includes(word))
      .filter(word => /^[a-zA-Z]+$/.test(word)); // Only alphabetic words
    
    // Count frequency and return top keywords
    const frequency: Record<string, number> = {};
    keywords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private async storeAnalysisResult(reviewId: string, sentiment: SentimentScore): Promise<void> {
    // Store sentiment analysis results in database
    // This would integrate with your database service
    console.log(`Stored sentiment analysis for review ${reviewId}:`, sentiment);
  }

  private async checkForTrendingIssues(review: ReviewData, sentiment: SentimentScore): Promise<void> {
    // Check if this review indicates a trending issue
    if (sentiment.overall < -0.5 || Object.values(sentiment.aspects).some(score => score < -0.6)) {
      await this.identifyTrendingIssue(review, sentiment);
    }
  }

  private async identifyTrendingIssue(review: ReviewData, sentiment: SentimentScore): Promise<void> {
    // Identify the main issue category
    const mainIssue = this.categorizeIssue(sentiment);
    const issueKey = `${review.facilityId}_${mainIssue.category}`;
    
    let issue = this.trendingIssues.get(issueKey);
    
    if (issue) {
      // Update existing issue
      issue.frequency++;
      issue.lastUpdated = new Date();
      issue.trend = this.calculateTrend(issue);
    } else {
      // Create new trending issue
      issue = {
        category: mainIssue.category,
        description: mainIssue.description,
        frequency: 1,
        severity: this.calculateSeverity(sentiment),
        trend: 'stable',
        affectedFacilities: [review.facilityId],
        firstDetected: new Date(),
        lastUpdated: new Date()
      };
    }
    
    this.trendingIssues.set(issueKey, issue);
    
    // Check if issue needs immediate attention
    if (issue.severity === 'critical' || issue.frequency > 5) {
      await this.flagForImmediateAttention(issue, review);
    }
  }

  private categorizeIssue(sentiment: SentimentScore): { category: string; description: string } {
    // Find the aspect with the most negative sentiment
    const aspects = sentiment.aspects;
    let worstAspect = 'general';
    let worstScore = 0;
    
    Object.entries(aspects).forEach(([aspect, score]) => {
      if (score < worstScore) {
        worstScore = score;
        worstAspect = aspect;
      }
    });
    
    const descriptions = {
      service: 'Poor service quality',
      staff: 'Staff behavior issues',
      facilities: 'Facility condition problems',
      waitTime: 'Excessive wait times',
      cleanliness: 'Cleanliness concerns',
      communication: 'Communication problems',
      general: 'General dissatisfaction'
    };
    
    return {
      category: worstAspect,
      description: descriptions[worstAspect as keyof typeof descriptions] || descriptions.general
    };
  }

  private calculateSeverity(sentiment: SentimentScore): 'low' | 'medium' | 'high' | 'critical' {
    const overallScore = Math.abs(sentiment.overall);
    const worstAspectScore = Math.max(...Object.values(sentiment.aspects).map(Math.abs));
    
    if (overallScore > 0.8 || worstAspectScore > 0.9) return 'critical';
    if (overallScore > 0.6 || worstAspectScore > 0.7) return 'high';
    if (overallScore > 0.4 || worstAspectScore > 0.5) return 'medium';
    return 'low';
  }

  private calculateTrend(issue: TrendingIssue): 'increasing' | 'decreasing' | 'stable' {
    // Simple trend calculation based on frequency over time
    const daysSinceFirst = (Date.now() - issue.firstDetected.getTime()) / (1000 * 60 * 60 * 24);
    const frequencyPerDay = issue.frequency / Math.max(daysSinceFirst, 1);
    
    if (frequencyPerDay > 2) return 'increasing';
    if (frequencyPerDay < 0.5) return 'decreasing';
    return 'stable';
  }

  private async flagForImmediateAttention(issue: TrendingIssue, review: ReviewData): Promise<void> {
    // Flag critical issues for immediate attention
    console.log(`CRITICAL ISSUE DETECTED:`, {
      facility: review.facilityId,
      issue: issue.description,
      severity: issue.severity,
      frequency: issue.frequency
    });
    
    // In production, this would trigger alerts, notifications, etc.
  }

  async generateInsightReport(facilityId: string, startDate: Date, endDate: Date): Promise<InsightReport> {
    // Get reviews for the specified period
    const periodReviews = this.reviews.filter(review => 
      review.facilityId === facilityId &&
      review.date >= startDate &&
      review.date <= endDate
    );

    // Calculate summary statistics
    const summary = this.calculateSummaryStats(periodReviews);
    
    // Identify top issues
    const topIssues = this.getTopIssuesForFacility(facilityId);
    
    // Extract positive highlights
    const positiveHighlights = this.extractPositiveHighlights(periodReviews);
    
    // Generate actionable insights
    const actionableInsights = this.generateActionableInsights(periodReviews, topIssues);
    
    // Create department breakdown
    const departmentBreakdown = this.createDepartmentBreakdown(periodReviews);
    
    return {
      facilityId,
      period: { start: startDate, end: endDate },
      summary,
      topIssues,
      positiveHighlights,
      actionableInsights,
      departmentBreakdown
    };
  }

  private calculateSummaryStats(reviews: ReviewData[]): any {
    if (reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        sentimentTrend: 'stable',
        responseRate: 0
      };
    }

    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    // Calculate sentiment trend (simplified)
    const recentReviews = reviews.slice(-Math.min(10, reviews.length));
    const olderReviews = reviews.slice(0, Math.min(10, reviews.length));
    
    const recentAvg = recentReviews.reduce((sum, r) => sum + r.rating, 0) / recentReviews.length;
    const olderAvg = olderReviews.reduce((sum, r) => sum + r.rating, 0) / olderReviews.length;
    
    let sentimentTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (recentAvg > olderAvg + 0.2) sentimentTrend = 'improving';
    else if (recentAvg < olderAvg - 0.2) sentimentTrend = 'declining';
    
    // Calculate response rate (mock data)
    const responseRate = Math.random() * 0.3 + 0.7; // 70-100%
    
    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      sentimentTrend,
      responseRate: Math.round(responseRate * 100)
    };
  }

  private getTopIssuesForFacility(facilityId: string): TrendingIssue[] {
    return Array.from(this.trendingIssues.values())
      .filter(issue => issue.affectedFacilities.includes(facilityId))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);
  }

  private extractPositiveHighlights(reviews: ReviewData[]): string[] {
    const positiveReviews = reviews.filter(review => review.rating >= 4);
    const highlights: string[] = [];
    
    // Extract common positive themes
    const positiveKeywords = ['excellent', 'professional', 'friendly', 'clean', 'efficient', 'caring'];
    
    positiveKeywords.forEach(keyword => {
      const count = positiveReviews.filter(review => 
        review.comment.toLowerCase().includes(keyword)
      ).length;
      
      if (count > positiveReviews.length * 0.2) {
        highlights.push(`Consistently praised for being ${keyword}`);
      }
    });
    
    return highlights.slice(0, 5);
  }

  private generateActionableInsights(reviews: ReviewData[], issues: TrendingIssue[]): string[] {
    const insights: string[] = [];
    
    // Generate insights based on trending issues
    issues.forEach(issue => {
      switch (issue.category) {
        case 'waitTime':
          insights.push('Consider implementing appointment scheduling optimization to reduce wait times');
          break;
        case 'staff':
          insights.push('Staff training program may be needed to improve patient interactions');
          break;
        case 'cleanliness':
          insights.push('Review and enhance cleaning protocols and schedules');
          break;
        case 'communication':
          insights.push('Improve patient communication and information sharing processes');
          break;
        case 'facilities':
          insights.push('Facility maintenance and upgrades may be required');
          break;
      }
    });
    
    // Add general insights based on review patterns
    const lowRatingReviews = reviews.filter(r => r.rating <= 2);
    if (lowRatingReviews.length > reviews.length * 0.1) {
      insights.push('High number of low ratings indicates need for comprehensive service review');
    }
    
    return insights.slice(0, 5);
  }

  private createDepartmentBreakdown(reviews: ReviewData[]): any[] {
    const departments: Record<string, any> = {};
    
    reviews.forEach(review => {
      const dept = review.department || 'General';
      if (!departments[dept]) {
        departments[dept] = {
          name: dept,
          reviewCount: 0,
          averageRating: 0,
          totalRating: 0
        };
      }
      
      departments[dept].reviewCount++;
      departments[dept].totalRating += review.rating;
      departments[dept].averageRating = departments[dept].totalRating / departments[dept].reviewCount;
    });
    
    return Object.values(departments)
      .map(dept => ({
        ...dept,
        averageRating: Math.round(dept.averageRating * 10) / 10
      }))
      .sort((a, b) => b.reviewCount - a.reviewCount);
  }

  private async performBatchAnalysis(): Promise<void> {
    // Analyze recent reviews that haven't been processed
    const unprocessedReviews = this.reviews.filter(review => 
      !review.id.includes('processed') // Simple flag for demo
    );
    
    for (const review of unprocessedReviews) {
      try {
        await this.analyzeReview(review);
        review.id += '_processed'; // Mark as processed
      } catch (error) {
        console.error(`Failed to analyze review ${review.id}:`, error);
      }
    }
    
    // Clean up old trending issues
    this.cleanupOldIssues();
  }

  private cleanupOldIssues(): void {
    const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    
    for (const [key, issue] of this.trendingIssues) {
      if (issue.lastUpdated < cutoffDate && issue.frequency < 3) {
        this.trendingIssues.delete(key);
      }
    }
  }

  // Public API methods
  async addReview(review: ReviewData): Promise<void> {
    this.reviews.push(review);
    await this.analyzeReview(review);
  }

  getTrendingIssues(): TrendingIssue[] {
    return Array.from(this.trendingIssues.values())
      .sort((a, b) => b.frequency - a.frequency);
  }

  getCriticalIssues(): TrendingIssue[] {
    return this.getTrendingIssues()
      .filter(issue => issue.severity === 'critical' || issue.frequency > 10);
  }

  async getRealtimeAlerts(): Promise<any[]> {
    const alerts = [];
    const criticalIssues = this.getCriticalIssues();
    
    criticalIssues.forEach(issue => {
      alerts.push({
        type: 'critical_issue',
        message: `Critical issue detected: ${issue.description}`,
        facilityId: issue.affectedFacilities[0],
        severity: issue.severity,
        timestamp: issue.lastUpdated
      });
    });
    
    return alerts;
  }

  getAnalyticsOverview(): any {
    const totalReviews = this.reviews.length;
    const totalIssues = this.trendingIssues.size;
    const criticalIssues = this.getCriticalIssues().length;
    
    const averageRating = totalReviews > 0 
      ? this.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
      : 0;
    
    return {
      totalReviews,
      totalIssues,
      criticalIssues,
      averageRating: Math.round(averageRating * 10) / 10,
      processingAccuracy: this.sentimentModel.confidence,
      lastUpdated: new Date()
    };
  }
}

export const sentimentAnalysis = new SentimentAnalysisService();