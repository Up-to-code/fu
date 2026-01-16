// File: src/screens/shared/StyleSheets/EmptyState.styles.ts
// Purpose: Styles for EmptyState component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: getSize(80, 90, 100, 100, 120),
        paddingHorizontal: getSize(24, 28, 32, 40, 48),
    },
    iconContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: getSize(48, 52, 56, 64, 72),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: getSize(24, 26, 28, 32, 40),
        width: getSize(96, 104, 112, 128, 144),
        height: getSize(96, 104, 112, 128, 144),
    },
    title: {
        color: '#1e293b',
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(18, 19, 20, 24, 28),
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        color: '#64748b',
        textAlign: 'center',
        marginBottom: getSize(32, 34, 36, 40, 48),
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 16, 18),
        lineHeight: getSize(20, 21, 22, 24, 28),
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        paddingHorizontal: getSize(32, 36, 40, 48, 56),
        paddingVertical: getSize(16, 18, 20, 20, 24),
    },
    actionButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
    },
});
