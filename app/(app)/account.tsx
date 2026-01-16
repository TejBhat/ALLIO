import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";

export default function AccountScreen() {
  const { currentTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState("");

  // Load username on mount (you can add AsyncStorage here later)
  useEffect(() => {
    // For now, check if username exists in state or load from storage
    // You can add AsyncStorage.getItem('username') here later
  }, []);

  const handleEdit = () => {
    setTempUsername(username);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setIsEditing(false);
      // You can add AsyncStorage.setItem('username', tempUsername.trim()) here later
      Alert.alert("Success", "Username saved successfully!");
    } else {
      Alert.alert("Error", "Username cannot be empty");
    }
  };

  const handleCancel = () => {
    setTempUsername("");
    setIsEditing(false);
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

        {/* Placeholder for photo section - can be added later */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Profile Photo</Text>
          <Text style={styles.comingSoon}>Coming soon</Text>
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
  comingSoon: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});
