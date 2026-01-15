import { authClient } from "../lib/auth-client";

export const useAuth = () => {
    const { data: session, isPending } = authClient.useSession();

    const login = async (email: string, password: string) => {
        const { error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        const { error } = await authClient.signUp.email({
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
    };

    const user = session?.user ? {
        email: session.user.email,
        name: session.user.name,
        id: session.user.id,
        image: session.user.image,
    } : null;

    // Is guest if no user and not loading
    const isGuest = !user && !isPending;

    return {
        user,
        isGuest,
        isLoading: isPending,
        login,
        register,
        logout
    };
};
