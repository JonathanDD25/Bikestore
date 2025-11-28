import express from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { verificarEstadoUsuario } from "../middlewares/estado.middleware.js";
import { permitirRoles, puedeActualizarUsuario } from "../middlewares/roles.middleware.js";

const router = express.Router();
const usuariosController = new UsuariosController();

//Rutas publicas
router.post("/", (req, res) => usuariosController.agregarUsuario(req, res));

//Rutas protegidas
// SOLO administrador puede ver la lista completa
router.get("/", 
    verificarToken,
    verificarEstadoUsuario, 
    permitirRoles("Administrador", "Operario"),
    (req, res) => usuariosController.obtenerUsuario(req, res)
);
    
// Administrador y operario pueden ver cualquier ID
// Cliente solo puede ver su propio ID
//router.get("/:id", verificarToken, permitirRoles("Administrador", "Operario"),(req, res) => usuariosController.obtenerUsuarioPorId(req, res));
router.get("/:id",
    verificarToken,
    verificarEstadoUsuario,
    (req, res, next) => {

        // Si es admin u operario → dejar pasar
        if (["Administrador", "Operario"].includes(req.usuario.rol)) {
            return next();
        }

        // Si es cliente → solo puede ver su propio registro
        if (req.usuario.rol === "Cliente") {
            if (req.usuario.id == req.params.id) {
                return next();
            }
            return res.status(403).json({ error: "No puedes ver datos de otros usuarios" });
        }
    },
    (req, res) => usuariosController.obtenerUsuarioPorId(req, res)
);

router.put("/:id",
    verificarToken,
    verificarEstadoUsuario,
    puedeActualizarUsuario,
    (req, res) => usuariosController.actualizarUsuario(req, res)
);

router.delete("/:id", 
    verificarToken,
    verificarEstadoUsuario,
    permitirRoles("Administrador"),
    (req, res) => usuariosController.eliminarUsuario(req, res)
);

router.patch("/:id",
    verificarToken,
    verificarEstadoUsuario,
    permitirRoles("Administrador"),
    (req, res) => usuariosController.inhabilitarUsuario(req, res)
);

export default router;