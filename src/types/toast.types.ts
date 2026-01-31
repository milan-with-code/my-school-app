export type ToastType = "success" | "error" | "info";
export type ToastPosition = "top" | "center" | "bottom";

export interface ToastOptions {
    message: string;
    type?: ToastType;
    position?: ToastPosition;
    duration?: number;
}
