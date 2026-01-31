import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";

export default function Card({ children }: { children: React.ReactNode }) {
    return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: Spacing.lg,
        borderRadius: 12,
        marginBottom: Spacing.md,
        elevation: 2,
    },
});
