export function permitirRoles(...rolesPermitidos) {
    return (req, res, next) => {

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ 
                error: "No tienes permiso para acceder a este recurso" 
            });
        }

        next();
    };
}

export const puedeActualizarUsuario = (req, res, next) => {
    const id = req.params.id;
    const datos = req.body;

    // 1. Si el usuario quiere modificar el rol
    if (datos.rol) {

        // Solo el administrador puede modificar roles
        if (req.usuario.rol !== "Administrador") {
            return res.status(403).json({
                error: "No tienes permisos para modificar el rol de un usuario"
            });
        }
    }

    // 2. Un cliente NO puede modificar otro usuario
    if (req.usuario.rol === "Cliente" && req.usuario.id != id) {
        return res.status(403).json({
            error: "No puedes modificar datos de otros usuarios"
        });
    }

    // 3. Un operario puede modificar SOLO su propio usuario
    if (req.usuario.rol === "Operario" && req.usuario.id != id) {
        return res.status(403).json({
            error: "Un operario no puede modificar otros usuarios"
        });
    }

    next();
};