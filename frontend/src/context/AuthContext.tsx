import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { loginRequest } from "../services/authService";

interface AuthContextProps {
    user: any;
    token: string | null;
    login: (credenciales: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    login: async () => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    // --- Mantener sesión iniciada ---
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("usuario");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (credentials: any) => {
        const response = await loginRequest(credentials);

        const usuarioNormalizado = {
            id_usuario: response.usuario.id_usuario,   // 🔥 aquí haces el cambio correcto
            nombres: response.usuario.nombres,
            apellidos: response.usuario.apellidos,
            rol: response.usuario.rol
        };

        setUser(usuarioNormalizado);
        setToken(response.token);

        localStorage.setItem("token", response.token);
        localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
