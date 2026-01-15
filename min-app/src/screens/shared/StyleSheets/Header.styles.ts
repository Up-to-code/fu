// File: src/screens/shared/StyleSheets/Header.styles.ts
// Purpose: Styles for Header component

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallScreen = width < 375;

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: isTablet ? 24 : isSmallScreen ? 12 : 16,
        paddingVertical: isTablet ? 16 : isSmallScreen ? 10 : 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backButton: {
        minWidth: isTablet ? 50 : 40,
        height: isTablet ? 44 : 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: isTablet ? 8 : 4,
    },
    backButtonText: {
        fontFamily: 'Cairo_600SemiBold',
        color: COLORS.text,
        textAlign: 'right',
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
        color: '#1e293b',
        flex: 1,
        textAlign: 'center',
    },
});
