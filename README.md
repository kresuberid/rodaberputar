
<div align="center">
  <img src="https://beeimg.com/images/s32909931692.png" alt="Logo Roda Berputar" width="140" height="140" style="margin-bottom: 20px;">

  # Roda Berputar
  
  **The Ultimate Spin Wheel Picker & Random Name Generator**
  
  <p align="center">
    <a href="#fitur">
      <img src="https://img.shields.io/badge/Versi-1.2.0-blue?style=for-the-badge&logo=git&logoColor=white" alt="Version 1.2.0">
    </a>
    <a href="https://react.dev">
      <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    </a>
    <a href="#lisensi">
      <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT">
    </a>
  </p>

  <p>
    <a href="https://rodaberputar.vercel.app/">🌐 Demo Live</a> •
    <a href="#instalasi">📥 Instalasi</a> •
    <a href="#pengembang">👨‍💻 Pengembang</a>
  </p>
</div>

---

## 📖 Tentang Aplikasi

**Roda Berputar** adalah aplikasi web modern berbasis *Progressive Web App* (PWA) yang dirancang untuk kebutuhan pengacakan nama, giveaway, arisan, dan pengambilan keputusan secara adil. 

Dibangun dengan arsitektur **3D Glassmorphism**, aplikasi ini tidak hanya fungsional tetapi juga memberikan pengalaman visual yang premium. Aplikasi ini telah dioptimalkan menggunakan teknik **GEO (Generative Engine Optimization)** agar mudah dipahami oleh konteks AI dan Mesin Pencari.

### Mengapa Roda Berputar?
*   **Adil & Transparan:** Menggunakan algoritma pengacakan *crypto-secure* browser.
*   **Privasi Terjamin:** Semua data disimpan di *Local Storage* browser pengguna, tidak ada data yang dikirim ke server.
*   **Performa Tinggi:** Menggunakan HTML5 Canvas API untuk rendering 60FPS yang mulus.

---

## ✨ Fitur Unggulan

### 🎨 UI/UX & Visual
*   **Desain 3D Glassmorphism:** Panel kaca buram dengan pencahayaan dinamis dan bayangan realistis.
*   **Modal Pemenang 3D:** Karakter 3D animasi CSS murni saat pemenang terpilih.
*   **Animasi Partikel:** Efek Confetti (Kembang api) berbasis Canvas saat kemenangan.
*   **Tema Responsif:** Mendukung Mode Gelap & Terang secara otomatis mengikuti sistem.

### ⚙️ Fungsionalitas
*   **6 Tema Premium:**
    *   🔵 **Blue (Ocean):** Profesional & Tenang.
    *   🟢 **Green (Nature):** Segar & Harmonis.
    *   🔴 **Red (Energy):** Berani & Semangat.
    *   🟣 **Purple (Royal):** Kreatif & Mewah.
    *   🟠 **Orange (Citrus):** Kontras Tinggi.
    *   🌈 **Rainbow:** Spektrum warna penuh.
*   **Manajemen Peserta:** Input massal (satu nama per baris), acak urutan (shuffle), urutkan abjad (sort), dan hapus duplikat.
*   **Pengaturan Gameplay:** Durasi putaran (1-20 detik), hapus pemenang otomatis, dan mode suara.

### 🔊 Audio (Web Audio API)
*   **Real-time Ticking:** Suara detak roda yang disintesis secara *procedural* (bukan file mp3 statis) yang menyesuaikan pitch dengan kecepatan putaran.
*   **Fanfare Kemenangan:** Melodi kemenangan yang dibangkitkan secara *real-time* menggunakan Oscillator node.

### 🌍 Internasionalisasi (i18n)
Mendukung 12 Bahasa Global dengan deteksi otomatis:
| Asia | Eropa | Timur Tengah |
| :--- | :--- | :--- |
| 🇮🇩 Indonesia | 🇺🇸 English | 🇸🇦 Arabic (RTL) |
| 🇯🇵 Japanese | 🇪🇸 Spanish | |
| 🇰🇷 Korean | 🇫🇷 French | |
| 🇨🇳 Chinese | 🇩🇪 German | |
| 🇮🇳 Hindi | 🇷🇺 Russian | |
| | 🇵🇹 Portuguese | |

---

## 🛠️ Tech Stack & Arsitektur

Aplikasi ini dibangun menggunakan standar web modern tanpa proses build yang rumit (No-Build step required for basic usage), memanfaatkan **ES Modules** via CDN.

*   **Core:** React 19 (via ESM.sh)
*   **Styling:** Tailwind CSS (CDN Runtime dengan Custom Config)
*   **Graphics:** HTML5 Canvas API (untuk Roda & Confetti)
*   **Audio:** Web Audio API (Oscillator & Gain Nodes)
*   **Icons:** Flaticon UIcons (Regular Rounded)
*   **Font:** Plus Jakarta Sans (Google Fonts)

---

## 🚀 Instalasi & Pengembangan

Karena proyek ini menggunakan arsitektur modern berbasis browser (ESM), Anda dapat menjalankannya dengan mudah.

### Cara Menjalankan (Lokal)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username/roda-berputar.git
    cd roda-berputar
    ```

2.  **Jalankan Live Server**
    Anda hanya perlu menyajikan folder ini menggunakan static server apa saja (VS Code Live Server, Python SimpleHTTPServer, atau Node http-server).
    
    *Menggunakan Python:*
    ```bash
    python3 -m http.server 3000
    ```
    
    *Menggunakan Node:*
    ```bash
    npx serve .
    ```

3.  **Buka Browser**
    Akses `http://localhost:3000`

---

## 👨‍💻 Informasi Pengembang

Aplikasi ini dikembangkan dan dipelihara dengan ❤️ oleh:

<div align="center">
    <h3>Febri Suryanto</h3>
    <p>Senior Full-Stack Web App Architect</p>
    
    <a href="https://febrisuryanto.com">
        <img src="https://img.shields.io/badge/Portfolio-febrisuryanto.com-000000?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website">
    </a>
    <a href="https://github.com/febrisuryanto">
        <img src="https://img.shields.io/badge/GitHub-@febrisuryanto-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
    <a href="mailto:contact@febrisuryanto.com">
        <img src="https://img.shields.io/badge/Email-Hubungi%20Saya-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
    </a>
</div>

---

## 📜 Riwayat Versi (Changelog)

### v1.2.0 (Stable) - *Current*
*   🆕 **Karakter 3D:** Menambahkan animasi karakter 3D CSS murni pada modal kemenangan.
*   🆕 **Tema Rainbow:** Logika pewarnaan dinamis untuk tema pelangi.
*   ⚡ **Performance:** Optimasi rendering Canvas untuk daftar nama > 500 item.
*   🔊 **Audio Engine:** Upgrade sintesis suara kemenangan (Fanfare Arpeggio).
*   💄 **UI Polish:** Perbaikan kontras pada tema Orange dan jarum penunjuk Emas Premium.

### v1.1.0
*   Integrasi 12 Bahasa.
*   Penambahan fitur "Hapus Pemenang Otomatis".
*   Perbaikan layout Sidebar responsif.

### v1.0.0
*   Rilis Publik Awal.
*   Mesin fisika putaran roda dasar.

---

<div align="center">
  <small>© 2026 Roda Berputar. Hak Cipta Dilindungi Undang-Undang.</small>
</div>
