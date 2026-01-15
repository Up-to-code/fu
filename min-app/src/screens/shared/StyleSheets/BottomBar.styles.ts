// File: src/screens/shared/StyleSheets/BottomBar.styles.ts
// Purpose: Styles for BottomBar component

import { Dimensions, StyleSheet } from 'react-native';
import { getResponsiveValue } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const getStyles = (maxWidth?: number) => StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: getResponsiveValue(20, 32),
        paddingVertical: getResponsiveValue(16, 20),
        maxWidth: maxWidth || (isTablet ? 700 : undefined),
        alignSelf: 'center',
        width: '100%',
    },
    tabsContainer: {
        bottom: 85,
    },
});
