import { Colors } from "@/constants/colors";
import { ToastPosition, ToastType } from "@/types/toast.types";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    message: string;
    type: ToastType;
    position: ToastPosition;
}

const backgroundMap = {
    success: "#16a34a",
    error: "#dc2626",
    info: "#2563eb",
};

export default function Toast({ message, type, position }: Props) {
    return (
        <View style={[styles.container, styles[position], { backgroundColor: backgroundMap[type] }]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignSelf: "center",
        maxWidth: "90%",
        zIndex: 9999,
    },
    text: {
        color: Colors.white,
        fontSize: 14,
        textAlign: "center",
        fontWeight: "500",
    },
    top: {
        top: 60,
    },
    center: {
        top: "45%",
    },
    bottom: {
        bottom: 80,
    },
});
