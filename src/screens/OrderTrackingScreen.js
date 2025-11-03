import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export const OrderTrackingScreen = ({ navigation }) => {
    const { mealPreference } = useApp();

    const steps = [
        { title: 'Order Received', status: 'completed', time: '10:00 AM' },
        { title: 'Preparing', status: 'completed', time: '10:30 AM' },
        { title: 'Out for Delivery', status: 'active', time: '11:45 AM' },
        { title: 'Delivered', status: 'pending', time: '12:30 PM' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Track Your Order</Text>
            <Text style={styles.subtitle}>
                {mealPreference?.time} - {mealPreference?.type} Meal
            </Text>

            <View style={styles.timeline}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.time}>{step.time}</Text>
                        </View>
                        <View style={styles.middleColumn}>
                            <View
                                style={[
                                    styles.dot,
                                    step.status === 'completed'
                                        ? styles.completedDot
                                        : step.status === 'active'
                                            ? styles.activeDot
                                            : styles.pendingDot,
                                ]}
                            />
                            {index < steps.length - 1 && <View style={styles.line} />}
                        </View>
                        <View style={styles.rightColumn}>
                            <Text
                                style={[
                                    styles.stepTitle,
                                    step.status === 'completed' || step.status === 'active'
                                        ? styles.activeText
                                        : styles.pendingText,
                                ]}
                            >
                                {step.title}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    timeline: {
        paddingHorizontal: 10,
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        height: 60,
    },
    leftColumn: {
        width: 80,
        alignItems: 'flex-end',
        paddingRight: 15,
    },
    time: {
        color: '#888',
        fontSize: 14,
    },
    middleColumn: {
        alignItems: 'center',
        width: 30,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        zIndex: 1,
    },
    completedDot: {
        backgroundColor: '#28a745',
    },
    activeDot: {
        backgroundColor: '#007AFF',
        borderWidth: 3,
        borderColor: '#cce5ff',
    },
    pendingDot: {
        backgroundColor: '#ddd',
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#eee',
        position: 'absolute',
        top: 16,
        bottom: -30,
    },
    rightColumn: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'flex-start',
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    activeText: {
        color: '#333',
    },
    pendingText: {
        color: '#aaa',
    },
});
