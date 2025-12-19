import InvariantError from '../../exceptions/InvariantError.js';
import CollaborationPayloadSchema from './schema.js';

const CollaborationsValidator = {
  validateCollaborationPayload: payload => {
    const result = CollaborationPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  }
};

export default CollaborationsValidator;
