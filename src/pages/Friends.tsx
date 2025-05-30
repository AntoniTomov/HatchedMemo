import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useFriends, Friend } from '../hooks/useFriends';
import { Child } from '../hooks/useChildren';

const Friends: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    friends,
    loading
  } = useFriends(); // Updated destructuring

  const navigation = useNavigation();
  
  const formatBirthDate = (dateString: string) => {
    // Ensure dateString is valid before formatting
    try {
      return format(new Date(dateString), 'dd.MM.yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  const getRandomColor = (id: string) => {
    const colors = ['#8247f5', '#3B82F6', '#10B981', '#EC4899', '#6366F1'];
    const index = parseInt(id, 10) % colors.length;
    return colors[index];
  };

  // Group children by their parents (Friend object already contains children)
  const friendsWithChildren = friends.map(friend => ({
    ...friend,
    children: (friend.children || []) // Directly use the children array from the friend object
  })).filter(friend => (friend.children || []).length > 0);

  // Filter friends based on search term
  const filteredFriendsWithChildren = friendsWithChildren.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Use friend.name
    (friend.children || []).some((child: Child) => child.name.toLowerCase().includes(searchTerm.toLowerCase())) // Add type annotation
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#8247f5" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
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
        
        <View style={styles.friendsListContainer}>
          {filteredFriendsWithChildren.map((friend) => (
            <View key={friend.id} style={styles.friendEntry}>
              <Text style={styles.friendName}>{friend.name}</Text>
              
              <View style={styles.childrenListContainer}>
                {(friend.children || []).map((child: Child) => (
                  <TouchableOpacity 
                    key={child.id}
                    style={styles.childCard}
                    onPress={() => navigation.navigate('FriendDetails', { id: child.id })}
                  >
                    <View style={styles.avatarContainer}>
                      {child.avatarUrl ? (
                        <Image source={{ uri: child.avatarUrl }} style={styles.avatar} />
                      ) : (
                        <View style={[styles.avatar, { backgroundColor: getRandomColor(child.id) }]}>
                          <Text style={styles.avatarText}>{getInitials(child.name)}</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.childInfo}>
                      <Text style={styles.childName}>{child.name}</Text>
                      <Text style={styles.childBirthDate}>{formatBirthDate(child.birthDate)}</Text>
                    </View>
                    <View style={styles.giftIconContainer}>
                      <Text style={styles.giftIcon}>🎁</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {filteredFriendsWithChildren.length === 0 && (searchTerm) ? (
            <Text style={styles.emptyText}>No friends with children match your search.</Text>
          ) : filteredFriendsWithChildren.length === 0 && (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyText}>No friends with children yet.</Text>
              <Text style={styles.emptyTextSmall}>Send friend requests to see their children's birthdays!</Text>
            </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 8,
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
  friendsListContainer: {
    marginBottom: 24,
  },
  friendEntry: {
    marginBottom: 16,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  childrenListContainer: {
    // space-y-3 equivalent
  },
  childCard: {
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
  avatarContainer: {
    // No specific styles needed unless different from avatar
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8247F5', // Default fallback color
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  childInfo: {
    flex: 1,
    marginLeft: 12,
  },
  childName: {
    fontWeight: '500',
  },
  childBirthDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  giftIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftIcon: {
    fontSize: 20,
  },
  emptyStateContainer: {
    textAlign: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
  },
  emptyTextSmall: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
    marginTop: 8,
  },
});

export default Friends; 