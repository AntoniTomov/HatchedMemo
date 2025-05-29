import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const getBadgeStyles = (variant: BadgeVariant = 'default') => {
  switch (variant) {
    case 'secondary':
      return {
        container: {
          backgroundColor: '#f3f4f6',
          borderColor: 'transparent',
        },
        text: {
          color: '#1f2937',
        },
      };
    case 'destructive':
      return {
        container: {
          backgroundColor: '#fee2e2',
          borderColor: 'transparent',
        },
        text: {
          color: '#dc2626',
        },
      };
    case 'outline':
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: '#e5e7eb',
        },
        text: {
          color: '#1f2937',
        },
      };
    default:
      return {
        container: {
          backgroundColor: '#9333ea',
          borderColor: 'transparent',
        },
        text: {
          color: '#ffffff',
        },
      };
  }
};

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', style, textStyle }) => {
  const variantStyles = getBadgeStyles(variant);

  return (
    <View style={[styles.container, variantStyles.container, style]}>
      <Text style={[styles.text, variantStyles.text, textStyle]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export { Badge }; 