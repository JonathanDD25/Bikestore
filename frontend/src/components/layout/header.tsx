import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./header.css";

interface HeaderProps {
  onCartClick: () => void;
  onLoginClick: () => void;
  onLogout?: () => void;
  cartCount: number;
  usuarioLogin: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onCartClick,
  onLoginClick,
  cartCount,
  usuarioLogin,
}) => {
  return (
    <header className="component-header">
      <div className="component-top-header">

        {/* LOGO */}
        <div className="component-logo">
          <a href="/">
            <span>Bike</span>Store
          </a>
        </div>

        {/* BOTONES */}
        <div className="component-header-actions">

          {/* LOGIN */}
          <button
            className="component-login-btn"
            onClick={onLoginClick}
            title={usuarioLogin ? "Perfil" : "Iniciar sesión"}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            <span>{usuarioLogin ? "Perfil" : "Ingresar"}</span>
          </button>

          {/* CARRITO */}
          <button
            className="component-cart-btn"
            onClick={onCartClick}
            title="Carrito"
          >
            <FaShoppingCart />
            <span
              className={`component-cart-count ${
                cartCount > 0 ? "bump" : ""
              }`}
            >
              {cartCount}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;
