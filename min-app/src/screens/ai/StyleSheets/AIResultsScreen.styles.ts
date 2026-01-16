// File: src/screens/ai/StyleSheets/AIResultsScreen.styles.ts
// Purpose: Styles for AIResultsScreen component

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (getSize: GetSizeFunction) => StyleSheet.create({
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
        fontSize: getSize(26, 28, 30, 34, 38),
        fontFamily: 'Cairo_700Bold',
        textAlign: 'center',
    },
    heroContainer: {
        position: 'relative',
        height: getSize(350, 375, 400, 450, 500),
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
        width: getSize(28, 30, 32, 36, 40),
        height: getSize(28, 30, 32, 36, 40),
        borderRadius: getSize(14, 15, 16, 18, 20),
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
        width: getSize(10, 11, 12, 14, 16),
        height: getSize(10, 11, 12, 14, 16),
        borderRadius: getSize(5, 5.5, 6, 7, 8),
    },
    pinDotSelected: {
        backgroundColor: 'white',
    },
    pinDotUnselected: {
        backgroundColor: COLORS.primary,
    },
    pinTooltip: {
        position: 'absolute',
        top: getSize(-56, -60, -64, -72, -80),
        left: '50%',
        marginLeft: getSize(-56, -60, -64, -72, -80),
        width: getSize(112, 120, 128, 144, 160),
        backgroundColor: 'white',
        borderRadius: getSize(14, 15, 16, 18, 20),
        padding: getSize(10, 11, 12, 14, 16),
    },
    pinTooltipName: {
        fontSize: getSize(11, 11.5, 12, 13, 14),
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 4,
    },
    pinTooltipPrice: {
        fontSize: getSize(11, 11.5, 12, 13, 14),
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
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(12, 14, 16, 20, 24),
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarButton: {
        width: getSize(44, 46, 48, 52, 56),
        height: getSize(44, 46, 48, 52, 56),
        borderRadius: getSize(22, 23, 24, 26, 28),
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewModeContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: getSize(14, 15, 16, 18, 20),
        padding: getSize(3, 3.5, 4, 5, 6),
    },
    viewModeButton: {
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingVertical: getSize(6, 7, 8, 10, 12),
        borderRadius: getSize(10, 11, 12, 14, 16),
    },
    viewModeButtonActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    viewModeButtonSelected: {
        backgroundColor: COLORS.primary,
    },
    viewModeText: {
        color: 'white',
        fontSize: getSize(12, 13, 14, 15, 16),
        fontFamily: 'Cairo_700Bold',
    },
    contentContainer: {
        backgroundColor: 'white',
        paddingHorizontal: getSize(16, 18, 20, 24, 32),
        paddingTop: getSize(20, 22, 24, 32, 40),
    },
    title: {
        fontSize: getSize(20, 22, 24, 28, 32),
        fontFamily: 'Cairo_700Bold',
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: getSize(10, 11, 12, 16, 20),
    },
    description: {
        fontSize: getSize(13, 14, 15, 17, 19),
        fontFamily: 'Cairo_500Medium',
        color: '#64748b',
        textAlign: 'right',
        marginBottom: getSize(24, 28, 32, 40, 48),
        lineHeight: getSize(20, 21, 22, 26, 30),
    },
    itemsContainer: {
        gap: getSize(10, 11, 12, 16, 20),
        marginBottom: getSize(20, 22, 24, 32, 40),
    },
    itemCard: {
        backgroundColor: '#f8fafc',
        borderRadius: getSize(18, 19, 20, 24, 28),
        padding: getSize(16, 18, 20, 24, 32),
        borderWidth: 1,
        borderColor: '#e2e8f0',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: getSize(12, 14, 16, 20, 24),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: getSize(88, 94, 100, 112, 128),
        height: getSize(88, 94, 100, 112, 128),
        borderRadius: getSize(14, 15, 16, 18, 20),
        backgroundColor: '#f1f5f9',
    },
    itemDetails: {
        flex: 1,
        marginRight: getSize(12, 14, 16, 20, 24),
    },
    itemName: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
        color: '#1e293b',
        textAlign: 'right',
        marginBottom: getSize(6, 7, 8, 10, 12),
    },
    itemPrice: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(16, 17, 18, 20, 22),
        textAlign: 'right',
    },
    itemDiscount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(11, 11.5, 12, 13, 14),
        color: '#94a3b8',
        textAlign: 'right',
        textDecorationLine: 'line-through',
    },
    totalContainer: {
        backgroundColor: '#f0f9ff',
        borderRadius: getSize(18, 19, 20, 24, 28),
        padding: getSize(20, 22, 24, 32, 40),
        marginBottom: getSize(24, 28, 32, 40, 48),
        borderWidth: 2,
        borderColor: COLORS.primary + '20',
    },
    totalRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: getSize(6, 7, 8, 10, 12),
    },
    totalLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getSize(13, 13.5, 14, 15, 16),
        color: '#64748b',
    },
    totalValue: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(18, 19, 20, 22, 24),
        color: COLORS.primary,
    },
    actionsContainer: {
        flexDirection: 'row-reverse',
        gap: getSize(12, 14, 16, 20, 24),
        marginBottom: getSize(24, 28, 32, 40, 48),
    },
    actionButton: {
        flex: 1,
        paddingVertical: getSize(16, 17, 18, 20, 24),
        borderRadius: getSize(18, 19, 20, 24, 28),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    actionButtonPrimary: {
        backgroundColor: COLORS.primary,
    },
    actionButtonSecondary: {
        backgroundColor: '#f1f5f9',
    },
    actionButtonText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getSize(14, 15, 16, 18, 20),
    },
    actionButtonTextPrimary: {
        color: 'white',
    },
    actionButtonTextSecondary: {
        color: '#1e293b',
    },
});
