import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const ProfileScreen = ({ navigation }) => {
    const { user, logout, subscriptionPlan, subscriptionStatus, pauseSubscription, resumeSubscription, addresses } = useApp();

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };

    const handlePauseResume = () => {
        if (subscriptionStatus === 'active') {
            Alert.alert(
                'Pause Subscription',
                'Your subscription will be paused. You can resume it anytime.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Pause',
                        onPress: () => pauseSubscription(),
                    },
                ]
            );
        } else {
            Alert.alert(
                'Resume Subscription',
                'Your subscription will be resumed from tomorrow.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Resume',
                        onPress: () => resumeSubscription(),
                    },
                ]
            );
        }
    };

    const menuItems = [
        {
            icon: 'location',
            title: 'Delivery Addresses',
            subtitle: `${addresses.length} saved address${addresses.length !== 1 ? 'es' : ''}`,
            onPress: () => navigation.navigate('AddressManagement'),
            color: '#FF6B35',
        },
        {
            icon: 'receipt',
            title: 'Order History',
            subtitle: 'View past orders',
            onPress: () => Alert.alert('Coming Soon', 'Order history feature will be available soon'),
            color: '#2196F3',
        },
        {
            icon: 'card',
            title: 'Payment Methods',
            subtitle: 'Manage payment options',
            onPress: () => Alert.alert('Coming Soon', 'Payment methods feature will be available soon'),
            color: '#4CAF50',
        },
        {
            icon: 'help-circle',
            title: 'Help & Support',
            subtitle: 'Get help',
            onPress: () => Alert.alert('Support', 'Contact us at support@hometiffin.com'),
            color: '#9C27B0',
        },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
                </View>
                <Text style={styles.name}>{user?.name || 'User'}</Text>
                <Text style={styles.contact}>{user?.phone}</Text>
                <Text style={styles.contact}>{user?.email}</Text>
            </LinearGradient>

            {subscriptionPlan && (
                <View style={styles.subscriptionCard}>
                    <LinearGradient
                        colors={subscriptionStatus === 'active' ? ['#4CAF50', '#45a049'] : ['#FFA726', '#FB8C00']}
                        style={styles.subscriptionGradient}
                    >
                        <View style={styles.subscriptionHeader}>
                            <View>
                                <Text style={styles.subscriptionLabel}>Current Plan</Text>
                                <Text style={styles.subscriptionPlan}>{subscriptionPlan} Plan</Text>
                            </View>
                            <View style={[
                                styles.statusBadge,
                                subscriptionStatus === 'paused' && styles.statusBadgePaused
                            ]}>
                                <Text style={styles.statusText}>
                                    {subscriptionStatus === 'active' ? 'Active' : 'Paused'}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.pauseResumeButton}
                            onPress={handlePauseResume}
                        >
                            <Ionicons
                                name={subscriptionStatus === 'active' ? 'pause-circle' : 'play-circle'}
                                size={20}
                                color="#fff"
                            />
                            <Text style={styles.pauseResumeText}>
                                {subscriptionStatus === 'active' ? 'Pause Subscription' : 'Resume Subscription'}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            )}

            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                            <Ionicons name={item.icon} size={24} color={item.color} />
                        </View>
                        <View style={styles.menuContent}>
                            <Text style={styles.menuTitle}>{item.title}</Text>
                            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#ccc" />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="#F44336" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Version 1.0.0</Text>
                <Text style={styles.footerText}>© 2024 HomeTiffin</Text>
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
        padding: 40,
        paddingTop: 60,
        alignItems: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: '#fff',
    },
    avatarText: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    contact: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 4,
    },
    subscriptionCard: {
        margin: 20,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    subscriptionGradient: {
        padding: 20,
    },
    subscriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    subscriptionLabel: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    subscriptionPlan: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 4,
    },
    statusBadge: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statusBadgePaused: {
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    pauseResumeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 14,
        borderRadius: 12,
        gap: 8,
    },
    pauseResumeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    menuContainer: {
        padding: 20,
        gap: 12,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    menuSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#F44336',
        gap: 12,
    },
    logoutText: {
        color: '#F44336',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },
    footerText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
});
