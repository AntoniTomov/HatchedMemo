import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

interface Profile {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl?: string;
}

interface AuthUser {
  id?: string;
  email?: string;
  full_name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, full_name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = 'http://localhost:3000';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          try {
            const profileResponse = await fetch(`${BASE_URL}/profiles/me`, {
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              setUser({ id: profileData.id, email: profileData.email, full_name: profileData.full_name });
            } else {
              await AsyncStorage.removeItem('userToken');
              setToken(null);
              setUser(null);
              console.error('Failed to fetch user profile on startup', profileResponse.status);
            }
          } catch (profileError) {
            console.error('Error fetching user profile on startup', profileError);
            await AsyncStorage.removeItem('userToken');
            setToken(null);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load user token from storage', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const jwt = data.access_token;
        const userData = data.user;
        await AsyncStorage.setItem('userToken', jwt);
        setToken(jwt);
        setUser({ id: userData.id, email: userData.email });
      } else {
        setError(data.message || 'Sign in failed');
        setUser(null);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'Network error during sign in');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, full_name?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, full_name }),
      });

      const data = await response.json();

      if (response.ok) {
        const jwt = data.access_token;
        const userData = data.user;
        await AsyncStorage.setItem('userToken', jwt);
        setToken(jwt);
        setUser({ id: userData.id, email: userData.email });
        Alert.alert('Success', 'Account created. Please sign in.');
      } else {
        setError(data.message || 'Sign up failed');
        setUser(null);
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'Network error during sign up');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      setUser(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
      setError(err.message || 'Error signing out');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Implement Google OAuth
      const mockUser: User = {
        id: '1',
        email: 'google@example.com',
        name: 'Google User',
      };
      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithFacebook = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Implement Facebook OAuth
      const mockUser: User = {
        id: '1',
        email: 'facebook@example.com',
        name: 'Facebook User',
      };
      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Implement Apple OAuth
      const mockUser: User = {
        id: '1',
        email: 'apple@example.com',
        name: 'Apple User',
      };
      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    try {
      setLoading(true);
      if (!profile) {
        throw new Error('No profile to update');
      }
      const updatedProfile: Profile = {
        ...profile,
        ...data,
      };
      setProfile(updatedProfile);
      await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
    } finally {
      setLoading(false);
    }
  }, [profile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithFacebook,
        signInWithApple,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 