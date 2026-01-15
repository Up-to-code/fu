// File: src/screens/search/StyleSheets/SearchResultsScreen.styles.ts
// Purpose: Styles for SearchResultsScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        gap: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    searchContainer: {
        flex: 1,
    },
    filterButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        position: 'relative',
    },
    filterBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    filterBadgeText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 10,
        color: 'white',
    },
    countSortContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    countText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 13,
        color: '#64748b',
        textAlign: 'right',
        marginBottom: 8,
    },
    sortContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 8,
    },
    sortLabel: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 13,
        color: '#1e293b',
    },
    sortChips: {
        gap: 8,
    },
    sortChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    sortChipText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
    },
});
