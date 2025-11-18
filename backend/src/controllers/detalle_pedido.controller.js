import express from "express";
import { CrudController } from "./crud.controller.js";

const router = express.Router();
const crud = new CrudController();

const tabla = 'detalle_pedido';
export class DetallePedidoController {
    async obtenerDetallePedido(req, res) {
        try {
            const nuevoDetallepedido = await crud.obtenerTodos(tabla, { id_pedido: req.params.id_pedido, id_producto: req.params.id_producto }, req.body);
        res.status(201).json(nuevoDetallepedido);
        } catch (error) {
            console.error("Error al obtener los detalles de los pedidos:", error);
            res.status(500).json({
                message: "Error al obtener los detalles de los pedidos",
                error });
            }
        };


    async obtenerDetallePedidoPorId(req, res) {
        try {
            const datoActualizado = await crud.obtenerUno(tabla, 
            { id_pedido: req.params.id_pedido, id_producto: req.params.id_producto }, req.body);
        res.json(datoActualizado);

            res.json(dato);
        } catch (error) {
            res.status(500).json({
                error: error.message || "Error al obtener los detalles de los pedidos"
            });
        }
    }

    async agregarDetallePedido(req, res) {
        try {
            const nuevoDato = await crud.crear(tabla, { id_pedido: req.params.id_pedido, id_producto: req.params.id_producto }, req.body);
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
            const datoActualizado = await crud.actualizar(tabla, 
            { id_pedido: req.params.id_pedido, id_producto: req.params.id_producto }, req.body);
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
            const id = req.params.id;
        const resultado = await crud.eliminar(tabla, 
            { id_pedido: req.params.id_pedido, id_producto: req.params.id_producto });
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
};