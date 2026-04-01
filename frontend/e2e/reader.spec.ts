import { test, expect } from '@playwright/test';

test('reader loads book', async ({ page }) => {
  await page.goto('/reader');

  await expect(page.locator('.book-content')).toBeVisible();
});