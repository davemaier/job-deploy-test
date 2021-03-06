import { env } from './env';
export { env } from './env';
export { AmazonConnection } from './AmazonConnection';

export const isProd = env.nodeEnv === 'production';
export const isDev = env.nodeEnv === 'development';
export const isStage = env.nodeEnv === 'stage';
