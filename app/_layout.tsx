import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Welcome", headerShown: false }}
      />
      <Stack.Screen
        name="collectingInfo"
        options={{ title: "CollectInfoFromUser", headerShown: false }}
      />
    </Stack>
  );
}
