// File: src/screens/shared/components/SectionHeader.tsx
// Purpose: Reusable section header with title and optional "view all" link

import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { SectionHeaderProps } from '../types/ui';
import { styles } from '../StyleSheets/SectionHeader.styles';

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    showViewAll = false,
    viewAllLink,
    onViewAllPress,
}) => {
    const renderViewAll = () => {
        if (!showViewAll) return null;

        if (viewAllLink) {
            return (
                <Link href={viewAllLink as any} asChild>
                    <TouchableOpacity style={styles.viewAllButton}>
                        <Text style={styles.viewAllText}>عرض الكل</Text>
                        <Feather name="chevron-left" size={16} color={COLORS.textLight} />
                    </TouchableOpacity>
                </Link>
            );
        }

        if (onViewAllPress) {
            return (
                <TouchableOpacity onPress={onViewAllPress} style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>عرض الكل</Text>
                    <Feather name="chevron-left" size={16} color={COLORS.textLight} />
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
