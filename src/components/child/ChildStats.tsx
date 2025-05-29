import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChildStatsProps {
  daysLeft: number;
  wishesCount: number;
}

const ChildStats: React.FC<ChildStatsProps> = ({ daysLeft, wishesCount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{daysLeft}</Text>
        <Text style={styles.statLabel}>Days Left</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={styles.statValue}>3</Text>
        <Text style={styles.statLabel}>Gift Idea</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{wishesCount}</Text>
        <Text style={styles.statLabel}>Wish</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9333ea', // purple-600
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#4b5563', // gray-600
  },
});

export default ChildStats; 