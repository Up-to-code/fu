import React, { useState } from 'react';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AIDesignBanner, CategoriesSection, HomeHeader, ProductListSection, QuickActionsSection, ServicesSection } from '../../src/screens/home/_components';

// Mock Data in Arabic
const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'كنبة مودرن مريحة - قماش رمادي فاخر',
        price: 1299,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
        category: 'غرفة المعيشة',
        isFavorite: false,
        discount: 10
    },
    {
        id: '2',
        name: 'طاولة قهوة خشب بلوط مع تخزين',
        price: 499,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80',
        category: 'غرفة المعيشة',
        isFavorite: true,
    },
    {
        id: '3',
        name: 'مصباح أرضي ذهبي فاخر',
        price: 199,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80',
        category: 'غرفة المعيشة',
        isFavorite: false,
    },
];

const BEDROOM_PRODUCTS = [
    {
        id: '4',
        name: 'سرير مزدوج مع لوح أمامي مبطن',
        price: 899,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=500&q=80',
        category: 'غرفة النوم',
        isFavorite: false,
        discount: 15
    },
    {
        id: '5',
        name: 'طاولة جانبية للسرير',
        price: 149,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=500&q=80',
        category: 'غرفة النوم',
        isFavorite: false,
    },
];

export default function HomeScreen() {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [bedroomProducts, setBedroomProducts] = useState(BEDROOM_PRODUCTS);

    const toggleFavorite = (id: string) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
        setBedroomProducts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50/50" edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {Platform.OS === 'android' && <View className="h-4" />}
            <HomeHeader />

            <ScrollView 
                className="flex-1" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <View className="bg-gray-50/50">
                    {/* AI Design Banner - Prominent feature for new users */}
                    <AIDesignBanner />
                    
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
