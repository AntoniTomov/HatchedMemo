import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useBirthday } from '../contexts/BirthdayContext';
import { useToast } from '../hooks/useToast';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import Header from '../components/Header';

type AddBirthdayNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddBirthday'>;

export const AddBirthday = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [relationship, setRelationship] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const navigation = useNavigation<AddBirthdayNavigationProp>();
  const { addBirthday } = useBirthday();
  const { showToast } = useToast();

  const handleSubmit = async () => {
    try {
      if (!name || !date || !relationship) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      await addBirthday({
        name,
        date,
        relationship,
        avatarUrl: avatarUrl || undefined,
      });

      showToast('Birthday contact added successfully', 'success');
      navigation.goBack();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to add birthday contact', 'error');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header title="Add Birthday" showBackButton />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Label>Name *</Label>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Label>Birth Date *</Label>
            <Input
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Label>Relationship *</Label>
            <Input
              value={relationship}
              onChangeText={setRelationship}
              placeholder="Enter relationship"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Label>Avatar URL (optional)</Label>
            <Input
              value={avatarUrl}
              onChangeText={setAvatarUrl}
              placeholder="Enter avatar URL"
              autoCapitalize="none"
            />
          </View>

          <Button onPress={handleSubmit} style={styles.submitButton}>
            Add Birthday Contact
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  submitButton: {
    marginTop: 8,
  },
}); 