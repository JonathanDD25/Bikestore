import React, { useState, useEffect } from 'react';
import { obtenerUsuario, actualizarUsuario } from '../../services/usuarioService'
import type { Usuario } from '../../services/usuarioService'
import PanelLayout from '../layout/PanelLayout';
import { useAuth } from '../../context/AuthContext'; 
import { useAuthContext } from '../../hooks/useAuthContext';

const ROLES = ["Administrador", "Operario", "Cliente", "Inhabilitado"] as const;

const UsuariosAdmin: React.FC = () => {

    useAuthContext(["Administrador"]);
    const { user } = useAuth(); 

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsuarios = async () => {
        try {
            const data = await obtenerUsuario();
            setUsuarios(data);
        } catch {
            alert("No se pudieron cargar los usuarios.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleRolChange = async (userId: number, nuevoRol: typeof ROLES[number]) => {
        const dataToUpdate = { rol: nuevoRol };

        if (userId === user?.id_usuario && nuevoRol !== "Administrador") {
            alert("No puedes modificar tu propio rol.");
            fetchUsuarios();
            return;
        }

        if (!window.confirm(`¿Confirmas cambiar el rol del usuario ${userId} a ${nuevoRol}?`)) {
            return;
        }

        try {
            await actualizarUsuario(userId, dataToUpdate);
            setUsuarios(prev =>
                prev.map(u => u.id_usuario === userId ? { ...u, rol: nuevoRol } : u)
            );
        } catch (error) {
            console.error("Error al actualizar rol:", error);
            alert("Fallo al actualizar el rol.");
        }
    };

    if (loading)
        return (
            <PanelLayout title="Gestión de Usuarios">
                <p>Cargando usuarios...</p>
            </PanelLayout>
        );

    return (
        <PanelLayout title="Gestión de Usuarios (Administrador)">
            {/* Header estilo ProductosPanel */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Lista de Usuarios</h3>
                <p>Control de roles y permisos del sistema.</p>
            </div>

            {/* Tabla con diseño similar a productos */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>Rol Actual</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.nombres} {usuario.apellidos}</td>
                            <td>{usuario.correo}</td>

                            {/* Estilo de color similar a estados de productos */}
                            <td
                                style={{
                                    color:
                                        usuario.rol === "Administrador"
                                            ? "#007bff"
                                            : usuario.rol === "Operario"
                                            ? "#28a745"
                                            : usuario.rol === "Cliente"
                                            ? "#6c757d"
                                            : "red",
                                    fontWeight: "bold"
                                }}
                            >
                                {usuario.rol}
                            </td>

                            <td>
                                <select
                                    value={usuario.rol}
                                    onChange={(e) =>
                                        handleRolChange(
                                            usuario.id_usuario!,
                                            e.target.value as typeof ROLES[number]
                                        )
                                    }
                                    disabled={usuario.id_usuario === user?.id_usuario}
                                    style={{
                                        padding: "6px 10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc",
                                        cursor: usuario.id_usuario === user?.id_usuario ? "not-allowed" : "pointer"
                                    }}
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
