import { Stack } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="/index"/>
        <Stack.Screen name="/dashboard"/>
        <Stack.Screen name="/notes" options={{title:"Notes"}}/>
        <Stack.Screen name="/calendarcheck" options={{title:"Calendarcheck"}}/>
        <Stack.Screen name="/waterintake" options={{title:"WaterCheckList"}}/>
        <Stack.Screen name="/overview" options={{title:"Overview"}}/>
        <Stack.Screen name="/about" options={{title:"About ALLIO"}}/>
        <Stack.Screen name="/account" options={{title:"Account"}}/>
      </Stack>
    </ThemeProvider>
  );
}
