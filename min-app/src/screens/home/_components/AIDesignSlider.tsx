// File: src/components/home/AIDesignSlider.tsx
// Purpose: Hero slider for AI design and featured content

import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_WIDTH = SCREEN_WIDTH - 40;

const SLIDES = [
    {
        id: '1',
        title: 'صمم غرفتك بالذكاء الاصطناعي',
        description: 'حمّل صورة غرفتك ودع الذكاء الاصطناعي يقترح عليك أفضل التصاميم.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
        cta: 'جرب المصمم الذكي',
        link: '/ai-design'
    },
    {
        id: '2',
        title: 'جرب الأثاث في بيتك',
        description: 'استخدم تقنية الواقع المعزز لتشاهد كيف يبدو الأثاث في غرفتك.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
        cta: 'افتح الكاميرا',
        link: '/ar-view'
    },
    {
        id: '3',
        title: 'تشكيلة مودرن جديدة',
        description: 'اكتشف أحدث منتجاتنا بتصاميم عصرية وبسيطة.',
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
        cta: 'تصفح المجموعة',
        link: '/category/modern'
    }
];

export const AIDesignSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const next = (activeSlide + 1) % SLIDES.length;
            setActiveSlide(next);
            scrollRef.current?.scrollTo({ x: next * SLIDE_WIDTH, animated: true });
        }, 5000);
        return () => clearInterval(interval);
    }, [activeSlide]);

    return (
        <View className="mx-5 my-4">
            <View className="h-[200px] rounded-2xl overflow-hidden bg-gray-100 relative">
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => setActiveSlide(Math.round(e.nativeEvent.contentOffset.x / SLIDE_WIDTH))}
                >
                    {SLIDES.map((slide) => (
                        <View key={slide.id} style={{ width: SLIDE_WIDTH }} className="h-full relative justify-center">
                            <Image source={{ uri: slide.image }} className="absolute inset-0 w-full h-full" resizeMode="cover" />
                            <View className="absolute inset-0 bg-black/40" />
                            <View className="p-6 z-10 items-end">
                                <Text className="text-white text-xl font-cairo-bold mb-2 text-right">{slide.title}</Text>
                                <Text className="text-white/90 text-sm mb-4 text-right font-cairo-medium" numberOfLines={2}>
                                    {slide.description}
                                </Text>
                                <Link href={slide.link as any} asChild>
                                    <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full self-start">
                                        <Text className="font-cairo-bold text-sm" style={{ color: COLORS.primary }}>{slide.cta}</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Dots */}
                <View className="absolute bottom-4 w-full flex-row justify-center gap-1.5">
                    {SLIDES.map((_, i) => (
                        <View key={i} className={`h-1.5 rounded-full ${i === activeSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
                    ))}
                </View>
            </View>
        </View>
    );
};
