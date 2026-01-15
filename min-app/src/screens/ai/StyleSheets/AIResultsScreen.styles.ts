// File: src/screens/ai/StyleSheets/AIResultsScreen.styles.ts
// Purpose: Styles for AIResultsScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    loadingImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    loadingText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Cairo_700Bold',
        textAlign: 'center',
    },
    heroContainer: {
        position: 'relative',
        height: 400,
        backgroundColor: '#f1f5f9',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    pin: {
        position: 'absolute',
    },
    pinButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pinButtonSelected: {
        backgroundColor: COLORS.primary,
    },
    pinButtonUnselected: {
        backgroundColor: 'white',
    },
    pinDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    pinDotSelected: {
        backgroundColor: 'white',
    },
    pinDotUnselected: {
        backgroundColor: COLORS.primary,
    },
    pinTooltip: {
        position: 'absolute',
        top: -64,
        left: '50%',
        marginLeft: -64,
        width: 128,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 12,
    },
    pinTooltipName: {
        fontSize: 12,
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 4,
    },
    pinTooltipPrice: {
        fontSize: 12,
        fontFamily: 'Cairo_700Bold',
        textAlign: 'center',
        color: COLORS.primary,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    topBarContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewModeContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 16,
        padding: 4,
    },
    viewModeButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 12,
    },
    viewModeButtonActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    viewModeButtonSelected: {
        backgroundColor: COLORS.primary,
    },
    viewModeText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Cairo_700Bold',
    },
    contentContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        textAlign: 'right',
        marginBottom: 24,
    },
    itemsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    itemCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 12,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
    },
    itemDetails: {
        flex: 1,
        marginRight: 16,
    },
    itemName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: 8,
    },
    itemPrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 18,
        textAlign: 'right',
    },
    itemDiscount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'right',
        textDecorationLine: 'line-through',
    },
    totalContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    totalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    totalLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#64748b',
    },
    totalValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 20,
        color: COLORS.primary,
    },
    actionsContainer: {
        flexDirection: 'row-reverse',
        gap: 12,
        marginBottom: 24,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    actionButtonPrimary: {
        backgroundColor: COLORS.primary,
    },
    actionButtonSecondary: {
        backgroundColor: '#f1f5f9',
    },
    actionButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 16,
    },
    actionButtonTextPrimary: {
        color: 'white',
    },
    actionButtonTextSecondary: {
        color: '#1e293b',
    },
});
