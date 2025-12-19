import pkg from 'pg';
import { nanoid } from 'nanoid';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';
import CacheService from '../redis/cacheService.js';

const { Pool } = pkg;

class AlbumsService {
  constructor() {
    this._pool = new Pool();
    this._cacheService = new CacheService();
  }

  async verifyAlbumExists(albumId) {
    const query = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album Tidak Ditemukan');
    }
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt]
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagak ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const albumQuery = {
      text: 'SELECT id, name, year, "coverUrl" FROM albums WHERE id = $1',
      values: [id]
    };
    const albumResult = await this._pool.query(albumQuery);

    if (!albumResult.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    const album = albumResult.rows[0];

    const songsQuery = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [id]
    };
    const songsResult = await this._pool.query(songsQuery);

    album.songs = songsResult.rows || [];

    return album;
  }

  async editAlbumById(id, { name, year }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updatedAt, id]
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Album yang anda cari tidak ada, Gagal memperbarui album'
      );
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id]
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        'Album yang anda cari tidak ada, Gagal memperbarui album'
      );
    }
  }

  async addAlbumLike(albumId, userId) {
    await this.verifyAlbumExists(albumId);

    // cari jika sudah ada
    const checkQuery = {
      text: 'SELECT id FROM user_album_likes WHERE album_id = $1 AND user_id = $2',
      values: [albumId, userId]
    };
    const checkResult = await this._pool.query(checkQuery);

    if (checkResult.rows.length) {
      throw new InvariantError('Anda sudah menyukai album ini');
    }

    const id = `album-likes-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3, $4, $4) RETURNING id',
      values: [id, userId, albumId, createdAt]
    };

    await this._pool.query(query);

    await this._cacheService.del(`album-likes${albumId}`);
  }

  async deleteAlbumLike(albumId, userId) {
    await this.verifyAlbumExists(albumId);

    const query = {
      text: 'DELETE FROM user_album_likes WHERE album_id = $1 AND user_id = $2 RETURNING id',
      values: [albumId, userId]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
        'Batal menyukai gagal, anda belum menyukai album ini'
      );
    }

    await this._cacheService.del(`album-likes${albumId}`);
  }

  async getAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`album-likes${albumId}`);
      return {
        likes: JSON.parse(result),
        source: 'cache'
      };
    } catch (error) {
      await this.verifyAlbumExists(albumId);

      const query = {
        text: 'SELECT COUNT(*) AS likes FROM user_album_likes WHERE album_id = $1',
        values: [albumId]
      };

      const result = await this._pool.query(query);
      const likesCount = parseInt(result.rows[0].likes, 10);

      await this._cacheService.set(
        `album-likes${albumId}`,
        JSON.stringify(likesCount)
      );

      return {
        likes: likesCount,
        source: 'db'
      };
    }
  }

  async updateAlbumCover(id, coverUrl) {
    const query = {
      text: 'UPDATE albums SET "coverUrl" = $1 WHERE id = $2 RETURNING id',
      values: [coverUrl, id]
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }
}

export default AlbumsService;
