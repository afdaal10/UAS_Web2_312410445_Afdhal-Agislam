# 📦 E-Inventory — Sistem Manajemen Inventaris Barang

## 👤 Identitas Mahasiswa
 
| | |
|---|---|
| Nama | Afdhal Agislam |
| NIM | 312410445 |
| Kelas | I241E |
| Mata Kuliah | Pemrograman Web 2 |
 

---

## 📌 Deskripsi Proyek

**E-Inventory** adalah aplikasi web Sistem Manajemen Inventaris Barang berbasis arsitektur *Decoupled* (terpisah antara Backend dan Frontend). Aplikasi ini memungkinkan administrator untuk mengelola data barang, kategori, supplier, stok masuk/keluar, serta melihat histori transaksi stok secara real-time.

**Tema yang dipilih:** Sistem Manajemen Inventaris Barang (E-Inventory)

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
|---|---|
| Backend | PHP — CodeIgniter 4 (RESTful API) |
| Frontend | VueJS 3 (SPA via CDN) |
| UI Framework | TailwindCSS via CDN |
| HTTP Client | Axios |
| Database | MySQL / MariaDB |
| Tools | Postman, phpMyAdmin, XAMPP |

---

## 🗄️ Skema Relasi Database

> **Screenshot skema relasi tabel dari phpMyAdmin Designer:**

![Screenshot edit](Screenshot/skema_database.png)

### Deskripsi Tabel

| Tabel | Fungsi |
|---|---|
| `users` | Data admin login, menyimpan token autentikasi |
| `categories` | Kategori barang (Elektronik, Furniture, dll) |
| `suppliers` | Data pemasok/vendor barang |
| `items` | Data barang utama, berelasi ke categories & suppliers |
| `stock_history` | Histori transaksi stok masuk/keluar |

### Relasi Antar Tabel
- `categories` → `items` (One to Many)
- `suppliers` → `items` (One to Many)
- `items` → `stock_history` (One to Many)
- `users` → `stock_history` (One to Many)

---

## 🔐 Uji Coba API Token Protection (Error 401)

> **Screenshot pengujian endpoint POST /api/items tanpa token via Postman:**

![Screenshot edit](Screenshot/eror401.png)

Endpoint yang diproteksi token (POST, PUT, DELETE) akan mengembalikan response:
```json
{
    "status": "error",
    "message": "Token tidak ditemukan"
}
```

---

## 🖥️ Screenshot Antarmuka Aplikasi

### Halaman Beranda (Public)
![Halaman Beranda](screenshots/home.png)

### Halaman Login
![Halaman Login](screenshots/login.png)

### Dashboard Admin
![Dashboard](screenshots/dashboard.png)

### Halaman Barang + Form Modal Tambah/Edit
![Halaman Barang](screenshots/items.png)

### Halaman Kategori
![Halaman Kategori](screenshots/categories.png)

### Halaman Supplier
![Halaman Supplier](screenshots/suppliers.png)

### Halaman Histori Stok
![Histori Stok](screenshots/stock-history.png)

---

## ⚙️ Petunjuk Instalasi

### Prasyarat
- XAMPP (PHP 8.x + MySQL)
- Composer
- Browser modern

### 1. Clone Repository
```bash
git clone https://github.com/[username]/UAS_Web2_[NIM]_[Nama].git
```

### 2. Setup Backend (CodeIgniter 4)
```bash
# Masuk ke folder backend
cd backend-api

# Install dependencies
composer install

# Salin file environment
cp env .env
```

Edit file `.env`:
```env
CI_ENVIRONMENT = development
app.baseURL = 'http://localhost/backend-api/public/'

database.default.hostname = localhost
database.default.database = db_einventory
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.port     = 3306
```

### 3. Import Database
- Buka **phpMyAdmin**
- Import file `db_einventory.sql` yang ada di root repository
- Database `db_einventory` akan otomatis terbuat

### 4. Jalankan Backend
Pastikan **XAMPP** sudah aktif (Apache + MySQL), lalu akses:
```
http://localhost/backend-api/public/
```

### 5. Jalankan Frontend
Buka folder `frontend-spa/` langsung di browser:
```
http://localhost/frontend-spa/
```

### 6. Login Admin Default
```
Email    : admin@einventory.com
Password : admin123
```

---

## 🔗 Link Demo & Video

| | Link |
|---|---|
| 🌐 Demo Aplikasi | [Link Demo](http://localhost/frontend-spa) *(jalankan lokal)* |
| 🎥 Video Presentasi YouTube | [[Klik di sini untuk menonton](https://youtube.com/LINK_VIDEO_DISINI)] |

---

## 📁 Struktur Folder Repository

```
UAS_Web2_[NIM]_[Nama]/
│
├── backend-api/                 ← Framework CodeIgniter 4
│   ├── app/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── SupplierController.php
│   │   │   ├── ItemController.php
│   │   │   └── StockHistoryController.php
│   │   ├── Models/
│   │   │   ├── UserModel.php
│   │   │   ├── CategoryModel.php
│   │   │   ├── SupplierModel.php
│   │   │   ├── ItemModel.php
│   │   │   └── StockHistoryModel.php
│   │   ├── Filters/
│   │   │   ├── AuthFilter.php
│   │   │   └── CorsFilter.php
│   │   └── Config/
│   │       ├── Filters.php
│   │       └── Routes.php
│   └── ...
│
├── frontend-spa/                ← VueJS 3 SPA
│   ├── index.html
│   └── components/
│       ├── Home.js
│       ├── Login.js
│       ├── Dashboard.js
│       ├── Items.js
│       ├── Categories.js
│       ├── Suppliers.js
│       └── StockHistory.js
│
├── db_einventory.sql            ← File SQL database
├── screenshots/                 ← Screenshot untuk README
└── README.md
```

