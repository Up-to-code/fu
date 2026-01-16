// File: src/screens/home/_components/AIDesignSlider.tsx
// Purpose: Hero slider for AI design and featured content

import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { Slide } from './types/home';
import { styles, SLIDE_WIDTH } from './StyleSheets/AIDesignSlider.styles';

const SLIDES: Slide[] = [
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
    const { getSize, width } = useResponsive();
    const SLIDE_WIDTH = width - 40;
    const styles = getStyles(getSize, width);

    useEffect(() => {
        const interval = setInterval(() => {
            const next = (activeSlide + 1) % SLIDES.length;
            setActiveSlide(next);
            scrollRef.current?.scrollTo({ x: next * SLIDE_WIDTH, animated: true });
        }, 5000);
        return () => clearInterval(interval);
    }, [activeSlide]);

    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => setActiveSlide(Math.round(e.nativeEvent.contentOffset.x / SLIDE_WIDTH))}
                >
                    {SLIDES.map((slide) => (
                        <View key={slide.id} style={[styles.slide, { width: SLIDE_WIDTH }]}>
                            <Image source={{ uri: slide.image }} style={styles.slideImage} resizeMode="cover" />
                            <View style={styles.slideOverlay} />
                            <View style={styles.slideContent}>
                                <Text style={styles.slideTitle}>{slide.title}</Text>
                                <Text style={styles.slideDescription} numberOfLines={2}>
                                    {slide.description}
                                </Text>
                                <Link href={slide.link as any} asChild>
                                    <TouchableOpacity style={styles.ctaButton}>
                                        <Text style={[styles.ctaText, { color: COLORS.primary }]}>{slide.cta}</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Dots */}
                <View style={styles.dotsContainer}>
                    {SLIDES.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                i === activeSlide ? styles.dotActive : styles.dotInactive
                            ]}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};
