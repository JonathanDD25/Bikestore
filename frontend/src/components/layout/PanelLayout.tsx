import React from 'react';
import type { ReactNode } from 'react';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'; 

// --- Importación de Componentes de Layout ---
import HeaderTopComponent from './HeaderTop'; 
import HeaderComponent from './header';       
import NavbarComponent from './navbar';         
import FooterComponent from './footer';       

// --- Importación del Nuevo CSS ---
import './PanelLayout.css';


interface PanelLayoutProps {
    children: ReactNode;
    title: string;
}

const PanelLayout: React.FC<PanelLayoutProps> = ({ children, title }) => {
    const { user, logout } = useAuth();
    const { count } = useCart(); 

    // Funciones vacías (No-Op)
    const NO_OP = () => { /* No hace nada */ };


    return (
        <div className="panel-layout-root">
            {/* COMPONENTES DE LAYOUT */}
            <HeaderTopComponent /> 
            
            <HeaderComponent 
                cartCount={count}
                onCartClick={NO_OP} 
                onLoginClick={NO_OP} 
                usuarioLogin={!!user}
                onLogout={logout} 
            /> 
            
            <NavbarComponent /> 
            
            {/* CONTENIDO PRINCIPAL DEL PANEL */}
            <main className="panel-layout-main">
                <h1 className="panel-title">{title}</h1>
                
                {children}
            </main>

            <FooterComponent />
        </div>
    );
};

export default PanelLayout;