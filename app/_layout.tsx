import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",               // remove text
        headerBackTitleVisible: false, // hide back button label (iOS)
      }}
    />
  );
}
