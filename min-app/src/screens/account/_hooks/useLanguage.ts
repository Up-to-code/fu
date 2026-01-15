// File: src/screens/account/_hooks/useLanguage.ts
// Purpose: Manages language selection and persistence with AsyncStorage and Convex sync

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';
import { saveLanguage, getLanguage } from '../../../lib/storage';

interface UseLanguageReturn {
    selectedLanguage: string;
    setLanguage: (langId: string) => Promise<void>;
    isLoading: boolean;
}

export const useLanguage = (): UseLanguageReturn => {
    const { user } = useAuth();
    const updateUserProfile = useMutation(api.users.updateUserProfile);
    const userProfile = useQuery(
        api.users.getUserProfile,
        user?.id ? { userId: user.id } : 'skip'
    );

    const [selectedLanguage, setSelectedLanguage] = useState('ar');
    const [isLoading, setIsLoading] = useState(true);

    // Load saved language on mount - priority: Convex > AsyncStorage
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                // First try to load from Convex
                if (userProfile?.language) {
                    setSelectedLanguage(userProfile.language);
                    // Also save to AsyncStorage as backup
                    await saveLanguage(userProfile.language);
                } else {
                    // Fallback to AsyncStorage
                    const savedLanguage = await getLanguage();
                    if (savedLanguage) {
                        setSelectedLanguage(savedLanguage);
                        // Sync to Convex if user is logged in
                        if (user?.id) {
                            try {
                                await updateUserProfile({
                                    userId: user.id,
                                    language: savedLanguage,
                                });
                            } catch (error) {
                                console.error('Error syncing language to Convex:', error);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading language:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadLanguage();
    }, [userProfile, user?.id, updateUserProfile]);

    const setLanguage = async (langId: string) => {
        setSelectedLanguage(langId);
        try {
            // Save to AsyncStorage (local cache)
            await saveLanguage(langId);

            // Save to Convex (database)
            if (user?.id) {
                await updateUserProfile({
                    userId: user.id,
                    language: langId,
                });
            }

            // In real app: update i18n here
        } catch (error) {
            console.error('Error saving language:', error);
            // Revert on error
            setSelectedLanguage(selectedLanguage);
        }
    };

    return {
        selectedLanguage,
        setLanguage,
        isLoading,
    };
};
