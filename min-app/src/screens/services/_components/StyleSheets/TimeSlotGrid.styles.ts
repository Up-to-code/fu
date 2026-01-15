// File: src/screens/services/_components/StyleSheets/TimeSlotGrid.styles.ts
// Purpose: Styles for TimeSlotGrid component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 12,
        paddingHorizontal: 16,
    },
    slot: {
        flex: 1,
        minWidth: '30%',
        maxWidth: '30%',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    slotSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    time: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#64748b',
    },
    timeSelected: {
        fontFamily: 'Cairo_700Bold',
        color: 'white',
    },
});
