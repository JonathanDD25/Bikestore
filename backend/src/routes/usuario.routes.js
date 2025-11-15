import express from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";

const router = express.Router();
const usuariosController = new UsuariosController();

const tabla = 'usuario';

//Rutas para operaciones CRUD
router.get("/", (req, res) => usuariosController.obtenerUsuario(req, res));
router.get("/:id", (req, res) => usuariosController.obtenerUsuarioPorId(req, res));
router.post("/", (req, res) => usuariosController.agregarUsuario(req, res));
router.put("/:id", (req, res) => usuariosController.actualizarUsuario(req, res));
router.delete("/:id", (req, res) => usuariosController.eliminarUsuario(req, res));

export default router;