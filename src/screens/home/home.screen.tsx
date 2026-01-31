import ScreenWrapper from "@/components/layout/screen-wrapper";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { View, Text } from "react-native";

export default function HomeScreen() {
    const { logout } = useAuthStore()
    return (
        <ScreenWrapper>
            <Text>Home</Text>
            <Button title="Button Pressed!" onPress={() => logout()} />
        </ScreenWrapper>
    );
}
