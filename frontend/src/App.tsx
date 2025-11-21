import AppRutas from "./routes/Routes";
import { useCart } from "./hooks/useCart";

export const App = () => {
  const { addToCart } = useCart();

  return <AppRutas onAddToCart={addToCart} />;
};