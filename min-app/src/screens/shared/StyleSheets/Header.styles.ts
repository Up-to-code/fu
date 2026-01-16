// File: src/screens/shared/StyleSheets/Header.styles.ts
// Purpose: Styles for Header component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => StyleSheet.create({
    header: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getSize(12, 16, 20, 24, 32),
        paddingVertical: getSize(10, 12, 14, 16, 20),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        minWidth: getSize(40, 44, 48, 50, 56),
        height: getSize(40, 44, 48, 44, 52),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: getSize(4, 6, 8, 8, 12),
    },
    backButtonText: {
        fontFamily: 'Cairo_600SemiBold',
        color: COLORS.text,
        textAlign: isRTL ? 'right' : 'left',
        fontSize: getSize(14, 15, 16, 16, 18),
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 16, 18, 18, 20),
        color: '#1e293b',
        flex: 1,
        textAlign: 'center',
    },
});
