import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Order Delivered',
        message: 'Your tiffin has been delivered successfully. Enjoy your meal!',
        time: '2 mins ago',
        type: 'order',
        read: false,
    },
    {
        id: '2',
        title: 'Special Offer',
        message: 'Get 20% off on your next weekly subscription! Use code WEEKLY20.',
        time: '2 hours ago',
        type: 'promo',
        read: true,
    },
    {
        id: '3',
        title: 'Menu Update',
        message: 'We have updated our menu for next week. Check it out now!',
        time: '1 day ago',
        type: 'info',
        read: true,
    },
];

export const NotificationScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.notificationCard, !item.read && styles.unreadCard]}>
            <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) }]}>
                <Ionicons name={getIconName(item.type)} size={24} color="#fff" />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
    );

    const getIconName = (type) => {
        switch (type) {
            case 'order': return 'fast-food';
            case 'promo': return 'pricetag';
            case 'info': return 'information-circle';
            default: return 'notifications';
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case 'order': return '#4CAF50';
            case 'promo': return '#FF6B35';
            case 'info': return '#2196F3';
            default: return '#999';
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
                <Text style={styles.headerTitle}>Notifications</Text>
            </LinearGradient>

            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
            />
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
    },
    listContent: {
        padding: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    unreadCard: {
        backgroundColor: '#fff9f5',
        borderLeftWidth: 4,
        borderLeftColor: '#FF6B35',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    message: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF6B35',
        marginLeft: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 16,
    },
});
