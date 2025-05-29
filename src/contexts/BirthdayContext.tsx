import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BirthdayContact {
  id: string;
  name: string;
  date: string;
  relationship?: string;
  notes?: string;
  imageUrl?: string;
  avatarUrl?: string;
}

export interface User {
  name: string;
  isOnboarded: boolean;
  avatarUrl?: string;
  hasChildren?: boolean;
  children?: {
    id: string;
    name: string;
    birthDate: string;
    gender: string;
    daysToBirthday?: number;
    notes?: string;
    notificationPreference?: string;
  }[];
}

interface BirthdayContextType {
  birthdays: BirthdayContact[];
  loading: boolean;
  addBirthday: (birthday: Omit<BirthdayContact, 'id'>) => Promise<void>;
  removeBirthday: (id: string) => Promise<void>;
  updateBirthday: (id: string, data: Partial<Omit<BirthdayContact, 'id'>>) => Promise<void>;
  user: User;
  setUser: (user: User) => void;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export const BirthdayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: '',
    isOnboarded: false,
  });
  const [birthdays, setBirthdays] = useState<BirthdayContact[]>([]);

  const addBirthday = useCallback((birthday: Omit<BirthdayContact, 'id'>) => {
    try {
      // TODO: Implement API call
      const newBirthday: BirthdayContact = {
        ...birthday,
        id: Math.random().toString(36).substr(2, 9),
      };
      setBirthdays(prev => [...prev, newBirthday]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add birthday contact');
    }
  }, []);

  const removeBirthday = useCallback((id: string) => {
    try {
      // TODO: Implement API call
      setBirthdays(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove birthday contact');
    }
  }, []);

  return (
    <BirthdayContext.Provider 
      value={{ 
        user, 
        setUser, 
        birthdays, 
        addBirthday,
        removeBirthday,
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