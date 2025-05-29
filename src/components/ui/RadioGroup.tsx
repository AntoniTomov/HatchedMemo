import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const RadioGroup = ({ value, onValueChange, children, style }: RadioGroupProps) => {
  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            selected: child.props.value === value,
            onPress: () => onValueChange?.(child.props.value),
          });
        }
        return child;
      })}
    </View>
  );
};

const RadioGroupItem = ({ value, disabled, selected, onPress, style }: RadioGroupItemProps & {
  selected?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.item,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && (
          <Icon name="check" size={12} color="#9333ea" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9333ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#9333ea',
  },
});

RadioGroup.Item = RadioGroupItem;

export { RadioGroup }; 