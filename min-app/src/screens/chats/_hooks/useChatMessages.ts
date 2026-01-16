// File: src/screens/chats/_hooks/useChatMessages.ts
// Purpose: Fetch and send chat messages

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';

export interface ChatMessage {
    id: string;
    content: string;
    authorId?: string;
    createdAt: Date;
}

interface UseChatMessagesReturn {
    messages: ChatMessage[];
    isLoading: boolean;
    sendMessage: (content: string) => Promise<void>;
}

export const useChatMessages = (chatId: string): UseChatMessagesReturn => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Implement actual Convex query for messages
    const sendMessage = async (content: string) => {
        if (!user?.id || !content.trim()) return;

        setIsLoading(true);
        try {
            // TODO: Implement actual message sending with Convex
            const newMessage: ChatMessage = {
                id: Date.now().toString(),
                content: content.trim(),
                authorId: user.id,
                createdAt: new Date(),
            };
            setMessages(prev => [...prev, newMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        isLoading,
        sendMessage,
    };
};
