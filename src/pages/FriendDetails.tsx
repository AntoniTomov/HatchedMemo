import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { formatDate } from '../utils/dateUtils';
import ChildStats from '../components/child/ChildStats';
import ChildDetailsComponent from '../components/child/ChildDetails';
import NotesAndActions from '../components/child/NotesAndActions';
import { Ionicons } from '@expo/vector-icons';
import { calculateAge, getDaysUntilBirthday } from '../utils/dataUtils';
import { Child } from '../hooks/useChildren';

interface Friend {
  id: string;
  name: string;
  children: Child[];
}

const FriendDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Access id and childId from route params
  const { id, childId } = route.params as { id: string; childId?: string };
  const [friend, setFriend] = useState<Friend | null>(null);
  const [expandedChildId, setExpandedChildId] = useState<string | undefined>(childId);

  useEffect(() => {
    if (childId) {
      setExpandedChildId(childId);
    }
  }, [childId]);

  // Mock data - in a real app, this would come from an API or context
  useEffect(() => {
    const mockFriends = [
      {
        id: '1',
        name: 'Mirena Atanasova',
        children: [
          {
            id: '101',
            name: 'Esen',
            fullName: 'Esen Emilova Doceva',
            birthDate: '2020-09-21',
            avatarUrl: '/lovable-uploads/3b2b05db-58e5-428d-9bb2-ad5bbb5c9f4f.png',
          },
          {
            id: '102',
            name: 'Kai',
            fullName: 'Kai Docev',
            birthDate: '2016-08-12',
            avatarUrl: '',
          }
        ]
      },
      {
        id: '2',
        name: 'Marin Mitev',
        children: [
          {
            id: '201',
            name: 'Ivana',
            fullName: 'Ivana Miteva',
            birthDate: '2020-06-01',
            avatarUrl: '',
          }
        ]
      }
    ];

    const foundFriend = mockFriends.find(f => f.id === id);
    setFriend(foundFriend || null);
  }, [id]);

  if (!friend) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#8247f5" />
      </View>
    );
  }

  const handleChildPress = (childId: string) => {
    setExpandedChildId(expandedChildId === childId ? undefined : childId);
  };

  const getRandomColor = (id: string) => {
    const colors = ['#8247f5', '#3B82F6', '#10B981', '#EC4899', '#6366F1'];
    const index = parseInt(id, 10) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getZodiacSign = (birthDate: string) => {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{friend.name}'s Kids</Text>
        <View style={styles.backButtonPlaceholder} />{/* Placeholder to balance header */}
      </View>

      <ScrollView style={styles.content}>
        {friend.children.map((child) => {
          const daysLeft = getDaysUntilBirthday(child.birthDate);
          const age = calculateAge(child.birthDate);
          const zodiacSign = getZodiacSign(child.birthDate);
          const fullName = child.fullName || `${child.name} ${friend.name.split(' ')[1]}`;
          const wishes = ['Barbie Doll', 'Bike', 'Teddy bear']; // Example wishes

          const isExpanded = child.id === expandedChildId;

          return (
            <View key={child.id} style={styles.card}>
              <TouchableOpacity onPress={() => handleChildPress(child.id)} style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  {child.avatarUrl ? (
                    <Image source={{ uri: child.avatarUrl }} style={styles.avatar} />
                  ) : (
                    <View style={[styles.avatar, { backgroundColor: getRandomColor(child.id) }]}>
                      <Text style={styles.avatarText}>{getInitials(child.name)}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.headerInfo}>
                  <Text style={styles.headerTitleSmall}>{child.name} Birthday</Text>
                  <Text style={styles.headerDate}>{formatDate(child.birthDate)}</Text>
                </View>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.cardContent}>
                  <ChildStats
                    daysLeft={daysLeft}
                    wishesCount={wishes.length}
                  />

                  <ChildDetailsComponent
                    fullName={fullName}
                    zodiacSign={zodiacSign}
                    parents={[{ id: friend.id, name: friend.name }]}
                    wishes={wishes}
                    age={age}
                    daysLeft={daysLeft}
                  />

                  <NotesAndActions
                    initialNotes="Doll, clothes, bike"
                    childId={child.id}
                    wishes={wishes}
                  />
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 24,
  }, // Placeholder to balance the header
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden', // Ensures content respects border radius
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitleSmall: {
    fontSize: 16,
    fontWeight: '500',
  },
  headerDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardContent: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default FriendDetails; 