import InvariantError from '../../exceptions/InvariantError.js';
import { ImageHeaderSchema } from './schema.js';

const UploadValidator = {
  validateImageHeaders: headers => {
    const result = ImageHeaderSchema.validate(headers);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  }
};

export default UploadValidator;
