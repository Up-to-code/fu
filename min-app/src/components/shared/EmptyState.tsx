// File: src/components/shared/EmptyState.tsx
// Purpose: Reusable empty state placeholder

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface EmptyStateProps {
    icon: keyof typeof Feather.glyphMap;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    iconColor?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    iconColor = '#CBD5E1',
}) => {
    return (
        <View className="flex-1 items-center justify-center pt-20 px-8">
            <View
                className="bg-slate-50 rounded-full items-center justify-center mb-6"
                style={{
                    width: isTablet ? 128 : 96,
                    height: isTablet ? 128 : 96,
                }}
            >
                <Feather name={icon} size={isTablet ? 56 : 40} color={iconColor} />
            </View>

            <Text className={`text-slate-800 font-cairo-bold mb-2 text-center ${isTablet ? 'text-2xl' : 'text-xl'}`}>
                {title}
            </Text>

            {description && (
                <Text className={`text-slate-500 text-center mb-8 font-cairo-medium ${isTablet ? 'text-base' : 'text-sm'}`}>
                    {description}
                </Text>
            )}

            {actionLabel && onAction && (
                <TouchableOpacity
                    onPress={onAction}
                    className={`bg-primary rounded-2xl ${isTablet ? 'px-12 py-5' : 'px-8 py-4'}`}
                >
                    <Text className={`text-white font-cairo-bold ${isTablet ? 'text-lg' : 'text-base'}`}>
                        {actionLabel}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EmptyState;
