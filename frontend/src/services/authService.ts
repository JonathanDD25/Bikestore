const API_URL = "http://localhost:3000/api/auth";

// --- Tipos ---
export interface LoginCredentials {
    correo: string;
    clave: string;
}

export interface LoginResponse {
    token: string;
    usuario: {
        id_usuario: number;
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
        // Puedes ver detalles si el backend envía mensaje de error
        const errorMessage = await res.text();
        throw new Error(`Error en login: ${errorMessage}`);
    }

    return res.json();
};
