// File: src/screens/services/_components/StyleSheets/CommunicationMethodSelector.styles.ts
// Purpose: Styles for CommunicationMethodSelector component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    buttons: {
        flexDirection: 'row-reverse',
        gap: 12,
        paddingHorizontal: 16,
    },
    button: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    buttonSelected: {
        borderColor: COLORS.primary,
        backgroundColor: '#f8fafc',
    },
    label: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
    },
    labelSelected: {
        fontFamily: 'Cairo_700Bold',
        color: COLORS.primary,
    },
});
