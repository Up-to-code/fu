// File: src/screens/shared/StyleSheets/ServiceCard.styles.ts
// Purpose: Styles for ServiceCard component

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { getResponsiveValue, isSmallScreen } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: getResponsiveValue(12, 16),
        padding: getResponsiveValue(isSmallScreen ? 12 : 16, 20),
        marginBottom: getResponsiveValue(12, 16),
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    content: {
        flexDirection: 'row-reverse',
        gap: 12,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: getResponsiveValue(60, 72),
        height: getResponsiveValue(60, 72),
        borderRadius: getResponsiveValue(30, 36),
        backgroundColor: '#f1f5f9',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    info: {
        flex: 1,
    },
    header: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    nameSection: {
        flex: 1,
    },
    name: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getResponsiveValue(isSmallScreen ? 14 : 16, 18),
        color: '#1e293b',
        marginBottom: 4,
    },
    category: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getResponsiveValue(isSmallScreen ? 12 : 13, 15),
        color: '#64748b',
    },
    favoriteButton: {
        padding: getResponsiveValue(4, 6),
    },
    footer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontFamily: 'Cairo_600SemiBold',
        fontSize: getResponsiveValue(isSmallScreen ? 12 : 14, 16),
        color: '#1e293b',
    },
    reviewCount: {
        fontFamily: 'Cairo_500Medium',
        fontSize: getResponsiveValue(isSmallScreen ? 11 : 12, 14),
        color: '#64748b',
    },
    price: {
        fontFamily: 'Cairo_700Bold',
        fontSize: getResponsiveValue(isSmallScreen ? 13 : 14, 16),
        color: COLORS.primary,
    },
});
