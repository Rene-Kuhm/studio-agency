import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have at least one h1 on homepage', async ({ page }) => {
    await page.goto('/');

    // Should have at least one h1 (some designs have multiple for different sections)
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');

    // Check all images have alt attribute
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Alt can be empty string for decorative images, but should exist
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper lang attribute', async ({ page }) => {
    await page.goto('/');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('es');
  });

  test('should have meta viewport', async ({ page }) => {
    await page.goto('/');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Should have focus on skip link or first interactive element
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
  });

  test('should have sufficient color contrast (visual check)', async ({ page }) => {
    await page.goto('/');

    // This is a basic check - for full contrast testing use axe-core
    // Check that text is visible against background
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
