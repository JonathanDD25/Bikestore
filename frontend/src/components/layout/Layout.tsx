import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../context/AuthContext";

import HeaderTop from "../layout/HeaderTop";
import Header from "../layout/header";
import NavBar from "../layout/navbar";
import CartPanel from "../../cart/cart";
import AuthPanel from "../login/AuthPanel";
import Footer from "../layout/footer";
import AppRoutes from "../../routes/Routes";
import ProfilePanel from "../perfil/perfilPanel"

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { cartItems, setCartItems, addToCart, count } = useCart();
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
            setIsProfileOpen(true);  // 🔥 abrir panel de perfil
          } else {
            setIsLoginOpen(true);    // 🔥 abrir panel de login
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
        usuarioLogin={user}
        onLoginRequest={() => setIsLoginOpen(true)}
      />

      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <AuthPanel
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}   // 🔥 ahora funciona
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
