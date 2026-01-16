// File: src/screens/search/StyleSheets/SearchResultsScreen.styles.ts
// Purpose: Styles for SearchResultsScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => {
    return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: getSize(16, 18, 20, 24, 32),
        paddingBottom: getSize(16, 18, 20, 24, 32),
    },
    header: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(10, 11, 12, 16, 20),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        gap: 12,
    },
    backButton: {
        width: getSize(36, 38, 40, 44, 48),
        height: getSize(36, 38, 40, 44, 48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getSize(18, 19, 20, 22, 24),
    },
    searchContainer: {
        flex: 1,
    },
    filterButton: {
        width: getSize(36, 38, 40, 44, 48),
        height: getSize(36, 38, 40, 44, 48),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getSize(18, 19, 20, 22, 24),
        backgroundColor: '#f8fafc',
        position: 'relative',
    },
    filterBadge: {
        position: 'absolute',
        top: getSize(3, 3.5, 4, 5, 6),
        ...(isRTL ? { right: getSize(3, 3.5, 4, 5, 6) } : { left: getSize(3, 3.5, 4, 5, 6) }),
        backgroundColor: COLORS.primary,
        borderRadius: getSize(8, 9, 10, 12, 14),
        minWidth: getSize(16, 17, 18, 20, 22),
        height: getSize(16, 17, 18, 20, 22),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: getSize(3, 3.5, 4, 5, 6),
    },
    filterBadgeText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(9, 9.5, 10, 11, 12),
        color: 'white',
    },
    countSortContainer: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(10, 11, 12, 16, 20),
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    countText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(12, 12.5, 13, 14, 15),
        color: '#64748b',
        textAlign: (isRTL ? 'right' : 'left') as const,
        marginBottom: getSize(6, 7, 8, 10, 12),
    },
    sortContainer: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        gap: 8,
    },
    sortLabel: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: getSize(12, 12.5, 13, 14, 15),
        color: '#1e293b',
    },
    sortChips: {
        gap: 8,
    },
    sortChip: {
        paddingHorizontal: getSize(10, 11, 12, 14, 16),
        paddingVertical: getSize(5, 5.5, 6, 7, 8),
        borderRadius: getSize(14, 15, 16, 18, 20),
    },
    sortChipText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 13, 14),
    },
    });
};
