// File: src/screens/shared/types/interfaces.ts
// Purpose: Interface definitions for shared components

export interface HeaderProps {
    title: string;
    showBack?: boolean;
    rightAction?: React.ReactNode;
    onBack?: () => void;
    backButtonText?: string;
}
