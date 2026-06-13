-- =============================================
-- E-INVENTORY DATABASE
-- UAS Pemrograman Web 2
-- =============================================

CREATE DATABASE IF NOT EXISTS db_einventory
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_einventory;

-- ---------------------------------------------
-- 1. TABEL USERS
-- ---------------------------------------------
CREATE TABLE users (
  id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)    NOT NULL,
  email      VARCHAR(100)    NOT NULL UNIQUE,
  password   VARCHAR(255)    NOT NULL,
  token      VARCHAR(255)    NULL DEFAULT NULL,
  role       ENUM('admin','viewer') NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------
-- 2. TABEL CATEGORIES
-- ---------------------------------------------
CREATE TABLE categories (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)   NOT NULL,
  description TEXT           NULL,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------
-- 3. TABEL SUPPLIERS
-- ---------------------------------------------
CREATE TABLE suppliers (
  id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  name       VARCHAR(150)    NOT NULL,
  contact    VARCHAR(100)    NULL,
  phone      VARCHAR(20)     NULL,
  address    TEXT            NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------
-- 4. TABEL ITEMS (Barang)
-- ---------------------------------------------
CREATE TABLE items (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  category_id INT UNSIGNED   NOT NULL,
  supplier_id INT UNSIGNED   NOT NULL,
  name        VARCHAR(150)   NOT NULL,
  sku         VARCHAR(50)    NOT NULL UNIQUE,
  stock       INT            NOT NULL DEFAULT 0,
  min_stock   INT            NOT NULL DEFAULT 5,
  price       DECIMAL(15,2)  NOT NULL DEFAULT 0.00,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_item_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_item_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id)  ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------
-- 5. TABEL STOCK_HISTORY (Histori Masuk/Keluar)
-- ---------------------------------------------
CREATE TABLE stock_history (
  id         INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  item_id    INT UNSIGNED    NOT NULL,
  user_id    INT UNSIGNED    NOT NULL,
  type       ENUM('masuk','keluar') NOT NULL,
  quantity   INT            NOT NULL,
  note       VARCHAR(255)   NULL,
  created_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_history_item FOREIGN KEY (item_id) REFERENCES items(id)  ON DELETE CASCADE  ON UPDATE CASCADE,
  CONSTRAINT fk_history_user FOREIGN KEY (user_id) REFERENCES users(id)  ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================
-- DATA AWAL (SEEDER)
-- =============================================

-- Admin default (password: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Administrator', 'admin@einventory.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Kategori
INSERT INTO categories (name, description) VALUES
('Elektronik',    'Perangkat elektronik dan aksesoris'),
('Furniture',     'Perabotan kantor dan rumah tangga'),
('Alat Tulis',    'Perlengkapan alat tulis kantor (ATK)'),
('Jaringan',      'Perangkat jaringan dan kabel');

-- Supplier
INSERT INTO suppliers (name, contact, phone, address) VALUES
('PT. Sumber Makmur',   'Budi Santoso',  '08123456789', 'Jl. Industri No.10, Jakarta'),
('CV. Maju Bersama',    'Siti Rahayu',   '08234567890', 'Jl. Raya Barat No.5, Surabaya'),
('Toko Serba Ada',      'Ahmad Fauzi',   '08345678901', 'Jl. Pasar Baru No.22, Bandung');

-- Barang
INSERT INTO items (category_id, supplier_id, name, sku, stock, min_stock, price) VALUES
(1, 1, 'Laptop Lenovo ThinkPad',  'ELK-001', 10, 3, 8500000.00),
(1, 1, 'Monitor LG 24 inch',      'ELK-002', 15, 5, 2300000.00),
(1, 2, 'Keyboard Mechanical',     'ELK-003',  8, 3,  450000.00),
(2, 2, 'Meja Kantor Minimalis',   'FRN-001',  6, 2, 1200000.00),
(2, 3, 'Kursi Ergonomis',         'FRN-002',  4, 2, 1750000.00),
(3, 3, 'Pulpen Pilot (lusin)',     'ATK-001', 50,10,   36000.00),
(3, 3, 'Kertas HVS A4 (rim)',      'ATK-002', 30,10,   55000.00),
(4, 1, 'Switch TP-Link 8 Port',   'NET-001',  5, 2,  320000.00);

-- Histori stok awal
INSERT INTO stock_history (item_id, user_id, type, quantity, note) VALUES
(1, 1, 'masuk', 10, 'Stok awal'),
(2, 1, 'masuk', 15, 'Stok awal'),
(3, 1, 'masuk',  8, 'Stok awal'),
(4, 1, 'masuk',  6, 'Stok awal'),
(5, 1, 'masuk',  4, 'Stok awal'),
(6, 1, 'masuk', 50, 'Stok awal'),
(7, 1, 'masuk', 30, 'Stok awal'),
(8, 1, 'masuk',  5, 'Stok awal');
