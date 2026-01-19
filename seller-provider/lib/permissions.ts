/**
 * System-wide permissions configuration
 * Defines all permissions and role-based access control
 */

export enum Permission {
    // Products
    VIEW_PRODUCTS = 'view_products',
    CREATE_PRODUCTS = 'create_products',
    EDIT_PRODUCTS = 'edit_products',
    DELETE_PRODUCTS = 'delete_products',
    
    // Orders
    VIEW_ORDERS = 'view_orders',
    EDIT_ORDERS = 'edit_orders',
    MANAGE_ORDERS = 'manage_orders',
    
    // Categories
    VIEW_CATEGORIES = 'view_categories',
    CREATE_CATEGORIES = 'create_categories',
    EDIT_CATEGORIES = 'edit_categories',
    DELETE_CATEGORIES = 'delete_categories',
    
    // Organization
    VIEW_ORGANIZATION = 'view_organization',
    EDIT_ORGANIZATION = 'edit_organization',
    MANAGE_TEAM = 'manage_team',

    // Organizations (admin)
    VIEW_ORGANIZATIONS = 'view_organizations',
    CREATE_ORGANIZATIONS = 'create_organizations',
    EDIT_ORGANIZATIONS = 'edit_organizations',
    DELETE_ORGANIZATIONS = 'delete_organizations',
    
    // Analytics
    VIEW_ANALYTICS = 'view_analytics',
    
    // Settings
    VIEW_SETTINGS = 'view_settings',
    EDIT_SETTINGS = 'edit_settings',
    
    // Dashboard
    VIEW_DASHBOARD = 'view_dashboard',
    
    // Services
    VIEW_SERVICES = 'view_services',
    CREATE_SERVICES = 'create_services',
    EDIT_SERVICES = 'edit_services',
    DELETE_SERVICES = 'delete_services',
    
    // Bookings
    VIEW_BOOKINGS = 'view_bookings',
    MANAGE_BOOKINGS = 'manage_bookings',
    UPDATE_BOOKING_STATUS = 'update_booking_status',
}

export type Role = 'owner' | 'admin' | 'member';

/**
 * Role-permission mapping
 */
const rolePermissions: Record<Role, Permission[]> = {
    owner: Object.values(Permission).filter(p => ![
        Permission.VIEW_ORGANIZATIONS,
        Permission.CREATE_ORGANIZATIONS,
        Permission.EDIT_ORGANIZATIONS,
        Permission.DELETE_ORGANIZATIONS,
    ].includes(p)),
    
    admin: [
        // Products
        Permission.VIEW_PRODUCTS,
        Permission.CREATE_PRODUCTS,
        Permission.EDIT_PRODUCTS,
        Permission.DELETE_PRODUCTS,
        
        // Orders
        Permission.VIEW_ORDERS,
        Permission.EDIT_ORDERS,
        Permission.MANAGE_ORDERS,
        
        // Categories
        Permission.VIEW_CATEGORIES,
        Permission.CREATE_CATEGORIES,
        Permission.EDIT_CATEGORIES,
        Permission.DELETE_CATEGORIES,
        
        // Organization
        Permission.VIEW_ORGANIZATION,
        Permission.EDIT_ORGANIZATION,
        Permission.MANAGE_TEAM,

        // Organizations (admin)
        Permission.VIEW_ORGANIZATIONS,
        Permission.CREATE_ORGANIZATIONS,
        Permission.EDIT_ORGANIZATIONS,
        Permission.DELETE_ORGANIZATIONS,
        
        // Analytics
        Permission.VIEW_ANALYTICS,
        
        // Settings
        Permission.VIEW_SETTINGS,
        Permission.EDIT_SETTINGS,
        
        // Dashboard
        Permission.VIEW_DASHBOARD,
        
        // Services
        Permission.VIEW_SERVICES,
        Permission.CREATE_SERVICES,
        Permission.EDIT_SERVICES,
        Permission.DELETE_SERVICES,
        
        // Bookings
        Permission.VIEW_BOOKINGS,
        Permission.MANAGE_BOOKINGS,
        Permission.UPDATE_BOOKING_STATUS,
    ],
    
    member: [
        // Products
        Permission.VIEW_PRODUCTS,
        
        // Orders
        Permission.VIEW_ORDERS,
        
        // Categories
        Permission.VIEW_CATEGORIES,
        
        // Organization
        Permission.VIEW_ORGANIZATION,
        
        // Analytics
        Permission.VIEW_ANALYTICS,
        
        // Settings
        Permission.VIEW_SETTINGS,
        
        // Dashboard
        Permission.VIEW_DASHBOARD,
        
        // Services (view only)
        Permission.VIEW_SERVICES,
        
        // Bookings (view only)
        Permission.VIEW_BOOKINGS,
    ],
};

/**
 * Page to permission mapping
 */
const pagePermissions: Record<string, Permission> = {
    '/dashboard': Permission.VIEW_DASHBOARD,
    '/products': Permission.VIEW_PRODUCTS,
    '/orders': Permission.VIEW_ORDERS,
    '/categories': Permission.VIEW_CATEGORIES,
    '/organization': Permission.VIEW_ORGANIZATION,
    '/organizations': Permission.VIEW_ORGANIZATIONS,
    '/analytics': Permission.VIEW_ANALYTICS,
    '/settings': Permission.VIEW_SETTINGS,
    '/notifications': Permission.VIEW_SETTINGS, // Same as settings
    '/help': Permission.VIEW_SETTINGS, // Accessible to all authenticated users
    '/services': Permission.VIEW_SERVICES,
    '/bookings': Permission.VIEW_BOOKINGS,
};

/**
 * Get all permissions for a role
 */
export function getUserPermissions(role: Role): Permission[] {
    return rolePermissions[role] || [];
}

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: Role, permission: Permission): boolean {
    const permissions = rolePermissions[role];
    if (!permissions) return false;
    return permissions.includes(permission);
}

/**
 * Check if a role can access a page
 */
export function canAccessPage(role: Role, pagePath: string): boolean {
    const requiredPermission = pagePermissions[pagePath];
    if (!requiredPermission) return true; // Allow access if no permission is defined
    
    return hasPermission(role, requiredPermission);
}

/**
 * Check if a role can perform an action on a resource
 */
export function canPerformAction(role: Role, resource: string, action: string): boolean {
    const permissionName = `${action}_${resource}`.toUpperCase() as keyof typeof Permission;
    const permission = Permission[permissionName];
    
    if (!permission) return false;
    return hasPermission(role, permission);
}

/**
 * Check if role has any of the provided permissions
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
    return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Check if role has all of the provided permissions
 */
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
    return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Get effective permissions for a member (custom permissions override role permissions)
 */
export function getEffectivePermissions(role: Role, customPermissions?: Permission[]): Permission[] {
    if (customPermissions && customPermissions.length > 0) {
        return customPermissions;
    }
    return getUserPermissions(role);
}

/**
 * Get permissions grouped by category
 */
export function getPermissionGroups(): Record<string, Permission[]> {
    return {
        'المنتجات': [
            Permission.VIEW_PRODUCTS,
            Permission.CREATE_PRODUCTS,
            Permission.EDIT_PRODUCTS,
            Permission.DELETE_PRODUCTS,
        ],
        'الطلبات': [
            Permission.VIEW_ORDERS,
            Permission.EDIT_ORDERS,
            Permission.MANAGE_ORDERS,
        ],
        'التصنيفات': [
            Permission.VIEW_CATEGORIES,
            Permission.CREATE_CATEGORIES,
            Permission.EDIT_CATEGORIES,
            Permission.DELETE_CATEGORIES,
        ],
        'المنشأة': [
            Permission.VIEW_ORGANIZATION,
            Permission.EDIT_ORGANIZATION,
            Permission.MANAGE_TEAM,
        ],
        'إدارة المنشآت': [
            Permission.VIEW_ORGANIZATIONS,
            Permission.CREATE_ORGANIZATIONS,
            Permission.EDIT_ORGANIZATIONS,
            Permission.DELETE_ORGANIZATIONS,
        ],
        'التحليلات': [
            Permission.VIEW_ANALYTICS,
        ],
        'الإعدادات': [
            Permission.VIEW_SETTINGS,
            Permission.EDIT_SETTINGS,
        ],
        'لوحة التحكم': [
            Permission.VIEW_DASHBOARD,
        ],
        'الخدمات': [
            Permission.VIEW_SERVICES,
            Permission.CREATE_SERVICES,
            Permission.EDIT_SERVICES,
            Permission.DELETE_SERVICES,
        ],
        'الحجوزات': [
            Permission.VIEW_BOOKINGS,
            Permission.MANAGE_BOOKINGS,
            Permission.UPDATE_BOOKING_STATUS,
        ],
    };
}

/**
 * Permission labels in Arabic
 */
export const permissionLabels: Record<Permission, string> = {
    [Permission.VIEW_PRODUCTS]: "عرض المنتجات",
    [Permission.CREATE_PRODUCTS]: "إضافة المنتجات",
    [Permission.EDIT_PRODUCTS]: "تعديل المنتجات",
    [Permission.DELETE_PRODUCTS]: "حذف المنتجات",
    [Permission.VIEW_ORDERS]: "عرض الطلبات",
    [Permission.EDIT_ORDERS]: "تعديل الطلبات",
    [Permission.MANAGE_ORDERS]: "إدارة الطلبات",
    [Permission.VIEW_CATEGORIES]: "عرض التصنيفات",
    [Permission.CREATE_CATEGORIES]: "إضافة التصنيفات",
    [Permission.EDIT_CATEGORIES]: "تعديل التصنيفات",
    [Permission.DELETE_CATEGORIES]: "حذف التصنيفات",
    [Permission.VIEW_ORGANIZATION]: "عرض المنشأة",
    [Permission.EDIT_ORGANIZATION]: "تعديل المنشأة",
    [Permission.MANAGE_TEAM]: "إدارة الفريق",
    [Permission.VIEW_ORGANIZATIONS]: "عرض المنشآت",
    [Permission.CREATE_ORGANIZATIONS]: "إضافة منشأة",
    [Permission.EDIT_ORGANIZATIONS]: "تعديل منشأة",
    [Permission.DELETE_ORGANIZATIONS]: "حذف منشأة",
    [Permission.VIEW_ANALYTICS]: "عرض التحليلات",
    [Permission.VIEW_SETTINGS]: "عرض الإعدادات",
    [Permission.EDIT_SETTINGS]: "تعديل الإعدادات",
    [Permission.VIEW_DASHBOARD]: "عرض لوحة التحكم",
    [Permission.VIEW_SERVICES]: "عرض الخدمات",
    [Permission.CREATE_SERVICES]: "إضافة الخدمات",
    [Permission.EDIT_SERVICES]: "تعديل الخدمات",
    [Permission.DELETE_SERVICES]: "حذف الخدمات",
    [Permission.VIEW_BOOKINGS]: "عرض الحجوزات",
    [Permission.MANAGE_BOOKINGS]: "إدارة الحجوزات",
    [Permission.UPDATE_BOOKING_STATUS]: "تحديث حالة الحجز",
};
