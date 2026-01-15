// File: src/screens/services/_components/TimeSlotGrid.tsx
// Purpose: Grid of time slot buttons

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TimeSlot, TimeSlotGridProps } from './types/services';
import { styles } from './StyleSheets/TimeSlotGrid.styles';

export type { TimeSlot };

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
    slots,
    selectedId,
    onSelect,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {slots.map((slot) => {
                    const isSelected = selectedId === slot.id;
                    return (
                        <TouchableOpacity
                            key={slot.id}
                            onPress={() => onSelect(slot.id)}
                            style={[styles.slot, isSelected && styles.slotSelected]}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.time, isSelected && styles.timeSelected]}>
                                {slot.time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

// Helper function to generate time slots
export const generateTimeSlots = (
    startHour: number = 9,
    endHour: number = 17,
    intervalMinutes: number = 60
): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    let currentHour = startHour;

    while (currentHour < endHour) {
        const hours = currentHour;
        const minutes = 0;
        
        // Format for display (12-hour with AM/PM in Arabic)
        const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        const period = hours >= 12 ? 'م' : 'ص';
        const timeString = `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
        
        // Format for backend (24-hour)
        const valueString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        slots.push({
            id: `time-${valueString}`,
            time: timeString,
            value: valueString,
        });

        currentHour += intervalMinutes / 60;
    }

    return slots;
};
