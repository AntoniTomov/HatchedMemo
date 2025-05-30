import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const Welcome: React.FC = () => {
  const navigation = useNavigation();
  // Assuming useAuth hook is adapted for RN and provides user and loading state
  const { user, loading } = useAuth();

  const handleContinue = () => {
    // If user is already logged in, navigate to the appropriate screen
    // Replace 'Home' and 'Auth' with your actual route names
    if (user) {
      // You might want to check onboarding status here and navigate accordingly
      // For now, navigating to 'Home' as a placeholder if authenticated
      navigation.navigate('Home');
    } else {
      navigation.navigate('Auth');
    }
  };

  // Redirect based on auth status on mount and when user/loading changes
  useEffect(() => {
    // Only redirect once auth status is known
    if (!loading) {
      if (user) {
        // If authenticated, check onboarding status and navigate
        // Assuming user object from useAuth has an isOnboarded property
        // If not, you might need another context or API call to determine onboarding status
        // For now, navigating to 'Home' if authenticated
        navigation.navigate('Home');
      } else {
        // If not authenticated, stay on Welcome or navigate to Auth if not already there
        // Avoid infinite loops if Welcome is the initial route
        // if (navigation.getState().routes[navigation.getState().index].name !== 'Auth') {
        //   navigation.navigate('Auth');
        // }
        // Keeping user on Welcome if not authenticated to allow pressing Continue
      }
    }
  }, [user, loading, navigation]);

   // Show a loading indicator while authentication status is being determined
   if (loading) {
       return (
           <View style={styles.container}>
               {/* Assuming the birthday color is defined in your styles or theme */}
               <ActivityIndicator size="large" color="#8247f5" />
           </View>
       );
   }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, Friend!</Text>
        <Text style={styles.subtitle}>Let's reMember with the Hatched.memo</Text>
      </View>

      {/* Egg image - need to update source for RN assets */}
      {/* Assuming the image is in your RN assets or can be fetched */}
       <View style={styles.eggImageContainer}>
           <Image 
               source={require('../assets/images/6ae9d43c-37ef-493b-be7c-57f2cb0c86ff.png')} // Example path
               style={styles.eggImage}
               resizeMode="contain"
           />
       </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={styles.continueButton}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Equivalent to bg-white
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24, // Equivalent to p-6
  },
  header: {
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 24, // Equivalent to mb-6
  },
  title: {
    fontSize: 28, // Equivalent to text-3xl
    fontWeight: 'bold',
    color: '#1F2937', // Equivalent to text-gray-900
    marginBottom: 8, // Equivalent to mb-2
  },
  subtitle: {
    fontSize: 16, // Equivalent to text-gray-600
    color: '#4B5563',
  },
  eggImageContainer: {
      width: '100%',
      maxWidth: 320, // Equivalent to max-w-xs
      marginVertical: 32, // Equivalent to my-8
      alignItems: 'center',
  },
  eggImage: {
    width: '100%',
    height: 200, // Adjust height as needed
    // No opacity style needed if image is prepared with transparency
  },
  continueButton: {
    backgroundColor: '#8B5CF6', // Equivalent to bg-purple-600
    paddingHorizontal: 40, // Equivalent to px-10
    paddingVertical: 12, // Equivalent to py-2
    borderRadius: 999, // Equivalent to rounded-full
    alignItems: 'center',
    justifyContent: 'center',
  },
   buttonText: {
       color: '#FFFFFF',
       fontSize: 16,
       fontWeight: '500', // Equivalent to font-medium
   }
});

export default Welcome; 