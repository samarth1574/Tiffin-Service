import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useApp } from '../context/AppContext';

export const ProfileScreen = ({ navigation }) => {
    const { user, logout, subscriptionPlan, updateSubscription } = useApp();

    const handleLogout = async () => {
        await logout();
        navigation.replace('Login');
    };

    const toggleSubscription = () => {
        if (subscriptionPlan) {
            Alert.alert(
                'Pause Subscription',
                'Are you sure you want to pause your subscription?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Pause',
                        onPress: () => updateSubscription(null),
                        style: 'destructive',
                    },
                ]
            );
        } else {
            navigation.navigate('Subscription');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
                </View>
                <Text style={styles.name}>{user?.name || 'User'}</Text>
                <Text style={styles.phone}>{user?.phone}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Subscription Status</Text>
                <View style={styles.statusCard}>
                    <Text style={styles.statusLabel}>Current Plan:</Text>
                    <Text style={[styles.statusValue, !subscriptionPlan && styles.inactive]}>
                        {subscriptionPlan ? `${subscriptionPlan} Plan` : 'Inactive'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.actionButton, subscriptionPlan ? styles.pauseButton : styles.resumeButton]}
                    onPress={toggleSubscription}
                >
                    <Text style={styles.actionButtonText}>
                        {subscriptionPlan ? 'Pause Subscription' : 'Resume Subscription'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 30,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: '#666',
        marginBottom: 2,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    statusCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    statusLabel: {
        fontSize: 16,
        color: '#555',
    },
    statusValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
    inactive: {
        color: '#dc3545',
    },
    actionButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    pauseButton: {
        backgroundColor: '#ffc107',
    },
    resumeButton: {
        backgroundColor: '#28a745',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        margin: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dc3545',
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#dc3545',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
