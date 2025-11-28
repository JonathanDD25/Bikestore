import { pool } from "../config/connection.js";

export const verificarEstadoUsuario = async (req, res, next) => {
    try {
        // req.usuario viene del middleware verificarToken
        const idUsuario = req.usuario.id;

        // Consultar si el usuario sigue activo/habilitado
        const [rows] = await pool.query(
            "SELECT rol FROM usuario WHERE id_usuario = ?",
            [idUsuario]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const usuario = rows[0];

        // Si está inhabilitado, bloquear acceso
        if (usuario.rol === "Inhabilitado") {
            return res.status(403).json({
                error: "Tu cuenta está deshabilitada. Contacta con el administrador."
            });
        }

        req.usuario.rol = usuario.rol;

        // Si todo está ok → continuar
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error validando estado del usuario" });
    }
};