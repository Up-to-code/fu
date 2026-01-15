// File: src/screens/services/ServiceDetailScreen.tsx
// Purpose: Freelancer/Company Service Detail Screen - Redesigned Layout

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../shared';
import { useServiceDetails } from './_hooks';
import { COLORS } from '../../constants/theme';
import { ServicesOfferedSection } from './_components/ServicesOfferedSection';
import { ReviewsSection } from './_components/ReviewsSection';
import { ProviderData } from './types/services';

const { width } = Dimensions.get('window');

const PROVIDER_DATA: Record<string, ProviderData> = {
    '1': {
        name: 'شركة التطوير الحديث',
        type: 'company',
        category: 'تجديد وتطوير',
        avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
        backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        rating: 4.8,
        reviewsCount: 230,
        price: 'من 1000 ريس',
        location: 'جدة',
        verified: true,
        description: 'شركة متخصصة في أعمال التجديد والتطوير للمنازل والمكاتب. تقدم حلول شاملة من التصميم حتى التنفيذ مع ضمان الجودة.',
        services: [
            { id: '1', label: 'تجديد الحمامات' },
            { id: '2', label: 'تركيب الأرضيات' },
            { id: '3', label: 'تجديد المطابخ' },
            { id: '4', label: 'أعمال الدهان' },
        ],
        experienceYears: 12,
        responseTime: 'يرد خلال ساعتين',
        languages: ['العربية'],
        completedProjects: 230,
        reviews: [
            {
                id: '1',
                customerName: 'سارة القحطاني',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
                rating: 5,
                comment: 'جددوا لي المطبخ بالكامل. العمل احترافي والأسعار معقولة. أنصح بهم بشدة.',
                date: 'قبل 3 أيام',
            },
            {
                id: '2',
                customerName: 'محمد العلي',
                rating: 4,
                comment: 'خدمة ممتازة وسريعة. فريق محترف ومرتب.',
                date: 'قبل أسبوع',
            },
            {
                id: '3',
                customerName: 'فاطمة أحمد',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
                rating: 5,
                comment: 'أفضل شركة تعاملت معها. جودة عالية وتنفيذ سريع.',
                date: 'قبل أسبوعين',
            },
        ],
    },
    '2': {
        name: 'أحمد - مصمم داخلي',
        type: 'freelancer',
        category: 'التصميم الداخلي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        rating: 4.8,
        reviewsCount: 127,
        price: 'من 500 ر.س',
        location: 'الرياض',
        verified: true,
        description: 'مصمم داخلي محترف بخبرة أكثر من 10 سنوات في تصميم وتنسيق المساحات الداخلية.',
        services: [
            { id: '1', label: 'التصميم الداخلي' },
            { id: '2', label: 'تركيب الأثاث' },
        ],
        experienceYears: 10,
        responseTime: 'يرد خلال ساعة',
        languages: ['العربية', 'الإنجليزية'],
        completedProjects: 156,
        reviews: [
            {
                id: '1',
                customerName: 'خالد الدوسري',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
                rating: 5,
                comment: 'أحمد مصمم مبدع! صمم لي المنزل بشكل رائع يفوق التوقعات.',
                date: 'قبل يومين',
            },
            {
                id: '2',
                customerName: 'نورة السعيد',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
                rating: 5,
                comment: 'تعامل راقي ومهني. النتيجة النهائية أكثر من رائعة.',
                date: 'قبل 5 أيام',
            },
        ],
    },
};

const DEFAULT_PROVIDER = PROVIDER_DATA['1'];

export default function ServiceDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const provider = PROVIDER_DATA[id || '1'] || DEFAULT_PROVIDER;
    const [isSaved, setIsSaved] = useState(false);

    const toggleSave = () => {
        setIsSaved(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Image
                        source={{ uri: provider.backgroundImage }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                        style={StyleSheet.absoluteFillObject}
                    />

                    {/* Header Actions */}
                    <SafeAreaView edges={['top']} style={styles.headerActions}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.headerButton}
                        >
                            <Feather name="arrow-right" size={22} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={toggleSave}
                            style={styles.headerButton}
                        >
                            <Feather
                                name="heart"
                                size={20}
                                color={isSaved ? "#EF4444" : "white"}
                                fill={isSaved ? "#EF4444" : "transparent"}
                            />
                        </TouchableOpacity>
                    </SafeAreaView>

                    {/* Company Info Overlay */}
                    <View style={styles.heroOverlay}>
                        <View style={styles.heroContent}>
                            <View style={styles.heroTextContainer}>
                                <Text style={styles.heroTitle}>{provider.name}</Text>
                                <View style={styles.badgesRow}>
                                    <View style={styles.premiumBadge}>
                                        <Text style={styles.premiumBadgeText}>مميز</Text>
                                    </View>
                                    <View style={styles.typeBadge}>
                                        <Text style={styles.typeBadgeText}>
                                            {provider.type === 'company' ? 'شركة' : 'مستقل'}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.heroCategoryLocation}>
                                    {provider.category} • {provider.location}
                                </Text>
                            </View>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Image
                                        source={{ uri: provider.avatar }}
                                        style={styles.avatarImage}
                                        resizeMode="cover"
                                    />
                                </View>
                                {provider.verified && (
                                    <View style={styles.verifiedBadge}>
                                        <Feather name="check" size={14} color="white" />
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{provider.experienceYears}</Text>
                        <Text style={styles.statLabel}>سنوات خبرة</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{provider.completedProjects}</Text>
                        <Text style={styles.statLabel}>مشاريع</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <View style={styles.ratingValue}>
                            <Text style={styles.statNumber}>{provider.rating}</Text>
                            <Feather name="star" size={16} color="#F59E0B" />
                        </View>
                        <Text style={styles.statLabel}>التقييم</Text>
                    </View>
                </View>

                {/* Quick Info */}
                <View style={styles.quickInfo}>
                    <View style={styles.quickInfoItem}>
                        <Feather name="globe" size={16} color="#64748b" />
                        <Text style={styles.quickInfoText}>{provider.languages.join('، ')}</Text>
                    </View>
                    <View style={styles.quickInfoItem}>
                        <Feather name="clock" size={16} color="#64748b" />
                        <Text style={styles.quickInfoText}>{provider.responseTime}</Text>
                    </View>
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>نبذة</Text>
                    <Text style={styles.description}>{provider.description}</Text>
                </View>

                {/* Services Section */}
                <ServicesOfferedSection services={provider.services} />

                {/* Reviews Section */}
                {provider.reviews && provider.reviews.length > 0 && (
                    <ReviewsSection
                        averageRating={provider.rating}
                        totalReviews={provider.reviewsCount}
                        reviews={provider.reviews}
                    />
                )}
            </ScrollView>

            {/* Fixed Bottom CTA */}
            <SafeAreaView edges={['bottom']} style={styles.ctaContainer}>
                <View style={styles.ctaContent}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>يبدأ من</Text>
                        <Text style={styles.priceValue}>{provider.price}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push(`/services/book/${id || '1'}` as any)}
                        style={[styles.bookButton, { backgroundColor: COLORS.primary }]}
                    >
                        <Feather name="calendar" size={18} color="white" />
                        <Text style={styles.bookButtonText}>احجز الآن</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    heroSection: {
        position: 'relative',
        height: 340,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    headerActions: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    headerButton: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    heroContent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    heroTextContainer: {
        flex: 1,
        paddingRight: 16,
    },
    heroTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'right',
        marginBottom: 8,
    },
    badgesRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        gap: 8,
        marginBottom: 8,
    },
    premiumBadge: {
        backgroundColor: '#F59E0B',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    premiumBadgeText: {
        fontFamily: 'Cairo_600SemiBold',
        color: 'white',
        fontSize: 12,
        textAlign: 'right',
    },
    typeBadge: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    typeBadgeText: {
        fontFamily: 'Cairo_600SemiBold',
        color: 'white',
        fontSize: 12,
        textAlign: 'right',
    },
    heroCategoryLocation: {
        fontFamily: 'Cairo_500Medium',
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        textAlign: 'right',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#3b82f6',
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'white',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 26,
        height: 26,
        backgroundColor: '#3b82f6',
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    statsRow: {
        flexDirection: 'row-reverse',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 24,
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 24,
        color: '#1e293b',
        marginBottom: 4,
    },
    statLabel: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: 12,
    },
    ratingValue: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    statDivider: {
        width: 1,
        height: 50,
        backgroundColor: '#f1f5f9',
    },
    quickInfo: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 24,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    quickInfoItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
    },
    quickInfoText: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: 14,
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: 18,
        textAlign: 'right',
        marginBottom: 12,
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: 14,
        lineHeight: 24,
        textAlign: 'right',
    },
    ctaContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    ctaContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 16,
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        fontFamily: 'Cairo_500Medium',
        color: '#94a3b8',
        fontSize: 12,
        textAlign: 'right',
    },
    priceValue: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: 16,
        textAlign: 'right',
    },
    bookButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    bookButtonText: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
        fontSize: 16,
    },
});
