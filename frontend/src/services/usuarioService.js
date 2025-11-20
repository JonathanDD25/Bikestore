const API_URL = "http://localhost:3000/api/usuarios";

export const obtenerUsuario = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los usuarios");
    return res.json();
};

export const obtenerUsuarioPorId = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el usuario");
    return res.json();
}

export const crearUsuario = async (usuario) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
};

export const actualizarUsuario = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
};

export const eliminarUsuario = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    if (!res.ok) throw new Error("Error al eliminar usuario");
    return res.json();
};

export const inhabilitarUsuario = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {method: "PATCH"})
    if (!res.ok) throw new Error("Error al inhabilitar usuario");
    return res.json();
};