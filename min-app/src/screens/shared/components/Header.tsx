// File: src/screens/shared/components/Header.tsx
// Purpose: Reusable header component with back button, title, and optional right action

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { useLanguage } from '../../account/_hooks';
import { HeaderProps } from '../types/interfaces';
import { styles } from '../StyleSheets/Header.styles';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const Header: React.FC<HeaderProps> = ({
    title,
    showBack = true,
    rightAction,
    onBack,
    backButtonText,
}) => {
    const router = useRouter();
    const { selectedLanguage } = useLanguage();
    const isRTL = selectedLanguage === 'ar';
    const backIcon = isRTL ? 'arrow-left' : 'arrow-right';

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
                    <Text style={[styles.backButtonText, { fontSize: isTablet ? 16 : 14 }]}>
                        {backText}
                    </Text>
                ) : (
                    <Feather name={backIcon} size={isTablet ? 26 : 24} color={COLORS.text} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.header}>
            {renderBackButton()}
            <Text style={[styles.headerTitle, { fontSize: isTablet ? 18 : 16 }]}>{title}</Text>
            {rightAction || <View style={styles.backButton} />}
        </View>
    );
};
