import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const MEAL_TYPES = [
    {
        type: 'Veg',
        icon: 'leaf',
        color: ['#4CAF50', '#45a049'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        description: 'Fresh vegetarian meals',
    },
    {
        type: 'Non-Veg',
        icon: 'restaurant',
        color: ['#FF6B35', '#F7931E'],
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
        description: 'Delicious non-veg options',
    },
    {
        type: 'Both',
        icon: 'nutrition',
        color: ['#9C27B0', '#7B1FA2'],
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
        description: 'Mix of veg & non-veg',
    },
];

const MEAL_TIMES = [
    {
        time: 'Lunch',
        icon: 'sunny',
        color: ['#FFA726', '#FB8C00'],
        period: '12:00 PM - 2:00 PM',
    },
    {
        time: 'Dinner',
        icon: 'moon',
        color: ['#5C6BC0', '#3F51B5'],
        period: '7:00 PM - 9:00 PM',
    },
    {
        time: 'Both',
        icon: 'time',
        color: ['#00ACC1', '#0097A7'],
        period: 'Lunch & Dinner',
    },
];

export const MealPreferenceScreen = ({ navigation }) => {
    const { updateMealPreference } = useApp();
    const [type, setType] = useState('Veg');
    const [time, setTime] = useState('Lunch');

    const handleProceed = () => {
        updateMealPreference(type, time);
        navigation.navigate('Checkout');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Customize Your Meal</Text>
                <Text style={styles.headerSubtitle}>Choose your preferences</Text>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="restaurant" size={24} color="#FF6B35" />
                        <Text style={styles.sectionTitle}>Meal Type</Text>
                    </View>
                    <View style={styles.optionsRow}>
                        {MEAL_TYPES.map((mealType) => (
                            <TouchableOpacity
                                key={mealType.type}
                                style={[
                                    styles.optionCard,
                                    type === mealType.type && styles.selectedCard,
                                ]}
                                onPress={() => setType(mealType.type)}
                                activeOpacity={0.9}
                            >
                                <Image source={{ uri: mealType.image }} style={styles.optionImage} />
                                <LinearGradient
                                    colors={type === mealType.type ? mealType.color : ['transparent', 'rgba(0,0,0,0.6)']}
                                    style={styles.optionGradient}
                                >
                                    <Ionicons name={mealType.icon} size={32} color="#fff" />
                                    <Text style={styles.optionTitle}>{mealType.type}</Text>
                                    <Text style={styles.optionDescription}>{mealType.description}</Text>
                                    {type === mealType.type && (
                                        <View style={styles.checkmark}>
                                            <Ionicons name="checkmark-circle" size={24} color="#fff" />
                                        </View>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="time" size={24} color="#FF6B35" />
                        <Text style={styles.sectionTitle}>Meal Time</Text>
                    </View>
                    <View style={styles.optionsRow}>
                        {MEAL_TIMES.map((mealTime) => (
                            <TouchableOpacity
                                key={mealTime.time}
                                style={[
                                    styles.timeCard,
                                    time === mealTime.time && styles.selectedTimeCard,
                                ]}
                                onPress={() => setTime(mealTime.time)}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={time === mealTime.time ? mealTime.color : ['#fff', '#fff']}
                                    style={styles.timeGradient}
                                >
                                    <Ionicons
                                        name={mealTime.icon}
                                        size={40}
                                        color={time === mealTime.time ? '#fff' : '#666'}
                                    />
                                    <Text style={[
                                        styles.timeTitle,
                                        time === mealTime.time && styles.selectedTimeTitle
                                    ]}>
                                        {mealTime.time}
                                    </Text>
                                    <Text style={[
                                        styles.timePeriod,
                                        time === mealTime.time && styles.selectedTimePeriod
                                    ]}>
                                        {mealTime.period}
                                    </Text>
                                    {time === mealTime.time && (
                                        <View style={styles.checkmark}>
                                            <Ionicons name="checkmark-circle" size={20} color="#fff" />
                                        </View>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                    <LinearGradient
                        colors={['#4CAF50', '#45a049']}
                        style={styles.proceedGradient}
                    >
                        <Text style={styles.proceedText}>Proceed to Checkout</Text>
                        <Ionicons name="arrow-forward" size={24} color="#fff" />
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
        padding: 32,
        paddingTop: 60,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
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
        marginBottom: 16,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    optionsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    optionCard: {
        flex: 1,
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    selectedCard: {
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    optionImage: {
        width: '100%',
        height: '100%',
    },
    optionGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 8,
    },
    optionDescription: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginTop: 4,
    },
    checkmark: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    timeCard: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    selectedTimeCard: {
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    timeGradient: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
    },
    timeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 12,
    },
    selectedTimeTitle: {
        color: '#fff',
    },
    timePeriod: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    selectedTimePeriod: {
        color: '#fff',
        opacity: 0.9,
    },
    proceedButton: {
        marginTop: 'auto',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    proceedGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 12,
    },
    proceedText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
