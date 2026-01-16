// Filter Screen - Price range, type, brands
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, FilterChip, PrimaryButton } from '../shared';
import { COLORS } from '../../constants/theme';
import { useRTL } from '../../hooks/useRTL';
import { useResponsive } from '../../hooks/useResponsive';
import { getStyles } from './StyleSheets/FilterScreen.styles';

const TYPES = ['الكل', 'كنب', 'طاولات', 'كراسي', 'أسرة', 'إضاءة', 'ديكور'];
const BRANDS = ['ايكيا', 'هوم سنتر', 'بوتري بارن', 'ويست إلم', 'زارا هوم'];
const SORT_OPTIONS = ['الأحدث', 'السعر: الأقل', 'السعر: الأعلى', 'الأكثر مبيعاً'];

export default function FilterScreen() {
    const router = useRouter();
    const { isRTL, textAlign } = useRTL();
    const { getSize } = useResponsive();
    const styles = getStyles(isRTL, getSize);
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
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <Header
                title="الفلترة"
                rightAction={
                    <TouchableOpacity onPress={handleReset}>
                        <Text style={{ fontFamily: 'Cairo_500Medium', fontSize: 13, color: COLORS.primary }}>مسح</Text>
                    </TouchableOpacity>
                }
                showBack
            />

            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
                {/* Price Range */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>نطاق السعر</Text>
                    <View style={styles.priceRangeContainer}>
                        <View style={styles.priceInputContainer}>
                            <Text style={styles.priceLabel}>من</Text>
                            <TextInput
                                style={styles.priceInput}
                                placeholder="0"
                                placeholderTextColor="#94a3b8"
                                keyboardType="numeric"
                                value={minPrice}
                                onChangeText={setMinPrice}
                            />
                        </View>
                        <View style={styles.priceInputContainer}>
                            <Text style={styles.priceLabel}>إلى</Text>
                            <TextInput
                                style={styles.priceInput}
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
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>النوع</Text>
                    <View style={styles.chipsContainer}>
                        {TYPES.map(t => (
                            <FilterChip
                                key={t}
                                text={t}
                                onPress={() => setSelectedType(t)}
                                primary={selectedType === t}
                            />
                        ))}
                    </View>
                </View>

                {/* Brands */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>الماركة</Text>
                    <View style={styles.chipsContainer}>
                        {BRANDS.map(b => {
                            const selected = selectedBrands.includes(b);
                            return (
                                <TouchableOpacity
                                    key={b}
                                    onPress={() => toggleBrand(b)}
                                    style={[
                                        selected ? styles.brandButtonSelected : styles.brandButtonUnselected,
                                        styles.brandButton
                                    ]}
                                >
                                    {selected && <Feather name="check" size={14} color="white" />}
                                    <Text style={selected ? styles.brandTextSelected : styles.brandTextUnselected}>{b}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Sort */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>الترتيب</Text>
                    <View style={styles.chipsContainer}>
                        {SORT_OPTIONS.map(s => (
                            <TouchableOpacity
                                key={s}
                                onPress={() => setSort(s)}
                                style={[
                                    sort === s ? styles.sortButtonSelected : styles.sortButtonUnselected,
                                    styles.sortButton
                                ]}
                            >
                                <Text style={sort === s ? styles.sortTextSelected : styles.sortTextUnselected}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Apply Button */}
            <View style={styles.footer}>
                <PrimaryButton
                    label="تطبيق الفلتر"
                    onPress={handleApply}
                />
            </View>
        </SafeAreaView>
    );
}
