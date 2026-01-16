// File: src/screens/shared/components/SectionHeader.tsx
// Purpose: Reusable section header with title and optional "view all" link

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { useRTL } from '../../../hooks/useRTL';
import { SectionHeaderProps } from '../types/ui';
import { getStyles } from '../StyleSheets/SectionHeader.styles';

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    showViewAll = false,
    viewAllLink,
    onViewAllPress,
}) => {
    const { isRTL } = useRTL();
    const styles = getStyles(isRTL);
    
    const renderViewAll = () => {
        if (!showViewAll) return null;

        const chevronIcon = isRTL ? 'chevron-left' : 'chevron-right';

        if (viewAllLink) {
            return (
                <Link href={viewAllLink as any} asChild>
                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAllText}>عرض الكل</Text>
                        <Feather name={chevronIcon} size={16} color={COLORS.textLight} />
                    </TouchableOpacity>
                </Link>
            );
        }

        if (onViewAllPress) {
            return (
                <TouchableOpacity onPress={onViewAllPress} style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>عرض الكل</Text>
                    <Feather name={chevronIcon} size={16} color={COLORS.textLight} />
                </TouchableOpacity>
            );
        }

        return null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {renderViewAll()}
        </View>
    );
};
