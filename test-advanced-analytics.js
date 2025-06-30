// Test file to demonstrate Advanced Search Analytics for Admins
// This simulates the analytics data and insights that admins would see

console.log("=== Advanced Search Analytics for Admins ===\n");

// Mock analytics data
const analyticsData = {
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

// 1. Search Trends Analysis
console.log("🔍 SEARCH TRENDS ANALYSIS");
console.log("=".repeat(50));
console.log("Top 10 Search Terms:");
analyticsData.topSearches.forEach((search, index) => {
  const trendIcon = search.trend === 'up' ? '📈' : search.trend === 'down' ? '📉' : '➡️';
  console.log(`${index + 1}. ${search.term} (${search.category}) - ${search.count.toLocaleString()} searches (${search.percentage}%) ${trendIcon}`);
});

// Category breakdown
const categoryBreakdown = analyticsData.topSearches.reduce((acc, search) => {
  acc[search.category] = (acc[search.category] || 0) + search.count;
  return acc;
}, {});

console.log("\n📊 Search Category Breakdown:");
Object.entries(categoryBreakdown).forEach(([category, count]) => {
  console.log(`   ${category}: ${count.toLocaleString()} searches`);
});

console.log("\n" + "=".repeat(50));

// 2. Specialty Gaps Analysis
console.log("🎯 SPECIALTY GAPS ANALYSIS");
console.log("=".repeat(50));
console.log("Critical Specialty Shortages:");

const highPriorityGaps = analyticsData.specialtyGaps.filter(gap => gap.priority === 'high');
highPriorityGaps.forEach(gap => {
  const coverage = ((gap.currentDoctors / gap.requiredDoctors) * 100).toFixed(1);
  console.log(`\n🏥 ${gap.specialty} in ${gap.location}:`);
  console.log(`   Current: ${gap.currentDoctors} doctors`);
  console.log(`   Required: ${gap.requiredDoctors} doctors`);
  console.log(`   Gap: ${gap.gap} doctors (${coverage}% coverage)`);
  console.log(`   Estimated Demand: ${gap.estimatedDemand} patients`);
  
  if (gap.gap > 15) {
    console.log(`   ⚠️  URGENT: Immediate recruitment needed`);
  } else if (gap.gap > 10) {
    console.log(`   🔴 High Priority: Recruit within 3 months`);
  } else {
    console.log(`   🟡 Medium Priority: Plan recruitment within 6 months`);
  }
});

console.log("\n" + "=".repeat(50));

// 3. Review Sentiment Analysis
console.log("💬 REVIEW SENTIMENT ANALYSIS");
console.log("=".repeat(50));

analyticsData.reviewSentiment.forEach(doctor => {
  const sentimentIcon = doctor.sentimentScore >= 0.8 ? '😊' : doctor.sentimentScore >= 0.6 ? '😐' : '😞';
  const trendIcon = doctor.trend === 'improving' ? '📈' : doctor.trend === 'declining' ? '📉' : '➡️';
  
  console.log(`\n👨‍⚕️ ${doctor.doctorName} (${doctor.specialty}) ${sentimentIcon}`);
  console.log(`   Sentiment Score: ${(doctor.sentimentScore * 100).toFixed(0)}% ${trendIcon}`);
  console.log(`   Total Reviews: ${doctor.totalReviews}`);
  console.log(`   Positive: ${doctor.positiveReviews} | Negative: ${doctor.negativeReviews} | Neutral: ${doctor.neutralReviews}`);
  
  if (doctor.commonComplaints.length > 0) {
    console.log(`   🚨 Common Complaints: ${doctor.commonComplaints.join(', ')}`);
  }
  
  if (doctor.commonPraise.length > 0) {
    console.log(`   ✅ Common Praise: ${doctor.commonPraise.join(', ')}`);
  }
  
  if (doctor.sentimentScore < 0.7) {
    console.log(`   ⚠️  ACTION NEEDED: Review feedback and address concerns`);
  }
});

console.log("\n" + "=".repeat(50));

// 4. User Behavior Insights
console.log("👥 USER BEHAVIOR INSIGHTS");
console.log("=".repeat(50));
console.log(`Total Users: ${analyticsData.userBehavior.totalUsers.toLocaleString()}`);
console.log(`Active Users: ${analyticsData.userBehavior.activeUsers.toLocaleString()}`);
console.log(`Search Frequency: ${analyticsData.userBehavior.searchFrequency} searches per session`);
console.log(`Average Session Duration: ${analyticsData.userBehavior.averageSessionDuration} minutes`);
console.log(`Conversion Rate: ${(analyticsData.userBehavior.conversionRate * 100).toFixed(1)}%`);

console.log("\n📊 User Segments:");
analyticsData.userBehavior.topUserSegments.forEach(segment => {
  console.log(`\n   ${segment.segment}:`);
  console.log(`   Users: ${segment.count.toLocaleString()} (${segment.percentage}%)`);
  console.log(`   Avg Searches: ${segment.averageSearches}`);
  console.log(`   Top Interests: ${segment.topInterests.join(', ')}`);
});

console.log("\n" + "=".repeat(50));

// 5. Actionable Insights
console.log("🎯 ACTIONABLE INSIGHTS FOR ADMINS");
console.log("=".repeat(50));

// Search-based insights
const topSymptoms = analyticsData.topSearches.filter(s => s.category === 'symptom').slice(0, 3);
console.log("\n🔍 Search-Based Insights:");
console.log(`   Top symptoms searched: ${topSymptoms.map(s => s.term).join(', ')}`);
console.log(`   Consider adding more content about these symptoms`);
console.log(`   Partner with specialists in these areas`);

// Specialty gap insights
const urgentGaps = analyticsData.specialtyGaps.filter(g => g.gap > 15);
console.log("\n🏥 Recruitment Priorities:");
urgentGaps.forEach(gap => {
  console.log(`   URGENT: Recruit ${gap.gap} ${gap.specialty} specialists in ${gap.location}`);
});

// Sentiment insights
const lowSentimentDoctors = analyticsData.reviewSentiment.filter(d => d.sentimentScore < 0.7);
console.log("\n💬 Quality Improvement:");
lowSentimentDoctors.forEach(doctor => {
  console.log(`   Review feedback for ${doctor.doctorName} - ${(doctor.sentimentScore * 100).toFixed(0)}% sentiment`);
});

// User behavior insights
const symptomSeekers = analyticsData.userBehavior.topUserSegments.find(s => s.segment === 'Symptom Seekers');
console.log("\n👥 User Experience:");
console.log(`   ${symptomSeekers.percentage}% of users are symptom seekers`);
console.log(`   Consider enhancing symptom checker and health content`);
console.log(`   Focus on educational content for common symptoms`);

console.log("\n" + "=".repeat(50));
console.log("✅ Advanced Search Analytics Demo Complete!");
console.log("Admins can use these insights to:");
console.log("• Identify recruitment priorities");
console.log("• Improve doctor satisfaction");
console.log("• Enhance user experience");
console.log("• Optimize content strategy"); 