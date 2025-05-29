import React from 'react';
import {
  Switch as RNSwitch,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Switch = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  style,
}: SwitchProps) => {
  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: '#e5e7eb', true: '#9333ea' }}
      thumbColor="white"
      style={[styles.switch, style]}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{ scale: 1.2 }],
  },
});

export { Switch }; 