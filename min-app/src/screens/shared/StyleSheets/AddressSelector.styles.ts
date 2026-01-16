// File: src/screens/shared/StyleSheets/AddressSelector.styles.ts
// Purpose: Styles for shared AddressSelector component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (
    isRTL: boolean,
    getSize: GetSizeFunction,
    fontSize: { xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number },
    iconSize: { sm: number; md: number; lg: number; xl: number }
) => {
    return StyleSheet.create({
        container: {
            width: '100%',
        },
        loadingContainer: {
            padding: getSize(16, 18, 20, 24, 32),
            alignItems: 'center',
        },
        loadingText: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#64748b',
        },
        emptyStateContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: getSize(24, 28, 32, 40, 48),
            paddingHorizontal: getSize(16, 18, 20, 24, 32),
            backgroundColor: '#f8fafc',
            borderRadius: getSize(12, 14, 16, 18, 20),
            marginBottom: getSize(12, 14, 16, 20, 24),
        },
        emptyStateIcon: {
            width: getSize(48, 52, 56, 64, 72),
            height: getSize(48, 52, 56, 64, 72),
            borderRadius: getSize(24, 26, 28, 32, 36),
            backgroundColor: '#e2e8f0',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: getSize(12, 14, 16, 18, 20),
        },
        emptyStateText: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.base,
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: getSize(6, 7, 8, 10, 12),
        },
        emptyStateSubtext: {
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#64748b',
            textAlign: 'center',
        },
        sectionHeader: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: getSize(10, 11, 12, 14, 16),
        },
        sectionTitle: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.sm,
            color: '#1e293b',
            textAlign: isRTL ? 'right' : 'left',
        },
        changeButton: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: 4,
        },
        changeText: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(13, 13.5, 14, 15, 16),
            color: COLORS.primary,
        },
        addressesList: {
            gap: getSize(8, 10, 12, 14, 16),
            marginBottom: getSize(12, 14, 16, 20, 24),
        },
        addressCard: {
            backgroundColor: '#f8fafc',
            borderRadius: getSize(14, 15, 16, 18, 20),
            padding: getSize(14, 15, 16, 20, 24),
        },
        addressCardSelectable: {
            backgroundColor: 'white',
            borderRadius: getSize(12, 14, 16, 18, 20),
            borderWidth: 1,
            borderColor: '#e2e8f0',
            padding: getSize(14, 15, 16, 20, 24),
            marginBottom: getSize(8, 10, 12, 14, 16),
        },
        addressCardSelectableSelected: {
            borderColor: COLORS.primary,
            backgroundColor: `${COLORS.primary}08`,
        },
        addressCardContent: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            gap: 12,
        },
        addressIcon: {
            width: getSize(36, 38, 40, 44, 48),
            height: getSize(36, 38, 40, 44, 48),
            borderRadius: getSize(18, 19, 20, 22, 24),
            backgroundColor: '#f0f9ff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        addressIconSelected: {
            backgroundColor: `${COLORS.primary}15`,
        },
        selectedCheck: {
            marginLeft: isRTL ? 0 : getSize(8, 10, 12, 14, 16),
            marginRight: isRTL ? getSize(8, 10, 12, 14, 16) : 0,
        },
        addressDetails: {
            flex: 1,
        },
        addressNameRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: getSize(6, 7, 8, 10, 12),
            marginBottom: 4,
        },
        addressName: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(14, 15, 16, 18, 20),
            color: '#1e293b',
            textAlign: isRTL ? 'right' : 'left',
        },
        addressNameSelected: {
            color: COLORS.primary,
        },
        addressText: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(13, 13.5, 14, 15, 16),
            color: '#475569',
            textAlign: isRTL ? 'right' : 'left',
            marginTop: 4,
        },
        addressTextSelected: {
            color: COLORS.primary,
        },
        addressCity: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(11, 11.5, 12, 13, 14),
            color: '#64748b',
            textAlign: isRTL ? 'right' : 'left',
            marginTop: 4,
        },
        addressCitySelected: {
            color: '#475569',
        },
        addressDetailsText: {
            fontFamily: 'Cairo_400Regular',
            fontSize: fontSize.xs,
            color: '#94a3b8',
            textAlign: isRTL ? 'right' : 'left',
            marginTop: 4,
        },
        addressDetailsTextSelected: {
            color: '#64748b',
        },
        defaultBadge: {
            backgroundColor: COLORS.primary,
            paddingHorizontal: getSize(6, 7, 8, 10, 12),
            paddingVertical: getSize(2, 2.5, 3, 4, 5),
            borderRadius: getSize(4, 5, 6, 7, 8),
        },
        defaultBadgeText: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.xs,
            color: 'white',
        },
        defaultBadgeSmall: {
            backgroundColor: COLORS.primary,
            paddingHorizontal: getSize(4, 5, 6, 7, 8),
            paddingVertical: getSize(1, 1.5, 2, 2.5, 3),
            borderRadius: getSize(3, 3.5, 4, 4.5, 5),
        },
        defaultBadgeTextSmall: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.xs,
            color: 'white',
        },
        addressMenu: {
            marginTop: getSize(10, 11, 12, 16, 20),
            backgroundColor: 'white',
            borderRadius: getSize(14, 15, 16, 18, 20),
            borderWidth: 1,
            borderColor: '#e2e8f0',
            overflow: 'hidden',
        },
        addressMenuItem: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: 12,
            padding: getSize(14, 15, 16, 20, 24),
        },
        addressMenuItemBorder: {
            borderBottomWidth: 1,
            borderBottomColor: '#f1f5f9',
        },
        addressRadio: {
            width: getSize(18, 19, 20, 22, 24),
            height: getSize(18, 19, 20, 22, 24),
            borderRadius: getSize(9, 9.5, 10, 11, 12),
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        addressRadioSelected: {
            borderColor: COLORS.primary,
            backgroundColor: COLORS.primary,
        },
        addressRadioUnselected: {
            borderColor: '#cbd5e1',
        },
        addressRadioDot: {
            width: getSize(7, 7.5, 8, 9, 10),
            height: getSize(7, 7.5, 8, 9, 10),
            borderRadius: getSize(3.5, 3.75, 4, 4.5, 5),
            backgroundColor: 'white',
        },
        addressMenuItemDetails: {
            flex: 1,
        },
        addressMenuItemNameRow: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: getSize(6, 7, 8, 10, 12),
            marginBottom: 4,
        },
        addressMenuItemName: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(13, 13.5, 14, 15, 16),
            color: '#1e293b',
            textAlign: isRTL ? 'right' : 'left',
        },
        addressMenuItemText: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(11, 11.5, 12, 13, 14),
            color: '#64748b',
            textAlign: isRTL ? 'right' : 'left',
        },
        addressMenuItemCity: {
            fontFamily: 'Cairo_500Medium',
            fontSize: getSize(10, 10.5, 11, 12, 13),
            color: '#94a3b8',
            textAlign: isRTL ? 'right' : 'left',
            marginTop: 2,
        },
        addAddressButton: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: 12,
            padding: getSize(14, 15, 16, 20, 24),
            backgroundColor: '#f8fafc',
        },
        addAddressIcon: {
            width: getSize(18, 19, 20, 22, 24),
            height: getSize(18, 19, 20, 22, 24),
            borderRadius: getSize(9, 9.5, 10, 11, 12),
            backgroundColor: '#f0f9ff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        addAddressText: {
            fontFamily: 'Cairo_700Bold',
            fontSize: getSize(13, 13.5, 14, 15, 16),
            textAlign: isRTL ? 'right' : 'left',
            color: COLORS.primary,
        },
        actionsContainer: {
            gap: getSize(8, 10, 12, 14, 16),
            marginTop: getSize(8, 10, 12, 14, 16),
        },
        toggleButton: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: getSize(6, 7, 8, 10, 12),
            paddingVertical: getSize(8, 9, 10, 12, 14),
        },
        toggleButtonText: {
            fontFamily: 'Cairo_600SemiBold',
            fontSize: fontSize.sm,
            color: COLORS.primary,
        },
        addNewButton: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: getSize(6, 7, 8, 10, 12),
            paddingVertical: getSize(10, 11, 12, 14, 16),
            paddingHorizontal: getSize(12, 14, 16, 18, 20),
            borderRadius: getSize(8, 10, 12, 14, 16),
            borderWidth: 1,
            borderColor: COLORS.primary,
            backgroundColor: `${COLORS.primary}08`,
        },
        addNewButtonText: {
            fontFamily: 'Cairo_700Bold',
            fontSize: fontSize.sm,
            color: COLORS.primary,
        },
        manualInputContainer: {
            marginTop: getSize(12, 14, 16, 18, 20),
        },
        manualInput: {
            backgroundColor: '#f8fafc',
            borderWidth: 1,
            borderColor: '#e2e8f0',
            borderRadius: getSize(6, 7, 8, 10, 12),
            paddingHorizontal: getSize(10, 11, 12, 14, 16),
            paddingVertical: getSize(10, 11, 12, 14, 16),
            fontFamily: 'Cairo_500Medium',
            fontSize: fontSize.sm,
            color: '#1e293b',
            minHeight: getSize(80, 90, 100, 120, 140),
            textAlignVertical: 'top',
        },
    });
};
