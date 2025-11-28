import express from "express";
import bcrypt from "bcrypt";
import { CrudController } from "./crud.controller.js";

const router = express.Router();
const crud = new CrudController();

const tabla = 'usuario';
export class UsuariosController {
    //Rutas para operaciones CRUD
    async obtenerUsuario(req, res) {
        try {
            const dato = await crud.obtenerTodos(tabla);
            res.json(dato);
        } catch (error){
            console.error("Error al obtener los usuarios:", error);
            res.status(500).json({ message: "Error al obtener los usuarios", error });
        }
    };

    async obtenerUsuarioPorId(req, res) {
        try {
            const dato = await crud.obtenerUno(tabla, {id_usuario: req.params.id});
            res.json(dato);
        } catch (error){
            console.error("Error al obtener el usuario:", error);
            res.status(500).json({ error: error.message || "Error al obtener el usuario" });
        }
    };

    async agregarUsuario(req, res) {
        try {
            const { clave, ...restoCampos } = req.body;

            // 1. Validar que se envía la clave
            if (!clave) {
                return res.status(400).json({ error: "La clave es obligatoria" });
            }

            // 2. Encriptar la clave antes de enviarla al CRUD
            const claveEncriptada = await bcrypt.hash(clave, 10);

            // 3. Reconstruir el objeto a enviar al CRUD
            const dataFinal = {
                ...restoCampos,
                clave: claveEncriptada,
            };

            // 4. Llamar al CRUD genérico (sin id en params)
            const nuevoUsuario = await crud.crear(
                tabla,
                { id_usuario: null }, // ignorado por tu CRUD, y está bien
                dataFinal
            );

            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            res.status(500).json({ error: error.message || "Error al crear el usuario" });
        }
    };

    async actualizarUsuario(req, res) {
        try {
            const datoActualizado = await crud.actualizar(tabla, {id_usuario: req.params.id}, req.body);
            res.json(datoActualizado);
        } catch (error) {
            res.status(500).json({ error: error.message || "Error al actualizar el usuario" });
        }
    };

    async eliminarUsuario(req, res) {
        try {
            const id = req.params.id;
            const resultado = await crud.eliminar(tabla, {id_usuario: req.params.id});
            res.json(resultado);
        } catch (error) {
            if (error.message.includes('Registro no encontrado')) {
                res.status(404).json({ error: 'usuario no encontrado' });
            } else {
                res.status(500).json({ error:  "Error al eliminar el usuario" + error.message });
            }
        }
    }

    async inhabilitarUsuario(req, res) {
        try {
            const id = req.params.id;

             // 1. Validar que el usuario existe
            const usuario = await crud.obtenerUno("usuario", { id_usuario: id });

            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            // 2. Evitar que se inhabilite a sí mismo
            if (req.usuario.id == id) {
                return res.status(400).json({ error: "No puedes inhabilitar tu propia cuenta" });
            }

            // 3. Opcional: evitar que se inhabiliten administradores
            if (usuario.rol === "Administrador") {
                return res.status(403).json({ error: "No puedes inhabilitar a otro administrador" });
            }

            // 4. Actualizar el rol a Inhabilitado
            const actualizado = await crud.actualizar(
                "usuario", 
                { id_usuario: id }, 
                { rol: "Inhabilitado" }
            );

            return res.json({
                mensaje: "Usuario inhabilitado correctamente",
                usuario: actualizado
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};


