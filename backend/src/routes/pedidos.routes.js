import express from "express";
import { CrudController } from "../controllers/crud.controller.js";

const router = express.Router();
const crud = new CrudController();

const tabla = 'pedido';

//Rutas para operaciones CRUD
router.get("/", async (req, res) => {
    try {
        const dato = await crud.obtenerTodos(tabla);
        res.json(dato);
    } catch (error){
        console.error("Error al obtener los pedidos:", error);
        res.status(500).json({ message: "Error al obtener los pedidos", error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const dato = await crud.obtenerUno(tabla, {id_pedido: req.params.id});
        res.json(dato);
    } catch (error){
        res.status(500).json({ error: error.message || "Error al obtener el pedido" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevoDato = await crud.crear(tabla, {id_pedido: req.params.id}, req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ error: error.message || "Error al crear el pedido" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const datoActualizado = await crud.actualizar(tabla, {id_pedido: req.params.id}, req.body);
        res.json(datoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al actualizar el pedido" });
    }
});

router.delete("/:id", async (req, res) => {
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
});

export default router;