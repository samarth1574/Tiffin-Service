import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../utils/dummyData';
import { FoodCard } from '../components/FoodCard';

export const HomeScreen = ({ navigation }) => {
    const { subscriptionPlan, user } = useApp();

    const todaySpecial = MENU_ITEMS[new Date().getDay()];

    const renderItem = ({ item }) => (
        <FoodCard item={item} showRating={true} onPress={() => navigation.navigate('MenuDetail')} />
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}!</Text>
                        <Text style={styles.subtitle}>What would you like to eat today?</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {subscriptionPlan && (
                    <View style={styles.statusBanner}>
                        <LinearGradient
                            colors={['#4CAF50', '#45a049']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.statusGradient}
                        >
                            <Ionicons name="checkmark-circle" size={24} color="#fff" />
                            <Text style={styles.statusText}>
                                Active {subscriptionPlan} Plan
                            </Text>
                        </LinearGradient>
                    </View>
                )}

                {todaySpecial && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="star" size={24} color="#FF6B35" />
                            <Text style={styles.sectionTitle}>Today's Special</Text>
                        </View>
                        <FoodCard item={todaySpecial} showRating={true} />
                        <View style={styles.mealDetails}>
                            <View style={styles.mealItem}>
                                <Ionicons name="sunny" size={20} color="#FF6B35" />
                                <Text style={styles.mealLabel}>Lunch</Text>
                                <Text style={styles.mealText}>{todaySpecial.lunch}</Text>
                            </View>
                            <View style={styles.mealItem}>
                                <Ionicons name="moon" size={20} color="#FF6B35" />
                                <Text style={styles.mealLabel}>Dinner</Text>
                                <Text style={styles.mealText}>{todaySpecial.dinner}</Text>
                            </View>
                        </View>
                    </View>
                )}

                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Weekly Menu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('MenuDetail')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={MENU_ITEMS}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                </View>

                {!subscriptionPlan && (
                    <TouchableOpacity
                        style={styles.subscribeButton}
                        onPress={() => navigation.navigate('Subscription')}
                    >
                        <LinearGradient
                            colors={['#FF6B35', '#F7931E']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.subscribeGradient}
                        >
                            <Ionicons name="rocket" size={24} color="#fff" />
                            <Text style={styles.subscribeText}>Subscribe Now</Text>
                            <Ionicons name="arrow-forward" size={24} color="#fff" />
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
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginTop: 4,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    statusBanner: {
        marginTop: 20,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    statusGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    statusText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginTop: 24,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    mealDetails: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginTop: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    mealItem: {
        marginBottom: 16,
    },
    mealLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
        marginBottom: 4,
    },
    mealText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    subscribeButton: {
        marginVertical: 24,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    subscribeGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 12,
    },
    subscribeText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
