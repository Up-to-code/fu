// File: src/screens/shared/StyleSheets/FloatingHeader.styles.ts
// Purpose: Styles for FloatingHeader component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (transparent: boolean, isRTL: boolean = true, getSize: GetSizeFunction) => {
    const buttonSize = getSize(40, 44, 48, 48, 52);
    const iconSize = getSize(20, 22, 24, 24, 26);
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
            flexDirection: (isRTL ? 'row-reverse' : 'row') as const,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: getSize(16, 20, 24, 32, 40),
            paddingVertical: getSize(8, 10, 12, 16, 20),
        },
        button: {
            borderRadius: getSize(20, 22, 24, 24, 28),
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
