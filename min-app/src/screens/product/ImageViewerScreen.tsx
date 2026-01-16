// File: src/screens/product/ImageViewerScreen.tsx
// Purpose: Fullscreen image viewer with zoom and pan

import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Image,
    PanResponder,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive } from '../../hooks/useResponsive';
import { getStyles } from './StyleSheets/ImageViewerScreen.styles';

export default function ImageViewerScreen() {
    const router = useRouter();
    const { images, index } = useLocalSearchParams();
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT, getSize, fontSize, iconSize } = useResponsive();
    const styles = getStyles(getSize, fontSize, iconSize);

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
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Close Button */}
            <SafeAreaView edges={['top']} style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.closeButton}
                    >
                        <Feather name="x" size={22} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.imageCounter}>
                        {currentIndex + 1} / {imageUrls.length}
                    </Text>

                    <View style={styles.spacer} />
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
                        style={[
                            { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
                            styles.imageContainer
                        ]}
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
            <SafeAreaView edges={['bottom']} style={styles.thumbnailsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.thumbnailsContent}
                    style={styles.thumbnailsScroll}
                >
                    {imageUrls.map((imageUrl, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => {
                                handleImageChange(idx);
                                scrollViewRef.current?.scrollTo({ x: idx * SCREEN_WIDTH, animated: true });
                            }}
                            style={[
                                styles.thumbnail,
                                currentIndex === idx ? styles.thumbnailSelected : styles.thumbnailUnselected
                            ]}
                        >
                            <Image source={{ uri: imageUrl }} style={styles.thumbnailImage} resizeMode="cover" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>

            {/* Zoom hint */}
            {scale === 1 && (
                <View style={styles.zoomHint}>
                    <View style={styles.zoomHintContainer}>
                        <Text style={styles.zoomHintText}>
                            اضغط مرتين للتكبير
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
