// File: src/screens/services/ServiceDetailScreen.tsx
// Purpose: Service Provider Detail Screen with modern UI and 8px spacing

import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock provider data (in real app, this would come from API/context)
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
        description: 'نقدم خدمات تنظيف متكاملة وشاملة لجميع أنواع المساحات. فريق محترف ومجرب مع استخدام أفضل المواد والأدوات. نضمن جودة عالية ونتائج ممتازة.',
        gallery: [
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
            'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80',
        ],
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
        description: 'مصمم داخلي محترف بخبرة أكثر من 10 سنوات في تصميم وتنسيق المساحات الداخلية. أقدم حلول تصميم مبتكرة وعملية تناسب احتياجاتك وميزانيتك.',
        gallery: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
            'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80',
        ],
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
        description: 'فريق صيانة منزلية سريع وموثوق. نقدم خدمات صيانة شاملة لجميع أعمال السباكة والكهرباء والنجارة. استجابة سريعة وخدمة على مدار الساعة.',
        gallery: [
            'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
            'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80',
            'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80',
        ],
    },
];

type Provider = typeof PROVIDERS[0];

const getProviderById = (id: string): Provider | undefined => {
    return PROVIDERS.find(p => p.id === id);
};

export default function ServiceDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isSaved, setIsSaved] = useState(false);

    const provider = getProviderById(id || '');

    if (!provider) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>الخدمة غير موجودة</Text>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>العودة</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Feather name="arrow-right" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <View style={styles.headerSpacer} />
                    <TouchableOpacity onPress={toggleSave} style={styles.saveButton}>
                        <Feather
                            name="heart"
                            size={24}
                            color={isSaved ? "#EF4444" : COLORS.textLight}
                            fill={isSaved ? "#EF4444" : "none"}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Provider Info Card */}
                    <View style={styles.providerCard}>
                        <View style={styles.providerHeader}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: provider.avatar }}
                                    style={styles.avatar}
                                    resizeMode="cover"
                                />
                                {provider.verified && (
                                    <View style={styles.verifiedBadge}>
                                        <Feather name="check" size={12} color="white" />
                                    </View>
                                )}
                            </View>
                            <View style={styles.providerInfo}>
                                <Text style={styles.providerName}>{provider.name}</Text>
                                <Text style={styles.providerCategory}>{provider.category}</Text>
                                <View style={styles.ratingContainer}>
                                    <View style={styles.rating}>
                                        <Feather name="star" size={14} color="#F59E0B" />
                                        <Text style={styles.ratingText}>{provider.rating}</Text>
                                    </View>
                                    <Text style={styles.reviewCount}>({provider.reviews} تقييم)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.locationContainer}>
                            <Feather name="map-pin" size={16} color={COLORS.textLight} />
                            <Text style={styles.locationText}>{provider.location}</Text>
                        </View>
                    </View>

                    {/* Price Card */}
                    <View style={styles.priceCard}>
                        <Text style={styles.priceLabel}>السعر</Text>
                        <Text style={styles.priceValue}>{provider.priceLabel}</Text>
                    </View>

                    {/* Gallery */}
                    {provider.gallery && provider.gallery.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>معرض الأعمال</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.galleryContainer}
                                style={{ transform: [{ scaleX: -1 }] }}
                            >
                                {provider.gallery.map((image, index) => (
                                    <View
                                        key={index}
                                        style={[styles.galleryItem, { transform: [{ scaleX: -1 }] }]}
                                    >
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.galleryImage}
                                            resizeMode="cover"
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>عن الخدمة</Text>
                        <Text style={styles.description}>{provider.description}</Text>
                    </View>

                    {/* Spacer for bottom button */}
                    <View style={styles.bottomSpacer} />
                </ScrollView>

                {/* Booking Button */}
                <SafeAreaView edges={['bottom']} style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.bookingButton}
                        onPress={() => router.push(`/services/book/${provider.id}` as any)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.bookingButtonText}>احجز الآن</Text>
                        <Feather name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        padding: 8,
    },
    headerSpacer: {
        flex: 1,
    },
    saveButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    errorText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: COLORS.text,
        marginBottom: 16,
        textAlign: 'center',
    },
    backButtonText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: COLORS.primary,
    },
    providerCard: {
        backgroundColor: 'white',
        margin: 16,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    providerHeader: {
        flexDirection: 'row-reverse',
        gap: 16,
        marginBottom: 16,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 24,
        height: 24,
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    providerInfo: {
        flex: 1,
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 4,
    },
    providerCategory: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'right',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
    },
    rating: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
    },
    reviewCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#94a3b8',
    },
    locationContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    locationText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
    },
    priceCard: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
    },
    priceValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: COLORS.primary,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    galleryContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    galleryItem: {
        width: SCREEN_WIDTH * 0.7,
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#f1f5f9',
    },
    galleryImage: {
        width: '100%',
        height: '100%',
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
        textAlign: 'right',
        paddingHorizontal: 16,
    },
    bottomSpacer: {
        height: 100,
    },
    bottomContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    bookingButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    bookingButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: 'white',
    },
});
