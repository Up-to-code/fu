// File: src/screens/cart/_hooks/useCart.ts
// Purpose: Cart operations (add, remove, update quantity, calculate totals)

import { useState, useMemo } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    discount?: number;
}

interface UseCartReturn {
    cartItems: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    getItemTotal: (item: CartItem) => number;
    cartTotal: number;
    itemsCount: number;
    isEmpty: boolean;
    clearCart: () => void;
}

export const useCart = (initialItems: CartItem[] = []): UseCartReturn => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

    const addItem = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const getItemTotal = (item: CartItem): number => {
        const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
        return Math.round(price * item.quantity);
    };

    const cartTotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
    }, [cartItems]);

    const itemsCount = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);

    const isEmpty = cartItems.length === 0;

    const clearCart = () => {
        setCartItems([]);
    };

    return {
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        getItemTotal,
        cartTotal,
        itemsCount,
        isEmpty,
        clearCart,
    };
};
