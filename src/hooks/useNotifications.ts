import { useState, useEffect, useCallback } from 'react';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationSettings {
  birthdays: boolean;
  milestones: boolean;
  reminders: boolean;
}

export const useNotifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    birthdays: true,
    milestones: true,
    reminders: true,
  });
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('notificationSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Failed to load notification settings:', error);
      }
    };

    loadSettings();
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // For iOS, we'll handle this through the app's capabilities
        // and Info.plist configuration
        setHasPermission(true);
        return true;
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request notification permission');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<NotificationSettings>) => {
    try {
      setLoading(true);
      const updatedSettings = { ...settings, ...newSettings };
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  }, [settings]);

  const scheduleNotification = useCallback(async (title: string, body: string, date: Date) => {
    try {
      setLoading(true);
      // TODO: Implement local notification scheduling
      // This would use the platform's native notification scheduling
      console.log('Scheduling notification:', { title, body, date });
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification');
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelNotification = useCallback(async (notificationId: string) => {
    try {
      setLoading(true);
      // TODO: Implement notification cancellation
      console.log('Cancelling notification:', notificationId);
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel notification');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    settings,
    loading,
    hasPermission,
    requestPermission,
    updateSettings,
    scheduleNotification,
    cancelNotification,
  };
}; 