import { create } from "zustand";
import { mockUser, mockOrganization } from "@/data";

export type UserSettings = typeof mockUser;
export type OrganizationSettings = typeof mockOrganization;

type SettingsStore = {
    user: UserSettings;
    organization: OrganizationSettings;
    
    // Actions
    updateUser: (updates: Partial<UserSettings>) => void;
    updateOrganization: (updates: Partial<OrganizationSettings>) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
    user: mockUser,
    organization: mockOrganization,
    
    updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates },
    })),
    
    updateOrganization: (updates) => set((state) => ({
        organization: { ...state.organization, ...updates },
    })),
}));
