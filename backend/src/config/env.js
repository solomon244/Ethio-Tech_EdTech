const path = require('path');
const dotenv = require('dotenv');

const rootDir = process.cwd();
dotenv.config({
  path: path.resolve(rootDir, '.env'),
});

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'fallback_jwt_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER || 'no-reply@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
  uploadDir: process.env.UPLOAD_DIR || path.join(rootDir, 'uploads'),
  resetTokenExpiryMinutes: Number(process.env.RESET_TOKEN_EXPIRY_MINUTES) || 30,
  verifyTokenExpiryMinutes: Number(process.env.VERIFY_TOKEN_EXPIRY_MINUTES) || 60,
};

module.exports = env;

