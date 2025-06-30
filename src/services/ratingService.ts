export interface DoctorRating {
  id: string;
  doctorId: string;
  patientId: string;
  appointmentId: string;
  rating: {
    overall: number;
    professionalism: number;
    waitTime: number;
    communication: number;
    satisfaction: number;
  };
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
  reported: boolean;
}

export interface RatingCriteria {
  professionalism: string;
  waitTime: string;
  communication: string;
  satisfaction: string;
}

class RatingService {
  private ratings: DoctorRating[] = [];
  private ratingCriteria: RatingCriteria = {
    professionalism: "Doctor's expertise, bedside manner, and professional conduct",
    waitTime: "Punctuality and efficiency of appointment scheduling",
    communication: "Clarity of explanations and responsiveness to questions",
    satisfaction: "Overall experience and likelihood to recommend"
  };

  async submitRating(rating: Omit<DoctorRating, 'id' | 'date' | 'helpful' | 'reported'>): Promise<DoctorRating> {
    // Verify patient had appointment with doctor
    const verified = await this.verifyAppointment(rating.patientId, rating.doctorId, rating.appointmentId);
    
    const newRating: DoctorRating = {
      ...rating,
      id: this.generateId(),
      date: new Date(),
      helpful: 0,
      reported: false,
      verified
    };

    this.ratings.push(newRating);
    
    // Update doctor's average rating
    await this.updateDoctorAverageRating(rating.doctorId);
    
    return newRating;
  }

  async getDoctorRatings(doctorId: string, limit: number = 10, offset: number = 0): Promise<{
    ratings: DoctorRating[];
    averageRating: number;
    totalCount: number;
    ratingBreakdown: { [key: number]: number };
  }> {
    const doctorRatings = this.ratings
      .filter(rating => rating.doctorId === doctorId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    const paginatedRatings = doctorRatings.slice(offset, offset + limit);
    
    // Calculate average rating
    const averageRating = doctorRatings.length > 0 
      ? doctorRatings.reduce((sum, rating) => sum + rating.rating.overall, 0) / doctorRatings.length
      : 0;

    // Calculate rating breakdown (1-5 stars)
    const ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    doctorRatings.forEach(rating => {
      const roundedRating = Math.round(rating.rating.overall);
      ratingBreakdown[roundedRating as keyof typeof ratingBreakdown]++;
    });

    return {
      ratings: paginatedRatings,
      averageRating: Math.round(averageRating * 10) / 10,
      totalCount: doctorRatings.length,
      ratingBreakdown
    };
  }

  async getPatientRatings(patientId: string): Promise<DoctorRating[]> {
    return this.ratings
      .filter(rating => rating.patientId === patientId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async markHelpful(ratingId: string, userId: string): Promise<boolean> {
    const rating = this.ratings.find(r => r.id === ratingId);
    if (rating) {
      rating.helpful++;
      return true;
    }
    return false;
  }

  async reportRating(ratingId: string, reason: string, reporterId: string): Promise<boolean> {
    const rating = this.ratings.find(r => r.id === ratingId);
    if (rating) {
      rating.reported = true;
      // In production, this would trigger a review process
      console.log(`Rating ${ratingId} reported for: ${reason} by ${reporterId}`);
      return true;
    }
    return false;
  }

  getRatingCriteria(): RatingCriteria {
    return this.ratingCriteria;
  }

  async getTopRatedDoctors(specialty?: string, limit: number = 10): Promise<any[]> {
    // Group ratings by doctor
    const doctorRatings = this.ratings.reduce((acc, rating) => {
      if (!acc[rating.doctorId]) {
        acc[rating.doctorId] = [];
      }
      acc[rating.doctorId].push(rating);
      return acc;
    }, {} as { [doctorId: string]: DoctorRating[] });

    // Calculate average ratings and sort
    const doctorAverages = Object.entries(doctorRatings)
      .map(([doctorId, ratings]) => ({
        doctorId,
        averageRating: ratings.reduce((sum, r) => sum + r.rating.overall, 0) / ratings.length,
        totalRatings: ratings.length,
        recentRatings: ratings.slice(0, 3)
      }))
      .filter(doctor => doctor.totalRatings >= 5) // Minimum 5 ratings
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit);

    return doctorAverages;
  }

  private async verifyAppointment(patientId: string, doctorId: string, appointmentId: string): Promise<boolean> {
    // In production, this would check the appointment database
    // For now, we'll simulate verification
    return Math.random() > 0.1; // 90% verification rate
  }

  private async updateDoctorAverageRating(doctorId: string): Promise<void> {
    const doctorRatings = this.ratings.filter(r => r.doctorId === doctorId);
    if (doctorRatings.length > 0) {
      const averageRating = doctorRatings.reduce((sum, r) => sum + r.rating.overall, 0) / doctorRatings.length;
      // Update doctor's profile with new average rating
      console.log(`Updated doctor ${doctorId} average rating to ${averageRating.toFixed(1)}`);
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export const ratingService = new RatingService();