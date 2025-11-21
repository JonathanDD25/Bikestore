import React, { useState } from "react";
import AuthHeader from "./AuthHeader";
import AuthForm from "./AuthForm";
import "./auth.css";

export default function AuthPanel() {
    const [mode, setMode] = useState<"login" | "register">("login");

    // Manejo del submit (por ahora solo muestra los datos)
    const handleSubmit = (data: {
        email: string;
        password: string;
        name?: string;
    }) => {
        console.log("Datos enviados:", data);
    };

    return (
        <section className="bs-auth-section">

            {/* Header dinámico */}
            <AuthHeader
                title={mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            />

            {/* Formulario */}
            <AuthForm mode={mode} onSubmit={handleSubmit} />

            {/* Cambiar entre Login/Register */}
            <div className="bs-auth-toggle">
                {mode === "login" ? (
                    <p>
                        ¿No tienes cuenta?{" "}
                        <button onClick={() => setMode("register")}>
                            Regístrate aquí
                        </button>
                    </p>
                ) : (
                    <p>
                        ¿Ya tienes cuenta?{" "}
                        <button onClick={() => setMode("login")}>
                            Inicia sesión aquí
                        </button>
                    </p>
                )}
            </div>
        </section>
    );
}
