// File: src/screens/home/_components/CategoriesSection.tsx
// Purpose: Categories section as 2x3 grid with larger cards for beginner-friendly navigation

import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Category } from './types/home';
import { styles } from './StyleSheets/CategoriesSection.styles';

const CATEGORIES: Category[] = [
    { id: '1', name: 'مجالس', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80' },
    { id: '2', name: 'غرف نوم', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&q=80' },
    { id: '3', name: 'مطابخ', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&q=80' },
    { id: '4', name: 'مكاتب', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&q=80' },
    { id: '5', name: 'طعام', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&q=80' },
    { id: '6', name: 'جلسات خارجية', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&q=80' },
];

const CategoriesSectionComponent = () => {
    const router = useRouter();

    const handleCategoryPress = useCallback((categoryId: string) => {
        router.push(`/category/${categoryId}`);
    }, [router]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>التصنيفات</Text>
            <View style={styles.grid}>
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryCard}
                        onPress={() => handleCategoryPress(category.id)}
                        activeOpacity={0.9}
                    >
                        <View style={styles.categoryImage}>
                            <Image
                                source={{ uri: category.image }}
                                style={styles.categoryImageContent}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.categoryName}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

// Memoize CategoriesSection to prevent unnecessary re-renders
export const CategoriesSection = React.memo(CategoriesSectionComponent);
