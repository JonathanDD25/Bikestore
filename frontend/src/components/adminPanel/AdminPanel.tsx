import React from "react";
import "./AdminPanel.css";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

const MODULES = [
  { key: "usuarios", label: "Usuarios", description: "Gestión de usuarios registrados" },
  { key: "productos", label: "Productos", description: "Inventario y catálogo de productos" },
  { key: "ventas", label: "Ventas", description: "Historial y control de ventas" },
];

export default function AdminPanel() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel del Administrador</h1>

      <div className="admin-grid">
        {MODULES.map((mod) => (
          <div key={mod.key} className="admin-card">
            <h2>{mod.label}</h2>
            <p>{mod.description}</p>

            <div className="admin-actions">
              <button className="admin-btn add">
                <PlusCircle size={18} />
                Agregar
              </button>

              <button className="admin-btn edit">
                <Pencil size={18} />
                Editar
              </button>

              <button className="admin-btn delete">
                <Trash2 size={18} />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}