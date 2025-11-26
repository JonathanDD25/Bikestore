import { CrudController } from "./crud.controller.js";

const crud = new CrudController();
const tabla = 'detalle_pedido';

export class DetallePedidoController {

    async obtenerDetallePedido(req, res) {
        try {
            const nuevoDetallePedido = await crud.obtenerTodos(tabla);
            res.json(nuevoDetallePedido);
        } catch (error) {
            console.error("Error al obtener los detalles de los pedidos:", error);
            res.status(500).json({
                message: "Error al obtener los detalles de los pedidos",
                error
            });
        }
    }

    async obtenerDetallePedidoPorId(req, res) {
        try {
            const dato = await crud.obtenerUno(
                tabla,
                {
                    id_pedido: req.params.id_pedido,
                    id_producto: req.params.id_producto
                }
            );

            res.json(dato);

        } catch (error) {
            res.status(500).json({
                error: error.message || "Error al obtener los detalles de los pedidos"
            });
        }
    }

    async agregarDetallePedido(req, res) {
        try {
            console.log("➡️ BODY recibido en detalle_pedido:", req.body);

            const ids = {
                id_pedido: req.body.id_pedido,
                id_producto: req.body.id_producto
            };

            const nuevoDato = await crud.crear(tabla, ids, req.body);
            res.status(201).json(nuevoDato);

        } catch (error) {
            console.error("Error al crear el detalle del pedido:", error);
            res.status(500).json({
                error: error.message || "Error al crear el detalle del pedido"
            });
        }
    }

    async actualizarDetallePedido(req, res) {
        try {
            const ids = {
                id_pedido: req.params.id_pedido,
                id_producto: req.params.id_producto
            };

            const datoActualizado = await crud.actualizar(
                tabla,
                ids,
                req.body
            );

            res.json(datoActualizado);

        } catch (error) {
            console.error("Error al actualizar el detalle del pedido:", error);
            res.status(500).json({
                error: error.message || "Error al actualizar el detalle del pedido"
            });
        }
    }

    async eliminarDetallePedido(req, res) {
        try {
            const ids = {
                id_pedido: req.params.id_pedido,
                id_producto: req.params.id_producto
            };

            const resultado = await crud.eliminar(tabla, ids);

            res.json(resultado);

        } catch (error) {
            if (error.message.includes("Registro no encontrado")) {
                return res.status(404).json({ error: "Detalle del pedido no encontrado" });
            }
            console.error("Error al eliminar el detalle del pedido:", error);
            res.status(500).json({
                error: "Error al eliminar el detalle del pedido: " + error.message
            });
        }
    }
}
