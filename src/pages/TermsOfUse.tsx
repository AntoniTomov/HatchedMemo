import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header'; // Changed from @/components

const TermsOfUse: React.FC = () => {
  // Using standard JavaScript Date and toLocaleDateString for the update date
  const lastUpdatedDate = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      {/* Assuming Header is adapted for React Native */}
      <Header title="Terms of Use" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Card equivalent */}
        <View style={styles.card}>
          {/* CardHeader equivalent */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Terms of Use</Text>
            <Text style={styles.lastUpdatedText}>Last updated: {lastUpdatedDate}</Text>
          </View>

          {/* CardContent equivalent */}
          <View style={styles.cardContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
              <Text style={styles.paragraph}>
                By accessing and using this birthday tracking application, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Description of Service</Text>
              <Text style={styles.paragraph}>Our application provides:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Birthday tracking and reminder services</Text>
                <Text style={styles.listItem}>• Friend and family connection features</Text>
                <Text style={styles.listItem}>• Calendar integration and notifications</Text>
                <Text style={styles.listItem}>• Profile management and photo sharing</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
              <Text style={styles.paragraph}>You agree to:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Provide accurate and truthful information</Text>
                <Text style={styles.listItem}>• Keep your login credentials secure</Text>
                <Text style={styles.listItem}>• Respect other users' privacy and data</Text>
                <Text style={styles.listItem}>• Use the service for lawful purposes only</Text>
                <Text style={styles.listItem}>• Not attempt to disrupt or damage the service</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Prohibited Uses</Text>
              <Text style={styles.paragraph}>You may not use our service:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• For any unlawful purpose or to solicit others to perform unlawful acts</Text>
                <Text style={styles.listItem}>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</Text>
                <Text style={styles.listItem}>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</Text>
                <Text style={styles.listItem}>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</Text>
                <Text style={styles.listItem}>• To submit false or misleading information</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Account Termination</Text>
              <Text style={styles.paragraph}>
                We reserve the right to terminate or suspend your account and bar access to the service 
                immediately, without prior notice or liability, for any reason whatsoever, including 
                without limitation if you breach the Terms.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Disclaimer</Text>
              <Text style={styles.paragraph}>
                The information on this application is provided on an "as is" basis. To the fullest extent 
                permitted by law, this Company excludes all representations, warranties, conditions and terms.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
              <Text style={styles.paragraph}>
                In no event shall our company, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Changes to Terms</Text>
              <Text style={styles.paragraph}>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. Contact Information</Text>
              <Text style={styles.paragraph}>
                If you have any questions about these Terms of Use, please contact us at terms@birthdayapp.com
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

export default TermsOfUse; 