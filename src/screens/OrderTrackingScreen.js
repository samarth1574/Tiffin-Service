import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const STEPS = [
    { title: 'Order Received', icon: 'checkmark-circle', description: 'Your order has been confirmed' },
    { title: 'Preparing', icon: 'restaurant', description: 'Chef is preparing your meal' },
    { title: 'Out for Delivery', icon: 'bicycle', description: 'On the way to you' },
    { title: 'Delivered', icon: 'home', description: 'Enjoy your meal!' },
];

export const OrderTrackingScreen = ({ navigation }) => {
    const { mealPreference } = useApp();
    const [currentStep, setCurrentStep] = useState(2); // Simulating "Out for Delivery"
    const [pulseAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        // Pulse animation for active step
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Simulate real-time updates (for demo purposes)
        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < STEPS.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const getStepStatus = (index) => {
        if (index < currentStep) return 'completed';
        if (index === currentStep) return 'active';
        return 'pending';
    };

    const getEstimatedTime = () => {
        const times = ['10:00 AM', '10:30 AM', '11:45 AM', '12:30 PM'];
        return times[currentStep] || '12:30 PM';
    };

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
                        colors={currentStep === STEPS.length - 1 ? ['#4CAF50', '#45a049'] : ['#FF6B35', '#F7931E']}
                        style={styles.estimateGradient}
                    >
                        <Ionicons name="time" size={32} color="#fff" />
                        <View style={styles.estimateInfo}>
                            <Text style={styles.estimateLabel}>
                                {currentStep === STEPS.length - 1 ? 'Delivered At' : 'Estimated Delivery'}
                            </Text>
                            <Text style={styles.estimateTime}>{getEstimatedTime()}</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.timeline}>
                    {STEPS.map((step, index) => {
                        const status = getStepStatus(index);
                        return (
                            <View key={index} style={styles.stepContainer}>
                                <View style={styles.leftColumn}>
                                    <Text style={[
                                        styles.time,
                                        status !== 'pending' && styles.activeTime
                                    ]}>
                                        {['10:00 AM', '10:30 AM', '11:45 AM', '12:30 PM'][index]}
                                    </Text>
                                </View>

                                <View style={styles.middleColumn}>
                                    <Animated.View style={[
                                        styles.dot,
                                        status === 'completed' && styles.completedDot,
                                        status === 'active' && styles.activeDot,
                                        status === 'pending' && styles.pendingDot,
                                        status === 'active' && { transform: [{ scale: pulseAnim }] }
                                    ]}>
                                        <Ionicons
                                            name={step.icon}
                                            size={20}
                                            color="#fff"
                                        />
                                    </Animated.View>
                                    {index < STEPS.length - 1 && (
                                        <View style={[
                                            styles.line,
                                            status === 'completed' && styles.completedLine
                                        ]} />
                                    )}
                                </View>

                                <View style={styles.rightColumn}>
                                    <View style={[
                                        styles.stepCard,
                                        status === 'active' && styles.activeStepCard
                                    ]}>
                                        <Text style={[
                                            styles.stepTitle,
                                            status !== 'pending' && styles.activeStepTitle
                                        ]}>
                                            {step.title}
                                        </Text>
                                        <Text style={[
                                            styles.stepDescription,
                                            status !== 'pending' && styles.activeStepDescription
                                        ]}>
                                            {step.description}
                                        </Text>
                                        {status === 'active' && (
                                            <View style={styles.activeIndicator}>
                                                <View style={styles.pulse} />
                                                <Text style={styles.activeText}>In Progress</Text>
                                            </View>
                                        )}
                                        {status === 'completed' && (
                                            <View style={styles.completedIndicator}>
                                                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                                                <Text style={styles.completedText}>Completed</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.deliveryInfo}>
                    <View style={styles.infoCard}>
                        <Ionicons name="person" size={24} color="#FF6B35" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Delivery Partner</Text>
                            <Text style={styles.infoValue}>Rahul Kumar</Text>
                            <Text style={styles.infoSubtext}>⭐ 4.8 (250+ deliveries)</Text>
                        </View>
                        <TouchableOpacity style={styles.callButton}>
                            <Ionicons name="call" size={20} color="#4CAF50" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCard}>
                        <Ionicons name="location" size={24} color="#FF6B35" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Delivery Address</Text>
                            <Text style={styles.infoValue}>Home</Text>
                            <Text style={styles.infoSubtext}>123 Main St, Apartment 4B</Text>
                        </View>
                    </View>
                </View>

                {currentStep === STEPS.length - 1 && (
                    <TouchableOpacity
                        style={styles.feedbackButton}
                        onPress={() => navigation.navigate('Feedback', { orderId: '12345' })}
                    >
                        <LinearGradient
                            colors={['#4CAF50', '#45a049']}
                            style={styles.feedbackGradient}
                        >
                            <Ionicons name="star" size={24} color="#fff" />
                            <Text style={styles.feedbackText}>Rate Your Experience</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
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
        minHeight: 100,
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
    stepDescription: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 4,
    },
    activeStepDescription: {
        color: '#666',
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
    completedIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 6,
    },
    completedText: {
        fontSize: 14,
        color: '#4CAF50',
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
    infoSubtext: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedbackButton: {
        marginTop: 24,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    feedbackGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 12,
    },
    feedbackText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
