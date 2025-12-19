import autoBind from 'auto-bind';

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: playlistId } = request.params;
    const { userId } = request.payload;
    const { id: ownerId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, ownerId);
    await this._collaborationsService.addCollaboration(playlistId, userId);

    return h
      .response({
        status: 'success',
        message: 'Kolaborator berhasil ditambahkan'
      })
      .code(201);
  }

  async deleteCollaborationHandler(request) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: playlistId } = request.params;
    const { userId } = request.payload;
    const { id: ownerId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, ownerId);
    await this._collaborationsService.deleteCollaboration(playlistId, userId);

    return {
      status: 'success',
      message: 'Kolaborator berhasil dihapus'
    };
  }
}

export default CollaborationsHandler;
