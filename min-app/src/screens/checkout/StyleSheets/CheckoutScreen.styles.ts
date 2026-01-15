// File: src/screens/checkout/StyleSheets/CheckoutScreen.styles.ts
// Purpose: Styles for CheckoutScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    sectionTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    changeButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    changeText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: COLORS.primary,
    },
    addressCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 16,
    },
    addressCardContent: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        gap: 12,
    },
    addressIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressDetails: {
        flex: 1,
    },
    addressName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
    },
    addressText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#475569',
        textAlign: 'right',
        marginTop: 4,
    },
    addressPhone: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
        marginTop: 4,
    },
    addressMenu: {
        marginTop: 12,
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    addressMenuItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
        padding: 16,
    },
    addressMenuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    addressRadio: {
        width: 20,
        height: 20,
        borderRadius: 10,
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
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    addressMenuItemDetails: {
        flex: 1,
    },
    addressMenuItemName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
    },
    addressMenuItemText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    addAddressButton: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: '#f8fafc',
    },
    addAddressIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addAddressText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        textAlign: 'right',
        color: COLORS.primary,
    },
    divider: {
        height: 8,
        backgroundColor: '#f8fafc',
    },
    orderItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderItemImage: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
    },
    orderItemDetails: {
        flex: 1,
        marginRight: 12,
    },
    orderItemName: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
        textAlign: 'right',
    },
    orderItemQuantity: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#64748b',
        textAlign: 'right',
    },
    orderItemPrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 14,
        color: COLORS.primary,
    },
    deliveryTimesContainer: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        gap: 12,
    },
    deliveryTimeButton: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
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
        fontSize: 14,
        textAlign: 'right',
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
        fontSize: 12,
        textAlign: 'right',
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
        flexDirection: 'row-reverse',
        gap: 12,
    },
    promoInput: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        textAlign: 'right',
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#1e293b',
    },
    promoButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
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
        fontSize: 14,
        color: 'white',
    },
    promoSuccessText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#16a34a',
        textAlign: 'right',
        marginTop: 8,
    },
    notesInput: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        textAlign: 'right',
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        minHeight: 80,
    },
    priceRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#475569',
    },
    priceValue: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#1e293b',
    },
    priceDiscountLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#16a34a',
    },
    priceDiscountValue: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#16a34a',
    },
    priceDivider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
    },
    totalValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: COLORS.primary,
    },
    bottomContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    bottomContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
});
