import Joi from 'joi';

export const ImageHeaderSchema = Joi.object({
  'content-type': Joi.string()
    .pattern(/^image\/(jpeg|png|jpg|webp)$/)
    .required()
}).unknown();
