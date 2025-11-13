import express from "express";
import { CrudController } from "../controllers/crud.controller.js";

const router = express.Router();
const crud = new CrudController();

const tabla = 'detalle_entrada';

//Rutas para operaciones CRUD
router.get("/", async (req, res) => {
    try {
        const dato = await crud.obtenerTodos(tabla);
        res.json(dato);
    } catch (error){
        console.error("Error al obtener los detalles de las entradas de insumos:", error);
        res.status(500).json({ message: "Error al obtener los detalles de las entradas de insumos", error });
    }
});

router.get("/:id_entrada/:id_producto", async (req, res) => {
    try {
        const dato = await crud.obtenerUno(tabla, 
            { id_entrada: req.params.id_entrada, id_producto: req.params.id_producto });
        res.json(dato);
    } catch (error){
        res.status(500).json({ error: error.message || "Error al obtener los detalles de entradas de insumos" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevoDato = await crud.crear(tabla, { id_entrada: req.params.id_entrada, id_producto: req.params.id_producto }, req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        console.error("Error al crear el detalle de entrada de insumo:", error);
        res.status(500).json({ error: error.message || "Error al crear el detalle de entrada de insumo" });
    }
});

router.put("/:id_entrada/:id_producto", async (req, res) => {
    try {
        const datoActualizado = await crud.actualizar(tabla, 
            { id_entrada: req.params.id_entrada, id_producto: req.params.id_producto }, req.body);
        res.json(datoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al actualizar el detalle de entrada de insumo" });
    }
});

router.delete("/:id_entrada/:id_producto", async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await crud.eliminar(tabla, 
            { id_entrada: req.params.id_entrada, id_producto: req.params.id_producto });
        res.json(resultado);
    } catch (error) {
        if (error.message.includes('Registro no encontrado')) {
            res.status(404).json({ error: 'Detalle de entrada de insumo no encontrado' });
        } else {
            res.status(500).json({ error:  "Error al eliminar el detalle de entrada de insumo" + error.message });
        }
    }
});

export default router;