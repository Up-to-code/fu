// Search Discovery Screen - Categories, recent searches, suggestions
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar, FilterChip } from '../shared';
import { useSearchHistory } from './_hooks';
import { COLORS } from '../../constants/theme';
import { styles } from './StyleSheets/SearchScreen.styles';

const RECENT = ['صوفا مودرن', 'طاولة قهوة', 'كرسي مكتب'];
const POPULAR = ['كنب زاوية', 'سرير ملكي', 'مكتب خشب', 'إضاءة ذكية'];
const ALL_TERMS = ['صوفا', 'صوفا مودرن', 'صوفا زاوية', 'طاولة', 'طاولة قهوة', 'طاولة طعام', 'كرسي', 'كرسي مكتب', 'سرير', 'مكتب', 'إضاءة'];
const CATEGORIES = [
    { id: '1', name: 'كنب ومجالس', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80' },
    { id: '2', name: 'غرف نوم', img: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=300&q=80' },
    { id: '3', name: 'طاولات', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300&q=80' },
    { id: '4', name: 'إضاءة', img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80' },
];

export default function SearchScreen() {
    const router = useRouter();
    const { q } = useLocalSearchParams<{ q?: string }>();
    const [query, setQuery] = useState(q || '');
    const { recentSearches, addSearch, clearHistory } = useSearchHistory();

    const suggestions = query.length > 0 ? ALL_TERMS.filter(t => t.includes(query) && t !== query).slice(0, 5) : [];
    const goResults = async (term: string) => {
        await addSearch(term);
        router.push(`/search/results?q=${encodeURIComponent(term)}` as any);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header with Search Bar and Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="arrow-right" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <SearchBar
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={() => query && goResults(query)}
                        onClear={() => setQuery('')}
                        onCameraPress={() => router.push('/search/image' as any)}
                        showCamera
                        placeholder="ابحث عن منتج..."
                        returnKeyType="search"
                        autoFocus
                    />
                </View>
            </View>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    {suggestions.map(term => (
                        <TouchableOpacity key={term} onPress={() => setQuery(term)} style={styles.suggestionItem}>
                            <Feather name="search" size={16} color="#94a3b8" />
                            <Text style={styles.suggestionText}>{term}</Text>
                            <Feather name="arrow-up-right" size={16} color="#94a3b8" />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                {query.length === 0 && (
                    <>
                        {/* Recent */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>عمليات البحث الأخيرة</Text>
                                <TouchableOpacity onPress={clearHistory}>
                                    <Text style={styles.clearText}>مسح</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.chipsContainer}>
                                {recentSearches.length > 0 ? recentSearches.map(t => <FilterChip key={t} icon="clock" text={t} onPress={() => goResults(t)} />) : RECENT.map(t => <FilterChip key={t} icon="clock" text={t} onPress={() => goResults(t)} />)}
                            </View>
                        </View>

                        {/* Popular */}
                        <View style={[styles.section, { paddingBottom: 16 }]}>
                            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>الأكثر بحثاً</Text>
                            <View style={styles.chipsContainer}>
                                {POPULAR.map(t => <FilterChip key={t} icon="trending-up" text={t} onPress={() => goResults(t)} primary />)}
                            </View>
                        </View>

                        {/* Categories */}
                        <View style={styles.categoriesContainer}>
                            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>تصفح حسب التصنيف</Text>
                            <View style={styles.categoriesGrid}>
                                {CATEGORIES.map(c => (
                                    <TouchableOpacity key={c.id} onPress={() => router.push(`/category/${c.id}` as any)} style={styles.categoryCard}>
                                        <Image source={{ uri: c.img }} style={styles.categoryImage} resizeMode="cover" />
                                        <View style={styles.categoryOverlay}>
                                            <Text style={styles.categoryName}>{c.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* Bottom Search Button */}
            {query.length > 0 && (
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity onPress={() => goResults(query)} style={styles.searchButton}>
                        <Feather name="search" size={20} color="white" />
                        <Text style={styles.searchButtonText}>بحث عن &quot;{query}&quot;</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}
