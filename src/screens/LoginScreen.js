import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }) => {
    const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useApp();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'YOUR_EXPO_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        webClientId: 'YOUR_WEB_CLIENT_ID',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            handleGoogleLogin(authentication);
        }
    }, [response]);

    const handleGoogleLogin = async (authentication) => {
        await login('google-user', 'user@gmail.com');
        navigation.replace('Main');
    };

    const handleLogin = async () => {
        if (loginMethod === 'phone') {
            if (!phone) {
                Alert.alert('Error', 'Please enter your phone number');
                return;
            }
            await login(phone, `${phone}@hometiffin.com`);
        } else {
            if (!email || !password) {
                Alert.alert('Error', 'Please enter both email and password');
                return;
            }
            await login(email, email);
        }
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

                        <View style={styles.methodSelector}>
                            <TouchableOpacity
                                style={[
                                    styles.methodButton,
                                    loginMethod === 'phone' && styles.methodButtonActive
                                ]}
                                onPress={() => setLoginMethod('phone')}
                            >
                                <Ionicons
                                    name="call"
                                    size={20}
                                    color={loginMethod === 'phone' ? '#fff' : '#666'}
                                />
                                <Text style={[
                                    styles.methodText,
                                    loginMethod === 'phone' && styles.methodTextActive
                                ]}>
                                    Phone
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.methodButton,
                                    loginMethod === 'email' && styles.methodButtonActive
                                ]}
                                onPress={() => setLoginMethod('email')}
                            >
                                <Ionicons
                                    name="mail"
                                    size={20}
                                    color={loginMethod === 'email' ? '#fff' : '#666'}
                                />
                                <Text style={[
                                    styles.methodText,
                                    loginMethod === 'email' && styles.methodTextActive
                                ]}>
                                    Email
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {loginMethod === 'phone' ? (
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
                        ) : (
                            <>
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

                                <View style={styles.inputContainer}>
                                    <Ionicons name="lock-closed-outline" size={20} color="#FF6B35" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="#999"
                                        secureTextEntry
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>
                            </>
                        )}

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

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={() => promptAsync()}
                            disabled={!request}
                        >
                            <View style={styles.googleButtonContent}>
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                                <Text style={styles.googleButtonText}>Continue with Google</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.registerLink}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={styles.registerLinkText}>
                                Don't have an account? <Text style={styles.registerLinkBold}>Sign Up</Text>
                            </Text>
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
    methodSelector: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    methodButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#f8f9fa',
        borderWidth: 2,
        borderColor: '#e0e0e0',
        gap: 8,
    },
    methodButtonActive: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
    },
    methodText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    methodTextActive: {
        color: '#fff',
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
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
    },
    googleButton: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 12,
    },
    googleButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerLinkText: {
        fontSize: 14,
        color: '#666',
    },
    registerLinkBold: {
        color: '#FF6B35',
        fontWeight: 'bold',
    },
});
