import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env['PORT'] || 3000;
export const NODE_ENV = process.env['NODE_ENV'] || 'production';
export const IMAGE_PATH = process.env['IMAGE_PATH'] || `${__dirname}/public`;
export const POSTGRES_URL =
  process.env['POSTGRES_URL'] ||
  'postgresql://user:passw0rd@localhost:port/database';
export const NATS_URL = process.env['NATS_URL'] || undefined; // Setting a url implies enabling NATS

const natsStatus = NATS_URL
  ? `NATS is enabled: ${NATS_URL}`
  : `NATS is disabled`;

console.log(natsStatus);

import { downloadImage, ImageExists } from './services/downloadImage';

(async () => {
  if (!(await ImageExists(IMAGE_PATH))) {
    try {
      await downloadImage('https://picsum.photos/1200', IMAGE_PATH);
    } catch (error) {
      console.error('critical: ', error);
    }
  }
})();
