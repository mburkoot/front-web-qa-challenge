
import { test, expect } from '@playwright/test';

test('DYN-01 - Deve carregar e selecionar uma opção assíncrona', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  await page.getByRole('button', { name: 'Load Options' }).click();

  await expect(
    page.getByRole('button', { name: 'Options Loaded' })
  ).toBeVisible();

  const campoCategoria = page.locator('select').filter({
    has: page.locator('option', { hasText: 'Electronics' })
  });

  await expect(campoCategoria).toHaveCount(1);
  await expect(campoCategoria).toBeEnabled();

  await campoCategoria.selectOption({ label: 'Electronics' });

  await expect(
    campoCategoria.locator('option:checked')
  ).toHaveText('Electronics');
});