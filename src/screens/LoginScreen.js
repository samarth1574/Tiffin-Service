import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useApp();

    const handleLogin = async () => {
        if (!phone || !email) {
            Alert.alert('Error', 'Please enter both phone and email');
            return;
        }
        await login(phone, email);
        navigation.replace('Main');
    };

    return (
        <LinearGradient
            colors={['#FF6B35', '#F7931E']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="restaurant" size={80} color="#fff" />
                        <Text style={styles.appName}>HomeTiffin</Text>
                        <Text style={styles.tagline}>Fresh homemade food, delivered daily</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>Login to continue</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="call-outline" size={20} color="#FF6B35" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#FF6B35" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <LinearGradient
                                colors={['#FF6B35', '#F7931E']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                                <Ionicons name="arrow-forward" size={20} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    appName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
    },
    tagline: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginTop: 8,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#f8f9fa',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        padding: 16,
        fontSize: 16,
        color: '#333',
    },
    button: {
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
