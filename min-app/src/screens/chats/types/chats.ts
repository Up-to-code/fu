// File: src/screens/chats/types/chats.ts
// Purpose: Chats screen component types

export interface Message {
    id: string;
    text: string;
    time: string;
    isMine: boolean;
}
