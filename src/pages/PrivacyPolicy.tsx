import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header'; // Changed from @/components

const PrivacyPolicy: React.FC = () => {
  // Using standard JavaScript Date and toLocaleDateString for the update date
  const lastUpdatedDate = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      {/* Assuming Header is adapted for React Native */}
      <Header title="Privacy Policy" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Card equivalent */}
        <View style={styles.card}>
          {/* CardHeader equivalent */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Privacy Policy</Text>
            <Text style={styles.lastUpdatedText}>Last updated: {lastUpdatedDate}</Text>
          </View>

          {/* CardContent equivalent */}
          <View style={styles.cardContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Information We Collect</Text>
              <Text style={styles.paragraph}>We collect information you provide directly to us, such as:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Account information (name, email address)</Text>
                <Text style={styles.listItem}>• Birthday information for you and your children</Text>
                <Text style={styles.listItem}>• Friend connections and shared birthday data</Text>
                <Text style={styles.listItem}>• Profile information and photos you choose to upload</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
              <Text style={styles.paragraph}>We use the information we collect to:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Provide and maintain our birthday tracking service</Text>
                <Text style={styles.listItem}>• Send you birthday reminders and notifications</Text>
                <Text style={styles.listItem}>• Enable you to connect with friends and family</Text>
                <Text style={styles.listItem}>• Improve our services and user experience</Text>
                <Text style={styles.listItem}>• Communicate with you about your account</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Information Sharing</Text>
              <Text style={styles.paragraph}>We do not sell, trade, or otherwise transfer your personal information to third parties except:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• With your explicit consent</Text>
                <Text style={styles.listItem}>• To comply with legal obligations</Text>
                <Text style={styles.listItem}>• To protect our rights and safety</Text>
                <Text style={styles.listItem}>• With service providers who assist in our operations</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Data Security</Text>
              <Text style={styles.paragraph}>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Your Rights</Text>
              <Text style={styles.paragraph}>You have the right to:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Access your personal information</Text>
                <Text style={styles.listItem}>• Correct inaccurate information</Text>
                <Text style={styles.listItem}>• Delete your account and associated data</Text>
                <Text style={styles.listItem}>• Export your data</Text>
                <Text style={styles.listItem}>• Opt out of certain communications</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
              <Text style={styles.paragraph}>
                Our service is intended for users who are at least 13 years old. We do not knowingly 
                collect personal information from children under 13. If you are a parent or guardian 
                and believe your child has provided us with personal information, please contact us.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
              <Text style={styles.paragraph}>
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Contact Us</Text>
              <Text style={styles.paragraph}>
                If you have any questions about this privacy policy, please contact us at privacy@birthdayapp.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Equivalent to bg-gray-50
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16, // Equivalent to px-4
    paddingVertical: 24, // Equivalent to py-6
    maxWidth: 600, // Equivalent to max-w-4xl (adjust as needed)
    alignSelf: 'center', // To center the content within the container
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#6B7280', // Equivalent to text-gray-600
    textAlign: 'center',
  },
  cardContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24, // Equivalent to space-y-6 (adjust as needed between sections)
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12, // Equivalent to mb-3
  },
  paragraph: {
    fontSize: 14,
    color: '#374151', // Equivalent to text-gray-700
    marginBottom: 8, // Equivalent to mb-2
    lineHeight: 20, // Adjust as needed for readability
  },
  list: {
    marginLeft: 16, // Equivalent to pl-6
    marginTop: 4, // Equivalent to space-y-1 (adjust as needed within lists)
  },
  listItem: {
    fontSize: 14,
    color: '#374151', // Equivalent to text-gray-700
    marginBottom: 4, // Adjust spacing between list items
    lineHeight: 20, // Adjust as needed for readability
  },
});

export default PrivacyPolicy; 