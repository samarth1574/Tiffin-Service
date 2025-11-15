import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const STEPS = [
    { title: 'Order Received', status: 'completed', time: '10:00 AM', icon: 'checkmark-circle' },
    { title: 'Preparing', status: 'completed', time: '10:30 AM', icon: 'restaurant' },
    { title: 'Out for Delivery', status: 'active', time: '11:45 AM', icon: 'bicycle' },
    { title: 'Delivered', status: 'pending', time: '12:30 PM', icon: 'home' },
];

export const OrderTrackingScreen = ({ navigation }) => {
    const { mealPreference } = useApp();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <Ionicons name="location" size={40} color="#fff" />
                <Text style={styles.headerTitle}>Track Your Order</Text>
                <Text style={styles.headerSubtitle}>
                    {mealPreference?.time} - {mealPreference?.type} Meal
                </Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.estimateCard}>
                    <LinearGradient
                        colors={['#4CAF50', '#45a049']}
                        style={styles.estimateGradient}
                    >
                        <Ionicons name="time" size={32} color="#fff" />
                        <View style={styles.estimateInfo}>
                            <Text style={styles.estimateLabel}>Estimated Delivery</Text>
                            <Text style={styles.estimateTime}>12:30 PM</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.timeline}>
                    {STEPS.map((step, index) => (
                        <View key={index} style={styles.stepContainer}>
                            <View style={styles.leftColumn}>
                                <Text style={[
                                    styles.time,
                                    step.status !== 'pending' && styles.activeTime
                                ]}>
                                    {step.time}
                                </Text>
                            </View>

                            <View style={styles.middleColumn}>
                                <View style={[
                                    styles.dot,
                                    step.status === 'completed' && styles.completedDot,
                                    step.status === 'active' && styles.activeDot,
                                    step.status === 'pending' && styles.pendingDot,
                                ]}>
                                    <Ionicons
                                        name={step.icon}
                                        size={20}
                                        color="#fff"
                                    />
                                </View>
                                {index < STEPS.length - 1 && (
                                    <View style={[
                                        styles.line,
                                        step.status === 'completed' && styles.completedLine
                                    ]} />
                                )}
                            </View>

                            <View style={styles.rightColumn}>
                                <View style={[
                                    styles.stepCard,
                                    step.status === 'active' && styles.activeStepCard
                                ]}>
                                    <Text style={[
                                        styles.stepTitle,
                                        step.status !== 'pending' && styles.activeStepTitle
                                    ]}>
                                        {step.title}
                                    </Text>
                                    {step.status === 'active' && (
                                        <View style={styles.activeIndicator}>
                                            <View style={styles.pulse} />
                                            <Text style={styles.activeText}>In Progress</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.deliveryInfo}>
                    <View style={styles.infoCard}>
                        <Ionicons name="person" size={24} color="#FF6B35" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Delivery Partner</Text>
                            <Text style={styles.infoValue}>Rahul Kumar</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <Ionicons name="location" size={24} color="#FF6B35" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Delivery Address</Text>
                            <Text style={styles.infoValue}>Home</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 12,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    estimateCard: {
        marginBottom: 32,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    estimateGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    estimateInfo: {
        flex: 1,
    },
    estimateLabel: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    estimateTime: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 4,
    },
    timeline: {
        paddingHorizontal: 10,
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        minHeight: 80,
    },
    leftColumn: {
        width: 80,
        alignItems: 'flex-end',
        paddingRight: 16,
        paddingTop: 8,
    },
    time: {
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
    },
    activeTime: {
        color: '#333',
        fontWeight: '600',
    },
    middleColumn: {
        alignItems: 'center',
        width: 40,
    },
    dot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    completedDot: {
        backgroundColor: '#4CAF50',
    },
    activeDot: {
        backgroundColor: '#FF6B35',
    },
    pendingDot: {
        backgroundColor: '#ddd',
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#eee',
        position: 'absolute',
        top: 40,
        bottom: -24,
    },
    completedLine: {
        backgroundColor: '#4CAF50',
    },
    rightColumn: {
        flex: 1,
        paddingLeft: 16,
    },
    stepCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    activeStepCard: {
        elevation: 5,
        shadowOpacity: 0.2,
        borderLeftWidth: 3,
        borderLeftColor: '#FF6B35',
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
    },
    activeStepTitle: {
        color: '#333',
    },
    activeIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
    },
    pulse: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF6B35',
    },
    activeText: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '600',
    },
    deliveryInfo: {
        marginTop: 24,
        gap: 16,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        gap: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 4,
    },
});
