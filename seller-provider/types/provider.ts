/**
 * Provider Types - What kind of business
 */
export type ProviderType = 
    | 'furniture_seller';    // Sells furniture/products

/**
 * Entity Types - Individual or Organization
 */
export type EntityType = 
    | 'individual'          // A person (individual seller)
    | 'organization';       // A company/organization

/**
 * Provider Configuration Interface
 */
export interface ProviderConfig {
    id: string;
    providerType: ProviderType;
    entityType: EntityType;
    name: string;
    businessName?: string;
    // Individual fields
    firstName?: string;
    lastName?: string;
    // Organization fields
    commercialRegistration?: string;
    taxId?: string;
    // Convex reference
    userId: string;  // Links to userProfiles.userId
}

/**
 * Navigation Route Configuration
 */
export interface NavigationRoute {
    id: string;
    label: string;
    labelEn?: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    permission?: string;
    providerTypes?: ProviderType[];    // Show only for these types
    entityTypes?: EntityType[];       // Show only for these entity types
    section?: 'main' | 'organization' | 'account';
}
