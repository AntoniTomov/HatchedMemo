import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBirthday } from '../contexts/BirthdayContext'; // Corrected relative path
import { useAuth } from '../contexts/AuthContext'; // Corrected relative path
import { useChildren, Child } from '../hooks/useChildren'; // Corrected relative path and imported Child type
import { useFriends, Friend } from '../hooks/useFriends'; // Corrected relative path and imported Friend types
import { getDaysUntilBirthday } from '../utils/dataUtils'; // Corrected relative path
import HomeContent from '../components/HomeContent'; // Corrected relative path
import CalendarView from '../components/CalendarView'; // Corrected relative path
import UpcomingBirthdays from '../components/UpcomingBirthdays'; // Corrected relative path
import NewsFeed from '../components/NewsFeed'; // Corrected relative path
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

// Define types based on usage and assumed structure
interface BirthdayUser {
  name: string;
  isOnboarded: boolean;
  avatarUrl?: string;
  hasChildren?: boolean;
  children?: Child[];
}

const Home: React.FC = () => {
  // Assuming contexts and hooks are adapted for RN and provide necessary data with defined types
  const { user, setUser } = useBirthday() as { user: BirthdayUser | null, setUser: (user: BirthdayUser) => void }; // Added type assertion
  const { user: authUser, loading: authLoading } = useAuth() as { user: any | null, loading: boolean }; // Use 'any' temporarily if auth user structure is unknown
  const { children, loading: childrenLoading } = useChildren();
  const { friends, loading: friendsLoading } = useFriends(); // Changed from friendsChildren to friends
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const loading = authLoading || childrenLoading || friendsLoading;
  
  // Check if user is authenticated and onboarded
  useEffect(() => {
    // Assuming authUser check is sufficient for authentication status
    if (!authUser) {
      // Navigate to auth screen if not authenticated
      // Replace 'Auth' with your actual authentication route name
      navigation.navigate('Auth');
    } else if (user && !user.isOnboarded) {
      // Stay on this component to show onboarding content if not onboarded
    } else if (user && user.isOnboarded) {
      // If authenticated and onboarded, potentially navigate to a default screen like Dashboard
      // This might need adjustment based on your app flow
      // navigation.navigate('Dashboard'); 
    }
  }, [authUser, user, navigation]);

  const handleContinue = () => {
    // Assuming setUser is adapted for RN context and updates onboarding status
    if (user) {
       setUser({ ...user, isOnboarded: true });
    }
  };

  // If user is not onboarded, show onboarding content
  // Assuming HomeContent is a React Native component
  if (!user?.isOnboarded) {
    return (
      <View style={[styles.container, styles.onboardingContainer]}>
        <HomeContent onContinue={handleContinue} />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#8247f5" />
      </View>
    );
  }

  // Create a combined list of all birthdays (user's children and friends' children)
  const allBirthdays = [
    // Mapping user's children to BirthdayItem format
    // Assuming child objects have id, name, birthDate, and avatarUrl properties
    ...children.map((child: Child) => ({
      id: child.id,
      name: child.name,
      date: format(new Date(child.birthDate), 'dd.MM.yyyy'), // Use birthDate
      avatarUrl: child.avatarUrl, // Use avatarUrl
      relationship: 'Child'
    })),
    // Mapping friends' children to BirthdayItem format
    // Assuming Friend type has a 'children' property which is an array of FriendChild objects
    ...friends.flatMap((friend) => // Use flatMap to flatten the nested array
      (friend.children || []).map((child: Child) => ({ // Map over each friend's children and add type annotation
        id: child.id,
        name: child.name,
        date: format(new Date(child.birthDate), 'dd.MM.yyyy'), // Use birthDate
        avatarUrl: child.avatarUrl, // Use avatarUrl
        relationship: 'Friend\'s Child'
      }))
    )
  ];

  // Sort birthdays by days until
  const sortedBirthdays = [...allBirthdays].sort(
    (a, b) => getDaysUntilBirthday(a.date) - getDaysUntilBirthday(b.date)
  );
  
  // Filter birthdays by search term
  const filteredBirthdays = sortedBirthdays.filter(
    birthday => birthday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userName = user?.name || 'Guest';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Adjust Header component or implement custom header */}
        <Text style={styles.headerTitle}>👶 Hey, {userName}! 👶</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Assuming CalendarView, UpcomingBirthdays, and NewsFeed components are migrated */}
        <CalendarView />
        
        <UpcomingBirthdays birthdays={filteredBirthdays} />
        
        <NewsFeed />
      </ScrollView>
      
      {/* Assuming BottomNav is a React Native component */}
      {/* <BottomNav /> */}
       {/* Need to implement or migrate BottomNav for RN */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  onboardingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default Home; 