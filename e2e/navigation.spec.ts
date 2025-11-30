import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load Services page', async ({ page }) => {
    await page.goto('/services');
    await expect(page).toHaveTitle(/Servicios/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should load Work/Projects page', async ({ page }) => {
    await page.goto('/work');
    await expect(page).toHaveTitle(/Proyectos/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should load Blog page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/Blog/);
  });

  test('should load Contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contacto/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should load About page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/Nosotros/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should have navigation links in header', async ({ page }) => {
    await page.goto('/');

    // Check header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check navigation links exist (in either desktop or mobile menu)
    await expect(page.locator('a[href="/services"]').first()).toBeAttached();
    await expect(page.locator('a[href="/work"]').first()).toBeAttached();
    await expect(page.locator('a[href="/blog"]').first()).toBeAttached();
    await expect(page.locator('a[href="/contact"]').first()).toBeAttached();
  });
});
