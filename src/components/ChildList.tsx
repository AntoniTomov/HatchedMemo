import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Sheet } from './ui/sheet';
import ChildForm from './ChildForm';
import { useChildren, Child } from '../hooks/useChildren';
import { format } from 'date-fns';

interface ChildListProps {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const ChildList: React.FC<ChildListProps> = ({ 
  drawerOpen,
  setDrawerOpen
}) => {
  const { children, loading } = useChildren();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatBirthDate = (dateString: string) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#8247f5" />
      </View>
    );
  }

  if (children.length > 0) {
    return (
      <View style={styles.container}>
        {children.map((child: Child) => {
          const age = calculateAge(child.birth_date);
          return (
            <TouchableOpacity 
              key={child.id}
              onPress={() => navigation.navigate('ChildDetails', { childId: child.id, title: child.name })}
              style={styles.childCard}
            >
              <View style={styles.childInfo}>
                <View style={styles.ageBadge}>
                  <Text style={styles.ageText}>{age}</Text>
                </View>
                <View style={styles.childDetails}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.birthDate}>{formatBirthDate(child.birth_date)}</Text>
                </View>
              </View>
              <View style={styles.avatarContainer}>
                {child.avatar_url ? (
                  <Image 
                    source={{ uri: child.avatar_url }} 
                    style={styles.avatar}
                  />
                ) : (
                  <Image 
                    source={{ uri: `https://i.pravatar.cc/100?img=${parseInt(child.id.slice(-2)) % 70}` }} 
                    style={styles.avatar}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        
        <Sheet
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          side="bottom"
        >
          <ChildForm onClose={() => setDrawerOpen(false)} />
        </Sheet>
      </View>
    );
  }
  
  return (
    <Sheet
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
      side="bottom"
    >
      <ChildForm onClose={() => setDrawerOpen(false)} />
    </Sheet>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  loadingContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ageBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#8247f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ageText: {
    color: 'white',
    fontWeight: '500',
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  birthDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});

export default ChildList; 