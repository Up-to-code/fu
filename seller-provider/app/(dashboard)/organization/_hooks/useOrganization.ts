import { useOrganizationStore } from "./useOrganizationStore";

/**
 * Hook to get organization data
 */
export function useOrganization() {
    const organization = useOrganizationStore((state) => state.organization);
    const updateOrganization = useOrganizationStore((state) => state.updateOrganization);
    
    return {
        organization,
        updateOrganization,
    };
}

/**
 * Hook to get team members
 */
export function useTeamMembers() {
    const teamMembers = useOrganizationStore((state) => state.teamMembers);
    return teamMembers;
}

/**
 * Hook for team member actions
 */
export function useTeamMemberActions() {
    const addTeamMember = useOrganizationStore((state) => state.addTeamMember);
    const updateTeamMember = useOrganizationStore((state) => state.updateTeamMember);
    const removeTeamMember = useOrganizationStore((state) => state.removeTeamMember);
    
    return {
        addTeamMember,
        updateTeamMember,
        removeTeamMember,
    };
}
