// File: src/components/shared/SwipeToConfirm.tsx
// Purpose: Swipe-to-confirm button component (RTL - swipe from right to left)

import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, PanResponder, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwipeToConfirmProps {
    onConfirm: () => void;
    label?: string;
    disabled?: boolean;
}

export const SwipeToConfirm: React.FC<SwipeToConfirmProps> = ({
    onConfirm,
    label = 'اسحب لتأكيد الطلب',
    disabled = false,
}) => {
    const BUTTON_WIDTH = SCREEN_WIDTH - 40; // Full width minus padding
    const THUMB_SIZE = 56;
    const MAX_TRANSLATE = BUTTON_WIDTH - THUMB_SIZE - 8; // 8 for padding

    const translateX = useRef(new Animated.Value(0)).current;
    const shimmerAnim = useRef(new Animated.Value(0)).current;
    const arrowAnim = useRef(new Animated.Value(0)).current;
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Shimmer animation (right to left for RTL)
    useEffect(() => {
        if (!disabled && !isConfirmed) {
            const shimmerLoop = Animated.loop(
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );
            shimmerLoop.start();

            // Arrow bounce animation
            const arrowLoop = Animated.loop(
                Animated.sequence([
                    Animated.timing(arrowAnim, {
                        toValue: 1,
                        duration: 600,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(arrowAnim, {
                        toValue: 0,
                        duration: 600,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            );
            arrowLoop.start();

            return () => {
                shimmerLoop.stop();
                arrowLoop.stop();
            };
        }
    }, [disabled, isConfirmed]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !disabled && !isConfirmed,
            onMoveShouldSetPanResponder: () => !disabled && !isConfirmed,
            onPanResponderGrant: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
            onPanResponderMove: (_, gestureState) => {
                // RTL: negative dx means swiping left (which is forward in RTL)
                const newValue = Math.max(0, Math.min(-gestureState.dx, MAX_TRANSLATE));
                translateX.setValue(newValue);
            },
            onPanResponderRelease: (_, gestureState) => {
                const swipeDistance = -gestureState.dx;
                
                if (swipeDistance > MAX_TRANSLATE * 0.7) {
                    // Complete the swipe
                    Animated.spring(translateX, {
                        toValue: MAX_TRANSLATE,
                        useNativeDriver: true,
                        tension: 50,
                        friction: 8,
                    }).start(() => {
                        setIsConfirmed(true);
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        onConfirm();
                    });
                } else {
                    // Reset
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 50,
                        friction: 8,
                    }).start();
                }
            },
        })
    ).current;

    // Calculate opacity for the text based on swipe progress
    const textOpacity = translateX.interpolate({
        inputRange: [0, MAX_TRANSLATE * 0.5],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Calculate thumb position (RTL - moves from right to left)
    const thumbTransform = translateX.interpolate({
        inputRange: [0, MAX_TRANSLATE],
        outputRange: [0, -MAX_TRANSLATE],
        extrapolate: 'clamp',
    });

    // Shimmer effect position (right to left)
    const shimmerTranslate = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [BUTTON_WIDTH, -100],
    });

    // Arrow bounce effect
    const arrowTranslateX = arrowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -8],
    });

    return (
        <View
            className="rounded-2xl overflow-hidden"
            style={{
                backgroundColor: disabled ? '#e2e8f0' : isConfirmed ? '#10B981' : COLORS.primary,
                height: THUMB_SIZE + 8,
            }}
        >
            {/* Shimmer Effect */}
            {!disabled && !isConfirmed && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        width: 60,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        transform: [{ translateX: shimmerTranslate }, { skewX: '-20deg' }],
                    }}
                />
            )}

            {/* Background Text */}
            <Animated.View
                className="absolute inset-0 items-center justify-center flex-row-reverse gap-2"
                style={{ opacity: textOpacity }}
            >
                <Text
                    className="font-cairo-bold text-base"
                    style={{ color: disabled ? '#94a3b8' : 'white' }}
                >
                    {isConfirmed ? 'تم التأكيد ✓' : label}
                </Text>
                {!isConfirmed && (
                    <Animated.View style={{ transform: [{ translateX: arrowTranslateX }] }}>
                        <Feather name="chevrons-left" size={20} color={disabled ? '#94a3b8' : 'white'} />
                    </Animated.View>
                )}
            </Animated.View>

            {/* Swipeable Thumb */}
            {!isConfirmed && (
                <Animated.View
                    {...panResponder.panHandlers}
                    className="absolute items-center justify-center bg-white rounded-xl"
                    style={{
                        width: THUMB_SIZE,
                        height: THUMB_SIZE,
                        top: 4,
                        right: 4,
                        transform: [{ translateX: thumbTransform }],
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                    }}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={disabled ? '#94a3b8' : COLORS.primary}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default SwipeToConfirm;
