import 'dotenv/config';
import * as joi from 'joi';

interface EnvVariables {
  PORT: number;
  URL_TELEGRAM_MESSAGE?: string;
  TOKEN_TELEGRAM_MESSAGE?: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    TOKEN_TELEGRAM_MESSAGE: joi.string().optional(),
    URL_TELEGRAM_MESSAGE: joi.string().optional(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  LINKS_IMAGES_HAITI_BOLET: process.env.LINKS_IMAGES_HAITI_BOLET?.split(','),
});

if (error) {
  throw new Error(`Config Validation Error ENV ${error}`);
}

const enVars: EnvVariables = value;

export const envs: EnvVariables = {
  PORT: enVars.PORT,
  URL_TELEGRAM_MESSAGE: enVars.URL_TELEGRAM_MESSAGE,
  TOKEN_TELEGRAM_MESSAGE: enVars.TOKEN_TELEGRAM_MESSAGE,
};
