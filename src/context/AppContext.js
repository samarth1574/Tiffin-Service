import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendPauseConfirmation, sendResumeConfirmation } from '../utils/notifications';

const AppContext = createContext(undefined);

const STORAGE_KEYS = {
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, subscription, preference, addressData, status] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION),
        AsyncStorage.getItem(STORAGE_KEYS.MEAL_PREFERENCE),
        AsyncStorage.getItem(STORAGE_KEYS.ADDRESSES),
        AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_STATUS),
      ]);

      if (userData) setUser(JSON.parse(userData));
      if (subscription) setSubscriptionPlan(JSON.parse(subscription));
      if (preference) setMealPreference(JSON.parse(preference));
      if (addressData) {
        const parsedAddresses = JSON.parse(addressData);
        setAddresses(parsedAddresses);
        const selected = parsedAddresses.find(addr => addr.isDefault);
        if (selected) setSelectedAddress(selected);
      }
      if (status) setSubscriptionStatus(status);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone, email) => {
    const newUser = { name: 'User', phone, email };
    setUser(newUser);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    setSubscriptionPlan(null);
    setMealPreference(null);
    setAddresses([]);
    setSelectedAddress(null);
    setSubscriptionStatus('active');
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER,
      STORAGE_KEYS.SUBSCRIPTION,
      STORAGE_KEYS.MEAL_PREFERENCE,
      STORAGE_KEYS.ADDRESSES,
      STORAGE_KEYS.SUBSCRIPTION_STATUS,
    ]);
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
    await sendPauseConfirmation();
  };

  const resumeSubscription = async () => {
    setSubscriptionStatus('active');
    await AsyncStorage.setItem(STORAGE_KEYS.SUBSCRIPTION_STATUS, 'active');
    await sendResumeConfirmation();
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
        login,
        logout,
        updateSubscription,
        updateMealPreference,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
        pauseSubscription,
        resumeSubscription,
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
