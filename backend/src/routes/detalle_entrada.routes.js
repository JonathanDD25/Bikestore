import express from "express";
import { DetalleEntradaController } from "../controllers/detalle_entrada.controller.js";

const router = express.Router();
const detalle_entradaController = new DetalleEntradaController();

const tabla = 'detalle_entrada';

//Rutas para operaciones CRUD
router.get("/", (req, res) => detalle_entradaController.obtenerDetalleEntrada(req, res));
router.get("/:id_entrada/:id_producto", (req, res) => detalle_entradaController.obtenerDetalleEntradaPorId(req, res));
router.post("/", (req, res) => detalle_entradaController.agregarDetalleEntrada(req, res));
router.put("/:id_entrada/:id_producto", (req, res) => detalle_entradaController.actualizarDetalleEntrada(req, res));
router.delete("/:id_entrada/:id_producto", (req, res) => detalle_entradaController.eliminarDetalleEntrada(req, res));

export default router;