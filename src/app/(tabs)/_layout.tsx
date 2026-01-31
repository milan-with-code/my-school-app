import { Colors } from '@/constants/colors';
import { Tabs } from 'expo-router';
import { Home, BookOpen, MessageCircle, User, Bell } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopWidth: 1,
                    borderTopColor: Colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: "Poppins_500Medium",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ size }) => <Home size={size} />,
                }}
            />

            <Tabs.Screen
                name="homework"
                options={{
                    title: "Homework",
                    tabBarIcon: ({ size }) => <BookOpen size={size} />,
                }}
            />

            <Tabs.Screen
                name="notices"
                options={{
                    title: "Notices",
                    tabBarIcon: ({ size }) => <Bell size={size} />,
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({ size }) => <MessageCircle size={size} />,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ size }) => <User size={size} />,
                }}
            />
        </Tabs>
    );
}
