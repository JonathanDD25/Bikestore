import { agregarPedido } from "./pedidoService";
import type { Pedido } from "./pedidoService";

import { agregarDetallePedido } from "./detallePedidoService";
import type { DetallePedido } from "./detallePedidoService";

import type { CartItem } from "../cart/cart";


export const realizarCompra = async (
    userId: number,
    cartItems: CartItem[]
) => {
    if (cartItems.length === 0) {
        throw new Error("El carrito está vacío");
    }

    try {
        // 1️⃣ Calcular total del pedido
        const precio_total = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        // 2️⃣ Crear el pedido
        const pedido: Pedido = {
            id_usuario: userId,
            precio_total
        };
        console.log("Pedido que recibe el backend:", pedido);
        const pedidoCreado = await agregarPedido(pedido);
        console.log("Pedido que devuelve el backend:", pedidoCreado);
        const id_pedido = pedidoCreado.id_pedido!;
        console.log("ID Pedido creado:", id_pedido);

        // 3️⃣ Crear cada detalle del pedido
        for (const item of cartItems) {
            const detalle: DetallePedido = {
                id_pedido: id_pedido,
                id_producto: item.id,
                cantidad: item.quantity,
                precio_unitario: item.price
            };

            console.log("📦 Enviando detalle:", detalle);

            await agregarDetallePedido(detalle);
        }

        return {
            success: true,
            message: "Compra realizada con éxito",
            id_pedido
        };

    } catch (error: any) {
        console.error("Error al realizar la compra:", error);
        throw new Error(error.message || "Error al procesar la compra");
    }
};
