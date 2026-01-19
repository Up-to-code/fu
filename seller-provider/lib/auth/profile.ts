/**
 * User Profile Sync Utilities
 * Functions to sync Better Auth users with Convex userProfiles table
 */

"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "./hooks";

/**
 * Hook to sync current user profile with Convex
 * Creates profile if it doesn't exist, updates if it does
 */
export function useSyncUserProfile() {
  const { user } = useAuth();
  const updateUserProfile = useMutation(api.users.updateUserProfile);

  const syncProfile = async () => {
    if (!user) {
      return { success: false, error: "No user authenticated" };
    }

    try {
      await updateUserProfile({
        userId: user.id,
        name: user.name || undefined,
        email: user.email || undefined,
        role: "customer", // Default role
      });

      return { success: true };
    } catch (error: any) {
      console.error("Failed to sync user profile:", error);
      return { success: false, error: error.message };
    }
  };

  return { syncProfile };
}
