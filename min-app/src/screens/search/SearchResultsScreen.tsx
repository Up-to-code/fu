// Search Results Screen - Products grid
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../shared';
import { SearchBar, ProductGrid, LoadingSpinner, FilterBottomSheet, FilterBottomSheetRef, FilterOption } from '../shared';
import { useSearch } from './_hooks';
import { COLORS } from '../../constants/theme';
import { useRTL } from '../../hooks/useRTL';
import { useResponsive } from '../../hooks/useResponsive';
import { getStyles } from './StyleSheets/SearchResultsScreen.styles';

const RESULTS = [
    { id: '1', name: 'صوفا مودرن رمادي', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', rating: 4.5 },
    { id: '2', name: 'صوفا زاوية كبيرة', price: 3999, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500', rating: 4.8 },
    { id: '3', name: 'صوفا كلاسيك بيج', price: 1899, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500', rating: 4.2 },
    { id: '4', name: 'طاولة قهوة خشبية', price: 450, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500', rating: 4.7 },
    { id: '5', name: 'كرسي مكتب مريح', price: 850, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500', rating: 4.6 },
    { id: '6', name: 'سرير ملكي فاخر', price: 3200, image: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=500', rating: 4.9 },
];

// Filter Options
const CATEGORIES: FilterOption[] = [
    { id: 'all', label: 'الكل' },
    { id: 'sofas', label: 'كنب ومجالس' },
    { id: 'tables', label: 'طاولات' },
    { id: 'chairs', label: 'كراسي' },
    { id: 'beds', label: 'أسرة' },
    { id: 'lighting', label: 'إضاءة' },
];

const PRICE_RANGES: FilterOption[] = [
    { id: 'all', label: 'جميع الأسعار' },
    { id: 'under-500', label: 'أقل من 500' },
    { id: '500-1000', label: '500-1000' },
    { id: '1000-2000', label: '1000-2000' },
    { id: '2000-5000', label: '2000-5000' },
    { id: 'over-5000', label: 'أكثر من 5000' },
];

const RATINGS: FilterOption[] = [
    { id: 'all', label: 'جميع التقييمات' },
    { id: '4-plus', label: '4+ نجوم' },
    { id: '3-plus', label: '3+ نجوم' },
    { id: '2-plus', label: '2+ نجوم' },
    { id: '1-plus', label: '1+ نجوم' },
];

const SORT_OPTIONS: FilterOption[] = [
    { id: 'newest', label: 'الأحدث' },
    { id: 'price-asc', label: 'السعر: الأقل' },
    { id: 'price-desc', label: 'السعر: الأعلى' },
    { id: 'rating-desc', label: 'الأعلى تقييماً' },
    { id: 'bestseller', label: 'الأكثر مبيعاً' },
];

export default function SearchResultsScreen() {
    const router = useRouter();
    const { q, imageSearch } = useLocalSearchParams<{ q: string; imageSearch?: string }>();
    const { isRTL } = useRTL();
    const { getSize } = useResponsive();
    const styles = getStyles(isRTL, getSize);
    const bottomSheetRef = useRef<FilterBottomSheetRef>(null);
    
    // Handle image search - if imageSearch param exists, show image search results
    const isImageSearch = !!imageSearch;
    
    const {
        query,
        setQuery,
        results,
        isLoading,
        performSearch,
        filters,
        setCategory,
        setPriceRange,
        setRating,
        setSort,
        clearAllFilters,
        getActiveFiltersCount,
        filteredResults,
    } = useSearch(q);

    const openFilterSheet = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    // Apply filters to mock data if no real results
    const dataToFilter = results.length > 0 ? results : RESULTS;
    
    // Apply filters manually to mock data when needed
    const applyFiltersToData = (data: typeof RESULTS) => {
        let filtered = [...data];

        // Filter by price range
        if (filters.priceRange !== 'all') {
            const getPriceRange = (priceRangeId: string): { min: number; max: number } => {
                switch (priceRangeId) {
                    case 'under-500': return { min: 0, max: 500 };
                    case '500-1000': return { min: 500, max: 1000 };
                    case '1000-2000': return { min: 1000, max: 2000 };
                    case '2000-5000': return { min: 2000, max: 5000 };
                    case 'over-5000': return { min: 5000, max: Infinity };
                    default: return { min: 0, max: Infinity };
                }
            };
            const { min, max } = getPriceRange(filters.priceRange);
            filtered = filtered.filter(p => {
                const price = p.price || 0;
                return price >= min && price < max;
            });
        }

        // Filter by rating
        if (filters.rating !== 'all') {
            const getRatingThreshold = (ratingId: string): number => {
                switch (ratingId) {
                    case '4-plus': return 4;
                    case '3-plus': return 3;
                    case '2-plus': return 2;
                    case '1-plus': return 1;
                    default: return 0;
                }
            };
            const threshold = getRatingThreshold(filters.rating);
            filtered = filtered.filter(p => {
                const rating = p.rating || 0;
                return rating >= threshold;
            });
        }

        // Sort results
        filtered.sort((a, b) => {
            switch (filters.sort) {
                case 'price-asc':
                    return (a.price || 0) - (b.price || 0);
                case 'price-desc':
                    return (b.price || 0) - (a.price || 0);
                case 'rating-desc':
                    return (b.rating || 0) - (a.rating || 0);
                case 'bestseller':
                case 'newest':
                default:
                    return 0;
            }
        });

        return filtered;
    };

    // Use filtered results from hook if available, otherwise apply filters to mock data
    const displayResults = results.length > 0 
        ? filteredResults 
        : applyFiltersToData(RESULTS);
    const resultsCount = displayResults.length;
    const activeFiltersCount = getActiveFiltersCount();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header with Search Bar and Filter Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/search' as any)} style={styles.backButton}>
                    <Feather name={isRTL ? "arrow-right" : "arrow-left"} size={24} color={COLORS.text} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <SearchBar
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={() => performSearch(query)}
                        onClear={() => setQuery('')}
                        placeholder="ابحث عن منتج..."
                    />
                </View>
                <TouchableOpacity
                    onPress={openFilterSheet}
                    style={styles.filterButton}
                    activeOpacity={0.7}
                >
                    <Feather name="sliders" size={20} color={COLORS.text} />
                    {activeFiltersCount > 0 && (
                        <View style={styles.filterBadge}>
                            <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Count and Sort */}
            <View style={styles.countSortContainer}>
                <Text style={styles.countText}>
                    {isImageSearch 
                        ? `${resultsCount} نتيجة للبحث بالصورة`
                        : `${resultsCount} نتيجة لـ "${q}"`
                    }
                </Text>
                <View style={styles.sortContainer}>
                    <Text style={styles.sortLabel}>الترتيب:</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.sortChips}
                        style={{ transform: [{ scaleX: -1 }] }}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => setSort(option.id)}
                                style={[
                                    styles.sortChip,
                                    {
                                        transform: [{ scaleX: -1 }],
                                        backgroundColor: filters.sort === option.id ? COLORS.primary : '#f1f5f9',
                                    },
                                ]}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        styles.sortChipText,
                                        { color: filters.sort === option.id ? 'white' : '#475569' },
                                    ]}
                                >
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {/* Results */}
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
                {isLoading ? (
                    <LoadingSpinner message="جاري البحث..." />
                ) : resultsCount > 0 ? (
                    <ProductGrid
                        products={displayResults}
                        onProductPress={p => router.push({
                            pathname: `/product/${p.id}`,
                            params: { 
                                fromSearch: 'true',
                                searchQuery: q
                            }
                        })}
                    />
                ) : (
                    <EmptyState
                        icon="search"
                        title="لا توجد نتائج"
                        description={`لم نجد منتجات تطابق "${query || q}"`}
                        actionLabel="تصفح المنتجات"
                        onAction={() => router.push('/(tabs)/home')}
                    />
                )}
            </ScrollView>

            {/* Filter Bottom Sheet */}
            <FilterBottomSheet
                ref={bottomSheetRef}
                categories={CATEGORIES}
                priceRanges={PRICE_RANGES}
                locations={RATINGS.map(r => ({ id: r.id, label: r.label }))} // Map ratings to locations format
                activeCategory={filters.category}
                activePriceRange={filters.priceRange}
                activeLocation={filters.rating}
                onCategoryChange={setCategory}
                onPriceRangeChange={setPriceRange}
                onLocationChange={setRating}
                onClearAll={clearAllFilters}
                resultsCount={resultsCount}
            />
        </SafeAreaView>
    );
}
