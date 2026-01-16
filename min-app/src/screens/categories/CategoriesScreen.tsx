// File: src/screens/categories/CategoriesScreen.tsx
// Purpose: Categories Grid Screen - Using Shared Header

import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, LoadingSpinner } from '../shared';
import { useCategories } from './_hooks';
import { useResponsive } from '../../hooks/useResponsive';

const CATEGORIES = [
    { id: 1, name: 'sofas', label: 'كنب', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', count: 120 },
    { id: 2, name: 'beds', label: 'أسرة', image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', count: 85 },
    { id: 3, name: 'tables', label: 'طاولات', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', count: 65 },
    { id: 4, name: 'chairs', label: 'كراسي', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', count: 240 },
    { id: 5, name: 'lighting', label: 'إضاءة', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', count: 45 },
    { id: 6, name: 'decor', label: 'ديكور', image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', count: 180 },
];

export default function CategoriesScreen() {
    const router = useRouter();
    const { categories, isLoading } = useCategories();
    const { isTablet, getSize, fontSize } = useResponsive();
    const cardWidth = isTablet ? '31%' : '48%';
    const styles = getStyles(getSize, fontSize, cardWidth);
    // Fallback to mock data if hook returns empty
    const displayCategories = categories.length > 0 
        ? categories.map(c => ({ id: c.id, name: c.name, label: c.name, image: c.imageUrl || '', count: 0 }))
        : CATEGORIES;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Header title="التصنيفات" showBack />

            {isLoading ? (
                <LoadingSpinner message="جاري التحميل..." />
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.grid}>
                        {displayCategories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[styles.categoryCard, { width: cardWidth }]}
                                activeOpacity={0.8}
                                onPress={() => router.push({
                                    pathname: '/category/[id]',
                                    params: { id: category.id.toString(), name: category.label }
                                })}
                            >
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: category.image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={styles.categoryInfo}>
                                    <Text style={styles.categoryLabel}>
                                        {category.label}
                                    </Text>
                                    {category.count > 0 && (
                                        <Text style={styles.categoryCount}>
                                            {category.count} منتج
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const getStyles = (
    getSize: (small: number, medium: number, large: number, tablet: number, desktop: number) => number,
    fontSize: { xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number },
    cardWidth: string
) => {
    const { StyleSheet } = require('react-native');
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingBottom: getSize(16, 18, 20, 24, 32),
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            paddingTop: getSize(12, 14, 16, 20, 24),
        },
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        categoryCard: {
            marginBottom: getSize(12, 14, 16, 20, 24),
            backgroundColor: 'white',
            borderRadius: getSize(14, 15, 16, 18, 20),
            borderWidth: 1,
            borderColor: '#e2e8f0',
            overflow: 'hidden',
            width: cardWidth,
        },
        imageContainer: {
            height: getSize(112, 120, 128, 176, 224),
            backgroundColor: '#f1f5f9',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        categoryInfo: {
            alignItems: 'flex-end',
            padding: getSize(14, 15, 16, 20, 24),
        },
        categoryLabel: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(14, 15, 16, 18, 20),
            color: '#1e293b',
            marginBottom: 4,
        },
        categoryCount: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(11, 11.5, 12, 14, 16),
            color: '#64748b',
        },
    });
};
