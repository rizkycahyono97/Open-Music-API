import pkg from 'pg';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';

const { Pool } = pkg;

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO collaborations (id, playlist_id, user_id) VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId]
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('kolaborasi gagal ditambahkan');
    }
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId]
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('kolaborasi gagal di tambahkan');
    }
  }
}

export default CollaborationsService;
