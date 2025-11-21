import { useState } from "react";
import "./auth.css";

interface AuthFormProps {
    mode: "login" | "register";
    onSubmit: (data: { email: string; password: string; name?: string }) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const isRegister = mode === "register";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data: any = { email, password };
        if (isRegister) data.name = name;
        onSubmit(data);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
                <div className="auth-input-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
            )}

            <div className="auth-input-group">
                <label htmlFor="email">Correo</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="auth-input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button className="auth-btn" type="submit">
                {isRegister ? "Registrarse" : "Iniciar sesión"}
            </button>
        </form>
    );
}
