import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { obtenerUsuarioPorId, actualizarUsuario } from "../../services/usuarioService";
import "./perfilPanle.css";

export default function ProfilePanel({ isOpen, onClose }: any) {
    const { user, logout, setUser } = useAuth();
    const [fullUser, setFullUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [editForm, setEditForm] = useState({
        nombres: "",
        apellidos: "",
        telefono: "",
        correo: "",
        clave: ""
    });

    useEffect(() => {
        if (isOpen && user?.id_usuario) {
            setLoading(true);
            obtenerUsuarioPorId(user.id_usuario)
                .then((res) => {
                    setFullUser(res);
                    setEditForm({
                        nombres: res.nombres,
                        apellidos: res.apellidos,
                        telefono: res.telefono,
                        correo: res.correo,
                        clave: ""
                    });
                })
                .catch((err) => console.error("Error al obtener usuario:", err))
                .finally(() => setLoading(false));
        }
        setEditMode(false);
    }, [isOpen, user]);

    if (!isOpen) return null;

    const rolColor =
        user?.rol === "Administrador" ? "#007bff" :
        user?.rol === "Operario" ? "#28a745" :
        user?.rol === "Cliente" ? "#6c757d" :
        "red";

    const handleChange = (e: any) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const payload: any = {
                nombres: editForm.nombres,
                apellidos: editForm.apellidos,
                telefono: editForm.telefono,
                correo: editForm.correo
            };
            if (editForm.clave.trim() !== "") {
                payload.clave = editForm.clave;
            }
            const updated = await actualizarUsuario(user.id_usuario, payload);
            setUser(updated);
            alert("Perfil actualizado correctamente");
            setEditMode(false);
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Hubo un error al actualizar el perfil");
        }
    };

    return (
        <>
            <div className="overlay active" onClick={onClose}></div>

            <section className="auth-panel open profile-panel">
                <div className="profile-header">
                    <h2 className="profile-title">{editMode ? "Editar Perfil" : "Mi Perfil"}</h2>
                    <button onClick={onClose} className="profile-close-btn">✖</button>
                </div>

                <div className="profile-body">

                    {!editMode && (
                        <>
                            <div className="profile-card">
                                {loading ? (
                                    <p className="profile-value">Cargando datos...</p>
                                ) : (
                                    <>
                                        <div className="profile-row">
                                            <span className="profile-label">Nombre:</span>
                                            <span className="profile-value">{user?.nombres} {user?.apellidos}</span>
                                        </div>

                                        <div className="profile-row">
                                            <span className="profile-label">Correo:</span>
                                            <span className="profile-value">{fullUser?.correo || "No registrado"}</span>
                                        </div>

                                        <div className="profile-row">
                                            <span className="profile-label">Rol:</span>
                                            <span className="profile-value" style={{ color: rolColor, fontWeight: "bold" }}>{user?.rol}</span>
                                        </div>

                                        <div className="profile-row">
                                            <span className="profile-label">Teléfono:</span>
                                            <span className="profile-value">{fullUser?.telefono || "No registrado"}</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button onClick={() => setEditMode(true)} className="auth-btn profile-logout-btn">Editar perfil</button>
                            <button onClick={() => { logout(); onClose(); }} className="auth-btn profile-logout-btn">Cerrar sesión</button>
                        </>
                    )}

                    {editMode && (
                        <form className="auth-form edit-profile-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>

                            <div className="form-group">
                                <label>Nombres</label>
                                <input type="text" name="nombres" value={editForm.nombres} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Apellidos</label>
                                <input type="text" name="apellidos" value={editForm.apellidos} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Teléfono</label>
                                <input type="text" name="telefono" value={editForm.telefono} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Correo</label>
                                <input type="email" name="correo" value={editForm.correo} onChange={handleChange} required />
                            </div>

                            <div className="form-group password-field">
                                <label>Nueva contraseña (opcional)</label>
                                <div className="password-wrapper">
                                    <input type={showPassword ? "text" : "password"} name="clave" value={editForm.clave} onChange={handleChange} />
                                    <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? "👁" : "👁"}
                                    </button>
                                </div>
                            </div>

                            <div className="edit-actions">
                                <button className="auth-btn profile-logout-btn" type="submit">Guardar cambios</button>
                                <button type="button" className="auth-btn profile-logout-btn" onClick={() => setEditMode(false)}>Cancelar</button>
                            </div>
                        </form>
                    )}

                </div>
            </section>
        </>
    );
}
