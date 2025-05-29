import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type AlertVariant = 'default' | 'destructive';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  style?: ViewStyle;
}

interface AlertTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const getAlertStyles = (variant: AlertVariant = 'default') => {
  switch (variant) {
    case 'destructive':
      return {
        container: {
          backgroundColor: '#fef2f2',
          borderColor: '#fecaca',
        },
        text: {
          color: '#dc2626',
        },
        icon: '#dc2626',
      };
    default:
      return {
        container: {
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb',
        },
        text: {
          color: '#1f2937',
        },
        icon: '#1f2937',
      };
  }
};

const Alert: React.FC<AlertProps> & {
  Title: React.FC<AlertTitleProps>;
  Description: React.FC<AlertDescriptionProps>;
} = ({ children, variant = 'default', style }) => {
  const variantStyles = getAlertStyles(variant);

  return (
    <View
      style={[
        styles.container,
        variantStyles.container,
        style,
      ]}
      accessibilityRole="alert"
    >
      {children}
    </View>
  );
};

const AlertTitle: React.FC<AlertTitleProps> = ({ children, style }) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, style }) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1f2937',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});

Alert.Title = AlertTitle;
Alert.Description = AlertDescription;

export { Alert }; 