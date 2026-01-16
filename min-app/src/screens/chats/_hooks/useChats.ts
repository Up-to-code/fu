// File: src/screens/chats/_hooks/useChats.ts
// Purpose: Fetch chat conversations

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';

export interface Chat {
    id: string;
    participantName: string;
    participantAvatar?: string;
    lastMessage?: string;
    lastMessageTime?: Date;
    unreadCount?: number;
}

interface UseChatsReturn {
    chats: Chat[];
    isLoading: boolean;
}

export const useChats = (): UseChatsReturn => {
    const { user } = useAuth();
    
    // TODO: Implement actual Convex query for chats
    // For now, return empty array
    const chats: Chat[] = [];
    const isLoading = false;

    return {
        chats,
        isLoading,
    };
};
