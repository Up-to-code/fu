// File: src/utils/navigation.ts
// Purpose: Navigation helper utilities for consistent back button behavior

import { Router } from 'expo-router';

/**
 * Handles back navigation with fallback
 * Goes back if history exists, otherwise navigates to fallback route
 */
export const handleBackNavigation = (
  router: Router,
  fallbackRoute: string = '/account'
): void => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.push(fallbackRoute as any);
  }
};
