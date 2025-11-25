import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const CheckoutScreen = ({ navigation }) => {
    const { subscriptionPlan, mealPreference, selectedAddress } = useApp();

    const getPlanPrice = () => {
        const prices = { Daily: 150, Weekly: 900, Monthly: 3500 };
        return prices[subscriptionPlan] || 0;
    };

    const handlePayment = () => {
        if (!selectedAddress) {
            Alert.alert('No Address', 'Please add a delivery address first', [
                { text: 'Add Address', onPress: () => navigation.navigate('AddressManagement') },
                { text: 'Cancel', style: 'cancel' },
            ]);
            return;
        }
        navigation.navigate('Payment', {
            amount: getPlanPrice(),
            plan: subscriptionPlan
        });
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Order Summary</Text>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.summaryCard}>
                    <Text style={styles.cardTitle}>Subscription Details</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Plan</Text>
                        <Text style={styles.value}>{subscriptionPlan} Plan</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Meal Type</Text>
                        <Text style={styles.value}>{mealPreference?.type}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Meal Time</Text>
                        <Text style={styles.value}>{mealPreference?.time}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>₹{getPlanPrice()}</Text>
                    </View>
                </View>

                <View style={styles.addressCard}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="location" size={20} color="#FF6B35" />
                        <Text style={styles.cardTitle}>Delivery Address</Text>
                    </View>

                    {selectedAddress ? (
                        <View>
                            <Text style={styles.addressType}>{selectedAddress.type}</Text>
                            <Text style={styles.addressText}>
                                {selectedAddress.addressLine1}
                                {selectedAddress.addressLine2 ? `, ${selectedAddress.addressLine2}` : ''}
                                {`\n${selectedAddress.city} - ${selectedAddress.pincode}`}
                            </Text>
                            <TouchableOpacity
                                style={styles.changeButton}
                                onPress={() => navigation.navigate('AddressManagement')}
                            >
                                <Text style={styles.changeButtonText}>Change Address</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.addAddressButton}
                            onPress={() => navigation.navigate('AddressManagement')}
                        >
                            <Ionicons name="add-circle" size={24} color="#FF6B35" />
                            <Text style={styles.addAddressText}>Add Delivery Address</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                    <LinearGradient
                        colors={['#4CAF50', '#45a049']}
                        style={styles.payGradient}
                    >
                        <Ionicons name="lock-closed" size={20} color="#fff" />
                        <Text style={styles.payButtonText}>Proceed to Payment</Text>
                    </LinearGradient>
                </TouchableOpacity>
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
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        padding: 20,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
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
        backgroundColor: '#f0f0f0',
        marginVertical: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    addressCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    addressType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    changeButton: {
        marginTop: 12,
        alignSelf: 'flex-start',
    },
    changeButtonText: {
        color: '#FF6B35',
        fontSize: 14,
        fontWeight: '600',
    },
    addAddressButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 2,
        borderColor: '#FF6B35',
        borderRadius: 12,
        borderStyle: 'dashed',
        gap: 8,
    },
    addAddressText: {
        color: '#FF6B35',
        fontSize: 16,
        fontWeight: '600',
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
    payGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 12,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
