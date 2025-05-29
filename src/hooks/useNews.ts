import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

interface NewsItem {
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
        // TODO: Implement API call
        // For now, using mock data
        const mockNews: NewsItem[] = [
          {
            id: '1',
            title: 'Upcoming Birthday',
            content: 'John\'s birthday is coming up in 5 days!',
            date: new Date().toISOString(),
            type: 'birthday',
          },
          {
            id: '2',
            title: 'Milestone Reached',
            content: 'Jane has reached a new milestone in her development.',
            imageUrl: 'https://example.com/milestone.jpg',
            date: new Date().toISOString(),
            type: 'milestone',
          },
        ];

        setNews(mockNews);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading };
}; 