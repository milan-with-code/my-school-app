import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ActivityIndicator } from 'react-native';

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
        </Stack>
    )
}
