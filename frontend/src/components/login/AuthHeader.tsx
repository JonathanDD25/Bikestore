import React from "react";
import "./auth.css";

interface AuthHeaderProps {
    mode: "login" | "register";
    title: string; 
    onClose: () => void;
    onSwitchMode: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ mode, onClose, onSwitchMode }) => {
    return (
        <div className="auth-header">
            <h2>{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

            <button className="auth-switch-btn" onClick={onSwitchMode}>
                {mode === "login" ? "Registrarse" : "Iniciar sesión"}
            </button>

            <button className="auth-close-btn" onClick={onClose}>✖</button>
        </div>
    );
};

export default AuthHeader;
