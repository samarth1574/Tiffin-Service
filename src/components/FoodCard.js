import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const FoodCard = ({ item, onPress, showRating = false }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.day}>{item.day}</Text>
                    {showRating && item.rating && (
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                    )}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'flex-end',
        padding: 16,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    day: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    rating: {
        color: '#fff',
        marginLeft: 4,
        fontWeight: '600',
    },
});
