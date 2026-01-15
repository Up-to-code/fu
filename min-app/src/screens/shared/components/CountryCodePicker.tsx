// File: src/screens/shared/components/CountryCodePicker.tsx
// Purpose: Country code picker component for phone inputs

import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { CountryCodePickerProps } from '../types/ui';
import { styles } from '../StyleSheets/CountryCodePicker.styles';

interface Country {
    code: string;
    name: string;
    flag: string;
    dialCode: string;
}

const COUNTRIES: Country[] = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦', dialCode: '+966' },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪', dialCode: '+971' },
    { code: 'KW', name: 'الكويت', flag: '🇰🇼', dialCode: '+965' },
    { code: 'QA', name: 'قطر', flag: '🇶🇦', dialCode: '+974' },
    { code: 'BH', name: 'البحرين', flag: '🇧🇭', dialCode: '+973' },
    { code: 'OM', name: 'عمان', flag: '🇴🇲', dialCode: '+968' },
    { code: 'EG', name: 'مصر', flag: '🇪🇬', dialCode: '+20' },
    { code: 'JO', name: 'الأردن', flag: '🇯🇴', dialCode: '+962' },
    { code: 'LB', name: 'لبنان', flag: '🇱🇧', dialCode: '+961' },
    { code: 'US', name: 'الولايات المتحدة', flag: '🇺🇸', dialCode: '+1' },
    { code: 'GB', name: 'المملكة المتحدة', flag: '🇬🇧', dialCode: '+44' },
];

export const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
    selectedCode,
    onSelect,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const selectedCountry = COUNTRIES.find(c => c.dialCode === selectedCode) || COUNTRIES[0];

    return (
        <>
            <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <Text style={styles.code}>{selectedCountry.dialCode}</Text>
                <Feather name="chevron-down" size={16} color={COLORS.textLight} />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>اختر رمز الدولة</Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Feather name="x" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={COUNTRIES}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.countryItem,
                                        selectedCode === item.dialCode && styles.countryItemSelected
                                    ]}
                                    onPress={() => {
                                        onSelect(item.dialCode);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.countryFlag}>{item.flag}</Text>
                                    <Text style={styles.countryName}>{item.name}</Text>
                                    <Text style={styles.countryDialCode}>{item.dialCode}</Text>
                                    {selectedCode === item.dialCode && (
                                        <Feather name="check" size={20} color={COLORS.primary} />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};
