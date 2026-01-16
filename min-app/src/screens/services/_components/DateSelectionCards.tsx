// File: src/screens/services/_components/DateSelectionCards.tsx
// Purpose: Horizontal scrollable date cards

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useResponsive } from '../../../../hooks/useResponsive';
import { DateOption, DateSelectionCardsProps } from './types/services';
import { getStyles } from './StyleSheets/DateSelectionCards.styles';

export type { DateOption };

export const DateSelectionCards: React.FC<DateSelectionCardsProps> = ({
    dates,
    selectedId,
    onSelect,
}) => {
    const { getSize, width } = useResponsive();
    const styles = getStyles(getSize, width);
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
            >
                {dates.map((date) => {
                    const isSelected = selectedId === date.id;
                    return (
                        <TouchableOpacity
                            key={date.id}
                            onPress={() => onSelect(date.id)}
                            style={[styles.card, isSelected && styles.cardSelected]}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.label, isSelected && styles.labelSelected]}>
                                {date.label}
                            </Text>
                            <Text style={[styles.date, isSelected && styles.dateSelected]}>
                                {date.date}
                            </Text>
                            <Text style={[styles.month, isSelected && styles.monthSelected]}>
                                {date.month}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

// Helper function to generate date options
export const generateDateOptions = (count: number = 7): DateOption[] => {
    const options: DateOption[] = [];
    const today = new Date();
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayName = days[date.getDay()];
        const dayNumber = date.getDate();
        const monthName = months[date.getMonth()];
        
        let label = dayName;
        if (i === 0) {
            label = 'اليوم';
        } else if (i === 1) {
            label = 'غدا';
        }

        options.push({
            id: `date-${i}`,
            label,
            date: dayNumber,
            month: monthName,
            isToday: i === 0,
            isTomorrow: i === 1,
            dateValue: date,
        });
    }

    return options;
};
