// File: src/screens/services/_components/StyleSheets/DateSelectionCards.styles.ts
// Purpose: Styles for DateSelectionCards component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction, width: number) => {
    return StyleSheet.create({
        container: {
            marginBottom: getSize(12, 14, 16, 20, 24),
        },
        scrollView: {
            transform: [{ scaleX: -1 }],
        },
        scrollContent: {
            paddingHorizontal: getSize(14, 15, 16, 20, 24),
            gap: 12,
            transform: [{ scaleX: -1 }],
        },
        card: {
            width: width * 0.22,
            backgroundColor: '#f8fafc',
            borderRadius: getSize(10, 11, 12, 14, 16),
            padding: getSize(10, 11, 12, 16, 20),
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e2e8f0',
        },
        cardSelected: {
            backgroundColor: '#e2e8f0',
            borderColor: COLORS.primary,
        },
        label: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(11, 11.5, 12, 13, 14),
            color: '#64748b',
            marginBottom: 4,
        },
        labelSelected: {
            fontFamily: 'Cairo_700Bold',
            color: '#1e293b',
        },
        date: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(18, 19, 20, 22, 24),
            color: '#1e293b',
            marginBottom: 2,
        },
        dateSelected: {
            color: '#1e293b',
        },
        month: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(11, 11.5, 12, 13, 14),
            color: '#64748b',
        },
        monthSelected: {
            color: '#475569',
        },
    });
};
