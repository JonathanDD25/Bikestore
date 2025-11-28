import express from "express";
import { Entrada_insumoController } from "../controllers/entrada_insumo.controller.js";

const router = express.Router();
const insumoController = new Entrada_insumoController();

const tabla = 'entrada_insumo';

//Rutas para operaciones CRUD
router.get("/", (req, res) => insumoController.obtenerInsumo(req, res));
router.get("/:id", (req, res) => insumoController.obtenerInsumoporId(req, res));
router.post("/", (req, res) => insumoController.agregarInsumo(req, res));
router.put("/:id", (req, res) => insumoController.actualizarInsumo(req, res));
router.delete("/:id", (req, res) => insumoController.eliminarInsumo(req, res));

export default router;