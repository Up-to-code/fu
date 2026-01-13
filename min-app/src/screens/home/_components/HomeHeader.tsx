// File: src/screens/home/_components/HomeHeader.tsx
// Purpose: Simple, clear search bar

import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const HomeHeader = () => {
    const router = useRouter();

    return (
        <View className="px-5 pt-4 pb-3 bg-white">
            <Link href="/search" asChild>
                <TouchableOpacity className="flex-row-reverse items-center bg-gray-50 rounded-xl px-4 py-3">
                    <Feather name="search" size={18} color="#9CA3AF" />
                    <Text className="flex-1 text-right font-cairo-medium text-gray-400 mr-3 text-sm">
                        أنت بتدور على آيه؟
                    </Text>
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            router.push('/search/image' as any);
                        }}
                    >
                        <Feather name="camera" size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Link>
        </View>
    );
};
