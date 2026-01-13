// File: src/components/shared/FloatingHeader.tsx
// Purpose: Floating header for screens with image backgrounds

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface FloatingHeaderProps {
    onBack?: () => void;
    onShare?: () => void;
    onFavorite?: () => void;
    isFavorite?: boolean;
    showBack?: boolean;
    showShare?: boolean;
    showFavorite?: boolean;
    transparent?: boolean;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({
    onBack,
    onShare,
    onFavorite,
    isFavorite = false,
    showBack = true,
    showShare = false,
    showFavorite = false,
    transparent = true,
}) => {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (router.canGoBack()) {
            router.back();
        }
    };

    const buttonSize = isTablet ? 48 : 40;
    const iconSize = isTablet ? 24 : 20;
    const bgColor = transparent ? 'rgba(255,255,255,0.9)' : 'white';

    return (
        <SafeAreaView
            edges={['top']}
            className="absolute top-0 left-0 right-0 z-10"
        >
            <View
                className="flex-row justify-between items-center"
                style={{
                    paddingHorizontal: isTablet ? 32 : 16,
                    paddingVertical: isTablet ? 16 : 8,
                    paddingTop: isTablet ? 16 : 8,
                }}
            >
                {/* Back Button */}
                {showBack ? (
                    <TouchableOpacity
                        onPress={handleBack}
                        className="rounded-full items-center justify-center"
                        style={{
                            width: buttonSize,
                            height: buttonSize,
                            backgroundColor: bgColor,
                        }}
                    >
                        <Feather name="arrow-right" size={iconSize} color={COLORS.text} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: buttonSize }} />
                )}

                {/* Right Actions */}
                <View className="flex-row gap-3">
                    {showShare && (
                        <TouchableOpacity
                            onPress={onShare}
                            className="rounded-full items-center justify-center"
                            style={{
                                width: buttonSize,
                                height: buttonSize,
                                backgroundColor: bgColor,
                            }}
                        >
                            <Feather name="share-2" size={iconSize} color={COLORS.text} />
                        </TouchableOpacity>
                    )}
                    {showFavorite && (
                        <TouchableOpacity
                            onPress={onFavorite}
                            className="rounded-full items-center justify-center"
                            style={{
                                width: buttonSize,
                                height: buttonSize,
                                backgroundColor: bgColor,
                            }}
                        >
                            <Feather
                                name="heart"
                                size={iconSize}
                                color={isFavorite ? '#EF4444' : COLORS.text}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FloatingHeader;
