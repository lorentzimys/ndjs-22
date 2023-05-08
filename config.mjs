import * as dotenv from 'dotenv';

dotenv.config();

export const ENCODING = 'utf8';

export const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

export const WEATHERSTACK_URL = 'http://api.weatherstack.com/current';