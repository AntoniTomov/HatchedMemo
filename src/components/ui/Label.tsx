import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  TextProps,
} from 'react-native';

interface LabelProps extends TextProps {
  style?: TextStyle;
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.label, style]}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
});

export { Label }; 