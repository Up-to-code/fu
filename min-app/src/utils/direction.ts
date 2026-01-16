// File: src/utils/direction.ts
// Purpose: Direction-aware utility functions for RTL/LTR support

import { TextStyle, ViewStyle } from 'react-native';

export type Direction = 'ltr' | 'rtl';

/**
 * Get flex direction based on RTL/LTR
 */
export const getFlexDirection = (isRTL: boolean): 'row' | 'row-reverse' => {
  return isRTL ? 'row-reverse' : 'row';
};

/**
 * Get text alignment based on RTL/LTR
 */
export const getTextAlign = (isRTL: boolean): 'left' | 'right' => {
  return isRTL ? 'right' : 'left';
};

/**
 * Get start padding/margin (left in LTR, right in RTL)
 */
export const getPaddingStart = (value: number, isRTL: boolean): { paddingLeft?: number; paddingRight?: number } => {
  return isRTL ? { paddingRight: value } : { paddingLeft: value };
};

/**
 * Get end padding/margin (right in LTR, left in RTL)
 */
export const getPaddingEnd = (value: number, isRTL: boolean): { paddingLeft?: number; paddingRight?: number } => {
  return isRTL ? { paddingLeft: value } : { paddingRight: value };
};

/**
 * Get start margin (left in LTR, right in RTL)
 */
export const getMarginStart = (value: number, isRTL: boolean): { marginLeft?: number; marginRight?: number } => {
  return isRTL ? { marginRight: value } : { marginLeft: value };
};

/**
 * Get end margin (right in LTR, left in RTL)
 */
export const getMarginEnd = (value: number, isRTL: boolean): { marginLeft?: number; marginRight?: number } => {
  return isRTL ? { marginLeft: value } : { marginRight: value };
};

/**
 * Get transform values for animations based on direction
 */
export const getTransform = (isRTL: boolean, x: number = 0, y: number = 0) => {
  // In RTL, we might need to flip X transforms
  return [{ translateX: isRTL ? -x : x }, { translateY: y }];
};

/**
 * Get rotation transform for icons (flip horizontally in RTL)
 */
export const getIconRotation = (isRTL: boolean): string => {
  return isRTL ? '180deg' : '0deg';
};

/**
 * Create a direction-aware style object
 */
export const createDirectionStyle = (
  isRTL: boolean,
  baseStyle: ViewStyle | TextStyle
): ViewStyle | TextStyle => {
  const directionStyle: ViewStyle | TextStyle = { ...baseStyle };

  // Handle flexDirection
  if (baseStyle.flexDirection === 'row-reverse' || baseStyle.flexDirection === 'row') {
    directionStyle.flexDirection = getFlexDirection(isRTL);
  }

  // Handle textAlign (only for TextStyle)
  if ('textAlign' in baseStyle && baseStyle.textAlign) {
    const textStyle = directionStyle as TextStyle;
    if (baseStyle.textAlign === 'right' || baseStyle.textAlign === 'left') {
      textStyle.textAlign = getTextAlign(isRTL);
    }
  }

  return directionStyle;
};

/**
 * Get swipe direction multiplier (positive for LTR left-to-right, negative for RTL right-to-left)
 */
export const getSwipeMultiplier = (isRTL: boolean): number => {
  return isRTL ? -1 : 1;
};
