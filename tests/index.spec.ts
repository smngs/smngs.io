import { test, expect } from '@playwright/test';

test('ORCIDバッジが表示されている', async ({ page }) => {
  await page.goto('/');
  const orcid = page.locator('a[href="https://orcid.org/0009-0003-1426-2431"]');
  await expect(orcid).toBeVisible();
  await expect(orcid).toContainText('ORCID');
});

test('各バッジのリンクが正しい', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="https://github.com/smngs"]')).toBeVisible();
  await expect(page.locator('a[href="https://orcid.org/0009-0003-1426-2431"]')).toBeVisible();
  await expect(page.locator('a[href="https://researchmap.jp/s_minegishi"]')).toBeVisible();
});

test('スクリーンショット', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'tests/screenshot.png', fullPage: true });
});
