// File: src/hooks/useAuth.ts
// Purpose: Authentication hook wrapping context + local UI state handling
// Dependencies: React, AuthContext

import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const { user, isGuest, login, register, logout, isLoading } = useAuthContext();

    return {
        user,
        isGuest,
        isLoading,
        login,
        register,
        logout
    };
};
