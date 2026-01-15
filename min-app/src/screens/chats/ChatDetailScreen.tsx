// File: src/screens/chats/ChatDetailScreen.tsx
// Purpose: Chat conversation with a specific freelancer/provider

import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';
import { Header } from '../shared';
import { useChatMessages } from './_hooks';
import { Message } from './types/chats';

// Mock provider data
const PROVIDERS = {
    '1': {
        id: '1',
        name: 'أحمد المصمم',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        category: 'تصميم داخلي',
        isOnline: true,
    },
    '2': {
        id: '2',
        name: 'سارة للديكور',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        category: 'استشارات ديكور',
        isOnline: false,
    },
    '3': {
        id: '3',
        name: 'شركة التطوير الحديث',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
        category: 'تجديد وتطوير',
        isOnline: true,
    },
};

// Mock messages
const INITIAL_MESSAGES = [
    {
        id: '1',
        text: 'مرحباً، أنا مهتم بخدمات التصميم الداخلي',
        time: '10:30 ص',
        isMine: true,
    },
    {
        id: '2',
        text: 'أهلاً وسهلاً! يسعدني مساعدتك. ما هو نوع المشروع الذي تحتاج إليه؟',
        time: '10:32 ص',
        isMine: false,
    },
    {
        id: '3',
        text: 'أريد تصميم غرفة المعيشة والمطبخ',
        time: '10:35 ص',
        isMine: true,
    },
    {
        id: '4',
        text: 'رائع! هل يمكنك إرسال صور للمساحة الحالية؟',
        time: '10:36 ص',
        isMine: false,
    },
    {
        id: '5',
        text: 'شكراً لك، سأتواصل معك غداً لترتيب الموعد',
        time: '10:45 ص',
        isMine: false,
    },
];

export default function ChatDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const provider = PROVIDERS[id as keyof typeof PROVIDERS];
    const flatListRef = useRef<FlatList>(null);
    const { messages: hookMessages, sendMessage, isLoading } = useChatMessages(id || '');
    
    // Fallback to mock messages if hook returns empty
    const [localMessages, setLocalMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const messages = hookMessages.length > 0 
        ? hookMessages.map(m => ({
            id: m.id,
            text: m.content,
            time: m.createdAt.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
            isMine: m.authorId !== undefined,
        }))
        : localMessages;
    
    const [inputText, setInputText] = useState('');

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const text = inputText.trim();
        setInputText('');

        try {
            await sendMessage(text);
            // Scroll to bottom
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        } catch (error) {
            // Fallback to local state if hook fails
            const newMessage: Message = {
                id: Date.now().toString(),
                text,
                time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
                isMine: true,
            };
            setLocalMessages(prev => [...prev, newMessage]);
        }
    };

    if (!provider) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Cairo_600SemiBold', color: '#64748b' }}>
                            المحادثة غير موجودة
                        </Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.isMine ? styles.myMessageContainer : styles.theirMessageContainer
        ]}>
            <View style={[
                styles.messageBubble,
                item.isMine ? styles.myMessageBubble : styles.theirMessageBubble
            ]}>
                <Text style={[
                    styles.messageText,
                    item.isMine ? styles.myMessageText : styles.theirMessageText
                ]}>
                    {item.text}
                </Text>
            </View>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Header
                    title={provider.name}
                    rightAction={
                        <TouchableOpacity style={styles.headerButton}>
                            <Feather name="more-vertical" size={20} color="#64748b" />
                        </TouchableOpacity>
                    }
                    showBack
                />
                <View style={styles.providerStatusBar}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: provider.avatar }} style={styles.avatar} />
                        {provider.isOnline && <View style={styles.onlineIndicator} />}
                    </View>
                    <Text style={styles.providerStatus}>
                        {provider.isOnline ? 'متصل الآن' : 'غير متصل'}
                    </Text>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={0}
                >
                    {/* Messages */}
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messagesContent}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                    />

                    {/* Input */}
                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.attachButton}>
                            <Feather name="paperclip" size={20} color="#94a3b8" />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.textInput}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="اكتب رسالتك..."
                            placeholderTextColor="#94a3b8"
                            multiline
                            maxLength={500}
                        />

                        <TouchableOpacity
                            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
                            onPress={handleSend}
                            disabled={!inputText.trim()}
                        >
                            <Feather name="send" size={20} color={inputText.trim() ? 'white' : '#94a3b8'} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    providerInfo: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 10,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e2e8f0',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#22c55e',
        borderWidth: 2,
        borderColor: 'white',
    },
    providerName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 15,
        color: '#1e293b',
        textAlign: 'right',
    },
    providerStatusBar: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    providerStatus: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 11,
        color: '#22c55e',
        textAlign: 'right',
    },
    headerButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messagesContent: {
        padding: 16,
        paddingBottom: 8,
    },
    messageContainer: {
        marginBottom: 12,
        maxWidth: '80%',
    },
    myMessageContainer: {
        alignSelf: 'flex-start',
    },
    theirMessageContainer: {
        alignSelf: 'flex-end',
    },
    messageBubble: {
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    myMessageBubble: {
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 4,
    },
    theirMessageBubble: {
        backgroundColor: 'white',
        borderBottomRightRadius: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    messageText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        lineHeight: 22,
    },
    myMessageText: {
        color: 'white',
        textAlign: 'left',
    },
    theirMessageText: {
        color: '#1e293b',
        textAlign: 'right',
    },
    messageTime: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 10,
        color: '#94a3b8',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        padding: 12,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        gap: 8,
    },
    attachButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        backgroundColor: '#f8fafc',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e2e8f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonActive: {
        backgroundColor: COLORS.primary,
    },
});
