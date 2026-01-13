// Filter Screen - Price range, type, brands
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const TYPES = ['الكل', 'كنب', 'طاولات', 'كراسي', 'أسرة', 'إضاءة', 'ديكور'];
const BRANDS = ['ايكيا', 'هوم سنتر', 'بوتري بارن', 'ويست إلم', 'زارا هوم'];
const SORT_OPTIONS = ['الأحدث', 'السعر: الأقل', 'السعر: الأعلى', 'الأكثر مبيعاً'];

export default function FilterScreen() {
    const router = useRouter();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedType, setSelectedType] = useState('الكل');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sort, setSort] = useState('الأحدث');

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    const handleApply = () => {
        // Pass filters back via URL params
        const params = new URLSearchParams();
        if (minPrice) params.set('min', minPrice);
        if (maxPrice) params.set('max', maxPrice);
        if (selectedType !== 'الكل') params.set('type', selectedType);
        if (selectedBrands.length) params.set('brands', selectedBrands.join(','));
        params.set('sort', sort);
        router.back();
    };

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setSelectedType('الكل');
        setSelectedBrands([]);
        setSort('الأحدث');
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            {/* Header */}
            <View className="flex-row-reverse items-center justify-between px-5 py-3 border-b border-slate-100">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <Text className="font-cairo-bold text-lg text-slate-800">الفلترة</Text>
                <TouchableOpacity onPress={handleReset}><Text className="font-cairo-medium text-primary text-sm">مسح</Text></TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
                {/* Price Range */}
                <View className="mb-6">
                    <Text className="font-cairo-bold text-slate-800 text-right mb-3">نطاق السعر</Text>
                    <View className="flex-row-reverse gap-3">
                        <View className="flex-1">
                            <Text className="font-cairo-medium text-slate-500 text-xs text-right mb-1">من</Text>
                            <TextInput
                                className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium"
                                placeholder="0"
                                placeholderTextColor="#94a3b8"
                                keyboardType="numeric"
                                value={minPrice}
                                onChangeText={setMinPrice}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="font-cairo-medium text-slate-500 text-xs text-right mb-1">إلى</Text>
                            <TextInput
                                className="bg-slate-50 rounded-xl px-4 py-3 text-right font-cairo-medium"
                                placeholder="10000"
                                placeholderTextColor="#94a3b8"
                                keyboardType="numeric"
                                value={maxPrice}
                                onChangeText={setMaxPrice}
                            />
                        </View>
                    </View>
                </View>

                {/* Type */}
                <View className="mb-6">
                    <Text className="font-cairo-bold text-slate-800 text-right mb-3">النوع</Text>
                    <View className="flex-row-reverse flex-wrap gap-2">
                        {TYPES.map(t => (
                            <TouchableOpacity
                                key={t}
                                onPress={() => setSelectedType(t)}
                                className={`px-4 py-2 rounded-full border ${selectedType === t ? 'bg-primary border-primary' : 'bg-white border-slate-200'}`}
                            >
                                <Text className={`font-cairo-medium text-sm ${selectedType === t ? 'text-white' : 'text-slate-600'}`}>{t}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Brands */}
                <View className="mb-6">
                    <Text className="font-cairo-bold text-slate-800 text-right mb-3">الماركة</Text>
                    <View className="flex-row-reverse flex-wrap gap-2">
                        {BRANDS.map(b => {
                            const selected = selectedBrands.includes(b);
                            return (
                                <TouchableOpacity
                                    key={b}
                                    onPress={() => toggleBrand(b)}
                                    className={`flex-row-reverse items-center gap-2 px-4 py-2 rounded-full border ${selected ? 'bg-primary border-primary' : 'bg-white border-slate-200'}`}
                                >
                                    {selected && <Feather name="check" size={14} color="white" />}
                                    <Text className={`font-cairo-medium text-sm ${selected ? 'text-white' : 'text-slate-600'}`}>{b}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Sort */}
                <View className="mb-6">
                    <Text className="font-cairo-bold text-slate-800 text-right mb-3">الترتيب</Text>
                    <View className="flex-row-reverse flex-wrap gap-2">
                        {SORT_OPTIONS.map(s => (
                            <TouchableOpacity
                                key={s}
                                onPress={() => setSort(s)}
                                className={`px-4 py-2 rounded-full border ${sort === s ? 'bg-primary border-primary' : 'bg-white border-slate-200'}`}
                            >
                                <Text className={`font-cairo-medium text-sm ${sort === s ? 'text-white' : 'text-slate-600'}`}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Apply Button */}
            <View className="px-5 pb-4 border-t border-slate-100 pt-4">
                <TouchableOpacity onPress={handleApply} className="bg-primary py-4 rounded-2xl flex-row-reverse items-center justify-center gap-2">
                    <Feather name="check" size={20} color="white" />
                    <Text className="font-cairo-bold text-white text-base">تطبيق الفلتر</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
