// File: src/screens/ai/AIResultsScreen.tsx
// Purpose: Modern and clean AI Results screen matching UI system

import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { getLastAIDesignPhoto } from '../../utils/storage';

const GENERATED_IMAGE = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000';
const DETECTED_ITEMS = [
    { id: '1', name: 'كنبة زاوية', price: 3499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400', discount: 10, pinX: 45, pinY: 50 },
    { id: '2', name: 'طاولة قهوة', price: 599, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=400', pinX: 65, pinY: 60 },
    { id: '3', name: 'سجادة صوف', price: 450, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=400', pinX: 30, pinY: 70 },
];

const LOADING_TEXTS = [
    'أفكر',
    'أحلل',
    'أبني',
    'جاهز',
];

const AIResultsScreen = () => {
    const { photo: photoParam } = useLocalSearchParams<{ photo?: string }>();

    const [isLoading, setIsLoading] = useState(true);
    const [loadingStep, setLoadingStep] = useState(0);
    const [dots, setDots] = useState('');
    const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
    const [selectedPin, setSelectedPin] = useState<string | null>(null);
    const [originalPhoto, setOriginalPhoto] = useState<string | undefined>(photoParam);

    useEffect(() => {
        if (!originalPhoto) {
            const storedPhoto = getLastAIDesignPhoto();
            if (storedPhoto) {
                setOriginalPhoto(storedPhoto);
            }
        }
    }, []);

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 400);
        return () => clearInterval(dotsInterval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= LOADING_TEXTS.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClose = () => router.replace('/(tabs)/home');
    const handleTryAgain = () => router.push('/ai-design/camera');

    const totalPrice = DETECTED_ITEMS.reduce((sum, item) => {
        const finalPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return sum + finalPrice;
    }, 0);

    if (isLoading) {
        return (
            <View className="flex-1 bg-black">
                <StatusBar barStyle="light-content" />
                {originalPhoto && (
                    <Image
                        source={{ uri: originalPhoto }}
                        className="absolute inset-0 w-full h-full"
                        resizeMode="cover"
                        blurRadius={30}
                    />
                )}
                <View className="absolute inset-0 bg-black/60" />
                <SafeAreaView className="flex-1 items-center justify-center">
                    <Text className="text-white text-3xl font-cairo-bold text-center">
                        {LOADING_TEXTS[loadingStep]}{dots}
                    </Text>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />

            <ScrollView 
                className="flex-1" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Hero Image */}
                <View className="relative h-[400px] bg-slate-100">
                    <Image
                        source={{ uri: viewMode === 'after' ? GENERATED_IMAGE : (originalPhoto || GENERATED_IMAGE) }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    
                    {/* Simple overlay */}
                    <View className="absolute inset-0 bg-black/20" />

                    {/* Interactive Pins */}
                    {viewMode === 'after' && DETECTED_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => setSelectedPin(selectedPin === item.id ? null : item.id)}
                            className="absolute"
                            style={{
                                left: `${item.pinX}%`,
                                top: `${item.pinY}%`,
                                transform: [{ translateX: -16 }, { translateY: -16 }]
                            }}
                        >
                            <View className={`w-8 h-8 rounded-full items-center justify-center ${
                                selectedPin === item.id
                                    ? 'bg-primary'
                                    : 'bg-white'
                            }`}>
                                <View className={`w-3 h-3 rounded-full ${
                                    selectedPin === item.id ? 'bg-white' : 'bg-primary'
                                }`} />
                            </View>

                            {selectedPin === item.id && (
                                <View className="absolute -top-16 left-1/2 -ml-16 w-32 bg-white rounded-2xl p-3">
                                    <Text className="text-xs font-cairo-bold text-slate-800 text-center mb-1">
                                        {item.name}
                                    </Text>
                                    <Text className="text-xs font-cairo-bold text-center" style={{ color: COLORS.primary }}>
                                        {item.price} ر.س
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    {/* Top Controls */}
                    <SafeAreaView className="absolute top-0 left-0 right-0" edges={['top']}>
                        <View className="px-5 py-4 flex-row-reverse justify-between items-center">
                            <TouchableOpacity
                                onPress={handleClose}
                                className="w-12 h-12 rounded-full bg-black/40 items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>

                            <View className="flex-row bg-black/40 rounded-2xl p-1">
                                <TouchableOpacity
                                    onPress={() => setViewMode('before')}
                                    className={`px-5 py-2 rounded-2xl ${
                                        viewMode === 'before' ? 'bg-white/20' : ''
                                    }`}
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-white text-sm font-cairo-bold">قبل</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setViewMode('after')}
                                    className={`px-5 py-2 rounded-2xl ${
                                        viewMode === 'after' ? 'bg-primary' : ''
                                    }`}
                                    activeOpacity={0.8}
                                >
                                    <Text className="text-white text-sm font-cairo-bold">بعد</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                className="w-12 h-12 rounded-full bg-black/40 items-center justify-center"
                                activeOpacity={0.8}
                            >
                                <Feather name="share" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Content */}
                <View className="bg-white px-5 pt-6">
                    <Text className="text-xl font-cairo-bold text-slate-800 text-right mb-2">
                        التصميم الجديد
                    </Text>
                    <Text className="text-sm font-cairo-medium text-slate-500 text-right mb-6">
                        اضغط على النقاط في الصورة لرؤية التفاصيل
                    </Text>

                    {/* Products */}
                    <View className="mb-6">
                        {DETECTED_ITEMS.map((item, index) => {
                            const finalPrice = item.discount 
                                ? Math.round(item.price * (1 - item.discount / 100))
                                : item.price;
                            
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => setSelectedPin(item.id)}
                                    className={`flex-row-reverse items-center bg-slate-50 rounded-2xl p-4 ${
                                        index < DETECTED_ITEMS.length - 1 ? 'mb-3' : ''
                                    }`}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        className="w-20 h-20 rounded-2xl bg-slate-200"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1 mr-4">
                                        <Text className="text-base font-cairo-bold text-slate-800 text-right mb-2">
                                            {item.name}
                                        </Text>
                                        <View className="flex-row-reverse items-center gap-3">
                                            <Text 
                                                className="text-base font-cairo-bold"
                                                style={{ color: COLORS.primary }}
                                            >
                                                {finalPrice} ر.س
                                            </Text>
                                            {item.discount && (
                                                <Text className="text-xs font-cairo-medium text-slate-400 line-through">
                                                    {item.price}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                                        <Feather name="plus" size={20} color={COLORS.primary} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Actions */}
                    <TouchableOpacity
                        className="w-full py-4 rounded-2xl flex-row-reverse justify-center items-center gap-3 bg-primary mb-4"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-base font-cairo-bold">
                            أضف الكل للسلة ({Math.round(totalPrice)} ر.س)
                        </Text>
                        <Feather name="shopping-cart" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleTryAgain}
                        className="w-full py-4 rounded-2xl flex-row-reverse justify-center items-center gap-3 bg-slate-100"
                        activeOpacity={0.8}
                    >
                        <Text className="text-slate-700 text-base font-cairo-bold">جرب صورة أخرى</Text>
                        <Feather name="refresh-cw" size={20} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default AIResultsScreen;
