"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/lib/auth/hooks";

export function useAccountProfile() {
  const { user, isAuthenticated } = useAuth();
  const profile = useQuery(api.users.getUserProfile, user?.id ? { userId: user.id } : "skip");
  const update = useMutation(api.users.updateUserProfile);
  return { isAuthenticated, user, profile, update };
}
