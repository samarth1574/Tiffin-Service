import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [mealPreference, setMealPreference] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedPlan = await AsyncStorage.getItem('subscriptionPlan');
      const storedPref = await AsyncStorage.getItem('mealPreference');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedPlan) setSubscriptionPlan(storedPlan);
      if (storedPref) setMealPreference(JSON.parse(storedPref));
    } catch (e) {
      console.error('Failed to load data', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (phone: string, email: string) => {
    const newUser = { name: 'User', phone, email };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    setSubscriptionPlan(null);
    setMealPreference(null);
    await AsyncStorage.multiRemove(['user', 'subscriptionPlan', 'mealPreference']);
  };

  const updateSubscription = async (plan) => {
    setSubscriptionPlan(plan);
    if (plan) {
      await AsyncStorage.setItem('subscriptionPlan', plan);
    } else {
      await AsyncStorage.removeItem('subscriptionPlan');
    }
  };

  const updateMealPreference = async (type, time) => {
    const pref = { type, time };
    setMealPreference(pref);
    await AsyncStorage.setItem('mealPreference', JSON.stringify(pref));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        subscriptionPlan,
        mealPreference,
        login,
        logout,
        updateSubscription,
        updateMealPreference,
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
