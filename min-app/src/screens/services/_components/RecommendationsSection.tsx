// File: src/screens/services/_components/RecommendationsSection.tsx
// Purpose: Recommendations section for related services

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

interface Provider {
    id: string;
    name: string;
    category: string;
    avatar: string;
    rating: number;
    priceLabel: string;
}

interface RecommendationsSectionProps {
    providers: Provider[];
    onPress: (id: string) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
    providers,
    onPress,
}) => {
    if (providers.length === 0) return null;

    return (
        <View className="mt-6">
            <Text className="font-cairo-bold text-xl text-slate-900 text-right mb-4 px-5">
                خدمات مقترحة
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {providers.map((provider) => (
                    <TouchableOpacity
                        key={provider.id}
                        onPress={() => onPress(provider.id)}
                        className="bg-white rounded-2xl p-4 w-48"
                        style={{ transform: [{ scaleX: -1 }] }}
                        activeOpacity={0.8}
                    >
                        <View className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden mb-3">
                            <Image
                                source={{ uri: provider.avatar }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <Text className="font-cairo-bold text-slate-900 text-sm text-right mb-1" numberOfLines={1}>
                            {provider.name}
                        </Text>
                        <Text className="font-cairo-medium text-slate-500 text-xs text-right mb-2" numberOfLines={1}>
                            {provider.category}
                        </Text>
                        <View className="flex-row-reverse items-center justify-between">
                            <View className="flex-row-reverse items-center gap-1">
                                <Feather name="star" size={12} color="#F59E0B" />
                                <Text className="font-cairo-bold text-slate-900 text-xs">
                                    {provider.rating}
                                </Text>
                            </View>
                            <Text className="font-cairo-bold text-xs" style={{ color: COLORS.primary }}>
                                {provider.priceLabel}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
