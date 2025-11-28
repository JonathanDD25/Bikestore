import express from "express";
import { PedidoController } from "../controllers/pedidos.controller.js";

const router = express.Router();
const pedidoController = new PedidoController();

const tabla = 'pedido';

//Rutas para operaciones CRUD
router.get("/", (req, res) => pedidoController.obtenerPedido(req, res));
router.get("/:id/detalles", (req, res) => pedidoController.obtenerDetallesDePedido(req, res));
router.get("/:id", (req, res) => pedidoController.obtenerPedidoPorId(req, res));
router.post("/", (req, res) => pedidoController.agregarPedido(req, res));
router.put("/:id", (req, res) => pedidoController.actualizarPedido(req, res));
router.delete("/:id", (req, res) => pedidoController.eliminarPedido(req, res));

export default router;