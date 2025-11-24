// productService.ts
const API_URL = "http://localhost:3000/api/productos";

// --- Tipos ---
export interface Producto {
    id_producto: number;
    nombre: string;
    precio: number;          // ← trabajado como number
    image: string | null;
    descripcion: string;
    marca: string;
    categoria: string;
    estado: "Disponible" | "No disponible" | "Inhabilitado";
    stock: number;
    stock_minimo: number;
}

// --- Obtener todos ---
export const obtenerProductos = async (): Promise<Producto[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los productos");

    const data: Producto[] = await res.json();

    // Convertir precio a number (por si viene string del backend)
    return data.map((p) => ({ ...p, precio: Number(p.precio) }));
};

// --- Obtener por ID ---
export const obtenerProductoPorId = async (id: number): Promise<Producto> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el producto");

    const p: Producto = await res.json();
    return { ...p, precio: Number(p.precio) };
};

// --- Crear producto ---
export const agregarProducto = async (producto: Partial<Producto>): Promise<Producto> => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
    });

    if (!res.ok) throw new Error("Error al crear producto");

    const p: Producto = await res.json();
    return { ...p, precio: Number(p.precio) };
};

// --- Actualizar producto ---
export const actualizarProducto = async (
    id: number,
    data: Partial<Producto>
): Promise<Producto> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al actualizar producto");

    const p: Producto = await res.json();
    return { ...p, precio: Number(p.precio) };
};

// --- Eliminar producto ---
export const eliminarProducto = async (id: number): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar producto");

    return res.json();
};

// --- Obtener solo productos disponibles ---
export const obtenerProductosDisponibles = async (): Promise<Producto[]> => {
    const productos = await obtenerProductos();

    return productos.filter((p) => p.estado === "Disponible");
};
