import express from "express";
import { CrudController } from "./crud.controller.js";
import { pool } from '../config/connection.js';

const router = express.Router();
const crud = new CrudController();

const tabla = 'pedido';
export class PedidoController {
    //Rutas para operaciones CRUD
    async obtenerPedido(req, res) {
        try {
            // Modificado para incluir datos del usuario
            const sql = `
                SELECT p.*, u.nombres, u.apellidos, u.correo as correo_cliente
                FROM pedido p
                LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
                ORDER BY p.fecha_pedido DESC
            `;
            const [rows] = await pool.query(sql);
            res.json(rows);
        } catch (error){
            console.error("Error al obtener los pedidos:", error);
            res.status(500).json({ message: "Error al obtener los pedidos", error });
        }
    };

    async obtenerPedidoPorId(req, res) {
        try {
            const dato = await crud.obtenerUno(tabla, {id_pedido: req.params.id});
            res.json(dato);
        } catch (error){
            res.status(500).json({ error: error.message || "Error al obtener el pedido" });
        }
    };

    async obtenerDetallesDePedido(req, res) {
        try {
            const id_pedido = req.params.id;
            // Obtener info del pedido + usuario
            const sqlPedido = `
                SELECT p.*, u.nombres, u.apellidos, u.correo as correo_cliente
                FROM pedido p
                LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
                WHERE p.id_pedido = ?
            `;
            const [pedidoRows] = await pool.query(sqlPedido, [id_pedido]);
            
            if (pedidoRows.length === 0) {
                return res.status(404).json({ message: "Pedido no encontrado" });
            }

            const pedido = pedidoRows[0];

            // Obtener detalles + productos
            const sqlDetalles = `
                SELECT dp.*, pr.nombre as nombre_producto, pr.descripcion
                FROM detalle_pedido dp
                JOIN productos pr ON dp.id_producto = pr.id_producto
                WHERE dp.id_pedido = ?
            `;
            const [detallesRows] = await pool.query(sqlDetalles, [id_pedido]);

            res.json({
                ...pedido,
                detalles: detallesRows
            });

        } catch (error) {
            console.error("Error al obtener detalles del pedido:", error);
            res.status(500).json({ message: "Error al obtener detalles del pedido", error });
        }
    }

    async agregarPedido(req, res) {
        try {
            const nuevoPedido = await crud.crear(tabla, {id_pedido: req.params.id}, req.body);
            res.status(201).json(nuevoPedido);
        } catch (error) {
            console.error("Error al crear el pedido:", error);
            res.status(500).json({ error: error.message || "Error al crear el pedido" });
        }
    };

    async actualizarPedido(req, res) {
        try {
            const datoActualizado = await crud.actualizar(tabla, {id_pedido: req.params.id}, req.body);
            res.json(datoActualizado);
        } catch (error) {
            res.status(500).json({ error: error.message || "Error al actualizar el pedido" });
        }
    };

    async eliminarPedido(req, res) {
        try {
            const id = req.params.id;
            const resultado = await crud.eliminar(tabla, {id_pedido: req.params.id});
            res.json(resultado);
        } catch (error) {
            if (error.message.includes('Registro no encontrado')) {
                res.status(404).json({ error: 'pedido no encontrado' });
            } else {
                res.status(500).json({ error:  "Error al eliminar el pedido" + error.message });
            }
        }
    }
};