// File: src/screens/ai/_components/SavePreferencesView.tsx
// Purpose: Responsive save preferences view component

import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { getAIPreferences, saveAIPreferences } from '../../../utils/storage';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface SavePreferencesViewProps {
    onSelectPreferences?: (roomType: string, roomStyle: string) => void;
    currentRoomType?: string | null;
    currentRoomStyle?: string | null;
}

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
        <View className="px-5 mb-6">
            <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                className="flex-row-reverse items-center justify-between bg-slate-50 rounded-2xl p-4"
                activeOpacity={0.8}
            >
                <View className="flex-row-reverse items-center gap-3">
                    <Feather name="save" size={20} color={COLORS.primary} />
                    <Text className="text-base font-cairo-bold text-slate-800">
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
                <View className="mt-3 bg-white rounded-2xl p-4">
                    <Text className="text-sm font-cairo-medium text-slate-600 text-right mb-3">
                        استخدم التفضيلات السابقة
                    </Text>
                    <TouchableOpacity
                        onPress={handleUsePreferences}
                        className="bg-primary rounded-2xl py-3 px-4 flex-row-reverse justify-center items-center gap-2"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-cairo-bold text-base">استخدم المحفوظة</Text>
                        <Feather name="check" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            )}

            {isExpanded && currentRoomType && currentRoomStyle && (
                <View className="mt-3 bg-white rounded-2xl p-4">
                    <Text className="text-sm font-cairo-medium text-slate-600 text-right mb-3">
                        احفظ التفضيلات الحالية
                    </Text>
                    <TouchableOpacity
                        onPress={handleSavePreferences}
                        className="bg-slate-100 rounded-2xl py-3 px-4 flex-row-reverse justify-center items-center gap-2"
                        activeOpacity={0.8}
                    >
                        <Text className="text-slate-800 font-cairo-bold text-base">حفظ التفضيلات</Text>
                        <Feather name="save" size={18} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
