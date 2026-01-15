// File: src/screens/categories/CategoriesScreen.tsx
// Purpose: Categories Grid Screen - Using Shared Header

import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, LoadingSpinner } from '../shared';
import { useCategories } from './_hooks';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const cardWidth = isTablet ? '31%' : '48%';

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
                                <View style={[styles.imageContainer, isTablet && styles.imageContainerTablet]}>
                                    <Image
                                        source={{ uri: category.image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={[styles.categoryInfo, isTablet && styles.categoryInfoTablet]}>
                                    <Text style={[styles.categoryLabel, isTablet && styles.categoryLabelTablet]}>
                                        {category.label}
                                    </Text>
                                    {category.count > 0 && (
                                        <Text style={[styles.categoryCount, isTablet && styles.categoryCountTablet]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    imageContainer: {
        height: 128,
        backgroundColor: '#f1f5f9',
    },
    imageContainerTablet: {
        height: 176,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    categoryInfo: {
        alignItems: 'flex-end',
        padding: 16,
    },
    categoryInfoTablet: {
        padding: 20,
    },
    categoryLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        marginBottom: 4,
    },
    categoryLabelTablet: {
        fontSize: 18,
    },
    categoryCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
    },
    categoryCountTablet: {
        fontSize: 14,
    },
});
