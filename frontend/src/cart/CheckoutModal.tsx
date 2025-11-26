// CheckoutModal.tsx
import React, { useEffect } from "react";

interface CheckoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function CheckoutModal({ onClose, onConfirm }: CheckoutModalProps) {
  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="checkout-modal-overlay" onClick={onClose} data-testid="checkout-overlay">
      <div
        className="checkout-modal"
        onClick={(e) => e.stopPropagation()} // evitar cierre al clicar dentro
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        data-testid="checkout-modal"
      >
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">✕</button>

        <h3 id="checkout-title">Confirmar compra</h3>
        <p>¿Deseas finalizar la compra?</p>

        <div className="wizard-buttons">
          <button onClick={onClose} className="cancel-btn">Cancelar</button>
          <button
            onClick={() => {
              console.log("[CheckoutModal] onConfirm clicked");
              onConfirm();
            }}
            className="checkout-btn"
            data-testid="confirm-buy"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
