// File: src/screens/home/_components/StyleSheets/ProductListSection.styles.ts
// Purpose: Styles for ProductListSection component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => StyleSheet.create({
    container: {
        marginBottom: getSize(20, 22, 24, 32, 40),
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        marginBottom: getSize(12, 14, 16, 20, 24),
    },
    title: {
        fontSize: getSize(14, 15, 16, 18, 20),
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
    },
    viewAllButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    viewAllText: {
        fontSize: getSize(13, 13.5, 14, 15, 16),
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
    },
    listContainer: {
        height: getSize(220, 230, 240, 280, 320),
        transform: [{ scaleX: -1 }],
    },
    itemWrapper: {
        marginLeft: getSize(10, 11, 12, 16, 20),
        transform: [{ scaleX: -1 }],
    },
});
