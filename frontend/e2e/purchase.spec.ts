import { test, expect } from '@playwright/test';

test('purchase book', async ({ page }) => {
  await page.goto('/marketplace');

  await page.click('.buy-button');

  await expect(page.locator('.status')).toContainText('Payment Successful');
});