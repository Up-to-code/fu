import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";

export function useProviderServices(providerId?: string) {
  return useQuery(
    api.services.getServices,
    providerId ? { providerId } : "skip"
  );
}

export function useCreateService() {
  return useMutation(api.services.createService);
}

export function useUpdateService() {
  return useMutation(api.services.updateService);
}

export function useDeleteService() {
  return useMutation(api.services.deleteService);
}
