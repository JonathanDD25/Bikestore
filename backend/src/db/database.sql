CREATE DATABASE IF NOT EXISTS bikestore;
use bikestore;
-- =====================================================
-- 👤 TABLA: usuario
-- =====================================================
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Administrador', 'Operario', 'Cliente') NOT NULL,
    direccion VARCHAR(200),
    telefono VARCHAR(20)
);

-- =====================================================
-- 🚲 TABLA: productos
-- =====================================================
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    image VARCHAR(255),
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 0,
    description TEXT,
    marca VARCHAR(100),
    color VARCHAR(50),
    category VARCHAR(50)
);

-- =====================================================
-- 📦 TABLA: pedido
-- =====================================================
CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    estado ENUM('Pendiente', 'Entregado', 'Cancelado') DEFAULT 'Pendiente',
    fecha_pedido DATE DEFAULT (CURRENT_DATE),
    precio_total INT NOT NULL, 
    descripcion TEXT,
    fecha_cancelacion DATE NULL,
    metodo_pago ENUM('Efectivo', 'Transferencia', 'Tarjeta') NOT NULL,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- =====================================================
-- 🧾 TABLA: detalle_pedido
-- =====================================================
CREATE TABLE detalle_pedido (
    id_pedido INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL,
    PRIMARY KEY (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- =====================================================
-- 📥 TABLA: entrada_insumo
-- =====================================================
CREATE TABLE entrada_insumo (
    id_entrada INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    fecha_entrada DATE,
    costo_total_insumo INT NOT NULL
);

-- =====================================================
-- 🧩 TABLA: detalle_entrada
-- =====================================================
CREATE TABLE detalle_entrada (
    id_entrada INT,
    id_producto INT,
    cantidad INT NOT NULL,
    costo_insumo INT NOT NULL,
    PRIMARY KEY (id_entrada, id_producto),
    FOREIGN KEY (id_entrada) REFERENCES entrada_insumo(id_entrada),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);