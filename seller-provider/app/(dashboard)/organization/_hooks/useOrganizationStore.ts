import { create } from "zustand";
import { mockOrganization, teamMembers as initialTeamMembers } from "@/data";
import { Permission } from "@/lib/permissions";

export type Organization = typeof mockOrganization;
export type TeamMember = typeof initialTeamMembers[number] & {
    customPermissions?: Permission[];
};

type OrganizationStore = {
    organization: Organization;
    teamMembers: TeamMember[];
    
    // Actions
    updateOrganization: (updates: Partial<Organization>) => void;
    addTeamMember: (member: TeamMember) => void;
    updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
    removeTeamMember: (id: string) => void;
};

export const useOrganizationStore = create<OrganizationStore>((set) => ({
    organization: mockOrganization,
    teamMembers: initialTeamMembers,
    
    updateOrganization: (updates) => set((state) => ({
        organization: { ...state.organization, ...updates },
    })),
    
    addTeamMember: (member) => set((state) => ({
        teamMembers: [...state.teamMembers, member],
    })),
    
    updateTeamMember: (id, updates) => set((state) => ({
        teamMembers: state.teamMembers.map((m) =>
            m.id === id ? { ...m, ...updates } : m
        ),
    })),
    
    removeTeamMember: (id) => set((state) => ({
        teamMembers: state.teamMembers.filter((m) => m.id !== id),
    })),
}));
