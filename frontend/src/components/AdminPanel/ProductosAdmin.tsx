import React, { useState, useEffect } from 'react';
// Asume que estas interfaces y funciones existen en tu productoService.ts
// Nota: Debes modificar tu productoService.ts para incluir el token en estas llamadas.
import type { Producto } from '../../services/productoService';
import { obtenerProductos, actualizarProducto } from '../../services/productoService';
import PanelLayout from '../layout/PanelLayout'; 

// Roles de estado para la venta
const estado = ["Disponible", "No disponible"] as const;

interface ProductoDisplay extends Producto {
    id_producto: number; // Aseguramos que el ID exista para la key
}

const ProductosPanel: React.FC = () => {
    const [productos, setProductos] = useState<ProductoDisplay[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProductos = async () => {
        try {
            // Asume que esta llamada ahora envía el token para acceder a datos sensibles (inventario)
            const data: ProductoDisplay[] = await obtenerProductos(); 
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            alert("No se pudo cargar el inventario. Verifique los permisos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const toggleEstado = async (producto: ProductoDisplay) => {
        const nuevoEstado = producto.estado === 'Disponible' ? 'No disponible' : 'Disponible';
        
        if (!window.confirm(`¿Confirmas cambiar el estado de "${producto.nombre}" a ${nuevoEstado}?`)) {
            return;
        }

        try {
            // La función de servicio debe aceptar la actualización del estado y enviar el token
            await actualizarProducto(producto.id_producto, { estado: nuevoEstado });

            // Actualizar el estado local
            setProductos(prev => prev.map(p => 
                p.id_producto === producto.id_producto ? { ...p, estado: nuevoEstado } : p
            ));
        } catch (error) {
            console.error("Error al cambiar estado:", error);
            alert("Fallo al actualizar el estado del producto. (Revisa si el token tiene permisos).");
        }
    };

    if (loading) return <PanelLayout title="Gestión de Productos"><p>Cargando inventario...</p></PanelLayout>;

    return (
        <PanelLayout title="Gestión de Productos (Inventario)">
            <h3>Inventario y Estado de Venta</h3>
            <p>Este panel permite a Administradores y Operarios controlar la disponibilidad de los productos.</p>
            
            <table className="admin-table"> {/* Usa una clase CSS para estilizar la tabla */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id_producto}>
                            <td>{p.id_producto}</td>
                            <td>{p.nombre}</td>
                            <td>{p.marca}</td>
                            <td>{p.stock}</td>
                            <td>$ {p.precio.toFixed(2)}</td>
                            <td style={{ color: p.estado === 'Disponible' ? 'green' : 'red' }}>
                                <strong>{p.estado}</strong>
                            </td>
                            <td>
                                <button 
                                    onClick={() => toggleEstado(p)}
                                    style={{ 
                                        backgroundColor: p.estado === 'Disponible' ? '#d9534f' : '#5cb85c', 
                                        color: 'white' 
                                    }}
                                >
                                    {p.estado === 'Disponible' ? 'Deshabilitar' : 'Habilitar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </PanelLayout>
    );
};

export default ProductosPanel;