import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const OrderHistoryScreen = ({ navigation }) => {
    const dummyOrders = [
        {
            id: '1',
            date: '2024-12-01',
            plan: 'Weekly',
            amount: 900,
            status: 'Delivered',
            items: 'Veg, Lunch & Dinner',
        },
        {
            id: '2',
            date: '2024-11-24',
            plan: 'Daily',
            amount: 150,
            status: 'Delivered',
            items: 'Non-Veg, Lunch',
        },
        {
            id: '3',
            date: '2024-11-20',
            plan: 'Monthly',
            amount: 3500,
            status: 'Delivered',
            items: 'Both, Lunch & Dinner',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return '#4CAF50';
            case 'In Progress': return '#FF6B35';
            case 'Cancelled': return '#F44336';
            default: return '#666';
        }
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
                <Text style={styles.headerTitle}>Order History</Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {dummyOrders.map((order) => (
                    <View key={order.id} style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <View>
                                <Text style={styles.orderId}>Order #{order.id}</Text>
                                <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
                                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                    {order.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.orderDetails}>
                            <View style={styles.detailRow}>
                                <Ionicons name="calendar" size={18} color="#666" />
                                <Text style={styles.detailLabel}>Plan:</Text>
                                <Text style={styles.detailValue}>{order.plan}</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Ionicons name="restaurant" size={18} color="#666" />
                                <Text style={styles.detailLabel}>Items:</Text>
                                <Text style={styles.detailValue}>{order.items}</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Ionicons name="cash" size={18} color="#666" />
                                <Text style={styles.detailLabel}>Amount:</Text>
                                <Text style={styles.amountValue}>₹{order.amount}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.reorderButton}
                            onPress={() => {
                                Alert.alert('Reorder', 'Would you like to reorder this plan?', [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'Reorder', onPress: () => navigation.navigate('Subscription') },
                                ]);
                            }}
                        >
                            <Ionicons name="refresh" size={18} color="#FF6B35" />
                            <Text style={styles.reorderText}>Reorder</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 16,
    },
    orderDetails: {
        gap: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    amountValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        flex: 1,
    },
    reorderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        gap: 8,
    },
    reorderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B35',
    },
});
