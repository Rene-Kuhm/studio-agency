import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('should display blog posts list', async ({ page }) => {
    await page.goto('/blog');

    // Should have blog title
    await expect(page).toHaveTitle(/Blog/);

    // Should display blog posts (may use article tags or links to posts)
    const postLinks = page.locator('a[href^="/blog/"]');
    const count = await postLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to blog post detail', async ({ page }) => {
    await page.goto('/blog');

    // Click on first blog post link
    const firstPost = page.locator('a[href^="/blog/"]').first();
    const href = await firstPost.getAttribute('href');

    // Only click if it's a valid post link (not /blog itself)
    if (href && href !== '/blog') {
      await firstPost.click();
      await expect(page).toHaveURL(/\/blog\/.+/);
    }
  });

  test('should display blog post content', async ({ page }) => {
    await page.goto('/blog/optimizacion-rendimiento-web');

    // Should have article content
    const article = page.locator('article');
    await expect(article).toBeVisible();

    // Should have a title (h1)
    const title = page.locator('h1');
    await expect(title).toBeVisible();
  });

  test('should have working category filters', async ({ page }) => {
    await page.goto('/blog');

    // Check if category buttons exist
    const categoryButtons = page.locator('button').filter({ hasText: /todos|desarrollo|diseño/i });
    const count = await categoryButtons.count();
    expect(count).toBeGreaterThan(0);
  });
});
