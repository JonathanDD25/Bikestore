/**
 * ============================================================
 * ROUTES: Definición de rutas de la aplicación 
 * ============================================================
 */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Páginas
import Catalogo from "../pages/Catalogo";

import ProductosAdmin from "../components/AdminPanel/ProductosAdmin";
import UsuariosAdmin from "../components/AdminPanel/UsuariosAdmin";
import VentasAdmin from "../components/AdminPanel/VentasAdmin";

// Tipado para los items que entran al carrito
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Props que debe recibir AppRutas
interface RoutesProps {
  onAddToCart: (item: CartItem) => void;
}

// Lista de categorías del catálogo
const categorias = [
  { path: "montaña", categoria: "montaña" },
  { path: "electrica", categoria: "electrica" },
  { path: "ruta", categoria: "ruta" },
  { path: "urbana", categoria: "urbana" },
  { path: "hibrida", categoria: "hibrida" },
  { path: "infantil", categoria: "infantil" },
  { path: "componente", categoria: "componente" },
  { path: "accesorio", categoria: "accesorio" },
];

const AppRutas: React.FC<RoutesProps> = ({ onAddToCart }) => {
  return (
    <Routes>

      {/* Catálogo principal */}
      <Route path="/" element={<Catalogo onAddToCart={onAddToCart} />}
      />

      {/* Catálogos dinámicos */}
      {categorias.map(({ path, categoria }) => (
        <Route
          key={path}
          path={`/${path}`}
          element={<Catalogo categoria={categoria} onAddToCart={onAddToCart} />}
        />
      ))}

      {/* Rutas de Administración */}
      <Route path="/admin/productos" element={<ProductosAdmin />} />
      <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
      <Route path="/admin/ventas" element={<VentasAdmin />} />

      {/* Rutas de Operario */}
      <Route path="/operario/productos" element={<ProductosAdmin />} />
      <Route path="/operario/ventas" element={<VentasAdmin />} />

      {/* Redirección si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRutas;
