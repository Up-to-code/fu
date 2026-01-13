// File: src/screens/home/_components/CategoriesSection.tsx
// Purpose: Categories section as 2x3 grid with larger cards for beginner-friendly navigation

import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40 - 16) / 2; // Screen width - padding - gap

const CATEGORIES = [
    { id: '1', name: 'مجالس', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80' },
    { id: '2', name: 'غرف نوم', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&q=80' },
    { id: '3', name: 'مطابخ', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&q=80' },
    { id: '4', name: 'مكاتب', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=80' },
    { id: '5', name: 'طعام', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&q=80' },
    { id: '6', name: 'جلسات خارجية', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&q=80' },
];

export const CategoriesSection = () => {
    const router = useRouter();

    return (
        <View className="px-5 mb-8">
            <Text className="font-cairo-bold text-xl text-slate-900 mb-4 text-right">التصنيفات</Text>
            <View className="flex-row-reverse flex-wrap justify-center" style={{ gap: 20 }}>
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        className="items-center"
                        onPress={() => router.push(`/category/${category.id}`)}
                        activeOpacity={0.9}
                    >
                        <View className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-slate-100 border-2 border-slate-200">
                            <Image
                                source={{ uri: category.image }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <Text className="font-cairo-medium text-slate-700 text-xs text-center" style={{ width: 80 }}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
