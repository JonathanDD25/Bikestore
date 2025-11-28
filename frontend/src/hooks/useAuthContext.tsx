import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Hook para proteger rutas según el rol del usuario.
 * @param allowedRoles Array de roles permitidos. Por defecto: ["Administrador", "Operario"]
 */
export function useAuthContext(allowedRoles: string[] = ["Administrador", "Operario"]) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // No logueado -> Redirigir a login
                navigate("/");
                return;
            }

            const userRole = user.rol || "";
            // Verificar si el rol del usuario está en los roles permitidos (case-insensitive)
            const hasPermission = allowedRoles.some(role => role.toLowerCase() === userRole.toLowerCase());

            if (!hasPermission) {
                console.warn(`Acceso denegado. Rol: ${userRole}, Permitidos: ${allowedRoles.join(", ")}`);
                navigate("/"); // O redirigir a una página de "Acceso Denegado"
            }
        }
    }, [user, loading, navigate, allowedRoles]);
}

export default useAuthContext;