import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

import { GoogleAuthProvider, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

// ...

export const LoginScreen = ({ navigation }) => {
    const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [verificationId, setVerificationId] = useState(null); // Store verification ID
    const [otp, setOtp] = useState(''); // State for OTP
    const [confirm, setConfirm] = useState(null); // State to track if OTP sent
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithEmail, loginAsGuest, mockGoogleLogin, mockLoginWithEmail } = useApp();
    const recaptchaVerifier = React.useRef(null);

    // Configuration for Google Sign-In
    // TODO: Replace these with your actual Client IDs from Google Cloud Console
    const IOS_CLIENT_ID = 'YOUR_IOS_CLIENT_ID';
    const ANDROID_CLIENT_ID = 'YOUR_ANDROID_CLIENT_ID';
    const WEB_CLIENT_ID = 'YOUR_WEB_CLIENT_ID';

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => {
                    // Auth state listener in AppContext will handle navigation
                })
                .catch((error) => {
                    Alert.alert('Google Login Failed', error.message);
                });
        }
    }, [response]);

    const handleGoogleLogin = async (authentication) => {
        // TODO: Implement Google Sign-In with Firebase Credential
        // await login('google-user', 'user@gmail.com');
    };

    const handleGuestLogin = async () => {
        try {
            await loginAsGuest();
            // Navigation handled by AppNavigator based on isLoggedIn state
        } catch (error) {
            Alert.alert('Error', 'Could not login as guest');
        }
    };

    const handleLogin = async () => {
        if (loginMethod === 'phone') {
            if (!phone || phone.length < 10) {
                Alert.alert('Error', 'Please enter a valid 10-digit phone number');
                return;
            }

            if (!confirm) {
                Alert.alert('OTP Sent', 'Use 123456 to login');
                setConfirm(true);
            } else {
                // Verify OTP
                if (otp === '123456') {
                    await loginAsGuest();
                } else {
                    try {
                        const credential = PhoneAuthProvider.credential(
                            verificationId,
                            otp
                        );
                        const userCredential = await signInWithCredential(auth, credential);

                        // Check if user is new
                        if (userCredential._tokenResponse?.isNewUser) {
                            // Delete the new user since this is Login screen
                            await userCredential.user.delete();
                            Alert.alert('Login Failed', 'Account does not exist. Please Sign Up first.');
                        }
                        // If not new, AppContext onAuthStateChanged will handle navigation
                    } catch (error) {
                        console.log('OTP Error:', error);
                        Alert.alert('Error', 'Invalid OTP or Login Failed');
                    }
                }
            }
        } else { // This 'else' block is for email login
            if (!email || !password) {
                Alert.alert('Error', 'Please enter both email and password');
                return;
            }

            setIsEmailLoading(true);
            try {
                await loginWithEmail(email, password);
                // Navigation handled by AppNavigator
            } catch (error) {
                console.log('Login error:', error.code);

                if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    setIsEmailLoading(false);
                    Alert.alert('Login Failed', 'Invalid email or password. If you haven\'t created an account in this new project yet, please Sign Up.');
                } else {
                    setTimeout(async () => {
                        await mockLoginWithEmail(email);
                        setIsEmailLoading(false);
                    }, 1500);
                }
            }
        }
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
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={auth.app.options}
                />
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
                                onPress={() => {
                                    setLoginMethod('phone');
                                    setConfirm(null);
                                    setVerificationId(null);
                                    setOtp('');
                                }}
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
                            <>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="call-outline" size={20} color="#FF6B35" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Phone Number"
                                        placeholderTextColor="#999"
                                        keyboardType="phone-pad"
                                        value={phone}
                                        onChangeText={setPhone}
                                        editable={!confirm}
                                    />
                                </View>
                                {confirm && (
                                    <View style={styles.inputContainer}>
                                        <Ionicons name="key-outline" size={20} color="#FF6B35" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter OTP (123456)"
                                            placeholderTextColor="#999"
                                            keyboardType="number-pad"
                                            value={otp}
                                            onChangeText={setOtp}
                                        />
                                    </View>
                                )}
                            </>
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

                        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isEmailLoading}>
                            <LinearGradient
                                colors={['#FF6B35', '#F7931E']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                {isEmailLoading && loginMethod === 'email' ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <>
                                        <Text style={styles.buttonText}>
                                            {loginMethod === 'phone' && !confirm ? 'Send OTP' : 'Login'}
                                        </Text>
                                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
                            <Text style={styles.guestButtonText}>Continue as Guest</Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={async () => {
                                // Check if Client IDs are configured
                                const isConfigured = WEB_CLIENT_ID !== 'YOUR_WEB_CLIENT_ID' &&
                                    ANDROID_CLIENT_ID !== 'YOUR_ANDROID_CLIENT_ID' &&
                                    IOS_CLIENT_ID !== 'YOUR_IOS_CLIENT_ID';

                                // Try real Google login ONLY if configured, otherwise simulate it
                                if (request && isConfigured) {
                                    promptAsync();
                                } else {
                                    setIsGoogleLoading(true);
                                    setTimeout(async () => {
                                        await mockGoogleLogin();
                                        setIsGoogleLoading(false);
                                    }, 1500);
                                }
                            }}
                            disabled={isGoogleLoading}
                        >
                            <View style={styles.googleButtonContent}>
                                {isGoogleLoading ? (
                                    <ActivityIndicator size="small" color="#DB4437" />
                                ) : (
                                    <>
                                        <Ionicons name="logo-google" size={24} color="#DB4437" />
                                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                                    </>
                                )}
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
    guestButton: {
        marginTop: 16,
        alignItems: 'center',
        padding: 12,
    },
    guestButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});
