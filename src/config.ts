import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  baseUrl: string;
  puppeteerOptions: {
    headless: boolean;
    args: string[];
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

function validateConfig(): Config {
  const requiredEnvVars = ['NODE_ENV', 'PORT', 'BASE_URL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    baseUrl: process.env.BASE_URL || 'https://www.windguru.cz',
    puppeteerOptions: {
      headless: process.env.PUPPETEER_HEADLESS !== 'false',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        ...(process.env.PUPPETEER_EXTRA_ARGS?.split(',') || [])
      ]
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), 
      max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10) 
    }
  };
}

export const config = validateConfig();