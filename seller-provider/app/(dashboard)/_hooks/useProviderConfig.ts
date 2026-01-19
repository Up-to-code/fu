/**
 * useProviderConfig Hook
 * Gets filtered navigation routes based on provider configuration
 */

import { useMemo } from "react";
import { useProvider } from "../_context/ProviderContext";
import { usePermissions } from "./usePermissions";
import { getNavigationRoutes, getGroupedNavigationRoutes } from "@/config/providers";
import type { NavigationRoute } from "@/types/provider";

/**
 * Hook to get filtered navigation routes
 */
export function useProviderConfig() {
    const { provider } = useProvider();
    const { getUserPermissions } = usePermissions();
    const permissions = getUserPermissions();

    const routes = useMemo(() => {
        if (!provider) {
            return [];
        }

        return getNavigationRoutes(
            provider.providerType,
            provider.entityType,
            permissions
        );
    }, [provider, permissions]);

    const groupedRoutes = useMemo(() => {
        if (!provider) {
            return { main: [], organization: [], account: [] };
        }

        return getGroupedNavigationRoutes(
            provider.providerType,
            provider.entityType,
            permissions
        );
    }, [provider, permissions]);

    return {
        routes,
        groupedRoutes,
        mainRoutes: groupedRoutes.main,
        organizationRoutes: groupedRoutes.organization,
        accountRoutes: groupedRoutes.account,
    };
}
