const config = {
  redis: process.env.REDIS_SERVER,
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER
  },
  mail: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTO_USER,
    password: process.env.SMTP_PASSWORD
  }
};

export default config;
