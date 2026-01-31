import { Tabs } from 'expo-router';
import { Home, BookOpen, MessageCircle, User, Bell } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#3B82F6",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB",
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="home"
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
