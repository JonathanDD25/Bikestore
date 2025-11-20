/**
 * ============================================================
 * COMPONENTE: NavBar — Navegación Principal
 * Optimizado, más legible y totalmente compatible con NavBar.css
 * ============================================================
 */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./NavBar.css";

/* ============================================================
   Lista de enlaces principales
   ============================================================ */
const NAV_LINKS = [
  { to: "/montaña", text: "Montaña" },
  { to: "/electrica", text: "Eléctrica" },
  { to: "/ruta", text: "Ruta" },
  { to: "/urbana", text: "Urbanas" },
  { to: "/hibrida", text: "Híbridas" },
  { to: "/infantil", text: "Infantiles" },
  { to: "/componente", text: "Componentes" },
  { to: "/accesorio", text: "Accesorios" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  /* ============================================================
     Alterna el menú en móvil
     ============================================================ */
  const toggleMenu = () => setIsOpen((prev) => !prev);

  /* ============================================================
     Cierra el menú cuando se selecciona un enlace
     (solo visible en móvil)
     ============================================================ */
  const closeMenu = () => setIsOpen(false);

  return (
    <nav id="component-bottomNav">
      {/* Botón Hamburguesa (solo visible en mobile por CSS) */}
      <button
        className="component-bottomNav-toggle"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={toggleMenu}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Lista de enlaces */}
      <ul className={`component-bottomNav-list ${isOpen ? "show" : ""}`}>
        {NAV_LINKS.map(({ to, text }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "active" : undefined
              }
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}