import { View, Text, StyleSheet, Pressable, ScrollView, Alert, TextInput, Modal, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { Calendar } from 'react-native-calendars';
import { saveData, getData } from "../utils/storage";

interface DayData {
  marked: boolean;
  note: string;
  tasks: string[];
}

interface MarkedDates {
  [date: string]: {
    marked: boolean;
    dotColor: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

const CALENDAR_DATA_KEY = 'calendar_day_data';

export default function CalendarCheckScreen() {
  const { currentTheme } = useTheme();
  const [selectedDate, setSelectedDate] = useState('');
  const [dayData, setDayData] = useState<{ [date: string]: DayData }>({});
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [taskText, setTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  // Load calendar data on mount
  useEffect(() => {
    loadCalendarData();
  }, []);

  const loadCalendarData = async () => {
    try {
      const savedData = await getData(CALENDAR_DATA_KEY);
      if (savedData) {
        setDayData(savedData);
      }
    } catch (error) {
      console.error("Error loading calendar data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCalendarData = async (data: { [date: string]: DayData }) => {
    try {
      await saveData(CALENDAR_DATA_KEY, data);
    } catch (error) {
      console.error("Error saving calendar data:", error);
      Alert.alert("Error", "Failed to save calendar data");
    }
  };

  // Convert dayData to markedDates format for calendar
  const getMarkedDates = (): MarkedDates => {
    const marked: MarkedDates = {};
    
    Object.keys(dayData).forEach(date => {
      if (dayData[date].marked || dayData[date].note || dayData[date].tasks.length > 0) {
        marked[date] = {
          marked: true,
          dotColor: currentTheme.accentColor,
        };
      }
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: currentTheme.cardBackground,
      };
    }

    return marked;
  };

  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDate(date);
    
    // Initialize day data if it doesn't exist
    if (!dayData[date]) {
      const newData = {
        ...dayData,
        [date]: { marked: false, note: '', tasks: [] }
      };
      setDayData(newData);
    }
  };

  const handleDayLongPress = (day: any) => {
    const date = day.dateString;
    setSelectedDate(date);
    setNoteText(dayData[date]?.note || '');
    setShowNoteModal(true);
  };

  const toggleMark = async () => {
    if (!selectedDate) return;

    const newData = {
      ...dayData,
      [selectedDate]: {
        ...dayData[selectedDate],
        marked: !dayData[selectedDate]?.marked,
        note: dayData[selectedDate]?.note || '',
        tasks: dayData[selectedDate]?.tasks || []
      }
    };

    setDayData(newData);
    await saveCalendarData(newData);
  };

  const saveNote = async () => {
    if (!selectedDate) return;

    const newData = {
      ...dayData,
      [selectedDate]: {
        ...dayData[selectedDate],
        note: noteText,
        marked: dayData[selectedDate]?.marked || false,
        tasks: dayData[selectedDate]?.tasks || []
      }
    };

    setDayData(newData);
    await saveCalendarData(newData);

    setShowNoteModal(false);
    setNoteText('');
  };

  const addTask = async () => {
    if (!selectedDate || !taskText.trim()) return;

    const currentTasks = dayData[selectedDate]?.tasks || [];
    
    const newData = {
      ...dayData,
      [selectedDate]: {
        ...dayData[selectedDate],
        tasks: [...currentTasks, taskText],
        marked: dayData[selectedDate]?.marked || false,
        note: dayData[selectedDate]?.note || ''
      }
    };

    setDayData(newData);
    await saveCalendarData(newData);

    setTaskText('');
  };

  const deleteTask = async (taskIndex: number) => {
    if (!selectedDate) return;

    const updatedTasks = dayData[selectedDate].tasks.filter((_, index) => index !== taskIndex);
    
    const newData = {
      ...dayData,
      [selectedDate]: {
        ...dayData[selectedDate],
        tasks: updatedTasks
      }
    };

    setDayData(newData);
    await saveCalendarData(newData);
  };

  const clearDateData = async () => {
    if (!selectedDate) return;

    Alert.alert(
      "Clear Date Data",
      "Are you sure you want to clear all data for this date?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            const newData = { ...dayData };
            delete newData[selectedDate];
            setDayData(newData);
            await saveCalendarData(newData);
            setSelectedDate('');
          }
        }
      ]
    );
  };

  const selectedDayData = selectedDate ? dayData[selectedDate] : null;

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={currentTheme.accentColor} />
        <Text style={{ color: currentTheme.accentColor, marginTop: 16, fontSize: 16 }}>
          Loading calendar...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </Pressable>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.accentColor }]}>Calendar Check</Text>
          <Text style={styles.subtitle}>Tap to select • Long press to add notes</Text>
        </View>

        {/* Calendar */}
        <View style={[styles.calendarContainer, { backgroundColor: currentTheme.cardBackground }]}>
          <Calendar
            current={today}
            onDayPress={handleDayPress}
            onDayLongPress={handleDayLongPress}
            markedDates={getMarkedDates()}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: currentTheme.accentColor,
              selectedDayBackgroundColor: currentTheme.cardBackground,
              selectedDayTextColor: currentTheme.accentColor,
              todayTextColor: '#ffd84d',
              dayTextColor: '#ffd84d',
              textDisabledColor: '#666',
              dotColor: currentTheme.accentColor,
              selectedDotColor: currentTheme.accentColor,
              arrowColor: currentTheme.accentColor,
              monthTextColor: currentTheme.accentColor,
              textDayFontWeight: '500',
              textMonthFontWeight: '700',
              textDayHeaderFontWeight: '600',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>

        {/* Selected Date Info */}
        {selectedDate && (
          <View style={styles.selectedDateSection}>
            <View style={styles.dateHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.selectedDateTitle, { color: currentTheme.accentColor }]}>
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
                {selectedDate === today && (
                  <Text style={styles.todayBadge}>Today</Text>
                )}
              </View>

              <View style={styles.dateActions}>
                <Pressable 
                  style={[styles.markButton, selectedDayData?.marked && styles.markButtonActive]}
                  onPress={toggleMark}
                >
                  <Ionicons 
                    name={selectedDayData?.marked ? "checkmark-circle" : "checkmark-circle-outline"} 
                    size={28} 
                    color={selectedDayData?.marked ? currentTheme.accentColor : "#999"} 
                  />
                </Pressable>

                {(selectedDayData?.marked || selectedDayData?.note || (selectedDayData?.tasks && selectedDayData.tasks.length > 0)) && (
                  <Pressable 
                    style={styles.clearButton}
                    onPress={clearDateData}
                  >
                    <Ionicons name="trash-outline" size={24} color="#DC2626" />
                  </Pressable>
                )}
              </View>
            </View>

            {/* Note Section */}
            <View style={[styles.noteSection, { backgroundColor: currentTheme.cardBackground }]}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="note" size={20} color={currentTheme.accentColor} />
                <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Note</Text>
              </View>
              
              {selectedDayData?.note ? (
                <Pressable onPress={() => {
                  setNoteText(selectedDayData.note);
                  setShowNoteModal(true);
                }}>
                  <Text style={styles.noteText}>{selectedDayData.note}</Text>
                </Pressable>
              ) : (
                <Pressable 
                  style={styles.addNoteButton}
                  onPress={() => setShowNoteModal(true)}
                >
                  <Ionicons name="add-circle-outline" size={20} color="#999" />
                  <Text style={styles.addNoteText}>Tap to add note</Text>
                </Pressable>
              )}
            </View>

            {/* Tasks Section */}
            <View style={[styles.tasksSection, { backgroundColor: currentTheme.cardBackground }]}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="checklist" size={20} color={currentTheme.accentColor} />
                <Text style={[styles.sectionTitle, { color: currentTheme.accentColor }]}>Tasks</Text>
                {selectedDayData?.tasks && selectedDayData.tasks.length > 0 && (
                  <Text style={styles.taskCount}>({selectedDayData.tasks.length})</Text>
                )}
              </View>

              <View style={styles.addTaskContainer}>
                <TextInput
                  style={[styles.taskInput, { color: currentTheme.accentColor }]}
                  placeholder="Add a task..."
                  placeholderTextColor="#666"
                  value={taskText}
                  onChangeText={setTaskText}
                  onSubmitEditing={addTask}
                  returnKeyType="done"
                />
                <Pressable 
                  style={[styles.addTaskBtn, { opacity: taskText.trim() ? 1 : 0.5 }]}
                  onPress={addTask}
                  disabled={!taskText.trim()}
                >
                  <Ionicons name="add" size={24} color={currentTheme.accentColor} />
                </Pressable>
              </View>

              {selectedDayData?.tasks && selectedDayData.tasks.length > 0 ? (
                <View style={styles.tasksList}>
                  {selectedDayData.tasks.map((task, index) => (
                    <View key={index} style={styles.taskItem}>
                      <Text style={styles.taskText}>• {task}</Text>
                      <Pressable onPress={() => deleteTask(index)}>
                        <MaterialIcons name="close" size={20} color="#DC2626" />
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyTasksText}>No tasks for this day</Text>
              )}
            </View>
          </View>
        )}

        {!selectedDate && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={80} color="#666" />
            <Text style={styles.emptyTitle}>Select a Date</Text>
            <Text style={styles.emptySubtitle}>Tap any date to view or add details</Text>
          </View>
        )}
      </ScrollView>

      {/* Note Modal */}
      <Modal
        visible={showNoteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNoteModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowNoteModal(false)}
        >
          <Pressable 
            style={[styles.modalContent, { backgroundColor: currentTheme.cardBackground }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: currentTheme.accentColor }]}>
                {noteText ? 'Edit Note' : 'Add Note'}
              </Text>
              <Pressable onPress={() => {
                setShowNoteModal(false);
                setNoteText('');
              }}>
                <Ionicons name="close" size={24} color={currentTheme.accentColor} />
              </Pressable>
            </View>

            <TextInput
              style={[styles.noteInput, { color: currentTheme.accentColor }]}
              placeholder="Write your note here..."
              placeholderTextColor="#666"
              value={noteText}
              onChangeText={setNoteText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoFocus
            />

            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => {
                  setShowNoteModal(false);
                  setNoteText('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>

              <Pressable 
                style={[styles.modalBtn, styles.saveBtn, { backgroundColor: currentTheme.accentColor }]}
                onPress={saveNote}
              >
                <Text style={styles.saveBtnText}>Save Note</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },
  calendarContainer: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  selectedDateSection: {
    gap: 16,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedDateTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  todayBadge: {
    fontSize: 12,
    color: "#ffd84d",
    fontWeight: "600",
  },
  dateActions: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  markButton: {
    padding: 4,
  },
  markButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  clearButton: {
    padding: 4,
  },
  noteSection: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  taskCount: {
    fontSize: 14,
    color: "#999",
    marginLeft: 4,
  },
  noteText: {
    color: "#ffeaa7",
    fontSize: 15,
    lineHeight: 22,
  },
  addNoteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  addNoteText: {
    color: "#999",
    fontSize: 14,
  },
  tasksSection: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  taskInput: {
    flex: 1,
    backgroundColor: "#5a3400",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
  },
  addTaskBtn: {
    backgroundColor: "#5a3400",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tasksList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  taskText: {
    flex: 1,
    color: "#ffeaa7",
    fontSize: 14,
  },
  emptyTasksText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#666",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  noteInput: {
    backgroundColor: "#5a3400",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#5a3400",
  },
  saveBtn: {
    // backgroundColor set dynamically
  },
  cancelBtnText: {
    color: "#ffeaa7",
    fontSize: 16,
    fontWeight: "600",
  },
  saveBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
});