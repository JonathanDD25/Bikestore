import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import AuthForm from "./AuthForm";
import { useAuth } from "../../context/AuthContext";
import "./auth.css";

import { crearUsuario } from "../../services/usuarioService";

interface AuthPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthPanel({ isOpen, onClose }: AuthPanelProps) {
    const [mode, setMode] = useState<"login" | "register">("login");

    const { login } = useAuth(); // ✔ usamos login del contexto

    const handleSubmit = async (data: any) => {
        try {
            if (mode === "register") {
                const nuevoUsuario = {
                    nombres: data.name,
                    apellidos: data.lastName,
                    telefono: data.phone,
                    correo: data.email,
                    clave: data.password,
                };

                const creado = await crearUsuario(nuevoUsuario);

                console.log("Usuario creado:", creado);

                alert("Cuenta creada correctamente");
                setMode("login");
            }

            if (mode === "login") {

                const credenciales = {
                    correo: data.email,
                    clave: data.password,
                };

                // ✔ Ahora usamos login() del contexto
                await login(credenciales);

                console.log("Usuario logeado correctamente");

                onClose();
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Hubo un error inesperado");
        }
    };

    return (
        <>
            {isOpen && <div className="overlay active" onClick={onClose}></div>}

            <section className={`auth-panel ${isOpen ? "open" : ""}`}>
                <AuthHeader
                    mode={mode}
                    title={mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
                    onClose={onClose}
                    onSwitchMode={() => setMode(mode === "login" ? "register" : "login")}
                />

                <div className="auth-body">
                    <AuthForm
                        mode={mode}
                        onSubmit={handleSubmit}
                    />
                </div>
            </section>
        </>
    );
}
