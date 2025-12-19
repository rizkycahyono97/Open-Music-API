# 🎵 OpenMusic API & Consumer

Project ini merupakan implementasi **OpenMusic API** beserta **Consumer Service** untuk kebutuhan submission Dicoding _Back-End Developer Expert_. Sistem ini menerapkan arsitektur **producer–consumer** menggunakan **RabbitMQ**, **PostgreSQL**, dan **Hapi.js**.

## 📦 Struktur Proyek

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`  Open-Music-API/  ├── openmusic_api/        # REST API utama (Hapi.js)  └── openmusic_consumer/   # Consumer RabbitMQ (Email Export)  `

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
