import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Calendar } from './ui/Calendar';
import { format } from 'date-fns';
import { useToast } from '../hooks/useToast';

interface AddBirthdayFormProps {
  onClose: () => void;
}

const AddBirthdayForm: React.FC<AddBirthdayFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [relationship, setRelationship] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  
  const { showToast } = useToast();
  
  const handleSubmit = () => {
    if (name.trim() === '') {
      showToast({
        title: "Name required",
        description: "Please enter a name for this contact",
        variant: "destructive"
      } as any);
      return;
    }
    
    if (!date) {
      showToast({
        title: "Date required",
        description: "Please select a birth date",
        variant: "destructive"
      } as any);
      return;
    }
    
    const randomAvatarId = Math.floor(Math.random() * 70);
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // TODO: Implement addBirthday function
    // addBirthday({
    //   name,
    //   date: formattedDate,
    //   relationship,
    //   avatarUrl: `https://i.pravatar.cc/150?img=${randomAvatarId}`
    // });
    
    showToast({
      title: "Birthday added",
      description: `You'll be reminded of ${name}'s birthday!`
    } as any);
    
    onClose();
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.handle} />
        <Text style={styles.title}>Add Birthday</Text>
      </View>
      
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Label>Name</Label>
          <Input
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Label>Birth Date</Label>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.dateButtonText}>
              {date ? format(date, "PPP") : "Pick a date"}
            </Text>
          </TouchableOpacity>
          
          {showCalendar && (
            <Calendar
              selected={date ? format(date, 'yyyy-MM-dd') : undefined}
              onDayPress={(day: { dateString: string }) => {
                setDate(new Date(day.dateString));
                setShowCalendar(false);
              }}
            />
          )}
        </View>
        
        <View style={styles.inputGroup}>
          <Label>Relationship</Label>
          <Select
            value={relationship}
            onValueChange={setRelationship}
            items={[
              { label: 'Family', value: 'Family' },
              { label: 'Friend', value: 'Friend' },
              { label: 'Co-worker', value: 'Co-worker' },
              { label: 'Other', value: 'Other' },
            ]}
          />
        </View>
        
        <View style={styles.buttonGroup}>
          <Button
            onPress={handleSubmit}
            style={{ ...styles.button, ...styles.saveButton }}
          >
            Save Birthday
          </Button>
          <Button
            onPress={onClose}
            variant="outline"
            style={{ ...styles.button, ...styles.cancelButton }}
          >
            Cancel
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  handle: {
    width: 64,
    height: 4,
    backgroundColor: '#8247f5',
    borderRadius: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  dateButtonText: {
    color: '#6b7280',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#8247f5',
  },
  cancelButton: {
    borderColor: '#e5e7eb',
  },
});

export default AddBirthdayForm; 