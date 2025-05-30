import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext'; // Assuming React Native version exists
import { useBirthday } from '../contexts/BirthdayContext';

const Index: React.FC = () => {
  const navigation = useNavigation();
  // Assuming useBirthday and useAuth hooks are adapted for RN and provide necessary data
  const { user: birthdayUser } = useBirthday();
  const { user: authUser, loading: authLoading } = useAuth();

  useEffect(() => {
    // Wait for auth loading to complete
    if (authLoading) {
      return;
    }

    // First check if authenticated
    // Assuming authUser being truthy indicates authentication
    if (!authUser) {
      // Navigate to auth screen if not authenticated
      // Replace 'Auth' with your actual authentication route name
      navigation.navigate('Auth');
    } else if (birthdayUser && !birthdayUser.isOnboarded) {
      // If authenticated but not onboarded, navigate to the Home/Onboarding screen
      // Replace 'Home' with your actual home/onboarding route name
      navigation.navigate('Home');
    } else if (authUser && birthdayUser && birthdayUser.isOnboarded) {
      // If authenticated and onboarded, navigate to the Dashboard
      // Replace 'Dashboard' with your actual dashboard route name
      navigation.navigate('Home');
    }
  }, [authUser, authLoading, birthdayUser, navigation]);

  // Show a loading indicator while authentication status is being determined
  if (authLoading) {
    return (
      <View style={styles.container}>
        {/* Assuming the birthday color is defined in your styles or theme */}
        <ActivityIndicator size="large" color="#8247f5" /> 
      </View>
    );
  }

  // This component primarily handles redirection, so it doesn't render much itself
  // The navigation in the useEffect handles where the user goes after loading/auth check
  return null; // Or a simple loading/splash screen if needed
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB', // Or your desired background color
  },
});

export default Index; 