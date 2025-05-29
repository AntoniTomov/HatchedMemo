import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChildDetailsProps {
  fullName: string;
  zodiacSign: string;
  parents?: { id: string; name: string }[];
  wishes?: string[];
  age: number;
  daysLeft: number;
}

const ChildDetails: React.FC<ChildDetailsProps> = ({ 
  fullName, 
  zodiacSign, 
  parents, 
  wishes, 
  age, 
  daysLeft 
}) => {
  // Calculate the age they will turn (current age + 1)
  const turningAge = age + 1;
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.name}>{fullName}</Text>
      </View>
      
      <Text style={styles.celebrationText}>
        Celebrates {turningAge} years in {daysLeft} days!
      </Text>
      
      <View style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Zodiac sign:</Text>
          <Text style={styles.value}>{zodiacSign}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Parents:</Text>
          {parents?.map((parent, idx) => (
            <View key={parent.id} style={styles.row}>
              <Text style={styles.value}>#{idx + 1}</Text>
              <Text style={styles.value}>{parent.name}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Wishes:</Text>
          <Text style={styles.wishesText}>
            {wishes && wishes.length > 0 ? wishes.join(', ') : 'No wishes yet'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  celebrationText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 16,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  detailsContainer: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    color: '#4b5563',
    marginBottom: 4,
  },
  value: {
    color: '#000',
  },
  wishesText: {
    textAlign: 'right',
  },
});

export default ChildDetails; 