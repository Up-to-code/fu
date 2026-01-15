// File: src/screens/account/LanguageScreen.tsx
// Purpose: Language selection screen

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { Header, LoadingSpinner } from '../shared';
import { useLanguage } from './_hooks';

const LANGUAGES = [
    { id: 'ar', name: 'العربية', nativeName: 'العربية', flag: '🇸🇦' },
    { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
];

export default function LanguageScreen() {
    const { selectedLanguage, setLanguage, isLoading } = useLanguage();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <Header title="اللغة" showBack />
                    <LoadingSpinner message="جاري التحميل..." />
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Header title="اللغة" showBack />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.section}>
                        <Text style={styles.sectionDescription}>
                            اختر اللغة المفضلة للتطبيق
                        </Text>

                        <View style={styles.languageList}>
                            {LANGUAGES.map((lang) => (
                                <TouchableOpacity
                                    key={lang.id}
                                    style={[
                                        styles.languageItem,
                                        selectedLanguage === lang.id && styles.languageItemSelected
                                    ]}
                                    onPress={() => setLanguage(lang.id)}
                                >
                                    <View style={styles.languageInfo}>
                                        <Text style={styles.languageFlag}>{lang.flag}</Text>
                                        <View>
                                            <Text style={styles.languageName}>{lang.name}</Text>
                                            <Text style={styles.languageNative}>{lang.nativeName}</Text>
                                        </View>
                                    </View>
                                    {selectedLanguage === lang.id && (
                                        <View style={styles.checkmark}>
                                            <Feather name="check" size={16} color="white" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    scrollView: { flex: 1 },
    scrollContent: { padding: 20 },
    section: {
        gap: 16,
    },
    sectionDescription: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'right',
    },
    languageList: {
        gap: 12,
    },
    languageItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    languageItemSelected: {
        borderColor: COLORS.primary,
        backgroundColor: '#f0f9ff',
    },
    languageInfo: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    languageFlag: {
        fontSize: 28,
    },
    languageName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 15,
        color: '#1e293b',
        textAlign: 'right',
    },
    languageNative: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    checkmark: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
