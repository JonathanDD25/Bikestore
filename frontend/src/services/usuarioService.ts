// src/services/usuarioServices.ts

export interface Usuario {
    id_usuario?: number;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    rol: "Administrador" | "Operario" | "Cliente" | "Inhabilitado";
}

export interface CrearUsuarioDTO {
    nombres: string;
    apellidos: string;
    telefono: string;
    correo: string;
    clave: string;
}

const API_URL = "http://localhost:3000/api/usuarios";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("No auth token found in localStorage");
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

// --------------------------------------------------
// Obtener todos los usuarios
// --------------------------------------------------
export const obtenerUsuario = async (): Promise<Usuario[]> => {
    const res = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error("Error al obtener los usuarios");
    return res.json();
};

// --------------------------------------------------
// Obtener usuario por ID
// --------------------------------------------------
export const obtenerUsuarioPorId = async (id: number): Promise<Usuario> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("Error al obtener el usuario");
    return res.json();
};

// --------------------------------------------------
// Crear usuario nuevo
// --------------------------------------------------
export const crearUsuario = async (usuario: CrearUsuarioDTO): Promise<Usuario> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(usuario),
    });

    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
};

// --------------------------------------------------
// Actualizar usuario existente
// --------------------------------------------------
export const actualizarUsuario = async (
    id: number,
    data: Partial<Usuario>
): Promise<Usuario> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
};

// --------------------------------------------------
// Eliminar usuario
// --------------------------------------------------
export const eliminarUsuario = async (id: number): Promise<any> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error("Error al eliminar usuario");
    return res.json();
};

// --------------------------------------------------
// Inhabilitar usuario (PATCH)
// --------------------------------------------------
export const inhabilitarUsuario = async (id: number): Promise<any> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders()
    });

    if (!res.ok) throw new Error("Error al inhabilitar usuario");
    return res.json();
};
