// File: src/screens/ai/_components/SavePreferencesView.tsx
// Purpose: Responsive save preferences view component

import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { getAIPreferences, saveAIPreferences } from '../../../utils/storage';
import { SavePreferencesViewProps } from './types/ai';
import { styles } from './StyleSheets/SavePreferencesView.styles';

export const SavePreferencesView: React.FC<SavePreferencesViewProps> = ({
    onSelectPreferences,
    currentRoomType,
    currentRoomStyle,
}) => {
    const [preferences, setPreferences] = useState<{ lastRoomType?: string; lastRoomStyle?: string } | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = () => {
        const saved = getAIPreferences();
        if (saved.lastRoomType || saved.lastRoomStyle) {
            setPreferences(saved);
            setIsExpanded(true);
        }
    };

    const handleSavePreferences = () => {
        if (currentRoomType && currentRoomStyle) {
            saveAIPreferences({
                lastRoomType: currentRoomType,
                lastRoomStyle: currentRoomStyle,
            });
            loadPreferences();
        }
    };

    const handleUsePreferences = () => {
        if (preferences?.lastRoomType && preferences?.lastRoomStyle && onSelectPreferences) {
            onSelectPreferences(preferences.lastRoomType, preferences.lastRoomStyle);
        }
    };

    if (!preferences && !currentRoomType) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={styles.headerButton}
                activeOpacity={0.8}
            >
                <View style={styles.headerLeft}>
                    <Feather name="save" size={20} color={COLORS.primary} />
                    <Text style={styles.headerText}>
                        التفضيلات المحفوظة
                    </Text>
                </View>
                <Feather
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={COLORS.textLight}
                />
            </TouchableOpacity>

            {isExpanded && preferences && (
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        استخدم التفضيلات السابقة
                    </Text>
                    <TouchableOpacity
                        onPress={handleUsePreferences}
                        style={styles.primaryButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>استخدم المحفوظة</Text>
                        <Feather name="check" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            )}

            {isExpanded && currentRoomType && currentRoomStyle && (
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        احفظ التفضيلات الحالية
                    </Text>
                    <TouchableOpacity
                        onPress={handleSavePreferences}
                        style={styles.secondaryButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.secondaryButtonText}>حفظ التفضيلات</Text>
                        <Feather name="save" size={18} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
