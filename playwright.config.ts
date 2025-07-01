// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
};

export default config;
