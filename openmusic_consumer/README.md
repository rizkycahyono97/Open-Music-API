# OpenMusic Consumer

Aplikasi **OpenMusic Consumer** berfungsi sebagai worker/consumer yang menangani proses **ekspor playlist** secara asynchronous menggunakan **RabbitMQ** dan mengirimkan hasil ekspor ke email pengguna.

Aplikasi ini terpisah dari `openmusic_api` dan dijalankan sebagai proses independen.

---

## ✨ Fitur Utama

- Mengonsumsi message dari RabbitMQ queue `export:playlists`
- Mengambil data playlist dari PostgreSQL
- Mengirim hasil ekspor playlist melalui email (SMTP / Mailtrap)
- Mendukung arsitektur asynchronous (non-blocking API)

---

## 🧱 Struktur Folder

```
openmusic_consumer
├── config.js           # Konfigurasi environment (DB, SMTP, RabbitMQ)
├── consumer.js         # Entry point consumer RabbitMQ
├── MailSender.js       # Service pengirim email (nodemailer)
├── PlaylistService.js  # Service query playlist ke PostgreSQL
├── package.json
└── package-lock.json
```

---

## 📦 Dependency Penting

Dependency utama yang digunakan pada project ini:

- `amqplib` – RabbitMQ client
- `nodemailer` – SMTP email sender
- `pg` – PostgreSQL client
- `dotenv` – Environment variable loader

---

## ⚙️ Konfigurasi Environment (.env)

Buat file `.env` pada root folder `openmusic_consumer`:

```env
# postgres
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=openmusic
PGPORT=5432

# rabbitmq
RABBITMQ_SERVER=amqp://localhost

#mail
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=a481c1771d8d09
SMTP_PASSWORD=41bef40cd193a9
```

> ⚠️ Pastikan konfigurasi database **sama** dengan `openmusic_api`

---

## ▶️ Cara Menjalankan

### 1️⃣ Install Dependency

```bash
npm install
```

### 2️⃣ Pastikan Service Aktif

- PostgreSQL berjalan
- RabbitMQ berjalan
- Queue `export:playlists` tersedia

### 3️⃣ Jalankan Consumer

```bash
node consumer.js
```

Jika berhasil, akan muncul log seperti:

```text
MAIL TRANSPORT: { host: 'sandbox.smtp.mailtrap.io', port: 2525 }
```

---

## 🔁 Alur Kerja Consumer

1. API mengirim message ke RabbitMQ (`export:playlists`)
2. Consumer menerima payload:

   ```json
   {
     "playlistId": "playlist-xxx",
     "targetMail": "user@email.com"
   }
   ```

3. Consumer mengambil data playlist dari database
4. Playlist diekspor ke JSON
5. Email dikirim ke target menggunakan SMTP

---

## 📝 Catatan Penting

- Project ini menggunakan **ES Module** (`type: module`)
- Consumer **tidak memiliki endpoint HTTP**
- Error email biasanya disebabkan:

  - `to` email kosong
  - SMTP config salah
  - Payload RabbitMQ tidak lengkap

---

## 📌 Keterkaitan dengan openmusic_api

| openmusic_api   | openmusic_consumer |
| --------------- | ------------------ |
| Publish message | Consume message    |
| REST API        | Worker process     |
| ProducerService | consumer.js        |

---
