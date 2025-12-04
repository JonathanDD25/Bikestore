import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { obtenerUsuarioPorId } from "../../services/usuarioService";
import "./perfilPanle.css";

export default function ProfilePanel({ isOpen, onClose }: any) {
    const { user, logout } = useAuth();
    const [fullUser, setFullUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && user?.id_usuario) {
            setLoading(true);

            obtenerUsuarioPorId(user.id_usuario)
                .then((res) => setFullUser(res))
                .catch((err) => console.error("Error al obtener usuario:", err))
                .finally(() => setLoading(false));
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const rolColor =
        user?.rol === "Administrador" ? "#007bff" :
        user?.rol === "Operario" ? "#28a745" :
        user?.rol === "Cliente" ? "#6c757d" :
        "red";

    return (
        <>
            <div className="overlay active" onClick={onClose}></div>

            <section className="auth-panel open profile-panel">
                <div className="profile-header">
                    <h2 className="profile-title">Mi Perfil</h2>
                    <button onClick={onClose} className="profile-close-btn">✖</button>
                </div>

                <div className="profile-body">

                    <div className="profile-card">
                        {loading ? (
                            <p className="profile-value">Cargando datos...</p>
                        ) : (
                            <>
                                <div className="profile-row">
                                    <span className="profile-label">Nombre:</span>
                                    <span className="profile-value">
                                        {user?.nombres} {user?.apellidos}
                                    </span>
                                </div>

                                <div className="profile-row">
                                    <span className="profile-label">Correo:</span>
                                    <span className="profile-value">
                                        {fullUser?.correo || "No registrado"}
                                    </span>
                                </div>

                                <div className="profile-row">
                                    <span className="profile-label">Rol:</span>
                                    <span
                                        className="profile-value"
                                        style={{ color: rolColor, fontWeight: "bold" }}
                                    >
                                        {user?.rol}
                                    </span>
                                </div>

                                <div className="profile-row">
                                    <span className="profile-label">Teléfono:</span>
                                    <span className="profile-value">
                                        {fullUser?.telefono || "No registrado"}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                        className="auth-btn profile-logout-btn"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </section>
        </>
    );
}
