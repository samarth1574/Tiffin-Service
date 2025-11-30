import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const MEAL_TYPES = [
    {
        type: 'Veg',
        icon: 'leaf',
        color: ['#4CAF50', '#45a049'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
        description: 'Fresh vegetarian meals',
        emoji: '🥗',
    },
    {
        type: 'Non-Veg',
        icon: 'restaurant',
        color: ['#FF6B35', '#F7931E'],
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        description: 'Delicious non-veg options',
        emoji: '🍗',
    },
    {
        type: 'Both',
        icon: 'nutrition',
        color: ['#9C27B0', '#7B1FA2'],
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        description: 'Mix of veg & non-veg',
        emoji: '🍱',
    },
];

const MEAL_TIMES = [
    {
        time: 'Lunch',
        icon: 'sunny',
        color: ['#FFA726', '#FB8C00'],
        period: '12:00 PM - 2:00 PM',
        emoji: '☀️',
    },
    {
        time: 'Dinner',
        icon: 'moon',
        color: ['#5C6BC0', '#3F51B5'],
        period: '7:00 PM - 9:00 PM',
        emoji: '🌙',
    },
    {
        time: 'Both',
        icon: 'time',
        color: ['#00ACC1', '#0097A7'],
        period: 'Lunch & Dinner',
        emoji: '⏰',
    },
];

export const MealPreferenceScreen = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const { updateMealPreference } = useApp();

    const handleContinue = async () => {
        if (!selectedType || !selectedTime) {
            Alert.alert('Incomplete Selection', 'Please select both meal type and time');
            return;
        }
        await updateMealPreference(selectedType, selectedTime);
        navigation.navigate('Checkout');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Meal Preferences</Text>
                    <Text style={styles.headerSubtitle}>Customize your tiffin</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="restaurant-outline" size={24} color="#FF6B35" />
                        <Text style={styles.sectionTitle}>Choose Meal Type</Text>
                    </View>

                    <View style={styles.optionsGrid}>
                        {MEAL_TYPES.map((item) => (
                            <TouchableOpacity
                                key={item.type}
                                style={[
                                    styles.typeCard,
                                    selectedType === item.type && styles.selectedCard
                                ]}
                                onPress={() => setSelectedType(item.type)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={selectedType === item.type ? item.color : ['#fff', '#fff']}
                                    style={styles.cardGradient}
                                >
                                    <View style={styles.cardContent}>
                                        <Text style={styles.emoji}>{item.emoji}</Text>
                                        <Text style={[
                                            styles.typeTitle,
                                            selectedType === item.type && styles.selectedText
                                        ]}>
                                            {item.type}
                                        </Text>
                                        <Text style={[
                                            styles.typeDescription,
                                            selectedType === item.type && styles.selectedDescText
                                        ]}>
                                            {item.description}
                                        </Text>
                                    </View>
                                    {selectedType === item.type && (
                                        <View style={styles.checkmark}>
                                            <Ionicons name="checkmark-circle" size={32} color="#fff" />
                                        </View>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="time-outline" size={24} color="#FF6B35" />
                        <Text style={styles.sectionTitle}>Choose Meal Time</Text>
                    </View>

                    <View style={styles.timeGrid}>
                        {MEAL_TIMES.map((item) => (
                            <TouchableOpacity
                                key={item.time}
                                style={[
                                    styles.timeCard,
                                    selectedTime === item.time && styles.selectedTimeCard
                                ]}
                                onPress={() => setSelectedTime(item.time)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={selectedTime === item.time ? item.color : ['#fff', '#fff']}
                                    style={styles.timeGradient}
                                >
                                    <Text style={styles.timeEmoji}>{item.emoji}</Text>
                                    <View style={styles.timeInfo}>
                                        <Text style={[
                                            styles.timeTitle,
                                            selectedTime === item.time && styles.selectedText
                                        ]}>
                                            {item.time}
                                        </Text>
                                        <Text style={[
                                            styles.timePeriod,
                                            selectedTime === item.time && styles.selectedDescText
                                        ]}>
                                            {item.period}
                                        </Text>
                                    </View>
                                    {selectedTime === item.time && (
                                        <Ionicons name="checkmark-circle" size={28} color="#fff" />
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {selectedType && selectedTime && (
                    <View style={styles.summaryCard}>
                        <LinearGradient
                            colors={['#4CAF50', '#45a049']}
                            style={styles.summaryGradient}
                        >
                            <Ionicons name="checkmark-done-circle" size={32} color="#fff" />
                            <View style={styles.summaryText}>
                                <Text style={styles.summaryTitle}>Your Selection</Text>
                                <Text style={styles.summaryDetails}>
                                    {selectedType} • {selectedTime}
                                </Text>
                            </View>
                        </LinearGradient>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.continueButton, (!selectedType || !selectedTime) && styles.disabledButton]}
                    onPress={handleContinue}
                    disabled={!selectedType || !selectedTime}
                >
                    <LinearGradient
                        colors={selectedType && selectedTime ? ['#4CAF50', '#45a049'] : ['#ccc', '#ccc']}
                        style={styles.continueGradient}
                    >
                        <Text style={styles.continueText}>Continue to Checkout</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    optionsGrid: {
        gap: 16,
    },
    typeCard: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedCard: {
        elevation: 8,
        shadowOpacity: 0.3,
        transform: [{ scale: 1.02 }],
    },
    cardGradient: {
        padding: 24,
        minHeight: 140,
        justifyContent: 'center',
    },
    cardContent: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    typeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    typeDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    selectedText: {
        color: '#fff',
    },
    selectedDescText: {
        color: '#fff',
        opacity: 0.9,
    },
    checkmark: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    timeGrid: {
        gap: 12,
    },
    timeCard: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedTimeCard: {
        elevation: 6,
        shadowOpacity: 0.2,
    },
    timeGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    timeEmoji: {
        fontSize: 36,
    },
    timeInfo: {
        flex: 1,
    },
    timeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    timePeriod: {
        fontSize: 14,
        color: '#666',
    },
    summaryCard: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    summaryGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    summaryText: {
        flex: 1,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    summaryDetails: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    continueButton: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    disabledButton: {
        elevation: 0,
    },
    continueGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 12,
    },
    continueText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
