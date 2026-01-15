// File: src/screens/shared/components/ScreenHeader.tsx
// Purpose: Generic header component (extends Header with subtitle support)

import React from 'react';
import { Text, View } from 'react-native';
import { Header } from './Header';
import { ScreenHeaderProps } from '../types/ui';
import { styles } from '../StyleSheets/ScreenHeader.styles';

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    title,
    subtitle,
    showBack = true,
    rightAction,
    onBack,
}) => {
    return (
        <View style={styles.container}>
            <Header
                title={title}
                showBack={showBack}
                rightAction={rightAction}
                onBack={onBack}
            />
            {subtitle && (
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            )}
        </View>
    );
};
