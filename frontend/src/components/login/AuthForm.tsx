import React, { useState } from "react";

interface AuthFormProps {
    mode: "login" | "register";
    onSubmit: (data: {
        name?: string;
        lastName?: string;
        phone?: string;
        email: string;
        password: string;
    }) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>

            {/* Registrar: nombres */}
            {mode === "register" && (
                <>
                    <div className="form-group">
                        <label>Nombres</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required={mode === "register"}
                        />
                    </div>

                    <div className="form-group">
                        <label>Apellidos</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required={mode === "register"}
                        />
                    </div>

                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required={mode === "register"}
                        />
                    </div>
                </>
            )}

            {/* Email */}
            <div className="form-group">
                <label>Correo</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Password con toggle 👁 */}
            <div className="form-group password-field">
                <label>Contraseña</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "👁" : "👁"}
                    </button>
                </div>
            </div>

            {/* Botón principal */}
            <button className="auth-btn" type="submit">
                {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            </button>
        </form>
    );
}
