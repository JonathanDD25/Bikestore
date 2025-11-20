const API_URL = "http://localhost:3000/api/pedidos";

export const obtenerPedido = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los pedidos");
    return res.json();
};

export const obtenerPedidoPorId = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el pedido");
    return res.json();
}

export const agregarPedido = async (pedido) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pedido),
    });
    if (!res.ok) throw new Error("Error al crear pedido");
    return res.json();
};

export const actualizarPedido = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar pedido");
    return res.json();
};

export const eliminarPedido = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    if (!res.ok) throw new Error("Error al eliminar pedido");
    return res.json();
};