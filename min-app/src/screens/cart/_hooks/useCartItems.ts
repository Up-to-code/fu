// File: src/screens/cart/_hooks/useCartItems.ts
// Purpose: Fetch and manage cart items from local storage (AsyncStorage)

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../hooks/useAuth';
import { CartItem } from './useCart';

const CART_STORAGE_KEY = 'fu_app_cart_items';

interface UseCartItemsReturn {
    cartItems: CartItem[];
    isLoading: boolean;
    refresh: () => Promise<void>;
}

export const useCartItems = (): UseCartItemsReturn => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadCartItems = async () => {
        if (!user?.id) {
            setIsLoading(false);
            return;
        }

        try {
            const storageKey = `${CART_STORAGE_KEY}_${user.id}`;
            const stored = await AsyncStorage.getItem(storageKey);
            if (stored) {
                const items: CartItem[] = JSON.parse(stored);
                setCartItems(items);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error loading cart items:', error);
            setCartItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCartItems();
    }, [user?.id]);

    const refresh = async () => {
        setIsLoading(true);
        await loadCartItems();
    };

    return {
        cartItems,
        isLoading,
        refresh,
    };
};
