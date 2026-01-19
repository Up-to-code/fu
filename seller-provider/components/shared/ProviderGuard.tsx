"use client";

/**
 * Provider Guard Component
 * Conditionally renders content based on provider type, entity type
 */

import { ReactNode } from "react";
import { useProvider } from "@/app/(dashboard)/_context/ProviderContext";
import type { ProviderType, EntityType } from "@/types/provider";

interface ProviderGuardProps {
    children: ReactNode;
    providerTypes?: ProviderType[];
    entityTypes?: EntityType[];
    fallback?: ReactNode;
}

export function ProviderGuard({
    children,
    providerTypes,
    entityTypes,
    fallback,
}: ProviderGuardProps) {
    const { provider, isLoading } = useProvider();

    if (isLoading) {
        return null; // Or return a loading state
    }

    if (!provider) {
        return fallback || null;
    }

    // Check provider type
    if (providerTypes && !providerTypes.includes(provider.providerType)) {
        return fallback || null;
    }

    // Check entity type
    if (entityTypes && !entityTypes.includes(provider.entityType)) {
        return fallback || null;
    }

    return <>{children}</>;
}
