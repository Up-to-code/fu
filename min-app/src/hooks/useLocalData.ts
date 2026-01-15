// File: src/hooks/useLocalData.ts
// Purpose: Custom hook to manage SQLite operations for local data

import { useState, useEffect } from 'react';
import { initDB, getProfileImage, getPhoneNumbers, getPhoneNumber, getAddresses, getAllSettings } from '../lib/database';

/**
 * Hook to get profile image from SQLite
 */
export const useProfileImage = (userId: string | null | undefined) => {
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImage = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                await initDB();
                const image = await getProfileImage(userId);
                setImageBase64(image);
            } catch (error) {
                console.error('Error loading profile image:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadImage();
    }, [userId]);

    return { imageBase64, isLoading };
};

/**
 * Hook to get phone numbers from SQLite
 */
export const usePhoneNumbers = (userId: string | null | undefined) => {
    const [phone1, setPhone1] = useState<{ number: string; countryCode: string } | null>(null);
    const [phone2, setPhone2] = useState<{ number: string; countryCode: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPhones = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                await initDB();
                const phones = await getPhoneNumbers(userId);
                setPhone1(phones.phone1);
                setPhone2(phones.phone2);
            } catch (error) {
                console.error('Error loading phone numbers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPhones();
    }, [userId]);

    return { phone1, phone2, isLoading };
};

// Legacy hook for backward compatibility
export const usePhoneNumber = (userId: string | null | undefined) => {
    const { phone1, isLoading } = usePhoneNumbers(userId);
    return { phone: phone1?.number || null, isLoading };
};

/**
 * Hook to get addresses from SQLite
 */
export const useLocalAddresses = (userId: string | null | undefined) => {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAddresses = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                await initDB();
                const localAddresses = await getAddresses(userId);
                setAddresses(localAddresses);
            } catch (error) {
                console.error('Error loading addresses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAddresses();
    }, [userId]);

    const refreshAddresses = async () => {
        if (!userId) return;
        
        try {
            await initDB();
            const localAddresses = await getAddresses(userId);
            setAddresses(localAddresses);
        } catch (error) {
            console.error('Error refreshing addresses:', error);
        }
    };

    return { addresses, isLoading, refreshAddresses };
};

/**
 * Hook to get all settings from SQLite
 */
export const useLocalSettings = (userId: string | null | undefined) => {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                await initDB();
                const allSettings = await getAllSettings(userId);
                setSettings(allSettings);
            } catch (error) {
                console.error('Error loading settings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, [userId]);

    return { settings, isLoading };
};
