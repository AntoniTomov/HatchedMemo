import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '../types/navigation';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Mock data - in a real app, this would come from your data source
  const children = [
    {
      id: '1',
      name: 'John Doe',
      birthDate: '2010-05-15',
      daysLeft: 30,
    },
    {
      id: '2',
      name: 'Jane Smith',
      birthDate: '2012-08-20',
      daysLeft: 45,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Birthday Calendar</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings" size={24} color="#9333ea" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {children.length > 0 ? (
          children.map(child => (
            <TouchableOpacity
              key={child.id}
              style={styles.childCard}
              onPress={() => navigation.navigate('ChildDetails', {
                childId: child.id,
                title: `${child.name}'s Birthday`
              })}
            >
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.daysLeft}>
                  {child.daysLeft} days until birthday
                </Text>
              </View>
              <Icon name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No birthdays added yet</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('AddChild')}
            >
              <Icon name="plus" size={24} color="white" />
              <Text style={styles.addButtonText}>Add Birthday</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9333ea',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  daysLeft: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default HomeScreen; 