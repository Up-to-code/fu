// File: src/components/shared/ActionButton.tsx
// Purpose: Primary and secondary action buttons

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface ActionButtonProps {
    label: string;
    icon?: keyof typeof Feather.glyphMap;
    onPress?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    disabled?: boolean;
    fullWidth?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    icon,
    onPress,
    variant = 'primary',
    disabled = false,
    fullWidth = true,
}) => {
    const getStyles = () => {
        switch (variant) {
            case 'secondary':
                return {
                    bg: 'bg-slate-100',
                    textColor: 'text-slate-700',
                    iconColor: COLORS.text,
                };
            case 'outline':
                return {
                    bg: 'bg-white border border-slate-200',
                    textColor: 'text-slate-700',
                    iconColor: COLORS.text,
                };
            case 'danger':
                return {
                    bg: 'bg-red-50',
                    textColor: 'text-red-500',
                    iconColor: '#EF4444',
                };
            default:
                return {
                    bg: 'bg-primary',
                    textColor: 'text-white',
                    iconColor: 'white',
                };
        }
    };

    const styles = getStyles();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={`${styles.bg} rounded-2xl flex-row-reverse justify-center items-center gap-3 ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50' : ''}`}
            style={{ paddingVertical: isTablet ? 20 : 16 }}
            activeOpacity={0.8}
        >
            <Text className={`${styles.textColor} font-cairo-bold ${isTablet ? 'text-lg' : 'text-base'}`}>
                {label}
            </Text>
            {icon && (
                <Feather name={icon} size={isTablet ? 22 : 18} color={styles.iconColor} />
            )}
        </TouchableOpacity>
    );
};

export default ActionButton;
