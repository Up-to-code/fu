// File: src/screens/account/_hooks/useSettings.ts
// Purpose: Manages settings state (notifications, etc.) with AsyncStorage and Convex sync

import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { initDB, saveSetting } from '../../../lib/database';
import { saveNotificationPreference, getNotificationPreference } from '../../../lib/storage';

interface Settings {
    notifications: boolean;
}

interface UseSettingsReturn {
    settings: Settings;
    updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => Promise<void>;
    isLoading: boolean;
}

export const useSettings = (): UseSettingsReturn => {
    const { user } = useAuth();
    const [settings, setSettings] = useState<Settings>({
        notifications: true,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            if (!user?.id) {
                setIsLoading(false);
                return;
            }

            try {
                await initDB();
                // Load notification preference from AsyncStorage
                const notificationPref = await getNotificationPreference();
                setSettings(prev => ({ ...prev, notifications: notificationPref }));
            } catch (error) {
                console.error('Error loading settings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, [user?.id]);

    const updateSetting = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));

        try {
            if (key === 'notifications') {
                await saveNotificationPreference(value as boolean);
                if (user?.id) {
                    await initDB();
                    await saveSetting(user.id, 'notifications', value ? 'true' : 'false');
                }
            }
        } catch (error) {
            console.error('Error saving setting:', error);
            // Revert on error
            setSettings(prev => ({ ...prev, [key]: !value as Settings[K] }));
        }
    };

    return {
        settings,
        updateSetting,
        isLoading,
    };
};
