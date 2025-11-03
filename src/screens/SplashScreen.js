import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';

export const SplashScreen = ({ navigation }) => {
    const { isLoggedIn, isLoading } = useApp();

    useEffect(() => {
        if (!isLoading) {
            if (isLoggedIn) {
                navigation.replace('Main');
            } else {
                navigation.replace('Login');
            }
        }
    }, [isLoading, isLoggedIn, navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomeTiffin</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
});
