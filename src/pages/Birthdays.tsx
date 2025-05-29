import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, addYears } from 'date-fns';
import { useChildren } from '@/hooks/useChildren';
import { useFriends } from '@/hooks/useFriends';
import { formatDate } from '@/utils/dateUtils';
import { Ionicons } from '@expo/vector-icons';

const Birthdays: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { children } = useChildren();
  const { friendsChildren } = useFriends();
  const navigation = useNavigation();

  // Function to get days until next birthday
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    
    let nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    
    if (today > nextBirthday) {
      nextBirthday = addYears(nextBirthday, 1);
    }
    
    const diffTime = nextBirthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const isBirthdayToday = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    
    return today.getDate() === birthDate.getDate() && 
           today.getMonth() === birthDate.getMonth();
  };

  const allBirthdays = [
    ...children.map(child => ({
      id: child.id,
      name: child.name,
      birth_date: child.birth_date,
      avatar_url: child.avatar_url,
      user_id: child.user_id,
      parent_name: 'You',
      isOwnChild: true
    })),
    ...friendsChildren.map(child => ({
      id: child.id,
      name: child.name,
      birth_date: child.birth_date,
      avatar_url: child.avatar_url,
      user_id: child.user_id,
      parent_name: child.parent_name,
      isOwnChild: false
    }))
  ];

  const filteredBirthdays = allBirthdays.filter(
    birthday => birthday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentBirthdays = filteredBirthdays.slice(0, 5);
  
  const todayBirthdays = filteredBirthdays.filter(birthday => 
    isBirthdayToday(birthday.birth_date)
  );
  
  const soonBirthdays = filteredBirthdays
    .filter(birthday => {
      const daysLeft = getDaysUntil(birthday.birth_date);
      return daysLeft > 0 && daysLeft <= 14 && !isBirthdayToday(birthday.birth_date);
    })
    .sort((a, b) => getDaysUntil(a.birth_date) - getDaysUntil(b.birth_date));

  const renderAvatar = (birthday: any) => {
    if (birthday.avatar_url) {
      return (
        <Image
          source={{ uri: birthday.avatar_url }}
          style={styles.avatar}
        />
      );
    }
    return (
      <View style={[styles.avatar, styles.avatarFallback]}>
        <Text style={styles.avatarText}>
          {birthday.name.substring(0, 2).toUpperCase()}
        </Text>
      </View>
    );
  };

  const navigateToProfile = (birthday: any) => {
    if (birthday.isOwnChild) {
      navigation.navigate('ChildProfile', { id: birthday.id });
    } else {
      navigation.navigate('FriendProfile', { 
        userId: birthday.user_id,
        childId: birthday.id 
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Birthdays</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Recent birthdays */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentContainer}>
            {recentBirthdays.map((birthday) => (
              <TouchableOpacity
                key={birthday.id}
                style={styles.recentCard}
                onPress={() => navigateToProfile(birthday)}
              >
                <Text style={styles.recentName}>{birthday.name}</Text>
                <Text style={styles.recentDate}>{formatDate(birthday.birth_date)}</Text>
              </TouchableOpacity>
            ))}
            {recentBirthdays.length === 0 && (
              <Text style={styles.emptyText}>No recent birthdays</Text>
            )}
          </ScrollView>
        </View>

        {/* Today's birthdays */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {todayBirthdays.length > 0 ? (
            todayBirthdays.map((birthday) => (
              <TouchableOpacity
                key={birthday.id}
                style={styles.birthdayCard}
                onPress={() => navigateToProfile(birthday)}
              >
                {birthday.parent_name && birthday.parent_name !== 'You' && (
                  <Text style={styles.parentName}>{birthday.parent_name}</Text>
                )}
                {renderAvatar(birthday)}
                <View style={styles.birthdayInfo}>
                  <Text style={styles.birthdayName}>{birthday.name}</Text>
                  <Text style={styles.birthdayDate}>{formatDate(birthday.birth_date)}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No birthdays today</Text>
          )}
        </View>

        {/* Soon birthdays */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soon</Text>
          {soonBirthdays.length > 0 ? (
            soonBirthdays.map((birthday) => (
              <TouchableOpacity
                key={birthday.id}
                style={styles.birthdayCard}
                onPress={() => navigateToProfile(birthday)}
              >
                {birthday.parent_name && birthday.parent_name !== 'You' && (
                  <Text style={styles.parentName}>{birthday.parent_name}</Text>
                )}
                {renderAvatar(birthday)}
                <View style={styles.birthdayInfo}>
                  <Text style={styles.birthdayName}>{birthday.name}</Text>
                  <Text style={styles.birthdayDate}>{formatDate(birthday.birth_date)}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No upcoming birthdays</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  recentContainer: {
    flexDirection: 'row',
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentName: {
    fontWeight: '500',
    textAlign: 'center',
  },
  recentDate: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  birthdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarFallback: {
    backgroundColor: '#8247F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  birthdayInfo: {
    flex: 1,
    marginLeft: 12,
  },
  birthdayName: {
    fontWeight: '500',
  },
  birthdayDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  parentName: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    padding: 16,
  },
});

export default Birthdays; 