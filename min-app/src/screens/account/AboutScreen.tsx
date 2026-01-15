// File: src/screens/account/AboutScreen.tsx
// Purpose: About the app screen

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { Header } from '../shared';

export default function AboutScreen() {
    const handleOpenLink = async (url: string) => {
        try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
            } else {
                Alert.alert('تنبيه', 'لا يمكن فتح هذا الرابط على هذا الجهاز');
            }
        } catch (error) {
            Alert.alert('خطأ', 'تعذر فتح الرابط');
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Header title="عن التطبيق" showBack />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* App Info */}
                    <View style={styles.appInfo}>
                        <View style={styles.appIcon}>
                            <Feather name="home" size={40} color={COLORS.primary} />
                        </View>
                        <Text style={styles.appName}>منصة الأثاث</Text>
                        <Text style={styles.appVersion}>الإصدار 1.0.0</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.description}>
                            منصة متكاملة للأثاث والديكور المنزلي. نوفر لك أفضل المنتجات وخدمات التصميم الداخلي من أفضل المتاجر ومقدمي الخدمات في المملكة العربية السعودية.
                        </Text>
                    </View>

                    {/* Links */}
                    <View style={styles.section}>
                        <View style={styles.linksCard}>
                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={() => handleOpenLink('https://example.com/terms')}
                            >
                                <Feather name="chevron-left" size={20} color="#94a3b8" />
                                <View style={styles.linkContent}>
                                    <Text style={styles.linkText}>الشروط والأحكام</Text>
                                </View>
                                <Feather name="file-text" size={20} color="#64748b" />
                            </TouchableOpacity>

                            <View style={styles.divider} />

                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={() => handleOpenLink('https://example.com/privacy')}
                            >
                                <Feather name="chevron-left" size={20} color="#94a3b8" />
                                <View style={styles.linkContent}>
                                    <Text style={styles.linkText}>سياسة الخصوصية</Text>
                                </View>
                                <Feather name="shield" size={20} color="#64748b" />
                            </TouchableOpacity>

                            <View style={styles.divider} />

                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={() => handleOpenLink('https://example.com')}
                            >
                                <Feather name="chevron-left" size={20} color="#94a3b8" />
                                <View style={styles.linkContent}>
                                    <Text style={styles.linkText}>زيارة الموقع</Text>
                                </View>
                                <Feather name="globe" size={20} color="#64748b" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Copyright */}
                    <Text style={styles.copyright}>
                        © 2024 منصة الأثاث. جميع الحقوق محفوظة.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    scrollView: { flex: 1 },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    appInfo: {
        alignItems: 'center',
        marginBottom: 24,
    },
    appIcon: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    appName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 22,
        color: '#1e293b',
        marginBottom: 4,
    },
    appVersion: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
    },
    section: {
        width: '100%',
        marginBottom: 24,
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
    },
    linksCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    linkItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: 16,
    },
    linkContent: {
        flex: 1,
        marginRight: 12,
    },
    linkText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginHorizontal: 16,
    },
    copyright: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'center',
        marginTop: 20,
    },
});
