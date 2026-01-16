// File: src/components/global/AnimatedDirectionView.tsx
// Purpose: Animated wrapper component for direction changes

import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useRTL } from '../../hooks/useRTL';

interface AnimatedDirectionViewProps extends ViewProps {
  children: React.ReactNode;
  animationDuration?: number;
  useSpring?: boolean;
}

export const AnimatedDirectionView: React.FC<AnimatedDirectionViewProps> = ({
  children,
  style,
  animationDuration = 300,
  useSpring = false,
  ...props
}) => {
  const { isRTL } = useRTL();
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Fade out slightly, then fade back in when direction changes
    opacity.value = 0.7;
    scale.value = 0.98;

    const animation = useSpring
      ? withSpring(1, {
          damping: 15,
          stiffness: 150,
        })
      : withTiming(1, {
          duration: animationDuration,
          easing: Easing.out(Easing.ease),
        });

    opacity.value = animation;
    scale.value = animation;
  }, [isRTL, animationDuration, useSpring]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]} {...props}>
      {children}
    </Animated.View>
  );
};
