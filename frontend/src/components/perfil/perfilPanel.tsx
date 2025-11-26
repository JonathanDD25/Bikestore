import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePanel({ isOpen, onClose }: any) {
    const { user, logout } = useAuth();

    if (!isOpen) return null;

    return (
        <>
            <div className="overlay active" onClick={onClose}></div>

            <section className="auth-panel open">
                <div className="auth-header">
                    <h2>Mi Perfil</h2>
                    <button onClick={onClose}>✖</button>
                </div>

                <div className="auth-body">
                    <p><strong>Nombre:</strong> {user?.nombres} {user?.apellidos}</p>
                    <p><strong>Rol:</strong> {user?.rol}</p>

                    <button
                        className="auth-btn"
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </section>
        </>
    );
}
