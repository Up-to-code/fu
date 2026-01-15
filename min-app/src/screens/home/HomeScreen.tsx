// File: src/screens/home/HomeScreen.tsx
// Purpose: Home screen with all sections

import React, { useState, useCallback, useMemo } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoriesSection, HomeHeader, ProductListSection, QuickActionsSection, ServicesSection } from './_components';
import { IProductCardProps } from '../shared';
import { styles as screenStyles } from './StyleSheets/HomeScreen.styles';

// Mock Data in Arabic
const MOCK_PRODUCTS: IProductCardProps[] = [
    {
        id: '1',
        name: 'كنبة مودرن مريحة - قماش رمادي فاخر',
        price: 1299,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
        discount: 10
    },
    {
        id: '2',
        name: 'طاولة قهوة خشب بلوط مع تخزين',
        price: 499,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80',
    },
    {
        id: '3',
        name: 'مصباح أرضي ذهبي فاخر',
        price: 199,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80',
    },
];

const BEDROOM_PRODUCTS: IProductCardProps[] = [
    {
        id: '4',
        name: 'سرير مزدوج مع لوح أمامي مبطن',
        price: 899,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=500&q=80',
        discount: 15
    },
    {
        id: '5',
        name: 'طاولة جانبية للسرير',
        price: 149,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=500&q=80',
    },
];

export default function HomeScreen() {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [bedroomProducts, setBedroomProducts] = useState(BEDROOM_PRODUCTS);

    // Memoize toggleFavorite handler to prevent re-renders
    const toggleFavorite = useCallback((id: string) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
        setBedroomProducts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    }, []);

    return (
        <SafeAreaView style={screenStyles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {Platform.OS === 'android' && <View style={screenStyles.androidSpacer} />}
            <HomeHeader />

            <ScrollView 
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={screenStyles.scrollContent}
            >
                <View style={screenStyles.content}>
                    {/* Quick Actions - Easy navigation */}
                    <QuickActionsSection />
                    
                    {/* Featured Products */}
                    <ProductListSection
                        title="الأكثر مبيعاً"
                        products={products}
                        onToggleFavorite={toggleFavorite}
                    />

                    {/* Categories Grid */}
                    <CategoriesSection />
                    
                    {/* More Products */}
                    <ProductListSection
                        title="جديد غرف النوم"
                        products={bedroomProducts}
                        onToggleFavorite={toggleFavorite}
                    />
                    
                    {/* Services Section */}
                    <ServicesSection />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
