const API_URL = "http://localhost:3000/api/detalle_pedido";

export const obtenerDetallePedido = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los detalles de los pedidos");
    return res.json();
};

export const obtenerDetallePedidoPorId = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el detalle de pedido");
    return res.json();
}

export const agregarDetallePedido = async (det_pedido) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(det_pedido),
    });
    if (!res.ok) throw new Error("Error al crear el detalle de pedido");
    return res.json();
};

export const actualizarDetallePedido = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar el detalle de pedido");
    return res.json();
};

export const eliminarDetallePedido = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {method: "DELETE"});
    if (!res.ok) throw new Error("Error al eliminar el detalle de pedido");
    return res.json();
};