// File: src/screens/account/HelpScreen.tsx
// Purpose: Help and Support screen

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { Header } from '../shared';

const HELP_ITEMS = [
    { id: 'faq', icon: 'help-circle', label: 'الأسئلة الشائعة', type: 'navigate' },
    { id: 'chat', icon: 'message-circle', label: 'الدردشة مع الدعم', type: 'action' },
    { id: 'call', icon: 'phone', label: 'اتصل بنا', phone: '+966920000000', type: 'phone' },
    { id: 'email', icon: 'mail', label: 'راسلنا', email: 'support@example.com', type: 'email' },
];

export default function HelpScreen() {
    const router = useRouter();

    const handleItemPress = async (item: typeof HELP_ITEMS[0]) => {
        try {
            switch (item.type) {
                case 'phone':
                    const canCall = await Linking.canOpenURL(`tel:${item.phone}`);
                    if (canCall) {
                        await Linking.openURL(`tel:${item.phone}`);
                    } else {
                        Alert.alert('غير متاح', 'لا يمكن إجراء مكالمات من هذا الجهاز');
                    }
                    break;
                case 'email':
                    const canEmail = await Linking.canOpenURL(`mailto:${item.email}`);
                    if (canEmail) {
                        await Linking.openURL(`mailto:${item.email}`);
                    } else {
                        Alert.alert('البريد الإلكتروني', item.email || 'support@example.com');
                    }
                    break;
                case 'action':
                    Alert.alert('الدعم', 'سيتم فتح نافذة الدردشة قريباً');
                    break;
                default:
                    Alert.alert('قريباً', 'هذه الميزة قيد التطوير');
            }
        } catch (error) {
            Alert.alert('خطأ', 'تعذر فتح الرابط');
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Header title="المساعدة والدعم" showBack />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Help Options */}
                    <View style={styles.section}>
                        <Text style={styles.sectionDescription}>
                            كيف يمكننا مساعدتك؟
                        </Text>

                        <View style={styles.helpList}>
                            {HELP_ITEMS.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <TouchableOpacity
                                        style={styles.helpItem}
                                        onPress={() => handleItemPress(item)}
                                    >
                                        <Feather name="chevron-left" size={20} color="#94a3b8" />
                                        <View style={styles.helpItemContent}>
                                            <Text style={styles.helpItemLabel}>{item.label}</Text>
                                        </View>
                                        <View style={styles.helpItemIcon}>
                                            <Feather name={item.icon as any} size={20} color={COLORS.primary} />
                                        </View>
                                    </TouchableOpacity>
                                    {index < HELP_ITEMS.length - 1 && <View style={styles.divider} />}
                                </React.Fragment>
                            ))}
                        </View>
                    </View>

                    {/* Contact Info */}
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactTitle}>ساعات العمل</Text>
                        <Text style={styles.contactText}>الأحد - الخميس: 9 صباحاً - 6 مساءً</Text>
                        <Text style={styles.contactText}>الجمعة والسبت: مغلق</Text>
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
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
    },
    helpList: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    helpItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: 16,
    },
    helpItemIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpItemContent: {
        flex: 1,
        marginRight: 12,
    },
    helpItemLabel: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 15,
        color: '#1e293b',
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginHorizontal: 16,
    },
    contactInfo: {
        marginTop: 24,
        padding: 16,
        backgroundColor: '#f0f9ff',
        borderRadius: 12,
        alignItems: 'center',
    },
    contactTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 8,
    },
    contactText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
        textAlign: 'center',
    },
});
