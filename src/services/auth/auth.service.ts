import { LoginPayload, LoginResponse, RegisterPayload } from "@/types/auth.types";
import apiClient from "../api/apiClient";
import { API_ENDPOINTS } from "../api/endpoints";

export const loginUser = async (
    payload: LoginPayload
): Promise<LoginResponse> => {
    const response = await apiClient.post(
        API_ENDPOINTS.AUTH.LOGIN,
        payload
    );
    return response.data.data;
};

export const registerUser = async (
    payload: RegisterPayload
): Promise<LoginResponse> => {
    const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        payload
    );
    return response.data;
};
