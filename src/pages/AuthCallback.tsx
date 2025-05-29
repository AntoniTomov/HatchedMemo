import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

type AuthCallbackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AuthCallback'>;

export const AuthCallback = () => {
  const navigation = useNavigation<AuthCallbackNavigationProp>();
  const { loading } = useAuth();

  useEffect(() => {
    // TODO: Handle OAuth callback logic
    // For now, just redirect to Home after a short delay
    const timeoutId = setTimeout(() => {
      navigation.replace('Home');
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
}); 