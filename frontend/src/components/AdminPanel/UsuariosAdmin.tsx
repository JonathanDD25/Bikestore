import React, { useState, useEffect } from 'react';
// Asume que estas interfaces y funciones existen en tu usuarioService.ts
import { obtenerUsuario, actualizarUsuario } from '../../services/usuarioService'
import type { Usuario } from '../../services/usuarioService'
import PanelLayout from '../layout/PanelLayout';
import { useAuth } from '../../context/AuthContext'; 
import { useAuthContext } from '../../hooks/useAuthContext';

// Roles posibles que el Admin puede asignar
const ROLES = ["Administrador", "Operario", "Cliente", "Inhabilitado"] as const;

const UsuariosAdmin: React.FC = () => {
    // Verificar permisos (Solo Administrador)
    useAuthContext(["Administrador"]);

    // Obtenemos el usuario loggeado para evitar auto-deshabilitación
    const { user } = useAuth(); 
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsuarios = async () => {
        try {
            // Llama a la función que debe enviar el token de autorización
            const data = await obtenerUsuario();
            setUsuarios(data);
        } catch {
            alert("No se pudieron cargar los usuarios. Verifique sus permisos (Token).");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleRolChange = async (userId: number, nuevoRol: typeof ROLES[number]) => {
        const dataToUpdate = {
            rol: nuevoRol // Esto crea el objeto: { rol: "Administrador" }
        };
        // Validación de seguridad en el frontend (el backend también debe validarla)
        if (userId === user?.id_usuario && nuevoRol !== 'Administrador') {
            alert("Advertencia: No puedes cambiar o inhabilitar tu propio rol de administrador.");
            fetchUsuarios(); 
            return;
        }

        if (!window.confirm(`¿Confirmas cambiar el rol del usuario ${userId} a ${nuevoRol}?`)) {
            return;
        }
        
        try {
            // Llama a la función que realiza la petición PUT con el nuevo rol
            await actualizarUsuario(userId, dataToUpdate);
            
            // Actualizar el estado local para reflejar el cambio en la UI
            setUsuarios(prev => prev.map(u => 
                u.id_usuario === userId ? { ...u, rol: nuevoRol } : u
            ));
        } catch (error) {
            console.error("Error al actualizar rol:", error);
            alert("Fallo al actualizar el rol. (Revisa si el token es válido).");
        }
    };

    if (loading) return <PanelLayout title="Gestión de Usuarios"><p>Cargando lista de usuarios...</p></PanelLayout>;

    return (
        <PanelLayout title="Gestión de Usuarios (Administrador)">
            <h3>Control de Roles y Permisos</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>Rol Actual</th>
                        <th>Cambiar Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.name} {usuario.lastName}</td>
                            <td>{usuario.email}</td>
                            <td><strong>{usuario.rol}</strong></td>
                            <td>
                                <select 
                                    value={usuario.rol} 
                                    onChange={(e) => handleRolChange(usuario.id_usuario!, e.target.value as typeof ROLES[number])}
                                    // Deshabilitar la edición del propio usuario
                                    disabled={usuario.id_usuario === user?.id_usuario} 
                                >
                                    {ROLES.map(rol => (
                                        <option key={rol} value={rol}>{rol}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </PanelLayout>
    );
};

export default UsuariosAdmin;