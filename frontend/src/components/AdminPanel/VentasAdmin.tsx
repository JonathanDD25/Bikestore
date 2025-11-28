import React, { useState, useEffect } from 'react';
import { obtenerPedido, obtenerDetallesDePedido } from '../../services/pedidoService';
import type { Pedido, PedidoConDetalles } from '../../services/pedidoService';
import PanelLayout from '../layout/PanelLayout'; 
import { useAuthContext } from '../../hooks/useAuthContext';

const VentasPanel: React.FC = () => {
    useAuthContext(["Administrador", "Operario"]);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [detalleModal, setDetalleModal] = useState<PedidoConDetalles | null>(null);

    const fetchPedidos = async () => {
        try {
            const data = await obtenerPedido();
            setPedidos(data);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
            alert("Error al cargar las ventas. Verifique los permisos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const verDetalles = async (id_pedido: number) => {
        try {
            const detalles = await obtenerDetallesDePedido(id_pedido);
            setDetalleModal(detalles);
        } catch (error) {
            console.error("Error fetching details:", error);
            alert("No se pudo cargar el detalle del pedido.");
        }
    };

    if (loading) return <PanelLayout title="Panel de Ventas"><p>Cargando datos de ventas...</p></PanelLayout>;

    return (
        <PanelLayout title="Panel de Ventas (Pedidos)">
            <h3>Historial Completo de Pedidos</h3>
            
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Fecha Realizada</th>
                        <th>Comprador</th>
                        <th>Costo Total</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((p) => (
                        <tr 
                            key={p.id_pedido} 
                            onClick={() => p.id_pedido && verDetalles(p.id_pedido)}
                            style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <td>{p.id_pedido}</td>
                            <td>{p.fecha_pedido ? new Date(p.fecha_pedido).toLocaleDateString() : 'N/A'}</td>
                            <td>
                                {p.nombres} {p.apellidos} <br/>
                                <small style={{ color: '#666' }}>{p.correo_cliente}</small>
                            </td>
                            <td>$ {p.precio_total ? Number(p.precio_total).toFixed(2) : '0.00'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Modal de Detalles */}
            {detalleModal && (
                <div className="modal-backdrop" style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Detalle Pedido #{detalleModal.id_pedido}</h3>
                            <button onClick={() => setDetalleModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <p><strong>Comprador:</strong> {detalleModal.nombres} {detalleModal.apellidos}</p>
                            <p><strong>Email:</strong> {detalleModal.correo_cliente}</p>
                            <p><strong>Fecha:</strong> {detalleModal.fecha_pedido ? new Date(detalleModal.fecha_pedido).toLocaleString() : 'N/A'}</p>
                            <p><strong>Total:</strong> <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>$ {Number(detalleModal.precio_total).toFixed(2)}</span></p>
                        </div>
                        
                        <hr />
                        
                        <h4>Productos:</h4>
                        <ul className="detalle-list" style={{ listStyle: 'none', padding: 0 }}>
                            {detalleModal.detalles.map((item, index) => (
                                <li key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 'bold' }}>{item.nombre_producto}</span>
                                        <span>${Number(item.precio_unitario).toFixed(2)} x {item.cantidad}</span>
                                    </div>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#555' }}>
                                        {item.descripcion}
                                    </p>
                                    <div style={{ textAlign: 'right', fontWeight: 'bold', marginTop: '5px' }}>
                                        Subtotal: ${(Number(item.precio_unitario) * item.cantidad).toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button onClick={() => setDetalleModal(null)} className="btn-close" style={{
                                padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
                            }}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
};

export default VentasPanel;