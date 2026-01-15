// File: src/screens/shared/StyleSheets/TypeSelector.styles.ts
// Purpose: Styles for TypeSelector component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    typesList: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
    },
    typeItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    typeItemSelected: {
        borderColor: COLORS.primary,
        backgroundColor: '#f0f9ff',
    },
    typeLabel: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 12,
        color: '#64748b',
    },
    typeLabelSelected: {
        color: COLORS.primary,
    },
});
