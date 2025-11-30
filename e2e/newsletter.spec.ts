import { test, expect } from '@playwright/test';

test.describe('Newsletter', () => {
  test('should have newsletter or contact form available', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // The site may have newsletter in footer or contact page
    // Check footer has contact information at minimum
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check that contact link is available
    const contactLink = footer.getByRole('link', { name: /contacto/i });
    await expect(contactLink).toBeVisible();
  });

  test('should navigate to contact page from footer', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const contactLink = page.locator('footer').getByRole('link', { name: /contacto/i });
    await contactLink.click();

    await expect(page).toHaveURL('/contact');
  });
});
