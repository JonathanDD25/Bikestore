CREATE DATABASE IF NOT EXISTS bikestore;
use bikestore;
-- =====================================================
-- 👤 TABLA: usuario
-- =====================================================
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50),
    apellidos VARCHAR(50),
    correo VARCHAR(100) UNIQUE,
    clave VARCHAR(255),
    rol ENUM('Administrador', 'Operario', 'Cliente'),
    direccion VARCHAR(150),
    telefono VARCHAR(20)
);

-- =====================================================
-- 🚲 TABLA: productos
-- =====================================================
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    precio DECIMAL(18),
    image LONGTEXT,
    descripcion TEXT,
    marca VARCHAR(30),
    categoria VARCHAR(30),
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 0
);

-- =====================================================
-- 📦 TABLA: pedido
-- =====================================================
CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha_pedido DATE DEFAULT (CURRENT_DATE),
    precio_total DECIMAL(18),
    descripcion TEXT,
    metodo_pago ENUM('Efectivo', 'Tarjeta'),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- =====================================================
-- 🧾 TABLA: detalle_pedido
-- =====================================================
CREATE TABLE detalle_pedido (
    id_pedido INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(18),
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
    costo_total_insumo INT
);

-- =====================================================
-- 🧩 TABLA: detalle_entrada
-- =====================================================
CREATE TABLE detalle_entrada (
    id_entrada INT,
    id_producto INT,
    cantidad INT,
    costo_insumo INT,
    PRIMARY KEY (id_entrada, id_producto),
    FOREIGN KEY (id_entrada) REFERENCES entrada_insumo(id_entrada),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);