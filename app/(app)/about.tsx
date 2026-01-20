import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View, Image, Linking, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function AboutScreen() {
  const { currentTheme } = useTheme();
  
  const openPrivacyPolicy = async () => {
    const url = "https://your-privacy-policy-url.com"; // Update this after hosting
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open privacy policy");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open privacy policy");
    }
  };

  const contactDeveloper = () => {
    Linking.openURL("mailto:alliotejapp@gmail.com"); 
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={[styles.title, { color: currentTheme.accentColor }]}>About ALLIO</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* App Icon/Logo */}
        <View style={styles.logoContainer}>
          <View style={[styles.logoCircle, { backgroundColor: currentTheme.cardBackground }]}>
            <Image 
              source={require('../../assets/images/icon.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.appName, { color: currentTheme.accentColor }]}>ALLIO</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* Description Card */}
        <View style={[styles.descriptionCard, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.description, { color: currentTheme.accentColor }]}>
            ALLIO is an all-in-one productivity mobile app designed to help you track daily habits and progress efficiently.
          </Text>
          <Text style={[styles.description, { color: currentTheme.accentColor }]}>
            Built with simplicity and clean user experience in mind, ALLIO helps you stay organized, hydrated, and productive every day.
          </Text>
        </View>

        {/* What ALLIO Solves */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>What ALLIO Solves</Text>
          <View style={[styles.problemCard, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.problemItem}>
              <Ionicons name="checkmark-circle" size={20} color="#34d399" />
              <Text style={[styles.problemText, { color: currentTheme.accentColor }]}>
                Forget to drink water? Track your daily hydration easily.
              </Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="checkmark-circle" size={20} color="#34d399" />
              <Text style={[styles.problemText, { color: currentTheme.accentColor }]}>
                Ideas slipping away? Capture them instantly in notes.
              </Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="checkmark-circle" size={20} color="#34d399" />
              <Text style={[styles.problemText, { color: currentTheme.accentColor }]}>
                Tasks getting lost? Organize them in your calendar.
              </Text>
            </View>
            <View style={styles.problemItem}>
              <Ionicons name="checkmark-circle" size={20} color="#34d399" />
              <Text style={[styles.problemText, { color: currentTheme.accentColor }]}>
                Want to stay consistent? Build streaks and track progress.
              </Text>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Features</Text>
          <View style={[styles.featureCard, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.featureItem}>
              <Ionicons name="create-outline" size={20} color={currentTheme.accentColor} />
              <Text style={[styles.featureText, { color: currentTheme.accentColor }]}>Idea Notes</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="calendar-outline" size={20} color={currentTheme.accentColor} />
              <Text style={[styles.featureText, { color: currentTheme.accentColor }]}>Calendar Check</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="water-outline" size={20} color={currentTheme.accentColor} />
              <Text style={[styles.featureText, { color: currentTheme.accentColor }]}>Water Intake Tracker</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="today-outline" size={20} color={currentTheme.accentColor} />
              <Text style={[styles.featureText, { color: currentTheme.accentColor }]}>Daily Overview</Text>
            </View>
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Privacy & Security</Text>
          <View style={[styles.privacyCard, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.privacyItem}>
              <Ionicons name="shield-checkmark" size={24} color="#34d399" />
              <View style={styles.privacyContent}>
                <Text style={[styles.privacyTitle, { color: currentTheme.accentColor }]}>
                  100% Private
                </Text>
                <Text style={styles.privacyDescription}>
                  All your data stays on your device. No cloud sync, no tracking.
                </Text>
              </View>
            </View>
            
            <View style={styles.privacyItem}>
              <Ionicons name="lock-closed" size={24} color="#60a5fa" />
              <View style={styles.privacyContent}>
                <Text style={[styles.privacyTitle, { color: currentTheme.accentColor }]}>
                  No Account Required
                </Text>
                <Text style={styles.privacyDescription}>
                  Start using immediately. No sign-up, no email, no hassle.
                </Text>
              </View>
            </View>

            <Pressable style={styles.privacyLink} onPress={openPrivacyPolicy}>
              <Text style={styles.privacyLinkText}>Read Privacy Policy</Text>
              <Ionicons name="open-outline" size={16} color="#60a5fa" />
            </Pressable>
          </View>
        </View>

        {/* Developer Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Developer</Text>
          <View style={[styles.developerCard, { backgroundColor: currentTheme.cardBackground }]}>
            <Text style={[styles.developerName, { color: currentTheme.accentColor }]}>Tej M Bhat</Text>
            <Text style={styles.developerRole}>Designer & Developer</Text>
            
            <Pressable style={styles.contactButton} onPress={contactDeveloper}>
              <Ionicons name="mail-outline" size={18} color={currentTheme.accentColor} />
              <Text style={[styles.contactText, { color: currentTheme.accentColor }]}>
                Contact Developer
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 ALLIO. All rights reserved.
        </Text>
        <Text style={styles.footerSubtext}>
          
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backBtn: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 24,
    justifyContent: "center",
    backgroundColor: "#7a4a00",
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: 2,
  },
  version: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  descriptionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: "justify",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  problemCard: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  problemItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
    gap: 12,
  },
  problemText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  featureCard: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    fontWeight: "500",
  },
  privacyCard: {
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  privacyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    color: "#999",
    lineHeight: 20,
  },
  privacyLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    borderRadius: 8,
    marginTop: 8,
  },
  privacyLinkText: {
    color: "#60a5fa",
    fontSize: 14,
    fontWeight: "600",
  },
  developerCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },
  developerName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(122, 74, 0, 0.2)",
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
});