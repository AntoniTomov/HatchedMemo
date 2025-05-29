import React from 'react';
import { Switch as RNSwitch, StyleSheet, ViewStyle } from 'react-native';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  style,
}) => {
  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: '#e5e7eb', true: '#8247f5' }}
      thumbColor={checked ? 'white' : 'white'}
      style={[styles.switch, style]}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
}); 