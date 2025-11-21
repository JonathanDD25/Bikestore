import React from "react";
import "./auth.css";

interface AuthHeaderProps {
    title: string;
    subtitle?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="auth-header">
            <h2 className="auth-title">{title}</h2>
            {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </header>
    );
};

export default AuthHeader;
