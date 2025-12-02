import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MENU_ITEMS } from '../utils/dummyData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MenuDetailScreen = ({ navigation }) => {
    const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);

    const selectedMenu = MENU_ITEMS.find(item => item.day === selectedDay);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Weekly Menu</Text>
                <Text style={styles.headerSubtitle}>Choose a day to view details</Text>
            </LinearGradient>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.daysScroll}
                contentContainerStyle={styles.daysContent}
            >
                {DAYS.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayChip,
                            selectedDay === day && styles.selectedDayChip
                        ]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <Text style={[
                            styles.dayChipText,
                            selectedDay === day && styles.selectedDayChipText
                        ]}>
                            {day.substring(0, 3)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {selectedMenu && (
                    <>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: selectedMenu.image }}
                                style={styles.menuImage}
                                resizeMode="cover"
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.7)']}
                                style={styles.imageGradient}
                            >
                                <View style={styles.imageInfo}>
                                    <Text style={styles.dayTitle}>{selectedMenu.day}</Text>
                                    <View style={styles.ratingContainer}>
                                        <Ionicons name="star" size={20} color="#FFD700" />
                                        <Text style={styles.rating}>{selectedMenu.rating}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        <View style={styles.menuDetails}>
                            <View style={styles.mealSection}>
                                <View style={styles.mealHeader}>
                                    <Ionicons name="sunny" size={28} color="#FF6B35" />
                                    <Text style={styles.mealTitle}>Lunch</Text>
                                </View>
                                <View style={styles.mealCard}>
                                    <Text style={styles.mealText}>{selectedMenu.lunch}</Text>
                                </View>
                            </View>

                            <View style={styles.mealSection}>
                                <View style={styles.mealHeader}>
                                    <Ionicons name="moon" size={28} color="#5C6BC0" />
                                    <Text style={styles.mealTitle}>Dinner</Text>
                                </View>
                                <View style={styles.mealCard}>
                                    <Text style={styles.mealText}>{selectedMenu.dinner}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.subscribeButton}
                                onPress={() => navigation.navigate('Main', { screen: 'Subscription' })}
                            >
                                <LinearGradient
                                    colors={['#4CAF50', '#45a049']}
                                    style={styles.subscribeGradient}
                                >
                                    <Ionicons name="calendar" size={24} color="#fff" />
                                    <Text style={styles.subscribeText}>Subscribe to this Plan</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </>
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
    daysScroll: {
        maxHeight: 80,
        marginVertical: 16,
    },
    daysContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    dayChip: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedDayChip: {
        backgroundColor: '#FF6B35',
        elevation: 5,
    },
    dayChipText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    selectedDayChipText: {
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    imageContainer: {
        height: 300,
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    menuImage: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        justifyContent: 'flex-end',
        padding: 20,
    },
    imageInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
    },
    rating: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    menuDetails: {
        padding: 20,
    },
    mealSection: {
        marginBottom: 24,
    },
    mealHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    mealTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    mealCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    mealText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    subscribeButton: {
        marginTop: 16,
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
