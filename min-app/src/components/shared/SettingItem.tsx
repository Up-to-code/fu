// File: src/components/shared/SettingItem.tsx
// Purpose: Reusable settings row for account screens

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Switch, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface SettingItemProps {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    subLabel?: string;
    iconColor?: string;
    iconBgColor?: string;
    showArrow?: boolean;
    onPress?: () => void;
    // For toggle variant
    toggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
}

export const SettingItem: React.FC<SettingItemProps> = ({
    icon,
    label,
    subLabel,
    iconColor = COLORS.primary,
    iconBgColor = '#f1f5f9',
    showArrow = true,
    onPress,
    toggle = false,
    toggleValue = false,
    onToggle,
}) => {
    const iconSize = isTablet ? 24 : 20;
    const containerSize = isTablet ? 48 : 40;

    const Content = (
        <>
            {/* Arrow or Toggle */}
            {toggle ? (
                <Switch
                    value={toggleValue}
                    onValueChange={onToggle}
                    trackColor={{ true: COLORS.primary }}
                />
            ) : showArrow ? (
                <Feather name="chevron-left" size={20} color="#CBD5E1" />
            ) : null}

            {/* Label */}
            <View className="flex-1 items-end mr-4">
                <Text className={`text-slate-800 font-cairo-bold ${isTablet ? 'text-lg' : 'text-base'}`}>
                    {label}
                </Text>
                {subLabel && (
                    <Text className={`text-slate-400 mt-0.5 font-cairo-medium ${isTablet ? 'text-sm' : 'text-xs'}`}>
                        {subLabel}
                    </Text>
                )}
            </View>

            {/* Icon */}
            <View
                className="rounded-full items-center justify-center"
                style={{
                    width: containerSize,
                    height: containerSize,
                    backgroundColor: iconBgColor,
                }}
            >
                <Feather name={icon} size={iconSize} color={iconColor} />
            </View>
        </>
    );

    if (toggle) {
        return (
            <View className="flex-row items-center justify-between py-4 border-b border-slate-100">
                {Content}
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between py-4 border-b border-slate-100"
            activeOpacity={0.7}
        >
            {Content}
        </TouchableOpacity>
    );
};

export default SettingItem;
