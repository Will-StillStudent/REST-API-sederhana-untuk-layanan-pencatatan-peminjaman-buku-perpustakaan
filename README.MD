# REST API - Pencatatan Peminjaman Buku Perpustakaan

## 📖 Deskripsi Umum & Tujuan Proyek
Proyek ini adalah sebuah RESTful API sederhana yang dibangun menggunakan **Node.js, Express.js, dan Supabase** sebagai *Database as a Service* (DBaaS). 

Tujuan utama proyek ini adalah untuk menyediakan layanan *backend* (API) pencatatan data peminjaman buku oleh anggota perpustakaan. API ini mendukung operasi CRUD (Create, Read, Update, Delete) penuh dan fitur *query parameter* untuk menyaring/memfilter data berdasarkan status peminjaman. Proyek ini dibuat untuk memenuhi tugas responsi modul praktikum Application Programming Interface (API).

---

## 🗄 Struktur Data / Schema Database
Data disimpan di dalam Supabase pada tabel bernama `loans` dengan struktur (schema) sebagai berikut:

| Nama Kolom    | Tipe Data                  | Keterangan                                      |
| :------------ | :------------------------- | :---------------------------------------------- |
| `id`          | UUID                       | Primary Key (Otomatis digenerate)               |
| `member_name` | Text                       | Nama anggota perpustakaan yang meminjam buku    |
| `book_title`  | Text                       | Judul buku yang dipinjam                        |
| `borrow_date` | Date                       | Tanggal peminjaman (Otomatis diset saat input)  |
| `return_date` | Date                       | Tanggal buku dikembalikan (Bisa null/kosong)    |
| `status`      | Text                       | 'Dipinjam', 'Dikembalikan', atau 'Terlambat'    |
| `created_at`  | Timestamp with time zone   | Waktu pencatatan data ke dalam sistem           |

---

## 🚀 Dokumentasi Endpoint (Contoh Request & Response)

Berikut adalah panduan untuk menguji seluruh fitur API ini melalui Postman atau aplikasi sejenis:

### 1. Tambah Data Peminjaman (POST `/loans`)
Menambahkan rekam data peminjaman buku yang baru ke database.
- **Request Body (JSON):**
  ```json
  {
    "member_name": "Budi Santoso",
    "book_title": "Belajar Node.js",
    "status": "Dipinjam"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Data peminjaman berhasil ditambahkan",
    "data": [
      {
        "id": "ddecf14e-8240-4616-9db3-9762c03fc337",
        "member_name": "Budi Santoso",
        "book_title": "Belajar Node.js",
        "borrow_date": "2026-10-10",
        "return_date": null,
        "status": "Dipinjam",
        "created_at": "2026-10-10T12:30:45.054Z"
      }
    ]
  }
  ```

### 2. Ambil Semua Data (GET `/loans`)
Menampilkan seluruh riwayat data peminjaman yang ada di database.
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "ddecf14e-8240-4616-9db3-9762c03fc337",
        "member_name": "Budi Santoso",
        "book_title": "Belajar Node.js",
        "borrow_date": "2026-10-10",
        "status": "Dipinjam"
      },
      {
        "id": "a1b2c3d4-1234-5678-90ab-cdef12345678",
        "member_name": "Siti Aminah",
        "book_title": "Struktur Data & Algoritma",
        "borrow_date": "2026-09-25",
        "status": "Terlambat"
      }
    ]
  }
  ```

### 3. Ambil Data dengan Filter (GET `/loans?status=Terlambat`)
Menampilkan data peminjaman yang difilter secara spesifik berdasarkan status tertentu (misal: "Terlambat").
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "a1b2c3d4-1234-5678-90ab-cdef12345678",
        "member_name": "Siti Aminah",
        "book_title": "Struktur Data & Algoritma",
        "borrow_date": "2026-09-25",
        "return_date": null,
        "status": "Terlambat",
        "created_at": "2026-09-25T08:15:20.123Z"
      }
    ]
  }
  ```

### 4. Perbarui Data (PUT `/loans/:id`)
Mengubah atau memperbarui data yang sudah ada (misal: saat buku dikembalikan).
- **Request URL:** `/loans/ddecf14e-8240-4616-9db3-9762c03fc337` (Ganti dengan ID yang valid)
- **Request Body (JSON):**
  ```json
  {
    "return_date": "2026-10-15",
    "status": "Dikembalikan"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Data peminjaman berhasil diperbarui",
    "data": [
      {
        "id": "ddecf14e-8240-4616-9db3-9762c03fc337",
        "member_name": "Budi Santoso",
        "book_title": "Belajar Node.js",
        "borrow_date": "2026-10-10",
        "return_date": "2026-10-15",
        "status": "Dikembalikan",
        "created_at": "2026-10-10T12:30:45.054Z"
      }
    ]
  }
  ```

### 5. Hapus Data (DELETE `/loans/:id`)
Menghapus sebuah riwayat peminjaman buku secara permanen dari database.
- **Request URL:** `/loans/ddecf14e-8240-4616-9db3-9762c03fc337` (Ganti dengan ID yang valid)
- **Response (200 OK):**
  ```json
  {
    "message": "Data peminjaman berhasil dihapus"
  }
  ```

---

## 🛠 Panduan Instalasi & Cara Menjalankan Lokal

Jika Anda ingin menjalankan API ini di komputer lokal (Localhost), ikuti langkah-langkah berikut:

1. **Clone repository ini:**
   ```bash
   git clone [MASUKKAN_LINK_GITHUB_ANDA_DI_SINI]
   cd library-api
   ```
2. **Install dependensi library (Node Modules):**
   ```bash
   npm install
   ```
3. **Konfigurasi Environment Database:**
   Buat file baru bernama `.env` di dalam folder root aplikasi, lalu masukkan URL dan API Key dari proyek Supabase Anda:
   ```env
   SUPABASE_URL=https://[ID_PROJECT_SUPABASE_ANDA].supabase.co
   SUPABASE_KEY=[API_KEY_ANON_SUPABASE_ANDA]
   ```
4. **Jalankan Server API Lokal:**
   ```bash
   node index.js
   ```
5. **Mulai Pengujian:**
   Server akan berjalan di port `3000`. Gunakan aplikasi Postman atau browser untuk mengakses endpoint `http://localhost:3000/loans`.

---

## 🌍 Link Hasil Deployment (Live API)

Aplikasi API ini telah diunggah ke Vercel dan terhubung dengan database *cloud* Supabase, sehingga dapat diakses dan diuji secara publik tanpa perlu menjalankan *server* lokal.

- **Base URL Vercel (Gunakan ini di Postman):**
   **https://rest-api-sederhana-untuk-layanan-pe.vercel.app/**
