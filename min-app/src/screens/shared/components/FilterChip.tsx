// File: src/screens/shared/components/FilterChip.tsx
// Purpose: Filter/tag chip component

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { FilterChipProps } from '../types/navigation';
import { styles } from '../StyleSheets/FilterChip.styles';

export const FilterChip: React.FC<FilterChipProps> = ({
    icon,
    text,
    primary = false,
    style,
    ...touchableProps
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.chip,
                primary && styles.primaryChip,
                style
            ]}
            activeOpacity={0.7}
            {...touchableProps}
        >
            {icon && (
                <Feather
                    name={icon}
                    size={14}
                    color={primary ? COLORS.primary : '#94a3b8'}
                />
            )}
            <Text style={[styles.chipText, primary && styles.primaryChipText]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};
