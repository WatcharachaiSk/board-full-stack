import { config } from 'dotenv';
config();
const { JWTSECRET } = process.env;

export const jwtConstants = {
  secret: JWTSECRET,
};
