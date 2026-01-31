import { UserRole } from "./user.types";

export interface LoginPayload {
    phoneNumber: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    phoneNumber: string;
    password: string;
    role: UserRole;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        role: UserRole;
    };
}
