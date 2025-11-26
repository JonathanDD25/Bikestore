import { useState } from "react";
import { useCart } from "../../context/CartContext";   // ⬅️ CAMBIO CLAVE
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../context/AuthContext";
import clearCart from "../../cart/cart"

import HeaderTop from "../layout/HeaderTop";
import Header from "../layout/header";
import NavBar from "../layout/navbar";
import CartPanel from "../../cart/cart";
import AuthPanel from "../login/AuthPanel";
import Footer from "../layout/footer";
import AppRoutes from "../../routes/Routes";
import ProfilePanel from "../perfil/perfilPanel";

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ✔ Ahora usamos el carrito REAL del CartContext
  const { cartItems, setCartItems, addToCart, count, clearCart } = useCart();

  const { toast, showToast } = useToast();
  const { user, logout } = useAuth();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    showToast(`🛒 ${item.name} agregado al carrito`);
  };

  return (
    <>
      <HeaderTop />

      <Header
        cartCount={count}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => {
          if (user) {
            setIsProfileOpen(true);
          } else {
            setIsLoginOpen(true);
          }
        }}
        usuarioLogin={!!user}
        onLogout={logout}
      />

      <NavBar />

      <main>
        <AppRoutes onAddToCart={handleAddToCart} />
      </main>

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        clearCart={clearCart}
        usuarioLogin={user}
        onLoginRequest={() => setIsLoginOpen(true)}
      />

      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <AuthPanel
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <Footer />

      {toast && (
        <div className="toast-notification" onClick={() => showToast("")}>
          {toast}
        </div>
      )}
    </>
  );
}
