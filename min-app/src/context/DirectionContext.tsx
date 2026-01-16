// File: src/context/DirectionContext.tsx
// Purpose: Context provider for RTL/LTR direction management based on app language

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { I18nManager, NativeModules, Platform } from 'react-native';
import { Direction } from '../utils/direction';
import { useLanguage } from '../screens/account/_hooks/useLanguage';

interface DirectionContextType {
  isRTL: boolean;
  direction: Direction;
  userPreference: Direction | null;
  setDirection: (direction: Direction | null) => Promise<void>;
  toggleDirection: () => Promise<void>;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

/**
 * Check if language code is RTL
 */
const isRTLLanguage = (language: string): boolean => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi'];
  const languageCode = language.toLowerCase().split('-')[0];
  return rtlLanguages.includes(languageCode);
};

interface DirectionProviderProps {
  children: React.ReactNode;
}

/**
 * Inner component that uses useLanguage hook
 * This is needed because hooks can't be used directly in the provider component
 */
const DirectionProviderInner: React.FC<DirectionProviderProps> = ({ children }) => {
  const { selectedLanguage, isLoading: languageLoading } = useLanguage();
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [userPreference, setUserPreference] = useState<Direction | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Update direction when language changes
  useEffect(() => {
    if (languageLoading) {
      return; // Wait for language to load
    }

    const updateDirection = async () => {
      try {
        // Determine direction from app language ONLY (ignore system)
        const languageBasedRTL = isRTLLanguage(selectedLanguage);
        
        // If user has a preference override, use it; otherwise use language-based direction
        const finalIsRTL = userPreference 
          ? userPreference === 'rtl'
          : languageBasedRTL;

        // Force app direction - this overrides system direction completely
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(finalIsRTL);
        
        // Reload app on Android to apply changes
        if (Platform.OS === 'android') {
          NativeModules.I18nManager?.swapLeftAndRightInRTL?.(finalIsRTL);
        }

        setIsRTL(finalIsRTL);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error updating direction:', error);
        setIsInitialized(true);
      }
    };

    updateDirection();
  }, [selectedLanguage, languageLoading, userPreference]);

  // Initialize: Load user preference on mount
  useEffect(() => {
    const loadPreference = async () => {
      try {
        // For now, we'll determine direction from language only
        // User preference can be added later if needed
        setUserPreference(null);
      } catch (error) {
        console.error('Error loading direction preference:', error);
      }
    };

    loadPreference();
  }, []);

  // Set direction preference (optional override)
  const setDirection = useCallback(async (direction: Direction | null) => {
    try {
      setUserPreference(direction);
      
      // Determine final direction: user preference > language-based
      const languageBasedRTL = isRTLLanguage(selectedLanguage);
      const finalIsRTL = direction 
        ? direction === 'rtl'
        : languageBasedRTL;

      // Force app direction
      I18nManager.forceRTL(finalIsRTL);
      
      // Reload app on Android to apply changes
      if (Platform.OS === 'android') {
        NativeModules.I18nManager?.swapLeftAndRightInRTL?.(finalIsRTL);
      }

      setIsRTL(finalIsRTL);
    } catch (error) {
      console.error('Error setting direction:', error);
    }
  }, [selectedLanguage]);

  // Toggle direction
  const toggleDirection = useCallback(async () => {
    const languageBasedRTL = isRTLLanguage(selectedLanguage);
    const currentDirection = userPreference || (languageBasedRTL ? 'rtl' : 'ltr');
    const newDirection = currentDirection === 'rtl' ? 'ltr' : 'rtl';
    await setDirection(newDirection);
  }, [selectedLanguage, userPreference, setDirection]);

  const value: DirectionContextType = {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
    userPreference,
    setDirection,
    toggleDirection,
  };

  // Don't render children until direction is initialized
  if (!isInitialized || languageLoading) {
    return null;
  }

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
};

/**
 * Direction Provider - Wraps the inner component to handle hook usage
 */
export const DirectionProvider: React.FC<DirectionProviderProps> = ({ children }) => {
  return <DirectionProviderInner>{children}</DirectionProviderInner>;
};

export const useDirection = (): DirectionContextType => {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
};
