// File: src/screens/search/_hooks/useImageSearch.ts
// Purpose: Image search functionality

import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { IProductCardProps } from '../../shared';

interface UseImageSearchReturn {
    pickImage: () => Promise<void>;
    searchResults: IProductCardProps[];
    isLoading: boolean;
    imageUri: string | null;
}

export const useImageSearch = (): UseImageSearchReturn => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<IProductCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
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
                quality: 0.8,
            });

            if (result.canceled || !result.assets[0]) {
                return;
            }

            const asset = result.assets[0];
            if (!asset.uri) {
                Alert.alert('خطأ', 'فشل في تحميل الصورة');
                return;
            }

            setImageUri(asset.uri);
            setIsLoading(true);

            try {
                // TODO: Implement actual image search with Convex/AI
                // For now, return empty results
                setSearchResults([]);
            } catch (error: any) {
                console.error('Image search error:', error);
                Alert.alert('خطأ', 'حدث خطأ أثناء البحث بالصورة');
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error('Error picking image:', error);
            Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصورة');
            setIsLoading(false);
        }
    };

    return {
        pickImage,
        searchResults,
        isLoading,
        imageUri,
    };
};
