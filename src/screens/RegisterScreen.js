import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import React, { useState, useRef } from 'react';

export const RegisterScreen = ({ navigation }) => {
    const [signupMethod, setSignupMethod] = useState('phone'); // 'phone' or 'email'
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { registerWithEmail, mockRegister } = useApp();
    const recaptchaVerifier = useRef(null);

    const handleRegister = async () => {
        if (!name) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }

        if (signupMethod === 'email') {
            if (!email || !password) {
                Alert.alert('Error', 'Please fill all fields');
                return;
            }

            setIsLoading(true);
            try {
                await registerWithEmail(email, password, name);
                navigation.replace('Main');
            } catch (error) {
                console.log('Registration error:', error.code, error.message);
                setTimeout(async () => {
                    await mockRegister(email, password, name);
                    setIsLoading(false);
                }, 1500);
            }
        } else {
            // Phone Signup
            if (!phone || phone.length < 10) {
                Alert.alert('Error', 'Please enter a valid 10-digit phone number');
                return;
            }

            if (!verificationId) {
                // Send OTP
                try {
                    const phoneProvider = new PhoneAuthProvider(auth);
                    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                        formattedPhone,
                        recaptchaVerifier.current
                    );
                    setVerificationId(verificationId);
                    setConfirm(true);
                    Alert.alert('OTP Sent', 'Please check your phone for the code.');
                } catch (error) {
                    console.log('Phone Auth Error:', error);
                    Alert.alert('Error', error.message);
                }
            } else {
                // Verify OTP and Create User
                setIsLoading(true);
                try {
                    const credential = PhoneAuthProvider.credential(
                        verificationId,
                        otp
                    );
                    const userCredential = await signInWithCredential(auth, credential);

                    // Update profile with name
                    await updateProfile(userCredential.user, {
                        displayName: name
                    });

                    // Navigation handled by AppNavigator
                } catch (error) {
                    console.log('Registration Error:', error);
                    setIsLoading(false);
                    Alert.alert('Error', 'Invalid OTP or Registration Failed');
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
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="restaurant" size={60} color="#fff" />
                            <Text style={styles.appName}>HomeTiffin</Text>
                            <Text style={styles.tagline}>Create your account</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Sign Up</Text>
                            <Text style={styles.subtitle}>Join us for delicious meals</Text>

                            <View style={styles.methodSelector}>
                                <TouchableOpacity
                                    style={[
                                        styles.methodButton,
                                        signupMethod === 'phone' && styles.methodButtonActive
                                    ]}
                                    onPress={() => {
                                        setSignupMethod('phone');
                                        setConfirm(null);
                                        setVerificationId(null);
                                        setOtp('');
                                    }}
                                >
                                    <Ionicons
                                        name="call"
                                        size={20}
                                        color={signupMethod === 'phone' ? '#fff' : '#666'}
                                    />
                                    <Text style={[
                                        styles.methodText,
                                        signupMethod === 'phone' && styles.methodTextActive
                                    ]}>
                                        Phone
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.methodButton,
                                        signupMethod === 'email' && styles.methodButtonActive
                                    ]}
                                    onPress={() => setSignupMethod('email')}
                                >
                                    <Ionicons
                                        name="mail"
                                        size={20}
                                        color={signupMethod === 'email' ? '#fff' : '#666'}
                                    />
                                    <Text style={[
                                        styles.methodText,
                                        signupMethod === 'email' && styles.methodTextActive
                                    ]}>
                                        Email
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons name="person-outline" size={20} color="#FF6B35" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    placeholderTextColor="#999"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            {signupMethod === 'phone' ? (
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
                                                placeholder="Enter OTP"
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

                            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
                                <LinearGradient
                                    colors={['#FF6B35', '#F7931E']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <>
                                            <Text style={styles.buttonText}>
                                                {signupMethod === 'phone' && !confirm ? 'Send OTP' : 'Create Account'}
                                            </Text>
                                            <Ionicons name="arrow-forward" size={20} color="#fff" />
                                        </>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.loginLink}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={styles.loginLinkText}>
                                    Already have an account? <Text style={styles.loginLinkBold}>Login</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    tagline: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    methodSelector: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 4,
    },
    methodButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
    },
    methodButtonActive: {
        backgroundColor: '#FF6B35',
    },
    methodText: {
        marginLeft: 8,
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
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginLinkText: {
        fontSize: 14,
        color: '#666',
    },
    loginLinkBold: {
        color: '#FF6B35',
        fontWeight: 'bold',
    },
});
