// File: src/screens/favorites/FavoritesScreen.tsx
// Purpose: Favorites Screen with tabs for Products and Services - StyleSheet Implementation

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../shared';
import { Header, TabBar, ProductGrid } from '../shared';
import { useFavorites, useFavoriteProducts, useFavoriteServices } from './_hooks';
import { COLORS } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { TabType } from './types/favorites';

const FAVORITE_PRODUCTS = [
    { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
    { id: '2', name: 'طاولة قهوة خشبية', price: 899, discount: 15, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80' },
    { id: '3', name: 'مصباح أرضي', price: 450, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80' },
    { id: '4', name: 'سرير مزدوج', price: 1299, image: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=500&q=80' },
    { id: '5', name: 'كرسي مكتبي', price: 599, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80' },
];

const FAVORITE_SERVICES = [
    {
        id: '1',
        name: 'أحمد المصمم',
        category: 'تصميم داخلي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        rating: 4.9,
        price: 'من 500 ر.س',
        location: 'الرياض',
        verified: true,
    },
    {
        id: '3',
        name: 'سارة للديكور',
        category: 'استشارات ديكور',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        rating: 4.7,
        price: 'من 200 ر.س',
        location: 'الدمام',
        verified: true,
    },
];

export default function FavoritesScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('products');
    const { getSize, width, fontSize, iconSize } = useResponsive();
    const numColumns = 2;
    const gap = getSize(10, 11, 12, 16, 20);
    const padding = getSize(16, 18, 20, 24, 32);
    const itemSize = (width - (padding * 2) - (gap * (numColumns - 1))) / numColumns;
    const styles = getStyles(getSize, fontSize, iconSize, gap, padding, itemSize);

    const TabButton = ({ tab, label, count }: { tab: TabType; label: string; count: number }) => (
        <TouchableOpacity
            onPress={() => setActiveTab(tab)}
            style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton
            ]}
        >
            <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
            ]}>
                {label} ({count})
            </Text>
        </TouchableOpacity>
    );

    const renderProductsGrid = () => {
        if (FAVORITE_PRODUCTS.length === 0) {
            return (
                <EmptyState
                    icon="heart"
                    title="قائمة المفضلة فارغة"
                    description="لم تقم بإضافة أي منتجات للمفضلة بعد"
                    actionLabel="تصفح المنتجات"
                    onAction={() => router.push('/(tabs)/home')}
                />
            );
        }

        return (
            <View style={styles.productsGrid}>
                {FAVORITE_PRODUCTS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => router.push(`/product/${item.id}` as any)}
                        style={styles.productCard}
                        activeOpacity={0.9}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                            <View style={styles.favoriteBadge}>
                                <Feather name="heart" size={14} color="#EF4444" />
                            </View>
                            {item.discount && (
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>{item.discount}%-</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.productInfo}>
                            <Text style={styles.productName} numberOfLines={1}>
                                {item.name}
                            </Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.productPrice}>
                                    {item.price.toLocaleString()} ر.س
                                </Text>
                                <View style={styles.addToCartBtn}>
                                    <Feather name="shopping-cart" size={14} color={COLORS.primary} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderServicesList = () => {
        if (FAVORITE_SERVICES.length === 0) {
            return (
                <EmptyState
                    icon="briefcase"
                    title="لا توجد خدمات محفوظة"
                    description="لم تقم بحفظ أي مقدمي خدمات بعد"
                    actionLabel="تصفح الخدمات"
                    onAction={() => router.push('/services' as any)}
                />
            );
        }

        return (
            <View style={styles.servicesList}>
                {FAVORITE_SERVICES.map((provider) => (
                    <TouchableOpacity
                        key={provider.id}
                        onPress={() => router.push(`/services/${provider.id}` as any)}
                        activeOpacity={0.9}
                        style={styles.serviceCard}
                    >
                        <View style={styles.serviceContent}>
                            {/* Avatar */}
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: provider.avatar }}
                                    style={styles.avatar}
                                    resizeMode="cover"
                                />
                                {provider.verified && (
                                    <View style={styles.verifiedBadge}>
                                        <Feather name="check-circle" size={16} color="#3b82f6" />
                                    </View>
                                )}
                            </View>

                            {/* Info */}
                            <View style={styles.serviceInfo}>
                                <View style={styles.serviceHeader}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.providerName}>{provider.name}</Text>
                                        <Text style={styles.serviceCategory}>
                                            {provider.category} • {provider.location}
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={styles.serviceHeartBtn}>
                                        {provider.id === '1' ? (
                                            <View style={{ backgroundColor: '#EF4444', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                                                <Feather name="heart" size={14} color="white" />
                                            </View>
                                        ) : (
                                            <View style={{ width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }}>
                                                <Feather name="heart" size={20} color="#EF4444" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.serviceFooter}>
                                    <View style={styles.ratingContainer}>
                                        <Feather name="star" size={14} color="#F59E0B" />
                                        <Text style={styles.ratingText}>{provider.rating}</Text>
                                    </View>

                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.servicePrice}>{provider.price}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Bottom Row: Book Button Only */}
                        <View style={styles.cardBottomRow}>
                            <View style={styles.bookButton}>
                                <Text style={styles.bookButtonText}>حجز موعد</Text>
                                <Feather name="calendar" size={18} color="#0f172a" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header
                    title="المفضلة"
                    rightAction={
                        <View style={styles.headerBadge}>
                            <Text style={styles.headerBadgeText}>
                                {activeTab === 'products' ? FAVORITE_PRODUCTS.length : FAVORITE_SERVICES.length}
                            </Text>
                        </View>
                    }
                    showBack
                />
                
                <TabBar
                    tabs={[
                        { id: 'products', label: 'المنتجات', count: FAVORITE_PRODUCTS.length },
                        { id: 'services', label: 'الخدمات', count: FAVORITE_SERVICES.length },
                    ]}
                    activeTab={activeTab}
                    onTabChange={(tabId) => setActiveTab(tabId as TabType)}
                />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === 'products' ? renderProductsGrid() : renderServicesList()}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const getStyles = (
    getSize: (small: number, medium: number, large: number, tablet: number, desktop: number) => number,
    fontSize: { xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number },
    iconSize: { sm: number; md: number; lg: number; xl: number },
    gap: number,
    padding: number,
    itemSize: number
) => {
    const { StyleSheet } = require('react-native');
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: '#f8fafc' },
        safeArea: { flex: 1 },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(18, 19, 20, 22, 24),
        color: '#0f172a',
    },
    headerBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: getSize(8, 9, 10, 12, 14),
        paddingVertical: getSize(3, 3.5, 4, 5, 6),
        borderRadius: getSize(10, 11, 12, 14, 16),
    },
    headerBadgeText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.base,
        color: '#64748b',
    },
    tabsContainer: {
        flexDirection: 'row-reverse',
        backgroundColor: 'white',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    tabButton: {
        flex: 1,
        paddingVertical: getSize(12, 13, 14, 16, 18),
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTabButton: {
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: fontSize.base,
        color: '#64748b',
    },
    activeTabText: {
        color: COLORS.primary,
        fontFamily: 'Cairo_700Bold',
    },
    scrollView: { flex: 1 },
    scrollContent: {
        padding: padding,
        paddingBottom: getSize(32, 36, 40, 48, 56),
    },
    // Products Grid
    productsGrid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: gap,
    },
    productCard: {
        width: itemSize,
        borderRadius: getSize(10, 11, 12, 14, 16),
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        overflow: 'hidden',
        marginBottom: gap,
    },
    imageContainer: {
        height: itemSize, // Square image area
        width: '100%',
        position: 'relative',
        backgroundColor: '#f8fafc',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    favoriteBadge: {
        position: 'absolute',
        top: getSize(6, 7, 8, 10, 12),
        right: getSize(6, 7, 8, 10, 12),
        width: getSize(26, 27, 28, 32, 36),
        height: getSize(26, 27, 28, 32, 36),
        backgroundColor: 'white',
        borderRadius: getSize(13, 13.5, 14, 16, 18),
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    discountBadge: {
        position: 'absolute',
        top: getSize(6, 7, 8, 10, 12),
        left: getSize(6, 7, 8, 10, 12),
        backgroundColor: '#EF4444',
        paddingHorizontal: getSize(5, 5.5, 6, 7, 8),
        paddingVertical: getSize(2, 2.5, 3, 3.5, 4),
        borderRadius: getSize(3, 3.5, 4, 5, 6),
    },
    discountText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.xs,
    },
    productInfo: {
        padding: getSize(8, 9, 10, 12, 14),
    },
    productName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.sm,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.sm,
        color: COLORS.primary,
        textAlign: 'right',
    },
    addToCartBtn: {
        width: getSize(26, 27, 28, 32, 36),
        height: getSize(26, 27, 28, 32, 36),
        borderRadius: getSize(13, 13.5, 14, 16, 18),
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Services List - Updated
    servicesList: {
        gap: getSize(10, 11, 12, 16, 20),
    },
    serviceCard: {
        backgroundColor: 'white',
        borderRadius: getSize(18, 19, 20, 22, 24),
        padding: getSize(14, 15, 16, 20, 24),
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    serviceContent: {
        flexDirection: 'row-reverse',
        gap: 12,
        marginBottom: getSize(12, 14, 16, 20, 24),
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: getSize(6, 7, 8, 10, 12), // Make space for the overlapping badge
    },
    avatar: {
        width: getSize(56, 58, 60, 72, 80),
        height: getSize(56, 58, 60, 72, 80),
        borderRadius: getSize(28, 29, 30, 36, 40),
        backgroundColor: '#f1f5f9',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -6, // Halfway out (approx)
        alignSelf: 'center', // Center horizontally
        left: '50%',
        marginLeft: getSize(-9, -9.5, -10, -11, -12), // Half of width to center exact
        width: getSize(18, 19, 20, 22, 24),
        height: getSize(18, 19, 20, 22, 24),
        backgroundColor: 'white', // White background for contrast
        borderRadius: getSize(9, 9.5, 10, 11, 12), // Circular
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    serviceInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    serviceHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.base,
        color: '#0f172a',
        textAlign: 'right',
        marginBottom: 2,
    },
    serviceCategory: {
        fontFamily: 'Cairo_500Medium',
        fontSize: fontSize.xs,
        color: '#64748b',
        textAlign: 'right',
    },
    serviceHeartBtn: {
        padding: 0,
    },
    serviceFooter: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: getSize(6, 7, 8, 10, 12),
        gap: 12,
    },
    ratingContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.sm,
        color: '#0f172a',
    },
    servicePrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.sm,
        color: '#0f172a',
    },
    cardBottomRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    bookButton: {
        flex: 1,
        backgroundColor: '#f0f9ff',
        borderRadius: getSize(10, 11, 12, 14, 16),
        height: getSize(40, 42, 44, 48, 52),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    bookButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: fontSize.base,
        color: '#0f172a',
    },
    });
};
