import { Pool } from 'pg';

class PlaylistService {
  constructor() {
    this._service = new Pool();
  }

  async getPlaylistSong(playlistId) {
    const playlistQuery = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
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
