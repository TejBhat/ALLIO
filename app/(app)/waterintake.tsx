import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useTheme } from "../context/ThemeContext";
import {saveWaterIntake, getWaterIntake} from "../utils/storage";

export default function WaterIntakeScreen() {
  const { currentTheme } = useTheme();
  const GLASS_SIZE = 250; // ml per glass
  const [glassCount, setGlassCount] = useState(0);
  const [isLoading, setIsLoading]=useState(true);

  useEffect(()=>{
    loadWaterData();
  },[]);

  const loadWaterData=async()=>{
     const savedCount=await getWaterIntake();
     setGlassCount(savedCount);
     setIsLoading(false);
  };

  const addGlass = async () => {
    const newCount=glassCount+1;
    setGlassCount(newCount);
    await saveWaterIntake(newCount);
  };

  const removeGlass = async() => {
    if (glassCount > 0) {
      const newCount=glassCount-1;
      setGlassCount(newCount);
      await saveWaterIntake(newCount);
    }
  };

  const resetCount = async() => {
    setGlassCount(0);
    await saveWaterIntake(0);
  };

  const totalML = glassCount * GLASS_SIZE;
  const totalLiters = (totalML / 1000).toFixed(2);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={currentTheme.accentColor} />
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

      {/* Add Button */}
      <Pressable 
        style={[styles.addBtn, { backgroundColor: currentTheme.cardBackground }]} 
        onPress={addGlass}
      >
        <Ionicons name="add-circle" size={80} color={currentTheme.accentColor} />
      </Pressable>

      <Text style={[styles.tapText, { color: currentTheme.accentColor }]}>
        Tap to add a glass (250ml)
      </Text>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {glassCount > 0 && (
          <Pressable 
            style={[styles.actionBtn, styles.minusBtn, { backgroundColor: currentTheme.cardBackground }]} 
            onPress={removeGlass}
          >
            <Ionicons name="remove-circle-outline" size={28} color={currentTheme.accentColor} />
            <Text style={[styles.actionBtnText, { color: currentTheme.accentColor }]}>
              Remove One
            </Text>
          </Pressable>
        )}

        {glassCount > 0 && (
          <Pressable 
            style={[styles.actionBtn, styles.resetBtn, { backgroundColor: currentTheme.cardBackground }]} 
            onPress={resetCount}
          >
            <MaterialCommunityIcons name="refresh" size={28} color="#DC2626" />
            <Text style={[styles.actionBtnText, { color: "#DC2626" }]}>
              Reset
            </Text>
          </Pressable>
        )}
      </View>

      {/* Daily Goal Indicator */}
      <View style={styles.goalContainer}>
        <Text style={styles.goalLabel}>Recommended Daily Goal</Text>
        <View style={styles.goalBar}>
          <View 
            style={[
              styles.goalProgress, 
              { 
                width: `${Math.min((totalML / 2000) * 100, 100)}%`,
                backgroundColor: currentTheme.accentColor 
              }
            ]} 
          />
        </View>
        <Text style={styles.goalText}>
          {totalML} / 2000 ml ({Math.round((totalML / 2000) * 100)}%)
        </Text>
      </View>
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
  addBtn: {
    borderRadius: 100,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tapText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 30,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    elevation: 2,
  },
  minusBtn: {
    // Additional styling if needed
  },
  resetBtn: {
    // Additional styling if needed
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  goalContainer: {
    width: "100%",
    backgroundColor: "rgba(122, 74, 0, 0.3)",
    borderRadius: 16,
    padding: 20,
  },
  goalLabel: {
    fontSize: 14,
    color: "#ffeaa7",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  goalBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#5a3400",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  goalProgress: {
    height: "100%",
    borderRadius: 5,
  },
  goalText: {
    fontSize: 14,
    color: "#ffeaa7",
    textAlign: "center",
    fontWeight: "600",
  },
});