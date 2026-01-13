// File: src/screens/services/ServicesScreen.tsx
// Purpose: Freelancers & Companies Marketplace Screen - Modern Clean UI

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const TYPE_FILTERS = [
    { id: 'all', label: 'الكل' },
    { id: 'freelancer', label: 'مستقلين' },
    { id: 'company', label: 'شركات' },
];

const CATEGORIES = [
    { id: 'all', label: 'جميع التصنيفات' },
    { id: 'interior', label: 'تصميم داخلي' },
    { id: 'renovation', label: 'تجديد وتطوير' },
    { id: 'furniture', label: 'تركيب أثاث' },
    { id: 'kitchen', label: 'تصميم مطابخ' },
    { id: 'bedroom', label: 'تصميم غرف نوم' },
    { id: 'consultation', label: 'استشارات ديكور' },
];

const PRICE_RANGES = [
    { id: 'all', label: 'جميع الأسعار', min: 0, max: Infinity },
    { id: 'budget', label: 'اقتصادي (أقل من 300)', min: 0, max: 300 },
    { id: 'mid', label: 'متوسط (300-700)', min: 300, max: 700 },
    { id: 'premium', label: 'مميز (أكثر من 700)', min: 700, max: Infinity },
];

const LOCATIONS = [
    { id: 'all', label: 'جميع المدن' },
    { id: 'riyadh', label: 'الرياض' },
    { id: 'jeddah', label: 'جدة' },
    { id: 'dammam', label: 'الدمام' },
];

const PROVIDERS = [
    {
        id: '1',
        name: 'أحمد المصمم',
        type: 'freelancer',
        category: 'تصميم داخلي',
        categoryId: 'interior',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        rating: 4.9,
        reviews: 127,
        price: 500,
        priceLabel: 'من 500 ر.س',
        location: 'الرياض',
        locationId: 'riyadh',
        verified: true,
    },
    {
        id: '2',
        name: 'شركة التطوير الحديث',
        type: 'company',
        category: 'تجديد وتطوير',
        categoryId: 'renovation',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
        rating: 4.8,
        reviews: 89,
        price: 1000,
        priceLabel: 'من 1000 ر.س',
        location: 'جدة',
        locationId: 'jeddah',
        verified: true,
    },
    {
        id: '3',
        name: 'سارة للديكور',
        type: 'freelancer',
        category: 'استشارات ديكور',
        categoryId: 'consultation',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        rating: 4.7,
        reviews: 156,
        price: 200,
        priceLabel: 'من 200 ر.س',
        location: 'الدمام',
        locationId: 'dammam',
        verified: true,
    },
    {
        id: '4',
        name: 'فريق التركيب السريع',
        type: 'company',
        category: 'تركيب أثاث',
        categoryId: 'furniture',
        avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80',
        rating: 4.9,
        reviews: 203,
        price: 150,
        priceLabel: 'من 150 ر.س',
        location: 'الرياض',
        locationId: 'riyadh',
        verified: true,
    },
    {
        id: '5',
        name: 'مصمم المطابخ',
        type: 'freelancer',
        category: 'تصميم مطابخ',
        categoryId: 'kitchen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        rating: 4.8,
        reviews: 94,
        price: 800,
        priceLabel: 'من 800 ر.س',
        location: 'الرياض',
        locationId: 'riyadh',
        verified: false,
    },
    {
        id: '6',
        name: 'استوديو التصميم',
        type: 'company',
        category: 'تصميم غرف نوم',
        categoryId: 'bedroom',
        avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80',
        rating: 4.9,
        reviews: 112,
        price: 600,
        priceLabel: 'من 600 ر.س',
        location: 'جدة',
        locationId: 'jeddah',
        verified: true,
    },
];

export default function ServicesScreen() {
    const router = useRouter();
    const [savedProviders, setSavedProviders] = useState<Set<string>>(new Set());
    const [activeTypeFilter, setActiveTypeFilter] = useState('all');
    const [activeCategory, setActiveCategory] = useState('all');
    const [activePriceRange, setActivePriceRange] = useState('all');
    const [activeLocation, setActiveLocation] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);

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

    const selectedPriceRange = PRICE_RANGES.find(p => p.id === activePriceRange) || PRICE_RANGES[0];

    const filteredProviders = PROVIDERS.filter(p => {
        const matchesType = activeTypeFilter === 'all' || p.type === activeTypeFilter;
        const matchesCategory = activeCategory === 'all' || p.categoryId === activeCategory;
        const matchesPrice = p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max;
        const matchesLocation = activeLocation === 'all' || p.locationId === activeLocation;
        const matchesSearch = p.name.includes(searchQuery) || p.category.includes(searchQuery);
        return matchesType && matchesCategory && matchesPrice && matchesLocation && matchesSearch;
    });

    const FilterChip = ({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) => (
        <TouchableOpacity
            onPress={onPress}
            className={`px-4 py-2.5 rounded-xl mr-2 mb-2 ${
                isActive ? 'bg-primary' : 'bg-slate-100'
            }`}
            style={isActive ? { backgroundColor: COLORS.primary } : {}}
        >
            <Text className={`font-cairo-medium text-sm ${isActive ? 'text-white' : 'text-slate-700'}`}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-right" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">المصممون والشركات</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {/* Search Bar */}
                <View className="flex-row-reverse items-center gap-3 mb-4">
                    <View className="flex-1 flex-row-reverse items-center bg-gray-50 rounded-2xl px-4 py-3.5">
                        <Feather name="search" size={20} color={COLORS.textLight} />
                        <TextInput
                            placeholder="ابحث عن مصمم، شركة، أو خدمة..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            className="flex-1 text-right font-cairo-medium text-slate-800 mr-3"
                            placeholderTextColor={COLORS.textLight}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowFilterModal(true)}
                        className="relative w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center"
                    >
                        <Feather name="sliders" size={20} color={COLORS.text} />
                        {getActiveFiltersCount() > 0 && (
                            <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center" style={{ backgroundColor: COLORS.primary }}>
                                <Text className="text-white text-xs font-cairo-bold">{getActiveFiltersCount()}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Type Filters */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10, paddingHorizontal: 0 }}
                    style={{ transform: [{ scaleX: -1 }], marginHorizontal: -20 }}
                >
                    {TYPE_FILTERS.map(filter => (
                        <TouchableOpacity
                            key={filter.id}
                            onPress={() => setActiveTypeFilter(filter.id)}
                            className={`px-5 py-2.5 rounded-xl ${
                                activeTypeFilter === filter.id ? 'bg-primary' : 'bg-gray-50'
                            }`}
                            style={{ 
                                transform: [{ scaleX: -1 }],
                                backgroundColor: activeTypeFilter === filter.id ? COLORS.primary : undefined
                            }}
                        >
                            <Text className={`font-cairo-bold text-sm ${
                                activeTypeFilter === filter.id ? 'text-white' : 'text-slate-700'
                            }`}>
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Results Count */}
                {getActiveFiltersCount() > 0 && (
                    <View className="flex-row-reverse justify-between items-center py-3 mb-4">
                        <Text className="font-cairo-medium text-slate-600 text-sm">
                            {filteredProviders.length} نتيجة
                        </Text>
                        <TouchableOpacity onPress={clearAllFilters}>
                            <Text className="font-cairo-medium text-sm" style={{ color: COLORS.primary }}>
                                مسح الفلاتر
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View className="gap-3">
                    {filteredProviders.map((provider) => (
                        <TouchableOpacity
                            key={provider.id}
                            onPress={() => router.push(`/services/${provider.id}` as any)}
                            activeOpacity={0.9}
                            className="bg-white rounded-3xl p-5"
                        >
                            <View className="flex-row-reverse gap-4">
                                {/* Avatar */}
                                <View className="relative">
                                    <View className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden">
                                        <Image
                                            source={{ uri: provider.avatar }}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    {provider.verified && (
                                        <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                                            <Feather name="check" size={12} color="white" />
                                        </View>
                                    )}
                                </View>

                                {/* Info */}
                                <View className="flex-1 justify-between">
                                    <View className="flex-row-reverse justify-between items-start mb-2">
                                        <View className="flex-1">
                                            <Text className="font-cairo-bold text-slate-900 text-base text-right mb-1">
                                                {provider.name}
                                            </Text>
                                            <Text className="font-cairo-medium text-slate-500 text-xs text-right">
                                                {provider.category} • {provider.location}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                toggleSave(provider.id);
                                            }}
                                            className="p-1.5"
                                        >
                                            <Feather
                                                name="heart"
                                                size={20}
                                                color={savedProviders.has(provider.id) ? "#EF4444" : COLORS.textLight}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View className="flex-row-reverse items-center justify-between">
                                        <View className="flex-row-reverse items-center gap-2">
                                            <View className="flex-row-reverse items-center gap-1">
                                                <Feather name="star" size={14} color="#F59E0B" />
                                                <Text className="font-cairo-bold text-slate-900 text-sm">{provider.rating}</Text>
                                            </View>
                                            <Text className="font-cairo-medium text-slate-400 text-xs">({provider.reviews})</Text>
                                        </View>
                                        <Text className="font-cairo-bold text-base" style={{ color: COLORS.primary }}>{provider.priceLabel}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {filteredProviders.length === 0 && (
                        <View className="items-center justify-center py-20">
                            <Feather name="search" size={48} color="#cbd5e1" />
                            <Text className="font-cairo-bold text-slate-400 text-lg mt-4">لا توجد نتائج</Text>
                            <Text className="font-cairo-medium text-slate-400 text-sm mt-2">جرب تغيير معايير البحث</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Filter Modal */}
            <Modal
                visible={showFilterModal}
                animationType="slide"
                transparent
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl max-h-[80%]">
                        <SafeAreaView edges={['bottom']}>
                            {/* Modal Header */}
                            <View className="flex-row-reverse items-center justify-between px-5 py-4">
                                <Text className="font-cairo-bold text-xl text-slate-900">الفلاتر</Text>
                                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                                    <Feather name="x" size={24} color={COLORS.text} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView className="px-5 py-4">
                                {/* Category Filter */}
                                <View className="mb-6">
                                    <Text className="font-cairo-bold text-slate-900 text-base mb-3 text-right">التصنيف</Text>
                                    <View className="flex-row-reverse flex-wrap">
                                        {CATEGORIES.map(cat => (
                                            <FilterChip
                                                key={cat.id}
                                                label={cat.label}
                                                isActive={activeCategory === cat.id}
                                                onPress={() => setActiveCategory(cat.id)}
                                            />
                                        ))}
                                    </View>
                                </View>

                                {/* Price Range Filter */}
                                <View className="mb-6">
                                    <Text className="font-cairo-bold text-slate-900 text-base mb-3 text-right">نطاق السعر</Text>
                                    <View className="flex-row-reverse flex-wrap">
                                        {PRICE_RANGES.map(price => (
                                            <FilterChip
                                                key={price.id}
                                                label={price.label}
                                                isActive={activePriceRange === price.id}
                                                onPress={() => setActivePriceRange(price.id)}
                                            />
                                        ))}
                                    </View>
                                </View>

                                {/* Location Filter */}
                                <View className="mb-6">
                                    <Text className="font-cairo-bold text-slate-900 text-base mb-3 text-right">المدينة</Text>
                                    <View className="flex-row-reverse flex-wrap">
                                        {LOCATIONS.map(loc => (
                                            <FilterChip
                                                key={loc.id}
                                                label={loc.label}
                                                isActive={activeLocation === loc.id}
                                                onPress={() => setActiveLocation(loc.id)}
                                            />
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>

                            {/* Apply Button */}
                            <View className="px-5 py-4">
                                <TouchableOpacity
                                    onPress={() => setShowFilterModal(false)}
                                    className="py-4 rounded-2xl items-center"
                                    style={{ backgroundColor: COLORS.primary }}
                                >
                                    <Text className="font-cairo-bold text-white text-base">
                                        عرض {filteredProviders.length} نتيجة
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
