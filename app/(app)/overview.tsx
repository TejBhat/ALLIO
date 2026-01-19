import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, useFocusEffect } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useState, useCallback } from "react";
import { getWaterIntake, getStreak, updateStreak, getNotes, getTasks } from "../utils/storage";

export default function OverviewScreen() {
  const { currentTheme } = useTheme();
  
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [notesWritten, setNotesWritten] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  // Load data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadOverviewData();
    }, [])
  );

  const loadOverviewData = async () => {
    setIsLoading(true);
    try {
      // Load water intake (converts ml to glasses)
      const waterML = await getWaterIntake();
      const glasses = Math.floor(waterML / 250); // 250ml per glass
      setWaterGlasses(glasses);

      // Load and update streak
      const streak = await updateStreak();
      setCurrentStreak(streak);

      // Load notes
      const notes = await getNotes();
      setNotesWritten(notes.length);

      // Load tasks
      const tasks = await getTasks();
      const today = new Date().toDateString();
      
      // Filter tasks for today only
      const todaysTasks = tasks.filter((task: any) => {
        const taskDate = new Date(task.date).toDateString();
        return taskDate === today;
      });

      setTotalTasks(todaysTasks.length);
      const completed = todaysTasks.filter((task: any) => task.completed).length;
      setTasksCompleted(completed);

    } catch (error) {
      console.error("Error loading overview data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={currentTheme.accentColor} />
        <Text style={{ color: currentTheme.accentColor, marginTop: 16, fontSize: 16 }}>
          Loading your overview...
        </Text>
      </View>
    );
  }

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
        <Text style={styles.streakSubtext}>
          {currentStreak === 1 
            ? "Great start! Come back tomorrow 🚀" 
            : `${currentStreak} days in a row! Keep it up 🚀`}
        </Text>
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
            <Text style={[styles.statNumber, { color: currentTheme.accentColor }]}>
              {tasksCompleted}/{totalTasks}
            </Text>
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
            <Text style={styles.statSubtext}>Total</Text>
          </Pressable>
        </View>
      </View>

      {/* Progress Summary */}
      {(waterGlasses > 0 || tasksCompleted > 0 || notesWritten > 0) && (
        <View style={[styles.progressSummary, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.progressTitle, { color: currentTheme.accentColor }]}>
            Today's Progress
          </Text>
          {waterGlasses >= 8 && (
            <View style={styles.achievementRow}>
              <Ionicons name="checkmark-circle" size={20} color="#34d399" />
              <Text style={styles.achievementText}>✨ Hydration goal reached!</Text>
            </View>
          )}
          {tasksCompleted === totalTasks && totalTasks > 0 && (
            <View style={styles.achievementRow}>
              <Ionicons name="checkmark-circle" size={20} color="#34d399" />
              <Text style={styles.achievementText}>✨ All tasks completed!</Text>
            </View>
          )}
          {notesWritten > 0 && (
            <View style={styles.achievementRow}>
              <Ionicons name="checkmark-circle" size={20} color="#fbbf24" />
              <Text style={styles.achievementText}>📝 {notesWritten} notes created</Text>
            </View>
          )}
        </View>
      )}

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
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
              const isActive = index < Math.min(currentStreak, 7);
              return (
                <View key={index} style={styles.dayColumn}>
                  <Text style={[styles.dayLabel, isActive && { color: currentTheme.accentColor }]}>
                    {day}
                  </Text>
                  <View 
                    style={[
                      styles.dayDot, 
                      isActive && styles.dayDotActive,
                      { backgroundColor: isActive ? currentTheme.accentColor : '#333' }
                    ]} 
                  />
                </View>
              );
            })}
          </View>
          <Text style={styles.weekSubtext}>
            {currentStreak === 0 
              ? "Start your streak today!"
              : `${Math.min(currentStreak, 7)} ${currentStreak === 1 ? 'day' : 'days'} active this week`}
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
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{waterGlasses}</Text>
          </View>
        </Pressable>

        <Pressable 
          style={[styles.actionButton, { backgroundColor: currentTheme.cardBackground }]}
          onPress={() => router.push("/calendarcheck")}
        >
          <MaterialCommunityIcons name="plus-circle" size={24} color={currentTheme.accentColor} />
          <Text style={[styles.actionText, { color: currentTheme.accentColor }]}>Add Task</Text>
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{totalTasks}</Text>
          </View>
        </Pressable>

        <Pressable 
          style={[styles.actionButton, { backgroundColor: currentTheme.cardBackground }]}
          onPress={() => router.push("/notes")}
        >
          <MaterialCommunityIcons name="plus-circle" size={24} color={currentTheme.accentColor} />
          <Text style={[styles.actionText, { color: currentTheme.accentColor }]}>Write Note</Text>
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{notesWritten}</Text>
          </View>
        </Pressable>
      </View>

      {/* Refresh Button */}
      <Pressable 
        style={[styles.refreshButton, { backgroundColor: currentTheme.cardBackground }]}
        onPress={loadOverviewData}
      >
        <Ionicons name="refresh" size={20} color={currentTheme.accentColor} />
        <Text style={[styles.refreshText, { color: currentTheme.accentColor }]}>
          Refresh Data
        </Text>
      </Pressable>
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
    textAlign: "center",
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
    fontSize: 28,
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
  progressSummary: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  achievementText: {
    fontSize: 14,
    color: "#ffeaa7",
    fontWeight: "500",
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
    flex: 1,
  },
  actionBadge: {
    backgroundColor: "rgba(255, 214, 77, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionBadgeText: {
    color: "#ffd84d",
    fontSize: 14,
    fontWeight: "700",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    elevation: 2,
    gap: 8,
    marginTop: 10,
  },
  refreshText: {
    fontSize: 15,
    fontWeight: "600",
  },
});