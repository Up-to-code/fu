// File: src/lib/storage.ts
// Purpose: AsyncStorage helper functions for simple preferences

import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'fu_app_';

/**
 * Save a preference to AsyncStorage
 */
export const savePreference = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(`${PREFIX}${key}`, value);
  } catch (error) {
    console.error(`Error saving preference ${key}:`, error);
    throw error;
  }
};

/**
 * Get a preference from AsyncStorage
 */
export const getPreference = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error(`Error getting preference ${key}:`, error);
    return null;
  }
};

/**
 * Remove a preference from AsyncStorage
 */
export const removePreference = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing preference ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all preferences
 */
export const clearPreferences = async (): Promise<void> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter(key => key.startsWith(PREFIX));
    await AsyncStorage.multiRemove(appKeys);
  } catch (error) {
    console.error('Error clearing preferences:', error);
    throw error;
  }
};

/**
 * Language preference helpers
 */
export const saveLanguage = async (language: string): Promise<void> => {
  return savePreference('language', language);
};

export const getLanguage = async (): Promise<string | null> => {
  return getPreference('language');
};

/**
 * Notification preference helpers
 */
export const saveNotificationPreference = async (enabled: boolean): Promise<void> => {
  return savePreference('notifications_enabled', enabled ? 'true' : 'false');
};

export const getNotificationPreference = async (): Promise<boolean> => {
  const value = await getPreference('notifications_enabled');
  return value === 'true';
};

/**
 * Search history helpers
 */
export const saveSearchHistory = async (history: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(`${PREFIX}search_history`, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving search history:', error);
    throw error;
  }
};

export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const value = await AsyncStorage.getItem(`${PREFIX}search_history`);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

export const clearSearchHistory = async (): Promise<void> => {
  return removePreference('search_history');
};

/**
 * Direction preference helpers
 */
export const saveDirectionPreference = async (direction: 'ltr' | 'rtl' | null): Promise<void> => {
  if (direction === null) {
    return removePreference('direction');
  }
  return savePreference('direction', direction);
};

export const getDirectionPreference = async (): Promise<'ltr' | 'rtl' | null> => {
  const value = await getPreference('direction');
  if (value === 'ltr' || value === 'rtl') {
    return value;
  }
  return null;
};
