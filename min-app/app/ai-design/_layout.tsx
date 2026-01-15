import { Stack } from 'expo-router';
import React from 'react';

export default function AIDesignLayout() {
    return (
        <Stack 
            screenOptions={{ 
                headerShown: false,
                animation: 'fade',
                animationDuration: 300,
                contentStyle: { backgroundColor: '#FFFFFF' },
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="camera" />
            <Stack.Screen name="results" />
        </Stack>
    );
}
