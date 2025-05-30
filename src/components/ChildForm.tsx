import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Calendar } from './ui/Calendar';
import { format, parse, isValid } from 'date-fns';
import { useChildren, Child } from '../hooks/useChildren';

interface ChildFormProps {
  onAddChild?: (child: Child) => void;
  onClose: () => void;
}

const ChildForm: React.FC<ChildFormProps> = ({ onAddChild, onClose }) => {
  const { addChild } = useChildren();
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState<Date | undefined>(undefined);
  const [childGender, setChildGender] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    birthDate: false,
    gender: false
  });

  const formatDateInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (numbers.length > 0) { formattedValue += numbers.substring(0, 2); }
    if (numbers.length >= 3) { formattedValue += '-' + numbers.substring(2, 4); }
    if (numbers.length >= 5) { formattedValue += '-' + numbers.substring(4, 8); }

    return formattedValue;
  };

  const handleDateInputChange = (value: string) => {
    const formattedValue = formatDateInput(value);
    setDateInput(formattedValue);

    if (formattedValue.length === 10) {
      const parsedDate = parse(formattedValue, 'dd-MM-yyyy', new Date());
      if (isValid(parsedDate)) {
        setChildBirthDate(parsedDate);
        if (errors.birthDate) {
          setErrors(prev => ({ ...prev, birthDate: false }));
        }
      } else {
        setErrors(prev => ({ ...prev, birthDate: true }));
      }
    } else {
      if (errors.birthDate) {
        setErrors(prev => ({ ...prev, birthDate: false }));
      }
      setChildBirthDate(undefined);
    }
  };

  const handleDateSelect = (date: { dateString: string }) => {
    const parsedDate = parse(date.dateString, 'yyyy-MM-dd', new Date());
    if (isValid(parsedDate)) {
      setChildBirthDate(parsedDate);
      setDateInput(format(parsedDate, 'dd-MM-yyyy'));
      setErrors(prev => ({ ...prev, birthDate: false }));
    } else {
      console.error('Invalid date selected from calendar:', date);
      Alert.alert('Error', 'Selected date is invalid.');
    }
    setShowCalendar(false);
  };

  const validateForm = () => {
    const newErrors = {
      name: !childName.trim(),
      birthDate: !dateInput || dateInput.length !== 10 || !isValid(parse(dateInput, 'dd-MM-yyyy', new Date())),
      gender: !childGender
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleAddChild = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields correctly.');
      return;
    }

    try {
      setIsSubmitting(true);

      const childData: Omit<Child, 'id'> = {
        name: childName.trim(),
        birthDate: format(childBirthDate!, 'yyyy-MM-dd'),
        gender: childGender,
      };

      await addChild(childData);

      if (onAddChild) {
        // Note: addChild in useChildren hook currently returns void.
        // If the parent needs the new child data, the useChildren hook
        // or parent component logic might need adjustment (e.g., refetching).
        // For now, we call onAddChild with undefined or handle it differently if needed.
        // onAddChild(newChild); // This will cause type error as addChild returns void
        // If the parent just needs to know *that* a child was added, call without argument:
        // onAddChild();
      }

      setChildName('');
      setChildBirthDate(undefined);
      setChildGender('');
      setDateInput('');
      setErrors({ name: false, birthDate: false, gender: false });

      onClose();

    } catch (error: any) {
      console.error('Error adding child:', error);
      Alert.alert('Error', error.message || 'Failed to add child.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.handle} />
      </View>
      
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Label>
            Full Name <Text style={styles.required}>*</Text>
          </Label>
          <Input
            value={childName}
            onChangeText={(value) => {
              setChildName(value);
              if (errors.name && value.trim()) {
                setErrors(prev => ({ ...prev, name: false }));
              }
            }}
            placeholder="Enter child's name"
            style={[styles.input, errors.name && styles.inputError].filter(Boolean) as any}
          />
          {errors.name && <Text style={styles.errorText}>Full Name is required.</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Label>
            Birthday <Text style={styles.required}>*</Text>
          </Label>
          <View style={styles.dateInputContainer}>
            <Input
              value={dateInput}
              onChangeText={handleDateInputChange}
              placeholder="dd-MM-yyyy"
              style={[styles.dateInput, errors.birthDate && styles.inputError].filter(Boolean) as any}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => setShowCalendar(true)}
            >
              <Text style={styles.calendarButtonText}>📅</Text>
            </TouchableOpacity>
          </View>
          
          {showCalendar && (
            <Calendar
              selected={childBirthDate ? format(childBirthDate, 'yyyy-MM-dd') : undefined}
              onDayPress={handleDateSelect}
              fromDate={new Date(1900, 0, 1)}
              toDate={new Date()}
            />
          )}
          {errors.birthDate && <Text style={styles.errorText}>Valid Birthday (dd-MM-yyyy) is required.</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <Label>
            Gender <Text style={styles.required}>*</Text>
          </Label>
          <Select
            value={childGender}
            onValueChange={(value) => {
              setChildGender(value);
              if (errors.gender && value) {
                setErrors(prev => ({ ...prev, gender: false }));
              }
            }}
            items={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ]}
          />
          {errors.gender && <Text style={styles.errorText}>Gender is required.</Text>}
        </View>
        
        <View style={styles.buttonGroup}>
          <Button
            onPress={handleAddChild}
            disabled={isSubmitting}
            style={[styles.button, styles.addButton].filter(Boolean) as any}
          >
            <Text style={styles.buttonText}>{isSubmitting ? 'Adding...' : 'Add kid'}</Text>
          </Button>
          <Button
            onPress={onClose}
            disabled={isSubmitting}
            variant="outline"
            style={[styles.button, styles.closeButton].filter(Boolean) as any}
          >
            <Text style={[styles.buttonText, styles.closeButtonText]}>Cancel</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: 'white',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: 'white',
  },
  calendarButton: {
    padding: 10,
  },
  calendarButtonText: {
    fontSize: 24,
  },
  select: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  buttonGroup: {
    marginTop: 20,
    gap: 15,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#8247f5',
  },
  closeButton: {
    borderColor: '#8247f5',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  closeButtonText: {
    color: '#8247f5',
  },
});

export default ChildForm; 