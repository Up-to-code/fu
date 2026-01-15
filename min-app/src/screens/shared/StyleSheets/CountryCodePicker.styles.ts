// File: src/screens/shared/StyleSheets/CountryCodePicker.styles.ts
// Purpose: Styles for CountryCodePicker component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    pickerButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
        minWidth: 80,
    },
    flag: {
        fontSize: 20,
    },
    code: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 14,
        color: COLORS.text,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: COLORS.text,
    },
    closeButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countryItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        gap: 12,
    },
    countryItemSelected: {
        backgroundColor: '#f0f9ff',
    },
    countryFlag: {
        fontSize: 24,
    },
    countryName: {
        flex: 1,
        fontFamily: 'Cairo_600SemiBold',
        fontSize: 15,
        color: COLORS.text,
        textAlign: 'right',
    },
    countryDialCode: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.textLight,
    },
});
