// File: src/screens/checkout/StyleSheets/CheckoutScreen.styles.ts
// Purpose: Styles for CheckoutScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (isRTL: boolean = true, getSize: GetSizeFunction) => {
    return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: getSize(16, 18, 20, 24, 32),
    },
    section: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(16, 17, 18, 20, 22),
        color: '#1e293b',
        textAlign: (isRTL ? 'right' : 'left'),
        marginBottom: getSize(12, 14, 16, 20, 24),
    },
    sectionHeader: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: getSize(12, 14, 16, 20, 24),
    },
    changeButton: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
        alignItems: 'center',
        gap: 4,
    },
    changeText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: COLORS.primary,
    },
    addressCard: {
        backgroundColor: '#f8fafc',
        borderRadius: getSize(14, 15, 16, 18, 20),
        padding: getSize(14, 15, 16, 20, 24),
    },
    addressCardContent: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
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
    addressDetails: {
        flex: 1,
    },
    addressName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
        color: '#1e293b',
        textAlign: 'right',
    },
    addressText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#475569',
        textAlign: 'right',
        marginTop: 4,
    },
    addressPhone: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 13, 14),
        color: '#64748b',
        textAlign: 'right',
        marginTop: 4,
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
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
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
    addressMenuItemName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#1e293b',
        textAlign: (isRTL ? 'right' : 'left'),
    },
    addressMenuItemText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 13, 14),
        color: '#64748b',
        textAlign: (isRTL ? 'right' : 'left'),
    },
    addAddressButton: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
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
        textAlign: (isRTL ? 'right' : 'left'),
        color: COLORS.primary,
    },
    divider: {
        height: getSize(6, 7, 8, 10, 12),
        backgroundColor: '#f8fafc',
    },
    orderItem: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
        alignItems: 'center',
        marginBottom: getSize(10, 11, 12, 16, 20),
    },
    orderItemImage: {
        width: getSize(52, 54, 56, 64, 72),
        height: getSize(52, 54, 56, 64, 72),
        borderRadius: getSize(10, 11, 12, 14, 16),
        backgroundColor: '#f1f5f9',
    },
    orderItemDetails: {
        flex: 1,
        ...(isRTL ? { marginRight: getSize(10, 11, 12, 16, 20) } : { marginLeft: getSize(10, 11, 12, 16, 20) }),
    },
    orderItemName: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#1e293b',
        textAlign: (isRTL ? 'right' : 'left'),
    },
    orderItemQuantity: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 13, 14),
        color: '#64748b',
        textAlign: (isRTL ? 'right' : 'left'),
    },
    orderItemPrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: COLORS.primary,
    },
    deliveryTimesContainer: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
        flexWrap: 'wrap',
        gap: 12,
    },
    deliveryTimeButton: {
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(10, 11, 12, 14, 16),
        borderRadius: getSize(10, 11, 12, 14, 16),
        borderWidth: 1,
        minWidth: '45%',
    },
    deliveryTimeButtonSelected: {
        borderColor: COLORS.primary,
        backgroundColor: '#f0f9ff',
    },
    deliveryTimeButtonAvailable: {
        borderColor: '#e2e8f0',
        backgroundColor: 'white',
    },
    deliveryTimeButtonUnavailable: {
        borderColor: '#f1f5f9',
        backgroundColor: '#f8fafc',
    },
    deliveryTimeLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        textAlign: (isRTL ? 'right' : 'left'),
    },
    deliveryTimeLabelSelected: {
        color: COLORS.primary,
    },
    deliveryTimeLabelAvailable: {
        color: '#1e293b',
    },
    deliveryTimeLabelUnavailable: {
        color: '#94a3b8',
    },
    deliveryTimeText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 13, 14),
        textAlign: (isRTL ? 'right' : 'left'),
    },
    deliveryTimeTextSelected: {
        color: 'rgba(30, 58, 91, 0.7)',
    },
    deliveryTimeTextAvailable: {
        color: '#64748b',
    },
    deliveryTimeTextUnavailable: {
        color: '#cbd5e1',
    },
    promoContainer: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
        gap: 12,
    },
    promoInput: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderRadius: getSize(10, 11, 12, 14, 16),
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(10, 11, 12, 14, 16),
        fontSize: getSize(14, 15, 16, 18, 20),
        textAlign: (isRTL ? 'right' : 'left'),
        fontFamily: 'Cairo_500Medium',
        color: '#1e293b',
    },
    promoButton: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(10, 11, 12, 14, 16),
        borderRadius: getSize(10, 11, 12, 14, 16),
    },
    promoButtonApplied: {
        backgroundColor: '#22c55e',
    },
    promoButtonActive: {
        backgroundColor: COLORS.primary,
    },
    promoButtonDisabled: {
        backgroundColor: '#e2e8f0',
    },
    promoButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: 'white',
    },
    promoSuccessText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#16a34a',
        textAlign: 'right',
        marginTop: getSize(6, 7, 8, 10, 12),
    },
    notesInput: {
        backgroundColor: '#f8fafc',
        borderRadius: getSize(10, 11, 12, 14, 16),
        paddingHorizontal: getSize(14, 15, 16, 20, 24),
        paddingVertical: getSize(10, 11, 12, 14, 16),
        fontSize: getSize(14, 15, 16, 18, 20),
        textAlign: 'right',
        fontFamily: 'Cairo_500Medium',
        minHeight: getSize(72, 76, 80, 96, 112),
    },
    priceRow: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#475569',
    },
    priceValue: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#1e293b',
    },
    priceDiscountLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#16a34a',
    },
    priceDiscountValue: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#16a34a',
    },
    priceDivider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: getSize(10, 11, 12, 16, 20),
    },
    totalRow: {
        flexDirection: (isRTL ? 'row-reverse' : 'row'),
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
        color: '#1e293b',
    },
    totalValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(18, 19, 20, 22, 24),
        color: COLORS.primary,
    },
    bottomContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    bottomContent: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
    },
    });
};
