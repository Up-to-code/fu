// File: src/screens/home/_components/HomeHeader.tsx
// Purpose: Simple, clear search bar

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './StyleSheets/HomeHeader.styles';

const HomeHeaderComponent = () => {
    const router = useRouter();

    const handleCameraPress = useCallback((e: any) => {
        e.stopPropagation();
        router.push('/search/image' as any);
    }, [router]);

    return (
        <View style={styles.container}>
            <Link href="/search" asChild>
                <TouchableOpacity style={styles.searchButton}>
                    <Feather name="search" size={18} color="#9CA3AF" />
                    <Text style={styles.searchText}>
                        أنت بتدور على آيه؟
                    </Text>
                    <TouchableOpacity onPress={handleCameraPress}>
                        <Feather name="camera" size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

// Memoize HomeHeader to prevent unnecessary re-renders
export const HomeHeader = React.memo(HomeHeaderComponent);
