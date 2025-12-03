import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// Notifications disabled for Expo Go compatibility
// import { sendPauseConfirmation, sendResumeConfirmation } from '../utils/notifications';

const AppContext = createContext(undefined);

const STORAGE_KEYS = {
  // USER key is no longer strictly needed for auth persistence as Firebase handles it, 
  // but we might keep it for caching profile data if needed.
  USER: '@user',
  SUBSCRIPTION: '@subscription',
  MEAL_PREFERENCE: '@meal_preference',
  ADDRESSES: '@addresses',
  SUBSCRIPTION_STATUS: '@subscription_status',
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [mealPreference, setMealPreference] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('active');
  const [isLoading, setIsLoading] = useState(true);

  const [activeOrder, setActiveOrder] = useState(null);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Load other user-specific data here if needed
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [subscription, preference, addressData, status, savedOrder] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION),
        AsyncStorage.getItem(STORAGE_KEYS.MEAL_PREFERENCE),
        AsyncStorage.getItem(STORAGE_KEYS.ADDRESSES),
        AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_STATUS),
        AsyncStorage.getItem('@active_order'),
      ]);

      if (subscription) setSubscriptionPlan(JSON.parse(subscription));
      if (preference) setMealPreference(JSON.parse(preference));
      if (addressData) {
        const parsedAddresses = JSON.parse(addressData);
        setAddresses(parsedAddresses);
        const selected = parsedAddresses.find(addr => addr.isDefault);
        if (selected) setSelectedAddress(selected);
      }
      if (status) setSubscriptionStatus(status);
      if (savedOrder) setActiveOrder(JSON.parse(savedOrder));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    }
  };

  const loginAsGuest = async () => {
    const guestUser = {
      uid: 'guest-user-id',
      email: 'guest@hometiffin.com',
      displayName: 'Guest User',
      isGuest: true,
    };
    setUser(guestUser);
    // Optionally save guest state to AsyncStorage if persistence is needed
  };

  const registerWithEmail = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      setUser({ ...userCredential.user, displayName: name });
    } catch (error) {
      console.error("Registration failed: ", error);
      throw error;
    }
  };

  const mockRegister = async (email, password, name) => {
    const newUser = {
      uid: 'mock-user-' + Date.now(),
      email: email,
      displayName: name,
      isGuest: false,
    };
    setUser(newUser);
    // In a real app, we would save this to AsyncStorage or a backend
  };

  const mockLoginWithEmail = async (email) => {
    const mockUser = {
      uid: 'mock-user-' + Date.now(),
      email: email,
      displayName: email.split('@')[0],
      isGuest: false,
    };
    setUser(mockUser);
  };

  const mockGoogleLogin = async () => {
    const googleUser = {
      uid: 'google-user-' + Date.now(),
      email: 'google_user@gmail.com',
      displayName: 'Google User',
      photoURL: 'https://lh3.googleusercontent.com/a/default-user',
      providerId: 'google.com',
      isGuest: false,
    };
    setUser(googleUser);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setSubscriptionPlan(null);
      setMealPreference(null);
      setAddresses([]);
      setSelectedAddress(null);
      setSubscriptionStatus('active');
      setActiveOrder(null);
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.SUBSCRIPTION,
        STORAGE_KEYS.MEAL_PREFERENCE,
        STORAGE_KEYS.ADDRESSES,
        STORAGE_KEYS.SUBSCRIPTION_STATUS,
        '@active_order'
      ]);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const updateSubscription = async (plan) => {
    setSubscriptionPlan(plan);
    if (plan) {
      await AsyncStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(plan));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.SUBSCRIPTION);
    }
  };

  const updateMealPreference = async (type, time) => {
    const preference = { type, time };
    setMealPreference(preference);
    await AsyncStorage.setItem(STORAGE_KEYS.MEAL_PREFERENCE, JSON.stringify(preference));
  };

  const addAddress = async (address) => {
    const newAddress = {
      id: Date.now().toString(),
      ...address,
      isDefault: addresses.length === 0,
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    await AsyncStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(updatedAddresses));
    if (newAddress.isDefault) {
      setSelectedAddress(newAddress);
    }
    return newAddress;
  };

  const updateAddress = async (addressId, updates) => {
    const updatedAddresses = addresses.map(addr =>
      addr.id === addressId ? { ...addr, ...updates } : addr
    );
    setAddresses(updatedAddresses);
    await AsyncStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(updatedAddresses));
    if (updates.isDefault) {
      const newDefault = updatedAddresses.find(addr => addr.id === addressId);
      setSelectedAddress(newDefault);
    }
  };

  const deleteAddress = async (addressId) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setAddresses(updatedAddresses);
    await AsyncStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(updatedAddresses));
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(updatedAddresses.find(addr => addr.isDefault) || updatedAddresses[0] || null);
    }
  };

  const selectAddress = (address) => {
    setSelectedAddress(address);
  };

  const pauseSubscription = async () => {
    setSubscriptionStatus('paused');
    await AsyncStorage.setItem(STORAGE_KEYS.SUBSCRIPTION_STATUS, 'paused');
    // await sendPauseConfirmation();
  };

  const resumeSubscription = async () => {
    setSubscriptionStatus('active');
    await AsyncStorage.setItem(STORAGE_KEYS.SUBSCRIPTION_STATUS, 'active');
    // await sendResumeConfirmation();
  };

  const placeOrder = async (orderDetails) => {
    const newOrder = {
      id: Date.now().toString(),
      status: 0, // 0: Received, 1: Preparing, 2: Out for Delivery, 3: Delivered
      createdAt: new Date().toISOString(),
      estimatedTime: new Date(Date.now() + 45 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // +45 mins
      deliveryPartner: {
        name: 'Rahul Kumar',
        rating: 4.8,
        phone: '9876543210'
      },
      ...orderDetails
    };
    setActiveOrder(newOrder);
    await AsyncStorage.setItem('@active_order', JSON.stringify(newOrder));

    // Simulate order progress
    simulateOrderProgress(newOrder);
  };

  const simulateOrderProgress = (order) => {
    // Move to "Preparing" after 5 seconds
    setTimeout(() => updateOrderStatus(order.id, 1), 5000);
    // Move to "Out for Delivery" after 15 seconds
    setTimeout(() => updateOrderStatus(order.id, 2), 15000);
    // Move to "Delivered" after 30 seconds
    setTimeout(() => updateOrderStatus(order.id, 3), 30000);
  };

  const updateOrderStatus = async (orderId, status) => {
    setActiveOrder(prev => {
      if (prev && prev.id === orderId) {
        const updated = { ...prev, status };
        AsyncStorage.setItem('@active_order', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        subscriptionPlan,
        mealPreference,
        addresses,
        selectedAddress,
        subscriptionStatus,
        activeOrder,
        loginWithEmail,
        loginAsGuest,
        registerWithEmail,
        mockRegister,
        mockLoginWithEmail,
        mockGoogleLogin,
        logout,
        updateSubscription,
        updateMealPreference,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
        pauseSubscription,
        resumeSubscription,
        placeOrder,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

