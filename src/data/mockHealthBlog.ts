export interface HealthBlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  date: string;
  tags: string[];
}

export const mockHealthBlog: HealthBlogPost[] = [
  {
    id: '1',
    title: '5 Heart-Healthy Habits for Everyday Life',
    content: 'Maintaining a healthy heart is easier than you think. Start with regular exercise, a balanced diet, and routine check-ups. Avoid smoking and manage stress for long-term cardiovascular health. Read on for practical tips you can start today...',
    authorId: '1', // Dr. Ahmed Bennani
    date: '2025-05-31',
    tags: ['heart', 'lifestyle', 'prevention', 'cardiology']
  },
  {
    id: '2',
    title: 'How to Care for Sensitive Skin in Summer',
    content: 'Summer heat can be tough on sensitive skin. Use gentle cleansers, apply sunscreen daily, and avoid harsh exfoliants. Stay hydrated and consult a dermatologist for personalized advice. Here are expert tips for glowing skin all season...',
    authorId: '2', // Dr. Fatima Alaoui
    date: '2025-05-30',
    tags: ['skin', 'dermatology', 'summer', 'tips']
  }
]; 