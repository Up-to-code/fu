// File: src/screens/home/_components/AIDesignBanner.tsx
// Purpose: Modern and simple service promotions banner with accessibility focus

import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 40; // Account for mx-5 margins (20px each side)

interface ServiceBanner {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    route: string;
}

const SERVICE_BANNERS: ServiceBanner[] = [
    {
        id: '1',
        title: 'صمم بالذكاء الاصطناعي',
        subtitle: 'صمم غرفتك في ثواني',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        route: '/ai-design'
    },
    {
        id: '2',
        title: 'تصميم داخلي متخصص',
        subtitle: 'استشر أفضل المصممين',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
        route: '/services'
    },
    {
        id: '3',
        title: 'استشارات ديكور',
        subtitle: 'نصائح من الخبراء',
        image: 'https://images.unsplash.com/photo-1631889993953-2fe7894654c4?w=800&q=80',
        route: '/services'
    },
    {
        id: '4',
        title: 'تركيب وتجهيز',
        subtitle: 'خدمة تركيب محترفة',
        image: 'https://images.unsplash.com/photo-1556912173-2e38d8171334?w=800&q=80',
        route: '/services'
    }
];

export const AIDesignBanner = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % SERVICE_BANNERS.length;
                const scrollX = (SERVICE_BANNERS.length - 1 - nextIndex) * BANNER_WIDTH;
                scrollViewRef.current?.scrollTo({
                    x: scrollX,
                    animated: true
                });
                return nextIndex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = SERVICE_BANNERS.length - 1 - Math.round(contentOffsetX / BANNER_WIDTH);
        setCurrentIndex(index);
    };

    return (
        <View className="mx-5 my-4">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{ transform: [{ scaleX: -1 }] }}
            >
                {SERVICE_BANNERS.map((banner) => (
                    <Link key={banner.id} href={banner.route as any} asChild>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className="relative overflow-hidden rounded-2xl bg-slate-50"
                            style={{ width: BANNER_WIDTH, height: 160 }}
                        >
                            {/* Background Image with Overlay */}
                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                                <Image
                                    source={{ uri: banner.image }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                    style={{ transform: [{ scaleX: -1 }] }}
                                />
                                {/* Black overlay for contrast */}
                                <View style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    left: 0, 
                                    right: 0, 
                                    bottom: 0, 
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    transform: [{ scaleX: -1 }]
                                }} />
                            </View>
                            
                            {/* Content */}
                            <View className="flex-1 justify-center relative z-10 px-5" style={{ transform: [{ scaleX: -1 }] }}>
                                <View className="items-end">
                                    <Text 
                                        className="font-cairo-bold text-xl mb-2 text-right"
                                        style={{ 
                                            fontSize: 22,
                                            lineHeight: 28,
                                            color: '#FFFFFF'
                                        }}
                                    >
                                        {banner.title}
                                    </Text>
                                    <Text 
                                        className="font-cairo-medium text-base text-right"
                                        style={{ 
                                            fontSize: 16,
                                            lineHeight: 22,
                                            color: '#FFFFFF'
                                        }}
                                    >
                                        {banner.subtitle}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </ScrollView>
        </View>
    );
};
