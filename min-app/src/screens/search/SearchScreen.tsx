// Search Discovery Screen - Categories, recent searches, suggestions
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const isTablet = Dimensions.get('window').width >= 768;

const RECENT = ['صوفا مودرن', 'طاولة قهوة', 'كرسي مكتب'];
const POPULAR = ['كنب زاوية', 'سرير ملكي', 'مكتب خشب', 'إضاءة ذكية'];
const ALL_TERMS = ['صوفا', 'صوفا مودرن', 'صوفا زاوية', 'طاولة', 'طاولة قهوة', 'طاولة طعام', 'كرسي', 'كرسي مكتب', 'سرير', 'مكتب', 'إضاءة'];
const CATEGORIES = [
    { id: '1', name: 'كنب ومجالس', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80' },
    { id: '2', name: 'غرف نوم', img: 'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=300&q=80' },
    { id: '3', name: 'طاولات', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300&q=80' },
    { id: '4', name: 'إضاءة', img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80' },
];

// Reusable Tag Component
const Tag = ({ icon, text, onPress, primary }: { icon: any; text: string; onPress: () => void; primary?: boolean }) => (
    <TouchableOpacity
        onPress={onPress}
        className={`flex-row-reverse items-center gap-2 px-4 py-2 rounded-full ${primary ? 'bg-primary/5 border border-primary/20' : 'bg-slate-50'}`}
    >
        <Feather name={icon} size={14} color={primary ? COLORS.primary : '#94a3b8'} />
        <Text className={`font-cairo-medium text-sm ${primary ? 'text-primary' : 'text-slate-600'}`}>{text}</Text>
    </TouchableOpacity>
);

export default function SearchScreen() {
    const router = useRouter();
    const { q } = useLocalSearchParams<{ q?: string }>();
    const [query, setQuery] = useState(q || '');

    const suggestions = query.length > 0 ? ALL_TERMS.filter(t => t.includes(query) && t !== query).slice(0, 5) : [];
    const goResults = (term: string) => router.push(`/search/results?q=${encodeURIComponent(term)}` as any);

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            {/* Search Bar */}
            <View className="flex-row-reverse items-center gap-3 px-5 py-3">
                <TouchableOpacity onPress={() => router.back()}><Feather name="arrow-right" size={24} color={COLORS.text} /></TouchableOpacity>
                <View className="flex-1 flex-row-reverse items-center bg-slate-50 rounded-xl px-4 py-3">
                    <Feather name="search" size={20} color="#94a3b8" />
                    <TextInput
                        className="flex-1 text-right font-cairo-medium text-base mr-2"
                        placeholder="ابحث عن منتج..."
                        placeholderTextColor="#94a3b8"
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={() => query && goResults(query)}
                        returnKeyType="search"
                        autoFocus
                    />
                    {query.length > 0 && <TouchableOpacity onPress={() => setQuery('')}><Feather name="x" size={18} color="#94a3b8" /></TouchableOpacity>}
                </View>
                <TouchableOpacity onPress={() => router.push('/search/image' as any)}><Feather name="camera" size={22} color={COLORS.primary} /></TouchableOpacity>
            </View>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <View className="px-5 py-2 border-b border-slate-100">
                    {suggestions.map(term => (
                        <TouchableOpacity key={term} onPress={() => setQuery(term)} className="flex-row-reverse items-center gap-3 py-3">
                            <Feather name="search" size={16} color="#94a3b8" />
                            <Text className="flex-1 font-cairo-medium text-slate-700 text-right">{term}</Text>
                            <Feather name="arrow-up-right" size={16} color="#94a3b8" />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
                {query.length === 0 && (
                    <>
                        {/* Recent */}
                        <View className="px-5 py-4">
                            <View className="flex-row-reverse items-center justify-between mb-3">
                                <Text className="font-cairo-bold text-slate-800">عمليات البحث الأخيرة</Text>
                                <TouchableOpacity><Text className="font-cairo-medium text-slate-400 text-xs">مسح</Text></TouchableOpacity>
                            </View>
                            <View className="flex-row-reverse flex-wrap gap-2">
                                {RECENT.map(t => <Tag key={t} icon="clock" text={t} onPress={() => goResults(t)} />)}
                            </View>
                        </View>

                        {/* Popular */}
                        <View className="px-5 pb-4">
                            <Text className="font-cairo-bold text-slate-800 mb-3">الأكثر بحثاً</Text>
                            <View className="flex-row-reverse flex-wrap gap-2">
                                {POPULAR.map(t => <Tag key={t} icon="trending-up" text={t} onPress={() => goResults(t)} primary />)}
                            </View>
                        </View>

                        {/* Categories */}
                        <View className="px-5">
                            <Text className="font-cairo-bold text-slate-800 mb-3">تصفح حسب التصنيف</Text>
                            <View className="flex-row-reverse flex-wrap justify-between">
                                {CATEGORIES.map(c => (
                                    <TouchableOpacity key={c.id} onPress={() => router.push(`/category/${c.id}` as any)} className="w-[48%] mb-3 rounded-2xl overflow-hidden">
                                        <Image source={{ uri: c.img }} className="w-full h-24" resizeMode="cover" />
                                        <View className="absolute inset-0 bg-black/30 items-center justify-center">
                                            <Text className="font-cairo-bold text-white text-base">{c.name}</Text>
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
                <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-100">
                    <TouchableOpacity onPress={() => goResults(query)} className="bg-primary py-4 rounded-2xl flex-row-reverse items-center justify-center gap-2">
                        <Feather name="search" size={20} color="white" />
                        <Text className="font-cairo-bold text-white text-base">بحث عن &quot;{query}&quot;</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}
