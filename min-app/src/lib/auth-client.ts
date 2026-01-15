import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { expoClient } from '@better-auth/expo/client';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_CONVEX_SITE_URL,
    plugins: [
        expoClient({
            scheme: Constants.expoConfig?.scheme as string,
            storagePrefix: Constants.expoConfig?.scheme as string,
            storage: SecureStore,
        }),
        convexClient(),
    ],
});

/**
 * Sign in with Google OAuth
 * Opens the Google OAuth flow in the system browser
 */
export const signInWithGoogle = async () => {
    const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/(tabs)/home", // Redirect to home after successful auth
    });

    if (result.error) {
        throw result.error;
    }

    return result.data;
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
    await authClient.signOut();
};
