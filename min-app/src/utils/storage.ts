// File: src/utils/storage.ts
// Purpose: MMKV Storage utility for persistent data
// Dependencies: react-native-mmkv

// Temporary: Make MMKV optional while installing
let storage: any;
try {
    const { MMKV } = require('react-native-mmkv');
    storage = new MMKV();
} catch (e) {
    console.warn('MMKV not available yet, using fallback');
    storage = null;
}

export { storage };

// Photo storage keys
export const STORAGE_KEYS = {
    FLASH_MODE: 'camera_flash_mode',
    AI_SESSION: 'ai_design_session_v1', // Unified JSON key
} as const;

export interface AISession {
    roomType?: string;
    roomStyle?: string;
    customPrompt?: string;
    originalPhotoUri?: string;
    generatedPhotoUri?: string;
}

export const saveAISession = (data: Partial<AISession>) => {
    if (!storage) return;
    try {
        const currentSession = getAISession();
        const newSession = { ...currentSession, ...data };
        storage.set(STORAGE_KEYS.AI_SESSION, JSON.stringify(newSession));
    } catch (e) {
        console.warn('Failed to save AI session', e);
    }
};

export const getAISession = (): AISession => {
    if (!storage) return {};
    try {
        const json = storage.getString(STORAGE_KEYS.AI_SESSION);
        return json ? JSON.parse(json) : {};
    } catch (e) {
        console.warn('Failed to parse AI session', e);
        return {};
    }
};

export const clearAISession = () => {
    if (!storage) return;
    storage.delete(STORAGE_KEYS.AI_SESSION);
};

// Legacy photo retrieval wrapper for backward compatibility if needed, using session now
export const getLastAIDesignPhoto = (): string | undefined => {
    return getAISession().originalPhotoUri;
};

export const saveFlashMode = (mode: string) => {
    if (!storage) return;
    storage.set(STORAGE_KEYS.FLASH_MODE, mode);
};

export const getFlashMode = (): 'off' | 'auto' | 'torch' => {
    if (!storage) return 'off';
    const mode = storage.getString(STORAGE_KEYS.FLASH_MODE);
    return (mode === 'auto' || mode === 'torch' || mode === 'off') ? mode : 'off';
};

export const clearPhotoData = () => {
    clearAISession();
};

// Generic storage helpers
const saveToStorage = <T>(key: string, value: T | null): void => {
    if (!storage) return;
    try {
        if (value === null) {
            storage.delete(key);
        } else {
            storage.set(key, JSON.stringify(value));
        }
    } catch (e) {
        console.warn(`Failed to save ${key}`, e);
    }
};

const getFromStorage = <T>(key: string): T | null => {
    if (!storage) return null;
    try {
        const json = storage.getString(key);
        return json ? JSON.parse(json) : null;
    } catch (e) {
        console.warn(`Failed to read ${key}`, e);
        return null;
    }
};

// AI Design Preferences (Persistent across sessions)
interface AIPreferences {
    lastRoomType?: string;
    lastRoomStyle?: string;
    lastCustomPrompt?: string;
}

export const saveAIPreferences = (preferences: Partial<AIPreferences>): void => {
    const current = getFromStorage<AIPreferences>('aiPreferences') || {};
    saveToStorage('aiPreferences', { ...current, ...preferences });
};

export const getAIPreferences = (): AIPreferences => {
    return getFromStorage<AIPreferences>('aiPreferences') || {};
};

export const clearAIPreferences = (): void => {
    saveToStorage('aiPreferences', null);
};

