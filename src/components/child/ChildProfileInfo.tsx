import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './ui/Avatar';
import { formatDate } from '../utils/dateUtils';

interface ChildProfileInfoProps {
  name: string;
  birthDate: string;
  avatarUrl?: string;
}

const ChildProfileInfo: React.FC<ChildProfileInfoProps> = ({ 
  name, 
  birthDate, 
  avatarUrl 
}) => {
  const birthDateFormatted = formatDate(birthDate);
  const initials = name.substring(0, 2).toUpperCase();
  
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name} Birthday</Text>
        <Text style={styles.date}>{birthDateFormatted}</Text>
      </View>
      <Avatar 
        src={avatarUrl} 
        fallback={initials}
        size={64}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#4b5563',
  },
});

export default ChildProfileInfo; 