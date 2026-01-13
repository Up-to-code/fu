// File: src/screens/home/_components/AIDesignBanner.tsx
// Purpose: Simple and modern AI Design banner with full-width image

import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const AIDesignBanner = () => {
    return (
        <View className="mb-4">
            <Link href="/ai-design" asChild>
                <TouchableOpacity activeOpacity={0.9} className="relative overflow-hidden" style={{ height: 160 }}>
                    {/* Background Image - Full Width */}
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' }}
                        className="absolute inset-0 w-full h-full"
                        resizeMode="cover"
                    />
                    
                    {/* Gradient Overlay - From Brand Color to Transparent */}
                    <LinearGradient
                        colors={['rgba(30, 58, 95, 0.9)', 'rgba(30, 58, 95, 0)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        className="absolute inset-0"
                    />
                    
                    {/* Content */}
                    <View className="flex-1 justify-center relative z-10 px-5">
                        <View className="items-end">
                            <Text className="text-white font-cairo-bold text-lg mb-1 text-right">
                                صمم بالذكاء الاصطناعي
                            </Text>
                            <Text className="text-white/90 font-cairo-medium text-sm mb-4 text-right">
                                صمم غرفتك في ثواني
                            </Text>
                            <View className="bg-white px-5 py-2.5 rounded-xl">
                                <Text className="font-cairo-bold text-sm" style={{ color: COLORS.primary }}>
                                    ابدأ الآن
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    );
};
