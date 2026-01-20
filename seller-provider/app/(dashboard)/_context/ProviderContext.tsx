"use client";

/**
 * Provider Context
 * Manages provider configuration and state throughout the dashboard
 */

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { ProviderConfig } from "@/types/provider";
import { useCurrentUser } from "../_hooks/useCurrentUser";

interface ProviderContextValue {
    provider: ProviderConfig | null;
    isLoading: boolean;
    // Helper methods
    isIndividual: () => boolean;
    isOrganization: () => boolean;
}

const ProviderContext = createContext<ProviderContextValue | undefined>(undefined);

interface ProviderProviderProps {
    children: ReactNode;
}

/**
 * Provider Provider Component
 * Fetches and provides provider configuration to all dashboard components
 */
export function ProviderProvider({ children }: ProviderProviderProps) {
    const currentUser = useCurrentUser();
    
    // Fetch provider config from Convex
    const convexProviderConfig = useQuery(
        api.providers.getProviderConfig,
        currentUser?.id ? { userId: currentUser.id } : "skip"
    );

    const isLoading = convexProviderConfig === undefined;

    const provider: ProviderConfig | null = useMemo(() => {
        if (convexProviderConfig === undefined) return null;
        if (convexProviderConfig === null) return null;
        return {
            id: String(convexProviderConfig.id),
            providerType: convexProviderConfig.providerType as ProviderConfig["providerType"],
            entityType: convexProviderConfig.entityType as ProviderConfig["entityType"],
            name: convexProviderConfig.name,
            businessName: convexProviderConfig.businessName,
            userId: convexProviderConfig.userId,
        };
    }, [convexProviderConfig]);

    const isIndividual = useCallback((): boolean => {
        return provider?.entityType === "individual";
    }, [provider?.entityType]);

    const isOrganization = useCallback((): boolean => {
        return provider?.entityType === "organization";
    }, [provider?.entityType]);

    const value: ProviderContextValue = useMemo(
        () => ({
            provider,
            isLoading,
            isIndividual,
            isOrganization,
        }),
        [provider, isLoading, isIndividual, isOrganization]
    );

    return (
        <ProviderContext.Provider value={value}>
            {children}
        </ProviderContext.Provider>
    );
}

/**
 * Hook to access provider context
 */
export function useProvider(): ProviderContextValue {
    const context = useContext(ProviderContext);
    if (context === undefined) {
        throw new Error('useProvider must be used within a ProviderProvider');
    }
    return context;
}
