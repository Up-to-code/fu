// File: src/screens/account/_hooks/useAddresses.ts
// Purpose: Fetches and manages addresses from Convex and SQLite

import { useEffect, useState, useMemo } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useAuth } from '../../../hooks/useAuth';
import { initDB, getAddresses as getAddressesLocal, deleteAddress as deleteAddressLocal } from '../../../lib/database';

export interface Address {
    _id?: string;
    id: string;
    label: string;
    street: string;
    city: string;
    country: string;
    isDefault?: boolean;
    type?: string;
    details?: string;
}

interface UseAddressesReturn {
    addresses: Address[];
    isLoading: boolean;
    deleteAddress: (address: Address) => Promise<void>;
    refresh: () => Promise<void>;
}

export const useAddresses = (): UseAddressesReturn => {
    const { user } = useAuth();
    const deleteAddressMutation = useMutation(api.users.deleteAddress);

    const convexAddresses = useQuery(
        api.users.getAddresses,
        user?.id ? { userId: user.id } : 'skip'
    );

    const [localAddresses, setLocalAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadLocalAddresses = async () => {
        if (!user?.id) {
            setIsLoading(false);
            return;
        }

        try {
            await initDB();
            const addresses = await getAddressesLocal(user.id);
            setLocalAddresses(addresses);
        } catch (error) {
            console.error('Error loading local addresses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadLocalAddresses();
    }, [user?.id]);

    // Merge Convex and local addresses
    const addresses: Address[] = useMemo(() => {
        const merged: Address[] = [];

        // Add Convex addresses
        if (convexAddresses) {
            convexAddresses.forEach((addr: any) => {
                merged.push({
                    _id: addr._id,
                    id: addr._id,
                    label: addr.label,
                    street: addr.street,
                    city: addr.city,
                    country: addr.country,
                    isDefault: addr.isDefault || false,
                });
            });
        }

        // Add local addresses (if not already in Convex)
        localAddresses.forEach((localAddr) => {
            if (!merged.find(a => a.id === localAddr.id)) {
                merged.push(localAddr);
            }
        });

        return merged;
    }, [convexAddresses, localAddresses]);

    const deleteAddress = async (address: Address) => {
        if (!user?.id) return;

        try {
            // Delete from SQLite first
            if (address.id && !address._id) {
                // Local-only address
                await initDB();
                await deleteAddressLocal(user.id, address.id);
            }

            // Delete from Convex if it has _id
            if (address._id) {
                await deleteAddressMutation({ addressId: address._id as any });
            }

            // Update local state
            setLocalAddresses(prev => prev.filter(addr => addr.id !== address.id));
        } catch (error: any) {
            console.error('Error deleting address:', error);
            throw error;
        }
    };

    const refresh = async () => {
        setIsLoading(true);
        await loadLocalAddresses();
    };

    return {
        addresses,
        isLoading,
        deleteAddress,
        refresh,
    };
};
