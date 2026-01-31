import { create } from "zustand";
import { getToken, saveToken, removeToken } from "@/utils/storage";

interface AuthState {
    token: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    hydrate: () => Promise<void>;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
    token: null,
    isLoading: true,
    isLoggedIn: false,

    hydrate: async () => {
        const token = await getToken();
        set({ token, isLoading: false, isLoggedIn: !!token });
    },

    login: async (token: string) => {
        await saveToken(token);
        set({ token, isLoggedIn: true });
    },

    logout: async () => {
        await removeToken();
        set({ token: null, isLoggedIn: false });
    },
}));
