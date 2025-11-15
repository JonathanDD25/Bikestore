import pool from "../config/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =========================
// REGISTRO DE USUARIO
// =========================

// export const registrar = async (req, res) => {
//     try{
//         // Obtiene todos los datos recibidos del JSON y los guarda en una tupla
//         const { nombres, apellidos, correo, clave, rol, direccion, telefono } = req.body; // Preguntar si se puede encapsular todos los datos en una variable

//         // 1. Verificar si el correo ya existe
//         // Manda una petición a la base de datos y guarda todos los usuarios con el correo ingresado en existe
//         const [existe] = await pool.query(      // Preguntar si esto si puede añadir usuarios routes
//             "SELECT * FROM usuario WHERE correo = ?",
//             [correo]
//         );

//         // Si encuentra que existe al menos un registro con dicho correo, entonces envia el mensaje de error y no permitirá crearlo
//         if (existe.length > 0) {
//             return res.status(400).json({ mensaje: "El correo ya está registrado." });
//         }

//          // 2. Encriptar contraseña
//         const claveEncriptada = await bcrypt.hash(clave, 10);

//         //usuario.post()

//         // await pool.query(
//         //     `INSERT INTO usuario (nombres, apellidos, correo, clave, rol, direccion, telefono)
//         //      VALUES (?, ?, ?, ?, ?, ?, ?)`,
//         //     [nombres, apellidos, correo, claveEncriptada, rol, direccion, telefono]
//         // );

//         const nuevoUsuario = await crud.crear( //Deberia usar el usuarios.routes aquí?
//             "usuario",
//             { id_usuario: null }, // no hay params, pero el CRUD lo ignora si es null
//             {
//                 nombres,
//                 apellidos,
//                 correo,
//                 clave: claveEncriptada,
//                 rol,
//                 direccion,
//                 telefono
//             }
//         );

//         return res.status(201).json({ mensaje: "Usuario registrado correctamente." });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

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
                { expiresIn: "2h" }     //que significa esto?
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