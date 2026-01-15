// File: src/screens/chats/ChatsScreen.tsx
// Purpose: List of chat conversations with freelancers/providers

import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { EmptyState } from '../../components/shared';
import { Header, LoadingSpinner } from '../shared';
import { useChats } from './_hooks';

// Mock conversations
const CONVERSATIONS = [
    {
        id: '1',
        provider: {
            id: 'p1',
            name: 'أحمد المصمم',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
            category: 'تصميم داخلي',
            isOnline: true,
        },
        lastMessage: {
            text: 'شكراً لك، سأتواصل معك غداً لترتيب الموعد',
            time: 'منذ 5 دقائق',
            isRead: false,
            isMine: false,
        },
        unreadCount: 2,
    },
    {
        id: '2',
        provider: {
            id: 'p2',
            name: 'سارة للديكور',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
            category: 'استشارات ديكور',
            isOnline: false,
        },
        lastMessage: {
            text: 'تم إرسال التصميم المبدئي',
            time: 'منذ ساعة',
            isRead: true,
            isMine: true,
        },
        unreadCount: 0,
    },
    {
        id: '3',
        provider: {
            id: 'p3',
            name: 'شركة التطوير الحديث',
            avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
            category: 'تجديد وتطوير',
            isOnline: true,
        },
        lastMessage: {
            text: 'هل يناسبك يوم السبت للمعاينة؟',
            time: 'أمس',
            isRead: true,
            isMine: false,
        },
        unreadCount: 0,
    },
];

export default function ChatsScreen() {
    const router = useRouter();
    const { chats, isLoading } = useChats();
    // Fallback to mock data if hook returns empty
    const displayChats = chats.length > 0 ? chats : CONVERSATIONS.map(c => ({
        id: c.id,
        participantName: c.provider.name,
        participantAvatar: c.provider.avatar,
        lastMessage: c.lastMessage.text,
        lastMessageTime: new Date(),
        unreadCount: c.unreadCount,
    }));

    const handleChatPress = (conversationId: string) => {
        router.push(`/chats/${conversationId}` as any);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Header
                    title="المحادثات"
                    rightAction={
                        <View style={styles.headerBadge}>
                            <Text style={styles.headerBadgeText}>{displayChats.length}</Text>
                        </View>
                    }
                    showBack
                />

                {isLoading ? (
                    <LoadingSpinner message="جاري التحميل..." />
                ) : displayChats.length > 0 ? (
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {displayChats.map((chat) => {
                            const conversation = CONVERSATIONS.find(c => c.id === chat.id);
                            return (
                                <TouchableOpacity
                                    key={chat.id}
                                    style={styles.conversationCard}
                                    onPress={() => handleChatPress(chat.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.avatarContainer}>
                                        <Image
                                            source={{ uri: chat.participantAvatar || conversation?.provider.avatar }}
                                            style={styles.avatar}
                                        />
                                        {conversation?.provider.isOnline && (
                                            <View style={styles.onlineIndicator} />
                                        )}
                                    </View>
                                    <View style={styles.conversationContent}>
                                        <View style={styles.conversationHeader}>
                                            <Text style={styles.providerName} numberOfLines={1}>
                                                {chat.participantName}
                                            </Text>
                                            <Text style={styles.messageTime}>
                                                {conversation?.lastMessage.time || 'الآن'}
                                            </Text>
                                        </View>
                                        <View style={styles.messageRow}>
                                            <Text
                                                style={[
                                                    styles.lastMessage,
                                                    (chat.unreadCount || 0) > 0 && styles.unreadMessage
                                                ]}
                                                numberOfLines={1}
                                            >
                                                {conversation?.lastMessage.isMine && 'أنت: '}
                                                {chat.lastMessage || conversation?.lastMessage.text}
                                            </Text>
                                            {(chat.unreadCount || 0) > 0 && (
                                                <View style={styles.unreadBadge}>
                                                    <Text style={styles.unreadBadgeText}>
                                                        {chat.unreadCount}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                ) : (
                    <EmptyState
                        icon="message-circle"
                        title="لا توجد محادثات"
                        description="ابدأ محادثة مع مقدمي الخدمات للتواصل معهم"
                        actionLabel="تصفح الخدمات"
                        onAction={() => router.push('/services' as any)}
                    />
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    headerBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    headerBadgeText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 12,
        color: '#64748b',
    },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16 },
    conversationCard: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#e2e8f0',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#22c55e',
        borderWidth: 2,
        borderColor: 'white',
    },
    conversationContent: {
        flex: 1,
        marginRight: 12,
    },
    conversationHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 15,
        color: '#1e293b',
        flex: 1,
        textAlign: 'right',
    },
    messageTime: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 11,
        color: '#94a3b8',
        marginRight: 8,
    },
    messageRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lastMessage: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
        flex: 1,
        textAlign: 'right',
    },
    unreadMessage: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
    },
    unreadBadge: {
        backgroundColor: COLORS.primary,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    unreadBadgeText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 11,
        color: 'white',
    },
});
