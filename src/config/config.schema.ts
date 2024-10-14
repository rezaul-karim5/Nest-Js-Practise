import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    PORT: Joi.number().default(8081),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
  });