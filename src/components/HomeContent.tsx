import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import ChildList from './ChildList';
import { useBirthday } from '../contexts/BirthdayContext';
import { useChildren } from '../hooks/useChildren';

interface HomeContentProps {
  onContinue: () => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ onContinue }) => {
  const { user, setUser } = useBirthday();
  const { children } = useChildren();
  const [hasChildren, setHasChildren] = useState<boolean>(user.hasChildren || children.length > 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  useEffect(() => {
    if (children.length > 0) {
      setHasChildren(true);
      setUser({
        ...user,
        hasChildren: true
      });
    }
  }, [children.length]);
  
  const handleToggleChildren = (checked: boolean) => {
    setHasChildren(checked);
    setUser({
      ...user,
      hasChildren: checked
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Do you have kids?</Text>
      </View>
      
      <View style={styles.switchContainer}>
        <Switch 
          checked={hasChildren || children.length > 0}
          onCheckedChange={handleToggleChildren}
          style={styles.switch}
        />
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/egg.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      {(hasChildren || children.length > 0) && (
        <View style={styles.content}>
          <ChildList 
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
          
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          
          <Button 
            onPress={onContinue}
            style={styles.continueButton}
          >
            Continue
          </Button>
        </View>
      )}
      
      {!hasChildren && children.length === 0 && (
        <Button 
          onPress={onContinue}
          style={styles.continueButton}
        >
          Continue
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    gap: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8247f5',
    marginBottom: 8,
  },
  switchContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  switch: {
    backgroundColor: '#f3f4f6',
  },
  imageContainer: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    marginVertical: 24,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    gap: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
  activeDot: {
    backgroundColor: '#8247f5',
  },
  continueButton: {
    backgroundColor: '#8247f5',
    borderRadius: 24,
  },
});

export default HomeContent; 