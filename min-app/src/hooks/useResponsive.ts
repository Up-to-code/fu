// File: src/hooks/useResponsive.ts
// Purpose: Custom hook that provides responsive sizing utilities, breakpoint detection, and common responsive values

import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  // Breakpoint detection
  const isSmall = width < 375;
  const isMedium = width >= 375 && width < 428;
  const isLarge = width >= 428 && width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  /**
   * Get responsive size based on screen width
   * @param small - Size for small screens (< 375px)
   * @param medium - Size for medium screens (375-428px)
   * @param large - Size for large screens (428-768px)
   * @param tablet - Size for tablets (768-1024px)
   * @param desktop - Size for desktop (> 1024px)
   */
  const getSize = (
    small: number,
    medium: number,
    large: number,
    tablet: number,
    desktop: number
  ): number => {
    if (isDesktop) return desktop;
    if (isTablet) return tablet;
    if (isLarge) return large;
    if (isMedium) return medium;
    return small;
  };

  /**
   * Get responsive width percentage
   */
  const getWidthPercent = (percent: number): number => {
    return (width * percent) / 100;
  };

  /**
   * Get responsive height percentage
   */
  const getHeightPercent = (percent: number): number => {
    return (height * percent) / 100;
  };

  // Common responsive values
  const padding = getSize(16, 20, 24, 32, 48);
  const spacing = {
    xs: getSize(4, 6, 8, 10, 12),
    sm: getSize(8, 10, 12, 16, 20),
    md: getSize(16, 20, 24, 32, 40),
    lg: getSize(24, 28, 32, 40, 48),
    xl: getSize(32, 40, 48, 56, 64),
  };

  const fontSize = {
    xs: getSize(10, 11, 12, 13, 14),
    sm: getSize(12, 13, 14, 15, 16),
    base: getSize(14, 15, 16, 18, 20),
    lg: getSize(16, 18, 20, 22, 24),
    xl: getSize(18, 20, 22, 26, 30),
    '2xl': getSize(20, 24, 28, 32, 36),
    '3xl': getSize(24, 28, 32, 36, 42),
  };

  const iconSize = {
    sm: getSize(16, 18, 20, 22, 24),
    md: getSize(20, 22, 24, 26, 28),
    lg: getSize(24, 28, 32, 36, 40),
    xl: getSize(32, 36, 40, 44, 48),
  };

  return {
    // Dimensions
    width,
    height,
    
    // Breakpoints
    isSmall,
    isMedium,
    isLarge,
    isTablet,
    isDesktop,
    
    // Functions
    getSize,
    getWidthPercent,
    getHeightPercent,
    
    // Common values
    padding,
    spacing,
    fontSize,
    iconSize,
  };
};
