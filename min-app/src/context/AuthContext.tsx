// File: src/context/AuthContext.tsx
// Purpose: Provide global authentication state (Mock)
// Dependencies: React

import { useRouter } from 'expo-router';
import React, { createContext, ReactNode, useContext } from 'react';
import { authClient } from '../lib/auth-client';

interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isGuest: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, isPending, error } = authClient.useSession();
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
        });

        if (error) {
            throw error;
        }
    };

    const logout = async () => {
        await authClient.signOut();
        router.replace('/auth/login');
    };

    // Calculate derived state
    const user = session?.user ? {
        email: session.user.email,
        name: session.user.name
    } : null;

    const isGuest = !user && !isPending;

    return (
        <AuthContext.Provider value={{ user, isGuest, isLoading: isPending, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
