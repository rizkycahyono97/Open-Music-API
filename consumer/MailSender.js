import nodemailer from 'nodemailer';
import config from './config.js';

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.user,
        password: config.mail.password
      }
    });
  }

  sendEmail(targerEmail, content) {
    const message = {
      from: 'OpenMusic API',
      to: targerEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil ekspor playlist anda',
      attachments: [
        {
          filename: 'playlist.json',
          content
        }
      ]
    };

    return this._transporter.sendMail(message);
  }
}

export default MailSender;
