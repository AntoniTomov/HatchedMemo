import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface AvatarProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
}); 