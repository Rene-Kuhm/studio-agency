import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button
    const themeToggle = page.getByRole('button', { name: /cambiar tema|toggle theme|modo oscuro|modo claro/i });

    if (await themeToggle.isVisible()) {
      // Get initial theme
      const initialTheme = await page.locator('html').getAttribute('class');

      // Click toggle
      await themeToggle.click();

      // Theme should change
      await page.waitForTimeout(500); // Wait for transition
      const newTheme = await page.locator('html').getAttribute('class');

      // Theme class should be different or toggle between dark/light
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should persist theme preference', async ({ page, context }) => {
    await page.goto('/');

    const themeToggle = page.getByRole('button', { name: /cambiar tema|toggle theme|modo oscuro|modo claro/i });

    if (await themeToggle.isVisible()) {
      // Toggle theme
      await themeToggle.click();
      await page.waitForTimeout(500);

      const themeAfterToggle = await page.locator('html').getAttribute('class');

      // Reload page
      await page.reload();
      await page.waitForTimeout(500);

      // Theme should persist
      const themeAfterReload = await page.locator('html').getAttribute('class');
      expect(themeAfterReload).toBe(themeAfterToggle);
    }
  });
});
