import React from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { GraduationCap, Lock, Phone } from "lucide-react-native";
import ScreenWrapper from "@/components/layout/screen-wrapper";
import Button from "@/components/ui/button";
import Input from "@/components/ui/text-input";
import { Typography } from "@/constants/typography";
import Card from "@/components/ui/card";
import { Colors } from "@/constants/colors";
import { useToast } from "@/hooks/useToast";
import { useFormValidation, hasFormErrors } from "@/hooks/useFormValidation";
import { loginUser } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function LoginScreen() {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        formValues,
        errors,
        touchedFields,
        updateField,
        validateAllFields,
        touchField,
        resetForm,
    } = useFormValidation<{ mobileNumber: string; password: string }>(
        {
            mobileNumber: "",
            password: "",
        },
        { validateOnChange: true }
    );

    const handleLoginUser = async () => {
        const { mobileNumber, password } = formValues;

        if (!mobileNumber || !password) {
            showToast({
                message: "Please fill in all fields",
                type: "error",
                position: "top",
            });
            return;
        }

        const isValid = validateAllFields(["mobileNumber", "password"]);

        if (!isValid) {
            showToast({
                message: "Please fix the errors below",
                type: "error",
                position: "top",
            });
            return;
        }

        try {
            setIsLoading(true);

            const res = await loginUser({
                phoneNumber: formValues.mobileNumber,
                password: formValues.password,
            });

            const token = res.token;

            await useAuthStore.getState().login(token);

            showToast({
                message: "Login successful 🎉",
                type: "success",
                position: "top",
            });

        } catch (error: any) {

            console.log('error', error)
            showToast({
                message:
                    error?.response?.data?.message ||
                    "Something went wrong. Please try again",
                type: "error",
                position: "top",
            });
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <ScreenWrapper keyboardAvoiding>
            <View style={styles.header}>
                <View style={styles.logoCircle}>
                    <GraduationCap size={48} color={Colors.white} strokeWidth={2} />
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
                    value={formValues.mobileNumber}
                    onChangeText={(text) => updateField("mobileNumber", text)}
                    onBlur={() => touchField("mobileNumber")}
                    keyboardType="phone-pad"
                    error={
                        touchedFields.has("mobileNumber") ? errors.mobileNumber || "" : ""
                    }
                    leftIcon={<Phone size={20} color={Colors.textSecondary} />}
                    maxLength={10}
                />

                <Input
                    placeholder="Password"
                    value={formValues.password}
                    onChangeText={(text) => updateField("password", text)}
                    onBlur={() => touchField("password")}
                    secureTextEntry
                    autoCapitalize="none"
                    error={
                        touchedFields.has("password") ? errors.password || "" : ""
                    }
                    leftIcon={<Lock size={20} color={Colors.textSecondary} />}
                />

                <Pressable style={styles.forgotPassword}>
                    <Text style={[Typography.medium, styles.forgotPasswordText]}>
                        Forgot Password?
                    </Text>
                </Pressable>

                <Button
                    title={isLoading ? "Logging in..." : "Login"}
                    onPress={handleLoginUser}
                    disabled={isLoading || hasFormErrors(errors) || !formValues.mobileNumber || !formValues.password}
                />

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
        color: Colors.white,
        marginBottom: 4,
    },
    subtitle: {
        color: "#94A3B8",
    },
    formContainer: {
        flex: 1,
        backgroundColor: Colors.white,
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
