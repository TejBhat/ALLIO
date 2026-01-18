import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function OverviewScreen() {
  const { currentTheme } = useTheme();
  
  // Mock data - you can connect this to your actual data later
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [notesWritten, setNotesWritten] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(5); // Days in a row

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  const greeting = currentDate.getHours() < 12 ? "Good Morning" : 
                   currentDate.getHours() < 18 ? "Good Afternoon" : "Good Evening";

  // Daily motivational quotes
  const quotes = [
    "Small steps every day lead to big changes.",
    "Progress, not perfection.",
    "You're doing great! Keep going.",
    "Every day is a fresh start.",
    "Consistency is key to success.",
    "Believe in your journey.",
    "One day at a time.",
  ];
  const dailyQuote = quotes[currentDate.getDay()];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]} 
      contentContainerStyle={styles.content}
    >
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </Pressable>

      {/* Greeting Header */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: currentTheme.accentColor }]}>{greeting}!</Text>
        <Text style={styles.date}>{dateString}</Text>
      </View>

      {/* Streak Card */}
      <View style={[styles.streakCard, { backgroundColor: currentTheme.cardBackground }]}>
        <Ionicons name="flame" size={40} color="#ff6b35" />
        <View style={styles.streakInfo}>
          <Text style={[styles.streakNumber, { color: currentTheme.accentColor }]}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak!</Text>
        </View>
        <Text style={styles.streakSubtext}>Keep the momentum going 🚀</Text>
      </View>

      {/* Today's Stats */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Today's Activity</Text>
        
        <View style={styles.statsGrid}>
          {/* Water */}
          <Pressable 
            style={[styles.statCard, { backgroundColor: currentTheme.cardBackground }]}
            onPress={() => router.push("/waterintake")}
          >
            <MaterialCommunityIcons name="cup-water" size={32} color="#60a5fa" />
            <Text style={[styles.statNumber, { color: currentTheme.accentColor }]}>{waterGlasses}</Text>
            <Text style={styles.statLabel}>Glasses</Text>
            <Text style={styles.statSubtext}>Water</Text>
          </Pressable>

          {/* Tasks */}
          <Pressable 
            style={[styles.statCard, { backgroundColor: currentTheme.cardBackground }]}
            onPress={() => router.push("/calendarcheck")}
          >
            <Ionicons name="checkmark-circle-outline" size={32} color="#34d399" />
            <Text style={[styles.statNumber, { color: currentTheme.accentColor }]}>{tasksCompleted}</Text>
            <Text style={styles.statLabel}>Tasks</Text>
            <Text style={styles.statSubtext}>Completed</Text>
          </Pressable>

          {/* Notes */}
          <Pressable 
            style={[styles.statCard, { backgroundColor: currentTheme.cardBackground }]}
            onPress={() => router.push("/notes")}
          >
            <Ionicons name="document-text-outline" size={32} color="#fbbf24" />
            <Text style={[styles.statNumber, { color: currentTheme.accentColor }]}>{notesWritten}</Text>
            <Text style={styles.statLabel}>Notes</Text>
            <Text style={styles.statSubtext}>Written</Text>
          </Pressable>
        </View>
      </View>

      {/* Daily Quote */}
      <View style={[styles.quoteCard, { backgroundColor: currentTheme.cardBackground }]}>
        <Ionicons name="bulb-outline" size={24} color={currentTheme.accentColor} />
        <Text style={[styles.quoteText, { color: currentTheme.accentColor }]}>"{dailyQuote}"</Text>
      </View>

      {/* Weekly Summary - Simple Visual */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>This Week</Text>
        
        <View style={[styles.weekCard, { backgroundColor: currentTheme.cardBackground }]}>
          <View style={styles.weekDays}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <Text style={styles.dayLabel}>{day}</Text>
                <View 
                  style={[
                    styles.dayDot, 
                    index < currentStreak && styles.dayDotActive,
                    { backgroundColor: index < currentStreak ? currentTheme.accentColor : '#333' }
                  ]} 
                />
              </View>
            ))}
          </View>
          <Text style={styles.weekSubtext}>
            {currentStreak} {currentStreak === 1 ? 'day' : 'days'} active this week
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Quick Start</Text>
        
        <Pressable 
          style={[styles.actionButton, { backgroundColor: currentTheme.cardBackground }]}
          onPress={() => router.push("/waterintake")}
        >
          <MaterialCommunityIcons name="plus-circle" size={24} color={currentTheme.accentColor} />
          <Text style={[styles.actionText, { color: currentTheme.accentColor }]}>Log Water</Text>
        </Pressable>

        <Pressable 
          style={[styles.actionButton, { backgroundColor: currentTheme.cardBackground }]}
          onPress={() => router.push("/calendarcheck")}
        >
          <MaterialCommunityIcons name="plus-circle" size={24} color={currentTheme.accentColor} />
          <Text style={[styles.actionText, { color: currentTheme.accentColor }]}>Add Task</Text>
        </Pressable>

        <Pressable 
          style={[styles.actionButton, { backgroundColor: currentTheme.cardBackground }]}
          onPress={() => router.push("/notes")}
        >
          <MaterialCommunityIcons name="plus-circle" size={24} color={currentTheme.accentColor} />
          <Text style={[styles.actionText, { color: currentTheme.accentColor }]}>Write Note</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  streakCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 30,
    elevation: 4,
  },
  streakInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 12,
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 56,
    fontWeight: "900",
    marginRight: 8,
  },
  streakLabel: {
    fontSize: 18,
    color: "#999",
    fontWeight: "600",
  },
  streakSubtext: {
    fontSize: 14,
    color: "#ffeaa7",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffeaa7",
  },
  statSubtext: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  quoteCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    elevation: 2,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 24,
  },
  weekCard: {
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  dayColumn: {
    alignItems: "center",
  },
  dayLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    marginBottom: 8,
  },
  dayDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#333",
  },
  dayDotActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  weekSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
});