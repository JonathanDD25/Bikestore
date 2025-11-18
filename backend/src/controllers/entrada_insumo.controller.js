import express from "express";
import { CrudController } from "./crud.controller.js";

const router = express.Router();
const crud = new CrudController();

const tabla = 'entrada_insumo';
export class Entrada_insumoController {
    //Rutas para operaciones CRUD
    async obtenerInsumo(req, res) {
        try {
            const dato = await crud.obtenerTodos(tabla);
        res.json(dato);
    } catch (error){
        console.error("Error al obtener las entradas de insumos:", error);
        res.status(500).json({ message: "Error al obtener las entradas de insumos", error });
    }
    };

    async obtenerInsumoporId(req, res) {
        try { 
            const dato = await crud.obtenerUno(tabla, {id_entrada: req.params.id});
        res.json(dato);
    } catch (error){
        res.status(500).json({ error: error.message || "Error al obtener la entrada de insumo" });
    }
    };

    async agregarInsumo(req, res) {
        try {
            const nuevoDato = await crud.crear(tabla, {id_entrada: req.params.id}, req.body);
        res.status(201).json(nuevoDato);
    } catch (error) {
        console.error("Error al crear la entrada de insumo:", error);
        res.status(500).json({ error: error.message || "Error al crear la entrada de insumo" });
    }
    };

    async actualizarInsumo(req, res) {
        try {
            const datoActualizado = await crud.actualizar(tabla, {id_entrada: req.params.id}, req.body);
        res.json(datoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error al actualizar la entrada de insumo" });
    }
    };

    async eliminarInsumo(req, res) {
        try {
            const id = req.params.id;
        const resultado = await crud.eliminar(tabla, {id_entrada: req.params.id});
        res.json(resultado);
            } catch (error) {
            if (error.message.includes('Registro no encontrado')) {
            res.status(404).json({ error: 'Entrada de insumo no encontrada' });
            } else {
            res.status(500).json({ error:  "Error al eliminar la entrada de insumo" + error.message });
            }
        }
    }
};

