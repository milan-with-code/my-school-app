import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ActivityIndicator } from 'react-native';
import { ToastProvider } from '@/components/toast/toast-provider';
import { useAuthStore } from '@/store/auth.store';
import React from 'react';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

    const { hydrate, isLoading, isLoggedIn } = useAuthStore();

    React.useEffect(() => {
        hydrate();
    }, [])

    if (!fontsLoaded || isLoading) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }

    return (
        <ToastProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(tabs)" />
                </Stack.Protected>
                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
            </Stack>
        </ToastProvider>
    )
}
