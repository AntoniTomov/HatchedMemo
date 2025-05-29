import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type AuthPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signIn, signUp, signInWithGoogle, signInWithFacebook, signInWithApple, loading } = useAuth();
  const { showToast } = useToast();
  const navigation = useNavigation<AuthPageNavigationProp>();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!fullName) {
          showToast('Please enter your full name', 'error');
          return;
        }
        await signUp(email, password, fullName);
      }
      navigation.replace('Home');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Authentication failed', 'error');
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'facebook':
          await signInWithFacebook();
          break;
        case 'apple':
          await signInWithApple();
          break;
      }
      navigation.replace('Home');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'OAuth login failed', 'error');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to HatchedMemo</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.activeTab]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin && styles.activeTab]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Label>Password</Label>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <Button onPress={handleSubmit} style={styles.submitButton}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.oauthButtons}>
            <Button
              variant="outline"
              onPress={() => handleOAuthLogin('google')}
              style={styles.oauthButton}
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onPress={() => handleOAuthLogin('facebook')}
              style={styles.oauthButton}
            >
              Continue with Facebook
            </Button>
            <Button
              variant="outline"
              onPress={() => handleOAuthLogin('apple')}
              style={styles.oauthButton}
            >
              Continue with Apple
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0000ff',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#0000ff',
    fontWeight: 'bold',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  submitButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  oauthButtons: {
    gap: 12,
  },
  oauthButton: {
    backgroundColor: '#fff',
  },
}); 