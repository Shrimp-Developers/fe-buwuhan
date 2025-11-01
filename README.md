# 🧭 Management Buwuhan App

**Management Buwuhan App** adalah aplikasi berbasis **React** untuk mengelola data buwuhan (pemberian dalam acara pernikahan atau hajatan).  
Aplikasi ini memiliki dua modul utama: **User Management** dan **Buwuhan Book Management**.

---

## 🔐 User Management
- Registrasi dengan form (nama lengkap, email, password, konfirmasi password) → mendapatkan email aktivasi → diarahkan ke halaman login.
- Login menggunakan email dan password.
- Melihat detail profil (nama lengkap dan email).
- Mengupdate profil (nama lengkap, password, avatar).
- Logout dari sistem.
- Reset password melalui email, lalu membuat password baru.

---

## 📘 Buwuhan Book Management
- Membuat data buwuhan baru (nama laki-laki, nama perempuan, pemberian, kategori, status, alamat, keterangan).
- Melihat daftar data buwuhan dengan pagination.
- Mencari data berdasarkan nama laki-laki atau perempuan.
- Filter berdasarkan kategori dan status.
- Melihat detail data buwuhan.
- Mengedit dan menghapus data buwuhan.
- Dashboard menampilkan total data per kategori serta status (sudah/belum).

---

## ⚙️ Teknologi yang Digunakan
- **React + Vite**
- **Tailwind CSS**
- **REST API Ready**

---

## ⚙️ Cara Menjalankan
```bash
# Clone repository // Mengambil repo
git clone https://github.com/Shrimp-Developers/fe-buwuhan.git

# Masuk folder project
cd fe-buwuhan

# Install dependencies
npm install

# Jalankan development server
npm run dev