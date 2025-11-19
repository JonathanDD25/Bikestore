import { pool } from "../config/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =========================
// LOGIN DE USUARIO
// =========================
export class AuthController {
    async login(req, res) {
        try {
            // Obtiene los datos coreeo clave recibidos del JSON y los guarda en una tupla
            const { correo, clave } = req.body;

            // 1. Buscar usuario por correo
            const [rows] = await pool.query(
                "SELECT * FROM usuario WHERE correo = ?",
                [correo]
            );

            // Verifica que haya almenos un registro con dicho correo registrado, de no ser así envia un error
            if (rows.length === 0) {
                return res.status(400).json({ mensaje: "Correo o contraseña incorrectos" });
            }

            // Almacena la información del usuario que concidió con el correo.
            const usuario = rows[0];

            // 2. Comparar contraseña
            const claveValida = await bcrypt.compare(clave, usuario.clave);

            if (!claveValida) {
                return res.status(400).json({ mensaje: "Correo o contraseña incorrectos" });
            }

            // 3. Generar token JWT
            const token = jwt.sign(
                {
                    id: usuario.id_usuario,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES }     
            );

            return res.json({
                mensaje: "Inicio de sesión exitoso",
                token,
                usuario: {
                    id: usuario.id_usuario,
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    rol: usuario.rol
                }
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}