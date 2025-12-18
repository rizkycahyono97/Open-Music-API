import { Pool } from 'pg';

class PlaylistService {
  constructor() {
    this._pool = new Pool({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT
    });
  }

  async getPlaylistSong(playlistId) {
    const playlistQuery = {
      text: 'SELECT id, name FROM playlist WHERE id = $1',
      values: [playlistId]
    };
    const playlistResult = await this._pool.query(playlistQuery);

    const songQuery = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      JOIN playlist_songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId]
    };
    const songsResult = await this._pool.query(songQuery);

    return {
      playlist: {
        ...playlistResult.rows[0],
        song: songsResult.rows
      }
    };
  }
}

export default PlaylistService;
