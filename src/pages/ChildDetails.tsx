import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDaysUntilBirthday, calculateAge, formatDate } from '../utils/dataUtils';
import { useChildren, Child } from '../hooks/useChildren';
import ChildStats from '../components/child/ChildStats';
import ChildDetailsComponent from '../components/child/ChildDetails';
import NotesAndActions from '../components/child/NotesAndActions';
import { Ionicons } from '@expo/vector-icons';

// Define a type for the child object based on its usage
// interface Child {
//   id: string;
//   name: string;
//   birth_date: string;
//   avatar_url?: string;
//   // Add other properties if they exist in the actual data structure
// }

const ChildDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Access the id from the route params
  const { id } = route.params as { id: string };
  // Assuming useChildren returns an object with a children array of type Child[] and a loading boolean
  const { children, loading } = useChildren();
  const [openItemId, setOpenItemId] = useState<string | undefined>(id || undefined);

  useEffect(() => {
    console.log("Route param child ID:", id);
    setOpenItemId(id || undefined);
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#8247f5" />
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text>No children found</Text>
      </View>
    );
  }

  console.log("Current children:", children.map((c: Child) => ({ id: c.id, name: c.name })));
  console.log("Current open item ID:", openItemId);

  const handleItemPress = (childId: string) => {
    console.log("Item pressed with ID:", childId);
    if (childId === openItemId) {
      console.log("Collapsing current item");
      setOpenItemId(undefined);
    } else {
      console.log("Expanding item:", childId);
      setOpenItemId(childId);
    }
  };

  const getRandomColor = (childId: string) => {
    const colors = ['#8247f5', '#3B82F6', '#10B981', '#EC4899', '#6366F1'];
    const index = parseInt(childId, 10) % colors.length;
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
        <Text style={styles.headerTitle}>My Kids</Text>
        <View style={styles.backButtonPlaceholder} />{/* Placeholder to balance header */}
      </View>

      <ScrollView style={styles.content}>
        {children.map((child: Child) => {
          const birthDateFormatted = formatDate(child.birthDate);
          const daysLeft = getDaysUntilBirthday(child.birthDate);
          const age = calculateAge(child.birthDate);
          const zodiacSign = getZodiacSign(child.birthDate);
          const fullName = child.name;
          const wishes = ['Barbie Doll', 'Bike', 'Teddy bear']; // Example wishes

          const isExpanded = child.id === openItemId;

          return (
            <View key={child.id} style={styles.card}>
              <TouchableOpacity onPress={() => handleItemPress(child.id)} style={styles.cardHeader}>
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
                  <Text style={styles.headerDate}>{birthDateFormatted}</Text>
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
                    parents={[]} // Assuming parents are not available in this data structure
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
  emptyContainer: {
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
    width: 40,
  }, // To balance the back button
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

export default ChildDetails; 