import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";

type Props = {
    title: string;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;
};

export default function Button({
    title,
    onPress,
    loading,
    disabled,
}: Props) {
    return (
        <Pressable
            style={[
                styles.button,
                disabled && { backgroundColor: Colors.border },
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={Colors.white} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: 10,
        alignItems: "center",
    },
    text: {
        color: Colors.white,
        fontWeight: "600",
        fontSize: 15,
    },
});
