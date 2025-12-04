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
    rol ENUM('Administrador', 'Operario', 'Cliente', 'Inhabilitado') DEFAULT 'Cliente',
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
<<<<<<< HEAD
=======
    estado ENUM('Disponible','No disponible','Inhabilitado'),
>>>>>>> main
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
<<<<<<< HEAD
    metodo_pago ENUM('Efectivo', 'Tarjeta'),
=======
    metodo_pago VARCHAR(50),
>>>>>>> main
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

Insert into usuario (nombres,apellidos,correo,clave,rol) values
("Admin", "Master", "admin@correo.com", "$2b$10$jq01JbaQHZv6MDbz1pWvpuDXvR/dbPTm.WZtQrBCDfZzuPxtoRiii", "Administrador"),
("Operario", "Trabajador", "operario@correo.com", "$2b$10$jq01JbaQHZv6MDbz1pWvpuDXvR/dbPTm.WZtQrBCDfZzuPxtoRiii", "Operario");

INSERT INTO productos (nombre, precio, image, descripcion, marca, categoria, estado, stock, stock_minimo) VALUES
('Bicicleta Montaña XR500', 1200.00, 'https://picsum.photos/300?1', 'Bicicleta de montaña con suspensión delantera y frenos de disco.', 'Trek', 'Montaña', 'Disponible', 15, 3),
('Bicicleta Ruta Speedster 300', 1800.00, 'https://picsum.photos/300?2', 'Bicicleta de ruta ligera con cuadro de aluminio.', 'Scott', 'Ruta', 'Disponible', 10, 2),
('Bicicleta Urbana CityGo', 850.00, 'https://picsum.photos/300?3', 'Bicicleta urbana cómoda y práctica para la ciudad.', 'Giant', 'Urbana', 'Disponible', 20, 5),
('Casco ProShield M', 120.00, 'https://picsum.photos/300?4', 'Casco ligero con ajuste rápido y ventilación avanzada.', 'Specialized', 'Accesorios', 'Disponible', 35, 10),
('Guantes MTB GripX', 25.00, 'https://picsum.photos/300?5', 'Guantes resistentes para MTB con refuerzo en palma.', 'Fox', 'Accesorios', 'Disponible', 50, 10),
('Luz Delantera LED 500lm', 40.00, 'https://picsum.photos/300?6', 'Luz delantera recargable con intensidad regulable.', 'Shimano', 'Accesorios', 'Disponible', 40, 5),
('Llantas TrailMax 29"', 65.00, 'https://picsum.photos/300?7', 'Llantas para bicicletas de montaña con agarre superior.', 'Pirelli', 'Repuestos', 'Disponible', 30, 6),
('Cadena UltraDrive 11v', 35.00, 'https://picsum.photos/300?8', 'Cadena resistente compatible con sistemas de 11 velocidades.', 'KMC', 'Repuestos', 'Disponible', 25, 4),
('Bomba de Piso AirForce', 55.00, 'https://picsum.photos/300?9', 'Bomba de aire de alta presión con medidor incluido.', 'Bontrager', 'Accesorios', 'Disponible', 15, 3),
('Bicicleta BMX Street 360', 950.00, 'https://picsum.photos/300?10', 'Bicicleta BMX para trucos y saltos extremos.', 'Mongoose', 'BMX', 'Disponible', 12, 2);