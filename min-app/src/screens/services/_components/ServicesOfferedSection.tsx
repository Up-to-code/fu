// File: src/screens/services/_components/ServicesOfferedSection.tsx
// Purpose: Services list with checkmarks (two-column layout)

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { ServicesOfferedSectionProps } from './types/services';
import { styles } from './StyleSheets/ServicesOfferedSection.styles';

export const ServicesOfferedSection: React.FC<ServicesOfferedSectionProps> = ({
    services,
    title = 'الخدمات المقدمة',
}) => {
    // Split services into two columns
    const leftColumn = services.filter((_, index) => index % 2 === 0);
    const rightColumn = services.filter((_, index) => index % 2 === 1);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.grid}>
                <View style={styles.column}>
                    {leftColumn.map((service) => (
                        <View key={service.id} style={styles.serviceItem}>
                            <View style={styles.checkIcon}>
                                <Feather name="check" size={14} color="#10B981" />
                            </View>
                            <Text style={styles.serviceLabel}>{service.label}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.column}>
                    {rightColumn.map((service) => (
                        <View key={service.id} style={styles.serviceItem}>
                            <View style={styles.checkIcon}>
                                <Feather name="check" size={14} color="#10B981" />
                            </View>
                            <Text style={styles.serviceLabel}>{service.label}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};
