import express from "express";
import { DetallePedidoController } from "../controllers/detalle_pedido.controller.js";

const router = express.Router();
const detalle_pedidoController = new DetallePedidoController();

const tabla = 'pedido';

//Rutas para operaciones CRUD
router.get("/", (req, res) => detalle_pedidoController.obtenerDetallePedido(req, res));
router.get("/:id_pedido/:id_producto", (req, res) => detalle_pedidoController.obtenerDetallePedidoPorId(req, res));
router.post("/", (req, res) => detalle_pedidoController.agregarDetallePedido(req, res));
router.put("/:id_pedido/:id_producto", (req, res) => detalle_pedidoController.actualizarDetallePedido(req, res));
router.delete("/:id_pedido/:id_producto", (req, res) => detalle_pedidoController.eliminarDetallePedido(req, res));

export default router;