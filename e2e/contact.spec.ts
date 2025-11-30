import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page).toHaveTitle(/Contacto/);

    // Check form fields exist (using id selectors for floating label inputs)
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('should show validation error for empty form', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /enviar/i });
    await submitButton.click();

    // Browser should show validation (required fields)
    const nameInput = page.locator('#name');
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('invalid-email');
    await page.locator('#message').fill('This is a test message for the form.');

    // Select a service (required field)
    await page.locator('#service').selectOption('Diseño Web');

    const submitButton = page.getByRole('button', { name: /enviar/i });
    await submitButton.click();

    // Email field should be invalid
    const emailInput = page.locator('#email');
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  });

  test('should display contact information', async ({ page }) => {
    // Check contact info is displayed
    await expect(page.getByText('hola@tecnodespegue.com')).toBeVisible();
    await expect(page.getByText(/\+54 2334 409-838/)).toBeVisible();
  });
});
