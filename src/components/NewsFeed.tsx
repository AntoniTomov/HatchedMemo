import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNews, NewsItem } from '../hooks/useNews';

const NewsFeed: React.FC = () => {
  const { newsItems, loading } = useNews();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>News</Text>
        <View style={styles.card}>
          <Text style={styles.loadingText}>Loading news...</Text>
        </View>
      </View>
    );
  }

  if (newsItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>News</Text>
        <View style={styles.card}>
          <Text style={styles.emptyText}>No news items yet.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
      
      {newsItems.map((item: NewsItem) => (
        <View key={item.id} style={styles.newsCard}>
          <View style={styles.content}>
            <Text style={styles.newsText}>{item.content}</Text>
          </View>
          {item.image_url && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: item.image_url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  loadingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  content: {
    flex: 1,
  },
  newsText: {
    fontSize: 14,
    color: '#111827',
  },
  imageContainer: {
    width: 64,
    height: 64,
    marginLeft: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default NewsFeed; 