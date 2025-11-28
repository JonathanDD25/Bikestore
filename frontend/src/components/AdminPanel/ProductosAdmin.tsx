import React, { useState, useEffect } from 'react';
import { obtenerProductos, actualizarProducto, agregarProducto } from '../../services/productoService';
import type { Producto } from '../../services/productoService';
import PanelLayout from '../layout/PanelLayout'; 
import { useAuth } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// Roles de estado para la venta
const ESTADOS = ["Disponible", "No disponible", "Inhabilitado"] as const;

interface ProductoDisplay extends Producto {
    id_producto: number;
}

const ProductosPanel: React.FC = () => {
    const { user } = useAuth();
    const [productos, setProductos] = useState<ProductoDisplay[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductoDisplay | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<Producto>>({
        nombre: '',
        marca: '',
        precio: 0,
        stock: 0,
        stock_minimo: 0,
        categoria: '',
        descripcion: '',
        image: '',
        estado: 'Disponible'
    });

    // Verificar permisos (Admin u Operario)
    useAuthContext(["Administrador", "Operario"]);

    const fetchProductos = async () => {
        try {
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

    const handleOpenModal = (producto?: ProductoDisplay) => {
        if (producto) {
            setEditingProduct(producto);
            setFormData(producto);
        } else {
            setEditingProduct(null);
            setFormData({
                nombre: '',
                marca: '',
                precio: 0,
                stock: 0,
                stock_minimo: 0,
                categoria: '',
                descripcion: '',
                image: '',
                estado: 'Disponible'
            });
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' || name === 'stock_minimo' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await actualizarProducto(editingProduct.id_producto, formData);
                alert("Producto actualizado correctamente");
            } else {
                await agregarProducto(formData);
                alert("Producto creado correctamente");
            }
            fetchProductos();
            handleCloseModal();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Error al guardar el producto.");
        }
    };

    const toggleEstado = async (producto: ProductoDisplay) => {
        const nuevoEstado = producto.estado === 'Disponible' ? 'No disponible' : 'Disponible';
        
        if (!window.confirm(`¿Confirmas cambiar el estado de "${producto.nombre}" a ${nuevoEstado}?`)) {
            return;
        }

        try {
            await actualizarProducto(producto.id_producto, { estado: nuevoEstado });

            setProductos(prev => prev.map(p => 
                p.id_producto === producto.id_producto ? { ...p, estado: nuevoEstado } : p
            ));
        } catch (error) {
            console.error("Error al cambiar estado:", error);
            alert("Fallo al actualizar el estado del producto.");
        }
    };

    if (loading) return <PanelLayout title="Gestión de Productos"><p>Cargando inventario...</p></PanelLayout>;

    return (
        <PanelLayout title="Gestión de Productos (Inventario)">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h3>Inventario y Estado de Venta</h3>
                    <p>Control de disponibilidad y stock de productos.</p>
                </div>
                {user?.rol === 'Administrador' && (
                    <button 
                        onClick={() => handleOpenModal()} 
                        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        + Nuevo Producto
                    </button>
                )}
            </div>
            
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id_producto}>
                            <td>{p.id_producto}</td>
                            <td>{p.nombre}</td>
                            <td>{p.marca}</td>
                            <td>{p.stock}</td>
                            <td>$ {Number(p.precio).toFixed(2)}</td>
                            <td style={{ color: p.estado === 'Disponible' ? 'green' : 'red' }}>
                                <strong>{p.estado}</strong>
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleOpenModal(p)}
                                    style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => toggleEstado(p)}
                                    style={{ 
                                        padding: '5px 10px', 
                                        backgroundColor: p.estado === 'Disponible' ? '#d9534f' : '#5cb85c', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '3px', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    {p.estado === 'Disponible' ? 'Deshabilitar' : 'Habilitar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Edición/Creación */}
            {modalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                                </div>
                                <div>
                                    <label>Marca:</label>
                                    <input type="text" name="marca" value={formData.marca} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                                </div>
                                <div>
                                    <label>Precio:</label>
                                    <input type="number" name="precio" value={formData.precio} onChange={handleChange} required step="0.01" style={{ width: '100%', padding: '8px' }} />
                                </div>
                                <div>
                                    <label>Stock:</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                                </div>
                                <div>
                                    <label>Stock Mínimo:</label>
                                    <input type="number" name="stock_minimo" value={formData.stock_minimo} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                                </div>
                                <div>
                                    <label>Categoría:</label>
                                    <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                                </div>
                                <div>
                                    <label>Estado:</label>
                                    <select name="estado" value={formData.estado} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                                        {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <label>Imagen (URL):</label>
                                <input type="text" name="image" value={formData.image || ''} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
                            </div>
                            <div style={{ marginTop: '15px' }}>
                                <label>Descripción:</label>
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} style={{ width: '100%', padding: '8px' }} />
                            </div>
                            
                            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                <button type="button" onClick={handleCloseModal} className="btn-close" style={{ marginRight: '10px', float: 'none', backgroundColor: '#6c757d' }}>Cancelar</button>
                                <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
};

export default ProductosPanel;