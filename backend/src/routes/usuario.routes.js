import express from "express";
import { UsuariosController } from "../controllers/usuarios.controller";

const router = express.Router();
const usuariosController = new UsuariosController();

const tabla = 'usuario';

//Rutas para operaciones CRUD
router.get("/", (req, res) => usuariosController.obtenerUsuario);

export default router;