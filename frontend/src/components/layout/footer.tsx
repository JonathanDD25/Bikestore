/**
 * ============================================================
 * COMPONENTE: Footer — Optimizado
 * ============================================================
 */

import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from "react-icons/fa";
import "./footer.css";

const SOCIAL_LINKS = [
    { icon: <FaFacebookF />, label: "Facebook", url: "https://www.facebook.com/" },
    { icon: <FaInstagram />, label: "Instagram", url: "https://www.instagram.com" },
    { icon: <FaWhatsapp />, label: "WhatsApp", url: "https://web.whatsapp.com/" },
];

const CONTACT_INFO = [
    { icon: <FaMapMarkerAlt aria-hidden="true" />, text: "Bogotá, Colombia" },
    {
        icon: <FaEnvelope aria-hidden="true" />,
        text: "contacto@bikestore.com.co",
        href: "mailto:contacto@bikestore.com.co",
    },
    {
        icon: <FaPhoneAlt aria-hidden="true" />,
        text: "+57 300 123 4567",
        href: "tel:+573001234567",
    },
];

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer
            id="bikeStore-footer"
            role="contentinfo"
            aria-label="Pie de página de Bike Store"
        >
            <div className="bikeStore-footer-container">

                {/* LOGO & DESCRIPCIÓN */}
                <section className="bikeStore-footer-section">
                    <h2 className="bikeStore-footer-logo">
                        <span>Bike</span>Store
                    </h2>
                    <p>
                        Tu tienda online especializada en bicicletas, repuestos y accesorios.
                        Calidad, tecnología y pasión por el ciclismo en Colombia.
                    </p>
                </section>

                {/* CONTACTO */}
                <section className="bikeStore-footer-section">
                    <h3>Contacto</h3>

                    <ul className="bikeStore-footer-contact">
                        {CONTACT_INFO.map((item, i) => (
                            <li key={i}>
                                {item.icon}
                                {item.href ? (
                                    <a href={item.href}>{item.text}</a>
                                ) : (
                                    <span>{item.text}</span>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* REDES */}
                    <div className="bikeStore-footer-social">
                        {SOCIAL_LINKS.map((s, i) => (
                            <a
                                key={i}
                                href={s.url}
                                aria-label={s.label}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            {/* COPYRIGHT */}
            <div className="bikeStore-footer-bottom">
                <p>
                    &copy; {year} <strong>Bike Store Colombia</strong>. Todos los derechos
                    reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
