import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChildDetailsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Child Details Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB', // Example background color
  },
});

export default ChildDetailsScreen; 