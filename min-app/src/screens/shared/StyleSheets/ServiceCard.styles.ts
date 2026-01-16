// File: src/screens/shared/StyleSheets/ServiceCard.styles.ts
// Purpose: Styles for ServiceCard component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: getSize(12, 14, 16, 16, 20),
        padding: getSize(12, 14, 16, 20, 24),
        marginBottom: getSize(12, 14, 16, 16, 20),
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    content: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        gap: 12,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: getSize(60, 64, 68, 72, 80),
        height: getSize(60, 64, 68, 72, 80),
        borderRadius: getSize(30, 32, 34, 36, 40),
        backgroundColor: '#f1f5f9',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    info: {
        flex: 1,
    },
    header: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    nameSection: {
        flex: 1,
    },
    name: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
        color: '#1e293b',
        marginBottom: 4,
    },
    category: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(12, 12.5, 13, 15, 17),
        color: '#64748b',
    },
    favoriteButton: {
        padding: getSize(4, 5, 6, 6, 8),
    },
    footer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: getSize(12, 13, 14, 16, 18),
        color: '#1e293b',
    },
    reviewCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 14, 16),
        color: '#64748b',
    },
    price: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(13, 13.5, 14, 16, 18),
        color: COLORS.primary,
    },
});
