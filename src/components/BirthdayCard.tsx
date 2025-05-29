import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { formatDate, getDaysUntilBirthday, calculateAge } from '../utils/dateUtils';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';

interface BirthdayContact {
  name: string;
  date: string;
  relationship?: string;
  avatarUrl?: string;
}

interface BirthdayCardProps {
  contact: BirthdayContact;
  onPress?: () => void;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ contact, onPress }) => {
  const daysUntil = getDaysUntilBirthday(contact.date);
  const nextAge = calculateAge(contact.date) + 1;
  
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.content}>
          <Avatar style={styles.avatar}>
            {contact.avatarUrl ? (
              <Image
                source={{ uri: contact.avatarUrl }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>
                  {getInitials(contact.name)}
                </Text>
              </View>
            )}
          </Avatar>
          
          <View style={styles.info}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{contact.name}</Text>
              {contact.relationship && (
                <Text style={styles.relationship}>{contact.relationship}</Text>
              )}
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{formatDate(contact.date)}</Text>
            </View>
          </View>
          
          <View style={styles.daysContainer}>
            <View style={[
              styles.daysCircle,
              daysUntil <= 7 ? styles.daysCircleUrgent : styles.daysCircleNormal
            ]}>
              <Text style={styles.daysText}>{daysUntil}</Text>
            </View>
            <Text style={styles.daysLabel}>days</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  info: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  relationship: {
    fontSize: 12,
    color: '#6b7280',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  daysContainer: {
    alignItems: 'center',
    marginLeft: 16,
  },
  daysCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysCircleNormal: {
    backgroundColor: '#8247f5',
  },
  daysCircleUrgent: {
    backgroundColor: '#ec4899',
  },
  daysText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  daysLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default BirthdayCard; 