import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../services/authService";
import type { LoginCredentials, LoginResponse } from "../services/authService";

interface AuthContextProps {
    user: any;
    token: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    // 🔥 Cargar sesión al iniciar la app
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) setToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    // 🔥 LOGIN
    const login = async (credentials: LoginCredentials) => {
        const response: LoginResponse = await loginRequest(credentials);

        setToken(response.token);
        setUser(response.usuario);

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.usuario));
    };

    // 🔥 LOGOUT
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
};
