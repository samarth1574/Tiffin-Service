import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const PLANS = [
    {
        name: 'Daily',
        price: '₹150',
        period: 'per day',
        features: ['Fresh daily meals', 'No commitment', 'Flexible cancellation'],
        icon: 'calendar-outline',
        color: ['#4CAF50', '#45a049'],
    },
    {
        name: 'Weekly',
        price: '₹900',
        period: 'per week',
        features: ['Save 10%', '7 days meal plan', 'Priority delivery'],
        icon: 'calendar',
        color: ['#2196F3', '#1976D2'],
        badge: 'POPULAR',
    },
    {
        name: 'Monthly',
        price: '₹3500',
        period: 'per month',
        features: ['Save 20%', '30 days meal plan', 'Free delivery', 'Dedicated support'],
        icon: 'calendar-sharp',
        color: ['#FF6B35', '#F7931E'],
        badge: 'BEST VALUE',
    },
];

export const SubscriptionScreen = ({ navigation }) => {
    const { updateSubscription } = useApp();

    const handleSelectPlan = (plan) => {
        updateSubscription(plan);
        navigation.navigate('MealPreference');
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Choose Your Plan</Text>
                <Text style={styles.headerSubtitle}>Select the perfect plan for your needs</Text>
            </LinearGradient>

            <View style={styles.content}>
                {PLANS.map((plan) => (
                    <TouchableOpacity
                        key={plan.name}
                        style={styles.planCard}
                        onPress={() => handleSelectPlan(plan.name)}
                        activeOpacity={0.9}
                    >
                        {plan.badge && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{plan.badge}</Text>
                            </View>
                        )}
                        <LinearGradient
                            colors={plan.color}
                            style={styles.planGradient}
                        >
                            <View style={styles.planHeader}>
                                <Ionicons name={plan.icon} size={40} color="#fff" />
                                <View style={styles.planInfo}>
                                    <Text style={styles.planName}>{plan.name} Plan</Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.price}>{plan.price}</Text>
                                        <Text style={styles.period}>{plan.period}</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>

                        <View style={styles.featuresContainer}>
                            {plan.features.map((feature, index) => (
                                <View key={index} style={styles.feature}>
                                    <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={() => handleSelectPlan(plan.name)}
                        >
                            <Text style={styles.selectButtonText}>Select Plan</Text>
                            <Ionicons name="arrow-forward" size={20} color="#FF6B35" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
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
        padding: 20,
    },
    planCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    badge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#FFD700',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        zIndex: 1,
    },
    badgeText: {
        color: '#333',
        fontSize: 12,
        fontWeight: 'bold',
    },
    planGradient: {
        padding: 24,
    },
    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    planInfo: {
        flex: 1,
    },
    planName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    period: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    featuresContainer: {
        padding: 20,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    featureText: {
        fontSize: 16,
        color: '#666',
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        gap: 8,
    },
    selectButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF6B35',
    },
});
