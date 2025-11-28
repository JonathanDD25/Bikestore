import React, { useState, useEffect } from 'react';
// Asume que estas interfaces y funciones existen en tu pedidoService.ts
// Nota: Debes modificar tu pedidoService.ts para incluir el token en estas llamadas.
import { obtenerPedidos, obtenerDetallesDePedido, PedidoConDetalles } from '../../services/pedidoService';
import type { Pedido } from '../../services/pedidoService';
import PanelLayout from '../layout/PanelLayout'; 

// NOTA: Debes definir Pedido y PedidoConDetalles en pedidoService.ts

const VentasPanel: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [detalleModal, setDetalleModal] = useState<PedidoConDetalles | null>(null);

    const fetchPedidos = async () => {
        try {
            // Asume que esta llamada ahora envía el token para acceder a datos sensibles
            const data = await obtenerPedidos();
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
            // Llama a la función que trae los productos y datos del cliente asociados al pedido
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
                        <th>ID Pedido</th>
                        <th>Fecha</th>
                        <th>Cliente (Correo)</th>
                        <th>Total</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((p) => (
                        <tr key={p.id_pedido}>
                            <td>{p.id_pedido}</td>
                            <td>{p.fecha_pedido ? new Date(p.fecha_pedido).toLocaleDateString() : 'N/A'}</td>
                            {/* Asume que el correo del cliente viene asociado al pedido */}
                            <td>{p.correo_cliente || 'N/A'}</td> 
                            <td>$ {p.precio_total ? p.precio_total.toFixed(2) : '0.00'}</td>
                            <td>
                                <button onClick={() => verDetalles(p.id_pedido!)} className="btn-details">
                                    Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Modal de Detalles */}
            {detalleModal && (
                <div className="modal-backdrop"> {/* Necesitas CSS global/local para el modal */}
                    <div className="modal-content">
                        <h3>Detalle Pedido #{detalleModal.id_pedido}</h3>
                        <p><strong>Cliente:</strong> {detalleModal.nombres} {detalleModal.apellidos}</p>
                        <p><strong>Total:</strong> $ {detalleModal.precio_total.toFixed(2)}</p>
                        <hr />
                        <h4>Productos:</h4>
                        <ul className="detalle-list">
                            {detalleModal.detalles.map((item, index) => (
                                <li key={index}>
                                    {item.nombre_producto} - **{item.cantidad}** unid. x ${item.precio_unitario.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setDetalleModal(null)} className="btn-close">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
};

export default VentasPanel;