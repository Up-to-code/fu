// File: src/screens/ai/AIResultsScreen.tsx
// Purpose: Modern and clean AI Results screen matching UI system

import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../shared';
import { COLORS } from '../../constants/theme';
import { getLastAIDesignPhoto } from '../../utils/storage';
import { styles } from './StyleSheets/AIResultsScreen.styles';

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
            <View style={styles.loadingContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                {originalPhoto && (
                    <Image
                        source={{ uri: originalPhoto }}
                        style={styles.loadingImage}
                        resizeMode="cover"
                        blurRadius={30}
                    />
                )}
                <View style={styles.loadingOverlay} />
                <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.loadingText}>
                        {LOADING_TEXTS[loadingStep]}{dots}
                    </Text>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
                <Header
                    title="نتائج التصميم"
                    showBack
                    onBack={handleClose}
                />
            </SafeAreaView>

            <ScrollView 
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Hero Image */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: viewMode === 'after' ? GENERATED_IMAGE : (originalPhoto || GENERATED_IMAGE) }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    
                    {/* Simple overlay */}
                    <View style={styles.heroOverlay} />

                    {/* Interactive Pins */}
                    {viewMode === 'after' && DETECTED_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => setSelectedPin(selectedPin === item.id ? null : item.id)}
                            style={[
                                styles.pin,
                                {
                                    left: `${item.pinX}%`,
                                    top: `${item.pinY}%`,
                                    transform: [{ translateX: -16 }, { translateY: -16 }]
                                }
                            ]}
                        >
                            <View style={[
                                styles.pinButton,
                                selectedPin === item.id ? styles.pinButtonSelected : styles.pinButtonUnselected
                            ]}>
                                <View style={[
                                    styles.pinDot,
                                    selectedPin === item.id ? styles.pinDotSelected : styles.pinDotUnselected
                                ]} />
                            </View>

                            {selectedPin === item.id && (
                                <View style={styles.pinTooltip}>
                                    <Text style={styles.pinTooltipName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.pinTooltipPrice}>
                                        {item.price} ر.س
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    {/* Top Controls */}
                    <SafeAreaView style={styles.topBar} edges={['top']}>
                        <View style={styles.topBarContent}>
                            <TouchableOpacity
                                onPress={handleClose}
                                style={styles.topBarButton}
                                activeOpacity={0.8}
                            >
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>

                            <View style={styles.viewModeContainer}>
                                <TouchableOpacity
                                    onPress={() => setViewMode('before')}
                                    style={[
                                        styles.viewModeButton,
                                        viewMode === 'before' ? styles.viewModeButtonActive : null
                                    ]}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.viewModeText}>قبل</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setViewMode('after')}
                                    style={[
                                        styles.viewModeButton,
                                        viewMode === 'after' ? styles.viewModeButtonSelected : null
                                    ]}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.viewModeText}>بعد</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                style={styles.topBarButton}
                                activeOpacity={0.8}
                            >
                                <Feather name="share" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        التصميم الجديد
                    </Text>
                    <Text style={styles.description}>
                        اضغط على النقاط في الصورة لرؤية التفاصيل
                    </Text>

                    {/* Products */}
                    <View style={styles.itemsContainer}>
                        {DETECTED_ITEMS.map((item, index) => {
                            const finalPrice = item.discount 
                                ? Math.round(item.price * (1 - item.discount / 100))
                                : item.price;
                            
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => setSelectedPin(item.id)}
                                    style={[
                                        styles.itemCard,
                                        index < DETECTED_ITEMS.length - 1 && { marginBottom: 12 }
                                    ]}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.itemImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>
                                            {item.name}
                                        </Text>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 12 }}>
                                            <Text 
                                                style={[styles.itemPrice, { color: COLORS.primary }]}
                                            >
                                                {finalPrice} ر.س
                                            </Text>
                                            {item.discount && (
                                                <Text style={styles.itemDiscount}>
                                                    {item.price}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f9ff', alignItems: 'center', justifyContent: 'center' }}>
                                        <Feather name="plus" size={20} color={COLORS.primary} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Total */}
                    <View style={styles.totalContainer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>المجموع</Text>
                            <Text style={styles.totalValue}>
                                {Math.round(totalPrice)} ر.س
                            </Text>
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.actionButtonPrimary]}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.actionButtonText, styles.actionButtonTextPrimary]}>
                                أضف الكل للسلة ({Math.round(totalPrice)} ر.س)
                            </Text>
                            <Feather name="shopping-cart" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleTryAgain}
                            style={[styles.actionButton, styles.actionButtonSecondary]}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>جرب صورة أخرى</Text>
                            <Feather name="refresh-cw" size={20} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default AIResultsScreen;
