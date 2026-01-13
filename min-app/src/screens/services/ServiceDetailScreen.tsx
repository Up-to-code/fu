// File: src/screens/services/ServiceDetailScreen.tsx
// Purpose: Freelancer/Company Profile Detail Screen - Modern Clean UI

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface Review {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    date: string;
    comment: string;
}

interface ProviderData {
    name: string;
    type: 'freelancer' | 'company';
    category: string;
    avatar: string;
    coverImage: string;
    rating: number;
    reviews: number;
    price: string;
    location: string;
    verified: boolean;
    description: string;
    services: string[];
    portfolio: string[];
    responseTime: string;
    completedProjects: number;
    yearsExperience: number;
    languages: string[];
    availability: 'available' | 'busy' | 'offline';
    contactMethods: ('whatsapp' | 'phone' | 'chat')[];
    reviewsList: Review[];
    ratingBreakdown: { stars: number; count: number }[];
}

const PROVIDER_DATA: Record<string, ProviderData> = {
    '1': {
        name: 'أحمد المصمم',
        type: 'freelancer',
        category: 'تصميم داخلي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        rating: 4.9,
        reviews: 127,
        price: 'من 500 ر.س',
        location: 'الرياض',
        verified: true,
        description: 'مصمم داخلي محترف مع أكثر من 8 سنوات من الخبرة في تصميم الديكورات الداخلية للشقق والمنازل والمكاتب. أقدم حلول تصميمية عصرية وعملية تناسب جميع الأذواق والميزانيات.',
        services: [
            'تصميم ديكورات كاملة',
            'اختيار الألوان والمواد',
            'رسوم هندسية',
            'متابعة التنفيذ',
        ],
        portfolio: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
            'https://images.unsplash.com/photo-1505693416388-b0346ef38604?w=400&q=80',
        ],
        responseTime: 'يرد خلال ساعة',
        completedProjects: 156,
        yearsExperience: 8,
        languages: ['العربية', 'الإنجليزية'],
        availability: 'available',
        contactMethods: ['whatsapp', 'phone', 'chat'],
        ratingBreakdown: [
            { stars: 5, count: 98 },
            { stars: 4, count: 20 },
            { stars: 3, count: 6 },
            { stars: 2, count: 2 },
            { stars: 1, count: 1 },
        ],
        reviewsList: [
            {
                id: '1',
                userName: 'محمد العتيبي',
                userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
                rating: 5,
                date: 'قبل أسبوع',
                comment: 'تجربة رائعة! التصميم تجاوز توقعاتي. أحمد مصمم محترف ومتعاون جداً.',
            },
            {
                id: '2',
                userName: 'فاطمة السعيد',
                userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
                rating: 5,
                date: 'قبل أسبوعين',
                comment: 'صمم لي غرفة معيشة أنيقة جداً. التواصل كان سلس والتسليم في الموعد.',
            },
            {
                id: '3',
                userName: 'خالد الدوسري',
                userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
                rating: 4,
                date: 'قبل شهر',
                comment: 'عمل جيد بشكل عام. بعض التعديلات الصغيرة احتاجت وقت إضافي لكن النتيجة النهائية ممتازة.',
            },
        ],
    },
    '2': {
        name: 'شركة التطوير الحديث',
        type: 'company',
        category: 'تجديد وتطوير',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80',
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        rating: 4.8,
        reviews: 89,
        price: 'من 1000 ر.س',
        location: 'جدة',
        verified: true,
        description: 'شركة متخصصة في أعمال التجديد والتطوير للمنازل والمكاتب. نقدم حلول شاملة من التصميم حتى التنفيذ مع ضمان الجودة.',
        services: [
            'تجديد المطابخ',
            'تجديد الحمامات',
            'أعمال الدهان',
            'تركيب الأرضيات',
        ],
        portfolio: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
        ],
        responseTime: 'يرد خلال ساعتين',
        completedProjects: 230,
        yearsExperience: 12,
        languages: ['العربية'],
        availability: 'busy',
        contactMethods: ['phone', 'chat'],
        ratingBreakdown: [
            { stars: 5, count: 65 },
            { stars: 4, count: 18 },
            { stars: 3, count: 4 },
            { stars: 2, count: 2 },
            { stars: 1, count: 0 },
        ],
        reviewsList: [
            {
                id: '1',
                userName: 'سارة القحطاني',
                userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
                rating: 5,
                date: 'قبل 3 أيام',
                comment: 'جددوا لي المطبخ بالكامل. العمل احترافي والأسعار معقولة.',
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
    const [showAllReviews, setShowAllReviews] = useState(false);

    const toggleSave = () => {
        setIsSaved(prev => !prev);
    };

    const getAvailabilityLabel = () => {
        switch (provider.availability) {
            case 'available': return { label: 'متاح الآن', color: '#10B981' };
            case 'busy': return { label: 'مشغول حالياً', color: '#F59E0B' };
            case 'offline': return { label: 'غير متصل', color: '#94a3b8' };
        }
    };

    const getContactMethodIcon = (method: string) => {
        switch (method) {
            case 'whatsapp': return 'message-circle';
            case 'phone': return 'phone';
            case 'chat': return 'message-square';
            default: return 'mail';
        }
    };

    const getContactMethodLabel = (method: string) => {
        switch (method) {
            case 'whatsapp': return 'واتساب';
            case 'phone': return 'اتصال';
            case 'chat': return 'محادثة';
            default: return 'تواصل';
        }
    };

    const availabilityStatus = getAvailabilityLabel();
    const totalReviews = provider.ratingBreakdown.reduce((sum, item) => sum + item.count, 0);

    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, i) => (
            <Feather
                key={i}
                name="star"
                size={12}
                color={i < rating ? '#F59E0B' : '#e2e8f0'}
            />
        ));
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* Hero Section */}
                <View className="relative h-[320px]">
                    <Image
                        source={{ uri: provider.coverImage }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        className="absolute inset-0"
                    />
                    
                    {/* Header Actions */}
                    <SafeAreaView edges={['top']} className="absolute top-0 w-full flex-row justify-between px-5 pt-2">
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            className="w-10 h-10 bg-black/30 rounded-full items-center justify-center"
                        >
                            <Feather name="arrow-right" size={22} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={toggleSave}
                            className="w-10 h-10 bg-black/30 rounded-full items-center justify-center"
                        >
                            <Feather
                                name="heart"
                                size={20}
                                color={isSaved ? "#EF4444" : "white"}
                            />
                        </TouchableOpacity>
                    </SafeAreaView>

                    {/* Profile Overlay */}
                    <View className="absolute bottom-0 w-full px-5 pb-5">
                        <View className="flex-row-reverse items-end gap-4">
                            <View className="relative">
                                <View className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm overflow-hidden">
                                    <Image
                                        source={{ uri: provider.avatar }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                {provider.verified && (
                                    <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                                        <Feather name="check" size={12} color="white" />
                                    </View>
                                )}
                            </View>
                            <View className="flex-1 pb-1">
                                <Text className="font-cairo-bold text-xl text-white text-right mb-2">
                                    {provider.name}
                                </Text>
                                <View className="flex-row-reverse items-center gap-2 flex-wrap">
                                    <View className="bg-white/20 px-2.5 py-1 rounded-lg">
                                        <Text className="font-cairo-medium text-white text-xs">
                                            {provider.type === 'freelancer' ? 'مستقل' : 'شركة'}
                                        </Text>
                                    </View>
                                    <View 
                                        className="px-2.5 py-1 rounded-lg"
                                        style={{ backgroundColor: availabilityStatus.color + '40' }}
                                    >
                                        <Text className="font-cairo-medium text-xs" style={{ color: availabilityStatus.color }}>
                                            {availabilityStatus.label}
                                        </Text>
                                    </View>
                                    <Text className="font-cairo-medium text-white/90 text-xs">
                                        {provider.category} • {provider.location}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats Row */}
                <View className="flex-row-reverse bg-white px-5 py-5 justify-around">
                    <View className="items-center">
                        <View className="flex-row items-center gap-1 mb-1">
                            <Text className="font-cairo-bold text-xl text-slate-900">{provider.rating}</Text>
                            <Feather name="star" size={16} color="#F59E0B" />
                        </View>
                        <Text className="font-cairo-medium text-slate-500 text-xs">التقييم</Text>
                    </View>
                    <View className="w-px h-10 bg-slate-100" />
                    <View className="items-center">
                        <Text className="font-cairo-bold text-xl text-slate-900 mb-1">{provider.completedProjects}</Text>
                        <Text className="font-cairo-medium text-slate-500 text-xs">مشروع</Text>
                    </View>
                    <View className="w-px h-10 bg-slate-100" />
                    <View className="items-center">
                        <Text className="font-cairo-bold text-xl text-slate-900 mb-1">{provider.yearsExperience}</Text>
                        <Text className="font-cairo-medium text-slate-500 text-xs">سنوات خبرة</Text>
                    </View>
                </View>

                {/* Quick Info */}
                <View className="flex-row-reverse px-5 py-4 gap-3">
                    <View className="flex-1 flex-row-reverse items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl">
                        <Feather name="clock" size={16} color={COLORS.primary} />
                        <Text className="font-cairo-medium text-slate-700 text-xs">{provider.responseTime}</Text>
                    </View>
                    <View className="flex-1 flex-row-reverse items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl">
                        <Feather name="globe" size={16} color={COLORS.primary} />
                        <Text className="font-cairo-medium text-slate-700 text-xs" numberOfLines={1}>{provider.languages.join('، ')}</Text>
                    </View>
                </View>

                {/* Content */}
                <View className="px-5 pt-4">
                    {/* Description */}
                    <View className="mb-6">
                        <Text className="font-cairo-bold text-slate-900 text-lg mb-3 text-right">نبذة</Text>
                        <Text className="font-cairo-medium text-slate-600 leading-7 text-right">
                            {provider.description}
                        </Text>
                    </View>

                    {/* Services */}
                    <View className="mb-6">
                        <Text className="font-cairo-bold text-slate-900 text-lg mb-4 text-right">الخدمات المقدمة</Text>
                        <View className="flex-row-reverse flex-wrap gap-3">
                            {provider.services.map((service: string, index: number) => (
                                <View key={index} className="flex-row-reverse items-center bg-gray-50 px-4 py-2.5 rounded-xl">
                                    <Feather name="check" size={14} color={COLORS.primary} />
                                    <Text className="font-cairo-medium text-slate-700 text-sm mr-2">{service}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Contact Methods */}
                    <View className="mb-6">
                        <Text className="font-cairo-bold text-slate-900 text-lg mb-4 text-right">طرق التواصل</Text>
                        <View className="flex-row-reverse gap-3">
                            {provider.contactMethods.map((method, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="flex-1 flex-row-reverse items-center justify-center gap-2 py-3.5 rounded-2xl bg-gray-50"
                                >
                                    <Feather name={getContactMethodIcon(method)} size={18} color={COLORS.primary} />
                                    <Text className="font-cairo-medium text-slate-700 text-sm">{getContactMethodLabel(method)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Reviews Section */}
                    <View className="mb-6">
                        <View className="flex-row-reverse items-center justify-between mb-4">
                            <Text className="font-cairo-bold text-slate-900 text-lg">التقييمات</Text>
                            <Text className="font-cairo-medium text-slate-500 text-sm">{provider.reviews} تقييم</Text>
                        </View>

                        {/* Rating Breakdown */}
                        <View className="bg-gray-50 rounded-3xl p-5 mb-4">
                            <View className="flex-row-reverse items-center gap-6">
                                {/* Overall Rating */}
                                <View className="items-center">
                                    <Text className="font-cairo-bold text-4xl text-slate-900">{provider.rating}</Text>
                                    <View className="flex-row gap-0.5 mt-1">
                                        {renderStars(Math.round(provider.rating))}
                                    </View>
                                    <Text className="font-cairo-medium text-slate-500 text-xs mt-1">{totalReviews} تقييم</Text>
                                </View>

                                {/* Breakdown Bars */}
                                <View className="flex-1 gap-2">
                                    {provider.ratingBreakdown.map((item) => {
                                        const percentage = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
                                        return (
                                            <View key={item.stars} className="flex-row-reverse items-center gap-2">
                                                <Text className="font-cairo-medium text-slate-600 text-xs w-3">{item.stars}</Text>
                                                <Feather name="star" size={10} color="#F59E0B" />
                                                <View className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <View 
                                                        className="h-full bg-amber-400 rounded-full"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </View>
                                                <Text className="font-cairo-medium text-slate-400 text-xs w-6">{item.count}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </View>

                        {/* Reviews List */}
                        <View className="gap-3">
                            {(showAllReviews ? provider.reviewsList : provider.reviewsList.slice(0, 2)).map((review) => (
                                <View key={review.id} className="bg-gray-50 rounded-2xl p-4">
                                    <View className="flex-row-reverse items-center gap-3 mb-3">
                                        <View className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                                            <Image
                                                source={{ uri: review.userAvatar }}
                                                className="w-full h-full"
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="font-cairo-bold text-slate-900 text-sm text-right mb-1">{review.userName}</Text>
                                            <View className="flex-row-reverse items-center gap-2">
                                                <View className="flex-row gap-0.5">
                                                    {renderStars(review.rating)}
                                                </View>
                                                <Text className="font-cairo-medium text-slate-400 text-xs">{review.date}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text className="font-cairo-medium text-slate-600 text-sm text-right leading-6">
                                        {review.comment}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {provider.reviewsList.length > 2 && (
                            <TouchableOpacity
                                onPress={() => setShowAllReviews(!showAllReviews)}
                                className="mt-4 py-3.5 bg-gray-50 rounded-2xl items-center"
                            >
                                <Text className="font-cairo-bold text-sm" style={{ color: COLORS.primary }}>
                                    {showAllReviews ? 'عرض أقل' : `عرض جميع التقييمات (${provider.reviewsList.length})`}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Portfolio */}
                    {provider.portfolio && provider.portfolio.length > 0 && (
                        <View className="mb-6">
                            <View className="flex-row-reverse items-center justify-between mb-4">
                                <Text className="font-cairo-bold text-slate-900 text-lg">معرض الأعمال</Text>
                                <Text className="font-cairo-medium text-sm" style={{ color: COLORS.primary }}>عرض الكل</Text>
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 12, paddingHorizontal: 0 }}
                                style={{ transform: [{ scaleX: -1 }], marginHorizontal: -20 }}
                            >
                                {provider.portfolio.map((image: string, index: number) => (
                                    <View
                                        key={index}
                                        className="w-40 h-40 rounded-2xl overflow-hidden bg-slate-100"
                                        style={{ transform: [{ scaleX: -1 }] }}
                                    >
                                        <Image
                                            source={{ uri: image }}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Sticky CTA */}
            <SafeAreaView edges={['bottom']} className="absolute bottom-0 w-full bg-white">
                <View className="px-5 py-4 flex-row-reverse gap-3">
                    <View className="flex-1 justify-center">
                        <Text className="font-cairo-medium text-slate-500 text-xs text-right">يبدأ من</Text>
                        <Text className="font-cairo-bold text-lg text-right" style={{ color: COLORS.primary }}>{provider.price}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push(`/services/book/${id || '1'}` as any)}
                        className="flex-[2] py-4 rounded-2xl flex-row-reverse items-center justify-center gap-2"
                        style={{ backgroundColor: COLORS.primary }}
                    >
                        <Feather name="calendar" size={20} color="white" />
                        <Text className="font-cairo-bold text-white text-base">احجز الآن</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
