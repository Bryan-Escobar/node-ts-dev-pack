import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  GEMINI_API_KEY: get('GEMINI_API_KEY').required().asString(),
}



