// File: src/screens/shared/StyleSheets/EmptyState.styles.ts
// Purpose: Styles for EmptyState component

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { getResponsiveValue, isSmallScreen } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: getResponsiveValue(80, 100),
        paddingHorizontal: getResponsiveValue(isSmallScreen ? 24 : 32, 40),
    },
    iconContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: getResponsiveValue(48, 64),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: getResponsiveValue(24, 32),
        width: getResponsiveValue(96, 128),
        height: getResponsiveValue(96, 128),
    },
    title: {
        color: '#1e293b',
        fontFamily: 'Cairo_700Bold',
        fontSize: getResponsiveValue(isSmallScreen ? 18 : 20, 24),
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        color: '#64748b',
        textAlign: 'center',
        marginBottom: getResponsiveValue(32, 40),
        fontFamily: 'Cairo_500Medium',
        fontSize: getResponsiveValue(isSmallScreen ? 13 : 14, 16),
        lineHeight: getResponsiveValue(20, 24),
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        paddingHorizontal: getResponsiveValue(32, 48),
        paddingVertical: getResponsiveValue(16, 20),
    },
    actionButtonText: {
        color: 'white',
        fontFamily: 'Cairo_700Bold',
        fontSize: getResponsiveValue(isSmallScreen ? 14 : 16, 18),
    },
});
