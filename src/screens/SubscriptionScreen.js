import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

const PLANS = ['Daily', 'Weekly', 'Monthly'];

export const SubscriptionScreen = ({ navigation }) => {
    const { updateSubscription } = useApp();

    const handleSelectPlan = (plan) => {
        updateSubscription(plan);
        navigation.navigate('MealPreference');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Plan</Text>
            {PLANS.map((plan) => (
                <TouchableOpacity
                    key={plan}
                    style={styles.card}
                    onPress={() => handleSelectPlan(plan)}
                >
                    <Text style={styles.planName}>{plan} Plan</Text>
                    <Text style={styles.planDesc}>
                        {plan === 'Daily'
                            ? 'Pay per meal'
                            : plan === 'Weekly'
                                ? 'Pay for 7 days (Save 10%)'
                                : 'Pay for 30 days (Save 20%)'}
                    </Text>
                </TouchableOpacity>
            ))}
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
    card: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
    },
    planName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 5,
    },
    planDesc: {
        color: '#666',
    },
});
