import { useState, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    background: string;
    text: string;
    border: string;
    card: string;
    notification: string;
  };
}

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
    border: '#E5E5EA',
    card: '#FFFFFF',
    notification: '#FF3B30',
  },
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    text: '#FFFFFF',
    border: '#38383A',
    card: '#1C1C1E',
    notification: '#FF453A',
  },
};

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode');
        if (savedTheme) {
          setThemeMode(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  useEffect(() => {
    const updateTheme = async () => {
      try {
        await AsyncStorage.setItem('themeMode', themeMode);
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
    };

    updateTheme();

    if (themeMode === 'system') {
      setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
    } else {
      setTheme(themeMode === 'dark' ? darkTheme : lightTheme);
    }
  }, [themeMode, systemColorScheme]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'system';
        default:
          return 'light';
      }
    });
  }, []);

  return {
    theme,
    themeMode,
    toggleTheme,
    setThemeMode,
  };
}; 