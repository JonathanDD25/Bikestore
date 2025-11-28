// ============================================================
//  COMPONENTE: CartPanel (SIN MODAL - SOLO VISUAL)
// ============================================================

import React from "react";
import "./cart.css";
import { realizarCompra } from "../services/compraService";
import { useCart } from "../context/CartContext";

// type User = {
//   id: number;
//   name: string;
//   email?: string;
// };

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  discount?: number;
}

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  clearCart: () => void;
  usuarioLogin: { id_usuario: number;[key: string]: any } | null;
  onLoginRequest: (mode?: "login" | "register") => void;
}

export default function CartPanel({
  isOpen,
  onClose,
  cartItems,
  setCartItems,
  clearCart,
  usuarioLogin,
  onLoginRequest,
}: CartPanelProps) {

  // ============================
  // Cantidades
  // ============================
  const changeQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleCompra = async () => {
    if (!usuarioLogin) {
      alert("Debes iniciar sesión para comprar");
      return;
    }

    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      // console.log("productos del pedido", cartItems)
      // console.log("Usuario que realiza el pedido:",usuarioLogin)
      // console.log("ID Usuario que realiza el pedido:", usuarioLogin.id)
      await realizarCompra(usuarioLogin.id_usuario, cartItems);

      alert("¡Compra realizada con éxito!");

      clearCart(); // ← vacía el carrito
      onClose();   // ← cierra el modal si quieres

    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al procesar la compra.");
    }
  };


  // ============================
  // Eliminar item
  // ============================
  const removeItem = (id: number) =>
    setCartItems(items => items.filter(item => item.id !== id));

  // ============================
  // LIMPIAR CARRITO
  // ============================
  // ============================
  // Totales
  // ============================
  const subtotal = cartItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const discount = cartItems.reduce(
    (acc, item) =>
      item.discount ? acc + (item.price * item.quantity * item.discount) / 100 : acc,
    0
  );

  const total = subtotal - discount;

  // ============================
  // BOTÓN COMPRAR (sin acción)
  // ============================
  const checkoutHandler = () => {
    console.log("Comprar presionado — por ahora sin acción.");
  };

  return (
    <>
      <aside className={`cart-panel ${isOpen ? "open" : ""}`}>

        {/* HEADER */}
        <div className="cart-header">
          <h2>CARRITO</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* CONTENIDO */}
        <div className="cart-scroll-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío.</p>
              <button className="checkout-btn" onClick={onClose}>
                CONTINUAR COMPRANDO
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price.toLocaleString()}</p>

                  <div className="quantity-control">
                    <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                <button className="remove-item" onClick={() => removeItem(item.id)}>
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="cart-footer">

            {/* BOTÓN LIMPIAR */}
            <button className="clear-cart-btn" onClick={clearCart}>
              Limpiar carrito
            </button>

            <div className="summary-line">
              <span>Subtotal:</span>
              <strong>${subtotal.toLocaleString()}</strong>
            </div>

            {discount > 0 && (
              <div className="summary-line discount">
                <span>Descuento:</span>
                <strong>- ${discount.toLocaleString()}</strong>
              </div>
            )}

            <hr />

            <div className="summary-total">
              <span>Total:</span>
              <strong>${total.toLocaleString()}</strong>
            </div>

            <button
              className="checkout-btn"
              disabled={cartItems.length === 0}
              onClick={handleCompra}
            >
              Comprar
            </button>

          </div>
        )}
      </aside>

      {isOpen && <div className="overlay active" onClick={onClose}></div>}
    </>
  );
}
