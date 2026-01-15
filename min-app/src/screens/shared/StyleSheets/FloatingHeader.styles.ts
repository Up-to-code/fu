// File: src/screens/shared/StyleSheets/FloatingHeader.styles.ts
// Purpose: Styles for FloatingHeader component

import { Dimensions, StyleSheet } from 'react-native';
import { getResponsiveValue } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const getStyles = (transparent: boolean) => {
    const buttonSize = getResponsiveValue(40, 48);
    const iconSize = getResponsiveValue(20, 24);
    const bgColor = transparent ? 'rgba(255,255,255,0.9)' : 'white';

    return StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
        },
        content: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: getResponsiveValue(16, 32),
            paddingVertical: getResponsiveValue(8, 16),
        },
        button: {
            borderRadius: getResponsiveValue(20, 24),
            alignItems: 'center',
            justifyContent: 'center',
            width: buttonSize,
            height: buttonSize,
            backgroundColor: bgColor,
        },
        spacer: {
            width: buttonSize,
        },
        buttonSize,
        iconSize,
    });
};
