import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { loginRequest } from "../services/authService";
import { obtenerUsuarioPorId } from "../services/usuarioService"

interface AuthContextProps {
    user: any;
    token: string | null;
    loading: boolean;
    login: (credenciales: any) => Promise<void>;
    logout: () => void;
    setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    loading: true,
    login: async () => { },
    logout: () => { },
    setUser: () => { }, // evitar errores
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // --- Mantener sesión iniciada ---
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("usuario");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials: any) => {
        const response = await loginRequest(credentials);

        const usuarioNormalizado = {
            // 🔥 CORRECCIÓN: Usar 'response.usuario.id' para mapearlo a 'id_usuario'
            id_usuario: response.usuario.id,
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
        <AuthContext.Provider value={{ user, token, loading, login, logout,  setUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
