// File: src/screens/services/ServiceDetailScreen.tsx
// Purpose: Freelancer/Company Service Detail Screen - Redesigned Layout

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../shared';
import { useServiceDetails } from './_hooks';
import { COLORS } from '../../constants/theme';
import { useRTL } from '../../hooks/useRTL';
import { useResponsive } from '../../hooks/useResponsive';
import { ServicesOfferedSection } from './_components/ServicesOfferedSection';
import { ReviewsSection } from './_components/ReviewsSection';
import { ProviderData } from './types/services';
import { getStyles } from './StyleSheets/ServiceDetailScreen.styles';

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
    const { isRTL } = useRTL();
    const { getSize, fontSize, iconSize } = useResponsive();
    const styles = getStyles(isRTL, getSize, fontSize, iconSize);

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
                            <Feather name={isRTL ? "arrow-right" : "arrow-left"} size={22} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={toggleSave}
                            style={styles.headerButton}
                        >
                            <Feather
                                name="heart"
                                size={20}
                                color={isSaved ? "#EF4444" : "white"}
                                fill={isSaved ? undefined : "#EF4444"}
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

