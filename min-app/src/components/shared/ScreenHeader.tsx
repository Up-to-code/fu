// File: src/components/shared/ScreenHeader.tsx
// Purpose: Reusable screen header with title, subtitle, and icon

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface ScreenHeaderProps {
    title: string;
    subtitle?: string;
    icon?: keyof typeof Feather.glyphMap;
    iconBgColor?: string;
    iconColor?: string;
    showBack?: boolean;
    onBack?: () => void;
    rightAction?: React.ReactNode;
    border?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    subtitle,
    icon,
    iconBgColor = '#f1f5f9', // slate-100
    iconColor = COLORS.primary,
    showBack = false,
    onBack,
    rightAction,
    border = true,
}) => {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (router.canGoBack()) {
            router.back();
        }
    };

    return (
        <SafeAreaView edges={['top']} className="bg-white">
            <View
                className={`flex-row-reverse justify-between items-center ${border ? 'border-b border-slate-100' : ''}`}
                style={{
                    paddingHorizontal: isTablet ? 32 : 20,
                    paddingBottom: isTablet ? 24 : 16,
                }}
            >
                {/* Title & Subtitle */}
                <View className="flex-1">
                    <Text
                        className="font-cairo-bold text-slate-800 text-right"
                        style={{ fontSize: isTablet ? 24 : 20 }}
                    >
                        {title}
                    </Text>
                    {subtitle && (
                        <Text
                            className="text-slate-500 text-right font-cairo-medium"
                            style={{ fontSize: isTablet ? 16 : 14 }}
                        >
                            {subtitle}
                        </Text>
                    )}
                </View>

                {/* Left Side: Back button or Icon */}
                {showBack ? (
                    <TouchableOpacity
                        onPress={handleBack}
                        className="rounded-full items-center justify-center"
                        style={{
                            width: isTablet ? 48 : 40,
                            height: isTablet ? 48 : 40,
                            backgroundColor: iconBgColor,
                        }}
                    >
                        <Feather name="arrow-right" size={isTablet ? 24 : 20} color={COLORS.text} />
                    </TouchableOpacity>
                ) : icon ? (
                    <View
                        className="rounded-full items-center justify-center"
                        style={{
                            width: isTablet ? 48 : 40,
                            height: isTablet ? 48 : 40,
                            backgroundColor: iconBgColor,
                        }}
                    >
                        <Feather name={icon} size={isTablet ? 24 : 20} color={iconColor} />
                    </View>
                ) : rightAction ? (
                    rightAction
                ) : (
                    <View style={{ width: isTablet ? 48 : 40 }} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ScreenHeader;
