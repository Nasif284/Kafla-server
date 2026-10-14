import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5001,
  env: process.env.NODE_ENV || 'development',
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3001',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'triphq_default_access_secret_key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'triphq_default_refresh_secret_key',
    accessExpiration: process.env.ACCESS_TOKEN_TTL || '15m',
    refreshExpiration: process.env.REFRESH_TOKEN_TTL || '7d',
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  otp: {
    expiryInMinutes: process.env.OTP_EXPIRY_MINUTES || '10',
    maxAttempts: process.env.OTP_MAX_ATTEMPTS || '3',
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
  },
  s3: {
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
    bucketName: process.env.S3_BUCKET_NAME,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    placesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  },
  unsplash: {
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    secretKey: process.env.UNSPLASH_SECRETE_KEY,
  },
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY,
  },
};
