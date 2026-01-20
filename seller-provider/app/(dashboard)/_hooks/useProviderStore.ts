/**
 * useProviderStore
 * Zustand store for provider state management
 */

import { create } from "zustand";
import type { ProviderConfig, ProviderType } from "@/types/provider";

interface ProviderStore {
    provider: ProviderConfig | null;
    setProvider: (provider: ProviderConfig | null) => void;
    updateProviderType: (type: ProviderType) => void;
    reset: () => void;
}

export const useProviderStore = create<ProviderStore>((set) => ({
    provider: null,
    
    setProvider: (provider) => set({ provider }),
    
    updateProviderType: (type) => set((state) => {
        if (!state.provider) return state;
        return {
            provider: {
                ...state.provider,
                providerType: type,
            },
        };
    }),
    
    reset: () => set({ provider: null }),
}));
