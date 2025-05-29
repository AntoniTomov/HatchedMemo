import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

interface ChildHeaderProps {
  title: string;
}

const ChildHeader: React.FC<ChildHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          <TouchableOpacity 
            onPress={handleGoBack}
            style={styles.iconButton}
          >
            <Icon name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="refresh-cw" size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="calendar" size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="more-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9333ea', // purple-600
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ChildHeader; 