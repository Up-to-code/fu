// File: src/screens/account/_hooks/useProfileImage.ts
// Purpose: Handles profile image upload, picker, and storage

import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useAction } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';
import { initDB, saveProfileImage, getProfileImage } from '../../../lib/database';

interface UseProfileImageReturn {
    localImageBase64: string | null;
    pickImage: () => Promise<void>;
    isUploading: boolean;
    isLoading: boolean;
}

export const useProfileImage = (): UseProfileImageReturn => {
    const { user } = useAuth();
    const generateUploadUrl = useAction(api.users.generateUploadUrl);
    const updateProfileImage = useMutation(api.users.updateProfileImage);

    const [localImageBase64, setLocalImageBase64] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load existing image from SQLite on mount
    useEffect(() => {
        const loadImage = async () => {
            if (!user?.id) {
                setIsLoading(false);
                return;
            }

            try {
                await initDB();
                const savedImage = await getProfileImage(user.id);
                if (savedImage) {
                    setLocalImageBase64(savedImage);
                }
            } catch (error) {
                console.error('Error loading profile image:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadImage();
    }, [user?.id]);

    const pickImage = async () => {
        if (!user?.id) {
            Alert.alert('خطأ', 'لم يتم العثور على معلومات المستخدم');
            return;
        }

        try {
            // Request permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('تنبيه', 'يجب السماح بالوصول إلى الصور');
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: true,
            });

            if (result.canceled || !result.assets[0]) {
                return;
            }

            const asset = result.assets[0];
            if (!asset.uri) {
                Alert.alert('خطأ', 'فشل في تحميل الصورة');
                return;
            }

            setIsUploading(true);

            try {
                // 1. Get base64 for SQLite backup
                const base64 = asset.base64;

                // 2. Convert image to Blob for Convex upload
                const response = await fetch(asset.uri);
                const blob = await response.blob();

                // 3. Generate upload URL from Convex
                const uploadUrl = await generateUploadUrl();

                // 4. Upload file to Convex storage
                const uploadResponse = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': blob.type || 'image/jpeg' },
                    body: blob,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload image');
                }

                // 5. Get storage ID from response
                const { storageId } = await uploadResponse.json();

                // 6. Update profile with new storage ID
                await updateProfileImage({
                    userId: user.id,
                    storageId: storageId as any,
                });

                // 7. Save base64 to SQLite as backup
                if (base64) {
                    await initDB();
                    await saveProfileImage(user.id, base64);
                    setLocalImageBase64(base64);
                }

                Alert.alert('نجح', 'تم تحديث الصورة الشخصية بنجاح');
            } catch (uploadError: any) {
                console.error('Error uploading image:', uploadError);
                Alert.alert('خطأ', 'حدث خطأ أثناء رفع الصورة. ' + (uploadError?.message || ''));
            } finally {
                setIsUploading(false);
            }
        } catch (error: any) {
            console.error('Error picking image:', error);
            Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصورة');
            setIsUploading(false);
        }
    };

    return {
        localImageBase64,
        pickImage,
        isUploading,
        isLoading,
    };
};
