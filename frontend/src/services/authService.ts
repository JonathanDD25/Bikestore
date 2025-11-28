const API_URL = "http://localhost:3000/api/auth";

// --- Tipos ---
export interface LoginCredentials {
    correo: string;
    clave: string;
}

export interface LoginResponse {
    token: string;
    usuario: {
        id: number;
        nombres: string;
        apellidos: string;
        correo: string;
        telefono: string;
        rol: "Cliente" | "Operario" | "Administrador" | "Inhabilitado";
    };
}

// --- Servicio de Login ---
export const loginRequest = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) {
        try {
            const errorData = await res.json();
            throw new Error(errorData.mensaje || "Error al iniciar sesión");
        } catch (e) {
            // Si no es JSON, leer como texto
            const errorText = await res.text();
            throw new Error(errorText || "Error al iniciar sesión");
        }
    }

    return res.json();
};
