// File: src/screens/shared/components/SwipeToConfirm.tsx
// Purpose: Swipe-to-confirm button component with RTL/LTR support

import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Animated, Easing, PanResponder, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { SwipeToConfirmProps } from '../types/ui';
import { getStyles } from '../StyleSheets/SwipeToConfirm.styles';

const SwipeToConfirmComponent: React.FC<SwipeToConfirmProps> = ({
    onConfirm,
    label = 'اسحب لتأكيد الطلب',
    disabled = false,
}) => {
    const { isRTL, swipeMultiplier, flexDirection } = useRTL();
    const { getSize, width, padding } = useResponsive();
    const styles = getStyles(getSize);
    const BUTTON_WIDTH = width - padding * 2;
    const THUMB_SIZE = getSize(52, 54, 56, 56, 60);
    const PADDING = getSize(4, 4, 4, 6, 8);
    const MAX_TRANSLATE = BUTTON_WIDTH - THUMB_SIZE - PADDING * 2;

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
    }, [disabled, isConfirmed, shimmerAnim, arrowAnim]);

    const panResponder = useMemo(
        () => PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                // Always claim responder if not disabled/confirmed
                return !disabled && !isConfirmed;
            },
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Prioritize horizontal swipes - require significant horizontal movement
                const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
                const hasSignificantHorizontalMovement = Math.abs(gestureState.dx) > 10;
                return !disabled && !isConfirmed && isHorizontal && hasSignificantHorizontalMovement;
            },
            onPanResponderGrant: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
            onPanResponderMove: (_, gestureState) => {
                // Direction-aware swipe: RTL swipes right-to-left (negative dx), LTR swipes left-to-right (positive dx)
                const directionAwareDx = gestureState.dx * swipeMultiplier;
                const newValue = Math.max(0, Math.min(Math.abs(directionAwareDx), MAX_TRANSLATE));
                translateX.setValue(newValue);
            },
            onPanResponderRelease: (_, gestureState) => {
                const directionAwareDx = gestureState.dx * swipeMultiplier;
                const swipeDistance = Math.abs(directionAwareDx);

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
            onPanResponderTerminationRequest: () => false, // Don't allow parent to steal gesture
            onPanResponderTerminate: () => {
                // Reset if gesture is terminated
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 8,
                }).start();
            },
        }),
        [disabled, isConfirmed, swipeMultiplier]
    );

    // Calculate opacity for the text based on swipe progress
    const textOpacity = translateX.interpolate({
        inputRange: [0, MAX_TRANSLATE * 0.5],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Calculate thumb position (direction-aware)
    const thumbTransform = translateX.interpolate({
        inputRange: [0, MAX_TRANSLATE],
        outputRange: isRTL ? [0, -MAX_TRANSLATE] : [0, MAX_TRANSLATE],
        extrapolate: 'clamp',
    });

    // Shimmer effect position (direction-aware)
    const shimmerTranslate = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: isRTL ? [BUTTON_WIDTH, -100] : [-100, BUTTON_WIDTH],
    });

    // Arrow bounce effect (direction-aware)
    const arrowTranslateX = arrowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: isRTL ? [0, -8] : [0, 8],
    });

    const containerBackgroundColor = disabled
        ? '#e2e8f0'
        : isConfirmed
            ? '#10B981'
            : COLORS.primary;

    // Dynamic styles based on direction
    const dynamicStyles = useMemo(() => StyleSheet.create({
        textContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        thumb: {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#f1f5f9',
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            top: PADDING,
            ...(isRTL ? { right: PADDING } : { left: PADDING }),
        },
    }), [flexDirection, isRTL]);

    const arrowIcon = isRTL ? 'chevrons-left' : 'chevrons-right';
    const thumbArrowIcon = isRTL ? 'arrow-left' : 'arrow-right';

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: containerBackgroundColor, height: THUMB_SIZE + PADDING * 2 },
            ]}
        >
            {/* Shimmer Effect */}
            {!disabled && !isConfirmed && (
                <Animated.View
                    style={[
                        styles.shimmer,
                        { transform: [{ translateX: shimmerTranslate }, { skewX: '-20deg' }] },
                    ]}
                />
            )}

            {/* Background Text */}
            <Animated.View style={[dynamicStyles.textContainer, { opacity: textOpacity }]}>
                <Text style={[styles.label, { color: disabled ? '#94a3b8' : 'white' }]}>
                    {isConfirmed ? 'تم التأكيد ✓' : label}
                </Text>
                {!isConfirmed && (
                    <Animated.View style={{ transform: [{ translateX: arrowTranslateX }] }}>
                        <Feather name={arrowIcon} size={getSize(18, 20, 22, 22, 24)} color={disabled ? '#94a3b8' : 'white'} />
                    </Animated.View>
                )}
            </Animated.View>

            {/* Swipeable Thumb */}
            {!isConfirmed && (
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                        dynamicStyles.thumb,
                        {
                            transform: [{ translateX: thumbTransform }],
                        },
                    ]}
                >
                    <Feather
                        name={thumbArrowIcon}
                        size={getSize(20, 22, 24, 24, 26)}
                        color={disabled ? '#94a3b8' : COLORS.primary}
                    />
                </Animated.View>
            )}
        </View>
    );
};

// Memoize SwipeToConfirm to prevent unnecessary re-renders
export const SwipeToConfirm = React.memo(SwipeToConfirmComponent);

export default SwipeToConfirm;
