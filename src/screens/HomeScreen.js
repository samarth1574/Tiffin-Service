import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../utils/dummyData';

export const HomeScreen = ({ navigation }) => {
    const { subscriptionPlan } = useApp();

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.day}>{item.day}</Text>
            <View style={styles.mealContainer}>
                <Text style={styles.mealTitle}>Lunch:</Text>
                <Text style={styles.mealDesc}>{item.lunch}</Text>
            </View>
            <View style={styles.mealContainer}>
                <Text style={styles.mealTitle}>Dinner:</Text>
                <Text style={styles.mealDesc}>{item.dinner}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Weekly Menu</Text>
            <FlatList
                data={MENU_ITEMS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
            {!subscriptionPlan && (
                <TouchableOpacity
                    style={styles.subscribeButton}
                    onPress={() => navigation.navigate('Subscription')}
                >
                    <Text style={styles.subscribeText}>Subscribe Now</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    list: {
        paddingHorizontal: 15,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    day: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10,
    },
    mealContainer: {
        marginBottom: 8,
    },
    mealTitle: {
        fontWeight: '600',
        color: '#555',
    },
    mealDesc: {
        color: '#777',
    },
    subscribeButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    subscribeText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
