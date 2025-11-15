import express from "express";
import { CrudController } from "../controllers/crud.controller.js";

const router = express.Router();
const crud = new CrudController();

const tabla = 'productos';

//Rutas para operaciones CRUD
router.get("/", async (req, res) => {
    try {
        const dato = await crud.obtenerTodos(tabla);
        res.json(dato);
    } catch (error){
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const dato = await crud.obtenerUno(tabla, {id_producto: req.params.id});
        res.json(dato);
    } catch (error){
        res.status(500).json({ error: error.message || "Error al obtener el producto" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevoDato = await crud.crear(tabla, {id_producto: req.params.id}, req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: error.message || "Error al crear el producto" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const datoActualizado = await crud.actualizar(tabla, {id_producto: req.params.id}, req.body);
        res.json(datoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al actualizar el producto" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await crud.eliminar(tabla, {id_producto: req.params.id});
        res.json(resultado);
    } catch (error) {
        if (error.message.includes('Registro no encontrado')) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.status(500).json({ error:  "Error al eliminar el producto" + error.message });
        }
    }
});

export default router;