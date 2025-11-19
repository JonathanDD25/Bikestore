import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // <- guarda datos del usuario en la request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
};

export const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ error: "No tienes permisos para acceder" });
        }
        next();
    };
};