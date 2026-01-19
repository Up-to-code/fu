import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

export function useProfile(userId?: string) {
  const profile = useQuery(
    api.users.getUserProfile,
    userId ? { userId } : "skip"
  );
  const update = useMutation(api.users.updateUserProfile);
  return { profile, update };
}

export function useFavoritesCount(userId?: string) {
  return useQuery(
    api.users.getFavoritesCount,
    userId ? { userId } : "skip"
  );
}

export function useOrdersCount(userId?: string) {
  return useQuery(
    api.users.getOrdersCount,
    userId ? { userId } : "skip"
  );
}
