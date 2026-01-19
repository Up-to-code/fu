// File: src/screens/shared/components/AlertBanner.tsx
// Purpose: Animated banner for success/error/info messages

import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../StyleSheets/AlertBanner.styles';

export interface AlertBannerProps {
    type: 'success' | 'error' | 'info';
    message: string;
    visible: boolean;
    onDismiss?: () => void;
}

const iconMap = {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'info',
} as const;

const colorMap = {
    success: '#16A34A',
    error: '#DC2626',
    info: '#2563EB',
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
    type,
    message,
    visible,
    onDismiss,
}) => {
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -100,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, slideAnim, opacityAnim]);

    if (!visible) {
        return null;
    }

    const containerStyle = [
        styles.container,
        type === 'error' && styles.error,
        type === 'success' && styles.success,
        type === 'info' && styles.info,
    ];

    const textStyle = [
        styles.message,
        type === 'error' && styles.errorText,
        type === 'success' && styles.successText,
        type === 'info' && styles.infoText,
    ];

    return (
        <Animated.View
            style={[
                containerStyle,
                {
                    transform: [{ translateY: slideAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <View style={styles.icon}>
                <Feather name={iconMap[type]} size={20} color={colorMap[type]} />
            </View>
            <View style={styles.textContainer}>
                <Text style={textStyle}>{message}</Text>
            </View>
            {onDismiss && (
                <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
                    <Feather name="x" size={18} color={colorMap[type]} />
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};
