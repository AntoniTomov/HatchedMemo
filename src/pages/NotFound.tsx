import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const NotFound: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    // Log the route name or path if available in React Navigation state
    console.error(
      "404 Error: User attempted to access non-existent route:",
      route.name // Or route.path if your navigation setup provides it
    );
  }, [route.name]); // Depend on route.name or route.path

  const handleGoHome = () => {
    // Replace 'Home' with your actual home screen route name
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Oops! Page not found</Text>
        <TouchableOpacity onPress={handleGoHome}>
          <Text style={styles.link}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Equivalent to bg-gray-100
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center', // In React Native, text alignment is a style property
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16, // Equivalent to mb-4 (adjust value as needed)
  },
  subtitle: {
    fontSize: 20,
    color: '#4B5563', // Equivalent to text-gray-600
    marginBottom: 16, // Equivalent to mb-4
  },
  link: {
    color: '#3B82F6', // Equivalent to text-blue-500
    textDecorationLine: 'underline',
  },
});

export default NotFound; 