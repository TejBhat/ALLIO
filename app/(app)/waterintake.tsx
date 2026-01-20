import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { saveData, getData } from "../utils/storage";

const WATER_GLASSES_KEY = 'water_glasses_count';
const WATER_DATE_KEY = 'water_glasses_date';

export default function WaterIntakeScreen() {
  const { currentTheme } = useTheme();
  const GLASS_SIZE = 250; // ml per glass
  const [glassCount, setGlassCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWaterData();
  }, []);

  const loadWaterData = async () => {
    try {
      const today = new Date().toDateString();
      const savedDate = await getData(WATER_DATE_KEY);
      
      // Reset if it's a new day
      if (savedDate !== today) {
        await saveData(WATER_GLASSES_KEY, 0);
        await saveData(WATER_DATE_KEY, today);
        setGlassCount(0);
      } else {
        const savedCount = await getData(WATER_GLASSES_KEY);
        setGlassCount(savedCount || 0);
      }
    } catch (error) {
      console.error("Error loading water data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveWaterData = async (count: number) => {
    try {
      const today = new Date().toDateString();
      await saveData(WATER_GLASSES_KEY, count);
      await saveData(WATER_DATE_KEY, today);
    } catch (error) {
      console.error("Error saving water data:", error);
    }
  };

  const addGlass = async () => {
    const newCount = glassCount + 1;
    setGlassCount(newCount);
    await saveWaterData(newCount);
  };

  const removeGlass = async () => {
    if (glassCount > 0) {
      const newCount = glassCount - 1;
      setGlassCount(newCount);
      await saveWaterData(newCount);
    }
  };

  const resetCount = async () => {
    setGlassCount(0);
    await saveWaterData(0);
  };

  const totalML = glassCount * GLASS_SIZE;
  const totalLiters = (totalML / 1000).toFixed(2);
  const goalGlasses = 8; // 8 glasses = 2000ml
  const progressPercentage = Math.min((glassCount / goalGlasses) * 100, 100);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={currentTheme.accentColor} />
        <Text style={{ color: currentTheme.accentColor, marginTop: 16, fontSize: 16 }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </Pressable>

      <Text style={[styles.title, { color: currentTheme.accentColor }]}>
        Water Intake Tracker
      </Text>

      {/* Main Card */}
      <View style={[styles.mainCard, { backgroundColor: currentTheme.cardBackground }]}>
        <MaterialCommunityIcons 
          name="cup-water" 
          size={60} 
          color={currentTheme.accentColor} 
        />

        <Text style={[styles.glassCountText, { color: currentTheme.accentColor }]}>
          {glassCount}
        </Text>
        <Text style={styles.glassLabel}>
          Glass{glassCount !== 1 ? 'es' : ''} of Water
        </Text>

        <View style={styles.divider} />

        <Text style={[styles.totalText, { color: currentTheme.accentColor }]}>
          {totalML} ml
        </Text>
        <Text style={styles.litersText}>
          ({totalLiters} Liters)
        </Text>
      </View>

      {/* Add/Remove Buttons */}
      <View style={styles.controlButtons}>
        <Pressable 
          style={[
            styles.controlBtn, 
            { backgroundColor: currentTheme.cardBackground, opacity: glassCount === 0 ? 0.5 : 1 }
          ]} 
          onPress={removeGlass}
          disabled={glassCount === 0}
        >
          <Ionicons name="remove-circle" size={60} color={currentTheme.accentColor} />
        </Pressable>

        <Pressable 
          style={[styles.controlBtn, { backgroundColor: currentTheme.cardBackground }]} 
          onPress={addGlass}
        >
          <Ionicons name="add-circle" size={60} color={currentTheme.accentColor} />
        </Pressable>
      </View>

      <Text style={[styles.tapText, { color: currentTheme.accentColor }]}>
        Tap + to add or - to remove a glass (250ml)
      </Text>

      {/* Daily Goal Progress */}
      <View style={[styles.goalContainer, { backgroundColor: currentTheme.cardBackground }]}>
        <View style={styles.goalHeader}>
          <Text style={[styles.goalTitle, { color: currentTheme.accentColor }]}>
            Daily Goal
          </Text>
          <Text style={[styles.goalCount, { color: currentTheme.accentColor }]}>
            {glassCount} / {goalGlasses}
          </Text>
        </View>

        <View style={styles.goalBarContainer}>
          <View 
            style={[
              styles.goalProgress, 
              { 
                width: `${progressPercentage}%`,
                backgroundColor: currentTheme.accentColor 
              }
            ]} 
          />
        </View>

        <Text style={styles.goalSubtext}>
          {glassCount >= goalGlasses 
            ? "🎉 Goal achieved! Great job!" 
            : `${goalGlasses - glassCount} more ${goalGlasses - glassCount === 1 ? 'glass' : 'glasses'} to go`}
        </Text>
      </View>

      {/* Reset Button */}
      {glassCount > 0 && (
        <Pressable 
          style={[styles.resetBtn, { backgroundColor: currentTheme.cardBackground }]} 
          onPress={resetCount}
        >
          <MaterialCommunityIcons name="refresh" size={24} color="#DC2626" />
          <Text style={styles.resetBtnText}>
            Reset Today
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: "center",
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  mainCard: {
    width: "100%",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    elevation: 4,
    marginBottom: 40,
  },
  glassCountText: {
    fontSize: 72,
    fontWeight: "900",
    marginTop: 16,
    marginBottom: 8,
  },
  glassLabel: {
    fontSize: 18,
    color: "#ffeaa7",
    marginBottom: 20,
  },
  divider: {
    width: "80%",
    height: 2,
    backgroundColor: "#5a3400",
    marginVertical: 20,
  },
  totalText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  litersText: {
    fontSize: 16,
    color: "#ffeaa7",
  },
  controlButtons: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  controlBtn: {
    borderRadius: 100,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tapText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  goalContainer: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  goalCount: {
    fontSize: 24,
    fontWeight: "900",
  },
  goalBarContainer: {
    width: "100%",
    height: 12,
    backgroundColor: "#5a3400",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
  },
  goalProgress: {
    height: "100%",
    borderRadius: 6,
  },
  goalSubtext: {
    fontSize: 14,
    color: "#ffeaa7",
    textAlign: "center",
    fontWeight: "600",
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  resetBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
  },
});