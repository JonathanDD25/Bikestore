import React from 'react';
import type { ReactNode } from 'react';

  
// --- Importación del Nuevo CSS ---
import './PanelLayout.css';


interface PanelLayoutProps {
    children: ReactNode;
    title: string;
}


const PanelLayout: React.FC<PanelLayoutProps> = ({ children, title }) => {

    return (
        <div className="panel-layout-root">
            {/* CONTENIDO PRINCIPAL DEL PANEL */}
            <main className="panel-layout-main">
                <h1 className="panel-title">{title}</h1>
                {children}
            </main>
        </div>
    );
};

export default PanelLayout;