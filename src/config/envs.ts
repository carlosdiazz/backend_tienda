import 'dotenv/config';
import * as joi from 'joi';

interface EnvVariables {
  PORT: number;
  URL_TELEGRAM_MESSAGE?: string;
  TOKEN_TELEGRAM_MESSAGE?: string;
  TELEFONO_TELEGRAM: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    TOKEN_TELEGRAM_MESSAGE: joi.string().optional(),
    URL_TELEGRAM_MESSAGE: joi.string().optional(),
    TELEFONO_TELEGRAM: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  TELEFONO_TELEGRAM: process.env.TELEFONO_TELEGRAM?.split(','),
});

if (error) {
  throw new Error(`Config Validation Errorr ENV ${error}`);
}

const enVars: EnvVariables = value;

export const envs: EnvVariables = {
  PORT: enVars.PORT,
  TELEFONO_TELEGRAM: enVars.TELEFONO_TELEGRAM,
  TOKEN_TELEGRAM_MESSAGE: enVars.TOKEN_TELEGRAM_MESSAGE,
  URL_TELEGRAM_MESSAGE: enVars.URL_TELEGRAM_MESSAGE,
};
