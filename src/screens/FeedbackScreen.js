import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const FeedbackScreen = ({ route, navigation }) => {
    const { orderId } = route.params || { orderId: '12345' };
    const [foodRating, setFoodRating] = useState(0);
    const [deliveryRating, setDeliveryRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        if (foodRating === 0 || deliveryRating === 0) {
            Alert.alert('Rating Required', 'Please rate both food quality and delivery experience');
            return;
        }

        Alert.alert(
            'Thank You!',
            'Your feedback has been submitted successfully. We appreciate your input!',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]
        );
    };

    const renderStars = (rating, setRating, label) => {
        return (
            <View style={styles.ratingSection}>
                <Text style={styles.ratingLabel}>{label}</Text>
                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => setRating(star)}
                            style={styles.starButton}
                        >
                            <Ionicons
                                name={star <= rating ? 'star' : 'star-outline'}
                                size={40}
                                color={star <= rating ? '#FFD700' : '#ccc'}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.ratingText}>
                    {rating === 0 ? 'Tap to rate' : `${rating} ${rating === 1 ? 'star' : 'stars'}`}
                </Text>
            </View>
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
                <Text style={styles.headerTitle}>Rate Your Experience</Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.orderInfo}>
                    <Ionicons name="receipt-outline" size={24} color="#FF6B35" />
                    <Text style={styles.orderText}>Order #{orderId}</Text>
                </View>

                {renderStars(foodRating, setFoodRating, '🍽️ Food Quality')}
                {renderStars(deliveryRating, setDeliveryRating, '🚚 Delivery Experience')}

                <View style={styles.commentSection}>
                    <Text style={styles.commentLabel}>Additional Comments (Optional)</Text>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Tell us more about your experience..."
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        value={comment}
                        onChangeText={setComment}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.quickFeedback}>
                    <Text style={styles.quickFeedbackTitle}>Quick Feedback</Text>
                    <View style={styles.tagsContainer}>
                        {['Delicious', 'On Time', 'Hot & Fresh', 'Good Packaging', 'Polite Delivery'].map((tag) => (
                            <TouchableOpacity key={tag} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.submitButton, (foodRating === 0 || deliveryRating === 0) && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={foodRating === 0 || deliveryRating === 0}
                >
                    <LinearGradient
                        colors={foodRating > 0 && deliveryRating > 0 ? ['#4CAF50', '#45a049'] : ['#ccc', '#ccc']}
                        style={styles.submitGradient}
                    >
                        <Ionicons name="checkmark-circle" size={24} color="#fff" />
                        <Text style={styles.submitText}>Submit Feedback</Text>
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
    orderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        gap: 12,
    },
    orderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    ratingSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
    },
    ratingLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    starButton: {
        padding: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    commentSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    commentLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f8f9fa',
        minHeight: 120,
    },
    quickFeedback: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    quickFeedbackTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tag: {
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    tagText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    submitButton: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    submitButtonDisabled: {
        elevation: 0,
    },
    submitGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        gap: 12,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
