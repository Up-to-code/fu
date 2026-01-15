// File: src/screens/favorites/FavoritesScreen.tsx
// Purpose: Favorites Screen with tabs for Products and Services - StyleSheet Implementation

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/shared';
import { Header, TabBar, ProductGrid } from '../shared';
import { useFavorites, useFavoriteProducts, useFavoriteServices } from './_hooks';
import { COLORS } from '../../constants/theme';
import { TabType } from './types/favorites';

const { width } = Dimensions.get('window');
const numColumns = 2; // Changed from 3 to 2 for better visibility
const gap = 12; // Increased gap
const padding = 20;
const itemSize = (width - (padding * 2) - (gap * (numColumns - 1))) / numColumns;

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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#0f172a',
    },
    headerBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    headerBadgeText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#64748b',
    },
    tabsContainer: {
        flexDirection: 'row-reverse',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTabButton: {
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#64748b',
    },
    activeTabText: {
        color: COLORS.primary,
        fontFamily: 'Cairo_700Bold',
    },
    scrollView: { flex: 1 },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    // Products Grid
    productsGrid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: gap,
    },
    productCard: {
        width: itemSize,
        borderRadius: 12,
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
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        backgroundColor: 'white',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    discountBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#EF4444',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    discountText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: 10,
    },
    productInfo: {
        padding: 10,
    },
    productName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 13,
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
        fontSize: 13,
        color: COLORS.primary,
        textAlign: 'right',
    },
    addToCartBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Services List - Updated
    servicesList: {
        gap: 12,
    },
    serviceCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    serviceContent: {
        flexDirection: 'row-reverse',
        gap: 12,
        marginBottom: 16,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 8, // Make space for the overlapping badge
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f1f5f9',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -6, // Halfway out (approx)
        alignSelf: 'center', // Center horizontally
        left: '50%',
        marginLeft: -10, // Half of width (20/2) to center exact
        width: 20,
        height: 20,
        backgroundColor: 'white', // White background for contrast
        borderRadius: 10, // Circular
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
        fontSize: 15,
        color: '#0f172a',
        textAlign: 'right',
        marginBottom: 2,
    },
    serviceCategory: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
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
        marginTop: 8,
        gap: 12,
    },
    ratingContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 13,
        color: '#0f172a',
    },
    servicePrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 13,
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
        borderRadius: 12,
        height: 44,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    bookButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#0f172a',
    },
});
