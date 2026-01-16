// File: src/screens/shared/components/Header.tsx
// Purpose: Reusable header component with back button, title, and optional right action

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { useRTL } from '../../../hooks/useRTL';
import { useResponsive } from '../../../hooks/useResponsive';
import { HeaderProps } from '../types/interfaces';
import { getStyles } from '../StyleSheets/Header.styles';

export const Header: React.FC<HeaderProps> = ({
    title,
    showBack = true,
    rightAction,
    onBack,
    backButtonText,
}) => {
    const router = useRouter();
    const { isRTL, flexDirection } = useRTL();
    const { getSize, iconSize } = useResponsive();
    const styles = getStyles(isRTL, getSize);
    const backIcon = isRTL ? 'arrow-right' : 'arrow-left';

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    const renderBackButton = () => {
        if (!showBack) {
            return <View style={styles.backButton} />;
        }

        // Show text if provided or if Arabic and no custom text
        const showText = backButtonText || (isRTL && !backButtonText);
        const backText = backButtonText || (isRTL ? 'رجوع' : 'Back');

        return (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                {showText ? (
                    <Text style={styles.backButtonText}>
                        {backText}
                    </Text>
                ) : (
                    <Feather name={backIcon} size={iconSize.md} color={COLORS.text} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.header}>
            {renderBackButton()}
            <Text style={styles.headerTitle}>{title}</Text>
            {rightAction || <View style={styles.backButton} />}
        </View>
    );
};
