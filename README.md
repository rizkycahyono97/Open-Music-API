# 🎵 OpenMusic API & Consumer

Project ini merupakan implementasi **OpenMusic API** beserta **Consumer Service** untuk kebutuhan submission Dicoding _Back-End Developer Expert_. Sistem ini menerapkan arsitektur **producer–consumer** menggunakan **RabbitMQ**, **PostgreSQL**, dan **Hapi.js**.

## 🚀 openmusic_api

**Fungsi utama:**

- Manajemen album, lagu, playlist, kolaborator
- Autentikasi JWT
- Upload cover album
- Export playlist (producer RabbitMQ)

**Teknologi utama:**

- Hapi.js
- PostgreSQL
- RabbitMQ
- Redis (opsional)
- JWT Authentication
- File upload (Inert)

## 📬 openmusic_consumer

**Fungsi utama:**

- Menerima pesan dari RabbitMQ (export:playlists)
- Mengambil data playlist dari database
- Mengirim hasil ekspor via email (Mailtrap / SMTP)

**Teknologi utama:**

- Hapi

- Redis

- Rabbit MQ
- nodemailer
- PostgreSQL
