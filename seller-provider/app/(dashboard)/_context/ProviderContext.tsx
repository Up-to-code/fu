"use client";

/**
 * Provider Context
 * Manages provider configuration and state throughout the dashboard
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { ProviderConfig, ProviderType, EntityType } from "@/types/provider";
import { useCurrentUser } from "../_hooks/useCurrentUser";

interface ProviderContextValue {
    provider: ProviderConfig | null;
    isLoading: boolean;
    // Helper methods
    isIndividual: () => boolean;
    isOrganization: () => boolean;
    // Update methods
    updateEntityType: (type: EntityType) => void;
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
    const [localProvider, setLocalProvider] = useState<ProviderConfig | null>(null);
    
    // Fetch provider config from Convex
    const convexProviderConfig = useQuery(
        (api as any).providers?.getProviderConfig as any,
        currentUser?.id ? { userId: currentUser.id } : "skip"
    );

    const updateProviderConfigMutation = useMutation((api as any).providers?.updateProviderConfig as any);

    // Update local state when Convex data changes
    useEffect(() => {
        // Use functional update or check equality to avoid loops if convexProviderConfig returns new objects
        // However, Convex queries usually stable. 
        // The issue might be currentUser changing or this effect running too often.
        if (convexProviderConfig) {
            setLocalProvider(prev => {
                // Simple equality check to prevent re-render if same
                if (JSON.stringify(prev) === JSON.stringify(convexProviderConfig)) return prev;
                return convexProviderConfig;
            });
        } else if (convexProviderConfig === null && currentUser) {
            setLocalProvider(null);
        }
    }, [convexProviderConfig, currentUser]);

    const provider = localProvider;
    const isLoading = convexProviderConfig === undefined;

    const isIndividual = (): boolean => {
        return provider?.entityType === 'individual';
    };

    const isOrganization = (): boolean => {
        return provider?.entityType === 'organization';
    };

    const updateEntityType = async (type: EntityType): Promise<void> => {
        if (provider && currentUser) {
            try {
                await updateProviderConfigMutation({
                    userId: currentUser.id,
                    providerType: provider.providerType,
                    entityType: type,
                });
                // State will update via useQuery
            } catch (error) {
                console.error("Failed to update entity type:", error);
            }
        }
    };

    const value: ProviderContextValue = {
        provider,
        isLoading,
        isIndividual,
        isOrganization,
        updateEntityType,
    };

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
