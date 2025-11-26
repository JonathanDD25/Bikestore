const API_URL = "http://localhost:3000/api/detalle_pedido";

export interface DetallePedido {
    id_pedido: number;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
}

export const obtenerDetallePedido = async (): Promise<DetallePedido[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los detalles de los pedidos");
    return res.json();
};

export const obtenerDetallePedidoPorId = async (
    id_pedido: number,
    id_producto: number
): Promise<DetallePedido> => {
    const res = await fetch(`${API_URL}/${id_pedido}/${id_producto}`);
    if (!res.ok) throw new Error("Error al obtener el detalle de pedido");
    return res.json();
};

export const agregarDetallePedido = async (
    det_pedido: DetallePedido
): Promise<DetallePedido> => {
    console.log("📦 Enviando detalle2:", det_pedido);
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(det_pedido),
    });
    if (!res.ok) throw new Error("Error al crear el detalle de pedido");
    return res.json();
};

export const actualizarDetallePedido = async (
    id_pedido: number,
    id_producto: number,
    data: Partial<DetallePedido>
): Promise<DetallePedido> => {
    const res = await fetch(`${API_URL}/${id_pedido}/${id_producto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar el detalle de pedido");
    return res.json();
};

export const eliminarDetallePedido = async (
    id_pedido: number,
    id_producto: number
): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/${id_pedido}/${id_producto}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el detalle de pedido");
    return res.json();
};
