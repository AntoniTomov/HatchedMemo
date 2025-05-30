import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBirthday } from '../contexts/BirthdayContext'; // Changed from @/contexts
// Assuming useToast hook is adapted for RN or replaced with Alert/Toast library
// import { useToast } from '@/hooks/use-toast'; 
// Assuming these components are replaced with RN equivalents or migrated
// import { Switch } from '@/components/ui/switch';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { CalendarIcon } from 'lucide-react';
// import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { cn } from '@/lib/utils';

import { format } from 'date-fns'; // Assuming date-fns is compatible with RN
import DatePicker from 'react-native-date-picker'; // Example date picker library
import RNPickerSelect from 'react-native-picker-select'; // Example picker library
import Modal from 'react-native-modal'; // Example modal library
// You might need to install these libraries: date-fns react-native-date-picker react-native-picker-select react-native-modal @react-navigation/native @react-navigation/stack

// Define ChildType based on component usage and setUser expectations
interface ChildType { // Reinstate local ChildType
  id: string;
  name: string;
  birthDate: string; // Consider using Date type if DatePicker provides it
  gender: string; // Make gender required string
  daysToBirthday?: number; // This calculation will need to be adapted
  avatarUrl?: string; // Add avatarUrl
  notes?: string; // Add notes
  notificationPreference?: string; // Add notificationPreference
}

const Onboarding: React.FC = () => {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [hasChildren, setHasChildren] = useState(false);
  const [children, setChildren] = useState<ChildType[]>([]); // Use local ChildType
  const [addingChild, setAddingChild] = useState(false);
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState<Date | undefined>(undefined);
  const [childGender, setChildGender] = useState('');
  // Assuming useBirthday hook provides setUser and is adapted for RN
  const { setUser } = useBirthday();
  const navigation = useNavigation();
  // Replace useToast with Alert or a RN toast library
  // const { toast } = useToast();

  const handleNameSubmit = () => {
    if (name.trim() === '') {
      Alert.alert("Name required", "Please enter your name to continue");
      return;
    }

    setStep(2);
  };

  const toggleHasChildren = () => {
    setHasChildren(!hasChildren);
    // Reset children data if user indicates they have no children
    if (hasChildren) {
        setChildren([]);
    }
  };

  const addChild = () => {
    if (!childName.trim() || !childBirthDate) {
      Alert.alert("Invalid input", "Please enter child's name and birth date");
      return;
    }

    const newChild: ChildType = { // Use local ChildType
      id: Date.now().toString(),
      name: childName,
      birthDate: format(childBirthDate, 'yyyy-MM-dd'), // Use yyyy-MM-dd format as expected by other parts
      gender: childGender || 'Not specified', // Ensure gender is string
      avatarUrl: '', // Add avatarUrl property
      notes: '', // Add notes property
      notificationPreference: '', // Add notificationPreference property
      // Recalculate daysToBirthday in RN if needed, or handle on display
      // daysToBirthday: Math.floor(Math.random() * 365) + 1,
    };

    setChildren([...children, newChild]);
    setChildName('');
    setChildBirthDate(undefined);
    setChildGender('');
    setAddingChild(false);
  };
  
  const handleAddChildPress = () => {
      setAddingChild(true);
  };

  const completeOnboarding = () => {
    // Assuming setUser is adapted for RN context
    setUser({
      name,
      isOnboarded: true,
      // Placeholder for avatarUrl - might need RN image upload logic
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      hasChildren,
      children: children,
    });

    Alert.alert("Welcome!", `Hello, ${name}! Your account has been set up.`);

    // Replace 'Dashboard' with your actual dashboard route name
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {step === 1 ? (
            <View>
              <View style={styles.textCenter}>
                <Text style={styles.title}>Welcome to Birthday Reminder</Text>
                <Text style={styles.subtitle}>Never forget an important date again!</Text>
              </View>

              <View style={styles.formSpace}>
                <Text style={styles.label}>What's your name?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#6B7280"
                />
              </View>
              <TouchableOpacity onPress={handleNameSubmit} style={styles.continueButtonStep1}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : ( // Step 2
            <View>
              <View style={styles.textCenter}>
                <Text style={styles.title}>Do you have kids?</Text>
              </View>

              {/* RN Switch - need to implement or use a library */}
              {/* Placeholder using TouchableOpacity for now */}
              <TouchableOpacity onPress={toggleHasChildren} style={styles.switchPlaceholder}>
                 <Text>{hasChildren ? 'Yes' : 'No'}</Text>
              </TouchableOpacity>

              {hasChildren && (
                <View style={styles.spaceY4}>
                  {children.length > 0 && (
                    <View style={styles.spaceY3}>
                      {children.map((child: ChildType, index) => ( // Use local ChildType
                        <View
                          key={child.id || index.toString()} // Use index as fallback key if id is not available
                          style={styles.childItem}
                        >
                          <View style={styles.childItemContent}>
                            {/* Placeholder for days to birthday icon/view */}
                            <View style={styles.daysToBirthdayPlaceholder}>
                                {/* Need to implement daysToBirthday calculation based on child.birthDate */}
                                <Text>{child.daysToBirthday || '--'}</Text>
                            </View>
                            <View>
                              <Text style={styles.childName}>{child.name}</Text>
                              <Text style={styles.childBirthDate}>{child.birthDate}</Text>
                            </View>
                          </View>
                           {/* Placeholder for child image */}
                          <View style={styles.childImagePlaceholder}>
                             {child.avatarUrl ? ( // Use avatarUrl
                                 <Image source={{ uri: child.avatarUrl }} style={styles.childImage} /> // Use avatarUrl
                             ) : (
                                 <Text>👶</Text> // Generic icon
                             )}
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Add Child Button - opens modal/sheet */}
                  <TouchableOpacity
                    onPress={handleAddChildPress}
                    style={styles.addButton}
                  >
                    {/* Placeholder for icon */}
                    <Text style={styles.addButtonText}>+ Add more</Text>
                  </TouchableOpacity>

                  {/* Modal for adding child - need to implement or use a library */}
                  <Modal isVisible={addingChild} onBackdropPress={() => setAddingChild(false)}>
                    <View style={styles.modalContent}>
                       <Text style={styles.modalTitle}>Add a child</Text>
                       
                       <View style={styles.formSpace}>
                          <Text style={styles.label}>Full Name</Text>
                          <TextInput
                            style={styles.input}
                            value={childName}
                            onChangeText={setChildName}
                            placeholder="Enter child's name"
                            placeholderTextColor="#6B7280"
                          />
                       </View>
                       
                        {/* Date Picker - need to implement or use a library */}
                       <View style={styles.formSpace}>
                           <Text style={styles.label}>Birthday</Text>
                            <DatePicker
                              date={childBirthDate || new Date()}
                              onDateChange={setChildBirthDate}
                              mode="date"
                              // Other props like maximumDate, minimumDate might be needed
                            />
                       </View>
                       
                        {/* Gender Select - need to implement or use a library */}
                       <View style={styles.formSpace}>
                          <Text style={styles.label}>Gender</Text>
                           <RNPickerSelect
                              onValueChange={(value) => setChildGender(value)}
                              items={[
                                  { label: 'Male', value: 'male' },
                                  { label: 'Female', value: 'female' },
                                  { label: 'Other', value: 'other' },
                              ]}
                              style={pickerSelectStyles} // Define styles for the picker
                              placeholder={{ label: 'Select gender', value: '' }}
                              value={childGender}
                           />
                       </View>

                       <View style={styles.modalButtons}>
                           <TouchableOpacity onPress={addChild} style={[styles.button, styles.modalAddButton]}>
                               <Text style={styles.buttonText}>Add kid</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => setAddingChild(false)} style={[styles.button, styles.modalCloseButton]}>
                               <Text style={[styles.buttonText, styles.modalCloseButtonText]}>Close</Text>
                           </TouchableOpacity>
                       </View>
                    </View>
                  </Modal>

                  {/* Pagination dots - need to implement or use a library */}
                  <View style={styles.paginationContainer}>
                    <View style={styles.paginationDotActive}></View>
                    <View style={styles.paginationDotInactive}></View>
                    <View style={styles.paginationDotInactive}></View>
                  </View>

                  {children.length > 0 && (
                    <TouchableOpacity
                      onPress={completeOnboarding}
                      style={styles.continueButtonStep2}
                    >
                      <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {!hasChildren && (
                <TouchableOpacity
                  onPress={completeOnboarding}
                  style={styles.continueButtonStep2}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {step === 2 && (
          <View style={styles.eggImageContainer}>
            {/* Placeholder for egg image */}
            {/* Assuming the image is in your RN assets or can be fetched */}
             <Image 
               source={require('../assets/images/6ae9d43c-37ef-493b-be7c-57f2cb0c86ff.png')} // Example path
               style={styles.eggImage}
               resizeMode="contain"
             />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 24,
  },
  textCenter: {
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5B21B6', // Assuming birthday-dark is a shade of purple
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
  },
  formSpace: {
      marginBottom: 16,
      width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  continueButtonStep1: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#8B5CF6', // Assuming gradient-bg maps to a purple
  },
   continueButtonStep2: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#8B5CF6', // Assuming purple-600
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  switchPlaceholder: {
      marginVertical: 16,
      padding: 8,
      backgroundColor: '#E5E7EB', // Placeholder background
      borderRadius: 20,
      alignItems: 'center',
  },
  spaceY4: {
      marginTop: 16,
      marginBottom: 16,
  },
  spaceY3: {
      marginBottom: 12,
  },
  childItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#F3F4F6', // Equivalent to bg-gray-50
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
  },
   childItemContent: {
       flexDirection: 'row',
       alignItems: 'center',
   },
  daysToBirthdayPlaceholder: {
      height: 40,
      width: 40,
      borderRadius: 4,
      backgroundColor: '#8B5CF6', // Assuming purple-600
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
  },
  childName: {
      fontWeight: '500',
      fontSize: 16,
  },
   childBirthDate: {
       fontSize: 14,
       color: '#6B7280',
   },
   childImagePlaceholder: {
       height: 48,
       width: 48,
       borderRadius: 4,
       backgroundColor: '#E5E7EB', // Equivalent to bg-gray-200
       overflow: 'hidden',
   },
    childImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
  addButton: {
      width: '100%',
      paddingVertical: 12,
      borderRadius: 4,
      alignItems: 'center',
      backgroundColor: '#8B5CF6', // Assuming purple-600
  },
  addButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
  },
  modalContent: { // Styles for the modal inner view
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalButtons: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 12, // Equivalent to space-x-2
  },
  modalAddButton: {
       flex: 1,
       backgroundColor: '#8B5CF6', // Assuming purple-600
       paddingVertical: 12,
       borderRadius: 24,
       alignItems: 'center',
  },
  modalCloseButton: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E7EB', // Equivalent to gray-300 border
      borderWidth: 1,
      paddingVertical: 12,
      borderRadius: 24,
      alignItems: 'center',
  },
    modalCloseButtonText: {
        color: '#4B5563', // Equivalent to gray-700
    },
   paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
  },
  paginationDotInactive: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB', // Equivalent to gray-300
    marginHorizontal: 2,
  },
  paginationDotActive: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6', // Equivalent to purple-600
    marginHorizontal: 2,
  },
   eggImageContainer: {
      width: '100%',
      maxWidth: 400,
      marginTop: 16,
   },
  eggImage: {
      width: '100%',
      height: 200, // Adjust height as needed
      opacity: 0.25,
  },
});

// Styles for react-native-picker-select
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#FFFFFF',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#FFFFFF',
    },
});


export default Onboarding; 