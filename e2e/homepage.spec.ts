import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/TecnoDespegue/);
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Check header navigation
    const nav = page.locator('header nav');
    await expect(nav).toBeVisible();

    // Check main navigation links exist (use first() to handle duplicates in mobile/desktop nav)
    await expect(page.getByRole('link', { name: /servicios/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /proyectos/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /blog/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /contacto/i }).first()).toBeVisible();
  });

  test('should have skip link for accessibility', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /saltar al contenido/i });
    await expect(skipLink).toBeAttached();
  });

  test('should have footer with contact info', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('TecnoDespegue');
  });
});
