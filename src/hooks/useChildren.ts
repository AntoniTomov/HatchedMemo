import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  daysToBirthday?: number;
  notes?: string;
  notificationPreference?: string;
}

export const useChildren = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);

  const addChild = useCallback(async (child: Omit<Child, 'id'>) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      const newChild: Child = {
        ...child,
        id: Math.random().toString(36).substr(2, 9),
      };
      setChildren(prev => [...prev, newChild]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add child');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeChild = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setChildren(prev => prev.filter(child => child.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove child');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateChild = useCallback(async (id: string, child: Partial<Child>) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setChildren(prev => prev.map(c => c.id === id ? { ...c, ...child } : c));
    } catch (error) {
      Alert.alert('Error', 'Failed to update child');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    children,
    loading,
    addChild,
    removeChild,
    updateChild,
  };
}; 