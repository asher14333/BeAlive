import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
<<<<<<< HEAD:frontend/app/_layout.tsx
import { AppProvider } from "../context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
=======

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
>>>>>>> dde7754c8f89a27357d3dde7019e00df70e5fb19:app/_layout.tsx
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="create-challenge" 
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
<<<<<<< HEAD:frontend/app/_layout.tsx
    </AppProvider>
=======
    </>
>>>>>>> dde7754c8f89a27357d3dde7019e00df70e5fb19:app/_layout.tsx
  );
}
