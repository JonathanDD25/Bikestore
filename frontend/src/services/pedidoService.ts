const API_URL = "http://localhost:3000/api/pedidos";

export interface Pedido {
    id_pedido?: number;
    fecha_pedido?: string;
    precio_total: number;
    id_usuario: number;
    nombres?: string;
    apellidos?: string;
    correo_cliente?: string;
}

export interface DetallePedido {
    id_pedido: number;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    nombre_producto: string;
    descripcion: string;
}

export interface PedidoConDetalles extends Pedido {
    detalles: DetallePedido[];
}

export const obtenerPedido = async (): Promise<Pedido[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los pedidos");
    return res.json();
};

export const obtenerPedidoPorId = async (id: number): Promise<Pedido> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el pedido");
    return res.json();
};

export const agregarPedido = async (pedido: Pedido): Promise<Pedido> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
    });
    if (!res.ok) throw new Error("Error al crear pedido");
    return res.json();
};

export const actualizarPedido = async (id: number, data: Partial<Pedido>): Promise<Pedido> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar pedido");
    return res.json();
};

export const eliminarPedido = async (id: number): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar pedido");
    return res.json();
};

export const obtenerDetallesDePedido = async (id: number): Promise<PedidoConDetalles> => {
    const res = await fetch(`${API_URL}/${id}/detalles`);
    if (!res.ok) throw new Error("Error al obtener detalles del pedido");
    return res.json();
};