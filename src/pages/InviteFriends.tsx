import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header'; // Changed from @/components
import { Ionicons } from '@expo/vector-icons'; // Assuming Expo vector icons are used for potential icons

const InviteFriends: React.FC = () => {
  const navigation = useNavigation();

  const handleInviteFriends = () => {
    // Share functionality would go here in a real React Native app
    // For now, simulating the action with an alert
    Alert.alert('Invitation Sent', 'Invitation link copied to clipboard!');
    // You might want to implement actual sharing using react-native-share or similar library
  };

  const handleContinue = () => {
    // Replace 'Dashboard' with your actual dashboard route name
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Assuming Header is adapted for React Native */}
      {/* If Header is not a simple Text component, you might need to pass props differently */}
      {/* For simplicity, a basic Text header is used here */}
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite Friends</Text>
        <View style={styles.backButtonPlaceholder} />{/* Placeholder to balance header */}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Invite people in the application in order to see the birdays of their kids.
          </Text>

          <View style={styles.howItWorksContainer}>
            <Text style={styles.howItWorksTitle}>How it works:</Text>

            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>Step 1</Text>
              <Text style={styles.stepDescription}>
                Invite button will give you option to share a link through your preferred way.
              </Text>
            </View>

            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>Step 2</Text>
              <Text style={styles.stepDescription}>
                Your friend should open the link on there mobile device.
              </Text>
            </View>

            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>Step 3</Text>
              <Text style={styles.stepDescription}>
                Your friend should Accept the invitation form.
              </Text>
            </View>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              Note: Have in mind Invitation form will display the name from your profile page.
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleInviteFriends}
            style={[styles.button, styles.inviteButton]}
          >
            <Text style={styles.buttonText}>Invite friends</Text>
          </TouchableOpacity>
        </View>

        {/* Pagination dots - simplified */}
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDotInactive}></View>
          <View style={styles.paginationDotInactive}></View>
          <View style={styles.paginationDotActive}></View>
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          style={[styles.button, styles.continueButton]}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
   backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 24,
  }, // Placeholder to balance the header
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 24,
  },
  howItWorksContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
  },
  stepTitle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  stepDescription: {
    color: '#4B5563',
    fontSize: 14,
  },
  noteContainer: {
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 24,
  },
  noteText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inviteButton: {
    backgroundColor: '#8247f5',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#8247f5',
    marginTop: 16,
    paddingHorizontal: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  paginationDotInactive: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#8247f5',
    marginHorizontal: 4,
  },
});

export default InviteFriends; 