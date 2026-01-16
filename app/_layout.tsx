import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
   <Stack.Screen name="/index"/>
   <Stack.Screen name="/auth"/>
   <Stack.Screen name="/dashboard"/>
   <Stack.Screen name="/notes" options={{title:"Notes"}}/>
   <Stack.Screen name="/calendarcheck" options={{title:"Calendarcheck"}}/>
   <Stack.Screen name="/waterintake" options={{title:"WaterCheckList"}}/>
   <Stack.Screen name="/overview" options={{title:"Overview"}}/>
    </Stack>
  );
}
