// File: src/screens/home/_components/ServicesSection.tsx
// Purpose: Simple and modern services section for home screen using FlashList

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { COLORS } from '../../../constants/theme';
import { FeaturedProvider } from './types/home';
import { styles } from './StyleSheets/ServicesSection.styles';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const ESTIMATED_ITEM_SIZE = 96;

const FEATURED_PROVIDERS: FeaturedProvider[] = [
    {
        id: '1',
        name: 'أحمد المصمم',
        category: 'تصميم داخلي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        rating: 4.9
    },
    {
        id: '2',
        name: 'شركة التطوير',
        category: 'تجديد وتطوير',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
        rating: 4.8
    },
    {
        id: '3',
        name: 'سارة للديكور',
        category: 'استشارات',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        rating: 4.7
    },
    {
        id: '4',
        name: 'فريق التركيب',
        category: 'تركيب أثاث',
        avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&q=80',
        rating: 4.9
    },
    {
        id: '6',
        name: 'استوديو التصميم',
        category: 'تصميم غرف',
        avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80',
        rating: 4.9
    }
];

export const ServicesSection = () => {
    const router = useRouter();

    const renderItem = ({ item }: { item: FeaturedProvider }) => (
        <View style={styles.itemWrapper}>
            <TouchableOpacity
                onPress={() => router.push(`/services/${item.id}` as any)}
                style={styles.serviceCard}
                activeOpacity={0.8}
            >
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: item.avatar }}
                            style={styles.avatarImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Feather name="star" size={8} color="#F59E0B" fill="#F59E0B" />
                    </View>
                </View>
                <Text style={styles.serviceName} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={styles.serviceCategory} numberOfLines={1}>
                    {item.category}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>خبراء ومصممون مميزون</Text>
                <TouchableOpacity onPress={() => router.push('/services' as any)}>
                    <Text style={styles.viewAllText}>عرض الكل</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <FlashList
                    data={FEATURED_PROVIDERS}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    estimatedItemSize={ESTIMATED_ITEM_SIZE}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                />
            </View>
        </View>
    );
};
