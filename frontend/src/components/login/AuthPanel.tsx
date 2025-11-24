import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import AuthForm from "./AuthForm";
import "./auth.css";

import { crearUsuario } from "../../services/usuarioService";
import { loginRequest } from "../../services/authService"

interface AuthPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthPanel({ isOpen, onClose }: AuthPanelProps) {
    const [mode, setMode] = useState<"login" | "register">("login");

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
                console.log("Login:", data);
                const loginUsuario = {
                    correo: data.email,
                    clave: data.password,
                };

                const login = await loginRequest(loginUsuario);
                console.log("Usuario logeado:", login);

                localStorage.setItem("token", login.token);
                localStorage.setItem("usuario", JSON.stringify(login.usuario));

                console.log("LocalStorage:", login.token);
                console.log("LocalStorage:", login.usuario);
                alert("Simulando inicio de sesión...");

                onClose();
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message);
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
