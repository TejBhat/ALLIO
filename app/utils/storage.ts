// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const KEYS = {
  WATER_INTAKE: 'water_intake',
  WATER_DATE: 'water_date',
  NOTES: 'notes',
  TASKS: 'tasks',
  STREAK: 'streak',
  LAST_ACTIVE_DATE: 'last_active_date',
};

// Generic Storage Functions
export const saveData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

// Water Intake Functions
export const saveWaterIntake = async (glassCount: number) => {
  const today = new Date().toDateString();
  await saveData(KEYS.WATER_INTAKE, glassCount);
  await saveData(KEYS.WATER_DATE, today);
};

export const getWaterIntake = async () => {
  const today = new Date().toDateString();
  const savedDate = await getData(KEYS.WATER_DATE);
  
  // Reset if it's a new day
  if (savedDate !== today) {
    await saveWaterIntake(0);
    return 0;
  }
  
  const count = await getData(KEYS.WATER_INTAKE);
  return count || 0;
};

// Notes Functions
export const saveNotes = async (notes: any[]) => {
  await saveData(KEYS.NOTES, notes);
};

export const getNotes = async () => {
  const notes = await getData(KEYS.NOTES);
  return notes || [];
};

// Tasks Functions
export const saveTasks = async (tasks: any[]) => {
  await saveData(KEYS.TASKS, tasks);
};

export const getTasks = async () => {
  const tasks = await getData(KEYS.TASKS);
  return tasks || [];
};

// Streak Functions
export const updateStreak = async () => {
  const today = new Date().toDateString();
  const lastActiveDate = await getData(KEYS.LAST_ACTIVE_DATE);
  const currentStreak = await getData(KEYS.STREAK) || 0;
  
  if (!lastActiveDate) {
    // First time user
    await saveData(KEYS.STREAK, 1);
    await saveData(KEYS.LAST_ACTIVE_DATE, today);
    return 1;
  }
  
  const lastDate = new Date(lastActiveDate);
  const todayDate = new Date(today);
  const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Same day, no change
    return currentStreak;
  } else if (diffDays === 1) {
    // Consecutive day, increment streak
    const newStreak = currentStreak + 1;
    await saveData(KEYS.STREAK, newStreak);
    await saveData(KEYS.LAST_ACTIVE_DATE, today);
    return newStreak;
  } else {
    // Streak broken, reset to 1
    await saveData(KEYS.STREAK, 1);
    await saveData(KEYS.LAST_ACTIVE_DATE, today);
    return 1;
  }
};

export const getStreak = async () => {
  const streak = await getData(KEYS.STREAK);
  return streak || 0;
};