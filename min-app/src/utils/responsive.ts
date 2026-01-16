// File: src/utils/responsive.ts
// Purpose: Centralized responsive utilities for screen size detection
// 
// ⚠️ DEPRECATED: This file is deprecated in favor of the `useResponsive` hook.
// 
// Migration Guide:
// - Replace `getResponsiveValue(phone, tablet)` with `getSize(small, medium, large, tablet, desktop)` from `useResponsive` hook
// - Replace `Dimensions.get('window')` with `useResponsive()` hook which provides `width` and `height`
// - Replace `isTablet`, `isSmallScreen`, etc. with breakpoint flags from `useResponsive()` hook
// - The hook provides reactive updates on orientation change and supports 5 breakpoints instead of 2
//
// Example migration:
//   Before:
//     import { getResponsiveValue, isTablet } from '../../../utils/responsive';
//     const { width } = Dimensions.get('window');
//     const size = getResponsiveValue(16, 24);
//
//   After:
//     import { useResponsive } from '../../../hooks/useResponsive';
//     const { getSize, width, isTablet } = useResponsive();
//     const size = getSize(14, 16, 18, 24, 32);
//
// This file is kept for backward compatibility during migration.
// All new code should use the `useResponsive` hook from `src/hooks/useResponsive.ts`.

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * @deprecated Use `useResponsive` hook instead. This function only supports 2 breakpoints.
 * Get responsive value based on screen width
 * @param phone - Value for phone screens (< 768px)
 * @param tablet - Value for tablet screens (>= 768px)
 * @returns The appropriate value based on screen size
 */
export const getResponsiveValue = (phone: number, tablet: number): number => {
    return width >= 768 ? tablet : phone;
};

/**
 * @deprecated Use `useResponsive` hook instead.
 * Get responsive value for small screens
 * @param small - Value for small screens (< 375px)
 * @param normal - Value for normal screens (>= 375px)
 * @returns The appropriate value based on screen size
 */
export const getSmallScreenValue = (small: number, normal: number): number => {
    return width < 375 ? small : normal;
};

/**
 * @deprecated Use `useResponsive` hook instead. Access `isTablet` from the hook.
 * Check if current device is a tablet
 */
export const isTablet = width >= 768;

/**
 * @deprecated Use `useResponsive` hook instead. Access `isSmall` from the hook.
 * Check if current device is a small screen
 */
export const isSmallScreen = width < 375;

/**
 * @deprecated Use `useResponsive` hook instead. Access `isDesktop` from the hook.
 * Check if current device is a large tablet
 */
export const isLargeTablet = width >= 1024;

/**
 * @deprecated Use `useResponsive` hook instead. Access `width` and `height` from the hook.
 * Get screen dimensions
 */
export const screenDimensions = {
    width,
    height,
};

/**
 * @deprecated Use `useResponsive` hook instead. Access `fontSize` from the hook.
 * Get responsive font size
 * @param phone - Font size for phone
 * @param tablet - Font size for tablet
 * @returns Responsive font size
 */
export const getResponsiveFontSize = (phone: number, tablet: number): number => {
    return getResponsiveValue(phone, tablet);
};

/**
 * @deprecated Use `useResponsive` hook instead. Access `spacing` from the hook.
 * Get responsive spacing
 * @param phone - Spacing for phone
 * @param tablet - Spacing for tablet
 * @returns Responsive spacing
 */
export const getResponsiveSpacing = (phone: number, tablet: number): number => {
    return getResponsiveValue(phone, tablet);
};
