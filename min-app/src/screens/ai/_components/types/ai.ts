// File: src/screens/ai/_components/types/ai.ts
// Purpose: AI screen component types

export interface SavePreferencesViewProps {
    onSelectPreferences?: (roomType: string, roomStyle: string) => void;
    currentRoomType?: string | null;
    currentRoomStyle?: string | null;
}
