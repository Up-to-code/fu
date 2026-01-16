// File: src/hooks/useAccountStats.ts
// Purpose: Custom hook to fetch account statistics (counts) from Convex

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useAccountStats = (userId: string | null | undefined) => {
    const ordersCount = useQuery(
        api.users.getOrdersCount,
        userId ? { userId } : 'skip'
    );
    
    const bookingsCount = useQuery(
        api.users.getBookingsCount,
        userId ? { userId } : 'skip'
    );
    
    const addressesCount = useQuery(
        api.users.getAddressesCount,
        userId ? { userId } : 'skip'
    );
    
    const favoritesCount = useQuery(
        api.users.getFavoritesCount,
        userId ? { userId } : 'skip'
    );
    
    const messagesCount = useQuery(
        api.users.getMessagesCount,
        userId ? { userId } : 'skip'
    );

    return {
        ordersCount,
        bookingsCount,
        addressesCount,
        favoritesCount,
        messagesCount,
        isLoading: ordersCount === undefined || 
                   bookingsCount === undefined || 
                   addressesCount === undefined || 
                   favoritesCount === undefined ||
                   messagesCount === undefined,
    };
};
