import 'dotenv/config';

export const envs = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret_key_oasis_archive',
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY || 'secret_key_rapidapi',
  RAPIDAPI_HOST: process.env.RAPIDAPI_HOST || 'secret_key_rapidapihost'
};