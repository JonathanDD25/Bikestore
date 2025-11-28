import express from "express";
import { ProductosController } from "../controllers/productos.controller.js";

const router = express.Router();
const productosController = new ProductosController();

const tabla = 'productos';

//Rutas para operaciones CRUD
router.get("/", (req, res) => productosController.obtenerProducto(req, res));
router.get("/:id", (req, res) => productosController.obtenerProductoPorId(req, res));
router.post("/", (req, res) => productosController.agregarProducto(req, res));
router.put("/:id", (req, res) => productosController.actualizarProducto(req, res));
router.delete("/:id", (req, res) => productosController.eliminarProducto(req, res));

export default router;