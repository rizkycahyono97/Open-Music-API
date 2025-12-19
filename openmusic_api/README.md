# OpenMusic API

OpenMusic API adalah RESTful API berbasis **Node.js** dan **Hapi.js** yang digunakan untuk mengelola data musik seperti album, lagu, playlist, autentikasi pengguna, ekspor playlist, serta fitur tambahan seperti upload cover album dan kolaborator playlist.

Project ini merupakan bagian dari submission **Dicoding – Belajar Fundamental Aplikasi Backend**.

---

## 🚀 Fitur Utama

- Autentikasi & Autorisasi (JWT)
- Manajemen Album & Lagu
- Upload cover album (static file dengan Inert)
- Playlist & aktivitas playlist
- Like album
- Ekspor playlist (RabbitMQ)
- Cache dengan Redis
- Kolaborator playlist (opsional)

---

## 📦 Dependency Penting

Berikut adalah dependency utama yang digunakan pada **openmusic_api**:

```json
"@hapi/hapi": "^21.4.3",
"@hapi/inert": "^7.1.0",
"@hapi/jwt": "^3.2.1",
"amqplib": "^0.10.9",
"auto-bind": "^5.0.1",
"bcrypt": "^6.0.0",
"dotenv": "^17.2.3",
"joi": "^18.0.1",
"nanoid": "^5.1.6",
"nodemailer": "^7.0.11",
"pg": "^8.16.3",
"redis": "^5.10.0"
```

---

## ⚙️ Prasyarat

Pastikan tools berikut sudah terpasang:

- **Node.js** >= 24
- **PostgreSQL**
- **RabbitMQ**
- **Redis**

---

## 📁 Struktur Folder (Ringkas)

```
openmusic_api/
├── migrations/        # Database migrations
├── public/            # Static file (cover album)
├── src/
│   ├── api/           # Handler & routes
│   ├── services/      # Logic layer
│   ├── validator/     # Joi validation
│   ├── exceptions/    # Custom error
│   └── config/        # Konfigurasi database
│   └── tokenize/      # Konfigurasi JWT AUth
│   └── utils/         # Konfigurasi rabbitmq, redis, smtp
│   ├── server.js      # Entry point server
└── README.md
```

---

## 🔐 Konfigurasi Environment

```bash
cp .env.example .env
```

```env
# host
HOST=localhost
PORT=5000

# database
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=openmusic
PGHOST=localhost
PGPORT=5432

# token
ACCESS_TOKEN_KEY=rahasia-access-token-yang-panjang
REFRESH_TOKEN_KEY=rahasia-refresh-token-yang-panjang
ACCESS_TOKEN_AGE=1800

# redis
REDIS_SERVER=localhost

# rabbit mq
RABBITMQ_SERVER=amqp://localhost
```

> ⚠️ Jangan commit file `.env`

---

## 🗄️ Database Migration

Jalankan migration untuk membuat seluruh tabel:

```bash
npm run migrate up
```

Jika ingin rollback:

```bash
npm run migrate down
```

---

## ▶️ Menjalankan Server

Install dependency:

```bash
npm install
```

Jalankan server:

```bash
node src/server.js
```

Jika berhasil, akan muncul log:

```
Server berjalan pada http://localhost:5000
```

---

## 🖼️ Static File (Cover Album)

Cover album disimpan di:

```
public/file/images/
```

Dan dapat diakses melalui:

```
GET /albums/covers/{filename}
```

---

## 🧪 Testing

API ini dapat diuji menggunakan, Import :

- Postman

Pastikan:

- Semua response sesuai spesifikasi
- Authorization header terisi dengan benar

---

## 📝 Catatan

- Folder `public/` **tidak di-commit** (di-ignore oleh `.gitignore`)
- Consumer RabbitMQ berada di folder terpisah (`openmusic_consumer`)
- Project ini menggunakan **ES Module** (`type: module`)

---

## 👨‍💻 Author

Dikembangkan sebagai bagian dari submission Dicoding Backend.

---

✨ Happy coding & semoga submission kamu diterima tanpa revisi!
