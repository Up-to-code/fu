// File: src/screens/home/_components/StyleSheets/HomeHeader.styles.ts
// Purpose: Styles for HomeHeader component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => StyleSheet.create({
    container: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingTop: getSize(12, 14, 16, 20, 24),
        paddingBottom: getSize(10, 11, 12, 16, 20),
        backgroundColor: '#FFFFFF',
    },
    searchButton: {
        flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: getSize(10, 11, 12, 14, 16),
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(10, 11, 12, 14, 16),
    },
    searchText: {
        flex: 1,
        textAlign: (isRTL ? 'right' : 'left') as const,
        fontFamily: 'Cairo_500Medium',
        color: '#9CA3AF',
        ...(isRTL ? { marginRight: getSize(10, 11, 12, 14, 16) } : { marginLeft: getSize(10, 11, 12, 14, 16) }),
        fontSize: getSize(13, 13.5, 14, 15, 16),
    },
});
