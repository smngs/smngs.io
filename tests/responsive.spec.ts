import { test, expect } from "@playwright/test";

test.describe("responsive sidebar", () => {
  test("sidebar profile is hidden at 1170px width", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1170, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".sidebar-profile")).toBeHidden();
    await context.close();
  });

  test("sidebar profile is visible at 1800px width", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1800, height: 800 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(".sidebar-profile")).toBeVisible();
    await context.close();
  });
});
