import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";

interface AuthFormProps {
  mode: "login";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await login(correo, password);

    if (!result.ok) {
      setError(result.error || "Error desconocido");
      return;
    }

    // Login exitoso
    console.log("Usuario autenticado!");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>

      {error && <p className="auth-error">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="auth-button">
        Iniciar Sesión
      </button>
    </form>
  );
}
