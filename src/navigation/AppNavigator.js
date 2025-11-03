import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SubscriptionScreen } from '../screens/SubscriptionScreen';
import { MealPreferenceScreen } from '../screens/MealPreferenceScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Subscription') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Subscription" component={SubscriptionScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Main" component={MainTabNavigator} />
                <Stack.Screen
                    name="MealPreference"
                    component={MealPreferenceScreen}
                    options={{ headerShown: true, title: 'Preferences' }}
                />
                <Stack.Screen
                    name="Checkout"
                    component={CheckoutScreen}
                    options={{ headerShown: true, title: 'Checkout' }}
                />
                <Stack.Screen
                    name="OrderTracking"
                    component={OrderTrackingScreen}
                    options={{ headerShown: true, title: 'Track Order' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
