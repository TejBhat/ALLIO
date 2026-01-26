import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet, View, ActivityIndicator } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import { saveNotes, getNotes } from "../utils/storage";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesScreen() {
  const { currentTheme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await getNotes();
      setNotes(savedNotes);
    } catch (error) {
      console.error("Error loading notes:", error);
      Alert.alert("Error", "Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    if (!currentNote.title.trim() && !currentNote.content.trim()) {
      Alert.alert("Empty Note", "Please write something before saving.");
      return;
    }

    try {
      let updatedNotes: Note[];

      if (editingId) {
        // Update existing note
        updatedNotes = notes.map(note =>
          note.id === editingId
            ? { ...note, ...currentNote, updatedAt: new Date().toISOString() }
            : note
        );
      } else {
        // Create new note
        const newNote: Note = {
          id: Date.now().toString(),
          title: currentNote.title || "Untitled",
          content: currentNote.content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        updatedNotes = [newNote, ...notes];
      }

      setNotes(updatedNotes);
      await saveNotes(updatedNotes);

      setCurrentNote({ title: "", content: "" });
      setIsCreating(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving note:", error);
      Alert.alert("Error", "Failed to save note");
    }
  };

  const deleteNote = async (id: string) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updatedNotes = notes.filter(note => note.id !== id);
            setNotes(updatedNotes);
            await saveNotes(updatedNotes);
          } catch (error) {
            console.error("Error deleting note:", error);
            Alert.alert("Error", "Failed to delete note");
          }
        }
      },
    ]);
  };

  const editNote = (note: Note) => {
    setCurrentNote({ title: note.title, content: note.content });
    setEditingId(note.id);
    setIsCreating(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={currentTheme.accentColor} />
        <Text style={{ color: currentTheme.accentColor, marginTop: 16, fontSize: 16 }}>
          Loading notes...
        </Text>
      </View>
    );
  }

  // Create/Edit note view
  if (isCreating) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => {
            setIsCreating(false);
            setCurrentNote({ title: "", content: "" });
            setEditingId(null);
          }}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Text style={[styles.title, { color: currentTheme.accentColor }]}>
            {editingId ? "Edit Note" : "New Note"}
          </Text>
          <Pressable style={[styles.saveBtn, { backgroundColor: currentTheme.cardBackground }]} onPress={saveNote}>
            <Text style={[styles.saveBtnText, { color: currentTheme.accentColor }]}>Save</Text>
          </Pressable>
        </View>

        <TextInput
          placeholder="Title"
          placeholderTextColor={currentTheme.placeholderText}
          textColor={currentTheme.accentColor}
          value={currentNote.title}
          onChangeText={(text) => setCurrentNote({ ...currentNote, title: text })}
          style={[styles.titleInput, { backgroundColor: currentTheme.backgroundColor, color: currentTheme.accentColor }]}
          mode="flat"
          underlineColor="transparent"
          activeUnderlineColor={currentTheme.cardBackground}
        />

        <TextInput
          placeholder="Start writing..."
          placeholderTextColor={currentTheme.placeholderText}
          textColor={currentTheme.accentColor}
          value={currentNote.content}
          onChangeText={(text) => setCurrentNote({ ...currentNote, content: text })}
          multiline
          autoFocus
          style={[styles.contentInput, { backgroundColor: currentTheme.backgroundColor, color: currentTheme.accentColor }]}
          mode="flat"
          underlineColor="transparent"
        />
      </View>
    );
  }

  // Notes list view
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={[styles.title, { color: currentTheme.accentColor }]}>Idea Notes</Text>
        <Pressable style={[styles.addBtn, { backgroundColor: currentTheme.cardBackground }]} onPress={() => setIsCreating(true)}>
          <Ionicons name="add" size={28} color={currentTheme.accentColor} />
        </Pressable>
      </View>

      {notes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={80} color="#999" />
          <Text style={styles.emptyTitle}>No notes yet</Text>
          <Text style={styles.emptySubtitle}>Tap the + button to create your first note</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card style={[styles.noteCard, { backgroundColor: currentTheme.cardBackground }]}>
              <Pressable onPress={() => editNote(item)} style={styles.noteContent}>
                <View style={styles.noteHeader}>
                  <Text style={[styles.noteTitle, { color: currentTheme.accentColor }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Pressable onPress={() => deleteNote(item.id)} style={styles.deleteBtn}>
                    <MaterialIcons name="delete-outline" size={20} color="#DC2626" />
                  </Pressable>
                </View>
                <Text style={[styles.notePreview, { color: currentTheme.accentColor }]} numberOfLines={2}>
                  {item.content}
                </Text>
                <Text style={styles.noteDate}>{formatDate(item.updatedAt)}</Text>
              </Pressable>
            </Card>
          )}
        />
      )}
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
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  addBtn: {
    padding: 8,
    borderRadius: 10,
    elevation: 2,
  },
  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "700",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#666",
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  listContent: {
    padding: 20,
  },
  noteCard: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },
  noteContent: {
    padding: 16,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  deleteBtn: {
    padding: 4,
  },
  notePreview: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
    opacity: 0.8,
  },
  noteDate: {
    fontSize: 12,
    color: "#d4a574",
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: "top",
    marginHorizontal: 20,
    marginBottom: 20,
  },
});