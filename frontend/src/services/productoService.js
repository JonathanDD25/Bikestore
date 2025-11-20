const API_URL = "http://localhost:3000/api/productos";

export const obtenerProducto = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los productos");
    return res.json();
};

export const obtenerProductoPorId = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el producto");
    return res.json();
}

export const agregarProducto = async (producto) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(producto),
    });
    if (!res.ok) throw new Error("Error al crear producto");
    return res.json();
};

export const actualizarProducto = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar producto");
    return res.json();
};

export const eliminarProducto = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    if (!res.ok) throw new Error("Error al eliminar producto");
    return res.json();
};