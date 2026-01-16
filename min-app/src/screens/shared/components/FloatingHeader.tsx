// File: src/screens/shared/components/FloatingHeader.tsx
// Purpose: Floating header for screens with image backgrounds

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { FloatingHeaderProps } from '../types/ui';
import { getStyles } from '../StyleSheets/FloatingHeader.styles';

const FloatingHeaderComponent: React.FC<FloatingHeaderProps> = ({
    onBack,
    onFavorite,
    isFavorite = false,
    showBack = true,
    showFavorite = false,
    transparent = true,
}) => {
    const router = useRouter();
    const { isRTL } = useRTL();
    const { getSize } = useResponsive();
    const styles = getStyles(transparent, isRTL, getSize);

    const handleBack = useCallback(() => {
        if (onBack) {
            onBack();
        } else if (router.canGoBack()) {
            router.back();
        }
    }, [onBack, router]);

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.content}>
                {/* Back Button */}
                {showBack ? (
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.button}
                        activeOpacity={0.8}
                    >
                        <Feather name={isRTL ? "arrow-right" : "arrow-left"} size={styles.iconSize} color={COLORS.text} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.spacer} />
                )}

                {/* Heart Button (Right) */}
                {showFavorite ? (
                    <TouchableOpacity
                        onPress={onFavorite}
                        style={styles.button}
                        activeOpacity={0.8}
                    >
                        <Feather
                            name="heart"
                            size={styles.iconSize}
                            color={isFavorite ? '#EF4444' : COLORS.text}
                            fill={isFavorite ? '#EF4444' : 'none'}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.spacer} />
                )}
            </View>
        </SafeAreaView>
    );
};

// Memoize FloatingHeader to prevent unnecessary re-renders
export const FloatingHeader = React.memo(FloatingHeaderComponent);

export default FloatingHeader;
