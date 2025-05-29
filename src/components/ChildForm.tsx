import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Calendar } from './ui/calendar';
import { format, parse, isValid } from 'date-fns';
import { useChildren } from '../hooks/useChildren';

interface ChildFormProps {
  onAddChild?: (child: any) => void;
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
    
    if (numbers.length === 0) return '';
    
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    } else if (numbers.length <= 6) {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2, 4);
      let year = numbers.slice(4);
      
      return `${day}-${month}-${year}`;
    } else {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2, 4);
      let year = numbers.slice(4, 8);
      
      if (year.length === 2) {
        const currentYear = new Date().getFullYear();
        const currentCentury = Math.floor(currentYear / 100) * 100;
        const yearNum = parseInt(year);
        
        if (yearNum > (currentYear % 100)) {
          year = String(currentCentury - 100 + yearNum);
        } else {
          year = String(currentCentury + yearNum);
        }
      }
      
      return `${day}-${month}-${year}`;
    }
  };

  const handleDateInputChange = (value: string) => {
    const formattedValue = formatDateInput(value);
    setDateInput(formattedValue);
    
    if (errors.birthDate) {
      setErrors(prev => ({ ...prev, birthDate: false }));
    }
    
    if (formattedValue.length === 10) {
      const parsedDate = parse(formattedValue, 'dd-MM-yyyy', new Date());
      if (isValid(parsedDate)) {
        setChildBirthDate(parsedDate);
      }
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setChildBirthDate(date);
    if (date) {
      setDateInput(format(date, 'dd-MM-yyyy'));
      setErrors(prev => ({ ...prev, birthDate: false }));
    }
    setShowCalendar(false);
  };

  const validateForm = () => {
    const newErrors = {
      name: !childName.trim(),
      birthDate: !childBirthDate || !dateInput || dateInput.length !== 10,
      gender: !childGender
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleAddChild = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      const childData = {
        name: childName,
        birth_date: format(childBirthDate!, 'yyyy-MM-dd'),
        gender: childGender,
        avatar_url: null
      };

      const newChild = await addChild(childData);
      
      if (onAddChild) {
        onAddChild({
          id: newChild.id,
          name: newChild.name,
          birthDate: format(new Date(newChild.birth_date), 'dd.MM.yyyy'),
          gender: newChild.gender
        });
      }

      // Reset form
      setChildName('');
      setChildBirthDate(undefined);
      setChildGender('');
      setDateInput('');
      setErrors({ name: false, birthDate: false, gender: false });
      
      // Close the form after a short delay
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (error) {
      console.error('Error adding child:', error);
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
            style={[
              styles.input,
              errors.name && styles.inputError
            ]}
          />
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
              style={[
                styles.dateInput,
                errors.birthDate && styles.inputError
              ]}
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
              mode="single"
              selected={childBirthDate}
              onSelect={handleDateSelect}
              initialFocus
              fromDate={new Date(1920, 0, 1)}
              toDate={new Date()}
            />
          )}
        </View>
        
        <View style={styles.inputGroup}>
          <Label>
            Gender <Text style={styles.required}>*</Text>
          </Label>
          <Select
            value={childGender}
            onValueChange={(value) => {
              setChildGender(value);
              if (errors.gender) {
                setErrors(prev => ({ ...prev, gender: false }));
              }
            }}
            items={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ]}
            style={[
              styles.select,
              errors.gender && styles.inputError
            ]}
          />
        </View>
        
        <View style={styles.buttonGroup}>
          <Button
            onPress={handleAddChild}
            disabled={isSubmitting}
            style={[styles.button, styles.addButton]}
          >
            {isSubmitting ? 'Adding...' : 'Add kid'}
          </Button>
          <Button
            onPress={onClose}
            disabled={isSubmitting}
            variant="outline"
            style={[styles.button, styles.closeButton]}
          >
            Close
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
  },
  form: {
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  dateInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  calendarButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  calendarButtonText: {
    fontSize: 20,
  },
  select: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    borderRadius: 24,
  },
  addButton: {
    backgroundColor: '#8247f5',
  },
  closeButton: {
    borderColor: '#e5e7eb',
  },
});

export default ChildForm; 