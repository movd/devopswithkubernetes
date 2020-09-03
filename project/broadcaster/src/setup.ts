import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env['NODE_ENV'] || 'production';
export const NATS_URL = process.env['NATS_URL'] || 'nats://localhost:4222';
export const TELEGRAM_ACCESS_TOKEN =
  process.env['TELEGRAM_ACCESS_TOKEN'] || 'abcdefghij';
export const TELEGRAM_CHAT_ID =
  process.env['TELEGRAM_CHAT_ID'] || '-zzzzzZZZZzzzz';
