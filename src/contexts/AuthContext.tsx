import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
      };
      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: fullName,
      };
      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      setUser(null);
      setProfile(null);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('profile');
    } finally {
      setLoading(false);
    }
  }, []);

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
      // TODO: Implement actual API call
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