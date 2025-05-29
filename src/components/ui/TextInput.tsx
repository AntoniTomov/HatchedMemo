import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View, Text } from 'react-native';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 4,
}) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[
          styles.input,
          multiline && styles.multilineInput
        ]}
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: 'white',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default TextInput; 