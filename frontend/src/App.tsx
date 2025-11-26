import "./assets/styles.css";
import { CartProvider } from "../src/context/CartContext";
import { AuthProvider } from "../src/context/AuthContext";
import Layout from "./components/layout/Layout";
import Toast from "./components/toast/toast";

export default function App() {
  return (
      <AuthProvider>
        <CartProvider>
          <Layout />
          <Toast />
        </CartProvider>
      </AuthProvider>
  );
}