import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  date: string;
  type: 'birthday' | 'milestone' | 'reminder';
}

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // TODO: Implement API call to fetch news
        console.log('Fetching news...');
        // For now, using mock data
        const mockNews: NewsItem[] = [
          {
            id: '1',
            title: 'Upcoming Birthday',
            content: 'John\'s birthday is coming up in 5 days!',
            date: new Date().toISOString(),
            type: 'birthday',
            // imageUrl: 'https://example.com/birthday.jpg', // Example imageUrl
          },
          {
            id: '2',
            title: 'Milestone Reached',
            content: 'Jane has reached a new milestone in her development.',
            imageUrl: 'https://picsum.photos/seed/milestone/300/200', // Example imageUrl
            date: new Date().toISOString(),
            type: 'milestone',
          },
           {
            id: '3',
            title: 'Vaccination Reminder',
            content: 'Time for little Timmy\'s vaccination shot.',
             date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
            type: 'reminder',
          },
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setNews(mockNews);
      } catch (error: any) {
        console.error('Failed to fetch news:', error);
        Alert.alert('Error', error.message || 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this effect runs once on mount

  return { newsItems: news, loading }; // Renamed news to newsItems for clarity based on usage
}; 