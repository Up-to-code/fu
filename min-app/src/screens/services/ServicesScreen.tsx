// File: src/screens/services/ServicesScreen.tsx
// Purpose: Freelancer Services Marketplace with bottom sheet filter

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { COLORS } from '../../constants/theme';
import { FilterBottomSheet, FilterBottomSheetRef } from './_components/FilterBottomSheet';

const { width } = Dimensions.get('window');

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
    },
];

type Provider = typeof PROVIDERS[0];

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

    const renderProvider = ({ item: provider }: { item: Provider }) => (
        <TouchableOpacity
            onPress={() => router.push(`/services/${provider.id}` as any)}
            activeOpacity={0.9}
            style={styles.providerCard}
        >
            <View style={styles.providerContent}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: provider.avatar }}
                            style={styles.avatarImage}
                            resizeMode="cover"
                        />
                    </View>
                    {provider.verified && (
                        <View style={styles.verifiedBadge}>
                            <Feather name="check" size={12} color="white" />
                        </View>
                    )}
                </View>

                <View style={styles.providerInfo}>
                    <View style={styles.providerHeader}>
                        <View style={styles.providerNameContainer}>
                            <Text style={styles.providerName}>{provider.name}</Text>
                            <Text style={styles.providerCategory}>
                                {provider.category} • {provider.location}
                            </Text>
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
                                size={20}
                                color={savedProviders.has(provider.id) ? "#EF4444" : COLORS.textLight}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.providerFooter}>
                        <View style={styles.ratingContainer}>
                            <View style={styles.rating}>
                                <Feather name="star" size={14} color="#F59E0B" />
                                <Text style={styles.ratingText}>{provider.rating}</Text>
                            </View>
                            <Text style={styles.reviewCount}>({provider.reviews})</Text>
                        </View>
                        <Text style={[styles.price, { color: COLORS.primary }]}>{provider.priceLabel}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="arrow-right" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>خدمات المستقلين</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Feather name="search" size={20} color={COLORS.textLight} />
                        <TextInput
                            placeholder="ابحث عن خدمة أو مقدم خدمة..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={styles.searchInput}
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={openFilterSheet}
                        style={styles.filterButton}
                    >
                        <Feather name="sliders" size={20} color={COLORS.text} />
                        {getActiveFiltersCount() > 0 && (
                            <View style={[styles.filterBadge, { backgroundColor: COLORS.primary }]}>
                                <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
                            </View>
                        )}
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

                {getActiveFiltersCount() > 0 && (
                    <View style={styles.resultsBar}>
                        <Text style={styles.resultsText}>
                            {filteredProviders.length} نتيجة
                        </Text>
                        <TouchableOpacity onPress={clearAllFilters}>
                            <Text style={[styles.clearText, { color: COLORS.primary }]}>
                                مسح الفلاتر
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.listContainer}>
                    <FlashList
                        data={filteredProviders}
                        renderItem={renderProvider}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    safeArea: { flex: 1, backgroundColor: 'white' },
    header: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    headerTitle: { fontFamily: 'Cairo_700Bold', fontSize: 18, color: '#1e293b' },
    searchContainer: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
    searchInputContainer: { flex: 1, flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 },
    searchInput: { flex: 1, textAlign: 'right', fontFamily: 'Cairo_500Medium', color: '#1e293b', marginRight: 12, fontSize: 14 },
    filterButton: { position: 'relative', width: 48, height: 48, backgroundColor: '#f8fafc', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    filterBadge: { position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    filterBadgeText: { color: 'white', fontSize: 12, fontFamily: 'Cairo_700Bold' },
    typeFiltersContainer: { marginBottom: 16 },
    typeFilterChip: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16 },
    typeFilterText: { fontFamily: 'Cairo_700Bold', fontSize: 14 },
    resultsBar: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, marginBottom: 8 },
    resultsText: { fontFamily: 'Cairo_500Medium', color: '#64748b', fontSize: 14 },
    clearText: { fontFamily: 'Cairo_500Medium', fontSize: 14 },
    listContainer: { flex: 1 },
    providerCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    providerContent: { flexDirection: 'row-reverse', gap: 16 },
    avatarContainer: { position: 'relative' },
    avatar: { width: 80, height: 80, borderRadius: 16, backgroundColor: '#f1f5f9', overflow: 'hidden' },
    avatarImage: { width: '100%', height: '100%' },
    verifiedBadge: { position: 'absolute', bottom: -4, right: -4, width: 24, height: 24, backgroundColor: '#3b82f6', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    providerInfo: { flex: 1, justifyContent: 'space-between' },
    providerHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    providerNameContainer: { flex: 1 },
    providerName: { fontFamily: 'Cairo_700Bold', color: '#1e293b', fontSize: 16, textAlign: 'right', marginBottom: 4 },
    providerCategory: { fontFamily: 'Cairo_500Medium', color: '#64748b', fontSize: 12, textAlign: 'right' },
    saveButton: { padding: 8 },
    providerFooter: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
    ratingContainer: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
    rating: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
    ratingText: { fontFamily: 'Cairo_700Bold', color: '#1e293b', fontSize: 14 },
    reviewCount: { fontFamily: 'Cairo_500Medium', color: '#94a3b8', fontSize: 12 },
    price: { fontFamily: 'Cairo_700Bold', fontSize: 16 },
    emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
    emptyTitle: { fontFamily: 'Cairo_700Bold', color: '#94a3b8', fontSize: 18, marginTop: 16 },
    emptySubtitle: { fontFamily: 'Cairo_500Medium', color: '#94a3b8', fontSize: 14, marginTop: 8 },
});
