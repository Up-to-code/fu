/**
 * Provider Configuration System
 * Defines navigation routes and provider type configurations
 */

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    Building2,
    Layers,
    BarChart3,
    HelpCircle,
    Bell,
} from "lucide-react";
import { Permission } from "@/lib/permissions";
import type { NavigationRoute, ProviderType, EntityType } from "@/types/provider";

/**
 * All navigation routes with their configurations
 */
export const allNavigationRoutes: NavigationRoute[] = [
    // Base routes (all providers)
    {
        id: 'dashboard',
        label: 'لوحة التحكم',
        labelEn: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        permission: Permission.VIEW_DASHBOARD,
        section: 'main',
    },
    {
        id: 'orders',
        label: 'الطلبات',
        labelEn: 'Orders',
        icon: ShoppingCart,
        href: '/orders',
        permission: Permission.VIEW_ORDERS,
        section: 'main',
    },
    {
        id: 'analytics',
        label: 'التحليلات',
        labelEn: 'Analytics',
        icon: BarChart3,
        href: '/analytics',
        permission: Permission.VIEW_ANALYTICS,
        section: 'main',
    },
    
    // Product routes (furniture_seller only)
    {
        id: 'products',
        label: 'المنتجات',
        labelEn: 'Products',
        icon: Package,
        href: '/products',
        permission: Permission.VIEW_PRODUCTS,
        providerTypes: ['furniture_seller'],
        section: 'main',
    },
    {
        id: 'categories',
        label: 'التصنيفات',
        labelEn: 'Categories',
        icon: Layers,
        href: '/categories',
        permission: Permission.VIEW_CATEGORIES,
        providerTypes: ['furniture_seller'],
        section: 'main',
    },
    
    // Organization routes (organization entity only)
    {
        id: 'organization',
        label: 'منشأتي',
        labelEn: 'Organization',
        icon: Building2,
        href: '/organization',
        permission: Permission.VIEW_ORGANIZATION,
        entityTypes: ['organization'],
        section: 'organization',
    },
    
    // Account routes (all providers)
    {
        id: 'settings',
        label: 'الإعدادات',
        labelEn: 'Settings',
        icon: Settings,
        href: '/settings',
        permission: Permission.VIEW_SETTINGS,
        section: 'account',
    },
    {
        id: 'notifications',
        label: 'الإشعارات',
        labelEn: 'Notifications',
        icon: Bell,
        href: '/notifications',
        permission: Permission.VIEW_SETTINGS,
        section: 'account',
    },
    {
        id: 'help',
        label: 'المساعدة',
        labelEn: 'Help',
        icon: HelpCircle,
        href: '/help',
        section: 'account',
    },
];

/**
 * Get filtered navigation routes based on provider configuration
 */
export function getNavigationRoutes(
    providerType: ProviderType,
    entityType: EntityType,
    userPermissions?: Permission[]
): NavigationRoute[] {
    return allNavigationRoutes.filter(route => {
        // Filter by provider type
        if (route.providerTypes && !route.providerTypes.includes(providerType)) {
            return false;
        }
        
        // Filter by entity type
        if (route.entityTypes && !route.entityTypes.includes(entityType)) {
            return false;
        }
        
        // Filter by permissions
        if (route.permission && userPermissions) {
            if (!userPermissions.includes(route.permission as Permission)) {
                return false;
            }
        }
        
        return true;
    });
}

/**
 * Get routes grouped by section
 */
export function getGroupedNavigationRoutes(
    providerType: ProviderType,
    entityType: EntityType,
    userPermissions?: Permission[]
): Record<string, NavigationRoute[]> {
    const routes = getNavigationRoutes(providerType, entityType, userPermissions);
    
    const grouped: Record<string, NavigationRoute[]> = {
        main: [],
        organization: [],
        account: [],
    };
    
    routes.forEach(route => {
        const section = route.section || 'main';
        if (!grouped[section]) {
            grouped[section] = [];
        }
        grouped[section].push(route);
    });
    
    return grouped;
}

/**
 * Get a single route by ID
 */
export function getRouteById(routeId: string): NavigationRoute | undefined {
    return allNavigationRoutes.find(route => route.id === routeId);
}
