import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';

export const CheckoutScreen = ({ navigation }) => {
    const { subscriptionPlan, mealPreference } = useApp();

    const handlePayment = () => {
        Alert.alert('Success', 'Payment Successful! Subscription Active.', [
            {
                text: 'OK',
                onPress: () => navigation.navigate('OrderTracking'),
            },
        ]);
    };

    const getPrice = () => {
        switch (subscriptionPlan) {
            case 'Daily':
                return '₹150';
            case 'Weekly':
                return '₹900';
            case 'Monthly':
                return '₹3500';
            default:
                return '₹0';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>

            <View style={styles.summaryCard}>
                <View style={styles.row}>
                    <Text style={styles.label}>Plan:</Text>
                    <Text style={styles.value}>{subscriptionPlan} Plan</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Meal Type:</Text>
                    <Text style={styles.value}>{mealPreference?.type}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Time:</Text>
                    <Text style={styles.value}>{mealPreference?.time}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                    <Text style={styles.totalLabel}>Total Amount:</Text>
                    <Text style={styles.totalValue}>{getPrice()}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Text style={styles.payButtonText}>Pay & Subscribe</Text>
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
    summaryCard: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28a745',
    },
    payButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
