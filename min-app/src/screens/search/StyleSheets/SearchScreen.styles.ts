// File: src/screens/search/StyleSheets/SearchScreen.styles.ts
// Purpose: Styles for SearchScreen component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => {
    return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    suggestionsContainer: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(6, 7, 8, 10, 12),
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    suggestionItem: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        gap: 12,
        paddingVertical: getSize(10, 11, 12, 14, 16),
    },
    suggestionText: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        color: '#475569',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        textAlign: (isRTL ? 'right' : 'left') as const,
    },
    section: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
    },
    sectionHeader: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: getSize(10, 11, 12, 16, 20),
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        fontSize: getSize(16, 17, 18, 20, 22),
    },
    clearButton: {
        padding: getSize(3, 3.5, 4, 5, 6),
    },
    clearText: {
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        fontSize: getSize(11, 11.5, 12, 13, 14),
    },
    chipsContainer: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        flexWrap: 'wrap',
        gap: 8,
    },
    categoriesContainer: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
    },
    categoriesGrid: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        marginBottom: getSize(10, 11, 12, 16, 20),
        borderRadius: getSize(14, 15, 16, 18, 20),
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: getSize(84, 90, 96, 112, 128),
    },
    categoryOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
        fontSize: getSize(14, 15, 16, 18, 20),
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: getSize(16, 18, 20, 24, 32),
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    searchButton: {
        backgroundColor: '#1E3A5F',
        paddingVertical: getSize(14, 15, 16, 18, 20),
        borderRadius: getSize(14, 15, 16, 18, 20),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    searchButtonText: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
        fontSize: getSize(14, 15, 16, 18, 20),
    },
    });
};
