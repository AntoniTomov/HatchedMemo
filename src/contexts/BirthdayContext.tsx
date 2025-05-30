import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { User } from '../types/types'; // Import User from shared types

export interface BirthdayContact {
  id: string;
  name: string;
  date: string;
  relationship?: string;
  notes?: string;
  imageUrl?: string;
  avatarUrl?: string;
  friend_id?: string;
}

interface BirthdayContextType {
  birthdays: BirthdayContact[];
  loading: boolean;
  error: string | null;
  fetchBirthdays: () => Promise<void>;
  addBirthday: (birthday: Omit<BirthdayContact, 'id'>) => Promise<void>;
  removeBirthday: (id: string) => Promise<void>;
  updateBirthday: (id: string, data: Partial<Omit<BirthdayContact, 'id'>>) => Promise<void>;
  user: User | null;
  setUser: (user: User) => void;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export const BirthdayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [birthdays, setBirthdays] = useState<BirthdayContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const storedUser = await AsyncStorage.getItem('birthdayUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        console.log('Fetching initial birthdays...');
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockBirthdays: BirthdayContact[] = [
          { id: 'b1', name: 'Mock Child 1', date: '2015-07-25', relationship: 'Child' },
          { id: 'b2', name: 'Mock Friend 1', date: '1990-12-10', relationship: 'Friend' },
        ];
        setBirthdays(mockBirthdays);
      } catch (err: any) {
        console.error('Failed to load initial data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const fetchBirthdays = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching birthdays...');
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockBirthdays: BirthdayContact[] = [
        { id: 'b1', name: 'Mock Child 1', date: '2015-07-25', relationship: 'Child' },
        { id: 'b2', name: 'Mock Friend 1', date: '1990-12-10', relationship: 'Friend' },
      ];
      setBirthdays(mockBirthdays);
    } catch (err: any) {
      console.error('Failed to fetch birthdays:', err);
      setError(err.message || 'Failed to fetch birthdays');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBirthday = useCallback(async (birthday: Omit<BirthdayContact, 'id'>) => {
    try {
      console.log('Adding birthday:', birthday);
      await new Promise(resolve => setTimeout(resolve, 500));
      const newBirthday: BirthdayContact = {
        ...birthday,
        id: Math.random().toString(36).substr(2, 9),
      };
      setBirthdays(prev => [...prev, newBirthday]);
      Alert.alert('Success', 'Birthday added successfully!');
    } catch (err: any) {
      console.error('Failed to add birthday:', err);
      Alert.alert('Error', err.message || 'Failed to add birthday contact');
      throw err;
    }
  }, []);

  const removeBirthday = useCallback(async (id: string) => {
    try {
      console.log('Removing birthday with id:', id);
      await new Promise(resolve => setTimeout(resolve, 500));
      setBirthdays(prev => prev.filter(b => b.id !== id));
      Alert.alert('Success', 'Birthday removed successfully!');
    } catch (err: any) {
      console.error('Failed to remove birthday:', err);
      Alert.alert('Error', err.message || 'Failed to remove birthday contact');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBirthday = useCallback(async (id: string, data: Partial<Omit<BirthdayContact, 'id'>>) => {
    try {
      setLoading(true);
      console.log('Updating birthday with id:', id, 'with data:', data);
      await new Promise(resolve => setTimeout(resolve, 500));
      setBirthdays(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
      Alert.alert('Success', 'Birthday updated successfully!');
    } catch (err: any) {
      console.error('Failed to update birthday:', err);
      Alert.alert('Error', err.message || 'Failed to update birthday');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <BirthdayContext.Provider 
      value={{ 
        user,
        setUser,
        birthdays,
        loading,
        error,
        fetchBirthdays,
        addBirthday,
        removeBirthday,
        updateBirthday,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => {
  const context = useContext(BirthdayContext);
  if (context === undefined) {
    throw new Error('useBirthday must be used within a BirthdayProvider');
  }
  return context;
}; 