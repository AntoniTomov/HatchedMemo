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
    // Navigation calls need to match routes defined in RootStackParamList
    // Ensure the route names and params match the navigation setup
    if (birthday.relationship === 'Child') {
      // Assuming 'ChildDetails' route expects a 'childId'
      navigation.navigate('ChildDetails', { childId: birthday.id, title: birthday.name });
      return;
    }
    
    // If it's a friend's child
    if (birthday.relationship === "Friend's Child") {
      // This logic might need adjustment based on actual data structure and API response
      // For friend's children, we need to find the parent friend ID
      // Based on the mock data structure, we can derive the friend ID from the child ID
      // TODO: Fetch or derive friendId correctly based on your data model
      // Example mock derivation:
       if (birthday.friend_id) { // Use friend_id if available in BirthdayContact
           navigation.navigate('FriendChildDetails', { friendId: birthday.friend_id, childId: birthday.id });
       } else if (birthday.id.startsWith('101') || birthday.id.startsWith('102')) {
         // Esen and Kai belong to Mirena (friend ID: 1)
         console.warn('Friend ID not found in birthday, using mock derivation for Mirena');
         navigation.navigate('FriendChildDetails', { friendId: '1', childId: birthday.id });
       } else if (birthday.id.startsWith('201')) {
         // Ivana belongs to Marin (friend ID: 2)
         console.warn('Friend ID not found in birthday, using mock derivation for Marin');
         navigation.navigate('FriendChildDetails', { friendId: '2', childId: birthday.id });
       } else {
            console.warn('Unable to determine friendId for Friend\'s Child', birthday);
            // Potentially navigate to a generic child details or show an error
            // navigation.navigate('SomeErrorScreen', { message: 'Could not load friend\'s child details' });
       }
      return;
    }
    
    // Default fallback - shouldn't happen with current data structure
    console.log('Unknown relationship for birthday:', birthday);
     // Consider navigating to a fallback screen or showing an alert
     // Alert.alert('Navigation Error', `Could not determine destination for ${birthday.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming</Text>
        {/* Ensure 'News' route exists in RootStackParamList */}
        <TouchableOpacity onPress={() => navigation.navigate('News')}>
          <Text style={styles.newsLink}>News</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.birthdaysList}>
        {displayBirthdays.length > 0 ? (
          displayBirthdays.map((birthday, index) => {
            const birthDate = new Date(birthday.date);
            // Calculate age based on current date
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return (
              <TouchableOpacity 
                key={birthday.id} 
                style={styles.birthdayCard}
                onPress={() => handleBirthdayClick(birthday)}
              >
                <View style={[
                  styles.ageBadge,
                  // Consider different colors based on relationship or type
                  index % 2 === 0 ? styles.ageBadgePurple : styles.ageBadgePurple // Keeping same color for now
                ]}>
                  <Text style={styles.ageText}>{age}</Text>
                </View>
                <View style={styles.birthdayInfo}>
                  <Text style={styles.name}>{birthday.name}</Text>
                  {/* Use date-fns format for consistent date display */}
                  <Text style={styles.date}>{format(birthDate, 'dd.MM.yyyy')}</Text>
                </View>
                <View style={styles.avatarContainer}>
                  {/* Use birthday.avatarUrl or imageUrl if available, fallback to mock */}
                  <Image 
                    source={{ uri: birthday.avatarUrl || birthday.imageUrl || `https://i.pravatar.cc/100?img=${parseInt(birthday.id) % 70}` }}
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
    gap: 8, // Using gap for spacing is a modern approach in RN
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
    // Consider adding underline or different style for a link
  },
  birthdaysList: {
    gap: 12, // Using gap for spacing
  },
  birthdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden', // Ensures avatar respects border radius
    // Add elevation/shadow for depth
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
    // Make it circular
    borderRadius: 20,
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
    borderRadius: 32, // Make avatar container circular
    overflow: 'hidden', // Clip the image to the circular container
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