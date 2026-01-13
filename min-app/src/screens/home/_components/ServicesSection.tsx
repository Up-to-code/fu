// File: src/screens/home/_components/ServicesSection.tsx
// Purpose: Services section for home screen - Featured Freelancers & Companies

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

// Mock Featured Providers
const FEATURED_PROVIDERS = [
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

    return (
        <View className="mb-8">
            <View className="flex-row-reverse items-center justify-between px-5 mb-4">
                <Text className="font-cairo-bold text-xl text-slate-900">خبراء ومصممون مميزون</Text>
                <TouchableOpacity onPress={() => router.push('/services' as any)}>
                    <Text className="font-cairo-medium text-primary text-sm">عرض الكل</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {FEATURED_PROVIDERS.map((provider) => (
                    <TouchableOpacity
                        key={provider.id}
                        onPress={() => router.push(`/services/${provider.id}` as any)}
                        className="items-center w-24"
                        style={{ transform: [{ scaleX: -1 }] }}
                        activeOpacity={0.8}
                    >
                        <View className="relative mb-2">
                            <View className="w-20 h-20 rounded-full border-2 border-white shadow-sm bg-slate-100 overflow-hidden">
                                <Image
                                    source={{ uri: provider.avatar }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>
                            <View className="absolute bottom-0 right-0 bg-white rounded-full px-1.5 py-0.5 flex-row items-center shadow-sm border border-slate-100">
                                <Text className="font-cairo-bold text-[10px] text-slate-700 ml-0.5">{provider.rating}</Text>
                                <Feather name="star" size={8} color="#F59E0B" fill="#F59E0B" />
                            </View>
                        </View>
                        <Text className="font-cairo-bold text-slate-900 text-sm text-center mb-0.5" numberOfLines={1}>
                            {provider.name}
                        </Text>
                        <Text className="font-cairo-medium text-slate-500 text-[10px] text-center" numberOfLines={1}>
                            {provider.category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
