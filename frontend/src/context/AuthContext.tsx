// src/context/authContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
// ============================================================
//  INTERFAZ DEL USUARIO DEL BACKEND
// ============================================================
export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  rol: string; // viene del backend
}

// ============================================================
//  INTERFAZ DEL CONTEXTO DE AUTENTICACIÓN
// ============================================================
interface AuthContextType {
  user: User | null;
  token: string | null;

  login: (correo: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

// ============================================================
//  CREACIÓN DEL CONTEXTO
// ============================================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================
//  PROVIDER
// ============================================================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null;
  });

  // Guardar datos cuando cambian
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ------------------------------------------------------------
  // LOGIN: consume el API, guarda token y usuario
  // ------------------------------------------------------------
  const login = async (correo: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      if (!response.ok) {
        return { ok: false, error: "Credenciales incorrectas" };
      }

      const data = await response.json();

      setToken(data.token);
      setUser(data.usuario);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Error al conectar con el servidor" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ============================================================
//  CUSTOM HOOK
// ============================================================
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
