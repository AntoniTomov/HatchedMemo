import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBirthday } from '../contexts/BirthdayContext'; // Changed from @/contexts
import { useAuth } from '../contexts/AuthContext'; // Changed from @/contexts
import ChildList from '../components/ChildList'; // Changed from @/components
// Assuming Header and BottomNav are migrated or replaced
// import Header from '@/components/Header';
// import BottomNav from '@/components/BottomNav';
// Assuming icons are replaced with a library like react-native-vector-icons or @expo/vector-icons
import { Ionicons } from '@expo/vector-icons';

// Define types for user and profile based on usage
interface BirthdayUser {
  name: string;
  isOnboarded: boolean;
  avatarUrl?: string;
  hasChildren: boolean;
  children: any[]; // Define a proper type for children if possible
}

interface AuthProfile {
    full_name?: string;
    avatar_url?: string;
    // Add other profile properties
}

interface AuthUser {
    email?: string;
    // Add other auth user properties
}

const Profile: React.FC = () => {
  const { user, setUser } = useBirthday() as { user: BirthdayUser, setUser: (user: BirthdayUser) => void }; // Assuming useBirthday return types
  const { profile, user: authUser, signOut } = useAuth() as { profile: AuthProfile | null, user: AuthUser | null, signOut: () => Promise<void> }; // Assuming useAuth return types
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);

  const displayName = profile?.full_name || authUser?.email || user?.name || 'User';
  const avatarUrl = profile?.avatar_url || user?.avatarUrl;

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Replace 'Auth' with your actual authentication route name
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Sign Out Error', 'Failed to sign out. Please try again.');
    }
  };

  const toggleNotifications = () => {
    setPushNotifications(previousState => !previousState);
    // Here you would typically save this preference to the user's profile in your backend/storage
    // Example: updateUserPreference({ pushNotifications: !pushNotifications });
  };

  return (
    <View style={styles.container}>
      {/* Header - need to implement or migrate a React Native Header component */}
       <View style={styles.headerPlaceholder}>
          <Text style={styles.headerTitle}>Profile</Text>
       </View>
      
      <ScrollView style={styles.content}>
        {/* Profile section */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfoRow}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarFallback]}>
                  <Text style={styles.avatarText}>{getInitials(displayName)}</Text>
                </View>
              )}
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.displayName}>{displayName}</Text>
              {authUser?.email && <Text style={styles.emailText}>{authUser.email}</Text>}
            </View>
            {/* Edit Profile Button - Placeholder */}
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#4B5563" />{/* Equivalent to gray-600 */}
            </TouchableOpacity>
          </View>
        </View>
        
        {/* My Kids section */}
        {/* Assuming ChildList component is migrated to React Native */}
        {user?.hasChildren && user.children.length > 0 && (
             <View style={styles.myKidsCard}>
                <Text style={styles.sectionTitle}>My Kids</Text>
                 {/* Pass children data and handlers to ChildList */}
                 {/* Assuming ChildList handles its own open/close state or receives it via props */}
                <ChildList children={user.children} />
             </View>
        )}

        {/* Notification settings */}
        <View style={styles.notificationsCard}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationItemLeft}>
              <Ionicons name="notifications" size={20} color="#8247f5" />{/* Equivalent to text-[#8247f5] */}
              <Text style={styles.notificationLabel}>Push notifications</Text>
            </View>
            {/* RN Switch component */}
             <Switch 
               value={pushNotifications}
               onValueChange={toggleNotifications}
               thumbColor={pushNotifications ? '#FFFFFF' : '#F3F4F6'} // Example colors
               trackColor={{ false: '#E5E7EB', true: '#8247f5' }} // Example colors
             />
          </View>
        </View>
        
        {/* Logout button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* BottomNav - need to implement or migrate a React Native BottomNav component */}
      {/* <BottomNav /> */}
       {/* Placeholder if BottomNav is not yet migrated */}
       <View style={styles.bottomNavPlaceholder}>
           <Text style={styles.bottomNavText}>Bottom Navigation</Text>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Equivalent to bg-gray-50
  },
   headerPlaceholder: { // Placeholder style for the header
       padding: 16,
       backgroundColor: '#FFFFFF',
       borderBottomWidth: 1,
       borderBottomColor: '#E5E7EB',
       alignItems: 'center',
   },
    headerTitle: {
       fontSize: 20,
       fontWeight: '600',
    },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 24,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    marginRight: 12, // Equivalent to gap-3 (adjust as needed)
  },
  avatar: {
    height: 64, // Equivalent to h-16
    width: 64, // Equivalent to w-16
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF', // Equivalent to border-white
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallback: {
    backgroundColor: '#8247f5', // Equivalent to bg-[#8247f5]
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18, // Equivalent to text-lg
    fontWeight: '500',
  },
  profileDetails: {
    flex: 1, // Allows details to take up remaining space
  },
  displayName: {
    fontWeight: '500',
    fontSize: 16, // Equivalent to text-lg
  },
  emailText: {
    fontSize: 14, // Equivalent to text-sm
    color: '#6B7280', // Equivalent to text-gray-500
  },
  editButton: {
    padding: 8, // Equivalent to p-2
    borderRadius: 20, // Equivalent to rounded-full (adjust as needed)
  },
  myKidsCard: {
     backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16, // Adjust as needed for spacing
  },
  notificationsCard: {
     backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 24,
  },
  notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 4, // Equivalent to py-1
  },
   notificationItemLeft: {
       flexDirection: 'row',
       alignItems: 'center',
       marginRight: 12, // Equivalent to space-x-3
   },
    notificationLabel: {
        fontSize: 14, // Equivalent to text-sm
        color: '#374151', // Equivalent to gray-700
        marginLeft: 8, // Adjust spacing between icon and text
    },
  logoutButton: {
    width: '100%',
    backgroundColor: '#FFFFFF', // Equivalent to bg-white
    borderColor: '#D1D5DB', // Equivalent to border-gray-300
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#374151', // Equivalent to text-gray-700
    fontWeight: '500',
  },
   bottomNavPlaceholder: { // Placeholder style for BottomNav
       height: 60, // Example height
       backgroundColor: '#E5E7EB', // Placeholder background
       justifyContent: 'center',
       alignItems: 'center',
       position: 'absolute', // Position at the bottom
       bottom: 0,
       left: 0,
       right: 0,
   },
    bottomNavText: {
        color: '#4B5563',
    }
});

export default Profile; 