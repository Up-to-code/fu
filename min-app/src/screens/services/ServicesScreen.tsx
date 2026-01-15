// File: src/screens/services/ServicesScreen.tsx
// Purpose: Freelancer Services Marketplace with bottom sheet filter

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Header, SearchBar } from '../shared';
import { COLORS } from '../../constants/theme';
import { FilterBottomSheet, FilterBottomSheetRef } from '../shared';
import { ServicesScreenProvider } from './types/services';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

const TYPE_FILTERS = [
    { id: 'all', label: 'الكل' },
    { id: 'freelancer', label: 'مستقلين' },
    { id: 'company', label: 'شركات' },
];

const CATEGORIES = [
    { id: 'all', label: 'جميع الخدمات' },
    { id: 'cleaning', label: 'التنظيف' },
    { id: 'interior', label: 'التصميم الداخلي' },
    { id: 'handyman', label: 'الصيانة المنزلية' },
    { id: 'moving', label: 'النقل والتوصيل' },
    { id: 'furniture', label: 'تركيب الأثاث' },
    { id: 'electrical', label: 'الكهرباء والسباكة' },
];

const PRICE_RANGES = [
    { id: 'all', label: 'جميع الأسعار', min: 0, max: Infinity },
    { id: 'budget', label: 'اقتصادي (أقل من 200)', min: 0, max: 200 },
    { id: 'mid', label: 'متوسط (200-500)', min: 200, max: 500 },
    { id: 'premium', label: 'مميز (أكثر من 500)', min: 500, max: Infinity },
];

const LOCATIONS = [
    { id: 'all', label: 'جميع المدن' },
    { id: 'riyadh', label: 'الرياض' },
    { id: 'jeddah', label: 'جدة' },
    { id: 'dammam', label: 'الدمام' },
    { id: 'makkah', label: 'مكة' },
    { id: 'madinah', label: 'المدينة' },
];

const PROVIDERS = [
    {
        id: '1',
        name: 'شركة النظافة المتكاملة',
        type: 'company',
        category: 'التنظيف',
        categoryId: 'cleaning',
        avatar: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80',
        rating: 4.9,
        reviews: 234,
        price: 150,
        priceLabel: 'من 150 ر.س',
        location: 'الرياض',
        locationId: 'riyadh',
        verified: true,
        services: ['تنظيف منازل', 'تنظيف مكاتب', 'تنظيف نوافذ'],
    },
    {
        id: '2',
        name: 'أحمد - مصمم داخلي',
        type: 'freelancer',
        category: 'التصميم الداخلي',
        categoryId: 'interior',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        rating: 4.8,
        reviews: 127,
        price: 500,
        priceLabel: 'من 500 ر.س',
        location: 'الرياض',
        locationId: 'riyadh',
        verified: true,
        services: ['تصميم داخلي', 'ديكور', 'تنسيق أثاث'],
    },
    {
        id: '3',
        name: 'فريق الصيانة السريع',
        type: 'company',
        category: 'الصيانة المنزلية',
        categoryId: 'handyman',
        avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&q=80',
        rating: 4.7,
        reviews: 189,
        price: 100,
        priceLabel: 'من 100 ر.س',
        location: 'جدة',
        locationId: 'jeddah',
        verified: true,
        services: ['سباكة', 'كهرباء', 'نجارة', 'دهان'],
    },
] as ServicesScreenProvider[];

export default function ServicesScreen() {
    const router = useRouter();
    const bottomSheetRef = useRef<FilterBottomSheetRef>(null);

    const [savedProviders, setSavedProviders] = useState<Set<string>>(new Set());
    const [activeTypeFilter, setActiveTypeFilter] = useState('all');
    const [activeCategory, setActiveCategory] = useState('all');
    const [activePriceRange, setActivePriceRange] = useState('all');
    const [activeLocation, setActiveLocation] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSave = (id: string) => {
        setSavedProviders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (activeCategory !== 'all') count++;
        if (activePriceRange !== 'all') count++;
        if (activeLocation !== 'all') count++;
        return count;
    };

    const clearAllFilters = () => {
        setActiveCategory('all');
        setActivePriceRange('all');
        setActiveLocation('all');
    };

    const openFilterSheet = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const selectedPriceRange = PRICE_RANGES.find(p => p.id === activePriceRange) || PRICE_RANGES[0];

    const filteredProviders = PROVIDERS.filter(p => {
        const matchesType = activeTypeFilter === 'all' || p.type === activeTypeFilter;
        const matchesCategory = activeCategory === 'all' || p.categoryId === activeCategory;
        const matchesPrice = p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max;
        const matchesLocation = activeLocation === 'all' || p.locationId === activeLocation;
        const matchesSearch = p.name.includes(searchQuery) || p.category.includes(searchQuery);
        return matchesType && matchesCategory && matchesPrice && matchesLocation && matchesSearch;
    });

    const renderProvider = ({ item: provider }: { item: ServicesScreenProvider }) => (
        <TouchableOpacity
            onPress={() => router.push(`/services/${provider.id}` as any)}
            activeOpacity={0.7}
            style={styles.providerItem}
        >
            <View style={styles.avatarWrapper}>
                <Image
                    source={{ uri: provider.avatar }}
                    style={styles.profileAvatar}
                    resizeMode="cover"
                />
                {provider.verified && (
                    <View style={styles.verifiedBadge}>
                        <Feather name="check" size={isTablet ? 12 : 10} color="white" />
                    </View>
                )}
            </View>
            <View style={styles.providerDetails}>
                <View style={styles.nameRow}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.providerName}>{provider.name}</Text>
                        <View style={styles.categoryRow}>
                            <Text style={styles.providerCategory}>{provider.category}</Text>
                            <Text style={styles.categorySeparator}> • </Text>
                            <Text style={styles.providerLocation}>{provider.location}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            toggleSave(provider.id);
                        }}
                        style={styles.saveButton}
                    >
                        <Feather
                            name="heart"
                            size={isTablet ? 20 : 18}
                            color={savedProviders.has(provider.id) ? "#EF4444" : COLORS.textLight}
                            fill={savedProviders.has(provider.id) ? "#EF4444" : "none"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomRow}>
                    <View style={styles.ratingPriceRow}>
                        <View style={styles.ratingRow}>
                            <Feather name="star" size={isTablet ? 16 : 14} color="#F59E0B" fill="#F59E0B" />
                            <Text style={styles.ratingText}>{provider.rating}</Text>
                            <Text style={styles.reviewCount}>({provider.reviews})</Text>
                        </View>
                        <Text style={styles.price}>{provider.priceLabel}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header title="المستقلون والشركات" showBack />
                
                <View style={styles.searchContainer}>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="ابحث عن خدمة أو مقدم خدمة..."
                    />
                    <TouchableOpacity
                        onPress={openFilterSheet}
                        style={styles.filterButton}
                    >
                        <Feather name="sliders" size={20} color={COLORS.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.typeFiltersContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
                        style={{ transform: [{ scaleX: -1 }] }}
                    >
                        {TYPE_FILTERS.map(filter => (
                            <TouchableOpacity
                                key={filter.id}
                                onPress={() => setActiveTypeFilter(filter.id)}
                                style={[
                                    styles.typeFilterChip,
                                    {
                                        transform: [{ scaleX: -1 }],
                                        backgroundColor: activeTypeFilter === filter.id ? COLORS.primary : '#f1f5f9'
                                    }
                                ]}
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    styles.typeFilterText,
                                    { color: activeTypeFilter === filter.id ? 'white' : '#475569' }
                                ]}>
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>


                <View style={styles.listContainer}>
                    <FlashList
                        data={filteredProviders}
                        renderItem={renderProvider}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Feather name="search" size={48} color="#cbd5e1" />
                                <Text style={styles.emptyTitle}>لا توجد نتائج</Text>
                                <Text style={styles.emptySubtitle}>جرب تغيير معايير البحث</Text>
                            </View>
                        }
                    />
                </View>
            </SafeAreaView>

            <FilterBottomSheet
                ref={bottomSheetRef}
                categories={CATEGORIES}
                priceRanges={PRICE_RANGES}
                locations={LOCATIONS}
                activeCategory={activeCategory}
                activePriceRange={activePriceRange}
                activeLocation={activeLocation}
                onCategoryChange={setActiveCategory}
                onPriceRangeChange={setActivePriceRange}
                onLocationChange={setActiveLocation}
                onClearAll={clearAllFilters}
                resultsCount={filteredProviders.length}
            />
        </View>
    );
}

const getStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: isTablet ? 24 : 16,
        paddingVertical: isTablet ? 16 : 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 22 : isSmallScreen ? 16 : 18,
        color: '#1e293b',
    },
    searchContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: isTablet ? 12 : 8,
        paddingHorizontal: isTablet ? 24 : 16,
        paddingTop: isTablet ? 16 : 12,
        paddingBottom: isTablet ? 16 : 12,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: isTablet ? 12 : 8,
        paddingHorizontal: isTablet ? 16 : 12,
        paddingVertical: isTablet ? 14 : 10,
    },
    searchInput: {
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Cairo_500Medium',
        color: '#1e293b',
        marginRight: isTablet ? 12 : 8,
        fontSize: isTablet ? 16 : isSmallScreen ? 13 : 14,
    },
    filterButton: {
        width: isTablet ? 52 : 44,
        height: isTablet ? 52 : 44,
        backgroundColor: '#f8fafc',
        borderRadius: isTablet ? 12 : 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeFiltersContainer: {
        marginBottom: isTablet ? 12 : 8,
    },
    typeFilterChip: {
        paddingHorizontal: isTablet ? 20 : 16,
        paddingVertical: isTablet ? 10 : 8,
        borderRadius: isTablet ? 10 : 8,
    },
    typeFilterText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 15 : isSmallScreen ? 12 : 13,
    },
    listContainer: {
        flex: 1,
    },
    providerItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: isTablet ? 24 : 16,
        paddingVertical: isTablet ? 18 : 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        backgroundColor: 'white',
    },
    avatarWrapper: {
        position: 'relative',
        marginLeft: isTablet ? 16 : 12,
    },
    profileAvatar: {
        width: isTablet ? 72 : isSmallScreen ? 50 : 56,
        height: isTablet ? 72 : isSmallScreen ? 50 : 56,
        borderRadius: isTablet ? 36 : isSmallScreen ? 25 : 28,
        backgroundColor: '#f1f5f9',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: isTablet ? 22 : 18,
        height: isTablet ? 22 : 18,
        borderRadius: isTablet ? 11 : 9,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    providerDetails: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: isTablet ? 8 : 6,
    },
    nameContainer: {
        flex: 1,
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
        textAlign: 'right',
        marginBottom: 4,
    },
    categoryRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    providerCategory: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: isTablet ? 15 : isSmallScreen ? 12 : 13,
        textAlign: 'right',
    },
    categorySeparator: {
        fontFamily: 'Cairo_500Medium',
        color: '#94a3b8',
        fontSize: isTablet ? 15 : isSmallScreen ? 12 : 13,
    },
    providerLocation: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: isTablet ? 15 : isSmallScreen ? 12 : 13,
        textAlign: 'right',
    },
    bottomRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingPriceRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: isTablet ? 16 : 12,
        flex: 1,
    },
    ratingRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: isTablet ? 16 : isSmallScreen ? 12 : 14,
    },
    reviewCount: {
        fontFamily: 'Cairo_500Medium',
        color: '#94a3b8',
        fontSize: isTablet ? 14 : isSmallScreen ? 10 : 12,
    },
    price: {
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 17 : isSmallScreen ? 13 : 15,
        color: COLORS.primary,
    },
    saveButton: {
        padding: 4,
        marginTop: -2,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#94a3b8',
        fontSize: 18,
        marginTop: 16,
    },
    emptySubtitle: {
        fontFamily: 'Cairo_500Medium',
        color: '#94a3b8',
        fontSize: 14,
        marginTop: 8,
    },
});

const styles = getStyles();
