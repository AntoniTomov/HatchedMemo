import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[variant],
        styles[`${size}Button`],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles[`${variant}Text`],
          styles[`${size}Text`],
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#0000ff',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0000ff',
  },
  defaultText: {
    color: '#ffffff',
    fontSize: 16,
  },
  ghostText: {
    color: '#0000ff',
  },
  outlineText: {
    color: '#0000ff',
  },
  smButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  defaultButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  lgButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  smText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
}); 