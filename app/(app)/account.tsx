import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { saveData, getData } from "../utils/storage";

const USERNAME_KEY = 'user_username';

export default function AccountScreen() {
  const { currentTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState("");

  // Load username on mount
  useEffect(() => {
    loadUsername();
  }, []);

  const loadUsername = async () => {
    try {
      const savedUsername = await getData(USERNAME_KEY);
      if (savedUsername) {
        setUsername(savedUsername);
      }
    } catch (error) {
      console.error("Error loading username:", error);
    }
  };

  const handleEdit = () => {
    setTempUsername(username);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (tempUsername.trim()) {
      const trimmedUsername = tempUsername.trim();
      setUsername(trimmedUsername);
      setIsEditing(false);
      
      try {
        await saveData(USERNAME_KEY, trimmedUsername);
        Alert.alert("Success", "Username saved successfully!");
      } catch (error) {
        console.error("Error saving username:", error);
        Alert.alert("Error", "Failed to save username");
      }
    } else {
      Alert.alert("Error", "Username cannot be empty");
    }
  };

  const handleCancel = () => {
    setTempUsername("");
    setIsEditing(false);
  };

  // Get initials for avatar
  const getInitials = () => {
    if (!username) return "?";
    const names = username.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={[styles.title, { color: currentTheme.accentColor }]}>Account</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { backgroundColor: currentTheme.cardBackground }]}>
            {username ? (
              <Text style={[styles.initialsText, { color: currentTheme.accentColor }]}>
                {getInitials()}
              </Text>
            ) : (
              <MaterialIcons name="person" size={60} color={currentTheme.accentColor} />
            )}
          </View>
          <Text style={styles.photoHint}>Profile photo coming soon</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Username</Text>
          
          {!isEditing ? (
            <View style={[styles.displayContainer, { backgroundColor: currentTheme.cardBackground }]}>
              <Text style={[styles.usernameText, { color: currentTheme.accentColor }]}>
                {username || "No username set"}
              </Text>
              <Pressable style={[styles.editBtn, { backgroundColor: currentTheme.backgroundColor }]} onPress={handleEdit}>
                <Ionicons name="pencil" size={20} color={currentTheme.accentColor} />
                <Text style={[styles.editBtnText, { color: currentTheme.accentColor }]}>
                  {username ? "Edit" : "Add Username"}
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Enter username"
                placeholderTextColor="#999"
                value={tempUsername}
                onChangeText={setTempUsername}
                style={styles.input}
                mode="outlined"
                outlineColor={currentTheme.cardBackground}
                activeOutlineColor={currentTheme.accentColor}
                textColor={currentTheme.accentColor}
                autoFocus
              />
              <View style={styles.buttonRow}>
                <Pressable style={[styles.cancelBtn, { backgroundColor: currentTheme.cardBackground }]} onPress={handleCancel}>
                  <Text style={[styles.cancelBtnText, { color: currentTheme.accentColor }]}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.saveBtn, { backgroundColor: currentTheme.cardBackground }]} onPress={handleSave}>
                  <Text style={[styles.saveBtnText, { color: currentTheme.accentColor }]}>Save</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
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
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 12,
  },
  initialsText: {
    fontSize: 48,
    fontWeight: "800",
  },
  photoHint: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  displayContainer: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  editBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  editContainer: {
    gap: 15,
  },
  input: {
    backgroundColor: "#1a1a1a",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
  },
  cancelBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
});