import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export const GradientBackground = ({ children, colors = ['#FF6B35', '#F7931E'] }) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            {children}
        </LinearGradient>
    );
};
