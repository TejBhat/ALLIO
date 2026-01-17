import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";


export default function AboutScreen() {
  const { currentTheme } = useTheme();
  
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
          <Image source={require('../../assets/images/icon.png')}
          style={styles.logoImage}
          resizeMode="contain"/>
          </View>
          <Text style={[styles.appName, { color: currentTheme.accentColor }]}>ALLIO</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* Description Card */}
        <View style={[styles.descriptionCard, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.description, { color: currentTheme.accentColor }]}>
            ALLIO is an all-in-one productivity mobile app focused on helping users track daily habits and progress efficiently.
          </Text>
          <Text style={[styles.description, { color: currentTheme.accentColor }]}>
            Designed and developed by Tej M Bhat with an emphasis on simplicity and a clean user experience.
          </Text>
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

        {/* Developer Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Developer</Text>
          <View style={[styles.developerCard, { backgroundColor: currentTheme.cardBackground }]}>
            <Text style={[styles.developerName, { color: currentTheme.accentColor }]}>Tej M Bhat</Text>
            <Text style={styles.developerRole}>Designer & Developer</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 ALLIO. All rights reserved.
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
    backgroundColor:"#7a4a00",
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor:"#000",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.25,
    shadowRadius:3.84,
    overflow:"hidden",

  },
  logoImage:{
    width:100,
    height:100,

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
  },
  footer: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});