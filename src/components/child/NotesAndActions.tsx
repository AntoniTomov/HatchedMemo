import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Linking, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import Icon from 'react-native-vector-icons/Feather';

interface NotesAndActionsProps {
  initialNotes?: string;
  childId?: string;
  wishes?: string[];
  onSave?: (notes: string, notificationPreference: string) => void;
}

const NotesAndActions: React.FC<NotesAndActionsProps> = ({
  initialNotes = '',
  childId,
  wishes = [],
  onSave,
}) => {
  const [notesInput, setNotesInput] = useState(initialNotes);
  const [notificationOption, setNotificationOption] = useState('yes');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [giftIdeas, setGiftIdeas] = useState<string[]>([]);

  useEffect(() => {
    setNotesInput(initialNotes);
  }, [initialNotes]);

  const handlePublish = () => {
    if (onSave) {
      onSave(notesInput, notificationOption);
    }
  };

  const handleFindGift = () => {
    const parsedGiftIdeas = notesInput
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .slice(0, 5);

    if (parsedGiftIdeas.length === 0) {
      // You might want to add a toast notification here
      return;
    }

    setGiftIdeas(parsedGiftIdeas);
    setIsModalVisible(true);
  };

  const handleGiftSearch = async (selectedGiftIdea: string) => {
    const searchQuery = encodeURIComponent(`${selectedGiftIdea} kids gift`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
    
    try {
      const supported = await Linking.canOpenURL(searchUrl);
      if (supported) {
        await Linking.openURL(searchUrl);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
    
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notes/Gift Ideas</Text>
      <TextInput
        value={notesInput}
        onChangeText={setNotesInput}
        placeholder="Add notes or gift ideas (separate with commas)..."
        multiline
        numberOfLines={4}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={notificationOption}
          onValueChange={setNotificationOption}
          style={styles.picker}
        >
          <Picker.Item label="Yes, notify me" value="yes" />
          <Picker.Item label="No, don't notify me" value="no" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handlePublish}
          style={styles.button}
        >
          Publish
        </Button>
        <Button
          onPress={handleFindGift}
          variant="outline"
          icon="gift"
          style={styles.button}
        >
          Find gift
        </Button>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose a gift idea to search for</Text>
              <Text style={styles.modalDescription}>
                Select which gift idea you'd like to search for on Google.
              </Text>
            </View>

            <ScrollView style={styles.giftIdeasList}>
              {giftIdeas.map((idea, index) => (
                <Button
                  key={index}
                  onPress={() => handleGiftSearch(idea)}
                  variant="outline"
                  style={styles.giftIdeaButton}
                >
                  {idea}
                </Button>
              ))}
            </ScrollView>

            <Button
              onPress={() => setIsModalVisible(false)}
              variant="outline"
              style={styles.closeButton}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  label: {
    color: '#4b5563',
    marginBottom: 8,
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalDescription: {
    color: '#4b5563',
    fontSize: 14,
  },
  giftIdeasList: {
    marginBottom: 20,
  },
  giftIdeaButton: {
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 8,
  },
});

export default NotesAndActions; 