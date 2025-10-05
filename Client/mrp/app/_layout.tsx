import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="screens/searchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/filterScreen" options={{ title: 'Filter Events' }} />
    </Stack>
  );
}
