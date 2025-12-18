import dotenv from 'dotenv';
dotenv.config();

import amqp from 'amqplib';
import PlaylistService from './PlaylistService.js';
import MailSender from './MailSender.js';
import config from './config.js';

const init = async () => {
  const playlistsService = new PlaylistService();
  const mailSender = new MailSender();

  const connection = await amqp.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', { durable: true });

  channel.consume(
    'export:playlists',
    async message => {
      try {
        const payload = JSON.parse(message.content.toString());
        console.log('RABBIT PAYLOAD:', payload);

        const { playlistId, targetMail } = JSON.parse(
          message.content.toString()
        );

        const playlistData = await playlistsService.getPlaylistSong(playlistId);

        const result = await mailSender.sendEmail(
          targetMail,
          JSON.stringify(playlistData)
        );

        console.log(`Email terkirim: ${result.messageId}`);
        channel.ack(message);
      } catch (error) {
        console.error(error);
      }
    },
    { noAck: false }
  );
};

init();
