
import { test, expect } from '@playwright/test';

test('FRM-01 - Deve cadastrar com dados válidos', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  await page.locator('#fullName').fill('Maria Silva');
  await page.getByTestId('input-email').fill('maria.teste@example.com');
  await page.getByPlaceholder('Min 8 characters').fill('Teste@12345');

  await page.getByRole('checkbox', { name: /I agree to the/i }).check();
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(
    page.getByText('Registration successful! Welcome aboard.')
  ).toBeVisible();
});



test('FRM-02 - Deve validar campos obrigatórios não preenchidos', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
  await expect(page.getByText('Valid email is required')).toBeVisible();
  await expect(
    page.getByText('Password must be at least 8 characters')
  ).toBeVisible();
  await expect(page.getByText('You must accept the terms')).toBeVisible();

  await expect(
    page.getByText('Registration successful! Welcome aboard.')
  ).not.toBeVisible();
});
