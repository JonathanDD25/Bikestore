import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // <--- IMPORTANTE
import "./navbar.css";

export default function NavBar() {
  const { user } = useAuth();     // <--- AQUI OBTIENE EL USUARIO REAL
  const [isOpen, setIsOpen] = useState(false);

  const rol = user?.rol || null;

  const isAdminOrOperario =
    rol?.toLowerCase() === "administrador" ||
    rol?.toLowerCase() === "operario";

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav id="component-bottomNav">
      <button
        className="component-bottomNav-toggle"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={toggleMenu}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <ul className={`component-bottomNav-list ${isOpen ? "show" : ""}`}>
        
        {/* BOTÓN GENERAL */}
        <li>
          <NavLink to="/inicio" onClick={closeMenu}>
            Inicio
          </NavLink>
        </li>

        {/* BOTONES ADMINISTRATIVOS */}
        {isAdminOrOperario && (
          <>
            <li>
              <NavLink to="/admin/productos" onClick={closeMenu}>
                Productos
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/usuarios" onClick={closeMenu}>
                Usuarios
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/ventas" onClick={closeMenu}>
                Ventas
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
