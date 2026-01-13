import React, { useEffect, useRef, useState } from 'react';
import { Animated, TextInput, View } from 'react-native';

interface PolishedOTPInputProps {
    code: string;
    onChange: (code: string) => void;
    length?: number;
    disabled?: boolean;
}

export const PolishedOTPInput = ({
    code,
    onChange,
    length = 4,
    disabled = false
}: PolishedOTPInputProps) => {
    const inputRef = useRef<TextInput>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // Create animated values for each slot
    const animations = useRef(
        Array(length).fill(0).map(() => new Animated.Value(0))
    ).current;

    const handleTextChange = (text: string) => {
        // Allow only numeric input
        const numericText = text.replace(/[^0-9]/g, '');
        onChange(numericText);

        // Animate the new slot if a digit was added
        if (numericText.length > code.length) {
            const index = numericText.length - 1;
            if (index < length) {
                animations[index].setValue(0);
                Animated.spring(animations[index], {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 150,
                    friction: 12
                }).start();
            }
        }
    };

    // Auto-focus logic can be handled by parent or here if needed
    // But usually parent controls focus via another ref or just renders it

    const slots = Array(length).fill(0);

    return (
        <View
            className="w-full h-24 items-center justify-center relative bg-white rounded-3xl"
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
            {/* The Hidden Input specific to the screenshot layout */}
            <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleTextChange}
                maxLength={length}
                keyboardType="number-pad"
                textContentType="oneTimeCode" // iOS Auto-fill support
                autoFocus
                editable={!disabled}
                className="absolute w-full h-full opacity-0 z-10"
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />

            {/* Visual Slots Container */}
            <View className="flex-row items-center justify-center gap-4 w-full px-6" pointerEvents="none">
                {slots.map((_, index) => {
                    const digit = code[index];
                    const isActive = index === code.length;
                    const isFilled = index < code.length;

                    // Animations
                    const scale = animations[index].interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.3, 1.2, 1]
                    });

                    return (
                        <View
                            key={index}
                            className={`
                                w-14 h-16 rounded-2xl border-2 items-center justify-center
                                ${isActive ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50'}
                                ${isFilled ? 'border-slate-200 bg-white' : ''}
                            `}
                        >
                            {digit && (
                                <Animated.Text
                                    style={{ transform: [{ scale }] }}
                                    className="font-cairo-bold text-2xl text-slate-800"
                                >
                                    {digit}
                                </Animated.Text>
                            )}

                            {/* Cursor Blinker for active slot */}
                            {isActive && !digit && !disabled && (
                                <Blinker />
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const Blinker = () => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true })
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={{ opacity }}
            className="w-0.5 h-6 bg-primary rounded-full"
        />
    );
};
