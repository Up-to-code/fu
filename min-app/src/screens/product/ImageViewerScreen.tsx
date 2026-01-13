// File: src/screens/product/ImageViewerScreen.tsx
// Purpose: Fullscreen image viewer with zoom and pan

import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    PanResponder,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ImageViewerScreen() {
    const router = useRouter();
    const { images, index } = useLocalSearchParams();

    // Parse images array from params
    const imageUrls: string[] = typeof images === 'string' ? JSON.parse(images) : [];
    const initialIndex = typeof index === 'string' ? parseInt(index, 10) : 0;

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const scrollViewRef = useRef<ScrollView>(null);

    // Zoom state
    const scaleValue = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    // Double tap to zoom
    const lastTap = useRef<number>(0);
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            // Double tap detected
            if (scale === 1) {
                Animated.spring(scaleValue, { toValue: 2, useNativeDriver: true }).start();
                setScale(2);
            } else {
                Animated.parallel([
                    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }),
                    Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
                    Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
                ]).start();
                setScale(1);
            }
        }
        lastTap.current = now;
    };

    // Reset zoom when changing image
    const handleImageChange = (newIndex: number) => {
        setCurrentIndex(newIndex);
        setScale(1);
        scaleValue.setValue(1);
        translateX.setValue(0);
        translateY.setValue(0);
    };

    // Pan responder for drag when zoomed
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => scale > 1,
            onMoveShouldSetPanResponder: () => scale > 1,
            onPanResponderMove: (_, gestureState) => {
                if (scale > 1) {
                    translateX.setValue(gestureState.dx);
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: () => {
                // Spring back if dragged too far
                translateX.flattenOffset();
                translateY.flattenOffset();
            },
        })
    ).current;

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" />

            {/* Close Button */}
            <SafeAreaView edges={['top']} className="absolute top-0 left-0 right-0 z-10">
                <View className="flex-row justify-between items-center px-4 py-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
                    >
                        <Feather name="x" size={22} color="white" />
                    </TouchableOpacity>

                    <Text className="text-white font-cairo-bold text-base">
                        {currentIndex + 1} / {imageUrls.length}
                    </Text>

                    <View className="w-10" />
                </View>
            </SafeAreaView>

            {/* Images */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                    handleImageChange(newIndex);
                }}
                contentOffset={{ x: initialIndex * SCREEN_WIDTH, y: 0 }}
            >
                {imageUrls.map((imageUrl, idx) => (
                    <TouchableOpacity
                        key={idx}
                        activeOpacity={1}
                        onPress={handleDoubleTap}
                        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
                        className="items-center justify-center"
                        {...panResponder.panHandlers}
                    >
                        <Animated.Image
                            source={{ uri: imageUrl }}
                            style={{
                                width: SCREEN_WIDTH,
                                height: SCREEN_HEIGHT * 0.7,
                                transform: [
                                    { scale: idx === currentIndex ? scaleValue : 1 },
                                    { translateX: idx === currentIndex ? translateX : 0 },
                                    { translateY: idx === currentIndex ? translateY : 0 },
                                ],
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Thumbnails */}
            <SafeAreaView edges={['bottom']} className="absolute bottom-0 left-0 right-0">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 8 }}
                    className="flex-row"
                >
                    {imageUrls.map((imageUrl, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => {
                                handleImageChange(idx);
                                scrollViewRef.current?.scrollTo({ x: idx * SCREEN_WIDTH, animated: true });
                            }}
                            className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${currentIndex === idx ? 'border-white' : 'border-transparent'
                                }`}
                        >
                            <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>

            {/* Zoom hint */}
            {scale === 1 && (
                <View className="absolute bottom-32 left-0 right-0 items-center">
                    <View className="bg-black/50 px-4 py-2 rounded-full">
                        <Text className="text-white/70 text-xs font-cairo-medium">
                            اضغط مرتين للتكبير
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
