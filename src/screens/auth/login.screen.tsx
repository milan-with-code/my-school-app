import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GraduationCap, Lock, Phone } from "lucide-react-native";
import ScreenWrapper from "@/components/layout/screen-wrapper";
import Button from "@/components/ui/button";
import Input from "@/components/ui/text-input";
import { Typography } from "@/constants/typography";
import Card from "@/components/ui/card";
import { Colors } from "@/constants/colors";

export default function LoginScreen() {
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <ScreenWrapper keyboardAvoiding>
            <View style={styles.header}>
                <View style={styles.logoCircle}>
                    <GraduationCap size={48} color="#fff" strokeWidth={2} />
                </View>

                <Text style={[Typography.heading, styles.appTitle]}>
                    SchoolConnect
                </Text>

                <Text style={[Typography.body, styles.subtitle]}>
                    Parent Portal
                </Text>
            </View>

            <Card>
                <Text style={[Typography.heading, styles.welcomeText]}>
                    Welcome Back!
                </Text>

                <Text style={[Typography.body, styles.loginText]}>
                    Login to view your child's homework
                </Text>

                <Input
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="phone-pad"
                    leftIcon={<Phone size={20} color={Colors.textSecondary} />}
                />

                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    leftIcon={<Lock size={20} color={Colors.textSecondary} />}
                />

                <Pressable style={styles.forgotPassword}>
                    <Text style={[Typography.medium, styles.forgotPasswordText]}>
                        Forgot Password?
                    </Text>
                </Pressable>

                <Button title="Login" onPress={() => console.log("Login pressed")} />

                <View style={styles.footer}>
                    <Text style={[Typography.body, styles.footerText]}>
                        Don't have an account?
                    </Text>
                    <Pressable>
                        <Text style={[Typography.medium, styles.footerLink]}>
                            Contact School Admin
                        </Text>
                    </Pressable>
                </View>
            </Card>

            <View style={styles.bottomInfo}>
                <Text style={[Typography.small, styles.versionText]}>
                    Version 1.0.0
                </Text>
                <Text style={[Typography.small, styles.poweredText]}>
                    Powered by SchoolConnect SaaS
                </Text>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 20,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#3B82F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    appTitle: {
        color: "#fff",
        marginBottom: 4,
    },
    subtitle: {
        color: "#94A3B8",
    },
    formContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        marginTop: 20,
    },
    welcomeText: {
        color: "#0F172A",
        marginBottom: 8,
    },
    loginText: {
        color: "#64748B",
        marginBottom: 24,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#3B82F6",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        gap: 6,
    },
    footerText: {
        color: "#64748B",
    },
    footerLink: {
        color: "#3B82F6",
    },
    bottomInfo: {
        alignItems: "center",
        paddingVertical: 20,
    },
    versionText: {
        color: "#94A3B8",
    },
    poweredText: {
        color: "#64748B",
    },
});
