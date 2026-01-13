import { Cairo_400Regular, Cairo_500Medium, Cairo_700Bold, useFonts } from "@expo-google-fonts/cairo";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, I18nManager, View } from "react-native";
import { AuthProvider } from "../src/context/AuthContext";
import { useAuthGuard } from "../src/hooks/useAuthGuard";
import "./global.css";

// Enforce RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function RootLayoutNav() {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      // Hide splash screen
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
