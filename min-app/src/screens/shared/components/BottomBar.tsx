// File: src/screens/shared/components/BottomBar.tsx
// Purpose: Bottom action bar with SafeAreaView

import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive } from '../../../hooks/useResponsive';
import { BottomBarProps } from '../types/ui';
import { getStyles } from '../StyleSheets/BottomBar.styles';

const BottomBarComponent: React.FC<BottomBarProps> = ({
    children,
    maxWidth,
    inTabs = false,
}) => {
    const { getSize, width, isTablet } = useResponsive();
    const defaultMaxWidth = isTablet ? 700 : undefined;
    const styles = getStyles(maxWidth || defaultMaxWidth, width, getSize);

    const content = (
        <View style={styles.content}>
            {children}
        </View>
    );

    if (inTabs) {
        // For tab screens - position above tab bar
        return (
            <View style={[styles.container, styles.tabsContainer]}>
                {content}
            </View>
        );
    }

    // For non-tab screens - use SafeAreaView at bottom
    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            {content}
        </SafeAreaView>
    );
};

// Memoize BottomBar to prevent unnecessary re-renders
export const BottomBar = React.memo(BottomBarComponent);

export default BottomBar;
