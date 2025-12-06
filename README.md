# Aplikasi Todo List Tercontainer

Aplikasi ini adalah contoh sederhana dari aplikasi web Todo List yang di-containerize menggunakan Docker. Aplikasi ini terdiri dari tiga komponen utama: frontend, backend, dan database.

## Arsitektur

Arsitektur aplikasi ini mengikuti pendekatan microservices, di mana setiap komponen berjalan dalam container Docker-nya sendiri.

*   **Frontend:** Dibangun dengan [React.js](https://reactjs.org/), frontend adalah antarmuka pengguna (UI) yang memungkinkan pengguna untuk berinteraksi dengan aplikasi. Frontend berjalan pada container-nya sendiri dan berkomunikasi dengan backend melalui permintaan HTTP.

*   **Backend:** Dibangun dengan [Node.js](https://nodejs.org/) dan [Express.js](https://expressjs.com/), backend bertanggung jawab untuk menangani logika bisnis aplikasi. Ini menyediakan API RESTful yang digunakan oleh frontend untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada daftar tugas. Backend terhubung ke database PostgreSQL untuk menyimpan dan mengambil data.

*   **Database:** [PostgreSQL](https://www.postgresql.org/) digunakan sebagai database untuk menyimpan data aplikasi. Database berjalan pada container-nya sendiri, dan datanya disimpan dalam volume Docker untuk memastikan persistensi data bahkan jika container dihentikan atau dihapus.

## Keputusan Desain

*   **Containerization dengan Docker:** Docker dipilih untuk mengemas setiap komponen aplikasi ke dalam container yang terisolasi. Ini memastikan konsistensi di berbagai lingkungan pengembangan, pengujian, dan produksi. Ini juga menyederhanakan proses deployment.

*   **Orkestrasi dengan Docker Compose:** [Docker Compose](https://docs.docker.com/compose/) digunakan untuk mendefinisikan dan menjalankan aplikasi multi-container. Ini memungkinkan kita untuk mengkonfigurasi dan menghubungkan semua layanan (frontend, backend, database) dalam satu file `docker-compose.yaml`, membuatnya mudah untuk dijalankan dengan satu perintah.

*   **Pemisahan Frontend dan Backend:** Memisahkan frontend dan backend memungkinkan pengembangan dan penskalaan independen dari setiap komponen. Frontend dapat fokus pada pengalaman pengguna, sementara backend dapat fokus pada logika bisnis dan manajemen data.

*   **Database Relasional:** PostgreSQL dipilih karena merupakan database relasional open-source yang kuat dan andal yang cocok untuk berbagai kasus penggunaan.

## Menjalankan Aplikasi

Untuk menjalankan aplikasi secara lokal, Anda memerlukan Docker dan Docker Compose yang terinstal di mesin Anda.

1.  **Clone repositori:**
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd <NAMA_DIREKTORI_REPOSITORI>
    ```

2.  **Jalankan aplikasi menggunakan Docker Compose:**
    ```bash
    docker-compose up --build
    ```
    Perintah ini akan membangun image Docker untuk frontend dan backend, dan kemudian memulai semua layanan yang didefinisikan dalam file `docker-compose.yaml`.

3.  **Akses aplikasi:**
    *   Frontend akan dapat diakses di [http://localhost:3000](http://localhost:3000)
    *   Backend akan berjalan di [http://localhost:5000](http://localhost:5000)

Untuk menghentikan aplikasi, tekan `Ctrl + C` di terminal tempat Anda menjalankan `docker-compose up`, lalu jalankan perintah berikut untuk menghapus container:
```bash
docker-compose down
```
