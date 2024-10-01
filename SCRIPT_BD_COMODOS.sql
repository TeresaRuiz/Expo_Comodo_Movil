-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS expo_comodos;

-- Crear la base de datos
CREATE DATABASE expo_comodos;

-- Seleccionar la base de datos para su uso
USE expo_comodos;

-- Tabla de usuarios
-- Almacena información de los clientes registrados
CREATE TABLE tb_usuarios (
  id_usuario INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  usuario VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  clave VARCHAR(100) NOT NULL,
  direccion_cliente LONGTEXT NOT NULL, 
  telefono VARCHAR(20) NOT NULL, 
  dui_cliente VARCHAR(20) NOT NULL, -- Documento Único de Identidad
  estado_cliente TINYINT(1) DEFAULT TRUE, 
  PRIMARY KEY (id_usuario),
  CONSTRAINT uc_usuario UNIQUE (usuario),
  CONSTRAINT uc_correo UNIQUE (correo),
  CONSTRAINT uc_telefono UNIQUE (telefono),
  CONSTRAINT uc_dui_cliente UNIQUE (dui_cliente)
);

-- Tabla de niveles de usuarios
-- Define los diferentes niveles de acceso para los administradores
CREATE TABLE tb_niveles_usuarios (
  id_nivel_usuario INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre_nivel VARCHAR (50) NOT NULL,
  PRIMARY KEY (id_nivel_usuario)
);

-- Tabla de administradores
-- Almacena información de los usuarios administrativos del sistema
CREATE TABLE tb_admins (
  id_administrador INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre_administrador VARCHAR(50) NOT NULL,
  usuario_administrador VARCHAR(50) NOT NULL,
  correo_administrador VARCHAR(50) NOT NULL,
  clave_administrador VARCHAR(100) NOT NULL, 
  id_nivel_usuario INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_administrador),
  CONSTRAINT fk_nivel_usuario FOREIGN KEY (id_nivel_usuario) REFERENCES tb_niveles_usuarios(id_nivel_usuario),
  CONSTRAINT uc_usuario_administrador UNIQUE (usuario_administrador),
  CONSTRAINT uc_correo_administrador UNIQUE (correo_administrador)
);

-- Tabla de géneros de zapatos
-- Clasifica los productos por género
CREATE TABLE tb_generos_zapatos (
  id_genero INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre_genero VARCHAR(100) NOT NULL,
  imagen_genero VARCHAR(20) NULL,
  PRIMARY KEY (id_genero)
);

-- Tabla de categorías
-- Define las diferentes categorías de productos
CREATE TABLE tb_categorias (
  id_categoria INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre_categoria VARCHAR(100) NOT NULL,
  imagen VARCHAR(20) NULL,
  PRIMARY KEY (id_categoria)
);

-- Tabla de tallas
-- Almacena las diferentes tallas disponibles para los productos
CREATE TABLE tb_tallas (
  id_talla INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre_talla VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_talla)
);

-- Tabla de marcas
-- Almacena las diferentes marcas de productos
CREATE TABLE tb_marcas (
  id_marca INT UNSIGNED AUTO_INCREMENT NOT NULL,
  marca VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_marca)
);

-- Tabla de colores
-- Define los colores disponibles para los productos
CREATE TABLE tb_colores (
  id_color INT UNSIGNED AUTO_INCREMENT NOT NULL,
  color VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_color)
);

-- Tabla de descuentos
-- Almacena información sobre los descuentos aplicables a los productos
CREATE TABLE tb_descuentos (
  id_descuento INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre_descuento VARCHAR(100) NOT NULL,
  descripcion VARCHAR(200) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id_descuento),
  UNIQUE (nombre_descuento),
  CONSTRAINT ck_valor CHECK (valor >= 0)
);

-- Tabla de materiales
-- Define los materiales utilizados en los productos
CREATE TABLE tb_materiales (
  id_material INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_material)
);

-- Tabla de productos
-- Almacena la información principal de los productos
CREATE TABLE tb_productos (
  id_producto INT UNSIGNED AUTO_INCREMENT NOT NULL,
  nombre_producto VARCHAR(100) NOT NULL,
  codigo_interno VARCHAR(50) NOT NULL,
  referencia_proveedor VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  id_marca INT UNSIGNED,
  id_genero INT UNSIGNED,
  id_categoria INT UNSIGNED,
  id_material INT UNSIGNED NOT NULL,
  id_descuento INT UNSIGNED NOT NULL,
  imagen VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_producto),
  CONSTRAINT fk_material FOREIGN KEY (id_material) REFERENCES tb_materiales(id_material),
  CONSTRAINT fk_marcas FOREIGN KEY (id_marca) REFERENCES tb_marcas(id_marca),
  CONSTRAINT fk_generos FOREIGN KEY (id_genero) REFERENCES tb_generos_zapatos(id_genero),
  CONSTRAINT fk_descuento FOREIGN KEY (id_descuento) REFERENCES tb_descuentos(id_descuento),
  CONSTRAINT fk_categorias FOREIGN KEY (id_categoria) REFERENCES tb_categorias(id_categoria),
  CONSTRAINT ck_precio CHECK (precio >= 0),
  CONSTRAINT uc_nombre_producto UNIQUE (nombre_producto),
  CONSTRAINT uc_codigo_interno UNIQUE (codigo_interno),
  CONSTRAINT uc_referencia_proveedor UNIQUE (referencia_proveedor)
);

-- Tabla de detalles de productos
-- Almacena información específica de cada variante de producto (por talla, color, etc.)
CREATE TABLE tb_detalles_productos (
  id_detalle_producto INT UNSIGNED AUTO_INCREMENT NOT NULL,
  id_producto INT UNSIGNED NOT NULL,
  id_talla INT UNSIGNED NOT NULL,
  existencias INT UNSIGNED NOT NULL,
  id_color INT UNSIGNED NOT NULL,
  descripcion VARCHAR(200) NOT NULL,
  PRIMARY KEY (id_detalle_producto),
  CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES tb_productos(id_producto),
  CONSTRAINT fk_talla FOREIGN KEY (id_talla) REFERENCES tb_tallas(id_talla),
  CONSTRAINT fk_color FOREIGN KEY (id_color) REFERENCES tb_colores(id_color),
  CONSTRAINT ck_existencias  CHECK (existencias >= 0)
);

-- Tabla de reservas
-- Almacena información sobre las reservas realizadas por los usuarios
CREATE TABLE tb_reservas (
  id_reserva INT UNSIGNED AUTO_INCREMENT NOT NULL,
  id_usuario INT UNSIGNED NOT NULL,
  fecha_reserva DATETIME DEFAULT CURRENT_DATE() NOT NULL, 
  estado_reserva ENUM ('Aceptado', 'Pendiente', 'Cancelado') NOT NULL,
  PRIMARY KEY (id_reserva),
  CONSTRAINT fk_reserva_usuario FOREIGN KEY (id_usuario) REFERENCES tb_usuarios (id_usuario)
);

-- Tabla de detalles de reservas
-- Almacena los productos específicos incluidos en cada reserva
CREATE TABLE tb_detalles_reservas (
  id_detalle_reserva INT UNSIGNED AUTO_INCREMENT NOT NULL,
  id_reserva INT UNSIGNED NOT NULL,
  cantidad INT UNSIGNED NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  id_detalle_producto INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_detalle_reserva),
  CONSTRAINT fk_reserva FOREIGN KEY (id_reserva) REFERENCES tb_reservas(id_reserva),
  CONSTRAINT fk_detalle_producto FOREIGN KEY (id_detalle_producto) REFERENCES tb_detalles_productos(id_detalle_producto),
  CONSTRAINT ck_cantidad  CHECK (cantidad >= 0),
  CONSTRAINT ck_precio_unitario CHECK (precio_unitario >= 0)
);

-- Agregar columnas para la recuperación de contraseña en la tabla de usuarios
ALTER TABLE tb_usuarios
ADD COLUMN recovery_pin VARCHAR(10) NULL,
ADD COLUMN pin_expiry DATETIME NULL;

-- Agregar columnas para la seguridad de la cuenta en la tabla de administradores
ALTER TABLE tb_admins
ADD COLUMN intentos_fallidos INT UNSIGNED DEFAULT 0 NOT NULL,
ADD COLUMN fecha_clave DATETIME NULL DEFAULT NOW(),
ADD COLUMN bloqueo_hasta DATETIME NULL;

-- Agregar columnas para el restablecimiento de contraseña en la tabla de administradores
ALTER TABLE tb_admins
ADD COLUMN reset_code VARCHAR(6) DEFAULT NULL,
ADD COLUMN reset_code_expiry DATETIME DEFAULT NULL;

-- Agregar columnas para la autenticación de dos factores en la tabla de administradores
ALTER TABLE tb_admins ADD COLUMN totp_secret VARCHAR(32);
ALTER TABLE tb_admins ADD COLUMN totp_enabled BOOLEAN DEFAULT FALSE;

-- Agregar columna para el seguimiento de la última actividad del usuario
ALTER TABLE tb_usuarios ADD COLUMN ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Agregar columnas para la autenticación de dos factores en la tabla de administradores
ALTER TABLE tb_admins 
ADD COLUMN codigo_2fa VARCHAR(6), 
ADD COLUMN expiracion_2fa DATETIME;

-- Insertar niveles de usuario predefinidos
INSERT INTO tb_niveles_usuarios (id_nivel_usuario, nombre_nivel)
VALUES 
(1, 'administrador'),
(2, 'inventaristas'),
(3, 'vendedoras');

-- Crear una función para generar un saludo personalizado
DELIMITER //

CREATE FUNCTION generar_saludo(nombre_usuario VARCHAR(100))
RETURNS VARCHAR(255)
BEGIN
    DECLARE saludo VARCHAR(255);
    SET saludo = CONCAT('¡Hola ', nombre_usuario, '! Bienvenido/a.');
    RETURN saludo;
END;
//

DELIMITER ;

-- Modificar la tabla de productos para permitir descuentos nulos
ALTER TABLE tb_productos
MODIFY COLUMN id_descuento INT UNSIGNED DEFAULT NULL,
ADD CONSTRAINT ck_descuento 
    FOREIGN KEY (id_descuento) 
    REFERENCES tb_descuentos(id_descuento) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- Crear un trigger para actualizar existencias después de aceptar una reserva
DELIMITER //

CREATE TRIGGER actualizar_existencias
AFTER UPDATE ON tb_reservas
FOR EACH ROW
BEGIN
    IF NEW.estado_reserva = 'Aceptado' THEN
        UPDATE tb_detalles_productos dp
        INNER JOIN tb_detalles_reservas dr ON dp.id_detalle_producto = dr.id_detalle_producto
        SET dp.existencias = dp.existencias - dr.cantidad
        WHERE dr.id_reserva = NEW.id_reserva;
    END IF;
END //

DELIMITER ;

-- Crear un procedimiento almacenado para eliminar reservas pendientes antiguas
DELIMITER //

CREATE PROCEDURE eliminar_reservas_pendientes()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE usuario_id INT;
    DECLARE reserva_id INT;
    DECLARE usuario_correo VARCHAR(100);
    
    DECLARE cur CURSOR FOR 
        SELECT r.id_usuario, r.id_reserva, u.correo 
        FROM tb_reservas r
        JOIN tb_usuarios u ON r.id_usuario = u.id_usuario
        WHERE r.estado_reserva = 'Pendiente' 
          AND r.fecha_reserva < NOW() - INTERVAL 72 HOUR;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO usuario_id, reserva_id, usuario_correo;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Eliminar todos los detalles de la reserva
        DELETE FROM tb_detalles_reservas WHERE id_reserva = reserva_id;

        -- Eliminar la reserva
        DELETE FROM tb_reservas WHERE id_reserva = reserva_id;

        -- Llamar a la función para enviar correo (asume que existe una función 'enviar_correo')
        CALL enviar_correo(usuario_correo, 'Su pedido ha sido eliminado por políticas de la app.');
    END LOOP;

    CLOSE cur;
END //

DELIMITER ;

-- Crear un evento programado para ejecutar el procedimiento de eliminación de reservas
DELIMITER //

CREATE EVENT eliminar_reservas_event
ON SCHEDULE EVERY 1 HOUR
DO
BEGIN
    CALL eliminar_reservas_pendientes();
END //

DELIMITER ;

-- Activar el programador de eventos
SET GLOBAL event_scheduler = ON;

INSERT INTO tb_usuarios (id_usuario, nombre, usuario, correo, clave, direccion_cliente, telefono, dui_cliente)
VALUES 
(1, 'Lionel Messi', 'messi10', 'lionel@gmail.com', 'messi123', 'Alameda Franklin Delano Roosevelt', '7555-1001', '123456789'),
(2, 'Harry Kane', 'Kane3', 'HKane@gmail.com', 'Kane456', 'Alameda Franklin Delano Roosevelt', '7555-1002', '987654321'),
(3, 'Sergio Busquets', 'busquets5', 'busquets@gmail.com', 'busquets789', 'Alameda Franklin Delano Roosevelt', '7555-1003', '112233445'),
(4, 'Jordi Alba', 'alba18', 'alba@gmail.com', 'alba123', 'Alameda Franklin Delano Roosevelt', '7555-1004', '543210987'),
(5, 'Ansu Fati', 'fati22', 'fati@gmail.com', 'fati456', 'Alameda Franklin Delano Roosevelt', '7555-1005', '678905432'),
(6, 'Frenkie de Jong', 'jong21', 'jong@gmail.com', 'jong789', 'Alameda Franklin Delano Roosevelt', '7555-1006', '876543210'),
(7, 'Pedri', 'pedri16', 'pedri@gmail.com', 'pedri123', 'Alameda Franklin Delano Roosevelt', '7555-1007', '234567890'),
(8, 'Luis Suarez', 'Suarez11', 'luchosuarez@gmail.com', 'suarez456', 'Alameda Franklin Delano Roosevelt', '7555-1008', '098765432'),
(9, 'Marc-André ter Stegen', 'terstegen1', 'terstegen@gmail.com', 'terstegen123', 'Alameda Franklin Delano Roosevelt', '5755-1009', '456789012'),
(10, 'Ronald Araújo', 'araujo4', 'araujo@gmail.com', 'araujo789', 'Alameda Franklin Delano Roosevelt', '7555-1010', '789012345');


SELECT*FROM tb_usuarios;

INSERT INTO tb_generos_zapatos (id_genero, nombre_genero, imagen_genero)
VALUES 
(1, 'Zapatillas deportivas', 'zapatillas.png'),
(2, 'Botas de invierno', 'botas_invierno.png'),
(3, 'Zapatos casuales', 'zapatos_casuales.png'),
(4, 'Sandalias de verano', 'sandalias_verano.png'),
(5, 'Botines de moda', 'botines_moda.png'),
(6, 'Zapatos formales', 'zapatos_formales.png'),
(7, 'Zapatillas para correr', 'zapatilla_correr.png'),
(8, 'Chanclas de playa', 'chanclas_playa.png'),
(9, 'Mocasines elegantes', 'mocasin_elegante.png'),
(10, 'Botas de lluvia', 'botas_lluvia.png');

SELECT*FROM tb_generos_zapatos;


INSERT INTO tb_categorias (id_categoria, nombre_categoria, imagen)
VALUES 
(1, 'Running', 'running.png'),
(2, 'Baloncesto', 'baloncesto.png'),
(3, 'Fútbol', 'futbol.png'),
(4, 'Nieve', 'nieve.png'),
(5, 'Lluvia', 'lluvia.png'),
(6, 'Casual', 'casual.png'),
(7, 'Formal', 'formal.png'),
(8, 'Playa', 'playa.png'),
(9, 'Piscina', 'piscina.png'),
(10, 'Moda', 'moda.png');

SELECT*FROM tb_categorias;

INSERT INTO tb_tallas (id_talla, nombre_talla) VALUES
(1, '35'),
(2, '36'),
(3, '37'),
(4, '38'),
(5, '39'),
(6, '40'),
(7, '41'),
(8, '42'),
(9, '43'),
(10, '44');

SELECT*FROM tb_tallas;

INSERT INTO tb_marcas (id_marca, marca) VALUES
(1, 'Nike'),
(2, 'Adidas'),
(3, 'Timberland'),
(4, 'Converse'),
(5, 'Birkenstock'),
(6, 'Dr. Martens'),
(7, 'Clarks'),
(8, 'Gucci'),
(9, 'Hunter'),
(10, 'Puma');

SELECT*FROM tb_marcas;

INSERT INTO tb_colores (id_color, color) VALUES
(1, 'Negro'),
(2, 'Blanco'),
(3, 'Azul'),
(4, 'Rojo'),
(5, 'Verde'),
(6, 'Amarillo'),
(7, 'Gris'),
(8, 'Marrón'),
(9, 'Beige'),
(10, 'Blanco/Negro');

SELECT*FROM tb_colores;

INSERT INTO tb_descuentos (id_descuento, nombre_descuento, descripcion, valor) VALUES
(1, 'Descuento Primavera', 'Descuento especial de primavera', 15.00),
(2, 'Oferta Verano', 'Oferta especial de verano', 20.00),
(3, 'Promoción Otoño', 'Promoción de temporada de otoño', 10.00),
(4, 'Venta de Invierno', 'Gran venta de invierno', 25.00),
(5, 'Descuento Estudiante', 'Descuento para estudiantes', 30.00),
(6, 'Oferta Black Friday', 'Ofertas exclusivas para el Black Friday', 40.00),
(7, 'Promoción Cyber Monday', 'Grandes descuentos para el Cyber Monday', 35.00),
(8, 'Descuento Cumpleaños', 'Descuento especial de cumpleaños', 10.00),
(9, 'Descuento Cliente Frecuente', 'Descuento para clientes frecuentes', 20.00),
(10, 'Oferta Fin de Temporada', 'Ofertas de liquidación al final de la temporada', 50.00);

SELECT*FROM tb_descuentos;

INSERT INTO tb_materiales (id_material, nombre)
VALUES
(1, 'Cuero'),
(2, 'Tela'),
(3, 'Sintético'),
(4, 'Goma'),
(5, 'Nylon'),
(6, 'Lona'),
(7, 'Lienzo'),
(8, 'Seda'),
(9, 'Lana'),
(10, 'Algodón');

SELECT*FROM tb_materiales;

INSERT INTO tb_productos (id_producto, nombre_producto, codigo_interno, referencia_proveedor, precio, id_marca, id_genero, id_categoria, imagen, id_material, id_descuento)
VALUES 
(1, 'Zapatillas Running Nike Air Max', 'NIKE001', 'NIKE123', 129.99, 1, 1, 1, 'running.png', 1, 1),
(2, 'Botas de Invierno Timberland', 'TIMBER001', 'TIMBER123', 189.99, 3, 2, 4, 'botas.png', 2, 3),
(3, 'Zapatos Casuales Converse Chuck Taylor', 'CONVERSE001', 'CONVERSE123', 59.99, 4, 3, 6, 'casuales.png', 3, 5),
(4, 'Sandalias de Verano Birkenstock', 'BIRKEN001', 'BIRKEN123', 79.99, 5, 4, 9, 'botines.png', 4, 7),
(5, 'Botines de Moda Dr. Martens', 'MARTENS001', 'MARTENS123', 169.99, 6, 5, 10, 'moda.png', 5, 9),
(6, 'Zapatos Formales Clarks', 'CLARKS001', 'CLARKS123', 99.99, 7, 6, 7, 'formales.png', 6, 1),
(7, 'Zapatillas para Correr Adidas Ultraboost', 'ADIDAS001', 'ADIDAS123', 119.99, 2, 7, 1, 'zapatillas.png', 7, 2),
(8, 'Chanclas de Playa Havaianas', 'HAVAIANAS001', 'HAVAIANAS123', 39.99, 10, 8, 8, 'chanclas.png', 4, 4),
(9, 'Mocasines Elegantes Gucci', 'GUCCI001', 'GUCCI123', 149.99, 8, 9, 7, 'mocasines.png', 8, 6),
(10, 'Botas de Lluvia Hunter', 'HUNTER001', 'HUNTER123', 199.99, 9, 10, 5, 'botasdelluvia.png', 2, 8);


SELECT*FROM tb_productos;

-- Insertar registros en tb_detalles_productos
INSERT INTO tb_detalles_productos (id_detalle_producto, id_producto, id_talla, existencias, id_color, descripcion)
VALUES
  (1, 1, 1, 50, 1, 'Zapatillas Nike Air Max'),
  (2, 1, 2, 75, 2, 'Zapatillas Nike Air Max'),
  (3, 2, 3, 30, 8, 'Botas Timberland'),
  (4, 2, 4, 40, 3, 'Botas Timberland'),
  (5, 3, 5, 100, 3, 'Zapatillas Converse Chuck Taylor'),
  (6, 3, 6, 80, 2, 'Zapatillas Converse Chuck Taylor'),
  (7, 4, 7, 60, 1, 'Sandalias Birkenstock'),
  (8, 4, 8, 70, 2, 'Sandalias Birkenstock'),
  (9, 5, 9, 45, 1, 'Botas Dr. Martens'),
  (10, 5, 10, 55, 4, 'Botas Dr. Martens');
SELECT * FROM tb_detalles_productos;

INSERT INTO tb_reservas (id_reserva, id_usuario, fecha_reserva, estado_reserva)
VALUES 
(1, 1, '2024-04-06 10:00:00', 'Pendiente'),
(2, 2, '2024-04-07 11:00:00', 'Pendiente'),
(3, 3, '2024-04-08 12:00:00', 'Pendiente'),
(4, 4, '2024-04-09 13:00:00', 'Pendiente'),
(5, 5, '2024-04-10 14:00:00', 'Pendiente'),
(6, 6, '2024-04-11 15:00:00', 'Pendiente'),
(7, 7, '2024-04-12 16:00:00','Pendiente'),
(8, 8, '2024-04-13 17:00:00', 'Pendiente'),
(9, 9, '2024-04-14 18:00:00', 'Pendiente'),
(10, 10, '2024-04-15 19:00:00', 'Pendiente');


SELECT*FROM tb_reservas;

INSERT INTO tb_detalles_reservas (id_detalle_reserva, id_reserva, cantidad, precio_unitario, id_detalle_producto)
VALUES
(1, 1, 2, 129.99, 1),
(2, 7, 1,  119.99, 7),
(3, 2, 1,  189.99, 3),
(4, 4, 2,  79.99, 7),
(5, 3, 3,  59.99, 5),
(6, 6, 1,  99.99, 6),
(7, 1, 1,  129.99, 2),
(8, 5, 1, 169.99, 9),
(9, 2, 2, 189.99, 4),
(10, 8, 1,  39.99, 8),
(11, 3, 1,  59.99, 6),
(12, 7, 2,  119.99, 7),
(13, 4, 1,  79.99, 8),
(14, 9, 1,  149.99, 9),
(15, 5, 1, 169.99, 10),
(16, 10, 1,  199.99, 3),
(17, 1, 2,  129.99, 1),
(18, 6, 1,  99.99, 6),
(19, 2, 1,  189.99, 3),
(20, 8, 2,  39.99, 8);
SELECT * FROM tb_detalles_reservas;
