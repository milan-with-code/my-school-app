import { ToastOptions } from "@/types/toast.types";
import React from "react";
import { Animated } from "react-native";
import Toast from "./toast";

interface ToastContextProps {
    showToast: (options: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastContextProps | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = React.useState<ToastOptions | null>(null);
    const opacity = React.useRef(new Animated.Value(0)).current;

    const showToast = React.useCallback(
        ({
            message,
            type = "info",
            position = "bottom",
            duration = 2000,
        }: ToastOptions) => {
            setToast({ message, type, position });

            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => setToast(null));
            }, duration);
        },
        [opacity]
    );

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Animated.View
                    pointerEvents="none"
                    style={{
                        opacity,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Toast
                        message={toast.message}
                        type={toast.type!}
                        position={toast.position!}
                    />
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = React.useContext(ToastContext);
    if (!context) throw new Error("useToast must be used inside ToastProvider");
    return context;
};
