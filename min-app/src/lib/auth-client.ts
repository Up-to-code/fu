import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: "http://192.168.1.75:3000", // Update this to your local IP if testing on device
    disableDefaultStore: true,
    storage: {
        async getItem(key: string) {
            return SecureStore.getItemAsync(key);
        },
        async setItem(key: string, value: string) {
            return SecureStore.setItemAsync(key, value);
        },
        async removeItem(key: string) {
            return SecureStore.deleteItemAsync(key);
        },
    },
});
