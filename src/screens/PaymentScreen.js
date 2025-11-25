import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PAYMENT_METHODS = [
    {
        id: 'upi',
        name: 'UPI',
        icon: 'qr-code',
        color: ['#00ACC1', '#0097A7'],
        options: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM'],
    },
    {
        id: 'wallet',
        name: 'Wallets',
        icon: 'wallet',
        color: ['#FF6B35', '#F7931E'],
        options: ['Paytm Wallet', 'PhonePe Wallet', 'Amazon Pay'],
    },
    {
        id: 'card',
        name: 'Debit/Credit Card',
        icon: 'card',
        color: ['#5C6BC0', '#3F51B5'],
        options: ['Visa', 'Mastercard', 'Rupay'],
    },
    {
        id: 'netbanking',
        name: 'Net Banking',
        icon: 'business',
        color: ['#4CAF50', '#45a049'],
        options: ['All Banks'],
    },
];

export const PaymentScreen = ({ route, navigation }) => {
    const { amount, plan } = route.params || { amount: 0, plan: 'Daily' };
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const handlePayment = () => {
        if (!selectedMethod) {
            Alert.alert('Error', 'Please select a payment method');
            return;
        }

        // Simulate payment processing
        Alert.alert(
            'Payment Successful!',
            `Your ${plan} subscription has been activated.\nAmount Paid: ₹${amount}`,
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('OrderTracking'),
                },
            ]
        );
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
                <Text style={styles.headerTitle}>Payment</Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.amountCard}>
                    <Text style={styles.amountLabel}>Amount to Pay</Text>
                    <Text style={styles.amount}>₹{amount}</Text>
                    <Text style={styles.planText}>{plan} Plan</Text>
                </View>

                <Text style={styles.sectionTitle}>Select Payment Method</Text>

                {PAYMENT_METHODS.map((method) => (
                    <View key={method.id} style={styles.methodContainer}>
                        <TouchableOpacity
                            style={[
                                styles.methodCard,
                                selectedMethod === method.id && styles.methodCardActive
                            ]}
                            onPress={() => {
                                setSelectedMethod(method.id);
                                setSelectedOption(null);
                            }}
                        >
                            <LinearGradient
                                colors={selectedMethod === method.id ? method.color : ['#fff', '#fff']}
                                style={styles.methodGradient}
                            >
                                <Ionicons
                                    name={method.icon}
                                    size={28}
                                    color={selectedMethod === method.id ? '#fff' : '#666'}
                                />
                                <Text style={[
                                    styles.methodName,
                                    selectedMethod === method.id && styles.methodNameActive
                                ]}>
                                    {method.name}
                                </Text>
                                <Ionicons
                                    name={selectedMethod === method.id ? 'checkmark-circle' : 'chevron-forward'}
                                    size={24}
                                    color={selectedMethod === method.id ? '#fff' : '#999'}
                                />
                            </LinearGradient>
                        </TouchableOpacity>

                        {selectedMethod === method.id && (
                            <View style={styles.optionsContainer}>
                                {method.options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.optionButton,
                                            selectedOption === option && styles.optionButtonActive
                                        ]}
                                        onPress={() => setSelectedOption(option)}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            selectedOption === option && styles.optionTextActive
                                        ]}>
                                            {option}
                                        </Text>
                                        {selectedOption === option && (
                                            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                ))}

                <View style={styles.secureInfo}>
                    <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                    <Text style={styles.secureText}>100% Secure Payment</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payButton, !selectedMethod && styles.payButtonDisabled]}
                    onPress={handlePayment}
                    disabled={!selectedMethod}
                >
                    <LinearGradient
                        colors={selectedMethod ? ['#4CAF50', '#45a049'] : ['#ccc', '#ccc']}
                        style={styles.payGradient}
                    >
                        <Ionicons name="lock-closed" size={20} color="#fff" />
                        <Text style={styles.payText}>Pay ₹{amount}</Text>
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
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    amountCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    amountLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    amount: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    planText: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    methodContainer: {
        marginBottom: 12,
    },
    methodCard: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    methodCardActive: {
        elevation: 5,
        shadowOpacity: 0.2,
    },
    methodGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    methodName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    methodNameActive: {
        color: '#fff',
    },
    optionsContainer: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        gap: 8,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    optionButtonActive: {
        borderColor: '#4CAF50',
        backgroundColor: '#f1f8f4',
    },
    optionText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    optionTextActive: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    secureInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        gap: 8,
    },
    secureText: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    payButton: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    payButtonDisabled: {
        elevation: 0,
    },
    payGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 12,
    },
    payText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
