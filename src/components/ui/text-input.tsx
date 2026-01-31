import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TextInputProps,
} from "react-native";
import { Colors } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { Eye, EyeOff } from "lucide-react-native";

type Props = TextInputProps & {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
};

export default function Input({
    label,
    error,
    leftIcon,
    secureTextEntry,
    style,
    ...rest
}: Props) {
    const [isSecure, setIsSecure] = React.useState(secureTextEntry);

    return (
        <View style={{ marginBottom: Spacing.md }}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.inputWrapper,
                    error && { borderColor: Colors.error },
                ]}
            >
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

                <TextInput
                    style={[styles.input, style]}
                    secureTextEntry={isSecure}
                    {...rest}
                />

                {secureTextEntry && (
                    <Pressable
                        onPress={() => setIsSecure(!isSecure)}
                        style={styles.iconRight}
                    >
                        {isSecure ? (
                            <EyeOff size={20} color={Colors.textSecondary} />
                        ) : (
                            <Eye size={20} color={Colors.textSecondary} />
                        )}
                    </Pressable>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 4,
        color: Colors.textSecondary,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.inputBackground,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: Colors.inputBorder,
        paddingHorizontal: 16,
        height: 56,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    error: {
        color: Colors.error,
        marginTop: 4,
        fontSize: 12,
    },
});
