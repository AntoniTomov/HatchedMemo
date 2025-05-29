import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  items: SelectItem[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  items,
  placeholder = 'Select an option'
}) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        value={value}
        onValueChange={onValueChange}
        items={items}
        placeholder={{ label: placeholder, value: null }}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1f2937',
  },
}); 