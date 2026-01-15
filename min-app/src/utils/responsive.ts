// File: src/utils/responsive.ts
// Purpose: Centralized responsive utilities for screen size detection

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Get responsive value based on screen width
 * @param phone - Value for phone screens (< 768px)
 * @param tablet - Value for tablet screens (>= 768px)
 * @returns The appropriate value based on screen size
 */
export const getResponsiveValue = (phone: number, tablet: number): number => {
    return width >= 768 ? tablet : phone;
};

/**
 * Get responsive value for small screens
 * @param small - Value for small screens (< 375px)
 * @param normal - Value for normal screens (>= 375px)
 * @returns The appropriate value based on screen size
 */
export const getSmallScreenValue = (small: number, normal: number): number => {
    return width < 375 ? small : normal;
};

/**
 * Check if current device is a tablet
 */
export const isTablet = width >= 768;

/**
 * Check if current device is a small screen
 */
export const isSmallScreen = width < 375;

/**
 * Check if current device is a large tablet
 */
export const isLargeTablet = width >= 1024;

/**
 * Get screen dimensions
 */
export const screenDimensions = {
    width,
    height,
};

/**
 * Get responsive font size
 * @param phone - Font size for phone
 * @param tablet - Font size for tablet
 * @returns Responsive font size
 */
export const getResponsiveFontSize = (phone: number, tablet: number): number => {
    return getResponsiveValue(phone, tablet);
};

/**
 * Get responsive spacing
 * @param phone - Spacing for phone
 * @param tablet - Spacing for tablet
 * @returns Responsive spacing
 */
export const getResponsiveSpacing = (phone: number, tablet: number): number => {
    return getResponsiveValue(phone, tablet);
};
