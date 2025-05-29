import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { BirthdayContact } from '../contexts/BirthdayContext';
import { format } from 'date-fns';

interface UpcomingBirthdaysProps {
  birthdays: BirthdayContact[];
}

const UpcomingBirthdays: React.FC<UpcomingBirthdaysProps> = ({ birthdays }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // Use only the actual birthdays data passed from parent, limited to first 2
  const displayBirthdays = birthdays.slice(0, 2);

  const handleBirthdayClick = (birthday: BirthdayContact) => {
    // If it's the user's child
    if (birthday.relationship === 'Child') {
      navigation.navigate('ChildDetails', { childId: birthday.id, title: birthday.name });
      return;
    }
    
    // If it's a friend's child
    if (birthday.relationship === "Friend's Child") {
      // For friend's children, we need to find the parent friend ID
      // Based on the mock data structure, we can derive the friend ID from the child ID
      if (birthday.id.startsWith('101') || birthday.id.startsWith('102')) {
        // Esen and Kai belong to Mirena (friend ID: 1)
        navigation.navigate('FriendChildDetails', { friendId: '1', childId: birthday.id });
      } else if (birthday.id.startsWith('201')) {
        // Ivana belongs to Marin (friend ID: 2)
        navigation.navigate('FriendChildDetails', { friendId: '2', childId: birthday.id });
      }
      return;
    }
    
    // Default fallback - shouldn't happen with current data structure
    console.log('Unknown relationship for birthday:', birthday);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming</Text>
        <TouchableOpacity onPress={() => navigation.navigate('News')}>
          <Text style={styles.newsLink}>News</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.birthdaysList}>
        {displayBirthdays.length > 0 ? (
          displayBirthdays.map((birthday, index) => {
            const birthDate = new Date(birthday.date);
            const birthYear = birthDate.getFullYear();
            const age = new Date().getFullYear() - birthYear;
            
            return (
              <TouchableOpacity 
                key={birthday.id} 
                style={styles.birthdayCard}
                onPress={() => handleBirthdayClick(birthday)}
              >
                <View style={[
                  styles.ageBadge,
                  index % 2 === 0 ? styles.ageBadgePurple : styles.ageBadgePurple
                ]}>
                  <Text style={styles.ageText}>{age}</Text>
                </View>
                <View style={styles.birthdayInfo}>
                  <Text style={styles.name}>{birthday.name}</Text>
                  <Text style={styles.date}>{format(birthDate, 'dd.MM.yyyy')}</Text>
                </View>
                <View style={styles.avatarContainer}>
                  <Image 
                    source={{ uri: `https://i.pravatar.cc/100?img=${parseInt(birthday.id) % 70}` }}
                    style={styles.avatar}
                  />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No upcoming birthdays</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },
  newsLink: {
    fontSize: 14,
    color: '#6b7280',
  },
  birthdaysList: {
    gap: 12,
  },
  birthdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  ageBadge: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageBadgePurple: {
    backgroundColor: '#8247f5',
  },
  ageText: {
    color: 'white',
    fontWeight: '500',
  },
  birthdayInfo: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    color: '#6b7280',
  },
});

export default UpcomingBirthdays; 