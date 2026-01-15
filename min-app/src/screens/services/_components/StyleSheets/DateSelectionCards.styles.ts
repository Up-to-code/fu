// File: src/screens/services/_components/StyleSheets/DateSelectionCards.styles.ts
// Purpose: Styles for DateSelectionCards component

import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    scrollView: {
        transform: [{ scaleX: -1 }],
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 12,
        transform: [{ scaleX: -1 }],
    },
    card: {
        width: SCREEN_WIDTH * 0.22,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 12,
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
        fontSize: 12,
        color: '#64748b',
        marginBottom: 4,
    },
    labelSelected: {
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
    },
    date: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: '#1e293b',
        marginBottom: 2,
    },
    dateSelected: {
        color: '#1e293b',
    },
    month: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
    },
    monthSelected: {
        color: '#475569',
    },
});
