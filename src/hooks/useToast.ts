import { useToastContext } from "@/components/toast/toast-provider";

export const useToast = () => {
    return useToastContext();
};
