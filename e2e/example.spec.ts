// e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has Vite + React heading and edit message', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vite \+ React/);
  await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible();
  await expect(page.getByText('Edit src/App.tsx and save to test HMR')).toBeVisible();
});
