import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBirthday } from '../contexts/BirthdayContext';
import { useAuth } from '../contexts/AuthContext';
import { useChildren, Child } from '../hooks/useChildren';
import { useFriends } from '../hooks/useFriends';
import { getDaysUntilBirthday } from '../utils/dataUtils';
import HomeContent from '../components/HomeContent';
import CalendarView from './CalendarView';
import UpcomingBirthdays from '../components/UpcomingBirthdays';
import NewsFeed from '../components/NewsFeed';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define types based on usage and assumed structure from web version
interface BirthdayUser {
  name: string;
  isOnboarded: boolean;
  // Add other user properties as needed
}

interface BirthdayItem {
  id: string;
  name: string;
  date: string; // Formatted date string
  avatarUrl?: string;
  relationship: string; // 'Child' or 'Friend's Child'
}

const HomeScreen: React.FC = () => {
  // Assuming contexts and hooks are adapted for RN and provide necessary data with defined types
  const { user, setUser } = useBirthday() as { user: BirthdayUser | null, setUser: (user: BirthdayUser) => void };
  const { user: authUser, loading: authLoading } = useAuth() as { user: any | null, loading: boolean }; // Use 'any' temporarily if auth user structure is unknown
  const { children, loading: childrenLoading } = useChildren(); // Changed from as { children: Child[], loading: boolean };
  const { friends, loading: friendsLoading } = useFriends(); // Changed to use 'friends' array and removed type assertion
  
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const loading = authLoading || childrenLoading || friendsLoading;
  
  // Check if user is authenticated and onboarded on mount
  useEffect(() => {
    // Only navigate if auth status is known and user is not authenticated
    if (!authLoading && !authUser) {
      // Navigate to auth screen if not authenticated
      // Replace 'Auth' with your actual authentication route name
      navigation.navigate('Auth');
    } // If authenticated, the rest of the component handles onboarding check
  }, [authUser, authLoading, navigation]);

  const handleContinue = () => {
    // Assuming setUser is adapted for RN context and updates onboarding status
    if (user) {
       // Ensure isOnboarded is a strict boolean
       setUser({ ...user, isOnboarded: true as boolean });
    }
  };

  // If user data is still loading or user is not onboarded, show appropriate content
  if (loading || !user || !user.isOnboarded) {
    return (
      <View style={[styles.container, styles.loadingOrOnboardingContainer]}>
         {loading ? (
             <ActivityIndicator size="large" color="#8247f5" />
         ) : (
             // Assuming HomeContent is a React Native component for onboarding
              <HomeContent onContinue={handleContinue} />
         )}
      </View>
    );
  }

  // Create a combined list of all birthdays (user's children and friends' children)
  const allBirthdays: BirthdayItem[] = [
    // Mapping user's children to BirthdayItem format
    ...children.map((child) => ({
      id: child.id,
      name: child.name,
      date: format(new Date(child.birthDate), 'dd.MM.yyyy'), // Format date and use birthDate
      avatarUrl: child.avatarUrl, // Use avatarUrl
      relationship: 'Child'
    })),
    // Mapping friends' children to BirthdayItem format
    // Assuming Friend type has a 'children' property which is an array of child objects
    ...friends.flatMap((friend) => // Use flatMap to flatten the nested array
      (friend.children || []).map((child: Child) => ({ // Map over each friend's children, add type annotation, and handle undefined children
        id: child.id,
        name: child.name,
        date: format(new Date(child.birthDate), 'dd.MM.yyyy'), // Use birthDate
        avatarUrl: child.avatarUrl, // Use avatarUrl
        relationship: "Friend's Child", // Fix syntax issue and ensure commas
      }))
    )
  ];

  // Sort birthdays by days until (need to adapt getDaysUntilBirthday for RN dates/strings)
  const sortedBirthdays = [...allBirthdays].sort(
    (a, b) => {
        // Assuming getDaysUntilBirthday can handle the 'dd.MM.yyyy' string format
        const daysA = getDaysUntilBirthday(a.date);
        const daysB = getDaysUntilBirthday(b.date);
        // Handle cases where date might be invalid and return NaN
        if (isNaN(daysA) || isNaN(daysB)) return 0; // Or handle error appropriately
        return daysA - daysB;
    }
  );
  
  // Filter birthdays by search term
  const filteredBirthdays = sortedBirthdays.filter(
    birthday => birthday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Assuming the user object from useBirthday has a name property
  const userName = user?.name || authUser?.email || 'Guest';

  return (
    <View style={styles.container}>
      {/* Header - need to implement or migrate a React Native Header component */}
       <View style={styles.headerPlaceholder}>
          <Text style={styles.headerTitle}>👶 Hey, {userName}! 👶</Text>
       </View>

      <ScrollView style={styles.content}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          {/* Assuming Ionicons is available from @expo/vector-icons or similar */}
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
        {/* Pass filtered birthdays to UpcomingBirthdays */}
         <CalendarView />
         
         {/* Only show UpcomingBirthdays if there are any filtered birthdays */}
         {filteredBirthdays.length > 0 ? (
            <UpcomingBirthdays birthdays={filteredBirthdays} />
         ) : (
             // Optional: Show a message when no birthdays match the search
             searchTerm ? (
                 <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyText}>No birthdays found for "{searchTerm}"</Text>
                 </View>
             ) : (
                  // Optional: Show a message when there are no birthdays at all
                   <View style={styles.emptyStateContainer}>
                       <Text style={styles.emptyText}>No upcoming birthdays.</Text>
                       <Text style={styles.emptyTextSmall}>Add children or friends to see their birthdays here!</Text>
                   </View>
             )
         )}
         
         <NewsFeed />

      </ScrollView>
      
      {/* BottomNav - need to implement or migrate a React Native BottomNav component */}
      {/* <BottomNav /> */}
      {/* Placeholder if BottomNav is not yet migrated */}
      <View style={styles.bottomNavPlaceholder}>
          <Text style={styles.bottomNavText}>Bottom Navigation</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Equivalent to bg-gray-50
  },
  loadingOrOnboardingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
  },
   headerPlaceholder: { // Placeholder style for the header
       padding: 16,
       backgroundColor: '#FFFFFF',
       borderBottomWidth: 1,
       borderBottomColor: '#E5E7EB',
       alignItems: 'center',
   },
    headerTitle: {
       fontSize: 20,
       fontWeight: '600',
    },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Equivalent to bg-gray-100
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24, // Equivalent to mb-6
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1F2937', // Equivalent to text-gray-900
  },
  emptyStateContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280', // Equivalent to text-gray-600
    fontSize: 16,
    textAlign: 'center',
  },
   emptyTextSmall: {
        color: '#6B7280', // Equivalent to text-gray-600
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
   },
   bottomNavPlaceholder: { // Placeholder style for BottomNav
       height: 60, // Example height
       backgroundColor: '#E5E7EB', // Placeholder background
       justifyContent: 'center',
       alignItems: 'center',
       // You might need to adjust positioning based on your navigation setup
       // e.g., use a Bottom Tab Navigator from @react-navigation/bottom-tabs
   },
    bottomNavText: {
        color: '#4B5563',
    }
});

export default HomeScreen; 