// File: src/screens/home/_components/AIDesignBanner.tsx
// Purpose: Modern and simple service promotions banner with accessibility focus

import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ServiceBanner } from './types/home';
import { styles, BANNER_WIDTH } from './StyleSheets/AIDesignBanner.styles';

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
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={styles.scrollView}
            >
                {SERVICE_BANNERS.map((banner) => (
                    <Link key={banner.id} href={banner.route as any} asChild>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[styles.banner, { width: BANNER_WIDTH }]}
                        >
                            {/* Background Image with Overlay */}
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: banner.image }}
                                    style={styles.bannerImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.overlay} />
                            </View>
                            
                            {/* Content */}
                            <View style={styles.content}>
                                <View style={styles.contentInner}>
                                    <Text style={styles.title}>
                                        {banner.title}
                                    </Text>
                                    <Text style={styles.subtitle}>
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
