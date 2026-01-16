// File: src/screens/shared/StyleSheets/BottomBar.styles.ts
// Purpose: Styles for BottomBar component

import { StyleSheet } from 'react-native';

type GetSizeFunction = (small: number, medium: number, large: number, tablet: number, desktop: number) => number;

export const getStyles = (maxWidth: number | undefined, width: number, getSize: GetSizeFunction) => {
    const defaultMaxWidth = width >= 768 ? 700 : undefined;
    
    return StyleSheet.create({
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
            paddingHorizontal: getSize(20, 22, 24, 32, 40),
            paddingVertical: getSize(16, 18, 20, 20, 24),
            maxWidth: maxWidth || defaultMaxWidth,
            alignSelf: 'center',
            width: '100%',
        },
        tabsContainer: {
            bottom: 85,
        },
    });
};
