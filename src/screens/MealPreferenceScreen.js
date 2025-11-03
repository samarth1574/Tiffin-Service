import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

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
            <Text style={styles.title}>Customize Your Meal</Text>

            <Text style={styles.label}>Meal Type</Text>
            <View style={styles.row}>
                {['Veg', 'Non-Veg'].map((t) => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.option, type === t && styles.selectedOption]}
                        onPress={() => setType(t)}
                    >
                        <Text style={[styles.optionText, type === t && styles.selectedOptionText]}>
                            {t}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Meal Time</Text>
            <View style={styles.row}>
                {['Lunch', 'Dinner'].map((t) => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.option, time === t && styles.selectedOption]}
                        onPress={() => setTime(t)}
                    >
                        <Text style={[styles.optionText, time === t && styles.selectedOptionText]}>
                            {t}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleProceed}>
                <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 20,
        color: '#555',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    option: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedOption: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
