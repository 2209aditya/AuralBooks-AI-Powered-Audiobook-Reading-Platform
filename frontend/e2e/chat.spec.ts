import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/login');

  await page.fill('input[name="username"]', 'test');
  await page.fill('input[name="password"]', 'test');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
});