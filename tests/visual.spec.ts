import { test, expect } from "@playwright/test";

test.describe("visual regression", () => {
  test("home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("home.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("blog list page", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveScreenshot("blog-list.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe("typography", () => {
  test("section headings have brand bar", async ({ page }) => {
    await page.goto("/");
    const sectionH1 = page.locator(".section > h1").first();
    await expect(sectionH1).toBeVisible();

    const h1Styles = await sectionH1.evaluate((el) => {
      const before = window.getComputedStyle(el, "::before");
      return {
        content: before.content,
        backgroundColor: before.backgroundColor,
        display: before.display,
      };
    });
    expect(h1Styles.content).not.toBe("none");
    expect(h1Styles.display).toBe("inline-block");
  });

  test("prose headings have brand bar", async ({ page }) => {
    await page.goto("/blog");
    const blogLinks = page.locator("a.smngs-article-list-card");
    const count = await blogLinks.count();
    if (count === 0) {
      test.skip();
      return;
    }

    await blogLinks.first().click();
    await page.waitForLoadState("networkidle");

    const proseH2 = page.locator(".prose h2").first();
    if ((await proseH2.count()) === 0) {
      test.skip();
      return;
    }

    const h2Styles = await proseH2.evaluate((el) => {
      const before = window.getComputedStyle(el, "::before");
      return { content: before.content, display: before.display };
    });
    expect(h2Styles.content).not.toBe("none");
    expect(h2Styles.display).toBe("inline-block");
  });
});
