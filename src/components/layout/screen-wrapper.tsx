import React from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";

type ScreenWrapperProps = {
    children: React.ReactNode;

    /** Enable / Disable scroll */
    scroll?: boolean;

    /** Custom background color */
    backgroundColor?: string;

    /** Content padding */
    paddingHorizontal?: number;

    /** Safe area edges */
    safeEdges?: ("top" | "bottom" | "left" | "right")[];

    /** Keyboard handling */
    keyboardAvoiding?: boolean;
};

export default function ScreenWrapper({
    children,
    scroll = true,
    backgroundColor = Colors.background,
    paddingHorizontal = Spacing.lg,
    safeEdges = ["top"],
    keyboardAvoiding = false,
}: ScreenWrapperProps) {
    const ContentWrapper = scroll ? ScrollView : View;

    const content = (
        <ContentWrapper
            style={[
                styles.content,
                { paddingHorizontal, backgroundColor },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {children}
        </ContentWrapper>
    );

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor }]} edges={safeEdges}>
            {keyboardAvoiding ? (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    {content}
                </KeyboardAvoidingView>
            ) : (
                content
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
    },
});
