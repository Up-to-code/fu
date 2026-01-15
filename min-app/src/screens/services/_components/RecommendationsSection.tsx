// File: src/screens/services/_components/RecommendationsSection.tsx
// Purpose: Recommendations section for related services

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { RecommendationsSectionProps } from './types/services';
import { styles } from './StyleSheets/RecommendationsSection.styles';

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
    providers,
    onPress,
}) => {
    if (providers.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                خدمات مقترحة
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
            >
                {providers.map((provider) => (
                    <TouchableOpacity
                        key={provider.id}
                        onPress={() => onPress(provider.id)}
                        style={[styles.providerCard, { transform: [{ scaleX: -1 }] }]}
                        activeOpacity={0.8}
                    >
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: provider.avatar }}
                                style={styles.avatar}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.providerName} numberOfLines={1}>
                            {provider.name}
                        </Text>
                        <Text style={styles.providerCategory} numberOfLines={1}>
                            {provider.category}
                        </Text>
                        <View style={styles.bottomRow}>
                            <View style={styles.ratingRow}>
                                <Feather name="star" size={12} color="#F59E0B" />
                                <Text style={styles.ratingText}>
                                    {provider.rating}
                                </Text>
                            </View>
                            <Text style={styles.priceText}>
                                {provider.priceLabel}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
