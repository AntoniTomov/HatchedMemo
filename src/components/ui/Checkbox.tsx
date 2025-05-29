import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  AccessibilityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CheckboxProps extends AccessibilityProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  style,
  ...props
}) => {
  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.checkbox,
        checked && styles.checked,
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={props.accessibilityLabel}
      {...props}
    >
      {checked && (
        <Icon
          name="check"
          size={16}
          color={disabled ? '#9ca3af' : '#ffffff'}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9333ea',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#9333ea',
    borderColor: '#9333ea',
  },
  disabled: {
    opacity: 0.5,
    borderColor: '#9ca3af',
  },
});

export { Checkbox }; 