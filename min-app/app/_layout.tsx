import { StrictMode, useEffect, useState, useCallback } from "react";
import { Cairo_400Regular, Cairo_500Medium, Cairo_700Bold, useFonts } from "@expo-google-fonts/cairo";
import { Slot, useRouter, useSegments, useFocusEffect } from "expo-router";
import { ActivityIndicator, I18nManager, StatusBar, View } from "react-native";
import {
  ConvexReactClient,
  ConvexProvider,
} from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import "./global.css";
import { authClient } from "@/src/lib/auth-client";
import { useAuth } from "@/src/hooks/useAuth";
import { initDB } from "@/src/lib/database";

// Enforce RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string, {
  unsavedChangesWarning: false,
});

// Protected routes that require authentication
const PROTECTED_ROUTES = ['account', 'orders', 'checkout'];
// Also protect account tab
const PROTECTED_TABS = ['account'];

function InitialLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments() as string[];
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_700Bold,
  });

  // Initialize SQLite database on mount
  useEffect(() => {
    initDB().catch((error) => {
      console.error('Error initializing database:', error);
    });
  }, []);

  // Function to check and handle route protection
  const checkRouteProtection = useCallback(() => {
    // Wait for both fonts and auth to be ready
    if (isLoading || !fontsLoaded) {
      setIsReady(false);
      return;
    }

    setIsReady(true);

    const inAuthGroup = segments[0] === 'auth';
    const inLanding = segments.length === 0 || segments[0] === 'index';
    const inProtectedRoute = PROTECTED_ROUTES.includes(segments[0]);
    const inProtectedTab = segments[0] === '(tabs)' && PROTECTED_TABS.includes(segments[1]);

    // Handle authenticated users
    if (user) {
      // Redirect authenticated users away from auth/landing pages
      if (inAuthGroup || inLanding) {
        // Use setTimeout to ensure the redirect happens after the auth callback
        setTimeout(() => {
          router.replace('/(tabs)/home');
        }, 100);
        return;
      }
      // If authenticated and on a valid route, allow access
      return;
    }

    // Handle unauthenticated users (guests)
    if (!user) {
      // Redirect guests from protected routes
      if (inProtectedRoute || inProtectedTab) {
        router.replace('/auth/login');
        return;
      }
      // If on landing/auth pages and not authenticated, allow access (stay on page)
      // This handles the OAuth cancellation scenario where user returns to landing page
      return;
    }
  }, [user, isLoading, segments, fontsLoaded, router]);

  // Session-based listener: React to auth state changes in real-time
  // This handles all auth state changes regardless of current route
  useEffect(() => {
    // Only check routes when auth state is ready (not loading)
    if (!isLoading && fontsLoaded) {
      checkRouteProtection();
    }
  }, [user, isLoading, fontsLoaded, checkRouteProtection]);

  // Re-check routes when screen comes into focus
  // This is critical for OAuth callback scenarios:
  // 1. OAuth completed: user becomes authenticated, redirects to home
  // 2. OAuth cancelled: user returns unauthenticated, stays on landing page
  // 3. OAuth pending: waits for auth state to resolve
  useFocusEffect(
    useCallback(() => {
      // Small delay to ensure auth state has updated after OAuth callback
      // This is especially important when returning from browser OAuth flow
      const timer = setTimeout(() => {
        if (!isLoading && fontsLoaded) {
          checkRouteProtection();
        }
      }, 150);

      return () => clearTimeout(timer);
    }, [isLoading, fontsLoaded, checkRouteProtection])
  );

  // Additional effect to handle route segment changes
  // This ensures redirects happen when navigating between routes
  useEffect(() => {
    if (!isLoading && fontsLoaded) {
      checkRouteProtection();
    }
  }, [segments, isLoading, fontsLoaded, checkRouteProtection]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <StrictMode>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ConvexProvider client={convex}>
        <ConvexBetterAuthProvider client={convex} authClient={authClient}>
          <InitialLayout />
        </ConvexBetterAuthProvider>
      </ConvexProvider>
    </StrictMode>
  );
}