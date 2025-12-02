import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const registerForPushNotifications = async () => {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF6B35',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
    }

    // For development, we'll just return a dummy token
    // In production, you'd get the actual Expo push token
    token = 'ExponentPushToken[dummy-token-for-development]';

    return token;
};

export const scheduleLocalNotification = async (title, body, data = {}, trigger = null) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
            data,
            sound: true,
        },
        trigger: trigger || { seconds: 1 },
    });
};

// Notification templates
export const sendOrderConfirmation = async (orderId) => {
    await scheduleLocalNotification(
        '🎉 Order Confirmed!',
        `Your order #${orderId} has been confirmed. We're preparing your delicious meal!`,
        { type: 'order_confirmed', orderId }
    );
};

export const sendPreparingNotification = async (orderId) => {
    await scheduleLocalNotification(
        '👨‍🍳 Preparing Your Meal',
        `Your order #${orderId} is being freshly prepared with love!`,
        { type: 'preparing', orderId }
    );
};

export const sendOutForDeliveryNotification = async (orderId, deliveryPartner) => {
    await scheduleLocalNotification(
        '🚴 Out for Delivery!',
        `${deliveryPartner} is on the way with your order #${orderId}. ETA: 20 mins`,
        { type: 'out_for_delivery', orderId }
    );
};

export const sendDeliveredNotification = async (orderId) => {
    await scheduleLocalNotification(
        '✅ Order Delivered!',
        `Your order #${orderId} has been delivered. Enjoy your meal! 🍽️`,
        { type: 'delivered', orderId }
    );
};

export const sendSubscriptionRenewalReminder = async (daysLeft) => {
    await scheduleLocalNotification(
        '⏰ Subscription Renewal Reminder',
        `Your subscription will renew in ${daysLeft} days. Make sure your payment method is up to date!`,
        { type: 'renewal_reminder' },
        { seconds: 60 * 60 * 24 } // 24 hours
    );
};

export const sendSpecialOffer = async (offerTitle, offerDetails) => {
    await scheduleLocalNotification(
        `🎁 ${offerTitle}`,
        offerDetails,
        { type: 'special_offer' }
    );
};

export const sendPauseConfirmation = async () => {
    await scheduleLocalNotification(
        '⏸️ Subscription Paused',
        'Your subscription has been paused. You can resume it anytime from your profile.',
        { type: 'subscription_paused' }
    );
};

export const sendResumeConfirmation = async () => {
    await scheduleLocalNotification(
        '▶️ Subscription Resumed',
        'Welcome back! Your subscription has been resumed. Fresh meals coming your way!',
        { type: 'subscription_resumed' }
    );
};
