import { useSettingsStore } from "./useSettingsStore";

/**
 * Hook to get user settings
 */
export function useUserSettings() {
    const user = useSettingsStore((state) => state.user);
    const updateUser = useSettingsStore((state) => state.updateUser);
    
    return {
        user,
        updateUser,
    };
}

/**
 * Hook to get organization settings
 */
export function useOrganizationSettings() {
    const organization = useSettingsStore((state) => state.organization);
    const updateOrganization = useSettingsStore((state) => state.updateOrganization);
    
    return {
        organization,
        updateOrganization,
    };
}
