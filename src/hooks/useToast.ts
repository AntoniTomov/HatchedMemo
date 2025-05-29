import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface ToastOptions {
  type?: 'success' | 'error' | 'info';
  position?: 'top' | 'bottom';
  duration?: number;
}

export const useToast = () => {
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    Toast.show({
      type,
      text1: message,
      position: 'bottom',
      visibilityTime: 4000,
    });
  }, []);

  const hide = useCallback(() => {
    Toast.hide();
  }, []);

  return { showToast, hide };
}; 