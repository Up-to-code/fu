// File: src/hooks/useRTL.ts
// Purpose: Hook for RTL/LTR direction utilities

import { useMemo } from 'react';
import { useDirection } from '../context/DirectionContext';
import {
  getFlexDirection,
  getTextAlign,
  getPaddingStart,
  getPaddingEnd,
  getMarginStart,
  getMarginEnd,
  getTransform,
  getIconRotation,
  getSwipeMultiplier,
  createDirectionStyle,
} from '../utils/direction';

export const useRTL = () => {
  const { isRTL, direction, userPreference, setDirection, toggleDirection } = useDirection();

  // Memoized direction utilities
  const utils = useMemo(
    () => ({
      // Basic direction info
      isRTL,
      direction,
      userPreference,

      // Style utilities
      flexDirection: getFlexDirection(isRTL),
      textAlign: getTextAlign(isRTL),
      getPaddingStart: (value: number) => getPaddingStart(value, isRTL),
      getPaddingEnd: (value: number) => getPaddingEnd(value, isRTL),
      getMarginStart: (value: number) => getMarginStart(value, isRTL),
      getMarginEnd: (value: number) => getMarginEnd(value, isRTL),
      getTransform: (x: number = 0, y: number = 0) => getTransform(isRTL, x, y),
      iconRotation: getIconRotation(isRTL),
      swipeMultiplier: getSwipeMultiplier(isRTL),
      createDirectionStyle: (baseStyle: any) => createDirectionStyle(isRTL, baseStyle),

      // Actions
      setDirection,
      toggleDirection,
    }),
    [isRTL, direction, userPreference, setDirection, toggleDirection]
  );

  return utils;
};
