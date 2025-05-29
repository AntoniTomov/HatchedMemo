import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, Calendar, Plus, Users, User } from 'lucide-react-native';
import { Sheet } from './ui/sheet';
import AddBirthdayForm from './AddBirthdayForm';

const BottomNav: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const isActive = (path: string) => {
    return route.name === path;
  };

  const navItems = [
    {
      name: 'Home',
      path: 'Home',
      icon: Home,
    },
    {
      name: 'Birthdays',
      path: 'Birthdays',
      icon: Calendar,
    },
    {
      name: 'Add',
      path: '#',
      icon: Plus,
      isSheetTrigger: true
    },
    {
      name: 'Friends',
      path: 'Friends',
      icon: Users,
    },
    {
      name: 'Profile',
      path: 'Profile',
      icon: User,
    }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {navItems.map((item) => (
          item.isSheetTrigger ? (
            <TouchableOpacity
              key={item.name}
              onPress={() => setSheetOpen(true)}
              style={styles.navItem}
            >
              <item.icon
                size={20}
                color={isActive(item.path) ? '#8247f5' : '#6b7280'}
              />
              <Text style={[
                styles.navText,
                isActive(item.path) && styles.navTextActive
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={item.name}
              onPress={() => navigation.navigate(item.path)}
              style={styles.navItem}
            >
              <item.icon
                size={20}
                color={isActive(item.path) ? '#8247f5' : '#6b7280'}
              />
              <Text style={[
                styles.navText,
                isActive(item.path) && styles.navTextActive
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        ))}
      </View>

      <Sheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        side="bottom"
      >
        <AddBirthdayForm onClose={() => setSheetOpen(false)} />
      </Sheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
    padding: 4,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  navTextActive: {
    color: '#8247f5',
  },
});

export default BottomNav; 